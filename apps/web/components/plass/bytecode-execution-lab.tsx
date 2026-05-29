"use client";

import { Activity, Binary, Braces, GitCompare, Play, Workflow } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";

type BytecodeInstruction = {
  offset: number;
  opcode: string;
  operand: string;
  source: string;
};

type RuntimeMode = "interpreted" | "compiled";

const examples = {
  scoring: `let score = 0
for item in requirements
  if item.priority > 7
    score = score + 10
return score`,
  game: `let velocity = 4
let position = 0
while position < 20
  position = position + velocity
render position`,
  api: `let request = receive
if request.valid
  response = query database
return response`
};

function cleanLine(line: string) {
  return line.trim().replace(/\s+/g, " ");
}

function toBytecode(source: string): BytecodeInstruction[] {
  const lines = source.split(/\r?\n/).map(cleanLine).filter(Boolean);
  const instructions: BytecodeInstruction[] = [];

  lines.forEach((line, index) => {
    const offset = instructions.length * 2;
    const lower = line.toLowerCase();

    if (lower.startsWith("let ")) {
      const [name, value = "undefined"] = line.replace(/^let\s+/i, "").split("=").map((part) => part.trim());
      instructions.push({ offset, opcode: "LOAD_CONST", operand: value, source: line });
      instructions.push({ offset: offset + 1, opcode: "STORE_NAME", operand: name, source: line });
      return;
    }

    if (lower.startsWith("for ")) {
      instructions.push({ offset, opcode: "GET_ITER", operand: line.replace(/^for\s+/i, ""), source: line });
      instructions.push({ offset: offset + 1, opcode: "FOR_ITER", operand: `jump_if_done L${index + 1}`, source: line });
      return;
    }

    if (lower.startsWith("while ")) {
      instructions.push({ offset, opcode: "COMPARE_OP", operand: line.replace(/^while\s+/i, ""), source: line });
      instructions.push({ offset: offset + 1, opcode: "POP_JUMP_IF_FALSE", operand: `exit_loop L${index + 1}`, source: line });
      return;
    }

    if (lower.startsWith("if ")) {
      instructions.push({ offset, opcode: "COMPARE_OP", operand: line.replace(/^if\s+/i, ""), source: line });
      instructions.push({ offset: offset + 1, opcode: "POP_JUMP_IF_FALSE", operand: `skip_block L${index + 1}`, source: line });
      return;
    }

    if (lower.startsWith("return ")) {
      instructions.push({ offset, opcode: "LOAD_NAME", operand: line.replace(/^return\s+/i, ""), source: line });
      instructions.push({ offset: offset + 1, opcode: "RETURN_VALUE", operand: "top_of_stack", source: line });
      return;
    }

    if (line.includes("=") && /[+\-*/]/.test(line)) {
      const [target, expression] = line.split("=").map((part) => part.trim());
      instructions.push({ offset, opcode: "LOAD_EXPR", operand: expression, source: line });
      instructions.push({ offset: offset + 1, opcode: "BINARY_OP", operand: expression.match(/[+\-*/]/)?.[0] ?? "op", source: line });
      instructions.push({ offset: offset + 2, opcode: "STORE_NAME", operand: target, source: line });
      return;
    }

    if (line.includes("=")) {
      const [target, expression] = line.split("=").map((part) => part.trim());
      instructions.push({ offset, opcode: "LOAD_EXPR", operand: expression, source: line });
      instructions.push({ offset: offset + 1, opcode: "STORE_NAME", operand: target, source: line });
      return;
    }

    instructions.push({ offset, opcode: "CALL_FUNCTION", operand: line, source: line });
  });

  return instructions;
}

function getOpcodeFrequency(instructions: BytecodeInstruction[]) {
  return Object.entries(
    instructions.reduce<Record<string, number>>((counts, instruction) => {
      counts[instruction.opcode] = (counts[instruction.opcode] ?? 0) + 1;
      return counts;
    }, {})
  ).sort((a, b) => b[1] - a[1]);
}

function getExecutionFlow(instructions: BytecodeInstruction[], mode: RuntimeMode) {
  const base = [
    "Source code is tokenized into readable statements.",
    "Statements are converted into bytecode instructions.",
    mode === "compiled"
      ? "Bytecode is optimized before execution starts."
      : "The interpreter reads one bytecode instruction at a time.",
    "The virtual machine updates memory, stack, and control flow.",
    "The program returns or renders the final result."
  ];

  if (instructions.some((instruction) => instruction.opcode.includes("JUMP") || instruction.opcode === "FOR_ITER")) {
    base.splice(4, 0, "Branch and loop opcodes decide which instruction runs next.");
  }

  return base;
}

