import { Activity, BarChart3, FileText, Users } from "lucide-react";
import { TrendLine } from "@/components/plass/charts";
import { AchievementPanel } from "@/components/plass/achievement-panel";
import { EducationalInsight } from "@/components/plass/educational-insight";
import { MetricCard } from "@/components/plass/metric-card";
import { ProgressMeter } from "@/components/plass/progress-meter";
import { ScenarioVisualizer } from "@/components/plass/scenario-visualizer";
import { Card, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const activity = ["Python recommended for AI analytics prototype", "Go ranked highest for cloud microservice", "Rust report exported for security-critical API", "Java compared against C# for enterprise backend"];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-sm text-cyan">Command Center</p>
      <h1 className="mt-2 text-4xl font-semibold">Analytics Dashboard</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <MetricCard label="Simulations" value="128" icon={BarChart3} />
        <MetricCard label="Saved Reports" value="42" icon={FileText} tone="text-mint" />
        <MetricCard label="Users" value="18" icon={Users} tone="text-amber" />
        <MetricCard label="Activity" value="Live" icon={Activity} tone="text-rose" />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
        <Card>
          <CardTitle>Popularity & Suitability Trends</CardTitle>
          <div className="mt-4"><TrendLine /></div>
        </Card>
        <Card>
          <CardTitle>Recent Activity</CardTitle>
          <div className="mt-4 space-y-3">
            {activity.map((item) => <div key={item} className="rounded-md border border-border bg-white/5 p-3 text-sm text-muted">{item}</div>)}
          </div>
        </Card>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_420px]">
        <ScenarioVisualizer />
        <div className="space-y-6">
          <AchievementPanel />
          <EducationalInsight seed={4} />
        </div>
      </div>
      <Card className="mt-6">
        <CardTitle>Personal Learning Progress</CardTitle>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <ProgressMeter label="Simulation mastery" value={76} />
          <ProgressMeter label="Comparison literacy" value={68} color="#5eead4" />
          <ProgressMeter label="Security awareness" value={58} color="#fb7185" />
          <ProgressMeter label="Architecture confidence" value={82} color="#fbbf24" />
        </div>
      </Card>
    </main>
  );
}
