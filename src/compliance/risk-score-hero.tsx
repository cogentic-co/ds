import { AlertTriangle } from "lucide-react"
import type { ComponentProps } from "react"

import { RingCard } from "../components/ring-card"
import { cn } from "../lib/utils"
import type { RiskDriver } from "./types"

type RiskScoreHeroProps = Omit<ComponentProps<"div">, "children"> & {
  score: number
  scale?: number
  drivers: RiskDriver[]
  headline?: string
}

const driverColor: Record<RiskDriver["variant"], string> = {
  blush: "var(--blush-ink)",
  highlight: "var(--highlight-ink)",
  sky: "var(--sky-ink)",
  lilac: "var(--lilac-ink)",
}

function tier(score: number) {
  if (score >= 75) return { label: "Needs review", tone: "blush" as const }
  if (score >= 40) return { label: "Watch", tone: "highlight" as const }
  return { label: "Low risk", tone: "mint" as const }
}

function RiskScoreHero({
  score,
  scale = 100,
  drivers,
  headline,
  className,
  ...props
}: RiskScoreHeroProps) {
  const totalW = drivers.reduce((s, d) => s + d.weight, 0) || 1
  const scoreColor =
    score >= 75 ? "var(--destructive)" : score >= 40 ? "var(--highlight-ink)" : "var(--success)"
  const { label, tone } = tier(score)

  return (
    <RingCard solid data-slot="risk-score-hero" className={cn(className)} {...props}>
      <div className="flex flex-wrap items-start gap-6">
        <div className="shrink-0">
          <div className="font-medium text-[11px] text-muted-foreground uppercase tracking-wider">
            Risk score
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span
              className="font-mono font-semibold leading-none"
              style={{
                fontSize: 56,
                color: scoreColor,
                letterSpacing: "-0.03em",
              }}
            >
              {score}
            </span>
            <span className="font-medium text-lg text-muted-foreground">/{scale}</span>
          </div>
          <div
            className="mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-semibold text-xs"
            style={{
              background: `color-mix(in oklab, var(--${tone}) 70%, transparent)`,
              color: `var(--${tone}-ink)`,
            }}
          >
            <AlertTriangle className="size-3" />
            {headline ?? label}
          </div>
        </div>

        <div className="min-w-[280px] flex-1">
          <div className="mb-2.5 font-semibold text-[13px]">What drives this score</div>
          {drivers.map((d) => (
            <div
              key={d.label}
              className="grid grid-cols-[1fr_120px_40px] items-center gap-2.5 py-1.5"
            >
              <span className="text-[13px]">{d.label}</span>
              <span className="h-1.5 overflow-hidden rounded-full bg-muted">
                <span
                  className="block h-full opacity-85"
                  style={{
                    width: `${(d.weight / totalW) * 100}%`,
                    background: driverColor[d.variant],
                  }}
                />
              </span>
              <span className="text-right font-mono text-muted-foreground text-xs">
                +{d.weight}
              </span>
            </div>
          ))}
        </div>
      </div>
    </RingCard>
  )
}

export type { RiskScoreHeroProps }
export { RiskScoreHero }
