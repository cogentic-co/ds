import type { ComponentProps } from "react"

import { RingCard } from "../components/ring-card"
import { cn } from "../lib/utils"

type Counterparty = {
  name: string
  value: string
  direction: "in" | "out"
}

type FlowCategory = {
  label: string
  /** Percent share (numerator only — just the label text). */
  percent: number
  /** Optional trailing metadata (e.g. "avg 4.2 min"). */
  hint?: string
  /** Dot color — defaults to foreground for solid, muted for secondary categories. */
  tone?: "solid" | "muted"
  /** When true, the dot pulses (signals the live / active category). */
  pulse?: boolean
}

type TransactionFlowCardProps = Omit<ComponentProps<"div">, "children"> & {
  inboundUsd: string
  outboundUsd: string
  inboundPct: number
  outboundPct: number
  unattributedPct?: number
  /** Category legend rendered under the split stats (e.g. Exchange / OTC). */
  categories?: FlowCategory[]
  topCounterparties?: Counterparty[]
  title?: string
  subtitle?: string
  /** Mute the active segment's breathe animation. */
  disableAnimation?: boolean
}

function TransactionFlowCard({
  inboundUsd,
  outboundUsd,
  inboundPct,
  outboundPct,
  unattributedPct = 0,
  categories,
  topCounterparties = [],
  title = "Transaction flow",
  subtitle = "24h inbound vs outbound volume",
  disableAnimation = false,
  className,
  ...props
}: TransactionFlowCardProps) {
  return (
    <RingCard className={cn(className)} {...props}>
      <div className="font-semibold text-sm">{title}</div>
      <div className="mt-0.5 text-[13px] text-muted-foreground">{subtitle}</div>

      {/* Stacked bar */}
      <div className="relative mt-4 mb-3.5 flex overflow-hidden rounded-[6px] border border-[color-mix(in_oklab,var(--border)_60%,transparent)]">
        <div
          className="h-5"
          style={{
            width: `${inboundPct}%`,
            background: "color-mix(in oklab, var(--foreground) 50%, var(--primary))",
          }}
        />
        <div
          className={cn("h-5", !disableAnimation && "bar-breathe")}
          style={{
            width: `${outboundPct}%`,
            background: "var(--primary)",
          }}
        />
        {unattributedPct > 0 && (
          <div className="bar-diag h-5" style={{ width: `${unattributedPct}%` }} />
        )}
      </div>

      {/* Split stats */}
      <div
        className={cn(
          "flex gap-1 pb-3",
          (categories?.length || topCounterparties.length) &&
            "border-border border-b border-dashed",
        )}
      >
        <div style={{ width: `${inboundPct}%` }}>
          <div className="font-semibold text-xl">{inboundUsd}</div>
          <div className="text-[13px] text-muted-foreground">Inbound</div>
        </div>
        <div style={{ width: `${100 - inboundPct}%` }}>
          <div className="font-semibold text-xl">{outboundUsd}</div>
          <div className="text-[13px] text-muted-foreground">Outbound</div>
        </div>
      </div>

      {/* Category legend */}
      {categories && categories.length > 0 && (
        <div className={cn("mt-2.5 grid gap-1", topCounterparties.length > 0 && "pb-3")}>
          {categories.map((c) => (
            <div key={c.label} className="flex items-center gap-2">
              <span
                className={cn(
                  "inline-block size-1.5 shrink-0 rounded-full",
                  c.pulse && "pulse-dot",
                )}
                style={{
                  background: c.tone === "muted" ? "var(--muted-foreground)" : "var(--foreground)",
                }}
              />
              <span className="font-medium text-[13px]">
                {c.label} <span className="text-muted-foreground">({c.percent}%)</span>
                {c.hint && <span className="text-muted-foreground"> {c.hint}</span>}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Top counterparties */}
      {topCounterparties.length > 0 && (
        <>
          <div
            className={cn(
              "mb-2 font-mono font-semibold text-[11px] text-muted-foreground uppercase tracking-[0.08em]",
              categories && categories.length > 0
                ? "mt-3 border-border border-t border-dashed pt-3"
                : "mt-2.5",
            )}
          >
            Top counterparties
          </div>
          <div className="grid gap-1">
            {topCounterparties.map((c) => (
              <div
                key={c.name}
                className="flex min-w-0 items-center justify-between gap-3 text-[13px]"
              >
                <span className="min-w-0 truncate font-medium">{c.name}</span>
                <span
                  className="shrink-0 whitespace-nowrap font-mono font-semibold"
                  style={{
                    color: c.direction === "in" ? "var(--success)" : "var(--foreground)",
                  }}
                >
                  {c.direction === "in" ? "+" : "−"}
                  {c.value}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </RingCard>
  )
}

export type { FlowCategory, TransactionFlowCardProps }
export { TransactionFlowCard }
