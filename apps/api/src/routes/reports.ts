import { Prisma } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";
import { prisma } from "../services/prisma.js";

export const reportRouter = Router();

const reportSchema = z.object({
  userId: z.string().optional(),
  simulationId: z.string(),
  title: z.string().min(2),
  summary: z.string(),
  exportData: z.unknown()
});

reportRouter.post("/", async (req, res, next) => {
  try {
    const input = reportSchema.parse(req.body);
    const report = await prisma.report.create({ data: { ...input, exportData: input.exportData as Prisma.InputJsonValue } });
    res.status(201).json(report);
  } catch (error) {
    next(error);
  }
});

reportRouter.get("/", async (_req, res) => {
  try {
    res.json(await prisma.report.findMany({ orderBy: { createdAt: "desc" }, take: 25 }));
  } catch {
    res.json([]);
  }
});
