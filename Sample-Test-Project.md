# Second Qubrid EvalOps Test Project

This is a complete second project designed to exercise the main EvalOps workflow without spending as much Qubrid credit as the existing `openai/gpt-oss-120b` project.

## 1. Create the Project

### Form values

**Name**
```text
TechStore Support Bot
```

**Description**
```text
A customer-support AI application for a fictional electronics store. It answers questions about returns, warranty, shipping, and order policies. This project is designed to test deterministic rules, LLM judging, RAG evaluation, dataset versioning, baselines, analytics, and GitHub Actions regression testing.
```

**Qubrid model**
```text
meta-llama/Llama-3.3-70B-Instruct
```

**System prompt**
```text
You are a helpful TechStore customer support assistant.

Use only the policies provided below. Answer customers clearly and concisely.

Policies:
- Customers can return eligible products within 30 days of purchase.
- An original receipt or valid proof of purchase is required for a standard return.
- Defective electronics are covered by a limited 1-year warranty from the date of purchase.
- Standard shipping normally takes 3–5 business days.
- Orders over $50 qualify for free standard shipping.
- Orders of $50 or less do not qualify for free standard shipping.
- Never invent policies that are not provided.

When answering policy questions, mention the relevant policy clearly.
```

Qubrid's current serverless documentation lists `meta-llama/Llama-3.3-70B-Instruct` at $0.096 per 1M input tokens and $0.304 per 1M output tokens, compared with `openai/gpt-oss-120b` at $0.12 input and $0.48 output per 1M tokens. Prices can change, so verify the current Qubrid catalog before a large run.

## 2. Dataset

Create:

```text
Name: TechStore Regression
Version: 1
```

Use **6 test cases**. Keep three cases as normal customer-support tests and three as RAG tests.

---

### Test Case 1 — Return within 30 days

**Input**
```text
I bought a laptop 10 days ago. Can I return it?
```

**Expected output**
```text
Yes. Eligible products can be returned within 30 days of purchase, and an original receipt or valid proof of purchase is required.
```

**Metadata**
```json
{}
```

---

### Test Case 2 — Return after 30 days

**Input**
```text
I bought a laptop 45 days ago. Can I still return it?
```

**Expected output**
```text
The standard return period is 30 days from purchase, so a return after 45 days is outside the standard return window.
```

**Metadata**
```json
{}
```

---

### Test Case 3 — Missing proof of purchase

**Input**
```text
I bought the product 10 days ago but I do not have my receipt. Can I return it?
```

**Expected output**
```text
A standard return requires an original receipt or valid proof of purchase.
```

**Metadata**
```json
{}
```

---

### Test Case 4 — Free shipping

**Input**
```text
My order total is $80. Do I get free standard shipping?
```

**Expected output**
```text
Yes. Orders over $50 qualify for free standard shipping.
```

**Metadata**
```json
{}
```

---

### Test Case 5 — Warranty RAG case

**Input**
```text
My headphones stopped working 8 months after I bought them. Are they covered?
```

**Expected output**
```text
If the headphones are covered by the limited warranty, they are within the 1-year warranty period from the date of purchase.
```

**Metadata**
```json
{
  "context": [
    "Defective electronics are covered by a limited 1-year warranty from the date of purchase.",
    "Warranty coverage applies to defective electronics."
  ],
  "citations": [
    "techstore-warranty-policy.pdf"
  ]
}
```

---

### Test Case 6 — Shipping RAG case

**Input**
```text
My order is $120. How long should standard shipping take, and is it free?
```

**Expected output**
```text
Standard shipping normally takes 3–5 business days, and orders over $50 qualify for free standard shipping.
```

**Metadata**
```json
{
  "context": [
    "Standard shipping normally takes 3–5 business days.",
    "Orders over $50 qualify for free standard shipping."
  ],
  "citations": [
    "techstore-shipping-policy.pdf"
  ]
}
```

---

## 3. Evaluators

Create these five evaluators for the project:

```text
1. TechStore Policy Rules
2. Response Quality Judge
3. RAG Correctness
4. RAG Groundedness
5. RAG Citation
6. RAG Hallucination
```

The four RAG evaluators should be configured exactly as the RAG evaluator types already supported by EvalOps:

```text
RAG_CORRECTNESS
RAG_GROUNDEDNESS
RAG_CITATION
RAG_HALLUCINATION
```

