import { CheckIcon } from "lucide-react"
import type * as React from "react"
import { cn } from "../lib/utils"

type StepStatus = "complete" | "current" | "upcoming"

type StepperProps = React.ComponentProps<"nav">

function Stepper({ className, children, ...props }: StepperProps) {
  return (
    <nav data-slot="stepper" aria-label="Progress" className={className} {...props}>
      <ol className="flex items-center gap-2">{children}</ol>
    </nav>
  )
}

type StepProps = React.ComponentProps<"li"> & {
  status?: StepStatus
  /** Step number (1-based) */
  index?: number
}

function Step({ status = "upcoming", index, className, children, ...props }: StepProps) {
  return (
    <li
      data-slot="step"
      data-status={status}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full border-2 font-medium text-xs transition-colors",
          status === "complete" && "border-primary bg-primary text-primary-foreground",
          status === "current" && "border-primary text-primary",
          status === "upcoming" && "border-muted-foreground/30 text-muted-foreground",
        )}
      >
        {status === "complete" ? <CheckIcon className="size-4" /> : index}
      </span>
      <span className={cn("font-medium text-sm", status === "upcoming" && "text-muted-foreground")}>
        {children}
      </span>
    </li>
  )
}

type StepSeparatorProps = React.ComponentProps<"div">

function StepSeparator({ className, ...props }: StepSeparatorProps) {
  return (
    <div
      data-slot="step-separator"
      className={cn("h-px flex-1 bg-border", className)}
      aria-hidden
      {...props}
    />
  )
}

export { Stepper, Step, StepSeparator }
export type { StepperProps, StepProps, StepStatus, StepSeparatorProps }
