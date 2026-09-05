import { z } from "zod";

export const evaluatorTypeSchema = z.enum([
  "RULE",
  "SEMANTIC",
  "LLM_JUDGE",
  "JSON_SCHEMA",
  "RAG_CORRECTNESS",
  "RAG_GROUNDEDNESS",
  "RAG_CITATION",
  "RAG_HALLUCINATION"
]);
export type EvaluatorType = z.infer<typeof evaluatorTypeSchema>;

export const chatMessageSchema = z.object({
  role: z.enum(["system", "user", "assistant"]),
  content: z.string()
});
export type ChatMessage = z.infer<typeof chatMessageSchema>;

export const generationConfigSchema = z.object({
  temperature: z.number().min(0).max(2).optional(),
  topP: z.number().min(0).max(1).optional(),
  maxTokens: z.number().int().positive().optional()
}).default({});

export const createProjectSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  model: z.string().min(1),
  systemPrompt: z.string().max(10000).optional(),
  temperature: z.number().min(0).max(2).optional(),
  topP: z.number().min(0).max(1).optional(),
  maxTokens: z.number().int().positive().optional(),
  inputCostPerMillion: z.number().min(0).default(0),
  outputCostPerMillion: z.number().min(0).default(0)
});

export const createDatasetSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional()
});

export const createTestCaseSchema = z.object({
  input: z.string().min(1),
  expectedOutput: z.string().optional(),
  metadata: z.record(z.unknown()).optional()
});

export const createEvaluatorSchema = z.object({
  name: z.string().min(1),
  type: evaluatorTypeSchema,
  config: z.record(z.unknown()).default({})
});

export const runEvaluationSchema = z.object({
  datasetId: z.string().min(1),
  name: z.string().min(1).max(150).optional(),
  useCache: z.boolean().default(true),
  failOnRegression: z.boolean().default(true),
  allowedQualityDrop: z.number().min(0).max(100).default(2)
});

export interface QubridUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  cachedInputTokens?: number;
}

export interface QubridCompletionResult {
  text: string;
  usage: QubridUsage;
  latencyMs: number;
  ttftMs?: number;
  model: string;
  requestId?: string;
  fromCache: boolean;
  estimatedCostUsd: number;
}

export interface EvaluationCaseResult {
  testCaseId: string;
  actualOutput: string;
  score: number;
  passed: boolean;
  reason: string;
  latencyMs: number;
  ttftMs?: number;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  estimatedCostUsd: number;
  uncachedEstimatedCostUsd: number;
  cacheHit: boolean;
  cachedInputTokens: number;
}
