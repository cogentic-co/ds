import { cva, type VariantProps } from "class-variance-authority"
import { CheckIcon } from "lucide-react"
import type * as React from "react"
import { cn } from "../lib/utils"

type StepProgressStatus = "complete" | "current" | "upcoming"

const stepProgressVariants = cva("", {
  variants: {
    orientation: {
      horizontal: "flex w-full items-start",
      vertical: "flex flex-col",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
})

type StepProgressProps = React.ComponentProps<"div"> & VariantProps<typeof stepProgressVariants>

function StepProgress({ orientation, className, ...props }: StepProgressProps) {
  return (
    <div
      data-slot="step-progress"
      data-orientation={orientation ?? "vertical"}
      role="list"
      className={cn(stepProgressVariants({ orientation }), className)}
      {...props}
    />
  )
}

type StepProgressItemProps = React.ComponentProps<"div"> & {
  status?: StepProgressStatus
}

function StepProgressItem({ status = "upcoming", className, ...props }: StepProgressItemProps) {
  return (
    <div
      data-slot="step-progress-item"
      data-status={status}
      role="listitem"
      aria-current={status === "current" ? "step" : undefined}
      className={cn(
        "relative flex",
        // Vertical: row layout, bottom padding
        "[[data-orientation='vertical']_&]:gap-3 [[data-orientation='vertical']_&]:pb-8 [[data-orientation='vertical']_&]:last:pb-0",
        // Horizontal: column layout, flex-1 to share space
        "[[data-orientation='horizontal']_&]:flex-1 [[data-orientation='horizontal']_&]:flex-col [[data-orientation='horizontal']_&]:items-center [[data-orientation='horizontal']_&]:gap-2",
        className,
      )}
      {...props}
    />
  )
}

const indicatorStyles: Record<StepProgressStatus, string> = {
  complete: "border-emerald-500 bg-emerald-500 text-white",
  current: "border-primary bg-primary text-primary-foreground",
  upcoming: "border-border bg-card text-muted-foreground",
}

type StepProgressIndicatorProps = React.ComponentProps<"div"> & {
  status?: StepProgressStatus
  step?: number
}

function StepProgressIndicator({
  status = "upcoming",
  step,
  className,
  ...props
}: StepProgressIndicatorProps) {
  return (
    <div
      data-slot="step-progress-indicator"
      className={cn(
        "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 font-semibold text-xs",
        indicatorStyles[status],
        className,
      )}
      {...props}
    >
      {status === "complete" ? <CheckIcon className="size-4" /> : step}
    </div>
  )
}

function StepProgressConnector({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="step-progress-connector"
      className={cn(
        // Vertical: line going down
        "[[data-orientation='vertical']_&]:absolute [[data-orientation='vertical']_&]:top-8 [[data-orientation='vertical']_&]:left-[15px] [[data-orientation='vertical']_&]:h-[calc(100%-2rem)] [[data-orientation='vertical']_&]:w-0.5",
        // Horizontal: line going right
        "[[data-orientation='horizontal']_&]:absolute [[data-orientation='horizontal']_&]:top-4 [[data-orientation='horizontal']_&]:left-[calc(50%+20px)] [[data-orientation='horizontal']_&]:h-0.5 [[data-orientation='horizontal']_&]:w-[calc(100%-40px)]",
        "bg-border",
        "[&[data-complete='true']]:bg-emerald-500",
        className,
      )}
      {...props}
    />
  )
}

function StepProgressContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="step-progress-content"
      className={cn(
        "min-w-0",
        "[[data-orientation='vertical']_&]:pt-1",
        "[[data-orientation='horizontal']_&]:text-center",
        className,
      )}
      {...props}
    />
  )
}

function StepProgressTitle({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="step-progress-title"
      className={cn("font-medium text-sm", className)}
      {...props}
    />
  )
}

function StepProgressDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="step-progress-description"
      className={cn("text-muted-foreground text-xs", className)}
      {...props}
    />
  )
}

export type {
  StepProgressIndicatorProps,
  StepProgressItemProps,
  StepProgressProps,
  StepProgressStatus,
}
export {
  StepProgress,
  StepProgressConnector,
  StepProgressContent,
  StepProgressDescription,
  StepProgressIndicator,
  StepProgressItem,
  StepProgressTitle,
  stepProgressVariants,
}
