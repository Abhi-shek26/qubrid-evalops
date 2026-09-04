import { Router } from "express";
import crypto from "crypto";
import { prisma } from "../lib/prisma";
import { auth, AuthRequest } from "../middleware/auth";
import {
  projectAuth,
  ProjectAuthRequest,
} from "../middleware/projectAuth";
import {
  createProjectSchema,
  createDatasetSchema,
  createTestCaseSchema,
  createEvaluatorSchema,
  runEvaluationSchema
} from "@qubrid-evalops/shared";
import { Queue } from "bullmq";
import { redis } from "../lib/redis";

const router = Router();

const evaluationQueue = new Queue("evaluation", {
  connection: redis,
});

/*
 * This route supports BOTH:
 *
 * 1. Normal JWT authentication
 * 2. Project CI-token authentication
 *
 * IMPORTANT:
 * It must be placed BEFORE router.use(auth),
 * otherwise CI tokens would be rejected by the
 * normal JWT middleware first.
 */
router.get(
  "/:id/experiments/:experimentId",
  projectAuth,
  async (req: ProjectAuthRequest, res) => {
    const projectId = String(req.params.id);
    const experimentId = String(req.params.experimentId);

    /*
     * CI token authentication.
     *
     * Make sure the CI token belongs to the
     * project being requested.
     */
    if (
      req.ciProjectId &&
      req.ciProjectId !== projectId
    ) {
      return res.status(403).json({
        success: false,
        message: "CI token does not belong to this project",
      });
    }

    /*
     * JWT authentication.
     *
     * If the request came from the dashboard,
     * make sure the logged-in user owns the project.
     *
     * For CI-token requests, req.userId is undefined,
     * so no userId filter is applied here.
     */
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        ...(req.userId
          ? {
              userId: req.userId,
            }
          : {}),
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const experiment =
      await prisma.experiment.findFirst({
        where: {
          id: experimentId,
          projectId: project.id,
        },
        include: {
          results: {
            orderBy: {
              createdAt: "asc",
            },
            include: {
              testCase: true,
            },
          },
        },
      });

    if (!experiment) {
      return res.status(404).json({
        success: false,
        message: "Experiment not found",
      });
    }

    return res.json({
      success: true,
      data: experiment,
    });
  }
);

/*
 * Everything else in this router requires normal JWT auth.
 */
router.use(auth);

router.get("/", async (req: AuthRequest, res) => {
  const projects = await prisma.project.findMany({
    where: { userId: req.userId! },
    orderBy: { createdAt: "desc" }
  });

  res.json({ success: true, data: projects });
});

router.post("/", async (req: AuthRequest, res) => {
  const parsed = createProjectSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      errors: parsed.error.flatten()
    });
  }

  const project = await prisma.project.create({
    data: {
      ...parsed.data,
      userId: req.userId!
    }
  });

  res.status(201).json({
    success: true,
    data: project
  });
});

router.get("/:id", async (req: AuthRequest, res) => {
  const projectId = String(req.params.id);

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId: req.userId!
    },
    include: {
      datasets: true,
      evaluators: true,
      experiments: {
        orderBy: { createdAt: "desc" },
        take: 20
      },
      baseline: true
    }
  });

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found"
    });
  }

  res.json({
    success: true,
    data: project
  });
});

router.post("/:id/datasets", async (req: AuthRequest, res) => {
  const projectId = String(req.params.id);

  const parsed = createDatasetSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      errors: parsed.error.flatten()
    });
  }

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId: req.userId!
    }
  });

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found"
    });
  }

  const dataset = await prisma.dataset.create({
    data: {
      ...parsed.data,
      projectId: project.id
    }
  });

  res.status(201).json({
    success: true,
    data: dataset
  });
});

router.get("/:id/evaluators", async (req: AuthRequest, res) => {
  const projectId = String(req.params.id);

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId: req.userId!
    }
  });

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found"
    });
  }

  const evaluators = await prisma.evaluator.findMany({
    where: {
      projectId: project.id
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  res.json({
    success: true,
    data: evaluators
  });
});

router.post("/:id/evaluators", async (req: AuthRequest, res) => {
  const projectId = String(req.params.id);

  const parsed = createEvaluatorSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      errors: parsed.error.flatten()
    });
  }

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId: req.userId!
    }
  });

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found"
    });
  }

  const evaluator = await prisma.evaluator.create({
    data: {
      projectId: project.id,
      name: parsed.data.name,
      type: parsed.data.type,
      config: JSON.stringify(parsed.data.config)
    }
  });

  res.status(201).json({
    success: true,
    data: evaluator
  });
});

router.post("/:id/evaluations", async (req: AuthRequest, res) => {
  const projectId = String(req.params.id);

  const parsed = runEvaluationSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      errors: parsed.error.flatten()
    });
  }

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId: req.userId!
    }
  });

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found"
    });
  }

  const dataset = await prisma.dataset.findFirst({
    where: {
      id: parsed.data.datasetId,
      projectId: project.id
    }
  });

  if (!dataset) {
    return res.status(404).json({
      success: false,
      message: "Dataset not found"
    });
  }

  const experiment = await prisma.experiment.create({
    data: {
      projectId: project.id,
      datasetId: dataset.id,
      name:
        parsed.data.name ??
        `Evaluation ${new Date().toISOString()}`,
      model: project.model,
      useCache: parsed.data.useCache,
      failOnRegression: parsed.data.failOnRegression,
      allowedQualityDrop: parsed.data.allowedQualityDrop
    }
  });

  await evaluationQueue.add("run", {
    experimentId: experiment.id
  });

  res.status(202).json({
    success: true,
    data: experiment
  });
});

