import { QubridClient } from "@qubrid-evalops/qubrid-client";
import type { ChatMessage } from "@qubrid-evalops/shared";

export type EvaluationInput = {
  input: string;
  expectedOutput?: string;
  actualOutput: string;
  metadata?: Record<string, unknown>;
};

export type EvaluationUsage = {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  latencyMs: number;
  estimatedCostUsd: number;
  uncachedEstimatedCostUsd: number;
  cachedInputTokens: number;
};

export type EvaluationResult = {
  score: number;
  passed: boolean;
  reason: string;
  usage?: EvaluationUsage;
};

export interface Evaluator {
  evaluate(
    input: EvaluationInput
  ): Promise<EvaluationResult>;
}

/*
 * =========================================================
 * HELPERS
 * =========================================================
 */

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[‐-‒–—―]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function getStringArray(
  value: unknown
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (item): item is string =>
      typeof item === "string" &&
      item.trim().length > 0
  );
}

function getRagContext(
  metadata?: Record<string, unknown>
): string[] {
  if (!metadata) {
    return [];
  }

  return getStringArray(
    metadata.context ??
      metadata.contexts ??
      metadata.retrievedContext ??
      metadata.retrievedContexts
  );
}

function getRagCitations(
  metadata?: Record<string, unknown>
): string[] {
  if (!metadata) {
    return [];
  }

  return getStringArray(
    metadata.citations ??
      metadata.sources ??
      metadata.expectedCitations
  );
}

type EvaluatorPricing = {
  inputCostPerMillion?: number;
  cachedInputCostPerMillion?: number;
  outputCostPerMillion?: number;
};

/*
 * =========================================================
 * RULE EVALUATOR
 * =========================================================
 */

type RuleCase = {
  inputContains?: string[];
  mustContain?: string[];
  mustNotContain?: string[];
  exactMatch?: boolean;
  regex?: string[];
};

type RuleConfig = {
  mustContain?: string[];
  mustNotContain?: string[];
  exactMatch?: boolean;
  regex?: string[];
  cases?: RuleCase[];
};

class RuleEvaluator implements Evaluator {
  constructor(
    private config: RuleConfig = {}
  ) {}

  async evaluate(
    input: EvaluationInput
  ): Promise<EvaluationResult> {
    const actual =
      input.actualOutput ?? "";

    if (this.config.cases?.length) {
      const matchedCase =
        this.config.cases.find(
          (ruleCase) => {
            if (
              !ruleCase.inputContains?.length
            ) {
              return true;
            }

            const testInput =
              input.input.toLowerCase();

            return ruleCase.inputContains.every(
              (phrase) =>
                testInput.includes(
                  phrase.toLowerCase()
                )
            );
          }
        );

      if (!matchedCase) {
        return {
          score: 0,
          passed: false,
          reason:
            "No matching rule case found for this test input.",
        };
      }

      return this.evaluateRules(
        actual,
        input.expectedOutput,
        matchedCase
      );
    }

    return this.evaluateRules(
      actual,
      input.expectedOutput,
      this.config
    );
  }

