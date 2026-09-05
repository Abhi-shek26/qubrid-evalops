"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { API_URL, authHeaders } from "../../../../lib-api";

type Evaluator = {
  id: string;
  name: string;
  type: string;
  config: unknown;
};

type RuleCaseForm = {
  inputContains: string;
  mustContain: string;
  mustNotContain: string;
  regex: string;
  exactMatch: boolean;
};

type JudgeCriterion = {
  name: string;
  description: string;
};

const defaultRuleCase: RuleCaseForm = {
  inputContains: "",
  mustContain: "",
  mustNotContain: "",
  regex: "",
  exactMatch: false,
};

const defaultRuleConfig: {
  cases: Array<{
    inputContains: string[];
    mustContain?: string[];
    mustNotContain?: string[];
    regex?: string[];
    exactMatch?: boolean;
  }>;
} = {
  cases: [
    {
      inputContains: ["20 days"],
      mustContain: ["proof of purchase"],
      regex: ["30[- ]day(s)?"],
    },
    {
      inputContains: ["45 days"],
      regex: ["30[- ]day(s)?"],
    },
    {
      inputContains: [
        "10 days",
        "don't have my receipt",
      ],
      mustContain: ["proof of purchase"],
      regex: ["30[- ]day(s)?"],
    },
    {
      inputContains: ["18 days"],
      regex: ["30[- ]day(s)?"],
    },
  ],
};

