"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { API_URL, authHeaders } from "../../../lib-api";

type Trend = {
  experimentId: string;
  name: string;
  model: string;
  status: string;
  createdAt: string;
  qualityScore?: number | null;
  passRate?: number | null;
  avgLatencyMs?: number | null;
  totalTokens?: number | null;
  totalCostUsd?: number | null;
  cacheHitRate?: number | null;
  cacheMissRate?: number | null;
  cachedInputTokens?: number | null;
  estimatedCostSavedUsd?: number | null;
  regressionDelta?: number | null;
  regressionPassed?: boolean | null;
};

type EvaluatorTrend = {
  type: string;
  averageScore: number;
  passRate: number;
  totalEvaluations: number;
  points: Array<{
    experimentId: string;
    experimentName: string;
    createdAt: string;
    score: number;
    passed: boolean;
  }>;
};

type RegressionHistory = {
  experimentId: string;
  name: string;
  model: string;
  createdAt: string;
  qualityScore?: number | null;
  regressionDelta?: number | null;
  regressionPassed?: boolean | null;
  allowedQualityDrop: number;
  status: string;
};

type ModelComparison = {
  model: string;
  runs: number;
  averageQuality: number;
  averagePassRate: number;
  averageLatencyMs: number;
  totalCostUsd: number;
  averageCostUsd: number;
  totalTokens: number;
};

type Analytics = {
  summary: {
    totalRuns: number;
    completedRuns: number;
    failedRuns: number;
    averageQuality: number;
    averageLatencyMs: number;
    totalCostUsd: number;
    totalTokens: number;
    latestQuality: number | null;
    baselineQuality: number | null;
    regressionPassed: number;
    regressionFailed: number;
  };
  trends: Trend[];
  regressionHistory: RegressionHistory[];
  evaluatorTrends: EvaluatorTrend[];
  modelComparison: ModelComparison[];
};

function formatNumber(value: number | null | undefined, digits = 1) {
  if (value === null || value === undefined) return "—";
  return value.toFixed(digits);
}

function formatCurrency(value: number | null | undefined) {
  if (value === null || value === undefined) return "—";
  return `$${value.toFixed(6)}`;
}

function formatLatency(value: number | null | undefined) {
  if (value === null || value === undefined) return "—";
  if (value >= 1000) {
    return `${(value / 1000).toFixed(2)}s`;
  }
  return `${Math.round(value)}ms`;
}

function statusBadge(status: string) {
  if (status === "COMPLETED") {
    return <span className="badge success">✓ COMPLETED</span>;
  }

  if (status === "FAILED") {
    return <span className="badge failed">✕ FAILED</span>;
  }

  if (status === "RUNNING") {
    return <span className="badge running">● RUNNING</span>;
  }

  return <span className="badge">{status}</span>;
}

function miniBar(value: number, max: number) {
  const width =
    max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;

  return (
    <div
      style={{
        width: "100%",
        height: "8px",
        borderRadius: "999px",
        background: "rgba(255,255,255,0.08)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${width}%`,
          height: "100%",
          borderRadius: "999px",
          background: "rgba(96,165,250,0.9)",
        }}
      />
    </div>
  );
}