  private evaluateRules(
    actual: string,
    expectedOutput: string | undefined,
    rules:
      | RuleCase
      | RuleConfig
  ): EvaluationResult {
    const checks: boolean[] = [];
    const reasons: string[] = [];

    const normalizedActual =
      normalizeText(actual);

    if (rules.mustContain?.length) {
      for (const phrase of rules.mustContain) {
        const normalizedPhrase =
          normalizeText(phrase);

        const passed =
          normalizedActual.includes(
            normalizedPhrase
          );

        checks.push(passed);

        reasons.push(
          passed
            ? `Contains required phrase: "${phrase}"`
            : `Missing required phrase: "${phrase}"`
        );
      }
    }

    if (
      rules.mustNotContain?.length
    ) {
      for (const phrase of rules.mustNotContain) {
        const normalizedPhrase =
          normalizeText(phrase);

        const passed =
          !normalizedActual.includes(
            normalizedPhrase
          );

        checks.push(passed);

        reasons.push(
          passed
            ? `Does not contain forbidden phrase: "${phrase}"`
            : `Contains forbidden phrase: "${phrase}"`
        );
      }
    }

    if (rules.exactMatch) {
      const expected =
        expectedOutput ?? "";

      const passed =
        normalizeText(actual) ===
        normalizeText(expected);

      checks.push(passed);

      reasons.push(
        passed
          ? "Exact output match."
          : "Output does not exactly match expected output."
      );
    }

    if (rules.regex?.length) {
      for (const pattern of rules.regex) {
        try {
          const regex =
            new RegExp(
              pattern,
              "i"
            );

          if (
            regex.test(
              normalizedActual
            )
          ) {
            checks.push(true);

            reasons.push(
              `Matches regex: "${pattern}"`
            );
          } else {
            checks.push(false);

            reasons.push(
              `Does not match regex: "${pattern}"`
            );
          }
        } catch {
          checks.push(false);

          reasons.push(
            `Invalid regex: "${pattern}"`
          );
        }
      }
    }

    if (!checks.length) {
      return {
        score: 1,
        passed: true,
        reason:
          "No rule constraints configured.",
      };
    }

    const passedChecks =
      checks.filter(Boolean)
        .length;

    const score =
      passedChecks /
      checks.length;

    const passed =
      checks.every(Boolean);

    return {
      score,
      passed,
      reason:
        reasons.join(" | "),
    };
  }
}

/*
 * =========================================================
 * GENERIC LLM JUDGE
 * =========================================================
 */

type LLMJudgeConfig = {
  judgeModel?: string;

  criteria?: Array<{
    name: string;
    description: string;
  }>;

  threshold?: number;

  systemPrompt?: string;
};

const defaultJudgeCriteria = [
  {
    name: "correctness",
    description:
      "Is the answer factually correct and consistent with the expected answer?",
  },
  {
    name: "relevance",
    description:
      "Does the answer directly address the user's question without unnecessary information?",
  },
  {
    name: "helpfulness",
    description:
      "Does the answer provide a useful and appropriate response to the user?",
  },
];

