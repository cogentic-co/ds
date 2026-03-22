"use client"

import type { ComponentProps } from "react"
import { cn } from "../lib/utils"

// ---------------------------------------------------------------------------
// WorkflowLabel — floating annotation for edges or canvas areas
// ---------------------------------------------------------------------------

type WorkflowLabelProps = ComponentProps<"div"> & {
  variant?: "default" | "success" | "warning" | "error" | "muted"
}

const variantClasses: Record<NonNullable<WorkflowLabelProps["variant"]>, string> = {
  default: "bg-card text-foreground ring-border",
  success:
    "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-800",
  warning:
    "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-800",
  error:
    "bg-red-50 text-red-700 ring-red-200 dark:bg-red-950/40 dark:text-red-300 dark:ring-red-800",
  muted: "bg-muted text-muted-foreground ring-border",
}

function WorkflowLabel({ variant = "default", className, ...props }: WorkflowLabelProps) {
  return (
    <div
      data-slot="workflow-label"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-semibold text-[11px] shadow-sm ring-1",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  )
}

export { WorkflowLabel }
export type { WorkflowLabelProps }
