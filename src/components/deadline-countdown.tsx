"use client"

import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { cn } from "../lib/utils"

type Urgency = "normal" | "warning" | "critical" | "overdue"

const deadlineCountdownVariants = cva("inline-flex items-center gap-1.5 font-medium text-sm", {
  variants: {
    urgency: {
      normal: "text-muted-foreground",
      warning: "text-amber-600 dark:text-amber-400",
      critical: "text-red-600 dark:text-red-400",
      overdue: "text-destructive",
    },
  },
  defaultVariants: {
    urgency: "normal",
  },
})

type DeadlineCountdownProps = Omit<React.ComponentProps<"span">, "children"> &
  Omit<VariantProps<typeof deadlineCountdownVariants>, "urgency"> & {
    /** The deadline date */
    deadline: Date
    /** Override auto-detected urgency */
    urgency?: Urgency
    /** Days threshold for "warning" state. Defaults to 7. */
    warningDays?: number
    /** Days threshold for "critical" state. Defaults to 2. */
    criticalDays?: number
    /** Optional label prefix (e.g. "Due in") */
    label?: string
    /** Whether to show the dot indicator. Defaults to true. */
    showDot?: boolean
  }

function getAutoUrgency(deadline: Date, warningDays: number, criticalDays: number): Urgency {
  const now = new Date()
  const diff = deadline.getTime() - now.getTime()
  const days = diff / (1000 * 60 * 60 * 24)

  if (days < 0) return "overdue"
  if (days <= criticalDays) return "critical"
  if (days <= warningDays) return "warning"
  return "normal"
}

function formatTimeRemaining(deadline: Date): string {
  const now = new Date()
  const diff = deadline.getTime() - now.getTime()

  if (diff < 0) {
    const absDiff = Math.abs(diff)
    const days = Math.floor(absDiff / (1000 * 60 * 60 * 24))
    if (days > 0) return `${days}d overdue`
    const hours = Math.floor(absDiff / (1000 * 60 * 60))
    if (hours > 0) return `${hours}h overdue`
    return "Just overdue"
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

  if (days > 0) return `${days}d ${hours}h`
  if (hours > 0) return `${hours}h`
  const mins = Math.floor(diff / (1000 * 60))
  return `${mins}m`
}

const dotColors: Record<Urgency, string> = {
  normal: "bg-muted-foreground/40",
  warning: "bg-amber-500",
  critical: "bg-red-500 animate-pulse",
  overdue: "bg-destructive animate-pulse",
}

function DeadlineCountdown({
  deadline,
  urgency: urgencyOverride,
  warningDays = 7,
  criticalDays = 2,
  label,
  showDot = true,
  className,
  ...props
}: DeadlineCountdownProps) {
  // Re-render every 60s so the displayed time stays current
  const [, setTick] = React.useState(0)
  React.useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60_000)
    return () => clearInterval(id)
  }, [])

  const urgency = urgencyOverride ?? getAutoUrgency(deadline, warningDays, criticalDays)
  const timeText = formatTimeRemaining(deadline)

  return (
    <span
      data-slot="deadline-countdown"
      aria-live="polite"
      aria-atomic="true"
      className={cn(deadlineCountdownVariants({ urgency }), className)}
      {...props}
    >
      {showDot && <span className={cn("size-2 shrink-0 rounded-full", dotColors[urgency])} />}
      {label && <span>{label}</span>}
      <span>{timeText}</span>
    </span>
  )
}

export { DeadlineCountdown, deadlineCountdownVariants }
export type { DeadlineCountdownProps, Urgency }
