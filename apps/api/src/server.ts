import express from "express";
import cors from "cors";
import { config } from "./lib/config";
import authRoutes from "./routes/auth";
import projectRoutes from "./routes/projects";
import ciRoutes from "./routes/ci";

const app = express();
app.use(cors({ origin: config.clientUrl, credentials: true }));
app.use(express.json({ limit: "2mb" }));

app.get("/api/v1/health", (_req, res) => res.json({ success: true, service: "qubrid-evalops-api", time: new Date().toISOString() }));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/ci", ciRoutes);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

const port = process.env.PORT
  ? Number(process.env.PORT)
  : config.port;

app.listen(port, "0.0.0.0", () =>
  console.log(`EvalOps API running on port ${port}`)
);
