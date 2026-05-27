import { languageProfiles } from "@plass/recommendation";
import { Database, Edit3, Shield, Users } from "lucide-react";
import { MetricCard } from "@/components/plass/metric-card";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-sm text-cyan">Administrative Console</p>
      <h1 className="mt-2 text-4xl font-semibold">Admin Panel</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <MetricCard label="Languages" value="8" icon={Database} />
        <MetricCard label="Criteria" value="6" icon={Edit3} tone="text-mint" />
        <MetricCard label="Users" value="18" icon={Users} tone="text-amber" />
        <MetricCard label="Access" value="RBAC" icon={Shield} tone="text-rose" />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card className="overflow-x-auto">
          <CardTitle>Language Scoring Data</CardTitle>
          <table className="mt-4 w-full min-w-[720px] text-left text-sm">
            <thead className="text-muted"><tr><th className="py-3">Language</th><th>Security</th><th>Speed</th><th>Scale</th><th>Maintainability</th><th>Actions</th></tr></thead>
            <tbody>{languageProfiles.map((language) => (
              <tr key={language.slug} className="border-t border-border">
                <td className="py-3">{language.name}</td><td>{language.scores.security}</td><td>{language.scores.speed}</td><td>{language.scores.scalability}</td><td>{language.scores.maintainability}</td>
                <td><Button size="sm" variant="secondary"><Edit3 className="h-4 w-4" /> Edit</Button></td>
              </tr>
            ))}</tbody>
          </table>
        </Card>
        <Card>
          <CardTitle>Scoring Criteria</CardTitle>
          <div className="mt-4 space-y-3">
            {["Security", "Speed", "Scalability", "Maintainability", "Community Support", "Learning Difficulty"].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-md border border-border bg-white/5 p-3 text-sm">
                <span>{item}</span><Button size="sm" variant="ghost">Update</Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