class LLMJudgeEvaluator
  implements Evaluator
{
  constructor(
    private config: LLMJudgeConfig = {},
    private qubridClient?: QubridClient,
    private pricing: EvaluatorPricing = {}
  ) {}

  async evaluate(
    input: EvaluationInput
  ): Promise<EvaluationResult> {
    if (!this.qubridClient) {
      throw new Error(
        "LLM Judge requires a Qubrid client."
      );
    }

    const judgeModel =
      this.config.judgeModel;

    if (!judgeModel) {
      throw new Error(
        "LLM Judge configuration requires judgeModel."
      );
    }

    const criteria =
      this.config.criteria?.length
        ? this.config.criteria
        : defaultJudgeCriteria;

    const threshold =
      typeof this.config.threshold ===
      "number"
        ? this.config.threshold
        : 0.7;

    const criteriaText =
      criteria
        .map(
          (criterion, index) =>
            `${index + 1}. ${criterion.name}: ${criterion.description}`
        )
        .join("\n");

    const systemPrompt =
      this.config.systemPrompt ??
      `
You are an AI evaluation judge.

Your task is to evaluate the quality of an AI assistant's response.

Evaluate the response using the following criteria:

${criteriaText}

Return ONLY valid JSON.

The JSON must have exactly these fields:

{
  "score": number,
  "passed": boolean,
  "reason": string
}

Rules:
- score must be between 0 and 1.
- passed must be true when score is greater than or equal to ${threshold}.
- passed must be false when score is below ${threshold}.
- reason must briefly explain the evaluation.
- Do not include markdown.
- Do not include any additional fields.
      `.trim();

    const userPrompt = `
USER INPUT:
${input.input}

EXPECTED OUTPUT:
${input.expectedOutput ?? "Not provided"}

ACTUAL MODEL OUTPUT:
${input.actualOutput}

Evaluate the actual model output against the user input and expected output.
    `.trim();

    const response =
      await this.qubridClient.chat({
        model: judgeModel,
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
        temperature: 0,
        maxTokens: 1000,
      });

    const parsed =
      this.parseJudgeResponse(
        response.text
      );

    const score =
      Math.max(
        0,
        Math.min(
          1,
          Number(parsed.score)
        )
      );

    const passed =
      score >= threshold;

    return {
      score,
      passed,
      reason:
        parsed.reason ||
        "LLM Judge completed.",
      usage:
        this.calculateUsage(
          response
        ),
    };
  }

  private calculateUsage(
    response: Awaited<
      ReturnType<QubridClient["chat"]>
    >
  ): EvaluationUsage {
    const inputTokens =
      response.usage?.promptTokens ?? 0;

    const outputTokens =
      response.usage?.completionTokens ?? 0;

    const totalTokens =
      response.usage?.totalTokens ?? 0;

    const cachedInputTokens =
      response.usage?.cachedInputTokens ?? 0;

    const latencyMs =
      response.latencyMs ?? 0;

    const inputRate =
      this.pricing.inputCostPerMillion ?? 0;

    const cachedInputRate =
      this.pricing.cachedInputCostPerMillion ?? 0;

    const outputRate =
      this.pricing.outputCostPerMillion ?? 0;

    const uncachedInputTokens =
      Math.max(
        0,
        inputTokens -
          cachedInputTokens
      );

    const estimatedCostUsd =
      (uncachedInputTokens / 1_000_000) *
        inputRate +
      (cachedInputTokens / 1_000_000) *
        cachedInputRate +
      (outputTokens / 1_000_000) *
        outputRate;

    const uncachedEstimatedCostUsd =
      (inputTokens / 1_000_000) *
        inputRate +
      (outputTokens / 1_000_000) *
        outputRate;

    return {
      inputTokens,
      outputTokens,
      totalTokens,
      latencyMs,
      estimatedCostUsd,
      uncachedEstimatedCostUsd,
      cachedInputTokens,
    };
  }

  private parseJudgeResponse(
    text: string
  ): {
    score: number;
    passed?: boolean;
    reason: string;
  } {
    let cleaned =
      text.trim();

    if (
      cleaned.startsWith("```")
    ) {
      cleaned =
        cleaned
          .replace(
            /^```(?:json)?/i,
            ""
          )
          .replace(
            /```$/i,
            ""
          )
          .trim();
    }

    const start =
      cleaned.indexOf("{");

    const end =
      cleaned.lastIndexOf("}");

    if (
      start !== -1 &&
      end !== -1 &&
      end > start
    ) {
      cleaned =
        cleaned.slice(
          start,
          end + 1
        );
    }

    try {
      const parsed =
        JSON.parse(cleaned);

      if (
        typeof parsed.score !==
        "number"
      ) {
        throw new Error(
          "Judge score must be a number."
        );
      }

      return {
        score: parsed.score,
        passed:
          typeof parsed.passed ===
          "boolean"
            ? parsed.passed
            : undefined,
        reason:
          typeof parsed.reason ===
          "string"
            ? parsed.reason
            : "No reason provided.",
      };
    } catch {
      throw new Error(
        `LLM Judge returned invalid JSON: ${text}`
      );
    }
  }
}

/*
 * =========================================================
 * RAG EVALUATORS
 * =========================================================
 */

type RAGEvaluatorType =
  | "RAG_CORRECTNESS"
  | "RAG_GROUNDEDNESS"
  | "RAG_CITATION"
  | "RAG_HALLUCINATION";

type RAGConfig = {
  judgeModel?: string;
  threshold?: number;
  systemPrompt?: string;
};

