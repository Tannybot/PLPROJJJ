"use client";

import { languageProfiles } from "@plass/recommendation";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, BrainCircuit, Cpu, Layers3 } from "lucide-react";
import Link from "next/link";
import { LanguageCard } from "@/components/plass/language-card";
import { MetricCard } from "@/components/plass/metric-card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <section className="mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-[1.1fr_.9fr]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-5 inline-flex rounded-md border border-cyan/20 bg-cyan/10 px-3 py-1 text-sm text-cyan">Research-oriented AI-ready scoring platform</div>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-normal sm:text-6xl lg:text-7xl">PLASS</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            Programming Language Assessment & Suitability Simulator evaluates software requirements, compares language trade-offs, and produces recommendation reports for capstone-grade research decisions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild><Link href="/simulation">Start Simulation <ArrowRight className="h-4 w-4" /></Link></Button>
            <Button asChild variant="secondary"><Link href="/compare">Compare Languages</Link></Button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-lg p-4">
          <div className="rounded-lg border border-border bg-black/20 p-4">
            <div className="grid grid-cols-2 gap-3">
              <MetricCard label="Languages" value="8" icon={Cpu} />
              <MetricCard label="Criteria" value="6" icon={Layers3} tone="text-mint" />
              <MetricCard label="Reports" value="PDF" icon={BarChart3} tone="text-amber" />
              <MetricCard label="AI-ready" value="API" icon={BrainCircuit} tone="text-rose" />
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm text-cyan">Evaluation Catalog</p>
            <h2 className="mt-2 text-3xl font-semibold">Programming Language Profiles</h2>
          </div>
          <Link href="/knowledge" className="text-sm text-cyan">View all</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {languageProfiles.map((language) => <LanguageCard key={language.slug} language={language} />)}
        </div>
      </section>
    </main>
  );
}
