"use client"

import type { ComponentProps, ReactNode } from "react"
import { Progress } from "../components/progress"
import { cn } from "../lib/utils"

type UsageMeterProps = ComponentProps<"div"> & {
  label: string
  /** Current usage value */
  used: number
  /** Quota / total available */
  limit: number
  /** Unit displayed after the numbers (e.g. "GB", "requests", "seats"). Optional. */
  unit?: string
  /** Threshold (0-1) at which the bar turns warning (amber). Default: 0.75 */
  warningAt?: number
  /** Threshold (0-1) at which the bar turns critical (red). Default: 0.9 */
  criticalAt?: number
  /** Optional CTA rendered on the right (e.g. "Upgrade") when near/over limit */
  cta?: ReactNode
  /** Optional description under the label */
  description?: ReactNode
}

function UsageMeter({
  label,
  used,
  limit,
  unit,
  warningAt = 0.75,
  criticalAt = 0.9,
  cta,
  description,
  className,
  ...props
}: UsageMeterProps) {
  const ratio = limit > 0 ? used / limit : 0
  const percent = Math.min(100, Math.max(0, Math.round(ratio * 100)))
  const tone = ratio >= criticalAt ? "critical" : ratio >= warningAt ? "warning" : "normal"

  const barClass =
    tone === "critical"
      ? "[&>div]:bg-blush-ink"
      : tone === "warning"
        ? "[&>div]:bg-highlight-ink"
        : "[&>div]:bg-focal"

  return (
    <div
      data-slot="usage-meter"
      data-tone={tone}
      className={cn(
        "flex flex-col gap-2 rounded-lg border border-border bg-card p-4 shadow-card",
        className,
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center justify-between gap-2">
            <span className="min-w-0 truncate font-medium text-sm">{label}</span>
            <span className="shrink-0 whitespace-nowrap font-mono text-muted-foreground text-xs tabular-nums">
              {used.toLocaleString()} / {limit.toLocaleString()}
              {unit && <span className="ml-0.5">{unit}</span>}
            </span>
          </div>
          {description && <p className="mt-0.5 text-muted-foreground text-xs">{description}</p>}
        </div>
        {tone !== "normal" && cta}
      </div>
      <Progress value={percent} className={cn("h-1.5", barClass)} />
    </div>
  )
}

export type { UsageMeterProps }
export { UsageMeter }
