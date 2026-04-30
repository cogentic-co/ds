import { AlertTriangle, Check } from "lucide-react"
import type { ComponentProps } from "react"
import { cn } from "../lib/utils"
import { AddressDisplay } from "./address-display"
import type { NetworkCode, Party } from "./types"

type PartyCardProps = ComponentProps<"div"> & {
  party: Party
  side: "From" | "To"
}

function PartyCard({ party, side, className, ...props }: PartyCardProps) {
  return (
    <div
      data-slot="party-card"
      className={cn(
        "flex-1 rounded-[var(--radius-lg)] border border-border bg-card p-4 shadow-[var(--shadow-card)]",
        className,
      )}
      {...props}
    >
      <div className="font-medium text-[11px] text-muted-foreground uppercase tracking-wider">
        {side}
      </div>
      <div className="mt-2 mb-2.5 flex items-center gap-2.5">
        <div
          className="flex size-9 items-center justify-center rounded-xl font-bold text-sm"
          style={{
            background: party.verified ? "var(--mint)" : "var(--blush)",
            color: party.verified ? "var(--mint-ink)" : "var(--blush-ink)",
          }}
        >
          {party.lbl[0]}
        </div>
        <div className="min-w-0">
          <div className="truncate font-semibold text-sm">{party.lbl}</div>
          <div className="mt-px text-muted-foreground text-xs">{party.type}</div>
        </div>
      </div>
      <AddressDisplay address={party.addr} copyable />
      <div className="mt-3 text-xs">
        {party.verified ? (
          <span
            className="inline-flex items-center gap-1 font-semibold"
            style={{ color: "var(--mint-ink)" }}
          >
            <Check className="size-3" /> Verified VASP
          </span>
        ) : (
          <span
            className="inline-flex items-center gap-1 font-semibold"
            style={{ color: "var(--blush-ink)" }}
          >
            <AlertTriangle className="size-3" /> Unverified
          </span>
        )}
      </div>
    </div>
  )
}

type FlowDiagramProps = ComponentProps<"div"> & {
  from: Party
  to: Party
  network: NetworkCode
  fee?: string
}

function FlowDiagram({ from, to, network, fee, className, ...props }: FlowDiagramProps) {
  return (
    <div
      data-slot="flow-diagram"
      className={cn("grid grid-cols-1 items-center gap-3 sm:grid-cols-[1fr_auto_1fr]", className)}
      {...props}
    >
      <PartyCard party={from} side="From" />
      <div className="flex flex-col items-center gap-1.5 px-1">
        <div className="font-medium text-[11px] text-muted-foreground uppercase tracking-wider">
          via
        </div>
        <span className="rounded-full border border-border bg-card px-2 py-0.5 font-mono font-semibold text-xs">
          {network}
        </span>
        <svg
          width="80"
          height="20"
          viewBox="0 0 80 20"
          style={{ color: "var(--border)" }}
          aria-hidden
          role="presentation"
        >
          <path d="M0 10 H72" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M64 4 L76 10 L64 16" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
        {fee && <div className="font-mono text-[11px] text-muted-foreground">fee {fee}</div>}
      </div>
      <PartyCard party={to} side="To" />
    </div>
  )
}

export type { FlowDiagramProps, PartyCardProps }
export { FlowDiagram, PartyCard }
