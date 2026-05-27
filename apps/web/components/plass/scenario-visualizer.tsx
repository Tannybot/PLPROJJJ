"use client";

import { motion } from "framer-motion";
import { Activity, MemoryStick, Server } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { ProgressMeter } from "@/components/plass/progress-meter";

export function ScenarioVisualizer() {
  const nodes = Array.from({ length: 18 }, (_, index) => index);
  return (
    <Card>
      <div className="flex items-center justify-between">
        <CardTitle>Real-Time Scenario Visualization</CardTitle>
        <Activity className="h-5 w-5 text-mint" />
      </div>
      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="relative min-h-64 overflow-hidden rounded-lg border border-border bg-black/20 p-5">
          <div className="absolute inset-x-6 top-1/2 h-px bg-cyan/30" />
          <div className="relative flex h-52 items-center justify-between">
            <div className="flex h-20 w-20 items-center justify-center rounded-lg border border-cyan/40 bg-cyan/10">
              <Server className="h-8 w-8 text-cyan" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {nodes.map((node) => (
                <motion.span
                  key={node}
                  className="h-4 w-4 rounded-full bg-mint"
                  animate={{ opacity: [0.25, 1, 0.25], scale: [0.9, 1.25, 0.9] }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: node * 0.07 }}
                />
              ))}
            </div>
            <div className="flex h-20 w-20 items-center justify-center rounded-lg border border-rose/40 bg-rose/10">
              <MemoryStick className="h-8 w-8 text-rose" />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <ProgressMeter label="Go concurrent users" value={92} color="#22d3ee" />
          <ProgressMeter label="Python rapid delivery" value={95} color="#4fd1c5" />
          <ProgressMeter label="Rust memory safety" value={96} color="#fb7185" />
          <ProgressMeter label="C++ raw throughput" value={98} color="#60a5fa" />
        </div>
      </div>
    </Card>
  );
}
