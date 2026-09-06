# Qubrid EvalOps

A CI/CD regression-testing platform for AI applications powered by Qubrid.

Qubrid EvalOps lets teams run versioned evaluation datasets against AI applications, score model responses with multiple evaluators, track quality and performance metrics, compare runs against baselines, and automatically detect regressions in GitHub Actions.

## Features

- Versioned evaluation datasets and test cases
- Rule-based evaluation
- LLM-as-a-Judge evaluation
- RAG evaluation:
  - Correctness
  - Groundedness
  - Citation quality
  - Hallucination detection
- Baseline-based regression detection
- Advanced analytics and evaluator trends
- Redis-backed LLM response caching
- Cache hit/miss and cost-savings metrics
- Background evaluation processing with BullMQ
- GitHub Actions CI/CD quality gates
- Production deployment with Vercel, Render, and Azure SQL

## Architecture

```text
                    ┌──────────────────────┐
                    │   Next.js Dashboard  │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     Express API      │
                    └───────┬───────┬──────┘
                            │       │
                            ▼       ▼
                    ┌──────────┐ ┌──────────────┐
                    │ SQL/     │ │ Redis +      │
                    │ Prisma   │ │ BullMQ        │
                    └──────────┘ └──────┬───────┘
                                       │
                                       ▼
                              ┌──────────────────┐
                              │ Evaluation Worker│
                              └───────┬──────────┘
                                      │
                         ┌────────────┴────────────┐
                         ▼                         ▼
                  ┌──────────────┐         ┌──────────────┐
                  │  Eval Engine │         │  LLM Cache   │
                  └──────────────┘         └──────┬───────┘
                                                   │
                                                   ▼
                                           ┌──────────────┐
                                           │  Qubrid API  │
                                           └──────────────┘
```

## Workflows

Qubrid EvalOps is built around two main workflows: the **evaluation workflow** used from the dashboard/API and the **CI regression workflow** used from GitHub Actions.

### 1. Creating and Running an Evaluation

The normal evaluation workflow starts from a project, dataset, and model configuration.

```text
Create Project
      │
      ▼
Create / Select Dataset
      │
      ▼
Add Test Cases
      │
      ▼
Configure Evaluators
      │
      ▼
Run Experiment
      │
      ▼
API creates Experiment
      │
      ▼
BullMQ queues Evaluation Job
      │
      ▼
Evaluation Worker processes cases
      │
      ├── Fetch Qubrid response
      ├── Apply evaluators
      ├── Record latency/tokens/cost
      └── Store evaluator results
      │
      ▼
Experiment = COMPLETED
      │
      ▼
Dashboard displays results
```

An experiment represents one evaluation run against a specific dataset version. This makes it possible to compare different runs without losing the exact test set used for each run.

### 2. Evaluation Engine Workflow

For every test case, the evaluation engine executes the configured evaluators and aggregates their scores.

```text
Test Case
   │
   ▼
Qubrid Model Response
   │
   ├──────────────► RULE
   │
   ├──────────────► LLM_JUDGE
   │
   ├──────────────► RAG_CORRECTNESS
   │
   ├──────────────► RAG_GROUNDEDNESS
   │
   ├──────────────► RAG_CITATION
   │
   └──────────────► RAG_HALLUCINATION
              │
              ▼
       Evaluator Results
              │
              ▼
       Overall Quality
```

Each evaluator produces a score and pass/fail result. Evaluators that are not applicable to a test case are skipped rather than incorrectly lowering the overall score. For example, RAG evaluators skip ordinary test cases that do not provide retrieved-context metadata.

The worker also records operational metrics such as latency, token usage, estimated cost, and cache behavior.

### 3. Baseline and Regression Workflow

A baseline is a previously accepted experiment used as the quality reference for future runs.

```text
Accepted Experiment
        │
        ▼
Set as Baseline
        │
        ▼
Run New Experiment
        │
        ▼
Compare Current vs Baseline
        │
        ├── Quality drop <= allowed threshold ──► PASS
        │
        └── Quality drop > allowed threshold ───► REGRESSION
```

The regression check is based on the configured quality tolerance. This allows small evaluation noise while still catching meaningful quality degradation.

Example:

```text
Baseline quality: 98.1%
Current quality:  96.9%
Allowed drop:      2.0 percentage points
Delta:            -1.2 percentage points

Regression check: PASS
```

### 4. GitHub Actions CI Workflow

Every pull request targeting `main` can trigger the EvalOps GitHub Action.

```text
Developer opens PR
        │
        ▼
GitHub Actions
        │
        ▼
Checkout repository
        │
        ▼
Run github-action
        │
        ▼
Send project + dataset + CI token
        │
        ▼
EvalOps creates experiment
        │
        ▼
Worker runs evaluation
        │
        ▼
Compare with baseline
        │
        ├──────────────► PASS ──► GitHub check succeeds
        │
        └──────────────► FAIL ──► GitHub check fails
```

The workflow uses GitHub Secrets for sensitive values such as the EvalOps API URL, project ID, and CI token. The dataset ID identifies the evaluation dataset used as the CI test suite.

