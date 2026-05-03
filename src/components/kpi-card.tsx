import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"

import { cn } from "../lib/utils"
import { Sparkline } from "./sparkline"

type KpiDeltaTone = "positive" | "negative" | "neutral"

type KpiCardProps = Omit<ComponentProps<"div">, "children"> & {
  label: string
  value: ReactNode
  delta?: string
  deltaTone?: KpiDeltaTone
  /** Adds a trend arrow before `delta` based on `deltaTone`. */
  deltaArrow?: boolean
  hint?: ReactNode
  /** Trailing icon shown next to the label. */
  icon?: ReactNode
  sparkline?: number[]
  sparklineColor?: string
  sparklineFill?: boolean
}

const deltaColor: Record<KpiDeltaTone, string> = {
  positive: "var(--success)",
  negative: "var(--destructive)",
  neutral: "var(--muted-foreground)",
}

function KpiCard({
  label,
  value,
  delta,
  deltaTone = "positive",
  deltaArrow = false,
  hint,
  icon,
  sparkline,
  sparklineColor = "var(--focal)",
  sparklineFill = true,
  className,
  ...props
}: KpiCardProps) {
  return (
    <div
      data-slot="kpi-card"
      className={cn(
        "flex min-h-[132px] flex-col gap-2.5 rounded-lg border border-border bg-card p-4 shadow-card",
        className,
      )}
      {...props}
    >
      <div className="flex items-baseline justify-between">
        <div className="font-mono font-semibold text-muted-foreground text-xxs uppercase tracking-wider">
          {label}
        </div>
        {icon && (
          <span data-slot="kpi-card-icon" className="text-muted-foreground [&>svg]:size-4">
            {icon}
          </span>
        )}
        {delta && !icon && (
          <span
            className="inline-flex items-center gap-0.5 font-mono font-semibold text-xxs"
            style={{ color: deltaColor[deltaTone] }}
          >
            {deltaArrow && deltaTone === "positive" && <TrendingUpIcon className="size-3" />}
            {deltaArrow && deltaTone === "negative" && <TrendingDownIcon className="size-3" />}
            {delta}
          </span>
        )}
      </div>
      <div className="font-semibold text-stat leading-none tracking-tight">{value}</div>
      {hint && <div className="text-muted-foreground text-xs">{hint}</div>}
      {delta && icon && (
        <span
          className="inline-flex items-center gap-0.5 font-mono font-semibold text-xxs"
          style={{ color: deltaColor[deltaTone] }}
        >
          {deltaArrow && deltaTone === "positive" && <TrendingUpIcon className="size-3" />}
          {deltaArrow && deltaTone === "negative" && <TrendingDownIcon className="size-3" />}
          {delta}
        </span>
      )}
      {sparkline && (
        <Sparkline
          className="mt-auto"
          points={sparkline}
          color={sparklineColor}
          fill={sparklineFill}
        />
      )}
    </div>
  )
}

export type { KpiCardProps, KpiDeltaTone }
export { KpiCard }
