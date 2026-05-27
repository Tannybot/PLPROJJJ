import { languageProfiles } from "@plass/recommendation";
import { notFound } from "next/navigation";
import { TrendLine } from "@/components/plass/charts";
import { EducationalInsight } from "@/components/plass/educational-insight";
import { ProgressMeter } from "@/components/plass/progress-meter";
import { Card, CardTitle } from "@/components/ui/card";

export function generateStaticParams() {
  return languageProfiles.map((language) => ({ slug: language.slug }));
}

export default async function LanguageProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const language = languageProfiles.find((item) => item.slug === slug);
  if (!language) notFound();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex items-center gap-4">
        <span className="h-4 w-4 rounded-full" style={{ backgroundColor: language.color }} />
        <p className="text-sm text-cyan">Language Profile</p>
      </div>
      <h1 className="mt-2 text-5xl font-semibold">{language.name}</h1>
      <p className="mt-4 max-w-3xl text-muted">{language.name} is evaluated as a candidate technology for project suitability using security, speed, scalability, maintainability, community, and learning criteria.</p>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_420px]">
        <div className="grid gap-6">
          <Card>
            <CardTitle>Overview</CardTitle>
            <p className="mt-3 text-sm leading-7 text-muted">{language.name} fits best in {language.idealUseCases.join(", ")}. PLASS treats it as a weighted decision option rather than a universally superior choice.</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ProgressMeter label="Learning accessibility" value={language.scores.learning} color={language.color} />
              <ProgressMeter label="Scalability rating" value={language.scores.scalability} color={language.color} />
              <ProgressMeter label="Runtime performance" value={language.scores.speed} color={language.color} />
              <ProgressMeter label="Ecosystem strength" value={language.scores.community} color={language.color} />
            </div>
          </Card>
          <EducationalInsight seed={language.name.length} />
          <Card><CardTitle>Popularity Trends</CardTitle><div className="mt-4"><TrendLine /></div></Card>
          <Card>
            <CardTitle>Timeline</CardTitle>
            <div className="mt-4 space-y-3">
              {language.history.map((event) => (
                <div key={event} className="rounded-md border border-border bg-white/5 p-3 text-sm text-muted">{event}</div>
              ))}
            </div>
          </Card>
        </div>
        <div className="space-y-6">
          <Card><CardTitle>Strengths</CardTitle><ul className="mt-3 space-y-2 text-sm text-muted">{language.strengths.map((item) => <li key={item}>• {item}</li>)}</ul></Card>
          <Card><CardTitle>Weaknesses</CardTitle><ul className="mt-3 space-y-2 text-sm text-muted">{language.weaknesses.map((item) => <li key={item}>• {item}</li>)}</ul></Card>
          <Card><CardTitle>Frameworks</CardTitle><div className="mt-3 flex flex-wrap gap-2">{language.frameworks.map((item) => <span key={item} className="rounded-md bg-white/5 px-3 py-1 text-sm text-muted">{item}</span>)}</div></Card>
          <Card><CardTitle>Industry Usage</CardTitle><div className="mt-3 flex flex-wrap gap-2">{language.industryUsage.map((item) => <span key={item} className="rounded-md bg-cyan/10 px-3 py-1 text-sm text-cyan">{item}</span>)}</div></Card>
          <Card><CardTitle>Company Showcase</CardTitle><div className="mt-3 grid grid-cols-2 gap-2">{language.famousCompanies.map((item) => <span key={item} className="rounded-md border border-border bg-white/5 px-3 py-2 text-sm text-muted">{item}</span>)}</div></Card>
          <Card><CardTitle>Salary Insight</CardTitle><p className="mt-3 text-sm leading-6 text-muted">{language.salaryInsight}</p></Card>
        </div>
      </div>
    </main>
  );
}
