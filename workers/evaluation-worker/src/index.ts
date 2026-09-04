import dotenv from "dotenv";
dotenv.config();

import { Worker, Job } from "bullmq";
import Redis from "ioredis";
import { PrismaClient } from "@qubrid-evalops/db";
import {
  buildEvaluator,
  aggregate
} from "@qubrid-evalops/eval-engine";
import { QubridClient } from "@qubrid-evalops/qubrid-client";
import { LLMCache } from "@qubrid-evalops/llm-cache";
import type { ChatMessage } from "@qubrid-evalops/shared";

const prisma = new PrismaClient();

const redis = new Redis(
  process.env.REDIS_URL ?? "redis://localhost:6379",
  {
    maxRetriesPerRequest: null
  }
);

const q = new QubridClient({
  apiKey: process.env.QUBRID_API_KEY!,
  baseURL:
    process.env.QUBRID_BASE_URL ??
    "https://platform.qubrid.com/v1"
});

const cache = new LLMCache(
  redis,
  Number(process.env.CACHE_TTL_SECONDS ?? 3600)
);

function parseJson(
  value: string | null | undefined
): Record<string, unknown> {
  if (!value) return {};

  try {
    return JSON.parse(value) as Record<string, unknown>;
  } catch {
    return {};
  }
}

function messages(
  input: string,
  systemPrompt?: string
): ChatMessage[] {
  return [
    ...(systemPrompt
      ? [
          {
            role: "system",
            content: systemPrompt
          } as ChatMessage
        ]
      : []),
    {
      role: "user",
      content: input
    }
  ];
}

async function infer(args: {
  projectId: string;
  model: string;
  input: string;
  systemPrompt?: string;
  temperature?: number;
  topP?: number;
  maxTokens?: number;
  useCache: boolean;
  inputCostPerMillion: number;
  cachedInputCostPerMillion: number;
  outputCostPerMillion: number;
}) {
  const msgs = messages(
    args.input,
    args.systemPrompt
  );

  const keyInput = {
    projectId: args.projectId,
    namespace: "evaluation",
    model: args.model,
    messages: msgs,
    temperature: args.temperature,
    topP: args.topP,
    maxTokens: args.maxTokens
  };

  /*
   * =====================================================
   * CACHE CHECK
   * =====================================================
   */

  if (args.useCache) {
    const hit = await cache.get(keyInput);

    if (hit) {
      console.log(
        `[CACHE HIT] "${args.input.substring(0, 60)}..."`
      );

      return {
        text: hit.text,
        model: hit.model,

        promptTokens: hit.promptTokens,
        completionTokens: hit.completionTokens,
        totalTokens: hit.totalTokens,

        cachedInputTokens:
          hit.cachedInputTokens ?? 0,

        latencyMs: 1,
        originalLatencyMs:
          hit.originalLatencyMs,

        /*
         * We did not call Qubrid.
         * Therefore the current evaluation
         * incurs zero additional LLM cost.
         */
        costUsd: 0,

        /*
         * This is what the request would have
         * cost without our cache.
         */
        uncachedCostUsd:
          hit.estimatedCostUsd,

        cacheHit: true
      };
    }

    console.log(
      `[CACHE MISS] "${args.input.substring(0, 60)}..."`
    );
  }

  /*
   * =====================================================
   * QUBRID API CALL
   * =====================================================
   */

  console.log(
    `[QUBRID CALL] model=${args.model}`
  );

  const response = await q.chat({
    model: args.model,
    messages: msgs,
    temperature: args.temperature,
    topP: args.topP,
    maxTokens: args.maxTokens
  });

  console.log(
    `[QUBRID RESPONSE] latency=${response.latencyMs}ms tokens=${response.usage.totalTokens}`
  );

  /*
   * =====================================================
   * COST CALCULATION
   * =====================================================
   */

  const inputRate =
    args.inputCostPerMillion;

  const outputRate =
    args.outputCostPerMillion;

  const cachedInput =
    response.usage.cachedInputTokens ?? 0;

  const uncachedInput = Math.max(
    0,
    response.usage.promptTokens -
      cachedInput
  );

  const costUsd =
    (uncachedInput / 1_000_000) *
      inputRate +
    (cachedInput / 1_000_000) *
      args.cachedInputCostPerMillion +
    (response.usage.completionTokens /
      1_000_000) *
      outputRate;

  const uncachedCostUsd =
    (response.usage.promptTokens /
      1_000_000) *
      inputRate +
    (response.usage.completionTokens /
      1_000_000) *
      outputRate;

  /*
   * =====================================================
   * STORE RESPONSE IN CACHE
   * =====================================================
   */

  if (args.useCache) {
    await cache.set(keyInput, {
      text: response.text,
      model: response.model,

      promptTokens:
        response.usage.promptTokens,

      completionTokens:
        response.usage.completionTokens,

      totalTokens:
        response.usage.totalTokens,

      cachedInputTokens:
        response.usage.cachedInputTokens,

      originalLatencyMs:
        response.latencyMs,

      estimatedCostUsd: costUsd,

      createdAt:
        new Date().toISOString()
    });

    console.log(
      `[CACHE STORE] "${args.input.substring(0, 60)}..."`
    );
  }

  return {
    text: response.text,
    model: response.model,

    promptTokens:
      response.usage.promptTokens,

    completionTokens:
      response.usage.completionTokens,

    totalTokens:
      response.usage.totalTokens,

    cachedInputTokens:
      response.usage.cachedInputTokens ?? 0,

    latencyMs:
      response.latencyMs,

    originalLatencyMs:
      response.latencyMs,

    costUsd,

    uncachedCostUsd,

    cacheHit: false
  };
}

