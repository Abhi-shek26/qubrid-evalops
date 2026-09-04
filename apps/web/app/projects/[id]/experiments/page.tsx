"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { API_URL, authHeaders } from "../../../../lib-api";

type Experiment = {
  id: string;
  name: string;
  model: string;
  status: string;
  qualityScore?: number | null;
  passRate?: number | null;
  avgLatencyMs?: number | null;
  cacheHitRate?: number | null;
  createdAt: string;
};

export default function Experiments() {
  const { id } = useParams<{ id: string }>();

  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");

  async function loadExperiments() {
    try {
      setError("");

      const response = await fetch(
        `${API_URL}/api/v1/projects/${id}/experiments`,
        {
          headers: authHeaders(),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Failed to load experiments"
        );
      }

      setExperiments(data.data ?? []);
    } catch (err: any) {
      setError(
        err?.message || "Failed to load experiments"
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

  async function runEvaluation() {
    try {
      setError("");
      setRunning(true);

      /*
       * Get the project so we can find its dataset.
       */
      const projectResponse = await fetch(
        `${API_URL}/api/v1/projects/${id}`,
        {
          headers: authHeaders(),
        }
      );

      const projectData = await projectResponse.json();

      if (!projectResponse.ok) {
        throw new Error(
          projectData?.message || "Failed to load project"
        );
      }

      const dataset = projectData?.data?.datasets?.[0];

      if (!dataset) {
        throw new Error(
          "No dataset found. Create a dataset before running an evaluation."
        );
      }

      /*
       * Start evaluation.
       */
      const response = await fetch(
        `${API_URL}/api/v1/projects/${id}/evaluations`,
        {
          method: "POST",
          headers: {
            ...authHeaders(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            datasetId: dataset.id,
            useCache: true,
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

      /*
       * Refresh experiment list.
       */
      await loadExperiments();
    } catch (err: any) {
      setError(
        err?.message || "Failed to start evaluation"
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

  if (loading) {
    return (
      <main>
        <div className="card">
          <h1>Experiments</h1>
          <p>Loading experiments...</p>
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
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1>Experiments</h1>

            <p>
              Run regression evaluations and measure AI
              quality, latency, cost and cache performance.
            </p>
          </div>

          <button
            onClick={runEvaluation}
            disabled={running}
          >
            {running
              ? "Starting Evaluation..."
              : "Run Evaluation"}
          </button>
        </div>

        {error && (
          <div
            style={{
              marginTop: "20px",
              padding: "14px",
              borderRadius: "8px",
              background: "rgba(255, 80, 80, 0.1)",
              border:
                "1px solid rgba(255, 80, 80, 0.3)",
              color: "#ff8080",
            }}
          >
            {error}
          </div>
        )}
      </div>

      {/* EXPERIMENT LIST */}

      <div className="card">
        <h2>Evaluation Runs</h2>

        {experiments.length === 0 ? (
          <div
            style={{
              marginTop: "20px",
              padding: "30px",
              textAlign: "center",
              border: "1px dashed #29334d",
              borderRadius: "10px",
            }}
          >
            <p>No evaluations yet.</p>

            <p>
              Click <strong>Run Evaluation</strong> to
              create your first experiment.
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
            {experiments.map((experiment) => (
              <Link
                key={experiment.id}
                href={`/projects/${id}/experiments/${experiment.id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div
                  style={{
                    padding: "20px",
                    border: "1px solid #29334d",
                    borderRadius: "12px",
                    cursor: "pointer",
                    transition: "0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "#638cff";
                    e.currentTarget.style.background =
                      "rgba(99, 140, 255, 0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "#29334d";
                    e.currentTarget.style.background =
                      "transparent";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          marginBottom: "8px",
                        }}
                      >
                        {experiment.name}
                      </h3>

                      <p
                        style={{
                          margin: 0,
                          opacity: 0.7,
                          fontSize: "14px",
                        }}
                      >
                        {new Date(
                          experiment.createdAt
                        ).toLocaleString()}
                      </p>
                    </div>

                    {statusBadge(experiment.status)}
                  </div>

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
                      <small>Latency</small>
                      <h3>
                        {experiment.avgLatencyMs != null
                          ? `${experiment.avgLatencyMs.toFixed(
                              0
                            )} ms`
                          : "-"}
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
                  </div>

                  <div
                    style={{
                      marginTop: "16px",
                      fontSize: "13px",
                      opacity: 0.65,
                    }}
                  >
                    Click to view experiment details →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}