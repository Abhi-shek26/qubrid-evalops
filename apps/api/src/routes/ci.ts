import { Router } from "express";
import { prisma } from "../lib/prisma";
import { Queue } from "bullmq";
import { redis } from "../lib/redis";
import { auth, AuthRequest } from "../middleware/auth";

const router = Router();

const evaluationQueue = new Queue("evaluation", {
  connection: redis,
});

router.post(
  "/evaluate",
  auth,
  async (req: AuthRequest, res) => {
    try {
      const {
        projectId,
        commitSha,
        pullRequestNumber,
      } = req.body as {
        projectId?: string;
        commitSha?: string;
        pullRequestNumber?: number;
      };

      if (!projectId) {
        return res.status(400).json({
          success: false,
          message: "projectId is required",
        });
      }

      /*
       * Make sure the authenticated user owns this project.
       */
      const project = await prisma.project.findFirst({
        where: {
          id: projectId,
          userId: req.userId!,
        },
      });

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }

      /*
       * CI uses the oldest dataset by default.
       *
       * Later we can make dataset selection configurable
       * from the GitHub Action.
       */
      const dataset = await prisma.dataset.findFirst({
        where: {
          projectId: project.id,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      if (!dataset) {
        return res.status(400).json({
          success: false,
          message: "Project has no dataset",
        });
      }

      const runName = pullRequestNumber
        ? `CI PR #${pullRequestNumber}`
        : commitSha
        ? `CI ${commitSha.slice(0, 8)}`
        : "CI Evaluation";

      /*
       * IMPORTANT:
       *
       * CI evaluations intentionally disable EvalOps response cache.
       * A regression test must evaluate a fresh model response.
       */
      const experiment =
        await prisma.experiment.create({
          data: {
            projectId: project.id,
            datasetId: dataset.id,
            name: runName,
            model: project.model,

            useCache: false,

            failOnRegression: true,

            allowedQualityDrop:
              project.allowedQualityDrop,
          },
        });

      console.log(
        `[CI] Created experiment ${experiment.id}`
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
          useCache: false,
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