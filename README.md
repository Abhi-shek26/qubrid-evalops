# Qubrid EvalOps

A CI/CD evaluation platform for AI applications powered by Qubrid. It runs versioned test cases, scores model responses, tracks performance/cost, detects quality regressions, and exposes LLM cache effectiveness.

## Folder structure

```text
qubrid-evalops/
├── apps/
│   ├── api/                         # Express API + Prisma + SQL Server
│   │   ├── prisma/schema.prisma
│   │   └── src/
│   │       ├── lib/                 # config, Prisma, Redis
│   │       ├── middleware/          # JWT auth
│   │       ├── routes/              # auth, projects, CI
│   │       └── server.ts
│   └── web/                         # Next.js dashboard
├── packages/
│   ├── shared/                      # shared Zod schemas + TS contracts
│   ├── qubrid-client/               # OpenAI-compatible Qubrid client
│   ├── llm-cache/                   # deterministic Redis LLM response cache
│   └── eval-engine/                 # evaluator implementations + aggregation
├── workers/
│   └── evaluation-worker/           # BullMQ background evaluation worker
├── github-action/                   # custom GitHub Action
├── docs/
├── docker-compose.yml               # Redis locally
├── .env.example
└── package.json
```

## Architecture

```text
Next.js
   │
   ▼
Express API ───────► SQL Server (Prisma)
   │
   └────► Redis / BullMQ
               │
               ▼
        Evaluation Worker
          │          │
          │          └──► Eval Engine
          │
          ├──► Redis LLM Cache
          │
          └──► Qubrid API
```

Qubrid is called through its OpenAI-compatible interface. The current Qubrid docs/examples show the serverless API at `https://platform.qubrid.com/v1`. The client is isolated in `packages/qubrid-client` so the rest of the system does not depend on Qubrid-specific SDK details.

## LLM cache feature

EvalOps response caching is a measurable feature, not just a hidden optimization.

For every evaluated case we record:

- `cacheHit`
- `cacheMissRate`
- `cacheHitRate`
- `cachedInputTokens` when the upstream response reports them
- original uncached latency
- current latency
- estimated cost
- LLM calls avoided

The cache key contains project, namespace, model, full message list, and generation parameters. The system prompt is part of the message list, so changing the prompt creates a different cache key.

**Important:** CI regression runs disable EvalOps response caching. Otherwise a previous cached answer could make a broken prompt/model appear healthy.

Provider-side prompt caching is tracked separately: EvalOps does not assume a cache hit at Qubrid unless the Qubrid response explicitly supplies cached-token metadata.

## SQL Server setup with SSMS

1. Install Microsoft SQL Server (Developer or Express is suitable for local development).
2. Install SQL Server Management Studio (SSMS).
3. In SSMS create a database named `qubrid_evalops`.
4. Put your SQL Server connection string in `.env` as `DATABASE_URL`.
5. Generate and migrate Prisma:

```bash
npm install
npm run prisma:generate
npm run prisma:migrate
```

Start Redis:

```bash
docker compose up -d redis
```

Then run the services:

```bash
npm run dev
```

## Environment

Copy `.env.example` to `.env` and set `JWT_SECRET` and `QUBRID_API_KEY` at minimum. Cost fields can stay zero during development, but set the project input/output rates to display meaningful cost estimates.

## First vertical slice

Create account → create project → create dataset/test case → run evaluation → worker calls Qubrid → cache stores response → evaluator scores response → experiment metrics appear in dashboard → set a baseline → future runs can fail on regression.
