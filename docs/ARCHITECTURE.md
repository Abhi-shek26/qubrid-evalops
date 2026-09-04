# Qubrid EvalOps Architecture

```text
                         ┌──────────────────────┐
                         │      Next.js Web      │
                         │ dashboard / datasets │
                         └──────────┬───────────┘
                                    │ HTTPS
                         ┌──────────▼───────────┐
                         │      Express API     │
                         │ auth / projects / CI │
                         └─────┬────────┬───────┘
                               │        │
                         Prisma│        │Redis/BullMQ
                               │        │
                      ┌────────▼─┐  ┌───▼────────────┐
                      │SQL Server │  │ Evaluation     │
                      │   + SSMS  │  │ Worker         │
                      └───────────┘  └──────┬─────────┘
                                             │
                                      ┌──────▼──────┐
                                      │ Eval Engine  │
                                      └──────┬──────┘
                                             │
                                      ┌──────▼──────┐
                                      │ Qubrid API   │
                                      └──────────────┘
```

## LLM cache

The cache is a first-class package using Redis. A cache key is a SHA-256 hash of project, namespace, model, messages and generation parameters. A hit avoids the Qubrid request; the result still passes through the evaluation engine.

Metrics recorded per result: cache hit, cached input tokens reported by upstream when available, original latency, current latency, estimated cost, total tokens.

CI runs disable EvalOps response caching so an old cached completion cannot mask a regression.

This is intentionally different from provider-side prompt caching: provider-side cache data is only recorded when Qubrid returns explicit cached-token metadata.