const defaultJudgeCriteria: JudgeCriterion[] = [
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

function splitValues(
  value: string
): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function ruleCaseToConfig(
  ruleCase: RuleCaseForm
) {
  const config: {
    inputContains?: string[];
    mustContain?: string[];
    mustNotContain?: string[];
    regex?: string[];
    exactMatch?: boolean;
  } = {};

  const inputContains = splitValues(
    ruleCase.inputContains
  );

  const mustContain = splitValues(
    ruleCase.mustContain
  );

  const mustNotContain = splitValues(
    ruleCase.mustNotContain
  );

  const regex = splitValues(
    ruleCase.regex
  );

  if (inputContains.length > 0) {
    config.inputContains =
      inputContains;
  }

  if (mustContain.length > 0) {
    config.mustContain =
      mustContain;
  }

  if (mustNotContain.length > 0) {
    config.mustNotContain =
      mustNotContain;
  }

  if (regex.length > 0) {
    config.regex = regex;
  }

  if (ruleCase.exactMatch) {
    config.exactMatch = true;
  }

  return config;
}

function defaultRuleCases(): RuleCaseForm[] {
  return defaultRuleConfig.cases.map(
    (ruleCase) => ({
      inputContains:
        ruleCase.inputContains?.join(
          ", "
        ) ?? "",

      mustContain:
        ruleCase.mustContain?.join(
          ", "
        ) ?? "",

      mustNotContain:
        ruleCase.mustNotContain?.join(
          ", "
        ) ?? "",

      regex:
        ruleCase.regex?.join(
          ", "
        ) ?? "",

      exactMatch:
        ruleCase.exactMatch ?? false,
    })
  );
}

export default function EvaluatorsPage() {
  const { id } =
    useParams<{ id: string }>();

  const [evaluators, setEvaluators] =
    useState<Evaluator[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [showForm, setShowForm] =
    useState(false);

  const [name, setName] =
    useState("");

  const [type, setType] =
    useState<"RULE" | "LLM_JUDGE">(
      "RULE"
    );

  // RULE state
  const [ruleCases, setRuleCases] =
    useState<RuleCaseForm[]>(
      defaultRuleCases()
    );

  // LLM Judge state
  const [judgeModel, setJudgeModel] =
    useState(
      "openai/gpt-oss-120b"
    );

  const [judgeThreshold, setJudgeThreshold] =
    useState("0.7");

  const [judgeCriteria, setJudgeCriteria] =
    useState<JudgeCriterion[]>(
      defaultJudgeCriteria
    );

  const [error, setError] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  async function load() {
    try {
      setError("");

      const response =
        await fetch(
          `${API_URL}/api/v1/projects/${id}/evaluators`,
          {
            headers: authHeaders(),
            cache: "no-store",
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to load evaluators"
        );
      }

      setEvaluators(
        data.data ?? []
      );
    } catch (err: any) {
      setError(
        err.message ||
          "Failed to load evaluators"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      load();
    }
  }, [id]);

  function updateRuleCase(
    index: number,
    field: keyof RuleCaseForm,
    value: string | boolean
  ) {
    setRuleCases((current) =>
      current.map(
        (ruleCase, i) =>
          i === index
            ? {
                ...ruleCase,
                [field]: value,
              }
            : ruleCase
      )
    );
  }

  function addRuleCase() {
    setRuleCases((current) => [
      ...current,
      {
        ...defaultRuleCase,
      },
    ]);
  }

  function removeRuleCase(
    index: number
  ) {
    if (ruleCases.length === 1) {
      setError(
        "At least one rule case is required."
      );
      return;
    }

    setRuleCases((current) =>
      current.filter(
        (_, i) => i !== index
      )
    );
  }

  function updateJudgeCriterion(
    index: number,
    field: keyof JudgeCriterion,
    value: string
  ) {
    setJudgeCriteria((current) =>
      current.map(
        (criterion, i) =>
          i === index
            ? {
                ...criterion,
                [field]: value,
              }
            : criterion
      )
    );
  }

  function addJudgeCriterion() {
    setJudgeCriteria((current) => [
      ...current,
      {
        name: "",
        description: "",
      },
    ]);
  }

  function removeJudgeCriterion(
    index: number
  ) {
    if (judgeCriteria.length === 1) {
      setError(
        "At least one LLM Judge criterion is required."
      );
      return;
    }

    setJudgeCriteria((current) =>
      current.filter(
        (_, i) => i !== index
      )
    );
  }

  function buildRuleConfig() {
    const cases = ruleCases
      .map((ruleCase) =>
        ruleCaseToConfig(
          ruleCase
        )
      )
      .filter(
        (ruleCase) =>
          Object.keys(
            ruleCase
          ).length > 0
      );

    return {
      cases,
    };
  }

  function buildJudgeConfig() {
    return {
      judgeModel:
        judgeModel.trim(),

      threshold:
        Number(judgeThreshold),

      criteria:
        judgeCriteria
          .map((criterion) => ({
            name:
              criterion.name.trim(),
            description:
              criterion.description.trim(),
          }))
          .filter(
            (criterion) =>
              criterion.name &&
              criterion.description
          ),
    };
  }

  function buildConfig() {
    return type === "RULE"
      ? buildRuleConfig()
      : buildJudgeConfig();
  }

  function resetForm() {
    setName("");

    setType("RULE");

    setRuleCases(
      defaultRuleCases()
    );

    setJudgeModel(
      "openai/gpt-oss-120b"
    );

    setJudgeThreshold("0.7");

    setJudgeCriteria(
      defaultJudgeCriteria
    );

    setError("");
  }

  async function createEvaluator() {
    try {
      setSaving(true);
      setError("");

      if (!name.trim()) {
        setError(
          "Evaluator name is required."
        );
        return;
      }

      if (type === "RULE") {
        const config =
          buildRuleConfig();

        if (
          !config.cases.length
        ) {
          setError(
            "Add at least one rule condition."
          );
          return;
        }

        const response =
          await fetch(
            `${API_URL}/api/v1/projects/${id}/evaluators`,
            {
              method: "POST",
              headers: {
                ...authHeaders(),
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                name: name.trim(),
                type: "RULE",
                config,
              }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "Failed to create evaluator"
          );
        }
      }

      if (type === "LLM_JUDGE") {
        const threshold =
          Number(
            judgeThreshold
          );

        if (
          !judgeModel.trim()
        ) {
          setError(
            "Judge model is required."
          );
          return;
        }

        if (
          !Number.isFinite(
            threshold
          ) ||
          threshold < 0 ||
          threshold > 1
        ) {
          setError(
            "Threshold must be between 0 and 1."
          );
          return;
        }

        const config =
          buildJudgeConfig();

        if (
          !config.criteria.length
        ) {
          setError(
            "Add at least one valid judge criterion."
          );
          return;
        }

        const response =
          await fetch(
            `${API_URL}/api/v1/projects/${id}/evaluators`,
            {
              method: "POST",
              headers: {
                ...authHeaders(),
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                name: name.trim(),
                type: "LLM_JUDGE",
                config,
              }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "Failed to create evaluator"
          );
        }
      }

      resetForm();
      setShowForm(false);

      await load();
    } catch (err: any) {
      setError(
        err.message ||
          "Failed to create evaluator"
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteEvaluator(
    evaluatorId: string
  ) {
    if (
      !window.confirm(
        "Delete this evaluator?"
      )
    ) {
      return;
    }

    try {
      setError("");

      const response =
        await fetch(
          `${API_URL}/api/v1/projects/${id}/evaluators/${evaluatorId}`,
          {
            method: "DELETE",
            headers: authHeaders(),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to delete evaluator"
        );
      }

      await load();
    } catch (err: any) {
      setError(
        err.message ||
          "Failed to delete evaluator"
      );
    }
  }

  function formatConfig(
    config: unknown
  ) {
    if (
      typeof config === "string"
    ) {
      try {
        return JSON.stringify(
          JSON.parse(config),
          null,
          2
        );
      } catch {
        return config;
      }
    }

    return JSON.stringify(
      config,
      null,
      2
    );
  }

  if (loading) {
    return (
      <main>
        <div className="card">
          <p>
            Loading evaluators...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* HEADER */}

      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1>Evaluators</h1>

            <p
              style={{
                marginTop: "8px",
                opacity: 0.7,
              }}
            >
              Define how AI responses are
              evaluated for quality.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              if (showForm) {
                resetForm();
              }

              setShowForm(
                (value) => !value
              );
            }}
          >
            {showForm
              ? "Cancel"
              : "+ Create Evaluator"}
          </button>
        </div>

        {error && !showForm && (
          <div
            style={{
              marginTop: "18px",
              padding: "14px",
              borderRadius: "8px",
              background:
                "rgba(255,80,80,0.1)",
              border:
                "1px solid rgba(255,80,80,0.3)",
              color: "#ff8080",
            }}
          >
            {error}
          </div>
        )}
      </div>

      {/* CREATE FORM */}

      {showForm && (
        <div className="card">
          <h2>
            Create Evaluator
          </h2>

          <p
            style={{
              marginTop: "8px",
              opacity: 0.65,
            }}
          >
            Choose how EvalOps should judge
            the model responses.
          </p>

          {/* SCOPE WARNING */}

          <div
            style={{
              marginTop: "24px",
              padding: "16px",
              borderRadius: "10px",
              border:
                "1px solid rgba(255, 190, 80, 0.35)",
              background:
                "rgba(255, 190, 80, 0.08)",
            }}
          >
            <div
              style={{
                fontWeight: 600,
                marginBottom: "6px",
              }}
            >
              ⚠ Evaluator scope
            </div>

            <div
              style={{
                fontSize: "13px",
                lineHeight: "1.6",
                opacity: 0.8,
              }}
            >
              This evaluator will run on{" "}
              <strong>
                every test case
              </strong>{" "}
              in every evaluation for this
              project.
              <br />
              If you create multiple evaluators,
              <strong>
                {" "}
                all evaluators will be applied
                to every test case.
              </strong>
            </div>
          </div>

          {/* NAME */}

          <div
            style={{
              marginTop: "22px",
            }}
          >
            <label
              style={{
                display: "block",
                fontWeight: 600,
                fontSize: "13px",
                marginBottom: "8px",
              }}
            >
              Evaluator Name
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              placeholder="Refund Policy Checker"
              style={{
                width: "100%",
                maxWidth: "700px",
              }}
            />
          </div>

          {/* TYPE */}

          <div
            style={{
              marginTop: "18px",
            }}
          >
            <label
              style={{
                display: "block",
                fontWeight: 600,
                fontSize: "13px",
                marginBottom: "8px",
              }}
            >
              Evaluator Type
            </label>

            <select
              value={type}
              onChange={(e) => {
                setType(
                  e.target
                    .value as
                    | "RULE"
                    | "LLM_JUDGE"
                );

                setError("");
              }}
              style={{
                width: "100%",
                maxWidth: "700px",
              }}
            >
              <option value="RULE">
                RULE
              </option>

              <option value="LLM_JUDGE">
                LLM JUDGE
              </option>
            </select>
          </div>

          {/* RULE CONFIGURATION */}

          {type === "RULE" && (
            <div
              style={{
                marginTop: "28px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <h3>
                    Rule Cases
                  </h3>

                  <p
                    style={{
                      marginTop:
                        "4px",
                      fontSize:
                        "13px",
                      opacity: 0.6,
                    }}
                  >
                    Separate multiple values
                    with commas.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={
                    addRuleCase
                  }
                >
                  + Add Rule Case
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection:
                    "column",
                  gap: "16px",
                  marginTop: "16px",
                }}
              >
                {ruleCases.map(
                  (
                    ruleCase,
                    index
                  ) => (
                    <div
                      key={index}
                      style={{
                        padding:
                          "18px",
                        border:
                          "1px solid #29334d",
                        borderRadius:
                          "12px",
                        background:
                          "rgba(255,255,255,0.02)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent:
                            "space-between",
                          alignItems:
                            "center",
                          gap: "10px",
                        }}
                      >
                        <h3>
                          Rule Case{" "}
                          {index + 1}
                        </h3>

                        <button
                          type="button"
                          onClick={() =>
                            removeRuleCase(
                              index
                            )
                          }
                          style={{
                            background:
                              "#3a1820",
                          }}
                        >
                          Remove
                        </button>
                      </div>

                      {/* INPUT CONTAINS */}

                      <div
                        style={{
                          marginTop:
                            "18px",
                        }}
                      >
                        <label
                          style={{
                            display:
                              "block",
                            fontSize:
                              "13px",
                            fontWeight:
                              600,
                            marginBottom:
                              "7px",
                          }}
                        >
                          Input Contains
                        </label>

                        <input
                          value={
                            ruleCase.inputContains
                          }
                          onChange={(
                            e
                          ) =>
                            updateRuleCase(
                              index,
                              "inputContains",
                              e.target
                                .value
                            )
                          }
                          placeholder="20 days, refund"
                          style={{
                            width:
                              "100%",
                          }}
                        />

                        <small
                          style={{
                            opacity:
                              0.5,
                          }}
                        >
                          All listed phrases
                          must appear in
                          the test input.
                        </small>
                      </div>

                      {/* MUST CONTAIN */}

                      <div
                        style={{
                          marginTop:
                            "16px",
                        }}
                      >
                        <label
                          style={{
                            display:
                              "block",
                            fontSize:
                              "13px",
                            fontWeight:
                              600,
                            marginBottom:
                              "7px",
                          }}
                        >
                          Response Must
                          Contain
                        </label>

                        <input
                          value={
                            ruleCase.mustContain
                          }
                          onChange={(
                            e
                          ) =>
                            updateRuleCase(
                              index,
                              "mustContain",
                              e.target
                                .value
                            )
                          }
                          placeholder="30-day, proof of purchase"
                          style={{
                            width:
                              "100%",
                          }}
                        />
                      </div>

                      {/* MUST NOT CONTAIN */}

                      <div
                        style={{
                          marginTop:
                            "16px",
                        }}
                      >
                        <label
                          style={{
                            display:
                              "block",
                            fontSize:
                              "13px",
                            fontWeight:
                              600,
                            marginBottom:
                              "7px",
                          }}
                        >
                          Response Must NOT
                          Contain
                        </label>

                        <input
                          value={
                            ruleCase.mustNotContain
                          }
                          onChange={(
                            e
                          ) =>
                            updateRuleCase(
                              index,
                              "mustNotContain",
                              e.target
                                .value
                            )
                          }
                          placeholder="guaranteed refund"
                          style={{
                            width:
                              "100%",
                          }}
                        />
                      </div>

                      {/* REGEX */}

                      <div
                        style={{
                          marginTop:
                            "16px",
                        }}
                      >
                        <label
                          style={{
                            display:
                              "block",
                            fontSize:
                              "13px",
                            fontWeight:
                              600,
                            marginBottom:
                              "7px",
                          }}
                        >
                          Regex
                        </label>

                        <input
                          value={
                            ruleCase.regex
                          }
                          onChange={(
                            e
                          ) =>
                            updateRuleCase(
                              index,
                              "regex",
                              e.target
                                .value
                            )
                          }
                          placeholder="30[- ]day(s)?"
                          style={{
                            width:
                              "100%",
                            fontFamily:
                              "monospace",
                          }}
                        />
                      </div>

                      {/* EXACT MATCH */}

                      <div
                        style={{
                          marginTop:
                            "18px",
                          display:
                            "flex",
                          alignItems:
                            "center",
                          gap: "10px",
                          width:
                            "fit-content",
                        }}
                      >
                        <input
                          id={`exact-match-${index}`}
                          type="checkbox"
                          checked={
                            ruleCase.exactMatch
                          }
                          onChange={(
                            e
                          ) =>
                            updateRuleCase(
                              index,
                              "exactMatch",
                              e.target
                                .checked
                            )
                          }
                          style={{
                            width:
                              "16px",
                            height:
                              "16px",
                            margin: 0,
                            padding: 0,
                            flexShrink:
                              0,
                            cursor:
                              "pointer",
                            accentColor:
                              "#638cff",
                          }}
                        />

                        <label
                          htmlFor={`exact-match-${index}`}
                          style={{
                            display:
                              "inline",
                            margin: 0,
                            padding: 0,
                            fontSize:
                              "13px",
                            fontWeight:
                              400,
                            cursor:
                              "pointer",
                            lineHeight:
                              "1.4",
                          }}
                        >
                          Require exact
                          output match
                        </label>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* LLM JUDGE CONFIGURATION */}

          {type ===
            "LLM_JUDGE" && (
            <div
              style={{
                marginTop: "28px",
              }}
            >
              {/* JUDGE MODEL */}

              <div>
                <label
                  style={{
                    display:
                      "block",
                    fontWeight:
                      600,
                    fontSize:
                      "13px",
                    marginBottom:
                      "8px",
                  }}
                >
                  Judge Model
                </label>

                <input
                  value={
                    judgeModel
                  }
                  onChange={(
                    e
                  ) =>
                    setJudgeModel(
                      e.target
                        .value
                    )
                  }
                  placeholder="openai/gpt-oss-120b"
                  style={{
                    width:
                      "100%",
                    maxWidth:
                      "700px",
                  }}
                />

                <small
                  style={{
                    display:
                      "block",
                    marginTop:
                      "6px",
                    opacity:
                      0.55,
                  }}
                >
                  This model will judge
                  the application's
                  response.
                </small>
              </div>

              {/* THRESHOLD */}

              <div
                style={{
                  marginTop:
                    "18px",
                }}
              >
                <label
                  style={{
                    display:
                      "block",
                    fontWeight:
                      600,
                    fontSize:
                      "13px",
                    marginBottom:
                      "8px",
                  }}
                >
                  Pass Threshold
                </label>

                <input
                  type="number"
                  min="0"
                  max="1"
                  step="0.05"
                  value={
                    judgeThreshold
                  }
                  onChange={(
                    e
                  ) =>
                    setJudgeThreshold(
                      e.target
                        .value
                    )
                  }
                  style={{
                    width:
                      "100%",
                    maxWidth:
                      "200px",
                  }}
                />

                <small
                  style={{
                    display:
                      "block",
                    marginTop:
                      "6px",
                    opacity:
                      0.55,
                  }}
                >
                  Score must be greater
                  than or equal to
                  this value to pass.
                  Example: 0.7 = 70%.
                </small>
              </div>

              {/* CRITERIA */}

              <div
                style={{
                  marginTop:
                    "28px",
                }}
              >
                <div
                  style={{
                    display:
                      "flex",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "center",
                    gap: "10px",
                    flexWrap:
                      "wrap",
                  }}
                >
                  <div>
                    <h3>
                      Evaluation Criteria
                    </h3>

                    <p
                      style={{
                        marginTop:
                          "4px",
                        fontSize:
                          "13px",
                        opacity: 0.6,
                      }}
                    >
                      Define what the judge should
                      evaluate.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={
                      addJudgeCriterion
                    }
                  >
                    + Add Criterion
                  </button>
                </div>

                <div
                  style={{
                    display:
                      "flex",
                    flexDirection:
                      "column",
                    gap: "16px",
                    marginTop:
                      "16px",
                  }}
                >
                  {judgeCriteria.map(
                    (
                      criterion,
                      index
                    ) => (
                      <div
                        key={index}
                        style={{
                          padding:
                            "18px",
                          border:
                            "1px solid #29334d",
                          borderRadius:
                            "12px",
                          background:
                            "rgba(255,255,255,0.02)",
                        }}
                      >
                        <div
                          style={{
                            display:
                              "flex",
                            justifyContent:
                              "space-between",
                            alignItems:
                              "center",
                            gap:
                              "10px",
                          }}
                        >
                          <h3>
                            Criterion{" "}
                            {index +
                              1}
                          </h3>

                          <button
                            type="button"
                            onClick={() =>
                              removeJudgeCriterion(
                                index
                              )
                            }
                            style={{
                              background:
                                "#3a1820",
                            }}
                          >
                            Remove
                          </button>
                        </div>

                        {/* CRITERION NAME */}

                        <div
                          style={{
                            marginTop:
                              "16px",
                          }}
                        >
                          <label
                            style={{
                              display:
                                "block",
                              fontSize:
                                "13px",
                              fontWeight:
                                600,
                              marginBottom:
                                "7px",
                            }}
                          >
                            Criterion Name
                          </label>

                          <input
                            value={
                              criterion.name
                            }
                            onChange={(
                              e
                            ) =>
                              updateJudgeCriterion(
                                index,
                                "name",
                                e.target
                                  .value
                              )
                            }
                            placeholder="correctness"
                            style={{
                              width:
                                "100%",
                            }}
                          />
                        </div>

                        {/* CRITERION DESCRIPTION */}

                        <div
                          style={{
                            marginTop:
                              "16px",
                          }}
                        >
                          <label
                            style={{
                              display:
                                "block",
                              fontSize:
                                "13px",
                              fontWeight:
                                600,
                              marginBottom:
                                "7px",
                            }}
                          >
                            Description
                          </label>

                          <textarea
                            value={
                              criterion.description
                            }
                            onChange={(
                              e
                            ) =>
                              updateJudgeCriterion(
                                index,
                                "description",
                                e.target
                                  .value
                              )
                            }
                            placeholder="Is the answer factually correct?"
                            rows={
                              3
                            }
                            style={{
                              width:
                                "100%",
                              resize:
                                "vertical",
                            }}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {/* GENERATED CONFIG */}

          <div
            style={{
              marginTop:
                "28px",
            }}
          >
            <h3>
              Generated Configuration
            </h3>

            <p
              style={{
                marginTop:
                  "6px",
                fontSize:
                  "13px",
                opacity: 0.6,
              }}
            >
              This is the configuration
              that will be stored for
              this evaluator.
            </p>

            <pre
              style={{
                marginTop:
                  "12px",
                padding:
                  "18px",
                borderRadius:
                  "10px",
                border:
                  "1px solid #29334d",
                background:
                  "#0b1020",
                overflowX:
                  "auto",
                whiteSpace:
                  "pre-wrap",
                wordBreak:
                  "break-word",
                fontSize:
                  "13px",
                lineHeight:
                  "1.6",
              }}
            >
              {JSON.stringify(
                buildConfig(),
                null,
                2
              )}
            </pre>
          </div>

          {/* ERROR */}

          {error && (
            <div
              style={{
                marginTop:
                  "18px",
                padding:
                  "14px",
                borderRadius:
                  "8px",
                background:
                  "rgba(255,80,80,0.1)",
                border:
                  "1px solid rgba(255,80,80,0.3)",
                color: "#ff8080",
              }}
            >
              {error}
            </div>
          )}

          {/* SAVE */}

          <button
            type="button"
            onClick={
              createEvaluator
            }
            disabled={saving}
            style={{
              marginTop:
                "20px",
            }}
          >
            {saving
              ? "Saving..."
              : "Save Evaluator"}
          </button>
        </div>
      )}

      {/* EXISTING EVALUATORS */}

      {evaluators.map(
        (evaluator) => (
          <div
            className="card"
            key={evaluator.id}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "flex-start",
                gap: "20px",
                flexWrap:
                  "wrap",
              }}
            >
              <div>
                <h2>
                  {evaluator.name}
                </h2>

                <p
                  style={{
                    marginTop:
                      "6px",
                    opacity: 0.7,
                  }}
                >
                  Type:{" "}
                  <strong>
                    {evaluator.type}
                  </strong>
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  deleteEvaluator(
                    evaluator.id
                  )
                }
                style={{
                  background:
                    "#3a1820",
                }}
              >
                Delete
              </button>
            </div>

            <div
              style={{
                marginTop:
                  "16px",
                fontSize:
                  "13px",
                opacity: 0.6,
              }}
            >
              Current evaluator
              configuration
            </div>

            <pre
              style={{
                marginTop:
                  "8px",
                padding:
                  "18px",
                overflowX:
                  "auto",
                whiteSpace:
                  "pre-wrap",
                wordBreak:
                  "break-word",
                borderRadius:
                  "10px",
                background:
                  "#0b1020",
                border:
                  "1px solid #29334d",
                fontSize:
                  "13px",
                lineHeight:
                  "1.6",
              }}
            >
              {formatConfig(
                evaluator.config
              )}
            </pre>
          </div>
        )
      )}

      {evaluators.length ===
        0 &&
        !showForm && (
          <div className="card">
            <p>
              No evaluators configured
              yet.
            </p>
          </div>
        )}
    </main>
  );
}