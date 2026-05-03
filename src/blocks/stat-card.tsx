import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"
import type * as React from "react"

import { cn } from "../lib/utils"

type StatCardProps = Omit<React.ComponentProps<"div">, "children"> & {
  label: string
  value: string | number
  description?: string
  trend?: string
  trendDirection?: "up" | "down" | "neutral"
  icon?: React.ReactNode
}

const TREND_COLOR: Record<NonNullable<StatCardProps["trendDirection"]>, string> = {
  up: "text-success",
  down: "text-destructive",
  neutral: "text-muted-foreground",
}

function StatCard({
  label,
  value,
  description,
  trend,
  trendDirection,
  icon,
  className,
  ...props
}: StatCardProps) {
  return (
    <div
      data-slot="stat-card"
      className={cn("rounded-md border border-border bg-card p-4 shadow-card", className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono font-semibold text-muted-foreground text-xxs uppercase tracking-uppercase">
          {label}
        </span>
        {icon && <span className="text-muted-foreground [&>svg]:size-4">{icon}</span>}
      </div>
      <div
        className="mt-1 font-mono font-semibold tabular-nums"
        style={{ fontSize: 22, letterSpacing: "-0.02em" }}
      >
        {value}
      </div>
      {(description || trend) && (
        <div className="mt-1 flex items-center gap-1.5 text-muted-foreground text-xs">
          {trend && trendDirection && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 font-mono font-semibold",
                TREND_COLOR[trendDirection],
              )}
            >
              {trendDirection === "up" && <TrendingUpIcon className="size-3" />}
              {trendDirection === "down" && <TrendingDownIcon className="size-3" />}
              {trend}
            </span>
          )}
          {description && <span>{description}</span>}
        </div>
      )}
    </div>
  )
}

export type { StatCardProps }
export { StatCard }
