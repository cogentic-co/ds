import type { ComponentProps } from "react"

import { RingCard } from "../components/ring-card"
import { cn } from "../lib/utils"

type RiskExposureCardProps = Omit<ComponentProps<"div">, "children"> & {
  value: string
  delta?: string
  deltaTone?: "positive" | "negative" | "neutral"
  bars: number[]
  /** Index of the bar to highlight/animate. Defaults to second-to-last. */
  activeIndex?: number
  rangeStart?: string
  rangeEnd?: string
  title?: string
  subtitle?: string
}

const deltaColor: Record<NonNullable<RiskExposureCardProps["deltaTone"]>, string> = {
  positive: "var(--success)",
  negative: "var(--destructive)",
  neutral: "var(--muted-foreground)",
}

function RiskExposureCard({
  value,
  delta,
  deltaTone = "positive",
  bars,
  activeIndex,
  rangeStart,
  rangeEnd,
  title = "Risk exposure",
  subtitle = "Flagged value across open cases",
  className,
  ...props
}: RiskExposureCardProps) {
  const active = activeIndex ?? bars.length - 2
  const max = Math.max(...bars) || 1

  return (
    <RingCard className={cn(className)} {...props}>
      <div className="font-semibold text-sm">{title}</div>
      <div className="mt-0.5 text-[13px] text-muted-foreground">{subtitle}</div>

      <div className="mt-3.5 flex items-baseline gap-2">
        <div
          className="font-semibold"
          style={{ fontSize: 28, letterSpacing: "-0.02em" }}
        >
          {value}
        </div>
        {delta && (
          <div
            className="font-mono font-semibold text-xs"
            style={{ color: deltaColor[deltaTone] }}
          >
            {delta}
          </div>
        )}
      </div>

      <div className="mt-2.5 flex h-[60px] items-end gap-[3px]">
        {bars.map((h, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: fixed-order chart bars
            key={i}
            className={cn(
              "flex-1 rounded-t-[3px]",
              i === active && "bar-breathe",
            )}
            style={{
              height: `${(h / max) * 100}%`,
              background:
                i === active
                  ? "var(--primary)"
                  : "color-mix(in oklab, var(--primary) 35%, var(--muted))",
              transformOrigin: "bottom",
            }}
          />
        ))}
      </div>
      {(rangeStart || rangeEnd) && (
        <div className="mt-1.5 flex justify-between font-mono text-[11px] text-muted-foreground">
          <span>{rangeStart}</span>
          <span>{rangeEnd}</span>
        </div>
      )}
    </RingCard>
  )
}

export { RiskExposureCard }
export type { RiskExposureCardProps }
