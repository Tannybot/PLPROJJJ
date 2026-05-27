"use client";

import { LanguageProfile } from "@plass/recommendation";
import { Fragment } from "react";
import { Card, CardTitle } from "@/components/ui/card";

const criteria = ["security", "speed", "scalability", "maintainability", "community", "learning"] as const;

export function ScoreHeatmap({ languages }: { languages: LanguageProfile[] }) {
  return (
    <Card className="overflow-x-auto">
      <CardTitle>Compatibility Heatmap</CardTitle>
      <div className="mt-4 grid min-w-[720px] gap-2" style={{ gridTemplateColumns: `150px repeat(${criteria.length}, 1fr)` }}>
        <div className="text-xs text-muted">Language</div>
        {criteria.map((criterion) => <div key={criterion} className="text-xs capitalize text-muted">{criterion}</div>)}
        {languages.map((language) => (
          <Fragment key={language.slug}>
            <div className="py-2 text-sm font-medium">{language.name}</div>
            {criteria.map((criterion) => {
              const value = language.scores[criterion];
              return (
                <div key={`${language.slug}-${criterion}`} className="rounded-md px-2 py-2 text-center text-xs text-slate-950" style={{ backgroundColor: `color-mix(in srgb, ${language.color} ${Math.max(value, 28)}%, #ffffff)` }}>
                  {value}
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
    </Card>
  );
}
