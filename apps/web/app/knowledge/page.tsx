import { languageProfiles } from "@plass/recommendation";
import { EducationalInsight } from "@/components/plass/educational-insight";
import { LanguageCard } from "@/components/plass/language-card";
import { ScoreHeatmap } from "@/components/plass/score-heatmap";

export default function KnowledgePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-sm text-cyan">Research Knowledge Base</p>
      <h1 className="mt-2 text-4xl font-semibold">Programming Language Profiles</h1>
      <p className="mt-3 max-w-3xl text-muted">Each profile summarizes strengths, weaknesses, ideal use cases, industry usage, frameworks, and trend signals used by PLASS recommendations.</p>
      <div className="mt-6">
        <EducationalInsight seed={2} />
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {languageProfiles.map((language) => <LanguageCard key={language.slug} language={language} />)}
      </div>
      <div className="mt-8">
        <ScoreHeatmap languages={languageProfiles} />
      </div>
    </main>
  );
}
