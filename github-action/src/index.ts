import * as core from "@actions/core";
import * as github from "@actions/github";
import axios from "axios";

const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

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

  const queued = await axios.post(
    `${apiUrl}/api/v1/ci/evaluate`,
    {
      projectId,
      commitSha: github.context.sha,
      pullRequestNumber:
        github.context.payload.pull_request?.number,
      useCache: false,
    },
    {
      headers,
    }
  );

  const experimentId =
    queued.data.data.experimentId as string;

  core.setOutput("experiment-id", experimentId);

  core.info(
    `EvalOps experiment created: ${experimentId}`
  );

  /*
   * Wait for the evaluation worker.
   */
  for (let attempt = 0; attempt < 60; attempt++) {
    await sleep(2000);

    const result = await axios.get(
      `${apiUrl}/api/v1/projects/${projectId}/experiments/${experimentId}`,
      {
        headers,
      }
    );

    const experiment = result.data.data;

    core.info(
      `EvalOps status: ${experiment.status}`
    );

    if (
      ["COMPLETED", "FAILED"].includes(
        experiment.status
      )
    ) {
      if (experiment.status === "FAILED") {
        const quality =
          typeof experiment.qualityScore === "number"
            ? experiment.qualityScore.toFixed(2)
            : "N/A";

        const delta =
          typeof experiment.regressionDelta === "number"
            ? experiment.regressionDelta.toFixed(2)
            : "N/A";

        throw new Error(
          `EvalOps regression failed. Quality=${quality}%, delta=${delta}pp`
        );
      }

      core.info(
        "EvalOps regression evaluation passed."
      );

      return;
    }
  }

  throw new Error(
    "Timed out waiting for EvalOps evaluation"
  );
}

main().catch(error => {
  core.setFailed(
    error instanceof Error
      ? error.message
      : "EvalOps action failed"
  );
});