/*
 * =========================================================
 * RUN EVALUATION
 * =========================================================
 */

async function run(job: Job) {
  const { experimentId } =
    job.data as {
      experimentId: string;
    };

  console.log(
    `\n[EVALUATION START] ${experimentId}`
  );

  const experiment =
    await prisma.experiment.findUnique({
      where: {
        id: experimentId
      },

      include: {
        project: {
          include: {
            evaluators: true
          }
        },

        dataset: {
          include: {
            testCases: true
          }
        }
      }
    });

  if (!experiment) {
    throw new Error(
      "Experiment not found"
    );
  }

  console.log(
    `[EVALUATION] Dataset contains ${experiment.dataset.testCases.length} test cases`
  );

  console.log(
    `[EVALUATION] Cache enabled: ${experiment.useCache}`
  );

  /*
   * Mark experiment as RUNNING
   */

  await prisma.experiment.update({
    where: {
      id: experiment.id
    },

    data: {
      status: "RUNNING"
    }
  });

  /*
   * Load evaluators
   */

  const evaluatorDefs =
    experiment.project.evaluators.map(
      (e) => ({
        type: e.type as any,
        config: parseJson(e.config)
      })
    );

  console.log(
    `[EVALUATION] Evaluators: ${evaluatorDefs.length}`
  );

  const results: Array<any> = [];

  try {
    /*
     * =====================================================
     * RUN EVERY TEST CASE
     * =====================================================
     */

    for (
      const testCase
      of experiment.dataset.testCases
    ) {
      console.log(
        `\n[TEST CASE] ${testCase.id}`
      );

      /*
       * -----------------------------------------------------
       * INFERENCE
       * -----------------------------------------------------
       */

      const response = await infer({
        projectId:
          experiment.projectId,

        model:
          experiment.model,

        input:
          testCase.input,

        systemPrompt:
          experiment.project.systemPrompt ??
          undefined,

        temperature:
          experiment.project.temperature ??
          undefined,

        topP:
          experiment.project.topP ??
          undefined,

        maxTokens:
          experiment.project.maxTokens ??
          undefined,

        useCache:
          experiment.useCache,

        inputCostPerMillion:
          experiment.project
            .inputCostPerMillion,

        cachedInputCostPerMillion:
          experiment.project
            .cachedInputCostPerMillion,

        outputCostPerMillion:
          experiment.project
            .outputCostPerMillion
      });

      /*
       * -----------------------------------------------------
       * EVALUATION
       * -----------------------------------------------------
       */

      let score = 1;

      let passed = true;

      let reason =
        "No evaluators configured.";

      if (evaluatorDefs.length) {
        const checks = [];

        for (
          const def
          of evaluatorDefs
        ) {
          if (
            def.type ===
            "LLM_JUDGE"
          ) {
            checks.push({
              score: 0,
              passed: false,
              reason:
                "LLM_JUDGE is reserved for the next engine module."
            });

            continue;
          }

          const evaluator =
            buildEvaluator(
              def.type,
              def.config
            );

          const result =
            await evaluator.evaluate({
              input:
                testCase.input,

              expectedOutput:
                testCase.expectedOutput ??
                undefined,

              actualOutput:
                response.text,

              metadata:
                parseJson(
                  testCase.metadata
                )
            });

          checks.push(result);
        }

        score =
          checks.reduce(
            (sum, x) =>
              sum + x.score,
            0
          ) /
          checks.length;

        passed =
          checks.every(
            (x) => x.passed
          );

        reason =
          checks
            .map(
              (x) => x.reason
            )
            .join(" | ");
      }

      console.log(
        `[RESULT] score=${score} passed=${passed} cacheHit=${response.cacheHit}`
      );

      /*
       * -----------------------------------------------------
       * SAVE RESULT
       * -----------------------------------------------------
       */

      const row = {
        testCaseId:
          testCase.id,

        actualOutput:
          response.text,

        score,

        passed,

        reason,

        latencyMs:
          response.latencyMs,

        inputTokens:
          response.promptTokens,

        outputTokens:
          response.completionTokens,

        totalTokens:
          response.totalTokens,

        estimatedCostUsd:
          response.costUsd,

        uncachedEstimatedCostUsd:
          response.uncachedCostUsd,

        cacheHit:
          response.cacheHit,

        cachedInputTokens:
          response.cachedInputTokens
      };

      results.push(row);

      await prisma.evaluationResult.create(
        {
          data: {
            experimentId:
              experiment.id,

            ...row
          }
        }
      );
    }

    /*
     * =====================================================
     * AGGREGATE METRICS
     * =====================================================
     */

    const m =
      aggregate(results);

    console.log(
      `\n[EVALUATION COMPLETE]`
    );

    console.log(
      `Quality: ${m.qualityScore.toFixed(2)}%`
    );

    console.log(
      `Pass rate: ${m.passRate.toFixed(2)}%`
    );

    console.log(
      `Cache hit rate: ${m.cacheHitRate.toFixed(2)}%`
    );

    console.log(
      `Cache miss rate: ${m.cacheMissRate.toFixed(2)}%`
    );

    console.log(
      `LLM calls avoided: ${m.llmCallsAvoided}`
    );

    console.log(
      `Estimated savings: $${m.estimatedCostSavedUsd.toFixed(6)}`
    );

    /*
     * =====================================================
     * REGRESSION CHECK
     * =====================================================
     */

    const baseline =
      await prisma.baseline.findUnique({
        where: {
          projectId:
            experiment.projectId
        }
      });

    let regressionPassed = true;

    let regressionDelta:
      number | null = null;

    if (baseline) {
      const base =
        await prisma.experiment.findUnique(
          {
            where: {
              id: baseline.experimentId
            }
          }
        );

      if (
        base?.qualityScore !=
        null
      ) {
        regressionDelta =
          m.qualityScore -
          base.qualityScore;

        regressionPassed =
          regressionDelta >=
          -experiment.allowedQualityDrop;
      }
    }

    /*
     * =====================================================
     * FINAL EXPERIMENT UPDATE
     * =====================================================
     */

    await prisma.experiment.update({
      where: {
        id: experiment.id
      },

      data: {
        status:
          experiment.failOnRegression &&
          !regressionPassed
            ? "FAILED"
            : "COMPLETED",

        qualityScore:
          m.qualityScore,

        passRate:
          m.passRate,

        avgLatencyMs:
          m.avgLatencyMs,

        totalTokens:
          m.totalTokens,

        totalCostUsd:
          m.totalCostUsd,

        cacheHitRate:
          m.cacheHitRate,

        cacheMissRate:
          m.cacheMissRate,

        cachedInputTokens:
          m.cachedInputTokens,

        llmCallsAvoided:
          m.llmCallsAvoided,

        estimatedCostSavedUsd:
          m.estimatedCostSavedUsd,

        regressionDelta,

        regressionPassed
      }
    });

    console.log(
      `[EXPERIMENT FINISHED] ${experiment.id}`
    );
  } catch (error) {
    console.error(
      `[EVALUATION FAILED]`,
      error
    );

    await prisma.experiment.update({
      where: {
        id: experiment.id
      },

      data: {
        status: "FAILED",

        errorMessage:
          error instanceof Error
            ? error.message
            : "Unknown error"
      }
    });

    throw error;
  }
}

/*
 * =========================================================
 * BULLMQ WORKER
 * =========================================================
 */

const worker = new Worker(
  "evaluation",
  run,
  {
    connection: redis,
    concurrency: 3
  }
);

worker.on(
  "completed",
  (job) => {
    console.log(
      `[QUEUE COMPLETED] job=${job.id}`
    );
  }
);

worker.on(
  "failed",
  (job, error) => {
    console.error(
      `[QUEUE FAILED] job=${job?.id}`,
      error
    );
  }
);

worker.on(
  "error",
  (error) => {
    console.error(
      `[WORKER ERROR]`,
      error
    );
  }
);

console.log(
  "Evaluation worker is running"
);