router.get("/:id/experiments", async (req: AuthRequest, res) => {
  const projectId = String(req.params.id);

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId: req.userId!
    }
  });

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found"
    });
  }

  const experiments = await prisma.experiment.findMany({
    where: {
      projectId: project.id
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  res.json({
    success: true,
    data: experiments
  });
});

router.get(
  "/:id/datasets/:datasetId",
  async (req: AuthRequest, res) => {
    const projectId = String(req.params.id);
    const datasetId = String(req.params.datasetId);

    const dataset = await prisma.dataset.findFirst({
      where: {
        id: datasetId,
        project: {
          id: projectId,
          userId: req.userId!
        }
      },
      include: {
        testCases: true
      }
    });

    if (!dataset) {
      return res.status(404).json({
        success: false,
        message: "Dataset not found"
      });
    }

    res.json({
      success: true,
      data: dataset
    });
  }
);

router.post(
  "/:id/datasets/:datasetId/test-cases",
  async (req: AuthRequest, res) => {
    const projectId = String(req.params.id);
    const datasetId = String(req.params.datasetId);

    const parsed = createTestCaseSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten()
      });
    }

    const dataset = await prisma.dataset.findFirst({
      where: {
        id: datasetId,
        project: {
          id: projectId,
          userId: req.userId!
        }
      }
    });

    if (!dataset) {
      return res.status(404).json({
        success: false,
        message: "Dataset not found"
      });
    }

    const testCase = await prisma.testCase.create({
      data: {
        datasetId: dataset.id,
        input: parsed.data.input,
        expectedOutput: parsed.data.expectedOutput,
        metadata: parsed.data.metadata
          ? JSON.stringify(parsed.data.metadata)
          : null
      }
    });

    res.status(201).json({
      success: true,
      data: testCase
    });
  }
);

router.post(
  "/:id/baseline/:experimentId",
  async (req: AuthRequest, res) => {
    const projectId = String(req.params.id);
    const experimentId = String(req.params.experimentId);

    const experiment = await prisma.experiment.findFirst({
      where: {
        id: experimentId,
        project: {
          id: projectId,
          userId: req.userId!
        }
      }
    });

    if (!experiment) {
      return res.status(404).json({
        success: false,
        message: "Experiment not found"
      });
    }

    const baseline = await prisma.baseline.upsert({
      where: {
        projectId: experiment.projectId
      },
      create: {
        projectId: experiment.projectId,
        experimentId: experiment.id
      },
      update: {
        experimentId: experiment.id
      }
    });

    res.json({
      success: true,
      data: baseline
    });
  }
);

router.delete(
  "/:id/evaluators/:evaluatorId",
  async (req: AuthRequest, res) => {
    const projectId = String(req.params.id);
    const evaluatorId = String(req.params.evaluatorId);

    const evaluator = await prisma.evaluator.findFirst({
      where: {
        id: evaluatorId,
        project: {
          id: projectId,
          userId: req.userId!
        }
      }
    });

    if (!evaluator) {
      return res.status(404).json({
        success: false,
        message: "Evaluator not found"
      });
    }

    await prisma.evaluator.delete({
      where: {
        id: evaluator.id
      }
    });

    res.json({
      success: true,
      message: "Evaluator deleted successfully"
    });
  }
);

/*
 * Generate a project-scoped CI token.
 *
 * The raw token is returned only once.
 * Only the SHA-256 hash is stored.
 */
router.post(
  "/:id/ci-token",
  async (req: AuthRequest, res) => {
    try {
      const projectId = String(req.params.id);

      const project = await prisma.project.findFirst({
        where: {
          id: projectId,
          userId: req.userId!
        }
      });

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found"
        });
      }

      const rawToken =
        "evalops_ci_" +
        crypto.randomBytes(32).toString("hex");

      const tokenHash = crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex");

      const tokenPrefix = rawToken.slice(0, 16);

      /*
       * Replace any existing CI token.
       */
      await prisma.projectCiToken.deleteMany({
        where: {
          projectId
        }
      });

      await prisma.projectCiToken.create({
        data: {
          projectId,
          tokenHash,
          tokenPrefix
        }
      });

      return res.status(201).json({
        success: true,
        data: {
          token: rawToken,
          tokenPrefix
        },
        message:
          "CI token generated successfully. Store it securely because it will not be shown again."
      });
    } catch (error) {
      console.error(
        "CI token generation error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Failed to generate CI token"
      });
    }
  }
);

/*
 * Revoke the project's CI token.
 */
router.delete(
  "/:id/ci-token",
  async (req: AuthRequest, res) => {
    try {
      const projectId = String(req.params.id);

      const project = await prisma.project.findFirst({
        where: {
          id: projectId,
          userId: req.userId!
        }
      });

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found"
        });
      }

      await prisma.projectCiToken.updateMany({
        where: {
          projectId,
          revokedAt: null
        },
        data: {
          revokedAt: new Date()
        }
      });

      return res.json({
        success: true,
        message: "CI token revoked successfully"
      });
    } catch (error) {
      console.error(
        "CI token revocation error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Failed to revoke CI token"
      });
    }
  }
);

export default router;