CI evaluations use fresh model responses (`useCache=false`) so that an old cached response cannot hide a newly introduced regression.

### 5. Dataset Versioning Workflow

Datasets are versioned so evaluation results remain reproducible.

```text
Dataset v1
   │
   ├── Test Case 1
   ├── Test Case 2
   └── Test Case 3
          │
          ▼
      Create Version
          │
          ▼
Dataset v2
   │
   ├── Test Case 1
   ├── Test Case 2
   ├── Test Case 3
   └── New / Updated Test Case
```

An experiment records the dataset version that was used. Updating a dataset therefore does not silently change the meaning of historical evaluation runs.

### 6. RAG Evaluation Workflow

RAG evaluations can include retrieved context and citation metadata in the test-case configuration.

```text
User Query
    │
    ▼
Retrieved Context
    │
    ▼
Model Response
    │
    ├── Correctness
    ├── Groundedness
    ├── Citation
    └── Hallucination
            │
            ▼
      RAG Evaluation
```

RAG evaluators are context-aware. When a test case does not contain RAG context, the relevant evaluator is marked as not applicable and is skipped from the aggregate evaluation instead of being treated as a failed RAG test.

## Testing

The project can be tested at several levels, from individual evaluator behavior to the complete GitHub Actions regression gate.

### 1. Local Build and Type Checks

Before running an evaluation, make sure the packages build successfully:

```bash
npm install

npx prisma generate --schema=apps/api/prisma/schema.prisma

npm run build -w @qubrid-evalops/shared
npm run build -w @qubrid-evalops/llm-cache
npm run build -w @qubrid-evalops/qubrid-client
npm run build -w @qubrid-evalops/eval-engine
npm run build -w @qubrid-evalops/api
npm run build -w @qubrid-evalops/worker
```

This validates that the shared schemas, evaluation engine, API, and worker can be compiled together.

### 2. Run the Application Locally

Start the development environment:

```bash
docker compose up -d redis
npm run dev
```

Then verify the API health endpoint:

```text
GET /api/v1/health
```

The API should return a successful health response before running evaluations.

### 3. Test an Evaluation from the Dashboard

A basic end-to-end test is:

```text
Login
  ↓
Open Project
  ↓
Open Experiments
  ↓
Select Dataset + Version
  ↓
Start Evaluation
  ↓
Wait for QUEUED → RUNNING → COMPLETED
  ↓
Open Experiment Details
  ↓
Verify scores and metrics
```

Verify that the experiment shows:

- selected model
- exact dataset name and version
- overall quality
- evaluator scores
- pass/fail status
- latency
- token usage
- estimated cost

### 4. Test Rule Evaluation

Create a small dataset containing deterministic cases.

For example, a refund-policy test can require:

```text
Input:
"I bought this 20 days ago. Can I get a refund?"

Expected response characteristics:
- mentions the 30-day period
- mentions proof of purchase
```

The `RULE` evaluator should pass when the required text or regular-expression checks are satisfied.

To test failure handling, intentionally require a string that the model should not produce:

```text
mustContain:
- THIS_SHOULD_FAIL
```

The evaluator should fail the test case and lower the experiment quality.

After the test, restore the correct evaluator configuration.

### 5. Test LLM Judge Evaluation

Run an experiment containing `LLM_JUDGE` evaluation and verify that:

```text
judge model
criteria
threshold
score
passed
reason
```

are stored in the experiment result.

A good test is to run the same test case with:

- a correct response
- an incomplete response
- an irrelevant response

The judge score should distinguish between these response qualities.

### 6. Test RAG Evaluation

Use a dataset whose test-case metadata contains retrieved context.

Example context:

```text
Customers can request a refund within 30 days of purchase.
A valid proof of purchase is required.
Refunds outside the 30-day period are not covered by the standard refund policy.
```

Then run the RAG evaluators and verify that the experiment contains results for:

```text
RAG_CORRECTNESS
RAG_GROUNDEDNESS
RAG_CITATION
RAG_HALLUCINATION
```

Also test a normal non-RAG dataset. RAG evaluators should be skipped when no retrieved context is provided.

This is important because a non-RAG application should not receive an artificial quality penalty simply because RAG evaluators are configured at the project level.

### 7. Test Dataset Versioning

To verify reproducibility:

```text
1. Create Dataset v1
2. Run Experiment A
3. Create Dataset v2
4. Change or add a test case
5. Run Experiment B
6. Open both experiment details
```

Experiment A should continue to reference v1, while Experiment B references v2.

### 8. Test Baseline Regression

Use the following process:

```text
1. Run a known-good experiment.
2. Mark it as the project baseline.
3. Run the same dataset again.
4. Confirm the regression check passes.
5. Intentionally make one evaluator stricter.
6. Run the evaluation again.
7. Confirm the quality delta exceeds the allowed threshold.
8. Confirm the regression result fails.
9. Restore the evaluator.
10. Run again and confirm the regression passes.
```

This tests both sides of the quality gate:

```text
Healthy change      → PASS
Quality regression  → FAIL
```

### 9. Test GitHub Actions CI

The most important end-to-end test is the pull-request workflow.

#### Passing CI test

