import type { ComponentProps, ReactNode } from "react"

import { cn } from "../lib/utils"
import { Sparkline } from "./sparkline"

type KpiDeltaTone = "positive" | "negative" | "neutral"

type KpiCardProps = Omit<ComponentProps<"div">, "children"> & {
  label: string
  value: ReactNode
  delta?: string
  deltaTone?: KpiDeltaTone
  hint?: ReactNode
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
  hint,
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
        "flex min-h-[132px] flex-col gap-2.5 rounded-[var(--radius-lg)] border border-border bg-card p-4 shadow-[var(--shadow-card)]",
        className,
      )}
      {...props}
    >
      <div className="flex items-baseline justify-between">
        <div className="font-mono font-semibold text-[11px] text-muted-foreground uppercase tracking-wider">
          {label}
        </div>
        {delta && (
          <span
            className="font-mono font-semibold text-[11px]"
            style={{ color: deltaColor[deltaTone] }}
          >
            {delta}
          </span>
        )}
      </div>
      <div className="font-semibold text-[26px] leading-none tracking-tight">{value}</div>
      {hint && <div className="text-muted-foreground text-xs">{hint}</div>}
      {sparkline && <Sparkline points={sparkline} color={sparklineColor} fill={sparklineFill} />}
    </div>
  )
}

export type { KpiCardProps, KpiDeltaTone }
export { KpiCard }
