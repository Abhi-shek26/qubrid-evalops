import dotenv from "dotenv";
dotenv.config();

function required(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export const config = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 5000),
  clientUrl: process.env.CLIENT_URL ?? "http://localhost:3000",
  apiUrl: process.env.API_URL ?? "http://localhost:5000",
  jwtSecret: required("JWT_SECRET"),
  jwtExpiresInSeconds: Number(process.env.JWT_EXPIRES_IN_SECONDS ?? 604800),
  redisUrl: process.env.REDIS_URL ?? "redis://localhost:6379",
  qubridApiKey: required("QUBRID_API_KEY"),
  qubridBaseUrl: process.env.QUBRID_BASE_URL ?? "https://platform.qubrid.com/v1",
  defaultModel: process.env.QUBRID_DEFAULT_MODEL ?? "openai/gpt-oss-120b",
  cacheEnabled: process.env.CACHE_ENABLED !== "false",
  cacheTtlSeconds: Number(process.env.CACHE_TTL_SECONDS ?? 3600),
  judgeModel: process.env.EVAL_JUDGE_MODEL ?? process.env.QUBRID_DEFAULT_MODEL ?? "openai/gpt-oss-120b"
};
