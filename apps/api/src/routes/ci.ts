import { Router } from "express";
import { prisma } from "../lib/prisma";
import { Queue } from "bullmq";
import { redis } from "../lib/redis";
import { ciAuth, CiAuthRequest } from "../middleware/ciAuth";

const router = Router();

const evaluationQueue = new Queue("evaluation", {
  connection: redis,
});

router.post(
  "/evaluate",
  ciAuth,
  async (req: CiAuthRequest, res) => {
    try {
      const {
        projectId,
        datasetId,
        commitSha,
        pullRequestNumber,
        useCache = false,
      } = req.body as {
        projectId?: string;
        datasetId?: string;
        commitSha?: string;
        pullRequestNumber?: number;
        useCache?: boolean;
      };

      if (!projectId) {
        return res.status(400).json({
          success: false,
          message: "projectId is required",
        });
      }

      if (!datasetId) {
        return res.status(400).json({
          success: false,
          message: "datasetId is required",
        });
      }

      /*
       * useCache must be a boolean if provided.
       */
      if (typeof useCache !== "boolean") {
        return res.status(400).json({
          success: false,
          message: "useCache must be a boolean",
        });
      }

      /*
       * Make sure the CI token belongs to this project.
       */
      if (req.ciProjectId !== projectId) {
        return res.status(403).json({
          success: false,
          message: "CI token does not belong to this project",
        });
      }

      /*
       * Get the project.
       */
      const project = await prisma.project.findUnique({
        where: {
          id: projectId,
        },
      });

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }

      /*
       * Get the explicitly requested dataset.
       *
       * Also make sure the dataset belongs to this project.
       */
      const dataset = await prisma.dataset.findFirst({
        where: {
          id: datasetId,
          projectId: project.id,
        },
      });

      if (!dataset) {
        return res.status(404).json({
          success: false,
          message: "Dataset not found for this project",
        });
      }

      const runName = pullRequestNumber
        ? `CI PR #${pullRequestNumber}`
        : commitSha
        ? `CI ${commitSha.slice(0, 8)}`
        : "CI Evaluation";

      /*
       * Create the evaluation experiment.
       *
       * CI regression checks always fail on regression.
       */
      const experiment = await prisma.experiment.create({
        data: {
          projectId: project.id,
          datasetId: dataset.id,
          name: runName,
          model: project.model,

          useCache,

          failOnRegression: true,

          allowedQualityDrop:
            project.allowedQualityDrop,
        },
      });

      console.log(
        `[CI] Created experiment ${experiment.id} | dataset=${dataset.id} | cache=${useCache}`
      );

      /*
       * Put the experiment on the same BullMQ queue used
       * by normal evaluation runs.
       */
      await evaluationQueue.add(
        "run",
        {
          experimentId: experiment.id,
          source: "github-actions",
          commitSha,
          pullRequestNumber,
        },
        {
          removeOnComplete: 100,
          removeOnFail: 100,
        }
      );

      console.log(
        `[CI] Queued experiment ${experiment.id}`
      );

      return res.status(202).json({
        success: true,
        data: {
          experimentId: experiment.id,
          projectId: project.id,
          datasetId: dataset.id,
          status: experiment.status,

          // Return the actual cache mode used.
          useCache,

          failOnRegression: true,

          allowedQualityDrop:
            project.allowedQualityDrop,

          commitSha: commitSha ?? null,

          pullRequestNumber:
            pullRequestNumber ?? null,
        },
      });
    } catch (error) {
      console.error(
        "[CI] Failed to create evaluation",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to create CI evaluation",
      });
    }
  }
);

export default router;