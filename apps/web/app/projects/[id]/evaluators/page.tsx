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

const defaultConfig = {
  cases: [
    {
      inputContains: ["20 days"],
      mustContain: ["30-day", "proof of purchase"],
    },
    {
      inputContains: ["45 days"],
      mustContain: ["30-day"],
    },
    {
      inputContains: ["10 days", "don't have my receipt"],
      mustContain: ["30-day", "proof of purchase"],
    },
  ],
};

export default function EvaluatorsPage() {
  const { id } = useParams<{ id: string }>();

  const [evaluators, setEvaluators] = useState<Evaluator[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [type, setType] = useState("RULE");
  const [config, setConfig] = useState(
    JSON.stringify(defaultConfig, null, 2)
  );

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    try {
      setError("");

      const response = await fetch(
        `${API_URL}/api/v1/projects/${id}/evaluators`,
        {
          headers: authHeaders(),
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Failed to load evaluators"
        );
      }

      setEvaluators(data.data ?? []);
    } catch (err: any) {
      setError(err.message || "Failed to load evaluators");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  async function createEvaluator() {
    try {
      setSaving(true);
      setError("");

      let parsedConfig;

      try {
        parsedConfig = JSON.parse(config);
      } catch {
        setError("Configuration must be valid JSON.");
        return;
      }

      if (!name.trim()) {
        setError("Evaluator name is required.");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/v1/projects/${id}/evaluators`,
        {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify({
            name: name.trim(),
            type,
            config: parsedConfig,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Failed to create evaluator"
        );
      }

      setName("");
      setType("RULE");
      setConfig(JSON.stringify(defaultConfig, null, 2));
      setShowForm(false);

      await load();
    } catch (err: any) {
      setError(err.message || "Failed to create evaluator");
    } finally {
      setSaving(false);
    }
  }

  async function deleteEvaluator(evaluatorId: string) {
    if (!window.confirm("Delete this evaluator?")) {
      return;
    }

    try {
      setError("");

      const response = await fetch(
        `${API_URL}/api/v1/projects/${id}/evaluators/${evaluatorId}`,
        {
          method: "DELETE",
          headers: authHeaders(),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Failed to delete evaluator"
        );
      }

      await load();
    } catch (err: any) {
      setError(err.message || "Failed to delete evaluator");
    }
  }

  if (loading) {
    return (
      <main>
        <div className="card">
          <p>Loading evaluators...</p>
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
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div>
            <h1>Evaluators</h1>
            <p>
              Define rules that determine whether your AI responses
              pass or fail.
            </p>
          </div>

          <button onClick={() => setShowForm((value) => !value)}>
            {showForm ? "Cancel" : "+ Create Evaluator"}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="card">
          <h2>Create Evaluator</h2>

          <div style={{ marginTop: "20px" }}>
            <label>Evaluator Name</label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Refund Policy Check"
              style={{
                width: "100%",
                marginTop: "8px",
                padding: "12px",
              }}
            />
          </div>

          <div style={{ marginTop: "20px" }}>
            <label>Type</label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{
                width: "100%",
                marginTop: "8px",
                padding: "12px",
              }}
            >
              <option value="RULE">RULE</option>
              <option value="SEMANTIC">SEMANTIC</option>
              <option value="JSON_SCHEMA">JSON_SCHEMA</option>
            </select>
          </div>

          <div style={{ marginTop: "20px" }}>
            <label>Configuration (JSON)</label>

            <textarea
              value={config}
              onChange={(e) => setConfig(e.target.value)}
              rows={18}
              style={{
                width: "100%",
                marginTop: "8px",
                padding: "12px",
                fontFamily: "monospace",
                resize: "vertical",
              }}
            />
          </div>

          {error && (
            <p style={{ marginTop: "16px", color: "#ff6b6b" }}>
              {error}
            </p>
          )}

          <button
            onClick={createEvaluator}
            disabled={saving}
            style={{ marginTop: "20px" }}
          >
            {saving ? "Saving..." : "Save Evaluator"}
          </button>
        </div>
      )}

      {error && !showForm && (
        <div className="card">
          <p style={{ color: "#ff6b6b" }}>{error}</p>
        </div>
      )}

      {evaluators.map((evaluator) => (
        <div className="card" key={evaluator.id}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "20px",
            }}
          >
            <div>
              <h2>{evaluator.name}</h2>

              <p>
                Type: <strong>{evaluator.type}</strong>
              </p>
            </div>

            <button
              onClick={() => deleteEvaluator(evaluator.id)}
              style={{
                background: "#3a1820",
              }}
            >
              Delete
            </button>
          </div>

          <pre
            style={{
              marginTop: "20px",
              padding: "16px",
              overflowX: "auto",
              borderRadius: "10px",
              background: "#0b1020",
            }}
          >
            {typeof evaluator.config === "string"
              ? evaluator.config
              : JSON.stringify(evaluator.config, null, 2)}
          </pre>
        </div>
      ))}

      {evaluators.length === 0 && !showForm && (
        <div className="card">
          <p>No evaluators configured yet.</p>
        </div>
      )}
    </main>
  );
}