"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { API_URL, authHeaders } from "../../../lib-api";

export default function Project() {
  const { id } = useParams<{ id: string }>();

  const [p, setP] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/v1/projects/${id}`, {
      headers: authHeaders(),
    })
      .then((r) => r.json())
      .then((d) => setP(d.data));
  }, [id]);

  if (!p) {
    return <main>Loading...</main>;
  }

  return (
    <main>
      <div className="card">
        <h1>{p.name}</h1>
        <p>{p.description}</p>
        <small>{p.model}</small>
      </div>

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
              Define rules and checks to determine whether AI responses
              pass or fail.
            </p>
          </div>
        </Link>
      </div>
    </main>
  );
}