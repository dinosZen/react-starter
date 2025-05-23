import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-border-primary-default focus-visible:ring-border-primary-default focus-visible:ring-[2px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-background-brand-default text-text-primary-inverse shadow-xs hover:bg-background-brand-default/90 px-4 py-2",
        destructive:
          "bg-background-destructive-default text-text-primary-default shadow-xs hover:bg-background-destructive-default/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 px-4 py-2",
        outline:
          "border bg-background-primary-default shadow-xs hover:bg-background-secondary-default hover:text-accent-foreground dark:bg-background-primary-default dark:border-input dark:hover:bg-background-secondary-default px-4 py-2",
        secondary:
          "bg-background-primary-default text-text-primary-default shadow-xs hover:bg-background-secondary-default/80 px-4 py-2",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 px-4 py-2",
        link: "text-primary underline-offset-4 hover:underline px-0",
      },
      size: {
        default: "h-9 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, className }),
        "cursor-pointer"
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
