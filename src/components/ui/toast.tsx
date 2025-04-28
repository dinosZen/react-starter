// components/ui/toast.tsx
import { toast as sonnerToast } from "sonner";
import React from "react";

/* ――――――――― Types ――――――――― */
export type ToastVariant = "success" | "warning" | "error";

export interface ToastOptions {
  description?: string;
  /** override the default icon (pass null to hide completely) */
  icon?: React.ReactNode | null;
  /** optional dismiss delay (ms). 0 = keep until user closes */
  duration?: number;
}

/* ――――――――― Variant-level tokens ――――――――― */
const map = {
  success: {
    icon: null,
    bg: "bg-background-primary-default dark:bg-background-primary-default",
    text: "text-[#84CC16] dark:text-[#84CC16]",
    border: "border-[#84CC16] dark:border-[#84CC16]",
  },
  warning: {
    icon: null,
    bg: "bg-background-primary-default dark:bg-background-primary-default",
    text: "text-text-brand-default dark:text-text-brand-default",
    border: "border-border-brand-default dark:border-border-brand-default",
  },
  error: {
    icon: null,
    bg: "bg-background-primary-default dark:bg-background-primary-default",
    text: "text-text-destructive-default dark:text-text-destructive-default",
    border:
      "border-border-destructive-default dark:border-border-destructive-default",
  },
} as const;

/* ――――――――― Re-usable <ToastCard /> ――――――――― */
interface ToastCardProps extends ToastOptions {
  id: string | number;
  variant: ToastVariant;
  title: string;
}

function ToastCard({ id, variant, title, description, icon }: ToastCardProps) {
  const v = map[variant];

  return (
    <div
      className={`flex w-full max-w-[364px] items-start gap-3 rounded-md p-4 shadow-lg ring-1 ring-black/5 border-1 ${v.border} ${v.bg}`}
    >
      {icon === null ? null : icon ?? v.icon}
      <div className="flex-1">
        <p className={`text-sm font-medium ${v.text}`}>{title}</p>
        {description && (
          <p className={`mt-1 text-sm text-text-primary-default`}>
            {description}
          </p>
        )}
      </div>
      <button
        onClick={() => sonnerToast.dismiss(id)}
        className="ml-3 text-xs font-semibold opacity-70 hover:opacity-100 focus:outline-none"
      >
        ×
      </button>
    </div>
  );
}

/* ――――――――― Factory for each variant ――――――――― */
function build(variant: ToastVariant) {
  return (title: string, opts: ToastOptions = {}) =>
    sonnerToast.custom(
      (id) => <ToastCard id={id} variant={variant} title={title} {...opts} />,
      { duration: opts.duration }
    );
}

/* ――――――――― Public API ――――――――― */
export const toast = {
  success: build("success"),
  warning: build("warning"),
  error: build("error"),
  dismiss: sonnerToast.dismiss,
};
