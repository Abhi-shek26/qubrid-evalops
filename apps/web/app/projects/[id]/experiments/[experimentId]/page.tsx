"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  API_URL,
  authHeaders,
} from "../../../../../lib-api";

type EvaluatorResult = {
  type: string;
  score: number;
  passed: boolean;
  reason: string;
};

type TestResult = {
  id: string;
  testCaseId: string;
  actualOutput: string;
  score: number;
  passed: boolean;

  latencyMs?: number | null;
  ttftMs?: number | null;

  inputTokens?: number | null;
  outputTokens?: number | null;
  totalTokens?: number | null;

  estimatedCostUsd?: number | null;
  uncachedEstimatedCostUsd?: number | null;

  cacheHit: boolean;
  cachedInputTokens?: number | null;

  reason?: string | null;

  evaluatorResults?: string | null;
};

type Experiment = {
  id: string;
  name: string;
  model: string;
  datasetId?: string;
  status: string;

  qualityScore?: number | null;
  passRate?: number | null;

  avgLatencyMs?: number | null;

  totalTokens?: number | null;
  totalCostUsd?: number | null;

  cacheHitRate?: number | null;
  cacheMissRate?: number | null;

  cachedInputTokens?: number | null;
  llmCallsAvoided?: number | null;
  estimatedCostSavedUsd?: number | null;

  regressionDelta?: number | null;
  regressionPassed?: boolean | null;
  allowedQualityDrop?: number | null;

  errorMessage?: string | null;

  createdAt: string;

  results?: TestResult[];
};

