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
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
async function main() {
    const apiUrl = core.getInput("api-url").replace(/\/$/, "");
    const projectId = core.getInput("project-id");
    const token = core.getInput("ci-token");
    if (!apiUrl) {
        throw new Error("api-url is required");
    }
    if (!projectId) {
        throw new Error("project-id is required");
    }
    if (!token) {
        throw new Error("ci-token is required");
    }
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    core.info("Starting EvalOps CI evaluation...");
    const queued = await axios_1.default.post(`${apiUrl}/api/v1/ci/evaluate`, {
        projectId,
        commitSha: github.context.sha,
        pullRequestNumber: github.context.payload.pull_request?.number,
        useCache: false,
    }, {
        headers,
    });
    const experimentId = queued.data.data.experimentId;
    core.setOutput("experiment-id", experimentId);
    core.info(`EvalOps experiment created: ${experimentId}`);
    /*
     * Wait for the evaluation worker.
     */
    for (let attempt = 0; attempt < 60; attempt++) {
        await sleep(2000);
        const result = await axios_1.default.get(`${apiUrl}/api/v1/projects/${projectId}/experiments/${experimentId}`, {
            headers,
        });
        const experiment = result.data.data;
        core.info(`EvalOps status: ${experiment.status}`);
        if (["COMPLETED", "FAILED"].includes(experiment.status)) {
            if (experiment.status === "FAILED") {
                const quality = typeof experiment.qualityScore === "number"
                    ? experiment.qualityScore.toFixed(2)
                    : "N/A";
                const delta = typeof experiment.regressionDelta === "number"
                    ? experiment.regressionDelta.toFixed(2)
                    : "N/A";
                throw new Error(`EvalOps regression failed. Quality=${quality}%, delta=${delta}pp`);
            }
            core.info("EvalOps regression evaluation passed.");
            return;
        }
    }
    throw new Error("Timed out waiting for EvalOps evaluation");
}
main().catch(error => {
    core.setFailed(error instanceof Error
        ? error.message
        : "EvalOps action failed");
});
