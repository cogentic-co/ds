"use client"

import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps, ReactNode } from "react"
import { cn } from "../lib/utils"

type TimelineStepStatus = "completed" | "current" | "upcoming" | "warning" | "rejected"

const dotVariants = cva(
  "relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border-2",
  {
    variants: {
      status: {
        completed: "border-[var(--mint-ink)] bg-[var(--mint-ink)] text-[var(--mint)]",
        current: "border-[var(--sky-ink)] bg-card text-[var(--sky-ink)]",
        upcoming: "border-border bg-card text-muted-foreground",
        warning: "border-[var(--highlight-ink)] bg-highlight text-[var(--highlight-ink)]",
        rejected: "border-[var(--blush-ink)] bg-blush text-[var(--blush-ink)]",
      },
    },
    defaultVariants: { status: "upcoming" },
  },
)

type ComplianceTimelineStep = {
  id: string
  label: string
  description?: string
  timestamp?: string
  status: TimelineStepStatus
  icon?: ReactNode
}

type ComplianceTimelineProps = ComponentProps<"div"> & {
  steps: ComplianceTimelineStep[]
}

function lineColor(status: TimelineStepStatus) {
  if (status === "completed") return "bg-[var(--mint-ink)]"
  if (status === "warning") return "bg-[var(--highlight-ink)]"
  if (status === "rejected") return "bg-[var(--blush-ink)]"
  return "bg-border"
}

function ComplianceTimeline({ steps, className, ...props }: ComplianceTimelineProps) {
  return (
    <div
      data-slot="compliance-timeline"
      className={cn("relative flex flex-col", className)}
      {...props}
    >
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1

        return (
          <div key={step.id} className="relative flex gap-3">
            <div className="relative flex flex-col items-center">
              <span className={dotVariants({ status: step.status })}>
                {step.icon ?? (
                  <span
                    className={cn(
                      "size-2 rounded-full",
                      step.status === "completed" && "bg-[var(--mint)]",
                      step.status === "current" && "bg-[var(--sky-ink)]",
                      step.status === "upcoming" && "bg-muted-foreground/40",
                      step.status === "warning" && "bg-[var(--highlight-ink)]",
                      step.status === "rejected" && "bg-[var(--blush-ink)]",
                    )}
                  />
                )}
              </span>
              {!isLast && (
                <div
                  className={cn(
                    "absolute top-6 bottom-0 left-1/2 w-px -translate-x-1/2",
                    lineColor(step.status),
                  )}
                />
              )}
            </div>
            <div className={cn("flex min-w-0 flex-col pt-0.5", !isLast && "pb-6")}>
              <span
                className={cn(
                  "font-medium text-sm leading-tight",
                  step.status === "upcoming" ? "text-muted-foreground" : "text-foreground",
                )}
              >
                {step.label}
              </span>
              {step.description && (
                <span className="mt-0.5 text-muted-foreground text-xs">{step.description}</span>
              )}
              {step.timestamp && (
                <span className="mt-0.5 font-mono text-[11px] text-muted-foreground/70">
                  {step.timestamp}
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export type { ComplianceTimelineProps, ComplianceTimelineStep }
export { ComplianceTimeline }
