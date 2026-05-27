import { scoreLanguages } from "@plass/recommendation";
import { Router } from "express";
import { z } from "zod";
import { prisma } from "../services/prisma.js";

export const simulationRouter = Router();

const simulationSchema = z.object({
  userId: z.string().optional(),
  projectType: z.string().min(2),
  targetUsers: z.coerce.number().int().min(1),
  scalability: z.coerce.number().min(1).max(10),
  security: z.coerce.number().min(1).max(10),
  performance: z.coerce.number().min(1).max(10),
  budget: z.enum(["low", "medium", "high"]),
  developmentSpeed: z.coerce.number().min(1).max(10),
  deploymentPlatform: z.string().min(2)
});

simulationRouter.post("/", async (req, res, next) => {
  try {
    const input = simulationSchema.parse(req.body);
    const results = scoreLanguages(input);
    const top = results[0];

    try {
      const saved = await prisma.simulation.create({
        data: {
          userId: input.userId,
          projectType: input.projectType,
          targetUsers: input.targetUsers,
          scalabilityRequirement: input.scalability,
          securityLevel: input.security,
          performanceRequirement: input.performance,
          budgetLevel: input.budget.toUpperCase() as "LOW" | "MEDIUM" | "HIGH",
          developmentSpeedPriority: input.developmentSpeed,
          deploymentPlatform: input.deploymentPlatform,
          results,
          topLanguage: top.name,
          topScore: top.suitabilityScore
        }
      });
      res.status(201).json({ simulationId: saved.id, results });
    } catch {
      res.status(201).json({ simulationId: "local-preview", results });
    }
  } catch (error) {
    next(error);
  }
});

simulationRouter.get("/recent", async (_req, res) => {
  try {
    const simulations = await prisma.simulation.findMany({ orderBy: { createdAt: "desc" }, take: 10 });
    res.json(simulations);
  } catch {
    res.json([]);
  }
});