export default function Project() {
  const { id } = useParams<{ id: string }>();

  const [p, setP] = useState<any>(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        setError("");

        const [projectResponse, analyticsResponse] =
          await Promise.all([
            fetch(`${API_URL}/api/v1/projects/${id}`, {
              headers: authHeaders(),
            }),
            fetch(`${API_URL}/api/v1/projects/${id}/analytics`, {
              headers: authHeaders(),
            }),
          ]);

        const projectData = await projectResponse.json();
        const analyticsData = await analyticsResponse.json();

        if (!projectResponse.ok) {
          throw new Error(
            projectData?.message || "Failed to load project"
          );
        }

        if (!analyticsResponse.ok) {
          throw new Error(
            analyticsData?.message || "Failed to load analytics"
          );
        }

        setP(projectData.data);
        setAnalytics(analyticsData.data);
      } catch (err: any) {
        setError(err.message || "Failed to load project");
      }
    }

    load();
  }, [id]);

  const completedTrends = useMemo(
    () =>
      (analytics?.trends ?? [])
        .filter(
          (item) =>
            item.status === "COMPLETED" &&
            item.qualityScore !== null &&
            item.qualityScore !== undefined
        )
        .slice(-12),
    [analytics]
  );

  const maxQuality = Math.max(
    100,
    ...completedTrends.map((item) => item.qualityScore ?? 0)
  );

  const maxEvaluatorScore = Math.max(
    100,
    ...(analytics?.evaluatorTrends ?? []).map(
      (item) => item.averageScore
    )
  );

  if (!p && !error) {
    return <main>Loading...</main>;
  }

  if (error && !p) {
    return (
      <main>
        <div className="card">
          <h2>Unable to load project</h2>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main>
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
            <h1>{p.name}</h1>
            <p>{p.description}</p>
            <small>{p.model}</small>
          </div>

          <Link href={`/projects/${id}/experiments`}>
            <button type="button">Open Experiments</button>
          </Link>
        </div>
      </div>

      {error && (
        <div
          className="card"
          style={{
            border: "1px solid rgba(248,113,113,0.35)",
          }}
        >
          <p>{error}</p>
        </div>
      )}

      <div className="grid">
        <Link href={`/projects/${id}/datasets`}>
          <div className="card">
            <h2>Datasets</h2>
            <p>Create and manage regression test cases.</p>
          </div>
        </Link>

        <Link href={`/projects/${id}/experiments`}>
          <div className="card">
            <h2>Experiments</h2>
            <p>Quality, latency, cost and LLM cache metrics.</p>
          </div>
        </Link>

        <Link href={`/projects/${id}/evaluators`}>
          <div className="card">
            <h2>Evaluators</h2>
            <p>
              Define rules, LLM judges and RAG checks for AI responses.
            </p>
          </div>
        </Link>
      </div>

      <div style={{ marginTop: "24px" }}>
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h2>Advanced Analytics</h2>
              <p>
                Track evaluation quality, performance, regression history
                and evaluator behaviour.
              </p>
            </div>

            {analytics && (
              <div
                style={{
                  fontSize: "12px",
                  opacity: 0.7,
                }}
              >
                Latest run:{" "}
                {analytics.trends.length
                  ? new Date(
                      analytics.trends[
                        analytics.trends.length - 1
                      ].createdAt
                    ).toLocaleString()
                  : "—"}
              </div>
            )}
          </div>
        </div>

        {analytics ? (
          <>
            <div
              className="grid"
              style={{
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(180px, 1fr))",
                marginTop: "16px",
              }}
            >
              <div className="card">
                <small>Total Runs</small>
                <h2>{analytics.summary.totalRuns}</h2>
                <p>
                  {analytics.summary.completedRuns} completed
                </p>
              </div>

              <div className="card">
                <small>Average Quality</small>
                <h2>
                  {formatNumber(
                    analytics.summary.averageQuality
                  )}
                  %
                </h2>
                <p>
                  Latest:{" "}
                  {formatNumber(
                    analytics.summary.latestQuality
                  )}
                  %
                </p>
              </div>

              <div className="card">
                <small>Average Latency</small>
                <h2>
                  {formatLatency(
                    analytics.summary.averageLatencyMs
                  )}
                </h2>
                <p>Across completed runs</p>
              </div>

              <div className="card">
                <small>Total Cost</small>
                <h2>
                  {formatCurrency(
                    analytics.summary.totalCostUsd
                  )}
                </h2>
                <p>
                  {analytics.summary.totalTokens.toLocaleString()} tokens
                </p>
              </div>

              <div className="card">
                <small>Baseline</small>
                <h2>
                  {formatNumber(
                    analytics.summary.baselineQuality
                  )}
                  %
                </h2>
                <p>Reference quality</p>
              </div>

              <div className="card">
                <small>Regression Checks</small>
                <h2>
                  {analytics.summary.regressionPassed}/
                  {analytics.summary.regressionPassed +
                    analytics.summary.regressionFailed}
                </h2>
                <p>
                  {analytics.summary.regressionFailed} failed
                </p>
              </div>
            </div>

            <div className="card" style={{ marginTop: "16px" }}>
              <h2>Quality Trend</h2>
              <p>Last 12 completed evaluation runs.</p>

              {completedTrends.length === 0 ? (
                <div className="card">
                  <p>No completed evaluations yet.</p>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "12px",
                    minHeight: "220px",
                    marginTop: "24px",
                    overflowX: "auto",
                    paddingBottom: "8px",
                  }}
                >
                  {completedTrends.map((item) => {
                    const quality = item.qualityScore ?? 0;
                    const height =
                      maxQuality > 0
                        ? Math.max(
                            20,
                            (quality / maxQuality) * 170
                          )
                        : 20;

                    return (
                      <Link
                        key={item.experimentId}
                        href={`/projects/${id}/experiments/${item.experimentId}`}
                        style={{
                          minWidth: "74px",
                          textDecoration: "none",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <strong style={{ fontSize: "12px" }}>
                            {formatNumber(quality)}%
                          </strong>

                          <div
                            title={`${item.name}: ${quality}%`}
                            style={{
                              width: "48px",
                              height: `${height}px`,
                              borderRadius:
                                "8px 8px 3px 3px",
                              background:
                                "linear-gradient(180deg, rgba(96,165,250,0.95), rgba(96,165,250,0.35))",
                            }}
                          />

                          <span
                            style={{
                              fontSize: "10px",
                              opacity: 0.6,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {new Date(
                              item.createdAt
                            ).toLocaleDateString(
                              undefined,
                              {
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="grid" style={{ marginTop: "16px" }}>
              <div className="card">
                <h2>Evaluator Performance</h2>
                <p>Average score and pass rate by evaluator.</p>

                {analytics.evaluatorTrends.length === 0 ? (
                  <p style={{ marginTop: "16px" }}>
                    No evaluator data available yet.
                  </p>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "18px",
                      marginTop: "20px",
                    }}
                  >
                    {analytics.evaluatorTrends.map((item) => (
                      <div key={item.type}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "12px",
                            marginBottom: "6px",
                          }}
                        >
                          <strong>{item.type}</strong>
                          <span>
                            {formatNumber(item.averageScore)}% avg ·{" "}
                            {formatNumber(item.passRate)}% pass
                          </span>
                        </div>

                        {miniBar(
                          item.averageScore,
                          maxEvaluatorScore
                        )}

                        <small style={{ opacity: 0.65 }}>
                          {item.totalEvaluations} evaluation
                          {item.totalEvaluations === 1 ? "" : "s"}
                        </small>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="card">
                <h2>Model Comparison</h2>
                <p>
                  Compare quality, latency and cost across models.
                </p>

                {analytics.modelComparison.length === 0 ? (
                  <p style={{ marginTop: "16px" }}>
                    No model comparison data available yet.
                  </p>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "18px",
                      marginTop: "20px",
                    }}
                  >
                    {analytics.modelComparison.map((item) => (
                      <div
                        key={item.model}
                        style={{
                          paddingBottom: "16px",
                          borderBottom:
                            "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        <strong>{item.model}</strong>

                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns:
                              "repeat(2, minmax(0, 1fr))",
                            gap: "10px",
                            marginTop: "12px",
                          }}
                        >
                          <div>
                            <small>Quality</small>
                            <div>
                              {formatNumber(
                                item.averageQuality
                              )}
                              %
                            </div>
                          </div>

                          <div>
                            <small>Pass Rate</small>
                            <div>
                              {formatNumber(
                                item.averagePassRate
                              )}
                              %
                            </div>
                          </div>

                          <div>
                            <small>Latency</small>
                            <div>
                              {formatLatency(
                                item.averageLatencyMs
                              )}
                            </div>
                          </div>

                          <div>
                            <small>Avg Cost</small>
                            <div>
                              {formatCurrency(
                                item.averageCostUsd
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="card" style={{ marginTop: "16px" }}>
              <h2>Regression History</h2>
              <p>
                Historical runs compared against the configured baseline.
              </p>

              {analytics.regressionHistory.length === 0 ? (
                <p style={{ marginTop: "16px" }}>
                  No regression checks available yet.
                </p>
              ) : (
                <div
                  style={{
                    marginTop: "18px",
                    overflowX: "auto",
                  }}
                >
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      minWidth: "760px",
                    }}
                  >
                    <thead>
                      <tr>
                        <th
                          style={{
                            textAlign: "left",
                            padding: "10px 8px",
                          }}
                        >
                          Run
                        </th>
                        <th
                          style={{
                            textAlign: "left",
                            padding: "10px 8px",
                          }}
                        >
                          Quality
                        </th>
                        <th
                          style={{
                            textAlign: "left",
                            padding: "10px 8px",
                          }}
                        >
                          Delta
                        </th>
                        <th
                          style={{
                            textAlign: "left",
                            padding: "10px 8px",
                          }}
                        >
                          Status
                        </th>
                        <th
                          style={{
                            textAlign: "left",
                            padding: "10px 8px",
                          }}
                        >
                          Date
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {analytics.regressionHistory
                        .slice()
                        .reverse()
                        .slice(0, 12)
                        .map((item) => (
                          <tr key={item.experimentId}>
                            <td
                              style={{
                                padding: "10px 8px",
                                borderTop:
                                  "1px solid rgba(255,255,255,0.07)",
                              }}
                            >
                              <Link
                                href={`/projects/${id}/experiments/${item.experimentId}`}
                              >
                                {item.name}
                              </Link>
                            </td>

                            <td
                              style={{
                                padding: "10px 8px",
                                borderTop:
                                  "1px solid rgba(255,255,255,0.07)",
                              }}
                            >
                              {formatNumber(
                                item.qualityScore
                              )}
                              %
                            </td>

                            <td
                              style={{
                                padding: "10px 8px",
                                borderTop:
                                  "1px solid rgba(255,255,255,0.07)",
                              }}
                            >
                              <span
                                style={{
                                  fontWeight: 700,
                                }}
                              >
                                {item.regressionDelta !==
                                null &&
                                item.regressionDelta !==
                                  undefined &&
                                item.regressionDelta >= 0
                                  ? "+"
                                  : ""}
                                {formatNumber(
                                  item.regressionDelta,
                                  2
                                )}{" "}
                                pp
                              </span>
                            </td>

                            <td
                              style={{
                                padding: "10px 8px",
                                borderTop:
                                  "1px solid rgba(255,255,255,0.07)",
                              }}
                            >
                              {item.regressionPassed ? (
                                <span className="badge success">
                                  ✓ PASS
                                </span>
                              ) : (
                                <span className="badge failed">
                                  ✕ FAIL
                                </span>
                              )}
                            </td>

                            <td
                              style={{
                                padding: "10px 8px",
                                borderTop:
                                  "1px solid rgba(255,255,255,0.07)",
                              }}
                            >
                              {new Date(
                                item.createdAt
                              ).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="card" style={{ marginTop: "16px" }}>
            <p>Loading analytics...</p>
          </div>
        )}
      </div>
    </main>
  );
}
