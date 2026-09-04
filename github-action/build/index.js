"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const axios_1 = __importDefault(require("axios"));
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function main() {
    const apiUrl = core
        .getInput("api-url", { required: true })
        .replace(/\/$/, "");
    const projectId = core.getInput("project-id", {
        required: true,
    });
    const token = core.getInput("token", {
        required: true,
    });
    const timeoutSeconds = Number(core.getInput("timeout-seconds") || "180");
    const pollIntervalSeconds = Number(core.getInput("poll-interval-seconds") || "2");
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    const commitSha = github.context.sha;
    const pullRequestNumber = github.context.payload.pull_request?.number;
    core.info(`Starting EvalOps CI evaluation for commit ${commitSha}`);
    if (pullRequestNumber) {
        core.info(`Pull request: #${pullRequestNumber}`);
    }
    /*
     * 1. Create the CI evaluation.
     */
    const queued = await axios_1.default.post(`${apiUrl}/api/v1/ci/evaluate`, {
        projectId,
        commitSha,
        pullRequestNumber,
    }, {
        headers,
        timeout: 30_000,
    });
    const experimentId = queued.data?.data?.experimentId;
    if (!experimentId) {
        throw new Error("EvalOps API did not return an experimentId");
    }
    core.setOutput("experiment-id", experimentId);
    core.info(`EvalOps experiment: ${experimentId}`);
    /*
     * 2. Poll experiment status.
     */
    const maxAttempts = Math.max(1, Math.ceil(timeoutSeconds /
        pollIntervalSeconds));
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        await sleep(pollIntervalSeconds * 1000);
        const result = await axios_1.default.get(`${apiUrl}/api/v1/projects/${projectId}/experiments/${experimentId}`, {
            headers,
            timeout: 30_000,
        });
        const experiment = result.data?.data;
        if (!experiment) {
            throw new Error("EvalOps API returned no experiment data");
        }
        core.info(`[${attempt}/${maxAttempts}] Status: ${experiment.status}`);
        if (experiment.status === "QUEUED" ||
            experiment.status === "RUNNING") {
            continue;
        }
        /*
         * Evaluation itself failed.
         */
        if (experiment.status === "FAILED") {
            const quality = experiment.qualityScore != null
                ? experiment.qualityScore.toFixed(2)
                : "n/a";
            const delta = experiment.regressionDelta != null
                ? experiment.regressionDelta.toFixed(2)
                : "n/a";
            const allowed = experiment.allowedQualityDrop != null
                ? experiment.allowedQualityDrop.toFixed(2)
                : "n/a";
            throw new Error([
                "EvalOps CI check failed.",
                `Quality: ${quality}%`,
                `Regression delta: ${delta} pp`,
                `Allowed drop: ${allowed} pp`,
                experiment.errorMessage
                    ? `Error: ${experiment.errorMessage}`
                    : "",
            ]
                .filter(Boolean)
                .join(" | "));
        }
        /*
         * Successful experiment.
         */
        if (experiment.status === "COMPLETED") {
            const quality = experiment.qualityScore != null
                ? experiment.qualityScore.toFixed(2)
                : "n/a";
            const passRate = experiment.passRate != null
                ? experiment.passRate.toFixed(2)
                : "n/a";
            const delta = experiment.regressionDelta != null
                ? experiment.regressionDelta.toFixed(2)
                : "n/a";
            core.info(`Quality: ${quality}%`);
            core.info(`Pass rate: ${passRate}%`);
            core.info(`Regression delta: ${delta} pp`);
            /*
             * The worker already computes regressionPassed.
             */
            if (experiment.regressionPassed === false) {
                throw new Error(`Regression detected. Quality=${quality}%, delta=${delta}pp`);
            }
            core.info("✓ EvalOps regression check passed.");
            return;
        }
        /*
         * Unexpected terminal state.
         */
        throw new Error(`Unexpected EvalOps experiment status: ${experiment.status}`);
    }
    throw new Error(`Timed out after ${timeoutSeconds}s waiting for EvalOps evaluation ${experimentId}`);
}
main().catch((error) => {
    const message = error instanceof Error
        ? error.message
        : "EvalOps action failed";
    core.setFailed(message);
});
