"use client";

import { languageProfiles, Recommendation, scoreLanguages } from "@plass/recommendation";
import { motion } from "framer-motion";
import {
  BookOpen,
  Bot,
  CheckCircle2,
  Download,
  Gamepad2,
  GraduationCap,
  History,
  Loader2,
  RotateCcw,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Trophy,
  Users,
  WandSparkles
} from "lucide-react";
import { jsPDF } from "jspdf";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { BytecodeExecutionLab } from "@/components/plass/bytecode-execution-lab";
import { SuitabilityBars } from "@/components/plass/charts";
import { EducationalInsight } from "@/components/plass/educational-insight";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

type FormState = {
  projectType: string;
  targetUsers: number;
  scalability: number;
  security: number;
  performance: number;
  budget: "low" | "medium" | "high";
  developmentSpeed: number;
  deploymentPlatform: string;
};

const initialState: FormState = {
  projectType: "Full-stack SaaS dashboard",
  targetUsers: 50000,
  scalability: 8,
  security: 8,
  performance: 7,
  budget: "medium",
  developmentSpeed: 8,
  deploymentPlatform: "Cloud / Docker / Kubernetes"
};

const scenarioPresets: Array<{ label: string; icon: typeof Gamepad2; values: FormState }> = [
  {
    label: "Game",
    icon: Gamepad2,
    values: {
      projectType: "Online game system",
      targetUsers: 50000,
      scalability: 8,
      security: 7,
      performance: 10,
      budget: "high",
      developmentSpeed: 7,
      deploymentPlatform: "Desktop / Web Game"
    }
  },
  {
    label: "AI Chatbot",
    icon: Bot,
    values: {
      projectType: "AI chatbot with analytics",
      targetUsers: 25000,
      scalability: 8,
      security: 8,
      performance: 8,
      budget: "medium",
      developmentSpeed: 9,
      deploymentPlatform: "Cloud API"
    }
  },
  {
    label: "E-commerce",
    icon: ShoppingCart,
    values: {
      projectType: "E-commerce website",
      targetUsers: 100000,
      scalability: 9,
      security: 10,
      performance: 8,
      budget: "medium",
      developmentSpeed: 7,
      deploymentPlatform: "Web / Cloud"
    }
  },
  {
    label: "School",
    icon: GraduationCap,
    values: {
      projectType: "School management system",
      targetUsers: 8000,
      scalability: 6,
      security: 8,
      performance: 6,
      budget: "low",
      developmentSpeed: 9,
      deploymentPlatform: "Web"
    }
  }
];

