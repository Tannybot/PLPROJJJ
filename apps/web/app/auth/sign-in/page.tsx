import { BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SignInPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-72px)] max-w-md items-center px-4">
      <Card className="w-full">
        <BrainCircuit className="h-9 w-9 text-cyan" />
        <CardTitle className="mt-4 text-2xl">Sign in to PLASS</CardTitle>
        <form className="mt-6 space-y-4">
          <Input type="email" placeholder="researcher@plass.local" />
          <Input type="password" placeholder="Password" />
          <Button className="w-full" type="button">Continue</Button>
        </form>
        <p className="mt-4 text-xs text-muted">Production authentication can use NextAuth credentials, OAuth providers, or Clerk.</p>
      </Card>
    </main>
  );
}
