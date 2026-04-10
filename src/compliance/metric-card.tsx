"use client"

import { TrendingDown, TrendingUp } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"
import { cn } from "../lib/utils"

type MetricCardProps = ComponentProps<"div"> & {
  label: string
  value: string | number
  /** Trend description (e.g. "+12% vs last week") */
  trend?: string
  /** Trend direction for coloring */
  trendDirection?: "up" | "down" | "neutral"
  /** Whether "up" is good (green) or bad (red). Default: true (up = good) */
  upIsGood?: boolean
  /** Icon rendered to the left of the label */
  icon?: ReactNode
  /** Extra content below the value (e.g. a sparkline, progress bar) */
  children?: ReactNode
}

function MetricCard({
  label,
  value,
  trend,
  trendDirection,
  upIsGood = true,
  icon,
  children,
  className,
  ...props
}: MetricCardProps) {
  const trendColor =
    !trendDirection || trendDirection === "neutral"
      ? "text-muted-foreground"
      : (trendDirection === "up") === upIsGood
        ? "text-emerald-700 dark:text-emerald-400"
        : "text-red-700 dark:text-red-400"

  return (
    <div
      data-slot="metric-card"
      className={cn(
        "flex flex-col gap-2 rounded-xl border border-border bg-card p-4",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2 text-muted-foreground text-xs">
        {icon && <span className="[&>svg]:size-3.5">{icon}</span>}
        <span>{label}</span>
      </div>
      <div className="flex items-end justify-between gap-2">
        <span className="font-mono font-semibold text-2xl tabular-nums">{value}</span>
        {trend && (
          <span className={cn("flex items-center gap-0.5 font-medium text-xs", trendColor)}>
            {trendDirection === "up" && <TrendingUp className="size-3" />}
            {trendDirection === "down" && <TrendingDown className="size-3" />}
            {trend}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}

export { MetricCard }
export type { MetricCardProps }
