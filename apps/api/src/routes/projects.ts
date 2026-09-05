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


/*
 * =========================================================
 * DATASET VERSIONING
 * =========================================================
 *
 * Creates an immutable snapshot of an existing dataset.
 * The test cases are copied into a new Dataset row with
 * an incremented version number.
 */
router.post(
  "/:id/datasets/:datasetId/version",
  async (req: AuthRequest, res) => {
    try {
      const projectId = String(req.params.id);
      const datasetId = String(req.params.datasetId);

      /*
       * Verify that the logged-in user owns the project.
       */
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

      /*
       * Load the source dataset and all test cases.
       */
      const sourceDataset =
        await prisma.dataset.findFirst({
          where: {
            id: datasetId,
            projectId: project.id
          },
          include: {
            testCases: true
          }
        });

      if (!sourceDataset) {
        return res.status(404).json({
          success: false,
          message: "Dataset not found"
        });
      }

      /*
       * Find the highest existing version for the
       * same dataset name in this project.
       */
      const latestDataset =
        await prisma.dataset.findFirst({
          where: {
            projectId: project.id,
            name: sourceDataset.name
          },
          orderBy: {
            version: "desc"
          }
        });

      const nextVersion =
        (latestDataset?.version ??
          sourceDataset.version) + 1;

      /*
       * Create a new immutable dataset snapshot.
       */
      const newDataset =
        await prisma.dataset.create({
          data: {
            projectId: project.id,
            name: sourceDataset.name,
            description:
              sourceDataset.description,
            version: nextVersion,

            testCases: {
              create:
                sourceDataset.testCases.map(
                  (testCase) => ({
                    input: testCase.input,
                    expectedOutput:
                      testCase.expectedOutput,
                    metadata:
                      testCase.metadata
                  })
                )
            }
          },
          include: {
            testCases: true
          }
        });

      return res.status(201).json({
        success: true,
        data: newDataset,
        message:
          `Dataset version ${nextVersion} created successfully`
      });
    } catch (error) {
      console.error(
        "Dataset version creation error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to create dataset version"
      });
    }
  }
);

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
  "/:id/analytics",
  async (req: AuthRequest, res) => {
    try {
      const projectId = String(req.params.id);

      /*
       * Make sure the logged-in user owns the project.
       */
      const project = await prisma.project.findFirst({
        where: {
          id: projectId,
          userId: req.userId!
        },
        include: {
          baseline: true
        }
      });

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found"
        });
      }

      /*
       * Fetch experiments in chronological order.
       */
      const experiments =
        await prisma.experiment.findMany({
          where: {
            projectId: project.id
          },
          orderBy: {
            createdAt: "asc"
          },
          include: {
            results: {
              select: {
                evaluatorResults: true
              }
            }
          }
        });

      /*
       * ---------------------------------------------------------
       * OVERALL RUN TRENDS
       * ---------------------------------------------------------
       */
      const trends = experiments.map(
        (experiment) => ({
          experimentId: experiment.id,
          name: experiment.name,
          model: experiment.model,
          status: experiment.status,
          createdAt: experiment.createdAt,

          qualityScore:
            experiment.qualityScore,

          passRate:
            experiment.passRate,

          avgLatencyMs:
            experiment.avgLatencyMs,

          totalTokens:
            experiment.totalTokens,

          totalCostUsd:
            experiment.totalCostUsd,

          cacheHitRate:
            experiment.cacheHitRate,

          cacheMissRate:
            experiment.cacheMissRate,

          cachedInputTokens:
            experiment.cachedInputTokens,

          estimatedCostSavedUsd:
            experiment.estimatedCostSavedUsd,

          regressionDelta:
            experiment.regressionDelta,

          regressionPassed:
            experiment.regressionPassed
        })
      );

      /*
       * ---------------------------------------------------------
       * REGRESSION HISTORY
       * ---------------------------------------------------------
       */
      const regressionHistory =
        experiments
          .filter(
            (experiment) =>
              experiment.regressionDelta !== null &&
              experiment.regressionDelta !== undefined
          )
          .map((experiment) => ({
            experimentId: experiment.id,
            name: experiment.name,
            model: experiment.model,
            createdAt: experiment.createdAt,
            qualityScore:
              experiment.qualityScore,
            regressionDelta:
              experiment.regressionDelta,
            regressionPassed:
              experiment.regressionPassed,
            allowedQualityDrop:
              experiment.allowedQualityDrop,
            status: experiment.status
          }));

      /*
       * ---------------------------------------------------------
       * EVALUATOR-WISE TRENDS
       * ---------------------------------------------------------
       *
       * evaluatorResults is stored as:
       *
       * [
       *   {
       *     type,
       *     score,
       *     passed,
       *     reason
       *   }
       * ]
       */
      const evaluatorBuckets =
        new Map<
          string,
          {
            scores: number[];
            passed: number;
            total: number;
            points: Array<{
              experimentId: string;
              experimentName: string;
              createdAt: Date;
              score: number;
              passed: boolean;
            }>;
          }
        >();

      for (const experiment of experiments) {
        for (const result of experiment.results) {
          if (!result.evaluatorResults) {
            continue;
          }

          let checks: Array<{
            type?: string;
            score?: number;
            passed?: boolean;
            reason?: string;
          }> = [];

          try {
            const parsed =
              JSON.parse(
                result.evaluatorResults
              );

            if (Array.isArray(parsed)) {
              checks = parsed;
            }
          } catch {
            /*
             * Ignore malformed historical
             * evaluator-result JSON.
             */
            continue;
          }

          for (const check of checks) {
            if (
              !check.type ||
              typeof check.score !== "number"
            ) {
              continue;
            }

            const evaluatorType =
              check.type;

            if (
              !evaluatorBuckets.has(
                evaluatorType
              )
            ) {
              evaluatorBuckets.set(
                evaluatorType,
                {
                  scores: [],
                  passed: 0,
                  total: 0,
                  points: []
                }
              );
            }

            const bucket =
              evaluatorBuckets.get(
                evaluatorType
              )!;

            const score = Math.max(
              0,
              Math.min(1, check.score)
            );

            bucket.scores.push(score);
            bucket.total += 1;

            if (check.passed) {
              bucket.passed += 1;
            }

            bucket.points.push({
              experimentId:
                experiment.id,
              experimentName:
                experiment.name,
              createdAt:
                experiment.createdAt,
              score: score * 100,
              passed:
                Boolean(check.passed)
            });
          }
        }
      }

      const evaluatorTrends =
        Array.from(
          evaluatorBuckets.entries()
        ).map(
          ([type, bucket]) => {
            const averageScore =
              bucket.scores.length
                ? bucket.scores.reduce(
                    (sum, score) =>
                      sum + score,
                    0
                  ) /
                  bucket.scores.length
                : 0;

            const passRate =
              bucket.total
                ? (bucket.passed /
                    bucket.total) *
                  100
                : 0;

            return {
              type,
              averageScore:
                averageScore * 100,
              passRate,
              totalEvaluations:
                bucket.total,
              points: bucket.points
            };
          }
        );

      /*
       * ---------------------------------------------------------
       * MODEL COMPARISON
       * ---------------------------------------------------------
       */
      const modelBuckets =
        new Map<
          string,
          {
            runs: number;
            quality: number[];
            passRate: number[];
            latency: number[];
            cost: number[];
            tokens: number[];
          }
        >();

      for (const experiment of experiments) {
        const model =
          experiment.model;

        if (
          !modelBuckets.has(model)
        ) {
          modelBuckets.set(model, {
            runs: 0,
            quality: [],
            passRate: [],
            latency: [],
            cost: [],
            tokens: []
          });
        }

        const bucket =
          modelBuckets.get(model)!;

        bucket.runs += 1;

        if (
          experiment.qualityScore !== null &&
          experiment.qualityScore !== undefined
        ) {
          bucket.quality.push(
            experiment.qualityScore
          );
        }

        if (
          experiment.passRate !== null &&
          experiment.passRate !== undefined
        ) {
          bucket.passRate.push(
            experiment.passRate
          );
        }

        if (
          experiment.avgLatencyMs !== null &&
          experiment.avgLatencyMs !== undefined
        ) {
          bucket.latency.push(
            experiment.avgLatencyMs
          );
        }

        bucket.cost.push(
          experiment.totalCostUsd
        );

        bucket.tokens.push(
          experiment.totalTokens
        );
      }

      const average = (
        values: number[]
      ): number =>
        values.length
          ? values.reduce(
              (sum, value) =>
                sum + value,
              0
            ) / values.length
          : 0;

      const modelComparison =
        Array.from(
          modelBuckets.entries()
        ).map(
          ([model, bucket]) => ({
            model,
            runs: bucket.runs,

            averageQuality:
              average(bucket.quality),

            averagePassRate:
              average(bucket.passRate),

            averageLatencyMs:
              average(bucket.latency),

            totalCostUsd:
              bucket.cost.reduce(
                (sum, value) =>
                  sum + value,
                0
              ),

            averageCostUsd:
              average(bucket.cost),

            totalTokens:
              bucket.tokens.reduce(
                (sum, value) =>
                  sum + value,
                0
              )
          })
        );

      /*
       * ---------------------------------------------------------
       * SUMMARY
       * ---------------------------------------------------------
       */
      const completed =
        experiments.filter(
          (experiment) =>
            experiment.status ===
            "COMPLETED"
        );

      const failed =
        experiments.filter(
          (experiment) =>
            experiment.status ===
            "FAILED"
        );

      const qualityValues =
        completed
          .map(
            (experiment) =>
              experiment.qualityScore
          )
          .filter(
            (value): value is number =>
              value !== null &&
              value !== undefined
          );

      const latencyValues =
        completed
          .map(
            (experiment) =>
              experiment.avgLatencyMs
          )
          .filter(
            (value): value is number =>
              value !== null &&
              value !== undefined
          );

      const totalCost =
        experiments.reduce(
          (sum, experiment) =>
            sum +
            experiment.totalCostUsd,
          0
        );

      const totalTokens =
        experiments.reduce(
          (sum, experiment) =>
            sum +
            experiment.totalTokens,
          0
        );

      const latest =
        experiments.length
          ? experiments[
              experiments.length - 1
            ]
          : null;

      let baselineQuality:
        | number
        | null = null;

      if (project.baseline?.experimentId) {
        const baselineExperiment =
          experiments.find(
            (experiment) =>
              experiment.id ===
              project.baseline!
                .experimentId
          );

        baselineQuality =
          baselineExperiment
            ?.qualityScore ?? null;
      }

      const regressionPassedCount =
        experiments.filter(
          (experiment) =>
            experiment.regressionPassed ===
            true
        ).length;

      const regressionFailedCount =
        experiments.filter(
          (experiment) =>
            experiment.regressionPassed ===
            false
        ).length;

      return res.json({
        success: true,
        data: {
          summary: {
            totalRuns:
              experiments.length,

            completedRuns:
              completed.length,

            failedRuns:
              failed.length,

            averageQuality:
              average(qualityValues),

            averageLatencyMs:
              average(latencyValues),

            totalCostUsd:
              totalCost,

            totalTokens,

            latestQuality:
              latest?.qualityScore ??
              null,

            baselineQuality,

            regressionPassed:
              regressionPassedCount,

            regressionFailed:
              regressionFailedCount
          },

          trends,

          regressionHistory,

          evaluatorTrends,

          modelComparison
        }
      });
    } catch (error) {
      console.error(
        "Analytics error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to load project analytics"
      });
    }
  }
);

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
  "/:id/datasets/:datasetId/test-cases/bulk",
  async (req: AuthRequest, res) => {
    const projectId = String(req.params.id);
    const datasetId = String(req.params.datasetId);

    const dataset =
      await prisma.dataset.findFirst({
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

    const rawTestCases =
      Array.isArray(req.body)
        ? req.body
        : req.body?.testCases;

    if (!Array.isArray(rawTestCases)) {
      return res.status(400).json({
        success: false,
        message:
          "Expected an array of test cases or { testCases: [...] }"
      });
    }

    if (rawTestCases.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No test cases provided"
      });
    }

    /*
     * Prevent accidentally sending an extremely
     * large request.
     */
    if (rawTestCases.length > 5000) {
      return res.status(400).json({
        success: false,
        message:
          "Maximum 5000 test cases can be imported at once"
      });
    }

    const parsedTestCases = [];

    for (let i = 0; i < rawTestCases.length; i++) {
      const parsed =
        createTestCaseSchema.safeParse(
          rawTestCases[i]
        );

      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: `Invalid test case at row ${
            i + 1
          }`,
          errors:
            parsed.error.flatten()
        });
      }

      parsedTestCases.push(parsed.data);
    }

    try {
      const result =
        await prisma.testCase.createMany({
          data: parsedTestCases.map(
            (testCase) => ({
              datasetId: dataset.id,
              input: testCase.input,
              expectedOutput:
                testCase.expectedOutput ??
                null,
              metadata: testCase.metadata
                ? JSON.stringify(
                    testCase.metadata
                  )
                : null
            })
          )
        });

      return res.status(201).json({
        success: true,
        data: {
          imported: result.count
        },
        message: `${result.count} test cases imported successfully`
      });
    } catch (error) {
      console.error(
        "Bulk test case import error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to import test cases"
      });
    }
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