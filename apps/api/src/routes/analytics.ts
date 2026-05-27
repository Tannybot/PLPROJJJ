import { languageProfiles } from "@plass/recommendation";
import { Router } from "express";
import { prisma } from "../services/prisma.js";

export const analyticsRouter = Router();

analyticsRouter.get("/", async (_req, res) => {
  try {
    const [simulationCount, reportCount, users] = await Promise.all([
      prisma.simulation.count(),
      prisma.report.count(),
      prisma.user.count()
    ]);
    res.json({
      simulationCount,
      reportCount,
      users,
      languageCount: languageProfiles.length,
      topCategories: ["Web SaaS", "AI/ML", "Enterprise", "Cloud Infrastructure"]
    });
  } catch {
    res.json({ simulationCount: 0, reportCount: 0, users: 0, languageCount: languageProfiles.length, topCategories: [] });
  }
});
