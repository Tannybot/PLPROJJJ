import type { Metadata } from "next";
import "./globals.css";
import { AppNav } from "@/components/plass/app-nav";
import { ParticleField } from "@/components/plass/particle-field";

export const metadata: Metadata = {
  title: "PLASS | Programming Language Assessment & Suitability Simulator",
  description: "AI-ready decision-support platform for programming language selection."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen font-sans antialiased">
        <ParticleField />
        <div className="mesh-line min-h-screen">
          <AppNav />
          {children}
        </div>
      </body>
    </html>
  );
}
