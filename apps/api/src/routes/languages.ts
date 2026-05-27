import { languageProfiles } from "@plass/recommendation";
import { Router } from "express";
import { prisma } from "../services/prisma.js";

export const languageRouter = Router();

languageRouter.get("/", async (_req, res) => {
  try {
    const languages = await prisma.programmingLanguage.findMany({ include: { scores: { include: { criteria: true } } } });
    res.json(languages.length ? languages : languageProfiles);
  } catch {
    res.json(languageProfiles);
  }
});

languageRouter.get("/:slug", async (req, res) => {
  const fallback = languageProfiles.find((language) => language.slug === req.params.slug);
  try {
    const language = await prisma.programmingLanguage.findUnique({
      where: { slug: req.params.slug },
      include: { scores: { include: { criteria: true } } }
    });
    if (!language && !fallback) return res.status(404).json({ message: "Language not found" });
    res.json(language ?? fallback);
  } catch {
    if (!fallback) return res.status(404).json({ message: "Language not found" });
    res.json(fallback);
  }
});
