import { Bookmark, Flame, History, Star, UserRound } from "lucide-react";
import { AchievementPanel } from "@/components/plass/achievement-panel";
import { EducationalInsight } from "@/components/plass/educational-insight";
import { ProgressMeter } from "@/components/plass/progress-meter";
import { Card, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <p className="text-sm text-cyan">User Workspace</p>
      <h1 className="mt-2 text-4xl font-semibold">Profile</h1>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <Card>
            <UserRound className="h-8 w-8 text-cyan" />
            <CardTitle className="mt-4">Research User</CardTitle>
            <p className="mt-2 text-sm text-muted">Authentication is wired for NextAuth credentials and can be replaced with Clerk when production identity is configured.</p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-md border border-border bg-white/5 p-3"><Star className="h-5 w-5 text-amber" /><p className="mt-2 text-2xl font-semibold">860</p><p className="text-xs text-muted">XP earned</p></div>
              <div className="rounded-md border border-border bg-white/5 p-3"><Flame className="h-5 w-5 text-rose" /><p className="mt-2 text-2xl font-semibold">3</p><p className="text-xs text-muted">Simulation streak</p></div>
              <div className="rounded-md border border-border bg-white/5 p-3"><History className="h-5 w-5 text-mint" /><p className="mt-2 text-2xl font-semibold">12</p><p className="text-xs text-muted">Replay sessions</p></div>
            </div>
          </Card>
          <Card>
            <CardTitle>Learning Insights</CardTitle>
            <div className="mt-5 space-y-4">
              <ProgressMeter label="Backend architecture" value={84} />
              <ProgressMeter label="Security reasoning" value={62} color="#fb7185" />
              <ProgressMeter label="Performance analysis" value={78} color="#fbbf24" />
            </div>
          </Card>
          <AchievementPanel />
        </div>
        <div className="space-y-6">
          <Card><Bookmark className="h-8 w-8 text-mint" /><CardTitle className="mt-4">Bookmarked Languages</CardTitle><p className="mt-2 text-sm text-muted">Favorites are modeled in Prisma and ready for user-specific persistence.</p></Card>
          <EducationalInsight seed={7} />
        </div>
      </div>
    </main>
  );
}
