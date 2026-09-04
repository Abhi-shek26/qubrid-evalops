import OpenAI from "openai";
import type { ChatMessage, QubridCompletionResult, QubridUsage } from "@qubrid-evalops/shared";

export interface QubridRequest {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  topP?: number;
  maxTokens?: number;
}

export class QubridClient {
  private readonly client: OpenAI;
  constructor(options: { apiKey: string; baseURL?: string }) {
    this.client = new OpenAI({ apiKey: options.apiKey, baseURL: options.baseURL ?? "https://platform.qubrid.com/v1" });
  }

  async chat(request: QubridRequest): Promise<QubridCompletionResult> {
    const started = Date.now();
    const response = await this.client.chat.completions.create({
      model: request.model,
      messages: request.messages,
      temperature: request.temperature,
      top_p: request.topP,
      max_tokens: request.maxTokens,
      stream: false
    });
    const usage = response.usage;
    const details = usage as ({ prompt_tokens_details?: { cached_tokens?: number } } | undefined);
    const normalized: QubridUsage = {
      promptTokens: usage?.prompt_tokens ?? 0,
      completionTokens: usage?.completion_tokens ?? 0,
      totalTokens: usage?.total_tokens ?? 0,
      cachedInputTokens: details?.prompt_tokens_details?.cached_tokens
    };
    return {
      text: response.choices[0]?.message?.content ?? "",
      usage: normalized,
      latencyMs: Date.now() - started,
      model: response.model ?? request.model,
      requestId: response.id,
      fromCache: false,
      estimatedCostUsd: 0
    };
  }
}