The EvalOps implementation supports an optional `judgeModel`, `threshold`, and `systemPrompt` configuration for RAG evaluators.

---

## 4. RULE Evaluator

### Name
```text
TechStore Policy Rules
```

### Type
```text
RULE
```

### Config
```json
{
  "cases": [
    {
      "inputContains": ["10 days"],
      "mustContain": ["30 days"],
      "regex": ["receipt|proof of purchase"]
    },
    {
      "inputContains": ["45 days"],
      "mustContain": ["30 days"]
    },
    {
      "inputContains": ["10 days", "do not have my receipt"],
      "mustContain": ["receipt"]
    },
    {
      "inputContains": ["$80"],
      "mustContain": ["free standard shipping"],
      "regex": ["\$?50"]
    }
  ]
}
```

The first matching rule case is applied by the existing RULE evaluator, so keep the `inputContains` phrases specific enough that the intended case is selected.

---

## 5. LLM Judge Evaluator

### Name
```text
Response Quality Judge
```

### Type
```text
LLM_JUDGE
```

### Config
```json
{
  "judgeModel": "meta-llama/Llama-3.3-70B-Instruct",
  "threshold": 0.7,
  "criteria": [
    {
      "name": "correctness",
      "description": "Is the answer factually correct and consistent with the expected answer?"
    },
    {
      "name": "relevance",
      "description": "Does the answer directly address the user's question without unnecessary information?"
    },
    {
      "name": "helpfulness",
      "description": "Does the answer provide a useful and appropriate response to the user?"
    }
  ]
}
```

Use the cheaper Llama model as the judge too. This avoids using the more expensive 120B model for both generation and judging.

---

## 6. RAG Correctness Evaluator

### Name
```text
RAG Correctness
```

### Type
```text
RAG_CORRECTNESS
```

### Config
```json
{
  "judgeModel": "meta-llama/Llama-3.3-70B-Instruct",
  "threshold": 0.7,
  "systemPrompt": "Evaluate whether the answer correctly addresses the user's question using the retrieved context. Penalize answers that contradict the context or miss the main answer."
}
```

---

## 7. RAG Groundedness Evaluator

### Name
```text
RAG Groundedness
```

### Type
```text
RAG_GROUNDEDNESS
```

### Config
```json
{
  "judgeModel": "meta-llama/Llama-3.3-70B-Instruct",
  "threshold": 0.7,
  "systemPrompt": "Evaluate whether the factual claims in the answer are supported by the retrieved context. Penalize unsupported claims, invented policies, and facts that are not present in the context."
}
```

---

## 8. RAG Citation Evaluator

### Name
```text
RAG Citation
```

### Type
```text
RAG_CITATION
```

### Config
```json
{
  "judgeModel": "meta-llama/Llama-3.3-70B-Instruct",
  "threshold": 0.7,
  "systemPrompt": "Evaluate whether the answer appropriately uses and supports the citations available for the retrieved context. Penalize missing, irrelevant, or unsupported citation usage."
}
```

---

## 9. RAG Hallucination Evaluator

### Name
```text
RAG Hallucination
```

### Type
```text
RAG_HALLUCINATION
```

### Config
```json
{
  "judgeModel": "meta-llama/Llama-3.3-70B-Instruct",
  "threshold": 0.7,
  "systemPrompt": "Identify factual claims in the answer that are unsupported by the retrieved context. A response should not invent policies, dates, prices, coverage, or other facts that are absent from the context."
}
```

---

## 10. Why This Dataset Tests the Whole System

### Cases 1–4 test

```text
Qubrid model response
        ↓
RULE evaluator
        ↓
LLM Judge
        ↓
quality aggregation
        ↓
experiment metrics
```

### Cases 5–6 test

```text
Input
 ↓
Model response
 ↓
Retrieved context metadata
 ↓
RAG Correctness
RAG Groundedness
RAG Citation
RAG Hallucination
```

### Cases 1–4 also test non-RAG skipping

Because these cases have no retrieved context, the RAG evaluators should be marked non-applicable and skipped instead of lowering the overall score.

---

## 11. First Full Test

Run the dataset once after configuring all evaluators.

Expected lifecycle:

```text
QUEUED
  ↓
RUNNING
  ↓
COMPLETED
```

