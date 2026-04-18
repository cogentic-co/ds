"use client"

import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps, ReactNode } from "react"
import { cn } from "../lib/utils"

const workflowGroupVariants = cva(
  ["relative rounded-2xl border-2 border-dashed p-4 pt-8", "transition-shadow duration-150"].join(
    " ",
  ),
  {
    variants: {
      variant: {
        default: "border-border/50 bg-muted/20",
        primary: "border-primary/30 bg-primary/5",
        success: "border-emerald-400/30 bg-emerald-50/30 dark:bg-emerald-950/10",
        warning: "border-amber-400/30 bg-amber-50/30 dark:bg-amber-950/10",
      },
      selected: {
        true: "border-primary/60 shadow-md",
        false: "",
      },
    },
    defaultVariants: { variant: "default", selected: false },
  },
)

type WorkflowGroupProps = ComponentProps<"div"> &
  VariantProps<typeof workflowGroupVariants> & {
    /** Title shown at the top of the group */
    label?: ReactNode
    /** Icon shown before the label */
    icon?: ReactNode
  }

function WorkflowGroup({
  variant,
  selected,
  label,
  icon,
  className,
  children,
  ...props
}: WorkflowGroupProps) {
  return (
    <div
      data-slot="workflow-group"
      className={cn(workflowGroupVariants({ variant, selected }), className)}
      {...props}
    >
      {(label || icon) && (
        <div className="absolute -top-3 left-4 inline-flex items-center gap-1.5 rounded-md bg-card px-2.5 py-1 font-semibold text-muted-foreground text-xs shadow-sm ring-1 ring-border">
          {icon && <span className="[&>svg]:size-3.5">{icon}</span>}
          {label}
        </div>
      )}
      {children}
    </div>
  )
}

export type { WorkflowGroupProps }
export { WorkflowGroup, workflowGroupVariants }
