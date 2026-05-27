import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export function MetricCard({ label, value, icon: Icon, tone = "text-cyan" }: { label: string; value: string; icon: LucideIcon; tone?: string }) {
  return (
    <Card className="rounded-lg">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">{label}</p>
        <Icon className={`h-5 w-5 ${tone}`} />
      </div>
      <p className="mt-4 text-3xl font-semibold">{value}</p>
    </Card>
  );
}