export function SimulationWorkflow() {
  const [form, setForm] = useState<FormState>(initialState);
  const [results, setResults] = useState<Recommendation[]>(() => scoreLanguages(initialState, languageProfiles));
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<Array<{ id: string; title: string; top: string; score: number; results: Recommendation[] }>>([]);
  const [factSeed, setFactSeed] = useState(1);
  const top = results[0];
  const runnerUp = results[1];
  const activePreset = scenarioPresets.find((preset) => preset.values.projectType === form.projectType)?.label;
  const stepHealth = useMemo(() => Math.round((form.scalability + form.security + form.performance + form.developmentSpeed) * 2.5), [form]);
  const strongestPriority = useMemo(() => {
    const priorities = [
      { label: "Scalability", value: form.scalability },
      { label: "Security", value: form.security },
      { label: "Performance", value: form.performance },
      { label: "Delivery speed", value: form.developmentSpeed }
    ];
    return priorities.sort((a, b) => b.value - a.value)[0];
  }, [form]);

  const simulationBrief = [
    { label: "Users", value: form.targetUsers.toLocaleString(), icon: Users },
    { label: "Budget", value: form.budget, icon: SlidersHorizontal },
    { label: "Priority", value: strongestPriority.label, icon: Trophy }
  ];

  useEffect(() => {
    const stored = window.localStorage.getItem("plass-history");
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  function remember(nextResults: Recommendation[]) {
    const next = [
      {
        id: crypto.randomUUID(),
        title: form.projectType,
        top: nextResults[0].name,
        score: nextResults[0].suitabilityScore,
        results: nextResults
      },
      ...history
    ].slice(0, 5);
    setHistory(next);
    window.localStorage.setItem("plass-history", JSON.stringify(next));
    setFactSeed((value) => value + 1);
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => window.setTimeout(resolve, 2600));
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api"}/simulations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!response.ok) throw new Error("API unavailable");
      const payload = await response.json();
      setResults(payload.results);
      remember(payload.results);
    } catch {
      const localResults = scoreLanguages(form, languageProfiles);
      setResults(localResults);
      remember(localResults);
    } finally {
      setIsLoading(false);
    }
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function applyPreset(values: FormState) {
    setForm(values);
  }

  function downloadPdf() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("PLASS Simulation Report", 18, 20);
    doc.setFontSize(11);
    doc.text(`Recommended Language: ${top.name} (${top.suitabilityScore}%)`, 18, 34);
    results.slice(0, 5).forEach((result, index) => {
      doc.text(`${index + 1}. ${result.name} - ${result.suitabilityScore}%`, 18, 48 + index * 9);
    });
    doc.save("plass-simulation-report.pdf");
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <div className="grid w-full gap-6 lg:grid-cols-[minmax(320px,420px)_minmax(0,1fr)]">
        <div className="w-full space-y-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Simulation Inputs</CardTitle>
              <CardDescription>Shape the project and watch the recommendation react.</CardDescription>
            </div>
            <span className="rounded-md bg-cyan/10 px-2 py-1 text-xs text-cyan">{stepHealth}% ready</span>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            {scenarioPresets.map((preset) => {
              const Icon = preset.icon;
              const isActive = activePreset === preset.label;
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => applyPreset(preset.values)}
                  className={`flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-left text-sm transition hover:border-cyan/40 hover:bg-cyan/10 ${
                    isActive ? "border-cyan/60 bg-cyan/10 text-cyan" : "border-border bg-white/5"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <Icon className="h-4 w-4 text-cyan" />
                    {preset.label}
                  </span>
                  {isActive ? <CheckCircle2 className="h-4 w-4 shrink-0 text-mint" /> : null}
                </button>
              );
            })}
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {simulationBrief.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-md border border-border bg-white/5 p-3">
                  <Icon className="h-4 w-4 text-mint" />
                  <p className="mt-2 text-xs text-muted">{item.label}</p>
                  <p className="truncate text-sm font-medium capitalize">{item.value}</p>
                </div>
              );
            })}
          </div>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block text-sm text-muted">Project type<Input value={form.projectType} onChange={(e) => update("projectType", e.target.value)} className="mt-2" /></label>
            <label className="block text-sm text-muted">Target users<Input type="number" value={form.targetUsers} onChange={(e) => update("targetUsers", Number(e.target.value))} className="mt-2" /></label>
            <label className="block text-sm text-muted">Budget level<Select value={form.budget} onChange={(e) => update("budget", e.target.value as FormState["budget"])} className="mt-2"><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></Select></label>
            <label className="block text-sm text-muted">Deployment platform<Input value={form.deploymentPlatform} onChange={(e) => update("deploymentPlatform", e.target.value)} className="mt-2" /></label>
            {(["scalability", "security", "performance", "developmentSpeed"] as const).map((field) => (
              <label key={field} className="block text-sm capitalize text-muted">
                {field.replace(/([A-Z])/g, " $1")} priority: <span className="text-foreground">{form[field]}</span>
                <input type="range" min="1" max="10" value={form[field]} onChange={(e) => update(field, Number(e.target.value))} className="mt-2 w-full accent-cyan" />
              </label>
            ))}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />} Run Simulation
            </Button>
          </form>
        </Card>

        </div>

        <div className="w-full space-y-6">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-cyan/30">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-cyan">Top Recommendation</p>
                <h2 className="mt-1 text-4xl font-semibold">{top.name}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{top.explanation}</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-6xl font-semibold text-cyan">{top.suitabilityScore}%</p>
                <p className="text-sm text-muted">Suitability score</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
              <div className="flex flex-wrap gap-2">
                {top.strengths.slice(0, 3).map((strength) => <span key={strength} className="rounded-md bg-white/5 px-3 py-1 text-xs text-mint">{strength}</span>)}
              </div>
              {runnerUp ? (
                <div className="rounded-md border border-border bg-white/5 px-3 py-2 text-sm">
                  <span className="text-muted">Closest rival</span> <span className="font-medium text-foreground">{runnerUp.name}</span>
                  <span className="text-cyan"> - {runnerUp.suitabilityScore}%</span>
                </div>
              ) : null}
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-border bg-white/5 p-4">
                <div className="flex items-center gap-2 text-sm font-medium"><BookOpen className="h-4 w-4 text-cyan" /> Beginner Insight</div>
                <p className="mt-2 text-sm leading-6 text-muted">{top.beginnerExplanation}</p>
              </div>
              <div className="rounded-lg border border-border bg-white/5 p-4">
                <div className="flex items-center gap-2 text-sm font-medium"><WandSparkles className="h-4 w-4 text-mint" /> Technical Insight</div>
                <p className="mt-2 text-sm leading-6 text-muted">{top.technicalExplanation}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <EducationalInsight seed={factSeed} />

        </div>
      </div>

      <BytecodeExecutionLab />

      <div className="space-y-6">
        <Card>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Recommendation Ranking</CardTitle>
              <CardDescription>Compare the strongest candidates without repeating the same metric cards.</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={downloadPdf}><Download className="h-4 w-4" /> PDF</Button>
            </div>
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
            <SuitabilityBars data={results} />
            <div className="space-y-3">
              {results.slice(0, 3).map((result, index) => (
                <button
                  key={result.slug}
                  type="button"
                  onClick={() => setResults((current) => [result, ...current.filter((item) => item.slug !== result.slug)])}
                  className="w-full rounded-md border border-border bg-white/5 p-3 text-left transition hover:border-cyan/40 hover:bg-white/10"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-sm font-medium">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-cyan/10 text-xs text-cyan">#{index + 1}</span>
                      {result.name}
                    </span>
                    <span className="text-sm font-semibold" style={{ color: result.color }}>{result.suitabilityScore}%</span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted">{result.idealUseCases.join(", ")}</p>
                </button>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <History className="h-5 w-5 text-cyan" />
              <CardTitle>Recent Runs</CardTitle>
            </div>
            <Button type="button" variant="secondary" size="sm" onClick={() => setForm(initialState)}>
              <RotateCcw className="h-4 w-4" /> Reset
            </Button>
          </div>
          <div className="mt-4 space-y-3">
            {history.length === 0 ? (
              <p className="text-sm text-muted">Run a simulation to compare it here later.</p>
            ) : history.map((item) => (
              <button key={item.id} onClick={() => setResults(item.results)} className="w-full rounded-md border border-border bg-white/5 p-3 text-left transition hover:border-cyan/40">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium">{item.title}</span>
                  <span className="text-sm text-cyan">{item.top} - {item.score}%</span>
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
