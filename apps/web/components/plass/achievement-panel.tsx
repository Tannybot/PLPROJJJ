"use client";

import { Award, BrainCircuit, Flame, ShieldCheck, Trophy } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";

const badges = [
  { title: "AI Explorer", detail: "Run your first simulation", icon: BrainCircuit, unlocked: true },
  { title: "Performance Analyst", detail: "Compare runtime metrics", icon: Trophy, unlocked: true },
  { title: "Backend Architect", detail: "Evaluate scalable systems", icon: Award, unlocked: true },
  { title: "Security Specialist", detail: "Prioritize secure languages", icon: ShieldCheck, unlocked: false }
];

export function AchievementPanel({ compact = false }: { compact?: boolean }) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <CardTitle>Achievement Progress</CardTitle>
        <div className="flex items-center gap-2 rounded-md bg-rose/10 px-2 py-1 text-xs text-rose">
          <Flame className="h-3.5 w-3.5" /> 3 day streak
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {badges.slice(0, compact ? 2 : badges.length).map((badge) => {
          const Icon = badge.icon;
          return (
            <div key={badge.title} className={`rounded-md border p-3 ${badge.unlocked ? "border-cyan/30 bg-cyan/10" : "border-border bg-white/5 opacity-65"}`}>
              <Icon className={`h-5 w-5 ${badge.unlocked ? "text-cyan" : "text-muted"}`} />
              <p className="mt-3 text-sm font-medium">{badge.title}</p>
              <p className="mt-1 text-xs text-muted">{badge.detail}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
