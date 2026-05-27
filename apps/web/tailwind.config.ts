import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#05070d",
        foreground: "#edf2ff",
        muted: "#8d96ad",
        panel: "rgba(13, 18, 31, 0.74)",
        border: "rgba(148, 163, 184, 0.18)",
        cyan: "#22d3ee",
        mint: "#5eead4",
        rose: "#fb7185",
        amber: "#fbbf24"
      },
      boxShadow: {
        glow: "0 0 60px rgba(34, 211, 238, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
