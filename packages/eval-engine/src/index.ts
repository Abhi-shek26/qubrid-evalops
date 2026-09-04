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
  constructor(private config: RuleConfig = {}) {}

  async evaluate(input: EvaluationInput): Promise<EvaluationResult> {
    const actual = input.actualOutput ?? "";

    /*
     * CASE-SPECIFIC RULES
     *
     * If cases are configured, find the case whose
     * inputContains phrases match the current test input.
     */
    if (this.config.cases?.length) {
      const matchedCase = this.config.cases.find((ruleCase) => {
        if (!ruleCase.inputContains?.length) {
          return true;
        }

        const testInput = input.input.toLowerCase();

        return ruleCase.inputContains.every((phrase) =>
          testInput.includes(phrase.toLowerCase())
        );
      });

      /*
       * No matching case found.
       */
      if (!matchedCase) {
        return {
          score: 0,
          passed: false,
          reason: "No matching rule case found for this test input."
        };
      }

      /*
       * Evaluate the matched case.
       */
      return this.evaluateRules(
        actual,
        input.expectedOutput,
        matchedCase
      );
    }

    /*
     * DEFAULT RULES
     *
     * Used when no case-specific rules are configured.
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
    rules: RuleCase | RuleConfig
  ): EvaluationResult {
    const checks: boolean[] = [];
    const reasons: string[] = [];

    /*
     * Normalize text before comparison.
     *
     * This handles different dash characters such as:
     * 30-day
     * 30–day
     * 30—day
     */
    const normalizeText = (text: string) => {
      return text
        .toLowerCase()
        .replace(/[‐-‒–—―]/g, "-")
        .replace(/\s+/g, " ")
        .trim();
    };

    const normalizedActual = normalizeText(actual);

    /*
     * 1. MUST CONTAIN
     */
    if (rules.mustContain?.length) {
      for (const phrase of rules.mustContain) {
        const normalizedPhrase = normalizeText(phrase);

        const passed = normalizedActual.includes(
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
     * 2. MUST NOT CONTAIN
     */
    if (rules.mustNotContain?.length) {
      for (const phrase of rules.mustNotContain) {
        const normalizedPhrase = normalizeText(phrase);

        const passed = !normalizedActual.includes(
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
     * 3. EXACT MATCH
     */
    if (rules.exactMatch) {
      const expected = expectedOutput ?? "";

      const passed =
        normalizeText(actual) === normalizeText(expected);

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
    if (rules.regex?.length) {
  for (const pattern of rules.regex) {
    const regex = new RegExp(pattern, "i");

    if (regex.test(normalizedActual)) {
      checks.push(true);
      reasons.push(`Matches regex: "${pattern}"`);
    } else {
      checks.push(false);
      reasons.push(`Does not match regex: "${pattern}"`);
    }
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

    const score =
      passedChecks / checks.length;

    const passed =
      checks.every(Boolean);

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
      throw new Error(
        `Unsupported evaluator type: ${type}`
      );
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
    (results.reduce(
      (sum, result) => sum + result.score,
      0
    ) / results.length) *
    100;

  const passRate =
    (results.filter(
      (result) => result.passed
    ).length / results.length) *
    100;

  const latencyValues = results
    .map((result) => result.latencyMs)
    .filter(
      (value): value is number =>
        value != null
    );

  const avgLatencyMs =
    latencyValues.length > 0
      ? latencyValues.reduce(
          (sum, value) => sum + value,
          0
        ) / latencyValues.length
      : 0;

  const totalTokens = results.reduce(
    (sum, result) =>
      sum + (result.totalTokens ?? 0),
    0
  );

  const totalCostUsd = results.reduce(
    (sum, result) =>
      sum + (result.estimatedCostUsd ?? 0),
    0
  );

  const cacheHits = results.filter(
    (result) => result.cacheHit
  ).length;

  const cacheMisses =
    results.length - cacheHits;

  const cacheHitRate =
    (cacheHits / results.length) * 100;

  const cacheMissRate =
    (cacheMisses / results.length) * 100;

  const cachedInputTokens =
    results.reduce(
      (sum, result) =>
        sum +
        (result.cachedInputTokens ?? 0),
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