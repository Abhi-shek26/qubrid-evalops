import { Router } from "express";
import { prisma } from "../lib/prisma";
import { auth, AuthRequest } from "../middleware/auth";
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
router.use(auth);

const evaluationQueue = new Queue("evaluation", { connection: redis });

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

router.get("/:id/datasets/:datasetId", async (req: AuthRequest, res) => {
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
});

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

router.get(
  "/:id/experiments/:experimentId",
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
      },
      include: {
        results: {
          orderBy: {
            createdAt: "asc"
          },
          include: {
            testCase: true
          }
        }
      }
    });

    if (!experiment) {
      return res.status(404).json({
        success: false,
        message: "Experiment not found"
      });
    }

    res.json({
      success: true,
      data: experiment
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

export default router;