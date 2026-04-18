import type { ComponentProps } from "react"

import { RingCard } from "../components/ring-card"
import { cn } from "../lib/utils"

type Counterparty = {
  name: string
  value: string
  direction: "in" | "out"
}

type TransactionFlowCardProps = Omit<ComponentProps<"div">, "children"> & {
  inboundUsd: string
  outboundUsd: string
  unattributedUsd?: string
  inboundPct: number
  outboundPct: number
  unattributedPct?: number
  topCounterparties?: Counterparty[]
  title?: string
  subtitle?: string
  /** Mute an otherwise-active segment animation. */
  disableAnimation?: boolean
}

function TransactionFlowCard({
  inboundUsd,
  outboundUsd,
  inboundPct,
  outboundPct,
  unattributedPct = 0,
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

      <div className="flex gap-1 border-border border-b border-dashed pb-3">
        <div style={{ width: `${inboundPct}%` }}>
          <div className="font-semibold text-xl">{inboundUsd}</div>
          <div className="text-[13px] text-muted-foreground">Inbound</div>
        </div>
        <div style={{ width: `${100 - inboundPct}%` }}>
          <div className="font-semibold text-xl">{outboundUsd}</div>
          <div className="text-[13px] text-muted-foreground">Outbound</div>
        </div>
      </div>

      {topCounterparties.length > 0 && (
        <>
          <div className="mt-2.5 mb-2 font-mono font-semibold text-[11px] text-muted-foreground uppercase tracking-[0.08em]">
            Top counterparties
          </div>
          <div className="grid gap-1">
            {topCounterparties.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-xs">
                <span className="font-medium">{c.name}</span>
                <span
                  className="font-mono font-semibold"
                  style={{
                    color:
                      c.direction === "in"
                        ? "var(--success)"
                        : "var(--foreground)",
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

export { TransactionFlowCard }
export type { TransactionFlowCardProps }