class RAGEvaluator
  implements Evaluator
{
  constructor(
    private type: RAGEvaluatorType,
    private config: RAGConfig = {},
    private qubridClient?: QubridClient,
    private pricing: EvaluatorPricing = {}
  ) {}

  async evaluate(
    input: EvaluationInput
  ): Promise<EvaluationResult> {
    if (!this.qubridClient) {
      throw new Error(
        `${this.type} requires a Qubrid client.`
      );
    }

    const context =
      getRagContext(input.metadata);

    const citations =
      getRagCitations(input.metadata);

    if (!context.length) {
      return {
        score: 0,
        passed: false,
        reason:
          "No retrieved RAG context was provided in test case metadata.",
      };
    }

    const judgeModel =
      this.config.judgeModel;

    if (!judgeModel) {
      throw new Error(
        `${this.type} requires judgeModel.`
      );
    }

    const threshold =
      typeof this.config.threshold ===
      "number"
        ? this.config.threshold
        : 0.7;

    const evaluationInstructions =
      this.buildInstructions(
        context,
        citations
      );

    const systemPrompt =
      this.config.systemPrompt ??
      `
You are a strict RAG evaluation judge.

Evaluate the AI assistant response using ONLY the supplied retrieved context.

Return ONLY valid JSON:

{
  "score": number,
  "passed": boolean,
  "reason": string
}

Rules:
- score must be between 0 and 1.
- passed must be true when score >= ${threshold}.
- passed must be false when score < ${threshold}.
- reason must briefly explain the score.
- Do not include markdown.
- Do not invent facts.
      `.trim();

    const userPrompt = `
USER QUESTION:
${input.input}

EXPECTED OUTPUT:
${input.expectedOutput ?? "Not provided"}

RETRIEVED CONTEXT:
${context
  .map(
    (item, index) =>
      `[Context ${index + 1}] ${item}`
  )
  .join("\n")}

AVAILABLE CITATIONS:
${
  citations.length
    ? citations.join("\n")
    : "None provided"
}

ACTUAL MODEL OUTPUT:
${input.actualOutput}

${evaluationInstructions}
    `.trim();

    const response =
      await this.qubridClient.chat({
        model: judgeModel,
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
        temperature: 0,
        maxTokens: 300,
      });

    const parsed =
      this.parseJudgeResponse(
        response.text
      );

    const score =
      Math.max(
        0,
        Math.min(
          1,
          Number(parsed.score)
        )
      );

    return {
      score,
      passed:
        score >= threshold,
      reason:
        parsed.reason ||
        `${this.type} completed.`,
      usage:
        this.calculateUsage(
          response
        ),
    };
  }

  private buildInstructions(
    context: string[],
    citations: string[]
  ): string {
    switch (this.type) {
      case "RAG_CORRECTNESS":
        return `
Evaluate RAG correctness.

Check whether:
1. The answer directly answers the user's question.
2. The answer agrees with the expected output when one is provided.
3. Important claims are consistent with the retrieved context.
4. The answer does not introduce contradictory information.

Give a high score only when the answer is substantively correct.
        `.trim();

      case "RAG_GROUNDEDNESS":
        return `
Evaluate groundedness.

Check whether the factual claims in the actual answer are supported by
the retrieved context.

A response is highly grounded when its important claims can be traced
back to the supplied context.

Lower the score when the answer contains unsupported factual claims.
        `.trim();

      case "RAG_CITATION":
        return `
Evaluate citation correctness.

Check whether:
1. The answer uses the available citations appropriately.
2. Citations support the claims they are attached to.
3. The response does not cite unrelated or unsupported sources.
4. Important sourced claims have appropriate citation support.

If no citations were supplied, explain that limitation in the reason.
        `.trim();

      case "RAG_HALLUCINATION":
        return `
Evaluate hallucination.

Look for factual statements in the actual answer that are not supported
by the retrieved context.

Score 1.0 when there are no meaningful unsupported factual claims.

Reduce the score proportionally as unsupported or fabricated claims
increase.

Focus specifically on hallucinated facts, policies, numbers, names,
dates, or other information not supported by the context.
        `.trim();
    }
  }

  private calculateUsage(
    response: Awaited<
      ReturnType<QubridClient["chat"]>
    >
  ): EvaluationUsage {
    const inputTokens =
      response.usage?.promptTokens ?? 0;

    const outputTokens =
      response.usage?.completionTokens ?? 0;

    const totalTokens =
      response.usage?.totalTokens ?? 0;

    const cachedInputTokens =
      response.usage?.cachedInputTokens ?? 0;

    const latencyMs =
      response.latencyMs ?? 0;

    const inputRate =
      this.pricing.inputCostPerMillion ?? 0;

    const cachedInputRate =
      this.pricing.cachedInputCostPerMillion ?? 0;

    const outputRate =
      this.pricing.outputCostPerMillion ?? 0;

    const uncachedInputTokens =
      Math.max(
        0,
        inputTokens -
          cachedInputTokens
      );

    const estimatedCostUsd =
      (uncachedInputTokens / 1_000_000) *
        inputRate +
      (cachedInputTokens / 1_000_000) *
        cachedInputRate +
      (outputTokens / 1_000_000) *
        outputRate;

    const uncachedEstimatedCostUsd =
      (inputTokens / 1_000_000) *
        inputRate +
      (outputTokens / 1_000_000) *
        outputRate;

    return {
      inputTokens,
      outputTokens,
      totalTokens,
      latencyMs,
      estimatedCostUsd,
      uncachedEstimatedCostUsd,
      cachedInputTokens,
    };
  }

  private parseJudgeResponse(
    text: string
  ): {
    score: number;
    passed?: boolean;
    reason: string;
  } {
    let cleaned = text.trim();

    // Remove markdown code fences if the judge returns them.
    cleaned = cleaned
      .replace(/^```(?:json)?/i, "")
      .replace(/```$/i, "")
      .trim();

    // Keep only the JSON-like portion when extra text is present.
    const start = cleaned.indexOf("{");

    if (start !== -1) {
      cleaned = cleaned.slice(start).trim();
    }

    // First try to parse a complete JSON response.
    try {
      const parsed = JSON.parse(cleaned);

      if (
        !parsed ||
        typeof parsed.score !== "number"
      ) {
        throw new Error(
          "RAG judge score must be a number."
        );
      }

      return {
        score: parsed.score,
        passed:
          typeof parsed.passed === "boolean"
            ? parsed.passed
            : undefined,
        reason:
          typeof parsed.reason === "string"
            ? parsed.reason
            : "No reason provided.",
      };
    } catch {
      // The model can sometimes stop before completing the JSON.
      // Recover the score/passed/reason from a partial response.
    }

    // Example of a truncated response:
    // {
    //   "score": 0.95
    const scoreMatch = cleaned.match(
      /"score"\s*:\s*([0-9]*\.?[0-9]+)/i
    );

    if (!scoreMatch) {
      throw new Error(
        `${this.type} returned invalid JSON: ${text}`
      );
    }

    const score = Number(scoreMatch[1]);

    if (!Number.isFinite(score)) {
      throw new Error(
        `${this.type} returned an invalid score: ${text}`
      );
    }

    const passedMatch = cleaned.match(
      /"passed"\s*:\s*(true|false)/i
    );

    const passed = passedMatch
      ? passedMatch[1].toLowerCase() === "true"
      : undefined;

    const reasonMatch = cleaned.match(
      /"reason"\s*:\s*"((?:\\.|[^"\\])*)/i
    );

    let reason = "No reason provided.";

    if (reasonMatch) {
      reason = reasonMatch[1]
        .replace(/\"/g, '"')
        .replace(/\\/g, "\\");
    } else if (cleaned.length > 0) {
      reason =
        "RAG judge returned a truncated response; score was recovered successfully.";
    }

    return {
      score,
      passed,
      reason,
    };
  }
}

