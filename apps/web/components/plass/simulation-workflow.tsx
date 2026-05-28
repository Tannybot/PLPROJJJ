"use client";

import { languageProfiles, Recommendation, scoreLanguages } from "@plass/recommendation";
import { motion } from "framer-motion";
import { BookOpen, Download, History, Loader2, Save, WandSparkles } from "lucide-react";
import { jsPDF } from "jspdf";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { BytecodeExecutionLab } from "@/components/plass/bytecode-execution-lab";
import { SuitabilityBars } from "@/components/plass/charts";
import { EducationalInsight } from "@/components/plass/educational-insight";
import { ProgressMeter } from "@/components/plass/progress-meter";
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

export function SimulationWorkflow() {
  const [form, setForm] = useState<FormState>(initialState);
  const [results, setResults] = useState<Recommendation[]>(() => scoreLanguages(initialState, languageProfiles));
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<Array<{ id: string; title: string; top: string; score: number; results: Recommendation[] }>>([]);
  const [factSeed, setFactSeed] = useState(1);
  const top = results[0];
  const stepHealth = useMemo(() => Math.round((form.scalability + form.security + form.performance + form.developmentSpeed) * 2.5), [form]);

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
              <CardDescription>Weighted research criteria used by the scoring engine.</CardDescription>
            </div>
            <span className="rounded-md bg-cyan/10 px-2 py-1 text-xs text-cyan">{stepHealth}% ready</span>
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
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <WandSparkles className="h-4 w-4" />} Run Suitability Simulation
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
            <div className="mt-5 flex flex-wrap gap-2">
              {top.strengths.map((strength) => <span key={strength} className="rounded-md bg-white/5 px-3 py-1 text-xs text-mint">{strength}</span>)}
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
            <CardTitle>Recommendation Ranking</CardTitle>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm"><Save className="h-4 w-4" /> Save</Button>
              <Button variant="secondary" size="sm" onClick={downloadPdf}><Download className="h-4 w-4" /> PDF</Button>
            </div>
          </div>
          <div className="mt-4">
            <SuitabilityBars data={results} />
          </div>
        </Card>

        <div className="grid gap-3 md:grid-cols-2">
          {results.slice(0, 4).map((result) => (
            <Card key={result.slug} className="rounded-lg">
              <div className="flex items-center justify-between">
                <CardTitle>{result.name}</CardTitle>
                <span className="text-xl font-semibold" style={{ color: result.color }}>{result.suitabilityScore}%</span>
              </div>
              <div className="mt-4 space-y-3">
                <ProgressMeter label="Performance" value={result.scores.speed} color={result.color} />
                <ProgressMeter label="Security" value={result.scores.security} color={result.color} />
                <ProgressMeter label="Ecosystem strength" value={result.scores.community} color={result.color} />
              </div>
              <p className="mt-4 text-sm text-muted">Used by: {result.famousCompanies.join(", ")}</p>
            </Card>
          ))}
        </div>

        <Card>
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-cyan" />
            <CardTitle>Simulation Replay History</CardTitle>
          </div>
          <div className="mt-4 space-y-3">
            {history.length === 0 ? (
              <p className="text-sm text-muted">Run a simulation to start building replay history.</p>
            ) : history.map((item) => (
              <button key={item.id} onClick={() => setResults(item.results)} className="w-full rounded-md border border-border bg-white/5 p-3 text-left transition hover:border-cyan/40">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium">{item.title}</span>
                  <span className="text-sm text-cyan">{item.top} · {item.score}%</span>
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
