import { cn } from "@/lib/utils";
import * as React from "react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "ring-1 ring-transparent",
        "file:text-foreground placeholder:text-text-secondary-default selection:bg-background-secondary-focus selection:text-text-primary-default dark:bg-background-primary-default border-border-primary-default flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-focus-ring-secondary-default",
        "focus-visible:ring focus-visible:ring-focus-ring-secondary-default/50",
        "aria-invalid:ring-focus-ring-destructive-default/20 dark:aria-invalid:ring-focus-ring-destructive-default/40 aria-invalid:border-border-destructive-default",
        className
      )}
      {...props}
    />
  );
}

export { Input };
