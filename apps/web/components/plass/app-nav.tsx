import { BarChart3, BrainCircuit, DatabaseZap, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const links = [
  ["Dashboard", "/dashboard"],
  ["Simulation", "/simulation"],
  ["Compare", "/compare"],
  ["Knowledge", "/knowledge"],
  ["Admin", "/admin"]
];

export function AppNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md border border-cyan/30 bg-cyan/10">
            <BrainCircuit className="h-5 w-5 text-cyan" />
          </div>
          <div>
            <p className="text-sm font-bold">PLASS</p>
            <p className="hidden text-xs text-muted sm:block">Assessment & Suitability Simulator</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="rounded-md px-3 py-2 text-sm text-muted transition hover:bg-white/5 hover:text-foreground">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ShieldCheck className="hidden h-4 w-4 text-mint sm:block" />
          <DatabaseZap className="hidden h-4 w-4 text-amber sm:block" />
          <BarChart3 className="hidden h-4 w-4 text-rose sm:block" />
          <Button asChild size="sm">
            <Link href="/simulation">Start</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
