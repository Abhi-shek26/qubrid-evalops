import * as core from "@actions/core";
import * as github from "@actions/github";
import axios from "axios";

type Experiment = {
  id: string;
  status: string;

  qualityScore?: number | null;
  passRate?: number | null;

  regressionDelta?: number | null;
  regressionPassed?: boolean | null;

  allowedQualityDrop?: number | null;

  errorMessage?: string | null;
};

const sleep = (ms: number) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );

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

  const timeoutSeconds = Number(
    core.getInput("timeout-seconds") || "180"
  );

  const pollIntervalSeconds = Number(
    core.getInput("poll-interval-seconds") || "2"
  );

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const commitSha = github.context.sha;

  const pullRequestNumber =
    github.context.payload.pull_request?.number;

  core.info(
    `Starting EvalOps CI evaluation for commit ${commitSha}`
  );

  if (pullRequestNumber) {
    core.info(
      `Pull request: #${pullRequestNumber}`
    );
  }

  /*
   * 1. Create the CI evaluation.
   */
  const queued = await axios.post(
    `${apiUrl}/api/v1/ci/evaluate`,
    {
      projectId,
      commitSha,
      pullRequestNumber,
    },
    {
      headers,
      timeout: 30_000,
    }
  );

  const experimentId =
    queued.data?.data?.experimentId;

  if (!experimentId) {
    throw new Error(
      "EvalOps API did not return an experimentId"
    );
  }

  core.setOutput(
    "experiment-id",
    experimentId
  );

  core.info(
    `EvalOps experiment: ${experimentId}`
  );

  /*
   * 2. Poll experiment status.
   */
  const maxAttempts = Math.max(
    1,
    Math.ceil(
      timeoutSeconds /
        pollIntervalSeconds
    )
  );

  for (
    let attempt = 1;
    attempt <= maxAttempts;
    attempt++
  ) {
    await sleep(
      pollIntervalSeconds * 1000
    );

    const result = await axios.get(
      `${apiUrl}/api/v1/projects/${projectId}/experiments/${experimentId}`,
      {
        headers,
        timeout: 30_000,
      }
    );

    const experiment =
      result.data?.data as Experiment;

    if (!experiment) {
      throw new Error(
        "EvalOps API returned no experiment data"
      );
    }

    core.info(
      `[${attempt}/${maxAttempts}] Status: ${experiment.status}`
    );

    if (
      experiment.status === "QUEUED" ||
      experiment.status === "RUNNING"
    ) {
      continue;
    }

    /*
     * Evaluation itself failed.
     */
    if (experiment.status === "FAILED") {
      const quality =
        experiment.qualityScore != null
          ? experiment.qualityScore.toFixed(2)
          : "n/a";

      const delta =
        experiment.regressionDelta != null
          ? experiment.regressionDelta.toFixed(2)
          : "n/a";

      const allowed =
        experiment.allowedQualityDrop != null
          ? experiment.allowedQualityDrop.toFixed(2)
          : "n/a";

      throw new Error(
        [
          "EvalOps CI check failed.",
          `Quality: ${quality}%`,
          `Regression delta: ${delta} pp`,
          `Allowed drop: ${allowed} pp`,
          experiment.errorMessage
            ? `Error: ${experiment.errorMessage}`
            : "",
        ]
          .filter(Boolean)
          .join(" | ")
      );
    }

    /*
     * Successful experiment.
     */
    if (experiment.status === "COMPLETED") {
      const quality =
        experiment.qualityScore != null
          ? experiment.qualityScore.toFixed(2)
          : "n/a";

      const passRate =
        experiment.passRate != null
          ? experiment.passRate.toFixed(2)
          : "n/a";

      const delta =
        experiment.regressionDelta != null
          ? experiment.regressionDelta.toFixed(2)
          : "n/a";

      core.info(
        `Quality: ${quality}%`
      );

      core.info(
        `Pass rate: ${passRate}%`
      );

      core.info(
        `Regression delta: ${delta} pp`
      );

      /*
       * The worker already computes regressionPassed.
       */
      if (
        experiment.regressionPassed === false
      ) {
        throw new Error(
          `Regression detected. Quality=${quality}%, delta=${delta}pp`
        );
      }

      core.info(
        "✓ EvalOps regression check passed."
      );

      return;
    }

    /*
     * Unexpected terminal state.
     */
    throw new Error(
      `Unexpected EvalOps experiment status: ${experiment.status}`
    );
  }

  throw new Error(
    `Timed out after ${timeoutSeconds}s waiting for EvalOps evaluation ${experimentId}`
  );
}

main().catch((error) => {
  const message =
    error instanceof Error
      ? error.message
      : "EvalOps action failed";

  core.setFailed(message);
});