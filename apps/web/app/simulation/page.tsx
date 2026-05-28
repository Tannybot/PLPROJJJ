import { SimulationWorkflow } from "@/components/plass/simulation-workflow";

export default function SimulationPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-10">
      <div className="mb-8 flex max-w-3xl flex-col items-center text-center">
        <p className="text-sm text-cyan">Multi-step Suitability Engine</p>
        <h1 className="mt-2 text-4xl font-semibold">Project Simulation</h1>
        <p className="mt-3 text-muted">Enter project constraints and PLASS will calculate ranked recommendations using weighted security, speed, scalability, maintainability, community, and learning criteria.</p>
      </div>
      <SimulationWorkflow />
    </main>
  );
}
