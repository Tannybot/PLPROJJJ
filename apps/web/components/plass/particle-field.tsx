"use client";

import { motion } from "framer-motion";

export function ParticleField() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {Array.from({ length: 34 }, (_, index) => (
        <motion.span
          key={index}
          className="absolute h-1 w-1 rounded-full bg-cyan/40"
          style={{ left: `${(index * 29) % 100}%`, top: `${(index * 47) % 100}%` }}
          animate={{ y: [0, -18, 0], opacity: [0.15, 0.65, 0.15] }}
          transition={{ duration: 3 + (index % 5), repeat: Infinity, delay: index * 0.11 }}
        />
      ))}
    </div>
  );
}