/*
 * =========================================================
 * FACTORY
 * =========================================================
 */

export type EvaluatorContext = {
  qubridClient?: QubridClient;
  inputCostPerMillion?: number;
  cachedInputCostPerMillion?: number;
  outputCostPerMillion?: number;
};

export function buildEvaluator(
  type: string,
  config: Record<string, unknown> = {},
  context: EvaluatorContext = {}
): Evaluator {
  switch (type) {
    case "RULE":
      return new RuleEvaluator(
        config as RuleConfig
      );

    case "LLM_JUDGE":
      return new LLMJudgeEvaluator(
        config as LLMJudgeConfig,
        context.qubridClient,
        {
          inputCostPerMillion:
            context.inputCostPerMillion,
          cachedInputCostPerMillion:
            context.cachedInputCostPerMillion,
          outputCostPerMillion:
            context.outputCostPerMillion,
        }
      );

    case "RAG_CORRECTNESS":
    case "RAG_GROUNDEDNESS":
    case "RAG_CITATION":
    case "RAG_HALLUCINATION":
      return new RAGEvaluator(
        type as RAGEvaluatorType,
        config as RAGConfig,
        context.qubridClient,
        {
          inputCostPerMillion:
            context.inputCostPerMillion,
          cachedInputCostPerMillion:
            context.cachedInputCostPerMillion,
          outputCostPerMillion:
            context.outputCostPerMillion,
        }
      );

    default:
      throw new Error(
        `Unsupported evaluator type: ${type}`
      );
  }
}

