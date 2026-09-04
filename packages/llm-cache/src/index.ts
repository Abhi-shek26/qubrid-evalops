import crypto from "node:crypto";
import Redis from "ioredis";

export interface CacheKeyInput {
  projectId: string;
  namespace?: string;
  model: string;
  messages: unknown;
  temperature?: number;
  topP?: number;
  maxTokens?: number;
}

export interface CachedCompletion {
  text: string;
  model: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  cachedInputTokens?: number;
  originalLatencyMs: number;
  estimatedCostUsd: number;
  createdAt: string;
}

export class LLMCache {
  constructor(private readonly redis: Redis, private readonly defaultTtlSeconds = 3600) {}

  buildKey(input: CacheKeyInput) {
    const canonical = JSON.stringify({
      projectId: input.projectId,
      namespace: input.namespace ?? "default",
      model: input.model,
      messages: input.messages,
      temperature: input.temperature ?? null,
      topP: input.topP ?? null,
      maxTokens: input.maxTokens ?? null
    });
    return `evalops:llmcache:${crypto.createHash("sha256").update(canonical).digest("hex")}`;
  }

  async get(input: CacheKeyInput): Promise<CachedCompletion | null> {
    const raw = await this.redis.get(this.buildKey(input));
    return raw ? JSON.parse(raw) as CachedCompletion : null;
  }

  async set(input: CacheKeyInput, value: CachedCompletion, ttlSeconds = this.defaultTtlSeconds) {
    await this.redis.set(this.buildKey(input), JSON.stringify(value), "EX", ttlSeconds);
  }

  async clear(input: CacheKeyInput) {
    await this.redis.del(this.buildKey(input));
  }
}
