"use client";

import { LanguageProfile, Recommendation } from "@plass/recommendation";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

export function SuitabilityBars({ data }: { data: Recommendation[] }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data.slice(0, 8)}>
        <CartesianGrid stroke="rgba(148,163,184,.12)" vertical={false} />
        <XAxis dataKey="name" stroke="#8d96ad" />
        <YAxis stroke="#8d96ad" />
        <Tooltip contentStyle={{ background: "#0b1020", border: "1px solid rgba(148,163,184,.24)", borderRadius: 8 }} />
        <Bar dataKey="suitabilityScore" fill="#22d3ee" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function LanguageRadar({ languages }: { languages: LanguageProfile[] }) {
  const criteria = ["security", "speed", "scalability", "maintainability", "community", "learning"] as const;
  const data = criteria.map((criterion) => ({
    criterion,
    ...Object.fromEntries(languages.slice(0, 3).map((language) => [language.name, language.scores[criterion]]))
  }));

  return (
    <ResponsiveContainer width="100%" height={360}>
      <RadarChart data={data}>
        <PolarGrid stroke="rgba(148,163,184,.18)" />
        <PolarAngleAxis dataKey="criterion" stroke="#8d96ad" />
        <PolarRadiusAxis stroke="#8d96ad" />
        {languages.slice(0, 3).map((language) => (
          <Radar key={language.slug} name={language.name} dataKey={language.name} stroke={language.color} fill={language.color} fillOpacity={0.15} />
        ))}
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function TrendLine() {
  const data = [
    { year: "2022", Python: 84, JavaScript: 88, Go: 68, Rust: 61 },
    { year: "2023", Python: 87, JavaScript: 90, Go: 72, Rust: 67 },
    { year: "2024", Python: 90, JavaScript: 91, Go: 77, Rust: 74 },
    { year: "2025", Python: 91, JavaScript: 92, Go: 81, Rust: 80 },
    { year: "2026", Python: 93, JavaScript: 92, Go: 84, Rust: 84 }
  ];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid stroke="rgba(148,163,184,.12)" vertical={false} />
        <XAxis dataKey="year" stroke="#8d96ad" />
        <YAxis stroke="#8d96ad" />
        <Tooltip contentStyle={{ background: "#0b1020", border: "1px solid rgba(148,163,184,.24)", borderRadius: 8 }} />
        <Line type="monotone" dataKey="Python" stroke="#4fd1c5" strokeWidth={2} />
        <Line type="monotone" dataKey="JavaScript" stroke="#facc15" strokeWidth={2} />
        <Line type="monotone" dataKey="Go" stroke="#22d3ee" strokeWidth={2} />
        <Line type="monotone" dataKey="Rust" stroke="#fb7185" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