export function BytecodeExecutionLab() {
  const [sourceCode, setSourceCode] = useState(examples.scoring);
  const [submittedSourceCode, setSubmittedSourceCode] = useState(examples.scoring);
  const [mode, setMode] = useState<RuntimeMode>("interpreted");
  const instructions = useMemo(() => toBytecode(submittedSourceCode), [submittedSourceCode]);
  const frequency = useMemo(() => getOpcodeFrequency(instructions), [instructions]);
  const flow = useMemo(() => getExecutionFlow(instructions, mode), [instructions, mode]);
  const maxFrequency = Math.max(...frequency.map(([, count]) => count), 1);
  const interpretedCost = instructions.length * 8 + frequency.length * 4;
  const compiledCost = Math.max(18, Math.round(instructions.length * 4.8 + frequency.length * 6));
  const activeCost = mode === "interpreted" ? interpretedCost : compiledCost;

  return (
    <Card className="border-amber/30">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm text-amber">Execution Simulation</p>
          <CardTitle className="mt-1 text-2xl">Bytecode & Runtime Flow Lab</CardTitle>
          <CardDescription>
            Convert sample source code into pseudo-bytecode, inspect opcode instructions, and trace how execution moves through the program.
          </CardDescription>
        </div>
        <div className="rounded-md border border-border bg-white/5 px-3 py-2 text-sm text-muted">
          {instructions.length} bytecode instructions
        </div>
      </div>

      <div className="mt-6 space-y-5">
        <div className="grid gap-5 xl:grid-cols-[380px_minmax(0,1fr)]">
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <label className="block text-sm text-muted">
                Example source
                <Select
                  className="mt-2"
                  onChange={(event) => setSourceCode(examples[event.target.value as keyof typeof examples])}
                  defaultValue="scoring"
                >
                  <option value="scoring">Suitability scoring</option>
                  <option value="game">Game loop</option>
                  <option value="api">API request</option>
                </Select>
              </label>
              <label className="block text-sm text-muted">
                Execution mode
                <Select className="mt-2" value={mode} onChange={(event) => setMode(event.target.value as RuntimeMode)}>
                  <option value="interpreted">Interpreted</option>
                  <option value="compiled">Compiled</option>
                </Select>
              </label>
            </div>

            <label className="block text-sm text-muted">
              Source code
              <textarea
                value={sourceCode}
                onChange={(event) => setSourceCode(event.target.value)}
                className="mt-2 min-h-[220px] w-full resize-y rounded-md border border-border bg-white/5 p-3 font-mono text-sm leading-6 text-foreground outline-none transition placeholder:text-muted focus:border-cyan"
                spellCheck={false}
              />
            </label>

            <Button type="button" onClick={() => setSubmittedSourceCode(sourceCode)} className="w-full">
              <Play className="h-4 w-4" />
              Submit Source
            </Button>
          </div>

          <div className="space-y-4">
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-border bg-white/5 p-4">
                <div className="flex items-center gap-2 text-sm text-muted"><Braces className="h-4 w-4 text-cyan" /> Conversion</div>
                <p className="mt-2 text-2xl font-semibold">{instructions.length}</p>
                <p className="mt-1 text-xs text-muted">Generated instructions</p>
              </div>
              <div className="rounded-lg border border-border bg-white/5 p-4">
                <div className="flex items-center gap-2 text-sm text-muted"><GitCompare className="h-4 w-4 text-mint" /> Runtime cost</div>
                <p className="mt-2 text-2xl font-semibold">{activeCost} units</p>
                <p className="mt-1 text-xs text-muted">{mode === "compiled" ? "Includes optimization overhead" : "Instruction-by-instruction execution"}</p>
              </div>
              <div className="rounded-lg border border-border bg-white/5 p-4">
                <div className="flex items-center gap-2 text-sm text-muted"><Activity className="h-4 w-4 text-rose" /> Unique opcodes</div>
                <p className="mt-2 text-2xl font-semibold">{frequency.length}</p>
                <p className="mt-1 text-xs text-muted">Instruction types detected</p>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-white/5 p-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Binary className="h-4 w-4 text-cyan" />
              Bytecode Instructions
            </div>
            <div className="mt-3 max-h-[280px] overflow-auto rounded-md border border-border bg-black/20">
              <table className="w-full min-w-[620px] text-left font-mono text-xs">
                <thead className="sticky top-0 bg-[#0b1020] text-muted">
                  <tr>
                    <th className="px-3 py-2">Offset</th>
                    <th className="px-3 py-2">Opcode</th>
                    <th className="px-3 py-2">Operand</th>
                    <th className="px-3 py-2">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {instructions.map((instruction) => (
                    <tr key={`${instruction.offset}-${instruction.opcode}-${instruction.operand}`} className="border-t border-border/60">
                      <td className="px-3 py-2 text-muted">{String(instruction.offset).padStart(4, "0")}</td>
                      <td className="px-3 py-2 text-cyan">{instruction.opcode}</td>
                      <td className="px-3 py-2">{instruction.operand}</td>
                      <td className="px-3 py-2 text-muted">{instruction.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          </div>
        </div>

          <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
            <div className="rounded-lg border border-border bg-white/5 p-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Workflow className="h-4 w-4 text-mint" />
                Execution Flow
              </div>
              <div className="mt-4 space-y-3">
                {flow.map((step, index) => (
                  <div key={step} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-mint/10 text-xs font-semibold text-mint">{index + 1}</span>
                    <p className="text-sm leading-6 text-muted">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-border bg-white/5 p-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Activity className="h-4 w-4 text-amber" />
                Opcode Frequency Analysis
              </div>
              <div className="mt-4 space-y-3">
                {frequency.map(([opcode, count]) => (
                  <div key={opcode}>
                    <div className="flex justify-between gap-3 text-xs">
                      <span className="font-mono text-muted">{opcode}</span>
                      <span>{count}</span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-amber" style={{ width: `${(count / maxFrequency) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

      </div>
    </Card>
  );
}
