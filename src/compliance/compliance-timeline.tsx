"use client"

import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps, ReactNode } from "react"
import { cn } from "../lib/utils"

type TimelineStepStatus = "completed" | "current" | "upcoming" | "warning" | "rejected"

const dotVariants = cva(
  "relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border-2 bg-card",
  {
    variants: {
      status: {
        completed: "border-emerald-700 bg-emerald-700 text-white dark:border-emerald-400 dark:bg-emerald-400 dark:text-black",
        current: "border-[#3B50A8] bg-card text-[#3B50A8] dark:border-[#8DA0FF] dark:text-[#8DA0FF]",
        upcoming: "border-border bg-card text-muted-foreground",
        warning: "border-amber-700 bg-amber-700/15 text-amber-700 dark:border-amber-400 dark:bg-amber-400/15 dark:text-amber-400",
        rejected: "border-red-700 bg-red-700/15 text-red-700 dark:border-red-400 dark:bg-red-400/15 dark:text-red-400",
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
  if (status === "completed") return "bg-emerald-700 dark:bg-emerald-400"
  if (status === "warning") return "bg-amber-700 dark:bg-amber-400"
  if (status === "rejected") return "bg-red-700 dark:bg-red-400"
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
          <div key={step.id} className="relative flex gap-3 pb-6 last:pb-0">
            <div className="flex flex-col items-center">
              <span className={dotVariants({ status: step.status })}>
                {step.icon ?? (
                  <span
                    className={cn(
                      "size-2 rounded-full",
                      step.status === "completed" && "bg-white dark:bg-black",
                      step.status === "current" && "bg-[#3B50A8] dark:bg-[#8DA0FF]",
                      step.status === "upcoming" && "bg-muted-foreground/40",
                      step.status === "warning" && "bg-amber-700 dark:bg-amber-400",
                      step.status === "rejected" && "bg-red-700 dark:bg-red-400",
                    )}
                  />
                )}
              </span>
              {!isLast && (
                <div className={cn("mt-0 w-px flex-1", lineColor(step.status))} />
              )}
            </div>
            <div className="flex min-w-0 flex-col pt-0.5">
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
                <span className="mt-0.5 font-mono text-muted-foreground/70 text-[11px]">
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

export { ComplianceTimeline }
export type { ComplianceTimelineProps, ComplianceTimelineStep }
