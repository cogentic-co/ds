import type { ComponentProps } from "react"

import { StatCard } from "../blocks/stat-card"
import { cn } from "../lib/utils"
import type { RelatedTx } from "./types"

type CounterpartyIntelProps = ComponentProps<"div"> & {
  firstSeen: string
  firstSeenHint?: string
  priorStats: { label: string; value: string; hint?: string }
  related?: RelatedTx[]
}

function CounterpartyIntel({
  firstSeen,
  firstSeenHint,
  priorStats,
  related = [],
  className,
  ...props
}: CounterpartyIntelProps) {
  return (
    <div data-slot="counterparty-intel" className={cn(className)} {...props}>
      <div className="mb-3.5 grid grid-cols-2 gap-3">
        <StatCard label="First seen" value={firstSeen} description={firstSeenHint} />
        <StatCard label={priorStats.label} value={priorStats.value} description={priorStats.hint} />
      </div>

      {related.length > 0 && (
        <>
          <div className="mb-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
            Related activity
          </div>
          <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card">
            {related.map((r, i) => (
              <div
                key={r.id}
                className={cn(
                  "grid grid-cols-[1fr_auto_auto] items-center gap-3 px-3.5 py-3",
                  i > 0 && "border-border-light border-t",
                )}
              >
                <div>
                  <div className="font-medium text-[13px]">{r.lbl}</div>
                  <div className="mt-px font-mono text-[11px] text-muted-foreground">{r.addr}</div>
                </div>
                <div className="font-mono font-semibold text-[13px]">{r.amt}</div>
                <div className="text-muted-foreground text-xs">{r.time}</div>
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