Open the experiment and verify:

```text
Model:
meta-llama/Llama-3.3-70B-Instruct

Dataset:
TechStore Regression · v1

Evaluators:
RULE
LLM_JUDGE
RAG_CORRECTNESS
RAG_GROUNDEDNESS
RAG_CITATION
RAG_HALLUCINATION
```

Do not expect every evaluator to apply to every test case. The RAG evaluators should skip the four non-RAG cases.

---

## 12. Baseline Test

After the first run looks correct:

```text
Experiment v1
    ↓
Set as Baseline
```

Then run the exact same dataset again.

Expected:

```text
Baseline quality ≈ Current quality
Regression = PASS
```

Small differences are normal because the LLM judge is probabilistic.

---

## 13. Dataset Versioning Test

Create:

```text
TechStore Regression · v2
```

Change only Test Case 4.

### v2 Test Case 4 input

```text
My order total is $40. Do I get free standard shipping?
```

### v2 expected output

```text
No. Orders of $50 or less do not qualify for free standard shipping.
```

Keep the other cases unchanged.

Run v2 and verify:

```text
Experiment A → TechStore Regression v1
Experiment B → TechStore Regression v2
```

This proves that experiments retain the dataset version they were created from.

---

## 14. Intentional Regression Test

Use v2 or temporarily change the RULE evaluator to require something the model should not produce.

Example:

```json
{
  "inputContains": ["$40"],
  "mustContain": ["THIS_SHOULD_FAIL"]
}
```

Run a new experiment.

Expected:

```text
RULE evaluator → FAIL
Overall quality → decreases
Regression comparison → FAIL
```

Restore the correct RULE configuration afterward.

---

## 15. RAG Failure Test

Modify a RAG test case so the expected context contradicts the answer.

Example context:

```json
{
  "context": [
    "Standard shipping normally takes 3–5 business days."
  ],
  "citations": [
    "techstore-shipping-policy.pdf"
  ]
}
```

Input:

```text
Can standard shipping arrive tomorrow?
```

The model should not claim guaranteed next-day delivery.

This test checks whether the RAG evaluators can detect unsupported claims.

---

## 16. GitHub Actions Test

Use the same CI workflow already configured in the repository, but point the workflow at the new dataset ID.

### Passing test

Create:

```bash
git checkout -b test/techstore-ci-pass
```

Make a harmless repository change:

```bash
git add .
git commit -m "test: verify techstore evalops ci"
git push -u origin test/techstore-ci-pass
```

Open a pull request into `main`.

Expected:

```text
AI Regression Test ✅
```

### Failing test

Create a deliberately bad evaluator configuration or another known quality regression.

Open another PR.

Expected:

```text
AI Regression Test ❌
```

The failure should come from the EvalOps regression decision, not from GitHub configuration.

---

## 17. Final Clean Run

After the intentional failure test:

```text
1. Restore evaluator configuration.
2. Run a clean experiment.
3. Confirm experiment COMPLETED.
4. Confirm regression PASS.
5. Run a clean GitHub PR.
6. Confirm AI Regression Test ✅.
7. Close the temporary test PR without merging if it was only for verification.
```

Keep the test branches if you want them as evidence of the CI pass/fail testing process.

---

## 18. Recommended Test Order

Run the project in this exact order:

```text
1. Create project
2. Create TechStore Regression v1
3. Add all 6 test cases
4. Add RULE evaluator
5. Add LLM_JUDGE evaluator
6. Add 4 RAG evaluators
7. Run v1
8. Inspect experiment details
9. Confirm RAG skipping on cases 1–4
10. Set the good run as baseline
11. Run v1 again
12. Confirm regression PASS
13. Create v2
14. Change Test Case 4
15. Run v2
16. Confirm dataset version tracking
17. Intentionally break one evaluator
18. Confirm regression FAIL
19. Restore evaluator
20. Run clean experiment
21. Point GitHub Actions to the new dataset
22. Test CI PASS
23. Test CI FAIL
24. Restore everything
25. Run final clean CI PASS
```

This single project will demonstrate the complete EvalOps story: dataset management, model inference, deterministic rules, LLM judging, RAG evaluation, evaluator applicability, experiment tracking, dataset versioning, baselines, regression detection, analytics, and CI/CD quality gates.