export default function ExperimentDetail() {
  const params = useParams<{
    id: string;
    experimentId: string;
  }>();

  const projectId = params.id;
  const experimentId =
    params.experimentId;

  const [experiment, setExperiment] =
    useState<Experiment | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [datasetInfo, setDatasetInfo] = useState<{
    id: string;
    name: string;
    version: number;
    testCaseCount: number;
  } | null>(null);

  const [expandedResult, setExpandedResult] =
    useState<string | null>(null);

  async function loadExperiment() {
    try {
      setError("");

      console.log(
        "[EXPERIMENT DETAIL] Loading:",
        experimentId
      );

      const response = await fetch(
        `${API_URL}/api/v1/projects/${projectId}/experiments/${experimentId}`,
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
            "Failed to load experiment"
        );
      }

      console.log(
        "[EXPERIMENT DETAIL] Loaded:",
        data.data
      );

      setExperiment(data.data);

      /*
       * Load the exact dataset snapshot used by this
       * experiment so the detail page clearly identifies
       * the immutable version being evaluated.
       */
      if (data.data?.datasetId) {
        try {
          const datasetResponse = await fetch(
            `${API_URL}/api/v1/projects/${projectId}/datasets/${data.data.datasetId}`,
            {
              headers: authHeaders(),
              cache: "no-store",
            }
          );

          const datasetData =
            await datasetResponse.json();

          if (datasetResponse.ok && datasetData.data) {
            setDatasetInfo({
              id: datasetData.data.id,
              name: datasetData.data.name,
              version: data.data?.datasetId
                ? datasetData.data.version ?? 1
                : 1,
              testCaseCount:
                datasetData.data?.testCases?.length ?? 0,
            });
          } else {
            setDatasetInfo(null);
          }
        } catch {
          setDatasetInfo(null);
        }
      } else {
        setDatasetInfo(null);
      }
    } catch (err: any) {
      console.error(
        "[EXPERIMENT DETAIL] Error:",
        err
      );

      setError(
        err?.message ||
          "Failed to load experiment"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (
      projectId &&
      experimentId
    ) {
      loadExperiment();
    }
  }, [
    projectId,
    experimentId,
  ]);

  /*
   * Automatically refresh a running experiment.
   */
  useEffect(() => {
    if (
      !experiment ||
      (experiment.status !==
        "QUEUED" &&
        experiment.status !==
          "RUNNING")
    ) {
      return;
    }

    const interval =
      setInterval(() => {
        loadExperiment();
      }, 2000);

    return () =>
      clearInterval(interval);
  }, [
    experiment?.status,
    experimentId,
  ]);

  function statusBadge(
    status: string
  ) {
    if (
      status === "COMPLETED"
    ) {
      return (
        <span className="badge success">
          ✓ COMPLETED
        </span>
      );
    }

    if (
      status === "RUNNING"
    ) {
      return (
        <span className="badge running">
          ● RUNNING
        </span>
      );
    }

    if (
      status === "QUEUED"
    ) {
      return (
        <span className="badge queued">
          ◌ QUEUED
        </span>
      );
    }

    if (
      status === "FAILED"
    ) {
      return (
        <span className="badge failed">
          ✕ FAILED
        </span>
      );
    }

    return (
      <span className="badge">
        {status}
      </span>
    );
  }

  function cacheBadge(
    cacheHit: boolean
  ) {
    if (cacheHit) {
      return (
        <span className="cache-badge hit">
          ⚡ CACHE HIT
        </span>
      );
    }

    return (
      <span className="cache-badge miss">
        ○ CACHE MISS
      </span>
    );
  }

  function regressionStatus() {
    if (
      experiment?.regressionPassed ===
        null ||
      experiment?.regressionPassed ===
        undefined
    ) {
      return {
        title: "Not Compared",
        text:
          "No baseline comparison was performed.",
        symbol: "—",
        className:
          "neutral",
      };
    }

    if (
      experiment.regressionPassed
    ) {
      return {
        title:
          "Regression Passed",
        text:
          "Quality stayed within the allowed regression limit.",
        symbol: "✓",
        className:
          "success",
      };
    }

    return {
      title:
        "Regression Failed",
      text:
        "Quality dropped beyond the allowed regression limit.",
      symbol: "✕",
      className:
        "failed",
    };
  }

  /*
   * Parse evaluator breakdown stored by the worker.
   *
   * Older experiments may not have this field,
   * so we safely return an empty array.
   */
  function parseEvaluatorResults(
    value?: string | null
  ): EvaluatorResult[] {
    if (!value) {
      return [];
    }

    try {
      const parsed =
        JSON.parse(value);

      if (
        !Array.isArray(parsed)
      ) {
        return [];
      }

      return parsed.filter(
        (item) =>
          item &&
          typeof item.type ===
            "string" &&
          typeof item.score ===
            "number" &&
          typeof item.passed ===
            "boolean" &&
          typeof item.reason ===
            "string"
      );
    } catch {
      return [];
    }
  }

  function evaluatorDisplayName(
    type: string
  ) {
    switch (type) {
      case "LLM_JUDGE":
        return "LLM Judge";

      case "RULE":
        return "RULE";

      case "JSON_SCHEMA":
        return "JSON Schema";

      case "SEMANTIC":
        return "Semantic";

      case "RAG_CORRECTNESS":
        return "RAG Correctness";

      case "RAG_GROUNDEDNESS":
        return "RAG Groundedness";

      case "RAG_CITATION":
        return "RAG Citation";

      case "RAG_HALLUCINATION":
        return "RAG Hallucination";

      default:
        return type;
    }
  }

  if (loading) {
    return (
      <main>
        <div className="card">
          <h1>
            Loading experiment...
          </h1>

          <p>
            Loading evaluation results
            from EvalOps.
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <div className="card">
          <h1>
            Unable to load experiment
          </h1>

          <p
            style={{
              color: "#ff8080",
              marginTop:
                "12px",
            }}
          >
            {error}
          </p>

          <Link
            href={`/projects/${projectId}/experiments`}
          >
            <button
              style={{
                marginTop:
                  "20px",
              }}
            >
              ← Back to Experiments
            </button>
          </Link>
        </div>
      </main>
    );
  }

  if (!experiment) {
    return (
      <main>
        <div className="card">
          <h1>
            Experiment not found
          </h1>

          <Link
            href={`/projects/${projectId}/experiments`}
          >
            <button
              style={{
                marginTop:
                  "20px",
              }}
            >
              ← Back to Experiments
            </button>
          </Link>
        </div>
      </main>
    );
  }

  const regression =
    regressionStatus();

  return (
    <main>
      {/* BACK */}

      <div
        style={{
          marginBottom:
            "20px",
        }}
      >
        <Link
          href={`/projects/${projectId}/experiments`}
          style={{
            textDecoration:
              "none",
            opacity: 0.8,
          }}
        >
          ← Back to Experiments
        </Link>
      </div>

      {/* HEADER */}

      <div className="card">
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
            <p
              style={{
                fontSize:
                  "13px",
                opacity: 0.6,
                marginBottom:
                  "8px",
              }}
            >
              EXPERIMENT
            </p>

            <h1>
              {experiment.name}
            </h1>

            <p
              style={{
                marginTop:
                  "10px",
              }}
            >
              Model:{" "}
              <strong>
                {experiment.model}
              </strong>
            </p>

            {datasetInfo && (
              <p
                style={{
                  marginTop: "8px",
                  fontSize: "13px",
                  opacity: 0.7,
                }}
              >
                Dataset:{" "}
                <strong>
                  {datasetInfo.name} · v{datasetInfo.version}
                </strong>
              </p>
            )}

            <p
              style={{
                fontSize:
                  "13px",
                opacity: 0.6,
              }}
            >
              Created{" "}
              {new Date(
                experiment.createdAt
              ).toLocaleString()}
            </p>
          </div>

          <div>
            {statusBadge(
              experiment.status
            )}
          </div>
        </div>
      </div>

      {/* RUNNING MESSAGE */}

      {(experiment.status ===
        "QUEUED" ||
        experiment.status ===
          "RUNNING") && (
        <div className="card">
          <h2>
            {experiment.status ===
            "QUEUED"
              ? "Evaluation queued"
              : "Evaluation running"}
          </h2>

          <p>
            EvalOps is processing this
            experiment. This page
            automatically refreshes.
          </p>
        </div>
      )}

      {/* ERROR */}

      {experiment.status ===
        "FAILED" &&
        experiment.errorMessage && (
          <div className="card">
            <h2>
              Evaluation Failed
            </h2>

            <div
              style={{
                marginTop:
                  "15px",
                padding:
                  "15px",
                borderRadius:
                  "8px",
                background:
                  "rgba(255, 80, 80, 0.1)",
                border:
                  "1px solid rgba(255, 80, 80, 0.3)",
                color:
                  "#ff8080",
              }}
            >
              {
                experiment.errorMessage
              }
            </div>
          </div>
        )}

      {/* REGRESSION SUMMARY */}

      <div className="card">
        <h2>
          Regression Summary
        </h2>

        <div
          style={{
            marginTop:
              "20px",
            padding:
              "22px",
            borderRadius:
              "12px",
            border:
              regression.className ===
              "success"
                ? "1px solid rgba(70, 200, 130, 0.35)"
                : regression.className ===
                    "failed"
                ? "1px solid rgba(255, 80, 80, 0.35)"
                : "1px solid #29334d",
            background:
              regression.className ===
              "success"
                ? "rgba(70, 200, 130, 0.08)"
                : regression.className ===
                    "failed"
                ? "rgba(255, 80, 80, 0.08)"
                : "rgba(255, 255, 255, 0.02)",
          }}
        >
          <div
            style={{
              display:
                "flex",
              alignItems:
                "center",
              gap: "15px",
              flexWrap:
                "wrap",
            }}
          >
            <div
              style={{
                width:
                  "52px",
                height:
                  "52px",
                borderRadius:
                  "50%",
                display:
                  "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
                fontSize:
                  "24px",
                fontWeight:
                  700,
                background:
                  regression.className ===
                  "success"
                    ? "rgba(70, 200, 130, 0.15)"
                    : regression.className ===
                        "failed"
                    ? "rgba(255, 80, 80, 0.15)"
                    : "rgba(255, 255, 255, 0.08)",
              }}
            >
              {regression.symbol}
            </div>

            <div>
              <h3
                style={{
                  margin:
                    0,
                }}
              >
                {
                  regression.title
                }
              </h3>

              <p
                style={{
                  marginTop:
                    "5px",
                  opacity:
                    0.7,
                }}
              >
                {
                  regression.text
                }
              </p>
            </div>
          </div>

          <div
            style={{
              display:
                "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(180px, 1fr))",
              gap:
                "15px",
              marginTop:
                "20px",
            }}
          >
            <div
              style={{
                padding:
                  "16px",
                border:
                  "1px solid #29334d",
                borderRadius:
                  "10px",
              }}
            >
              <small>
                Current Quality
              </small>

              <h3
                style={{
                  marginTop:
                    "6px",
                }}
              >
                {experiment.qualityScore !=
                null
                  ? `${experiment.qualityScore.toFixed(
                      1
                    )}%`
                  : "—"}
              </h3>
            </div>

            <div
              style={{
                padding:
                  "16px",
                border:
                  "1px solid #29334d",
                borderRadius:
                  "10px",
              }}
            >
              <small>
                Quality Delta
              </small>

              <h3
                style={{
                  marginTop:
                    "6px",
                }}
              >
                {experiment.regressionDelta !=
                null
                  ? `${
                      experiment.regressionDelta >=
                      0
                        ? "+"
                        : ""
                    }${experiment.regressionDelta.toFixed(
                      2
                    )} pp`
                  : "—"}
              </h3>
            </div>

            <div
              style={{
                padding:
                  "16px",
                border:
                  "1px solid #29334d",
                borderRadius:
                  "10px",
              }}
            >
              <small>
                Allowed Drop
              </small>

              <h3
                style={{
                  marginTop:
                    "6px",
                }}
              >
                {experiment.allowedQualityDrop ??
                  2}{" "}
                pp
              </h3>
            </div>

            <div
              style={{
                padding:
                  "16px",
                border:
                  "1px solid #29334d",
                borderRadius:
                  "10px",
              }}
            >
              <small>
                Baseline Check
              </small>

              <h3
                style={{
                  marginTop:
                    "6px",
                }}
              >
                {experiment.regressionPassed ===
                    null ||
                  experiment.regressionPassed ===
                    undefined
                  ? "Not compared"
                  : experiment.regressionPassed
                  ? "PASS"
                  : "FAIL"}
              </h3>
            </div>
          </div>

          {experiment.regressionDelta !=
            null && (
            <div
              style={{
                marginTop:
                  "18px",
                padding:
                  "12px 14px",
                borderRadius:
                  "8px",
                fontSize:
                  "14px",
                opacity:
                  0.8,
              }}
            >
              {experiment.regressionDelta >=
              0
                ? "Quality improved compared with the baseline."
                : `Quality decreased by ${Math.abs(
                    experiment.regressionDelta
                  ).toFixed(
                    2
                  )} percentage points compared with the baseline.`}
            </div>
          )}
        </div>
      </div>

      {/* METRICS */}

      <div className="card">
        <h2>
          Evaluation Metrics
        </h2>

        <div
          className="grid"
          style={{
            marginTop:
              "20px",
          }}
        >
          <div>
            <small>
              Quality
            </small>

            <h3>
              {experiment.qualityScore !=
              null
                ? `${experiment.qualityScore.toFixed(
                    1
                  )}%`
                : "-"}
            </h3>
          </div>

          <div>
            <small>
              Pass Rate
            </small>

            <h3>
              {experiment.passRate !=
              null
                ? `${experiment.passRate.toFixed(
                    1
                  )}%`
                : "-"}
            </h3>
          </div>

          <div>
            <small>
              Avg Latency
            </small>

            <h3>
              {experiment.avgLatencyMs !=
              null
                ? `${experiment.avgLatencyMs.toFixed(
                    0
                  )} ms`
                : "-"}
            </h3>
          </div>

          <div>
            <small>
              Total Tokens
            </small>

            <h3>
              {experiment.totalTokens ??
                "-"}
            </h3>
          </div>

          <div>
            <small>
              Total Cost
            </small>

            <h3>
              $
              {Number(
                experiment.totalCostUsd ??
                  0
              ).toFixed(6)}
            </h3>
          </div>

          <div>
            <small>
              Cache Hit Rate
            </small>

            <h3>
              {experiment.cacheHitRate !=
              null
                ? `${experiment.cacheHitRate.toFixed(
                    1
                  )}%`
                : "-"}
            </h3>
          </div>

          <div>
            <small>
              Cache Miss Rate
            </small>

            <h3>
              {experiment.cacheMissRate !=
              null
                ? `${experiment.cacheMissRate.toFixed(
                    1
                  )}%`
                : "-"}
            </h3>
          </div>

          <div>
            <small>
              LLM Calls Avoided
            </small>

            <h3>
              {experiment.llmCallsAvoided ??
                0}
            </h3>
          </div>

          <div>
            <small>
              Cached Input Tokens
            </small>

            <h3>
              {experiment.cachedInputTokens ??
                0}
            </h3>
          </div>

          <div>
            <small>
              Estimated Savings
            </small>

            <h3>
              $
              {Number(
                experiment.estimatedCostSavedUsd ??
                  0
              ).toFixed(6)}
            </h3>
          </div>
        </div>
      </div>

      {/* TEST RESULTS */}

      <div className="card">
        <h2>
          Test Case Results
        </h2>

        <p>
          Individual evaluation results
          for this experiment.
        </p>

        {!experiment.results ||
        experiment.results.length ===
          0 ? (
          <div
            style={{
              marginTop:
                "20px",
              padding:
                "25px",
              border:
                "1px dashed #29334d",
              borderRadius:
                "10px",
              textAlign:
                "center",
            }}
          >
            <p>
              No test results available
              yet.
            </p>
          </div>
        ) : (
          <div
            style={{
              display:
                "flex",
              flexDirection:
                "column",
              gap:
                "12px",
              marginTop:
                "20px",
            }}
          >
            {experiment.results.map(
              (
                result,
                index
              ) => {
                const expanded =
                  expandedResult ===
                  result.id;

                const evaluatorResults =
                  parseEvaluatorResults(
                    result.evaluatorResults
                  );

                return (
                  <div
                    key={
                      result.id
                    }
                    style={{
                      border:
                        "1px solid #29334d",
                      borderRadius:
                        "10px",
                      overflow:
                        "hidden",
                    }}
                  >
                    {/* RESULT HEADER */}

                    <button
                      type="button"
                      onClick={() =>
                        setExpandedResult(
                          expanded
                            ? null
                            : result.id
                        )
                      }
                      style={{
                        width:
                          "100%",
                        padding:
                          "18px",
                        background:
                          "transparent",
                        border:
                          "none",
                        color:
                          "inherit",
                        textAlign:
                          "left",
                        cursor:
                          "pointer",
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
                            "15px",
                          flexWrap:
                            "wrap",
                        }}
                      >
                        <div>
                          <strong>
                            Test Case{" "}
                            {index +
                              1}
                          </strong>

                          <div
                            style={{
                              marginTop:
                                "6px",
                              opacity:
                                0.65,
                              fontSize:
                                "13px",
                            }}
                          >
                            Score:{" "}
                            {(
                              result.score *
                              100
                            ).toFixed(
                              1
                            )}
                            %
                          </div>
                        </div>

                        <div
                          style={{
                            display:
                              "flex",
                            alignItems:
                              "center",
                            gap:
                              "10px",
                            flexWrap:
                              "wrap",
                          }}
                        >
                          {cacheBadge(
                            result.cacheHit
                          )}

                          {result.passed ? (
                            <span className="badge success">
                              ✓ PASS
                            </span>
                          ) : (
                            <span className="badge failed">
                              ✕ FAIL
                            </span>
                          )}

                          <span
                            style={{
                              opacity:
                                0.6,
                              fontSize:
                                "14px",
                            }}
                          >
                            {expanded
                              ? "▲"
                              : "▼"}
                          </span>
                        </div>
                      </div>
                    </button>

                    {/* EXPANDED RESULT */}

                    {expanded && (
                      <div
                        style={{
                          padding:
                            "20px",
                          borderTop:
                            "1px solid #29334d",
                        }}
                      >
                        {/* STANDARD METRICS */}

                        <div className="grid">
                          <div>
                            <small>
                              Latency
                            </small>

                            <h3>
                              {result.latencyMs ??
                                "-"}{" "}
                              ms
                            </h3>
                          </div>

                          <div>
                            <small>
                              TTFT
                            </small>

                            <h3>
                              {result.ttftMs ??
                                "-"}{" "}
                              ms
                            </h3>
                          </div>

                          <div>
                            <small>
                              Input Tokens
                            </small>

                            <h3>
                              {result.inputTokens ??
                                "-"}
                            </h3>
                          </div>

                          <div>
                            <small>
                              Output Tokens
                            </small>

                            <h3>
                              {result.outputTokens ??
                                "-"}
                            </h3>
                          </div>

                          <div>
                            <small>
                              Total Tokens
                            </small>

                            <h3>
                              {result.totalTokens ??
                                "-"}
                            </h3>
                          </div>

                          <div>
                            <small>
                              Cost
                            </small>

                            <h3>
                              $
                              {Number(
                                result.estimatedCostUsd ??
                                  0
                              ).toFixed(
                                6
                              )}
                            </h3>
                          </div>
                        </div>

                        {/* ACTUAL OUTPUT */}

                        <div
                          style={{
                            marginTop:
                              "25px",
                          }}
                        >
                          <small>
                            Actual Output
                          </small>

                          <div
                            style={{
                              marginTop:
                                "8px",
                              padding:
                                "15px",
                              border:
                                "1px solid #29334d",
                              borderRadius:
                                "8px",
                              lineHeight:
                                "1.6",
                              whiteSpace:
                                "pre-wrap",
                            }}
                          >
                            {
                              result.actualOutput
                            }
                          </div>
                        </div>

                        {/* EVALUATOR BREAKDOWN */}

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
                              gap:
                                "10px",
                              flexWrap:
                                "wrap",
                            }}
                          >
                            <div>
                              <h3
                                style={{
                                  margin:
                                    0,
                                }}
                              >
                                Evaluator Breakdown
                              </h3>

                              <p
                                style={{
                                  marginTop:
                                    "5px",
                                  fontSize:
                                    "13px",
                                  opacity:
                                    0.6,
                                }}
                              >
                                Individual scores from
                                each configured evaluator.
                              </p>
                            </div>

                            <div
                              style={{
                                padding:
                                  "7px 10px",
                                border:
                                  "1px solid #29334d",
                                borderRadius:
                                  "7px",
                                fontSize:
                                  "12px",
                                opacity:
                                  0.7,
                              }}
                            >
                              Overall:{" "}
                              {(
                                result.score *
                                100
                              ).toFixed(
                                1
                              )}
                              %
                            </div>
                          </div>

                          {evaluatorResults.length >
                          0 ? (
                            <div
                              style={{
                                display:
                                  "flex",
                                flexDirection:
                                  "column",
                                gap:
                                  "10px",
                                marginTop:
                                  "12px",
                              }}
                            >
                              {evaluatorResults.map(
                                (
                                  evaluator,
                                  evaluatorIndex
                                ) => (
                                  <div
                                    key={`${result.id}-${evaluatorIndex}`}
                                    style={{
                                      padding:
                                        "16px",
                                      border:
                                        "1px solid #29334d",
                                      borderRadius:
                                        "9px",
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
                                        flexWrap:
                                          "wrap",
                                      }}
                                    >
                                      <div>
                                        <strong>
                                          {evaluatorDisplayName(
                                            evaluator.type
                                          )}
                                        </strong>

                                        <div
                                          style={{
                                            marginTop:
                                              "4px",
                                            fontSize:
                                              "12px",
                                            opacity:
                                              0.5,
                                          }}
                                        >
                                          Evaluator{" "}
                                          {evaluatorIndex +
                                            1}
                                        </div>
                                      </div>

                                      <div
                                        style={{
                                          display:
                                            "flex",
                                          alignItems:
                                            "center",
                                          gap:
                                            "10px",
                                        }}
                                      >
                                        <strong
                                          style={{
                                            fontSize:
                                              "16px",
                                          }}
                                        >
                                          {(
                                            evaluator.score *
                                            100
                                          ).toFixed(
                                            1
                                          )}
                                          %
                                        </strong>

                                        {evaluator.passed ? (
                                          <span className="badge success">
                                            ✓ PASS
                                          </span>
                                        ) : (
                                          <span className="badge failed">
                                            ✕ FAIL
                                          </span>
                                        )}
                                      </div>
                                    </div>

                                    <div
                                      style={{
                                        marginTop:
                                          "12px",
                                        padding:
                                          "12px",
                                        border:
                                          "1px solid #29334d",
                                        borderRadius:
                                          "7px",
                                        fontSize:
                                          "13px",
                                        lineHeight:
                                          "1.5",
                                      }}
                                    >
                                      {
                                        evaluator.reason
                                      }
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          ) : (
                            <div
                              style={{
                                marginTop:
                                  "12px",
                                padding:
                                  "15px",
                                border:
                                  "1px dashed #29334d",
                                borderRadius:
                                  "8px",
                                fontSize:
                                  "13px",
                                opacity:
                                  0.65,
                              }}
                            >
                              No individual evaluator
                              breakdown is available
                              for this result.
                              <br />
                              This usually means the
                              result was created before
                              evaluator breakdown
                              storage was enabled.
                            </div>
                          )}
                        </div>

                        {/* COMBINED RESULT */}

                        {result.reason && (
                          <div
                            style={{
                              marginTop:
                                "22px",
                            }}
                          >
                            <small>
                              Combined Evaluator Result
                            </small>

                            <div
                              style={{
                                marginTop:
                                  "8px",
                                padding:
                                  "15px",
                                border:
                                  "1px solid #29334d",
                                borderRadius:
                                  "8px",
                                lineHeight:
                                  "1.5",
                              }}
                            >
                              {
                                result.reason
                              }
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </main>
  );
}