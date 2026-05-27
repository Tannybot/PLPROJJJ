"use client";

import { motion } from "framer-motion";
import { BrainCircuit, CheckCircle2, Cpu, DatabaseZap, ShieldCheck, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";

const steps = [
  { label: "Analyzing project requirements...", icon: BrainCircuit },
  { label: "Evaluating scalability compatibility...", icon: DatabaseZap },
  { label: "Simulating backend workload...", icon: Cpu },
  { label: "Analyzing runtime efficiency...", icon: Zap },
  { label: "Calculating security suitability...", icon: ShieldCheck },
  { label: "Ranking language recommendations...", icon: CheckCircle2 }
];

export function AiAnalysisPanel({ active }: { active: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!active) {
      setIndex(steps.length - 1);
      return;
    }
    setIndex(0);
    const timer = window.setInterval(() => {
      setIndex((current) => Math.min(current + 1, steps.length - 1));
    }, 520);
    return () => window.clearInterval(timer);
  }, [active]);

  return (
    <Card className="overflow-hidden border-cyan/30">
      <div className="flex items-center justify-between">
        <CardTitle>AI-Like Analysis Stream</CardTitle>
        <span className="rounded-md border border-cyan/30 bg-cyan/10 px-2 py-1 text-xs text-cyan">
          {active ? "Processing" : "Ready"}
        </span>
      </div>
      <div className="mt-5 space-y-3">
        {steps.map((step, stepIndex) => {
          const Icon = step.icon;
          const isDone = stepIndex < index || (!active && stepIndex <= index);
          const isCurrent = stepIndex === index && active;
          return (
            <motion.div
              key={step.label}
              animate={{ opacity: isDone || isCurrent ? 1 : 0.42, x: isCurrent ? 4 : 0 }}
              className="flex items-center gap-3 rounded-md border border-border bg-white/5 p-3"
            >
              <div className={`flex h-9 w-9 items-center justify-center rounded-md ${isCurrent ? "bg-cyan/20 text-cyan" : isDone ? "bg-mint/15 text-mint" : "bg-white/5 text-muted"}`}>
                <Icon className={`h-4 w-4 ${isCurrent ? "animate-pulse" : ""}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm">{step.label}</p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/8">
                  <motion.div
                    className="h-full rounded-full bg-cyan"
                    initial={false}
                    animate={{ width: isDone ? "100%" : isCurrent ? "72%" : "0%" }}
                    transition={{ duration: 0.45 }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}
