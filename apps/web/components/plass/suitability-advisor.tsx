"use client";

import { Criterion, languageProfiles, LanguageProfile } from "@plass/recommendation";
import { AlertTriangle, BriefcaseBusiness, CheckCircle2, Cpu, Gauge, GraduationCap, HelpCircle, Network, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";

type ApplicationProfile = {
  id: string;
  label: string;
  description: string;
  keywords: string[];
  weights: Record<Criterion, number>;
  riskFocus: Criterion[];
};

type RankedLanguage = LanguageProfile & {
  fitScore: number;
  affinity: number;
  parallelismScore: number;
  runtimeEfficiencyScore: number;
  executionScore: number;
  notes: string[];
  whyNot: string;
};

const criteria: Criterion[] = ["security", "speed", "scalability", "maintainability", "community", "learning"];

const labels: Record<Criterion, string> = {
  security: "Security",
  speed: "Performance",
  scalability: "Scalability",
  maintainability: "Maintainability",
  community: "Ecosystem",
  learning: "Learning speed"
};

const applicationProfiles: ApplicationProfile[] = [
  {
    id: "web-saas",
    label: "Web SaaS / Dashboard",
    description: "Best for products that need fast delivery, maintainable interfaces, cloud deployment, and a strong hiring pool.",
    keywords: ["web", "saas", "dashboard", "backend", "serverless", "cloud"],
    weights: { security: 16, speed: 13, scalability: 20, maintainability: 20, community: 18, learning: 13 },
    riskFocus: ["maintainability", "scalability", "security"]
  },
  {
    id: "ai-data",
    label: "AI / Data Analytics",
    description: "Best for experimentation, modeling, automation, statistics, notebooks, and research-heavy workflows.",
    keywords: ["ai", "ml", "data", "analytics", "research", "automation"],
    weights: { security: 10, speed: 12, scalability: 14, maintainability: 18, community: 28, learning: 18 },
    riskFocus: ["community", "maintainability", "speed"]
  },
  {
    id: "enterprise",
    label: "Enterprise System",
    description: "Best for long-lived business systems where reliability, structure, tooling, and team governance matter.",
    keywords: ["enterprise", "financial", "banking", "backend", "large", "cloud"],
    weights: { security: 22, speed: 14, scalability: 22, maintainability: 24, community: 12, learning: 6 },
    riskFocus: ["security", "maintainability", "scalability"]
  },
  {
    id: "systems",
    label: "Systems / Embedded",
    description: "Best for low-level software where memory control, runtime performance, and hardware access are central.",
    keywords: ["systems", "embedded", "native", "infrastructure", "performance", "secure"],
    weights: { security: 22, speed: 28, scalability: 12, maintainability: 14, community: 8, learning: 16 },
    riskFocus: ["security", "speed", "learning"]
  },
  {
    id: "game",
    label: "Game / Interactive App",
    description: "Best for real-time graphics, engine support, platform tooling, and fast interactive feedback.",
    keywords: ["game", "interactive", "engine", "desktop", "native"],
    weights: { security: 8, speed: 26, scalability: 10, maintainability: 18, community: 22, learning: 16 },
    riskFocus: ["speed", "community", "maintainability"]
  }
];

const parallelismScores: Record<string, number> = {
  python: 62,
  java: 88,
  javascript: 76,
  php: 64,
  csharp: 87,
  cpp: 94,
  go: 96,
  rust: 92
};

const parallelismNotes: Record<string, string> = {
  python: "Useful for async tasks and data workloads, but CPU-bound parallelism often needs multiprocessing or native libraries.",
  java: "Strong thread, concurrency, and virtual-machine tooling support for enterprise-scale parallel workloads.",
  javascript: "Excellent event-driven concurrency for web and I/O workloads, with workers available for heavier tasks.",
  php: "Best for request-based web concurrency; less ideal for complex parallel computing workloads.",
  csharp: "Strong async, threading, task, and .NET runtime support for scalable parallel applications.",
  cpp: "Excellent low-level control for high-performance parallel systems, but requires careful memory and thread management.",
  go: "Excellent lightweight concurrency through goroutines and channels, especially for networked systems.",
  rust: "Strong memory-safe concurrency for performance-critical systems with compile-time safety guarantees."
};

function clamp(value: number) {
  return Math.max(0, Math.min(100, value));
}

function getAffinity(language: LanguageProfile, profile: ApplicationProfile) {
  const source = [...language.idealUseCases, ...language.industryUsage, ...language.frameworks].join(" ").toLowerCase();
  return profile.keywords.reduce((score, keyword) => score + (source.includes(keyword) ? 1 : 0), 0);
}

function getNotes(language: LanguageProfile, profile: ApplicationProfile) {
  const weakRisks = profile.riskFocus
    .filter((criterion) => language.scores[criterion] < 76)
    .map((criterion) => `${labels[criterion]} needs mitigation`);

  if (weakRisks.length > 0) return weakRisks.slice(0, 2);
  return [`Strong ${labels[profile.riskFocus[0]].toLowerCase()} fit`, `Useful ${language.frameworks[0]} ecosystem`];
}

function getWhyNot(language: RankedLanguage, profile: ApplicationProfile, topScore: number) {
  const criticalWeakness = profile.riskFocus
    .map((criterion) => ({ criterion, score: language.scores[criterion] }))
    .sort((a, b) => a.score - b.score)[0];
  const scoreGap = Math.max(0, topScore - language.fitScore);
  const weakness = language.weaknesses[0]?.toLowerCase() ?? "its trade-offs require extra planning";

  if (scoreGap <= 3 && criticalWeakness.score >= 76) {
    return `${language.name} is still a strong option, but it ranks slightly lower because the top language has better direct use-case alignment for ${profile.label.toLowerCase()}.`;
  }

  return `${language.name} ranks ${scoreGap} points lower mainly because ${labels[criticalWeakness.criterion].toLowerCase()} is less aligned with this scenario. Consider it if your team can manage ${weakness}.`;
}

export function SuitabilityAdvisor() {
  const [profileId, setProfileId] = useState(applicationProfiles[0].id);
  const [weights, setWeights] = useState<Record<Criterion, number>>(applicationProfiles[0].weights);

  const selectedProfile = applicationProfiles.find((profile) => profile.id === profileId) ?? applicationProfiles[0];
  const totalWeight = Object.values(weights).reduce((sum, value) => sum + value, 0);

  const ranked = useMemo<RankedLanguage[]>(() => {
    const baseRanking = languageProfiles
      .map((language) => {
        const weightedScore = criteria.reduce((sum, criterion) => sum + language.scores[criterion] * weights[criterion], 0) / totalWeight;
        const affinity = getAffinity(language, selectedProfile);
        const parallelismScore = parallelismScores[language.slug] ?? Math.round((language.scores.speed + language.scores.scalability) / 2);
        const runtimeEfficiencyScore = Math.round((language.scores.speed * 0.7) + (language.scores.scalability * 0.3));
        const executionScore = Math.round((runtimeEfficiencyScore * 0.58) + (parallelismScore * 0.42));
        const fitScore = clamp(Math.round(weightedScore + Math.min(affinity * 3, 12)));

        return {
          ...language,
          affinity,
          parallelismScore,
          runtimeEfficiencyScore,
          executionScore,
          fitScore,
          notes: getNotes(language, selectedProfile),
          whyNot: ""
        };
      })
      .sort((a, b) => b.fitScore - a.fitScore);

    const topScore = baseRanking[0]?.fitScore ?? 0;
    return baseRanking.map((language, index) => ({
      ...language,
      whyNot: index === 0
        ? `${language.name} is the current best match because its strongest evaluation scores and use-case signals fit ${selectedProfile.label.toLowerCase()}.`
        : getWhyNot(language, selectedProfile, topScore)
    }));
  }, [selectedProfile, totalWeight, weights]);

  function chooseProfile(nextId: string) {
    const nextProfile = applicationProfiles.find((profile) => profile.id === nextId) ?? applicationProfiles[0];
    setProfileId(nextProfile.id);
    setWeights(nextProfile.weights);
  }

  function updateWeight(criterion: Criterion, value: number) {
    setWeights((current) => ({ ...current, [criterion]: value }));
  }

  const top = ranked[0];
  const executionLeader = [...ranked].sort((a, b) => b.executionScore - a.executionScore)[0];

  return (
    <Card id="advisor" className="border-mint/30">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm text-mint">New Feature</p>
          <CardTitle className="mt-1 text-2xl">Application Suitability Advisor</CardTitle>
          <CardDescription>
            The system now explains language fit through application context, weighted evaluation criteria, and practical risk signals.
          </CardDescription>
        </div>
        <div className="rounded-md border border-border bg-white/5 px-3 py-2 text-sm text-muted">
          Current gap addressed: decision rationale
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[340px_1fr]">
        <div className="space-y-5">
          <label className="block text-sm text-muted">
            Application category
            <Select value={profileId} onChange={(event) => chooseProfile(event.target.value)} className="mt-2">
              {applicationProfiles.map((profile) => <option key={profile.id} value={profile.id}>{profile.label}</option>)}
            </Select>
          </label>

          <div className="rounded-lg border border-border bg-white/5 p-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <BriefcaseBusiness className="h-4 w-4 text-cyan" />
              Suitability Lens
            </div>
            <p className="mt-2 text-sm leading-6 text-muted">{selectedProfile.description}</p>
          </div>

          <div className="rounded-lg border border-border bg-white/5 p-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <SlidersHorizontal className="h-4 w-4 text-amber" />
              Evaluation Weights
            </div>
            <div className="mt-4 space-y-4">
              {criteria.map((criterion) => (
                <label key={criterion} className="block text-sm text-muted">
                  <span className="flex justify-between gap-3">
                    <span>{labels[criterion]}</span>
                    <span className="text-foreground">{weights[criterion]}</span>
                  </span>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={weights[criterion]}
                    onChange={(event) => updateWeight(criterion, Number(event.target.value))}
                    className="mt-2 w-full accent-cyan"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-[1fr_220px]">
            <div className="rounded-lg border border-cyan/30 bg-cyan/10 p-5">
              <div className="flex items-center gap-2 text-sm text-cyan">
                <CheckCircle2 className="h-4 w-4" />
                Best Match
              </div>
              <h3 className="mt-2 text-4xl font-semibold">{top.name}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {top.name} ranks highest for {selectedProfile.label.toLowerCase()} because its strongest criteria align with the selected application needs.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-white/5 p-5">
              <div className="flex items-center gap-2 text-sm text-muted">
                <Gauge className="h-4 w-4 text-mint" />
                Fit Score
              </div>
              <p className="mt-3 text-6xl font-semibold text-mint">{top.fitScore}%</p>
              <p className="mt-2 text-sm text-muted">{top.affinity} direct use-case signals found</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-white/5 p-5">
              <div className="flex items-center gap-2 text-sm text-muted">
                <Cpu className="h-4 w-4 text-amber" />
                Best Runtime Efficiency
              </div>
              <div className="mt-3 flex items-end justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold">{executionLeader.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Runtime efficiency estimates raw execution speed, scalability pressure, and how well the language fits performance-sensitive systems.
                  </p>
                </div>
                <span className="text-4xl font-semibold text-amber">{executionLeader.runtimeEfficiencyScore}%</span>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-white/5 p-5">
              <div className="flex items-center gap-2 text-sm text-muted">
                <Network className="h-4 w-4 text-cyan" />
                Best Parallelism
              </div>
              <div className="mt-3 flex items-end justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold">{executionLeader.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{parallelismNotes[executionLeader.slug]}</p>
                </div>
                <span className="text-4xl font-semibold text-cyan">{executionLeader.parallelismScore}%</span>
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            {ranked.slice(0, 5).map((language, index) => (
              <div key={language.slug} className="rounded-lg border border-border bg-white/5 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10 text-sm font-semibold">{index + 1}</span>
                    <div>
                      <h4 className="font-medium">{language.name}</h4>
                      <p className="text-sm text-muted">{language.idealUseCases.slice(0, 3).join(", ")}</p>
                    </div>
                  </div>
                  <span className="text-2xl font-semibold" style={{ color: language.color }}>{language.fitScore}%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full" style={{ width: `${language.fitScore}%`, backgroundColor: language.color }} />
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  <div className="rounded-md bg-black/10 px-3 py-2">
                    <p className="text-xs text-muted">Runtime efficiency</p>
                    <p className="mt-1 font-semibold text-amber">{language.runtimeEfficiencyScore}%</p>
                  </div>
                  <div className="rounded-md bg-black/10 px-3 py-2">
                    <p className="text-xs text-muted">Parallelism</p>
                    <p className="mt-1 font-semibold text-cyan">{language.parallelismScore}%</p>
                  </div>
                  <div className="rounded-md bg-black/10 px-3 py-2">
                    <p className="text-xs text-muted">Execution fit</p>
                    <p className="mt-1 font-semibold text-mint">{language.executionScore}%</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {language.notes.map((note) => (
                    <span key={note} className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-muted">
                      {note.includes("mitigation") ? <AlertTriangle className="h-3 w-3 text-amber" /> : <GraduationCap className="h-3 w-3 text-mint" />}
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-border bg-white/5 p-5">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-rose" />
              <CardTitle>Why Not This Language?</CardTitle>
            </div>
            <div className="mt-4 grid gap-3">
              {ranked.slice(1, 5).map((language) => (
                <div key={`${language.slug}-why-not`} className="rounded-md border border-border bg-black/10 p-3">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h4 className="font-medium">{language.name}</h4>
                    <span className="text-sm text-muted">{top.fitScore - language.fitScore} point gap</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted">{language.whyNot}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
