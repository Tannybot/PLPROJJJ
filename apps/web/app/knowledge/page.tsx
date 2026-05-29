import { languageProfiles } from "@plass/recommendation";
import { ArrowUpRight, BookOpen, Lightbulb, Sparkles } from "lucide-react";
import Link from "next/link";
import { LanguageCard } from "@/components/plass/language-card";
import { ScoreHeatmap } from "@/components/plass/score-heatmap";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function KnowledgePage() {
  const featured = languageProfiles.slice(0, 3);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-stretch">
        <section className="rounded-lg border border-cyan/20 bg-white/5 p-6">
          <p className="flex items-center gap-2 text-sm text-cyan"><BookOpen className="h-4 w-4" /> Research Knowledge Base</p>
          <h1 className="mt-3 text-4xl font-semibold">Programming Language Profiles</h1>
          <p className="mt-3 max-w-3xl text-muted">Explore language strengths, tradeoffs, industry usage, frameworks, and the small facts that make each ecosystem easier to remember.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-md border border-border bg-background/40 p-3">
              <p className="text-2xl font-semibold text-cyan">{languageProfiles.length}</p>
              <p className="text-xs text-muted">Language profiles</p>
            </div>
            <div className="rounded-md border border-border bg-background/40 p-3">
              <p className="text-2xl font-semibold text-mint">6</p>
              <p className="text-xs text-muted">Scoring criteria</p>
            </div>
            <div className="rounded-md border border-border bg-background/40 p-3">
              <p className="text-2xl font-semibold text-amber">24+</p>
              <p className="text-xs text-muted">Framework signals</p>
            </div>
          </div>
        </section>

        <Card className="border-amber/30 bg-amber/5">
          <div className="flex items-start gap-3">
            <Lightbulb className="mt-1 h-5 w-5 shrink-0 text-amber" />
            <div>
              <CardTitle>Did you know?</CardTitle>
              <CardDescription>{languageProfiles[2].didYouKnow}</CardDescription>
              <div className="mt-5 space-y-3">
                {featured.map((language) => (
                  <Link key={language.slug} href={`/knowledge/${language.slug}`} className="flex items-center justify-between rounded-md border border-border bg-white/5 p-3 text-sm transition hover:border-amber/50 hover:bg-white/10">
                    <span>{language.name}</span>
                    <ArrowUpRight className="h-4 w-4 text-amber" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <section className="mt-8">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-mint" />
          <h2 className="text-2xl font-semibold">Trivia Trail</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {languageProfiles.map((language) => (
            <Link key={language.slug} href={`/knowledge/${language.slug}`} className="rounded-lg border border-border bg-white/5 p-4 transition hover:-translate-y-1 hover:border-cyan/40 hover:bg-white/10">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium" style={{ color: language.color }}>{language.name}</span>
                <Lightbulb className="h-4 w-4 text-amber" />
              </div>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">{language.didYouKnow}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {languageProfiles.map((language) => <LanguageCard key={language.slug} language={language} />)}
      </div>
      <div className="mt-8">
        <ScoreHeatmap languages={languageProfiles} />
      </div>
    </main>
  );
}