Create a small branch with a harmless change:

```bash
git checkout -b test/ci-pass
```

Make the change, commit it, and push:

```bash
git add .
git commit -m "test: verify evalops ci pass"
git push -u origin test/ci-pass
```

Open a pull request into `main`.

GitHub Actions should:

```text
Start
  ↓
Create EvalOps experiment
  ↓
Wait for completion
  ↓
Evaluate regression
  ↓
Pass
```

Expected result:

```text
AI Regression Test ✅
```

#### Failing CI test

To verify that the quality gate really blocks regressions, deliberately introduce a known evaluator failure.

For example:

```json
{
  "mustContain": ["THIS_SHOULD_FAIL"]
}
```

Run the pull request workflow again.

Expected result:

```text
AI Regression Test ❌
```

The GitHub job should fail because EvalOps detected a regression.

Restore the evaluator configuration afterward and run a final clean CI test.

### 10. Test Caching

EvalOps uses Redis for response caching during normal evaluation runs.

A useful cache test is:

```text
First evaluation
      ↓
Cache MISS
      ↓
Qubrid API request
      ↓
Response stored in Redis

Second identical evaluation
      ↓
Cache HIT
      ↓
Reuse cached response
```

Verify the analytics/cache metrics for:

- cache hits
- cache misses
- cached responses
- estimated savings

For CI, verify that evaluations use fresh responses so cached data cannot mask changes in model behavior.

### 11. Test the Complete Production Flow

The final production smoke test is:

```text
GitHub PR
   ↓
GitHub Actions
   ↓
EvalOps API
   ↓
BullMQ / Redis
   ↓
Evaluation Worker
   ↓
Qubrid API
   ↓
Evaluators
   ↓
Baseline comparison
   ↓
GitHub PASS / FAIL
   ↓
Experiment visible in dashboard
```

A production test is considered successful when the experiment completes, the result is visible in the dashboard, the regression decision is correct, and the corresponding GitHub Actions check reflects that result.


## Evaluators

| Evaluator | Purpose |
|---|---|
| `RULE` | Deterministic output and policy checks |
| `LLM_JUDGE` | Semantic quality scoring using an LLM judge |
| `RAG_CORRECTNESS` | Checks whether the answer correctly answers the query using retrieved context |
| `RAG_GROUNDEDNESS` | Checks whether factual claims are supported by retrieved context |
| `RAG_CITATION` | Evaluates citation usage and support |
| `RAG_HALLUCINATION` | Detects unsupported or fabricated claims |

RAG evaluators automatically skip non-RAG test cases that do not provide retrieved-context metadata.

## Dataset Versioning

Datasets can be snapshotted into new versions so experiments can reference a specific dataset state.

This keeps evaluation runs reproducible even when the latest dataset changes.

## Analytics

EvalOps tracks:

- Quality trends
- Pass rates
- Latency
- Token usage
- Estimated cost
- Regression history
- Evaluator performance
- Model comparisons
- Cache hit/miss rates
- Estimated cache savings

## Tech Stack

**Frontend**
- Next.js
- React
- TypeScript

**Backend**
- Node.js
- Express.js
- Prisma
- Zod

**Data & Infrastructure**
- Microsoft SQL Server / Azure SQL
- Redis
- BullMQ

**AI**
- Qubrid API
- LLM-as-a-Judge
- RAG evaluation

**DevOps**
- GitHub Actions
- Vercel
- Render
- Azure

## Project Structure

```text
qubrid-evalops/
├── apps/
│   ├── api/                  # Express API + Prisma
│   └── web/                  # Next.js dashboard
├── packages/
│   ├── shared/               # Shared schemas and contracts
│   ├── qubrid-client/        # Qubrid API client
│   ├── llm-cache/            # Redis response cache
│   └── eval-engine/          # Evaluators and aggregation
├── workers/
│   └── evaluation-worker/    # BullMQ evaluation worker
├── github-action/             # Custom GitHub Action
├── docs/
├── docker-compose.yml
├── .env.example
└── package.json
```

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Start Redis

```bash
docker compose up -d redis
```

### 3. Configure environment

Copy `.env.example` to `.env` and configure the required values:

```text
DATABASE_URL
JWT_SECRET
QUBRID_API_KEY
REDIS_URL
```

Project pricing fields can be configured for meaningful cost estimates.

### 4. Start the application

```bash
npm run dev
```

## Production

The current deployment uses:

```text
Frontend  → Vercel
API       → Render
Worker    → Render
Redis     → Render
Database  → Azure SQL
CI        → GitHub Actions
```

## Example CI Result

A pull request can automatically produce a regression check such as:

```text
Baseline quality: 98.1%
Current quality:  96.9%
Allowed drop:      2.0 pp
Delta:            -1.2 pp

Result: PASS
```

A larger quality drop causes the GitHub Actions check to fail, preventing a regression from silently reaching production.

## Goal

Qubrid EvalOps applies software-testing principles to AI systems by making evaluation:

- Repeatable
- Versioned
- Observable
- Measurable
- CI/CD-ready

The result is an evaluation workflow that treats AI quality as a testable engineering signal rather than a manual review step.