/*
 * =========================================================
 * AGGREGATION
 * =========================================================
 */

export function aggregate(
  results: Array<{
    score: number;
    passed: boolean;
    latencyMs?: number | null;
    totalTokens?: number | null;
    estimatedCostUsd?: number | null;
    cacheHit?: boolean;
    cachedInputTokens?: number | null;
    uncachedEstimatedCostUsd?: number | null;
    evaluatorUsage?: EvaluationUsage | null;
  }>
) {
  if (!results.length) {
    return {
      qualityScore: 0,
      passRate: 0,
      avgLatencyMs: 0,
      totalTokens: 0,
      totalCostUsd: 0,
      cacheHitRate: 0,
      cacheMissRate: 0,
      cachedInputTokens: 0,
      llmCallsAvoided: 0,
      estimatedCostSavedUsd: 0,
    };
  }

  const qualityScore =
    (results.reduce(
      (sum, result) =>
        sum + result.score,
      0
    ) /
      results.length) *
    100;

  const passRate =
    (results.filter(
      (result) =>
        result.passed
    ).length /
      results.length) *
    100;

  const latencyValues =
    results.map(
      (result) =>
        (result.latencyMs ?? 0) +
        (result.evaluatorUsage?.latencyMs ?? 0)
    );

  const avgLatencyMs =
    latencyValues.length > 0
      ? latencyValues.reduce(
          (sum, value) =>
            sum + value,
          0
        ) /
        latencyValues.length
      : 0;

  const totalTokens =
    results.reduce(
      (sum, result) =>
        sum +
        (result.totalTokens ??
          0) +
        (result.evaluatorUsage?.totalTokens ??
          0),
      0
    );

  const totalCostUsd =
    results.reduce(
      (sum, result) =>
        sum +
        (result.estimatedCostUsd ??
          0) +
        (result.evaluatorUsage?.estimatedCostUsd ??
          0),
      0
    );

  const cacheHits =
    results.filter(
      (result) =>
        result.cacheHit
    ).length;

  const cacheMisses =
    results.length -
    cacheHits;

  const cacheHitRate =
    (cacheHits /
      results.length) *
    100;

  const cacheMissRate =
    (cacheMisses /
      results.length) *
    100;

  const cachedInputTokens =
    results.reduce(
      (sum, result) =>
        sum +
        (result.cachedInputTokens ??
          0),
      0
    );

  const llmCallsAvoided =
    cacheHits;

  const estimatedCostSavedUsd =
    results.reduce(
      (sum, result) => {
        if (!result.cacheHit) {
          return sum;
        }

        return (
          sum +
          (result.uncachedEstimatedCostUsd ??
            0)
        );
      },
      0
    );

  return {
    qualityScore,
    passRate,
    avgLatencyMs,
    totalTokens,
    totalCostUsd,
    cacheHitRate,
    cacheMissRate,
    cachedInputTokens,
    llmCallsAvoided,
    estimatedCostSavedUsd,
  };
}