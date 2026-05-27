import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-10 w-full rounded-md border border-border bg-white/5 px-3 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-cyan",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
