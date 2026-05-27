import { Download, FileText } from "lucide-react";
import { EducationalInsight } from "@/components/plass/educational-insight";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";

const reports = [
  ["Cloud Microservice Language Fit", "Go", "92%"],
  ["AI Research Prototype", "Python", "95%"],
  ["Secure Systems Component", "Rust", "93%"]
];

export default function ReportsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-sm text-cyan">Export Center</p>
      <h1 className="mt-2 text-4xl font-semibold">Simulation Reports</h1>
      <div className="mt-6">
        <EducationalInsight seed={5} />
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {reports.map(([title, language, score]) => (
          <Card key={title}>
            <FileText className="h-6 w-6 text-cyan" />
            <CardTitle className="mt-4">{title}</CardTitle>
            <p className="mt-2 text-sm text-muted">Recommendation: {language} at {score} suitability.</p>
            <Button className="mt-5 w-full" variant="secondary"><Download className="h-4 w-4" /> Download PDF</Button>
          </Card>
        ))}
      </div>
    </main>
  );
}
