"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { API_URL, authHeaders } from "../../../../lib-api";

type Experiment = {
  id: string;
  name: string;
  model: string;
  status: string;
  useCache: boolean;
  qualityScore?: number | null;
  passRate?: number | null;
  createdAt: string;
};

export default function Experiments() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");

  // Cache mode for NEW evaluation
  const [useCache, setUseCache] = useState(false);

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
      setError(err.message || "Failed to load experiments");
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

      // Get project + first dataset
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

      const dataset = projectData.data?.datasets?.[0];

      if (!dataset) {
        throw new Error(
          "No dataset found. Create a dataset before running an evaluation."
        );
      }

      // Create evaluation
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

      // IMPORTANT:
      // Navigate to the separate experiment detail page.
      router.push(
        `/projects/${id}/experiments/${experiment.id}`
      );
    } catch (err: any) {
      setError(err.message || "Failed to start evaluation");
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

        <p style={{ marginTop: "8px", opacity: 0.7 }}>
          Run regression evaluations and measure AI quality,
          latency, cost and cache performance.
        </p>

        {/* EVALUATION CONFIGURATION */}
        <div
          style={{
            marginTop: "24px",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #29334d",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <strong>Evaluation Configuration</strong>

          <p
            style={{
              marginTop: "6px",
              marginBottom: 0,
              opacity: 0.65,
              fontSize: "14px",
            }}
          >
            Choose whether this evaluation should reuse
            cached LLM responses or make fresh Qubrid calls.
          </p>

          {/* CACHE MODE */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "16px",
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
                fontWeight: useCache ? 600 : 400,
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
                fontWeight: !useCache ? 600 : 400,
              }}
            >
              ↻ Fresh Run
            </button>
          </div>

          {/* DESCRIPTION */}
          <div
            style={{
              marginTop: "14px",
              padding: "12px",
              borderRadius: "8px",
              background: "rgba(99,140,255,0.06)",
              fontSize: "14px",
              opacity: 0.85,
            }}
          >
            {useCache ? (
              <>
                <strong>Cache enabled.</strong>{" "}
                Matching responses may be served from Redis,
                avoiding unnecessary LLM calls.
              </>
            ) : (
              <>
                <strong>Fresh run.</strong>{" "}
                Cached responses will be ignored and Qubrid
                will be called for each test case.
              </>
            )}
          </div>

          {/* RUN */}
          <div style={{ marginTop: "18px" }}>
            <button
              onClick={runEvaluation}
              disabled={running}
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
              background: "rgba(255,80,80,0.1)",
              border:
                "1px solid rgba(255,80,80,0.3)",
              color: "#ff8080",
            }}
          >
            {error}
          </div>
        )}
      </div>

      {/* ONLY THE RUN LIST */}
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
                  border: "1px solid #29334d",
                  cursor: "pointer",
                  transition: "border 0.15s ease",
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <strong>{experiment.name}</strong>

                  {statusBadge(experiment.status)}
                </div>

                <small
                  style={{
                    display: "block",
                    marginTop: "6px",
                    opacity: 0.65,
                  }}
                >
                  {new Date(
                    experiment.createdAt
                  ).toLocaleString()}
                </small>

                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    marginTop: "12px",
                    fontSize: "14px",
                    opacity: 0.75,
                  }}
                >
                  <span>
                    Quality:{" "}
                    {experiment.qualityScore != null
                      ? `${experiment.qualityScore.toFixed(
                          1
                        )}%`
                      : "—"}
                  </span>

                  <span>
                    Pass Rate:{" "}
                    {experiment.passRate != null
                      ? `${experiment.passRate.toFixed(
                          1
                        )}%`
                      : "—"}
                  </span>

                  <span>
                    {experiment.useCache
                      ? "⚡ Cache"
                      : "↻ Fresh"}
                  </span>
                </div>

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