import type { ComponentProps } from "react"

import { RingCard } from "../components/ring-card"
import { cn } from "../lib/utils"

type RiskBreakdownItem = {
  label: string
  value: string
  tone: "destructive" | "highlight" | "muted" | "sky" | "lilac" | "mint" | "blush"
}

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
  /** Breakdown rows shown below the chart (dot + label + amount). */
  breakdown?: RiskBreakdownItem[]
  breakdownLabel?: string
}

const deltaColor: Record<NonNullable<RiskExposureCardProps["deltaTone"]>, string> = {
  positive: "var(--success)",
  negative: "var(--destructive)",
  neutral: "var(--muted-foreground)",
}

const breakdownColor: Record<RiskBreakdownItem["tone"], string> = {
  destructive: "var(--destructive)",
  highlight: "var(--highlight-ink)",
  muted: "var(--muted-foreground)",
  sky: "var(--sky-ink)",
  lilac: "var(--lilac-ink)",
  mint: "var(--mint-ink)",
  blush: "var(--blush-ink)",
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
  breakdown,
  breakdownLabel = "Risk breakdown",
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

      {breakdown && breakdown.length > 0 && (
        <>
          <div className="mt-3 mb-2 border-border border-t border-dashed pt-3 font-mono font-semibold text-[11px] text-muted-foreground uppercase tracking-[0.08em]">
            {breakdownLabel}
          </div>
          <div className="grid gap-1.5">
            {breakdown.map((b) => (
              <div
                key={b.label}
                className="flex items-center justify-between text-[13px]"
              >
                <span className="flex items-center gap-2 font-medium">
                  <span
                    className="inline-block size-1.5 rounded-[2px]"
                    style={{ background: breakdownColor[b.tone] }}
                  />
                  {b.label}
                </span>
                <span className="font-mono font-semibold">{b.value}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </RingCard>
  )
}

export { RiskExposureCard }
export type { RiskExposureCardProps, RiskBreakdownItem }
