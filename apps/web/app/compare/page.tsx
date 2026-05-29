"use client";

import { languageProfiles } from "@plass/recommendation";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { LanguageRadar } from "@/components/plass/charts";
import { SuitabilityAdvisor } from "@/components/plass/suitability-advisor";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export default function ComparePage() {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("scalability");
  const filtered = useMemo(() => languageProfiles
    .filter((language) => language.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => b.scores[sortBy as keyof typeof b.scores] - a.scores[sortBy as keyof typeof a.scores]), [query, sortBy]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-sm text-cyan">Side-by-side Evidence</p>
      <h1 className="mt-2 text-4xl font-semibold">Comparison Dashboard</h1>
      <div className="mt-6 grid gap-3 md:grid-cols-[1fr_240px]">
        <label className="relative"><Search className="absolute left-3 top-3 h-4 w-4 text-muted" /><Input className="pl-9" placeholder="Search languages" value={query} onChange={(e) => setQuery(e.target.value)} /></label>
        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="scalability">Sort by scalability</option>
          <option value="speed">Sort by performance</option>
          <option value="security">Sort by security</option>
          <option value="learning">Sort by learning curve</option>
        </Select>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[420px_1fr]">
        <Card>
          <CardTitle>Radar Analysis</CardTitle>
          <LanguageRadar languages={filtered} />
        </Card>
        <Card className="overflow-x-auto">
          <CardTitle>Evaluation Matrix</CardTitle>
          <table className="mt-4 w-full min-w-[760px] text-left text-sm">
            <thead className="text-muted"><tr>{["Language", "Security", "Performance", "Memory", "Learning", "Scalability", "Maintainability"].map((head) => <th key={head} className="border-b border-border py-3">{head}</th>)}</tr></thead>
            <tbody>
              {filtered.map((language) => (
                <tr key={language.slug} className="border-b border-border/60">
                  <td className="py-3 font-medium"><span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: language.color }} />{language.name}</td>
                  <td>{language.scores.security}</td>
                  <td>{language.scores.speed}</td>
                  <td>{Math.round((language.scores.speed + language.scores.security) / 2)}</td>
                  <td>{100 - language.scores.learning}</td>
                  <td>{language.scores.scalability}</td>
                  <td>{language.scores.maintainability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
      <div className="mt-6">
        <SuitabilityAdvisor />
      </div>
    </main>
  );
}
