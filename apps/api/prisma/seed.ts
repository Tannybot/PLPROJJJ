import { languageProfiles } from "@plass/recommendation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const criteria = [
  ["security", "Security", "Resistance to vulnerability classes and safe defaults", 0.2],
  ["speed", "Performance", "Runtime throughput and latency profile", 0.18],
  ["scalability", "Scalability", "Ability to support growth and distributed workloads", 0.2],
  ["maintainability", "Maintainability", "Readability, tooling, and long-term code health", 0.17],
  ["community", "Community Support", "Libraries, talent pool, and ecosystem maturity", 0.13],
  ["learning", "Learning Difficulty", "Ease of onboarding and delivery speed", 0.12]
] as const;

async function main() {
  for (const [key, label, description, weight] of criteria) {
    await prisma.evaluationCriteria.upsert({
      where: { key },
      update: { label, description, weight },
      create: { key, label, description, weight }
    });
  }

  for (const profile of languageProfiles) {
    const language = await prisma.programmingLanguage.upsert({
      where: { slug: profile.slug },
      update: {
        name: profile.name,
        color: profile.color,
        strengths: profile.strengths,
        weaknesses: profile.weaknesses,
        idealUseCases: profile.idealUseCases
      },
      create: {
        name: profile.name,
        slug: profile.slug,
        color: profile.color,
        description: `${profile.name} profile for PLASS suitability simulation.`,
        overview: `${profile.name} is evaluated across technical, economic, and ecosystem criteria for software project fit.`,
        strengths: profile.strengths,
        weaknesses: profile.weaknesses,
        idealUseCases: profile.idealUseCases,
        industryUsage: ["Startups", "Enterprise", "Research", "Cloud teams"],
        frameworks: ["Framework data editable in admin"],
        trendData: [{ year: 2022, value: 72 }, { year: 2023, value: 76 }, { year: 2024, value: 81 }, { year: 2025, value: 84 }]
      }
    });

    for (const [key, value] of Object.entries(profile.scores)) {
      const criterion = await prisma.evaluationCriteria.findUniqueOrThrow({ where: { key } });
      await prisma.score.upsert({
        where: { languageId_criteriaId: { languageId: language.id, criteriaId: criterion.id } },
        update: { value },
        create: { languageId: language.id, criteriaId: criterion.id, value, source: "PLASS baseline scoring engine" }
      });
    }
  }
}

main().finally(async () => prisma.$disconnect());
