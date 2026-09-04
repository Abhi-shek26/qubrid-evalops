"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { API_URL, authHeaders } from "../../../../../lib-api";

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
};

type Experiment = {
  id: string;
  name: string;
  model: string;
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
  const experimentId = params.experimentId;

  const [experiment, setExperiment] =
    useState<Experiment | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        }
      );

      const data = await response.json();

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
    if (projectId && experimentId) {
      loadExperiment();
    }
  }, [projectId, experimentId]);

  /*
   * Automatically refresh a running experiment.
   */
  useEffect(() => {
    if (
      !experiment ||
      (experiment.status !== "QUEUED" &&
        experiment.status !== "RUNNING")
    ) {
      return;
    }

    const interval = setInterval(() => {
      loadExperiment();
    }, 2000);

    return () => clearInterval(interval);
  }, [experiment?.status, experimentId]);

  function statusBadge(status: string) {
    if (status === "COMPLETED") {
      return (
        <span className="badge success">
          ✓ COMPLETED
        </span>
      );
    }

    if (status === "RUNNING") {
      return (
        <span className="badge running">
          ● RUNNING
        </span>
      );
    }

    if (status === "QUEUED") {
      return (
        <span className="badge queued">
          ◌ QUEUED
        </span>
      );
    }

    if (status === "FAILED") {
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

  function cacheBadge(cacheHit: boolean) {
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

  if (loading) {
    return (
      <main>
        <div className="card">
          <h1>Loading experiment...</h1>
          <p>
            Loading evaluation results from EvalOps.
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <div className="card">
          <h1>Unable to load experiment</h1>

          <p
            style={{
              color: "#ff8080",
              marginTop: "12px",
            }}
          >
            {error}
          </p>

          <Link
            href={`/projects/${projectId}/experiments`}
          >
            <button style={{ marginTop: "20px" }}>
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
          <h1>Experiment not found</h1>

          <Link
            href={`/projects/${projectId}/experiments`}
          >
            <button style={{ marginTop: "20px" }}>
              ← Back to Experiments
            </button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* BACK */}

      <div style={{ marginBottom: "20px" }}>
        <Link
          href={`/projects/${projectId}/experiments`}
          style={{
            textDecoration: "none",
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
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "13px",
                opacity: 0.6,
                marginBottom: "8px",
              }}
            >
              EXPERIMENT
            </p>

            <h1>{experiment.name}</h1>

            <p
              style={{
                marginTop: "10px",
              }}
            >
              Model: <strong>{experiment.model}</strong>
            </p>

            <p
              style={{
                fontSize: "13px",
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
            {statusBadge(experiment.status)}
          </div>
        </div>
      </div>

      {/* RUNNING MESSAGE */}

      {(experiment.status === "QUEUED" ||
        experiment.status === "RUNNING") && (
        <div className="card">
          <h2>
            {experiment.status === "QUEUED"
              ? "Evaluation queued"
              : "Evaluation running"}
          </h2>

          <p>
            EvalOps is processing this experiment.
            This page automatically refreshes.
          </p>
        </div>
      )}

      {/* ERROR */}

      {experiment.status === "FAILED" &&
        experiment.errorMessage && (
          <div className="card">
            <h2>Evaluation Failed</h2>

            <div
              style={{
                marginTop: "15px",
                padding: "15px",
                borderRadius: "8px",
                background:
                  "rgba(255, 80, 80, 0.1)",
                border:
                  "1px solid rgba(255, 80, 80, 0.3)",
                color: "#ff8080",
              }}
            >
              {experiment.errorMessage}
            </div>
          </div>
        )}

      {/* METRICS */}

      <div className="card">
        <h2>Evaluation Metrics</h2>

        <div
          className="grid"
          style={{
            marginTop: "20px",
          }}
        >
          <div>
            <small>Quality</small>

            <h3>
              {experiment.qualityScore != null
                ? `${experiment.qualityScore.toFixed(
                    1
                  )}%`
                : "-"}
            </h3>
          </div>

          <div>
            <small>Pass Rate</small>

            <h3>
              {experiment.passRate != null
                ? `${experiment.passRate.toFixed(
                    1
                  )}%`
                : "-"}
            </h3>
          </div>

          <div>
            <small>Avg Latency</small>

            <h3>
              {experiment.avgLatencyMs != null
                ? `${experiment.avgLatencyMs.toFixed(
                    0
                  )} ms`
                : "-"}
            </h3>
          </div>

          <div>
            <small>Total Tokens</small>

            <h3>
              {experiment.totalTokens ?? "-"}
            </h3>
          </div>

          <div>
            <small>Total Cost</small>

            <h3>
              $
              {Number(
                experiment.totalCostUsd ?? 0
              ).toFixed(6)}
            </h3>
          </div>

          <div>
            <small>Cache Hit Rate</small>

            <h3>
              {experiment.cacheHitRate != null
                ? `${experiment.cacheHitRate.toFixed(
                    1
                  )}%`
                : "-"}
            </h3>
          </div>

          <div>
            <small>Cache Miss Rate</small>

            <h3>
              {experiment.cacheMissRate != null
                ? `${experiment.cacheMissRate.toFixed(
                    1
                  )}%`
                : "-"}
            </h3>
          </div>

          <div>
            <small>LLM Calls Avoided</small>

            <h3>
              {experiment.llmCallsAvoided ?? 0}
            </h3>
          </div>

          <div>
            <small>Cached Input Tokens</small>

            <h3>
              {experiment.cachedInputTokens ?? 0}
            </h3>
          </div>

          <div>
            <small>Estimated Savings</small>

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

      {/* REGRESSION */}

      <div className="card">
        <h2>Regression Check</h2>

        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #29334d",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "30px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <small>Status</small>

              <h3>
                {experiment.regressionPassed ===
                null ||
                experiment.regressionPassed ===
                  undefined
                  ? "Not compared"
                  : experiment.regressionPassed
                  ? "✓ PASS"
                  : "✕ FAIL"}
              </h3>
            </div>

            <div>
              <small>Quality Delta</small>

              <h3>
                {experiment.regressionDelta !=
                null
                  ? `${
                      experiment.regressionDelta >= 0
                        ? "+"
                        : ""
                    }${experiment.regressionDelta.toFixed(
                      2
                    )} pp`
                  : "—"}
              </h3>
            </div>

            <div>
              <small>Allowed Drop</small>

              <h3>
                {experiment.allowedQualityDrop ??
                  2}{" "}
                pp
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* TEST RESULTS */}

      <div className="card">
        <h2>Test Case Results</h2>

        <p>
          Individual evaluation results for this
          experiment.
        </p>

        {!experiment.results ||
        experiment.results.length === 0 ? (
          <div
            style={{
              marginTop: "20px",
              padding: "25px",
              border: "1px dashed #29334d",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <p>
              No test results available yet.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginTop: "20px",
            }}
          >
            {experiment.results.map(
              (result, index) => {
                const expanded =
                  expandedResult === result.id;

                return (
                  <div
                    key={result.id}
                    style={{
                      border:
                        "1px solid #29334d",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                  >
                    {/* RESULT HEADER */}

                    <button
                      onClick={() =>
                        setExpandedResult(
                          expanded
                            ? null
                            : result.id
                        )
                      }
                      style={{
                        width: "100%",
                        padding: "18px",
                        background:
                          "transparent",
                        border: "none",
                        color: "inherit",
                        textAlign: "left",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent:
                            "space-between",
                          alignItems: "center",
                          gap: "15px",
                        }}
                      >
                        <div>
                          <strong>
                            Test Case {index + 1}
                          </strong>

                          <div
                            style={{
                              marginTop: "6px",
                              opacity: 0.65,
                              fontSize: "13px",
                            }}
                          >
                            Score:{" "}
                            {(
                              result.score * 100
                            ).toFixed(1)}
                            %
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems:
                              "center",
                            gap: "10px",
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
                        </div>
                      </div>
                    </button>

                    {/* EXPANDED RESULT */}

                    {expanded && (
                      <div
                        style={{
                          padding: "20px",
                          borderTop:
                            "1px solid #29334d",
                        }}
                      >
                        <div
                          className="grid"
                        >
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
                              ).toFixed(6)}
                            </h3>
                          </div>
                        </div>

                        <div
                          style={{
                            marginTop: "25px",
                          }}
                        >
                          <small>
                            Actual Output
                          </small>

                          <div
                            style={{
                              marginTop: "8px",
                              padding: "15px",
                              border:
                                "1px solid #29334d",
                              borderRadius: "8px",
                              lineHeight: "1.6",
                              whiteSpace:
                                "pre-wrap",
                            }}
                          >
                            {
                              result.actualOutput
                            }
                          </div>
                        </div>

                        {result.reason && (
                          <div
                            style={{
                              marginTop: "20px",
                            }}
                          >
                            <small>
                              Evaluator Result
                            </small>

                            <div
                              style={{
                                marginTop: "8px",
                                padding: "15px",
                                border:
                                  "1px solid #29334d",
                                borderRadius:
                                  "8px",
                              }}
                            >
                              {result.reason}
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