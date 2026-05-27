import { LanguageProfile } from "@plass/recommendation";
import { ArrowUpRight, Bookmark } from "lucide-react";
import Link from "next/link";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export function LanguageCard({ language }: { language: LanguageProfile }) {
  return (
    <Card className="group rounded-lg transition hover:-translate-y-1 hover:border-cyan/40">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: language.color }} />
          <CardTitle>{language.name}</CardTitle>
        </div>
        <Bookmark className="h-4 w-4 text-muted transition group-hover:text-cyan" />
      </div>
      <CardDescription>{language.idealUseCases.slice(0, 3).join(", ")}</CardDescription>
      <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted">{language.beginnerExplanation}</p>
      <div className="mt-5 grid grid-cols-3 gap-2 text-xs text-muted">
        <span>Speed {language.scores.speed}</span>
        <span>Scale {language.scores.scalability}</span>
        <span>Security {language.scores.security}</span>
      </div>
      <Link href={`/knowledge/${language.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm text-cyan">
        Open profile <ArrowUpRight className="h-4 w-4" />
      </Link>
    </Card>
  );
}
