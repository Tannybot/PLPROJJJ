"use client";

import { languageProfiles } from "@plass/recommendation";
import { Lightbulb } from "lucide-react";
import { useMemo } from "react";
import { Card } from "@/components/ui/card";

export function EducationalInsight({ seed = 0 }: { seed?: number }) {
  const fact = useMemo(() => {
    const facts = languageProfiles.map((language) => language.didYouKnow);
    return facts[Math.abs(seed) % facts.length];
  }, [seed]);

  return (
    <Card className="border-amber/30 bg-amber/5">
      <div className="flex gap-3">
        <Lightbulb className="mt-1 h-5 w-5 shrink-0 text-amber" />
        <div>
          <p className="text-sm font-medium text-amber">Did you know?</p>
          <p className="mt-1 text-sm leading-6 text-muted">{fact}</p>
        </div>
      </div>
    </Card>
  );
}
