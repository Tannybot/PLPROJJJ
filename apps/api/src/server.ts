import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { adminRouter } from "./routes/admin.js";
import { analyticsRouter } from "./routes/analytics.js";
import { languageRouter } from "./routes/languages.js";
import { reportRouter } from "./routes/reports.js";
import { simulationRouter } from "./routes/simulations.js";

const app = express();
const port = Number(process.env.API_PORT ?? 4000);

app.use(helmet());
app.use(cors({ origin: process.env.NEXTAUTH_URL ?? "http://localhost:3000", credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => res.json({ ok: true, service: "PLASS API" }));
app.use("/api/languages", languageRouter);
app.use("/api/simulations", simulationRouter);
app.use("/api/reports", reportRouter);
app.use("/api/admin", adminRouter);
app.use("/api/analytics", analyticsRouter);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Unexpected server error", detail: err.message });
});

app.listen(port, () => {
  console.log(`PLASS API listening on http://localhost:${port}`);
});
