import { QubridClient } from "@qubrid-evalops/qubrid-client";
import type { ChatMessage } from "@qubrid-evalops/shared";

export type EvaluationInput = {
  input: string;
  expectedOutput?: string;
  actualOutput: string;
  metadata?: Record<string, unknown>;
};

export type EvaluationResult = {
  score: number;
  passed: boolean;
  reason: string;
};

export interface Evaluator {
  evaluate(
    input: EvaluationInput
  ): Promise<EvaluationResult>;
}

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

    /*
     * CASE-SPECIFIC RULES
     */
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

    /*
     * DEFAULT RULES
     */
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

    /*
     * Normalize text
     */
    const normalizeText = (
      text: string
    ) => {
      return text
        .toLowerCase()
        .replace(
          /[‐-‒–—―]/g,
          "-"
        )
        .replace(
          /\s+/g,
          " "
        )
        .trim();
    };

    const normalizedActual =
      normalizeText(actual);

    /*
     * MUST CONTAIN
     */
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

    /*
     * MUST NOT CONTAIN
     */
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

    /*
     * EXACT MATCH
     */
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

    /*
     * REGEX
     */
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

    /*
     * No rules
     */
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
 * LLM JUDGE
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
    private qubridClient?: QubridClient
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

    const messages: ChatMessage[] = [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ];

    const response =
      await this.qubridClient.chat({
        model: judgeModel,
        messages,
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

    const passed =
      score >= threshold;

    return {
      score,
      passed,
      reason:
        parsed.reason ||
        "LLM Judge completed.",
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

    /*
     * Remove markdown code fences
     */
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

    /*
     * Find the first JSON object if
     * the model added extra text.
     */
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
 * FACTORY
 * =========================================================
 */

export type EvaluatorContext = {
  qubridClient?: QubridClient;
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
        context.qubridClient
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
    results
      .map(
        (result) =>
          result.latencyMs
      )
      .filter(
        (
          value
        ): value is number =>
          value != null
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
          0),
      0
    );

  const totalCostUsd =
    results.reduce(
      (sum, result) =>
        sum +
        (result.estimatedCostUsd ??
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