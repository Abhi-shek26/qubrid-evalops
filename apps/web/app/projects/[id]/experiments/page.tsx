"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { API_URL, authHeaders } from "../../../../lib-api";

type Dataset = {
  id: string;
  name: string;
  testCaseCount: number;
};

type Experiment = {
  id: string;
  name: string;
  model: string;
  status: string;
  useCache: boolean;

  qualityScore?: number | null;
  passRate?: number | null;

  regressionDelta?: number | null;
  regressionPassed?: boolean | null;
  allowedQualityDrop?: number | null;

  createdAt: string;
};

export default function Experiments() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [experiments, setExperiments] =
    useState<Experiment[]>([]);

  const [datasets, setDatasets] =
    useState<Dataset[]>([]);

  const [selectedDatasetId, setSelectedDatasetId] =
    useState("");

  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");

  // Current project baseline
  const [baselineExperimentId, setBaselineExperimentId] =
    useState<string | null>(null);

  // Experiment currently being set as baseline
  const [settingBaseline, setSettingBaseline] =
    useState<string | null>(null);

  // Cache mode for NEW evaluation
  const [useCache, setUseCache] = useState(false);

  async function loadExperiments() {
    try {
      setError("");

      const [
        experimentsResponse,
        projectResponse,
      ] = await Promise.all([
        fetch(
          `${API_URL}/api/v1/projects/${id}/experiments`,
          {
            headers: authHeaders(),
          }
        ),

        fetch(
          `${API_URL}/api/v1/projects/${id}`,
          {
            headers: authHeaders(),
          }
        ),
      ]);

      const data =
        await experimentsResponse.json();

      const projectData =
        await projectResponse.json();

      if (!experimentsResponse.ok) {
        throw new Error(
          data?.message ||
            "Failed to load experiments"
        );
      }

      if (!projectResponse.ok) {
        throw new Error(
          projectData?.message ||
            "Failed to load project"
        );
      }

      setExperiments(data.data ?? []);

      setBaselineExperimentId(
        projectData.data?.baseline?.experimentId ??
          null
      );

      /*
       * Load all datasets and their test-case counts.
       *
       * The project endpoint gives us the datasets,
       * while the dataset detail endpoint gives us
       * the test cases for each dataset.
       */
      const projectDatasets =
        projectData.data?.datasets ?? [];

      const datasetsWithCounts =
        await Promise.all(
          projectDatasets.map(
            async (dataset: {
              id: string;
              name: string;
            }) => {
              try {
                const response = await fetch(
                  `${API_URL}/api/v1/projects/${id}/datasets/${dataset.id}`,
                  {
                    headers: authHeaders(),
                  }
                );

                if (!response.ok) {
                  return {
                    id: dataset.id,
                    name: dataset.name,
                    testCaseCount: 0,
                  };
                }

                const datasetData =
                  await response.json();

                return {
                  id: dataset.id,
                  name: dataset.name,
                  testCaseCount:
                    datasetData.data?.testCases
                      ?.length ?? 0,
                };
              } catch {
                return {
                  id: dataset.id,
                  name: dataset.name,
                  testCaseCount: 0,
                };
              }
            }
          )
        );

      setDatasets(datasetsWithCounts);

      /*
       * Automatically select the dataset
       * containing the most test cases.
       *
       * This makes the intended 4-case dataset
       * the default in your current database.
       */
      if (datasetsWithCounts.length > 0) {
        const bestDataset =
          [...datasetsWithCounts].sort(
            (a, b) =>
              b.testCaseCount -
              a.testCaseCount
          )[0];

        setSelectedDatasetId(
          bestDataset.id
        );
      }
    } catch (err: any) {
      setError(
        err.message ||
          "Failed to load experiments"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      loadExperiments();
    }
  }, [id]);

  async function setBaseline(
    experimentId: string
  ) {
    try {
      setError("");
      setSettingBaseline(experimentId);

      const response = await fetch(
        `${API_URL}/api/v1/projects/${id}/baseline/${experimentId}`,
        {
          method: "POST",
          headers: {
            ...authHeaders(),
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to set baseline"
        );
      }

      setBaselineExperimentId(experimentId);
    } catch (err: any) {
      setError(
        err.message ||
          "Failed to set baseline"
      );
    } finally {
      setSettingBaseline(null);
    }
  }

  async function runEvaluation() {
    try {
      setError("");

      if (!selectedDatasetId) {
        throw new Error(
          "Please select a dataset before running an evaluation."
        );
      }

      const selectedDataset =
        datasets.find(
          (dataset) =>
            dataset.id ===
            selectedDatasetId
        );

      if (
        !selectedDataset ||
        selectedDataset.testCaseCount === 0
      ) {
        throw new Error(
          "The selected dataset contains no test cases. Please select a dataset with test cases."
        );
      }

      setRunning(true);

      // Create evaluation using selected dataset
      const response = await fetch(
        `${API_URL}/api/v1/projects/${id}/evaluations`,
        {
          method: "POST",
          headers: {
            ...authHeaders(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            datasetId: selectedDatasetId,
            useCache,
            failOnRegression: true,
            allowedQualityDrop: 2,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            "Failed to start evaluation"
        );
      }

      const experiment = data.data;

      // Refresh list
      await loadExperiments();

      // Navigate to experiment detail page
      router.push(
        `/projects/${id}/experiments/${experiment.id}`
      );
    } catch (err: any) {
      setError(
        err.message ||
          "Failed to start evaluation"
      );
    } finally {
      setRunning(false);
    }
  }

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

  function regressionBadge(
    experiment: Experiment
  ) {
    if (
      experiment.regressionPassed === null ||
      experiment.regressionPassed ===
        undefined
    ) {
      return (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "7px 10px",
            borderRadius: "8px",
            border: "1px solid #29334d",
            background:
              "rgba(255,255,255,0.03)",
            fontSize: "12px",
            fontWeight: 600,
            opacity: 0.7,
          }}
        >
          — NOT COMPARED
        </span>
      );
    }

    if (experiment.regressionPassed) {
      return (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "7px 10px",
            borderRadius: "8px",
            border:
              "1px solid rgba(80,200,120,0.4)",
            background:
              "rgba(80,200,120,0.08)",
            fontSize: "12px",
            fontWeight: 600,
          }}
        >
          ✓ REGRESSION PASSED
        </span>
      );
    }

    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "7px 10px",
          borderRadius: "8px",
          border:
            "1px solid rgba(255,80,80,0.4)",
          background:
            "rgba(255,80,80,0.08)",
          fontSize: "12px",
          fontWeight: 600,
        }}
      >
        ✕ REGRESSION FAILED
      </span>
    );
  }

  function regressionDeltaText(
    experiment: Experiment
  ) {
    if (experiment.regressionDelta == null) {
      return "—";
    }

    const delta = experiment.regressionDelta;

    return `${
      delta >= 0 ? "+" : ""
    }${delta.toFixed(2)} pp`;
  }

  if (loading) {
    return (
      <main>
        <div className="card">
          <p>Loading experiments...</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* HEADER */}

      <div className="card">
        <h1>Experiments</h1>

        <p
          style={{
            marginTop: "8px",
            opacity: 0.7,
          }}
        >
          Run regression evaluations and measure
          AI quality, latency, cost and cache
          performance.
        </p>

        {/* EVALUATION CONFIGURATION */}

        <div
          style={{
            marginTop: "24px",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #29334d",
            background:
              "rgba(255,255,255,0.02)",
          }}
        >
          <strong>
            Evaluation Configuration
          </strong>

          <p
            style={{
              marginTop: "6px",
              marginBottom: 0,
              opacity: 0.65,
              fontSize: "14px",
            }}
          >
            Select a dataset and choose whether
            this evaluation should reuse cached LLM
            responses or make fresh Qubrid calls.
          </p>

          {/* DATASET */}

          <div
            style={{
              marginTop: "18px",
            }}
          >
            <label
              htmlFor="dataset"
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "8px",
                opacity: 0.8,
              }}
            >
              Dataset
            </label>

            {datasets.length === 0 ? (
              <div
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  border:
                    "1px solid rgba(255,80,80,0.3)",
                  background:
                    "rgba(255,80,80,0.06)",
                  color: "#ff8080",
                  fontSize: "14px",
                }}
              >
                No datasets available. Create a
                dataset before running an evaluation.
              </div>
            ) : (
              <>
                <select
                  id="dataset"
                  value={selectedDatasetId}
                  onChange={(e) =>
                    setSelectedDatasetId(
                      e.target.value
                    )
                  }
                  style={{
                    width: "100%",
                    maxWidth: "500px",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    border:
                      "1px solid #29334d",
                    background: "#1b2335",
                    color: "#ffffff",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  {datasets.map((dataset) => (
                    <option
                      key={dataset.id}
                      value={dataset.id}
                      style={{
                        background: "#ffffff",
                        color: "#111827",
                      }}
                    >
                      {dataset.name} —{" "}
                      {dataset.testCaseCount}{" "}
                      {dataset.testCaseCount === 1
                        ? "test case"
                        : "test cases"}
                    </option>
                  ))}
                </select>

                {selectedDatasetId && (
                  <div
                    style={{
                      marginTop: "8px",
                      fontSize: "13px",
                      opacity: 0.6,
                    }}
                  >
                    {(() => {
                      const selectedDataset =
                        datasets.find(
                          (dataset) =>
                            dataset.id ===
                            selectedDatasetId
                        );

                      if (!selectedDataset) {
                        return null;
                      }

                      return (
                        <>
                          {selectedDataset.testCaseCount}{" "}
                          {selectedDataset.testCaseCount ===
                          1
                            ? "test case"
                            : "test cases"}{" "}
                          will be evaluated.
                        </>
                      );
                    })()}
                  </div>
                )}
              </>
            )}
          </div>

          {/* CACHE MODE */}

          <div
            style={{
              marginTop: "20px",
            }}
          >
            <div
              style={{
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "8px",
                opacity: 0.8,
              }}
            >
              Run Mode
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                onClick={() => setUseCache(true)}
                style={{
                  padding: "12px 18px",
                  borderRadius: "10px",
                  border: useCache
                    ? "1px solid #638cff"
                    : "1px solid #29334d",
                  background: useCache
                    ? "rgba(99,140,255,0.12)"
                    : "transparent",
                  color: "inherit",
                  cursor: "pointer",
                  fontWeight: useCache
                    ? 600
                    : 400,
                }}
              >
                ⚡ Use Cache
              </button>

              <button
                type="button"
                onClick={() => setUseCache(false)}
                style={{
                  padding: "12px 18px",
                  borderRadius: "10px",
                  border: !useCache
                    ? "1px solid #638cff"
                    : "1px solid #29334d",
                  background: !useCache
                    ? "rgba(99,140,255,0.12)"
                    : "transparent",
                  color: "inherit",
                  cursor: "pointer",
                  fontWeight: !useCache
                    ? 600
                    : 400,
                }}
              >
                ↻ Fresh Run
              </button>
            </div>
          </div>

          {/* DESCRIPTION */}

          <div
            style={{
              marginTop: "14px",
              padding: "12px",
              borderRadius: "8px",
              background:
                "rgba(99,140,255,0.06)",
              fontSize: "14px",
              opacity: 0.85,
            }}
          >
            {useCache ? (
              <>
                <strong>Cache enabled.</strong>{" "}
                Matching responses may be served
                from Redis, avoiding unnecessary LLM
                calls.
              </>
            ) : (
              <>
                <strong>Fresh run.</strong>{" "}
                Cached responses will be ignored and
                Qubrid will be called for each test
                case.
              </>
            )}
          </div>

          {/* RUN */}

          <div style={{ marginTop: "18px" }}>
            <button
              onClick={runEvaluation}
              disabled={
                running ||
                datasets.length === 0 ||
                !selectedDatasetId
              }
            >
              {running
                ? "Starting Evaluation..."
                : useCache
                ? "⚡ Run Cached Evaluation"
                : "↻ Run Fresh Evaluation"}
            </button>
          </div>
        </div>

        {/* ERROR */}

        {error && (
          <div
            style={{
              marginTop: "20px",
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

      {/* EVALUATION RUNS */}

      {experiments.length > 0 && (
        <div className="card">
          <h2>Evaluation Runs</h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "16px",
            }}
          >
            {experiments.map((experiment) => (
              <div
                key={experiment.id}
                onClick={() =>
                  router.push(
                    `/projects/${id}/experiments/${experiment.id}`
                  )
                }
                style={{
                  padding: "16px",
                  borderRadius: "10px",
                  border:
                    "1px solid #29334d",
                  cursor: "pointer",
                  transition:
                    "border 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border =
                    "1px solid #638cff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border =
                    "1px solid #29334d";
                }}
              >
                {/* HEADER ROW */}

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
                    <strong>
                      {experiment.name}
                    </strong>

                    <div
                      style={{
                        marginTop: "5px",
                        fontSize: "13px",
                        opacity: 0.55,
                      }}
                    >
                      {experiment.model}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {statusBadge(
                      experiment.status
                    )}

                    {baselineExperimentId ===
                      experiment.id && (
                      <span
                        style={{
                          display:
                            "inline-flex",
                          alignItems:
                            "center",
                          padding: "7px 10px",
                          borderRadius: "8px",
                          border:
                            "1px solid rgba(80,200,120,0.4)",
                          background:
                            "rgba(80,200,120,0.08)",
                          fontSize: "12px",
                          fontWeight: 600,
                        }}
                      >
                        ✓ BASELINE
                      </span>
                    )}
                  </div>
                </div>

                {/* DATE */}

                <small
                  style={{
                    display: "block",
                    marginTop: "8px",
                    opacity: 0.65,
                  }}
                >
                  {new Date(
                    experiment.createdAt
                  ).toLocaleString()}
                </small>

                {/* METRICS */}

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(120px, 1fr))",
                    gap: "10px",
                    marginTop: "14px",
                  }}
                >
                  <div
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      background:
                        "rgba(255,255,255,0.02)",
                    }}
                  >
                    <small>Quality</small>

                    <div
                      style={{
                        marginTop: "4px",
                        fontWeight: 600,
                      }}
                    >
                      {experiment.qualityScore !=
                      null
                        ? `${experiment.qualityScore.toFixed(
                            1
                          )}%`
                        : "—"}
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      background:
                        "rgba(255,255,255,0.02)",
                    }}
                  >
                    <small>Pass Rate</small>

                    <div
                      style={{
                        marginTop: "4px",
                        fontWeight: 600,
                      }}
                    >
                      {experiment.passRate !=
                      null
                        ? `${experiment.passRate.toFixed(
                            1
                          )}%`
                        : "—"}
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      background:
                        "rgba(255,255,255,0.02)",
                    }}
                  >
                    <small>
                      Quality Delta
                    </small>

                    <div
                      style={{
                        marginTop: "4px",
                        fontWeight: 600,
                      }}
                    >
                      {regressionDeltaText(
                        experiment
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      background:
                        "rgba(255,255,255,0.02)",
                    }}
                  >
                    <small>Run Mode</small>

                    <div
                      style={{
                        marginTop: "4px",
                        fontWeight: 600,
                      }}
                    >
                      {experiment.useCache
                        ? "⚡ Cache"
                        : "↻ Fresh"}
                    </div>
                  </div>
                </div>

                {/* REGRESSION */}

                {experiment.status ===
                  "COMPLETED" && (
                  <div
                    style={{
                      marginTop: "14px",
                      paddingTop: "14px",
                      borderTop:
                        "1px solid #29334d",
                      display: "flex",
                      alignItems: "center",
                      justifyContent:
                        "space-between",
                      gap: "12px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "12px",
                          opacity: 0.55,
                          marginBottom: "6px",
                        }}
                      >
                        REGRESSION STATUS
                      </div>

                      {regressionBadge(
                        experiment
                      )}
                    </div>

                    {experiment.regressionDelta !=
                      null && (
                      <div
                        style={{
                          fontSize: "13px",
                          opacity: 0.65,
                        }}
                      >
                        Allowed drop:{" "}
                        {experiment.allowedQualityDrop ??
                          2}{" "}
                        pp
                      </div>
                    )}
                  </div>
                )}

                {/* BASELINE ACTION */}

                {experiment.status ===
                  "COMPLETED" &&
                  experiment.qualityScore !=
                    null && (
                    <div
                      style={{
                        marginTop: "14px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      {baselineExperimentId ===
                      experiment.id ? (
                        <span
                          style={{
                            display:
                              "inline-flex",
                            alignItems:
                              "center",
                            padding:
                              "8px 12px",
                            borderRadius: "8px",
                            border:
                              "1px solid rgba(80,200,120,0.4)",
                            background:
                              "rgba(80,200,120,0.08)",
                            fontSize: "13px",
                            fontWeight: 600,
                          }}
                        >
                          ✓ BASELINE
                        </span>
                      ) : (
                        <button
                          type="button"
                          disabled={
                            settingBaseline ===
                            experiment.id
                          }
                          onClick={(e) => {
                            e.stopPropagation();

                            setBaseline(
                              experiment.id
                            );
                          }}
                        >
                          {settingBaseline ===
                          experiment.id
                            ? "Setting Baseline..."
                            : "Set as Baseline"}
                        </button>
                      )}
                    </div>
                  )}

                {/* FOOTER */}

                <div
                  style={{
                    marginTop: "10px",
                    fontSize: "13px",
                    opacity: 0.45,
                  }}
                >
                  Click to view experiment →
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {experiments.length === 0 && (
        <div className="card">
          <h2>No evaluations yet</h2>

          <p style={{ opacity: 0.7 }}>
            Run your first evaluation above.
          </p>
        </div>
      )}
    </main>
  );
}