import type { ComponentProps } from "react"

import { cn } from "../lib/utils"
import type { RelatedTx } from "./types"

type CounterpartyIntelStat = {
  label: string
  value: string
  hint?: string
}

type CounterpartyIntelProps = ComponentProps<"div"> & {
  title?: string
  firstSeen: string
  firstSeenHint?: string
  priorStats: CounterpartyIntelStat
  related?: RelatedTx[]
  relatedLabel?: string
}

function MiniStatCard({ label, value, hint }: CounterpartyIntelStat) {
  return (
    <div className="rounded-[var(--radius-md)] border border-border bg-card p-3.5">
      <div className="font-mono font-semibold text-[11px] text-muted-foreground uppercase tracking-[0.08em]">
        {label}
      </div>
      <div
        className="mt-1 font-mono font-semibold"
        style={{ fontSize: 18, letterSpacing: "-0.01em" }}
      >
        {value}
      </div>
      {hint && <div className="mt-1 text-[12px] text-muted-foreground">{hint}</div>}
    </div>
  )
}

function CounterpartyIntel({
  title = "Counterparty intel",
  firstSeen,
  firstSeenHint,
  priorStats,
  related = [],
  relatedLabel = "Related activity",
  className,
  ...props
}: CounterpartyIntelProps) {
  return (
    <div data-slot="counterparty-intel" className={cn(className)} {...props}>
      {title && <div className="mb-2.5 font-semibold text-sm">{title}</div>}

      <div className="grid grid-cols-2 gap-3">
        <MiniStatCard label="First seen" value={firstSeen} hint={firstSeenHint} />
        <MiniStatCard {...priorStats} />
      </div>

      {related.length > 0 && (
        <>
          <div className="mt-4 mb-2 font-mono font-semibold text-[11px] text-muted-foreground uppercase tracking-[0.08em]">
            {relatedLabel}
          </div>
          <div className="overflow-hidden rounded-[var(--radius-md)] border border-border bg-card">
            {related.map((r, i) => (
              <div
                key={r.id}
                className={cn(
                  "grid grid-cols-[1fr_auto_auto] items-center gap-3 px-3.5 py-3",
                  i > 0 && "border-border-light border-t",
                )}
              >
                <div className="min-w-0">
                  <div className="truncate font-semibold text-[13px]">{r.lbl}</div>
                  <div className="mt-px font-mono text-[11px] text-muted-foreground">{r.addr}</div>
                </div>
                <div className="font-mono font-semibold text-[13px]">{r.amt}</div>
                <div className="w-14 text-right text-[12px] text-muted-foreground">{r.time}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export type { CounterpartyIntelProps }
export { CounterpartyIntel }
