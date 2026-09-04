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
  evaluate(input: EvaluationInput): Promise<EvaluationResult>;
}

type RuleConfig = {
  mustContain?: string[];
  mustNotContain?: string[];
  exactMatch?: boolean;
  regex?: string[];
};

class RuleEvaluator implements Evaluator {
  constructor(private config: RuleConfig = {}) {}

  async evaluate(input: EvaluationInput): Promise<EvaluationResult> {
    const actual = input.actualOutput ?? "";

    const checks: boolean[] = [];
    const reasons: string[] = [];

    /*
     * 1. MUST CONTAIN
     */
    if (this.config.mustContain?.length) {
      for (const phrase of this.config.mustContain) {
        const passed = actual
          .toLowerCase()
          .includes(phrase.toLowerCase());

        checks.push(passed);

        reasons.push(
          passed
            ? `Contains required phrase: "${phrase}"`
            : `Missing required phrase: "${phrase}"`
        );
      }
    }

    /*
     * 2. MUST NOT CONTAIN
     */
    if (this.config.mustNotContain?.length) {
      for (const phrase of this.config.mustNotContain) {
        const passed = !actual
          .toLowerCase()
          .includes(phrase.toLowerCase());

        checks.push(passed);

        reasons.push(
          passed
            ? `Does not contain forbidden phrase: "${phrase}"`
            : `Contains forbidden phrase: "${phrase}"`
        );
      }
    }

    /*
     * 3. EXACT MATCH
     */
    if (this.config.exactMatch) {
      const expected = input.expectedOutput ?? "";

      const passed = actual.trim() === expected.trim();

      checks.push(passed);

      reasons.push(
        passed
          ? "Exact output match."
          : "Output does not exactly match expected output."
      );
    }

    /*
     * 4. REGEX
     */
    if (this.config.regex?.length) {
      for (const pattern of this.config.regex) {
        let passed = false;

        try {
          const regex = new RegExp(pattern, "i");
          passed = regex.test(actual);
        } catch {
          passed = false;
        }

        checks.push(passed);

        reasons.push(
          passed
            ? `Matches regex: "${pattern}"`
            : `Does not match regex: "${pattern}"`
        );
      }
    }

    /*
     * No rules configured
     */
    if (checks.length === 0) {
      return {
        score: 1,
        passed: true,
        reason: "No rule constraints configured."
      };
    }

    /*
     * Calculate score
     */
    const passedChecks = checks.filter(Boolean).length;

    const score = passedChecks / checks.length;

    const passed = checks.every(Boolean);

    return {
      score,
      passed,
      reason: reasons.join(" | ")
    };
  }
}


/*
 * Factory
 */
export function buildEvaluator(
  type: string,
  config: Record<string, unknown> = {}
): Evaluator {
  switch (type) {
    case "RULE":
      return new RuleEvaluator(config as RuleConfig);

    default:
      throw new Error(`Unsupported evaluator type: ${type}`);
  }
}


/*
 * Aggregate experiment results
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
      estimatedCostSavedUsd: 0
    };
  }

  const qualityScore =
    (results.reduce((sum, result) => sum + result.score, 0) /
      results.length) *
    100;

  const passRate =
    (results.filter((result) => result.passed).length /
      results.length) *
    100;

  const latencyValues = results
    .map((result) => result.latencyMs)
    .filter((value): value is number => value != null);

  const avgLatencyMs =
    latencyValues.length > 0
      ? latencyValues.reduce((sum, value) => sum + value, 0) /
        latencyValues.length
      : 0;

  const totalTokens = results.reduce(
    (sum, result) => sum + (result.totalTokens ?? 0),
    0
  );

  const totalCostUsd = results.reduce(
    (sum, result) => sum + (result.estimatedCostUsd ?? 0),
    0
  );

  const cacheHits = results.filter(
    (result) => result.cacheHit
  ).length;

  const cacheMisses = results.length - cacheHits;

  const cacheHitRate =
    (cacheHits / results.length) * 100;

  const cacheMissRate =
    (cacheMisses / results.length) * 100;

  const cachedInputTokens = results.reduce(
    (sum, result) =>
      sum + (result.cachedInputTokens ?? 0),
    0
  );

  const llmCallsAvoided = cacheHits;

  const estimatedCostSavedUsd = results.reduce(
    (sum, result) => {
      if (!result.cacheHit) {
        return sum;
      }

      const uncachedCost =
        result.uncachedEstimatedCostUsd ?? 0;

      return sum + uncachedCost;
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
    estimatedCostSavedUsd
  };
}