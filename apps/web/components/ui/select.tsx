import * as React from "react";
import { cn } from "@/lib/utils";

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "h-10 w-full rounded-md border border-border bg-[#0b1020] px-3 text-sm text-foreground outline-none transition focus:border-cyan",
        props.className
      )}
    />
  );
}
