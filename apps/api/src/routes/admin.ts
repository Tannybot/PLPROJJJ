import { Router } from "express";
import { prisma } from "../services/prisma.js";

export const adminRouter = Router();

adminRouter.get("/overview", async (_req, res) => {
  try {
    const [users, languages, simulations, criteria] = await Promise.all([
      prisma.user.count(),
      prisma.programmingLanguage.count(),
      prisma.simulation.count(),
      prisma.evaluationCriteria.findMany()
    ]);
    res.json({ users, languages, simulations, criteria });
  } catch {
    res.json({ users: 0, languages: 8, simulations: 0, criteria: [] });
  }
});
