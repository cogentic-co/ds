"use client"

import { ArrowDownLeft, ArrowUpRight, ExternalLink, RefreshCw } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"
import { cn } from "../lib/utils"
import { AddressDisplay } from "./address-display"
import { ComplianceStatusBadge } from "./compliance-status-badge"
import { NetworkBadge } from "./network-badge"
import { RiskScoreInline } from "./risk-score-inline"
import { TravelRuleStatus as TravelRuleStatusComponent } from "./travel-rule-status"
import type { TransactionData, TransactionDirection } from "./types"

const DIRECTION_ICONS: Record<TransactionDirection, ReactNode> = {
  inbound: <ArrowDownLeft className="size-5 text-success" />,
  outbound: <ArrowUpRight className="size-5 text-destructive" />,
  internal: <RefreshCw className="size-4 text-muted-foreground" />,
}

const DIRECTION_LABELS: Record<TransactionDirection, string> = {
  inbound: "Inbound",
  outbound: "Outbound",
  internal: "Internal",
}

type TransactionDetailProps = ComponentProps<"div"> & {
  transaction: TransactionData
  explorerUrl?: string
  actions?: ReactNode
  children?: ReactNode
}

function DetailRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-t border-border py-3">
      <span className="shrink-0 text-muted-foreground text-sm">{label}</span>
      <div className="min-w-0 text-right font-mono text-sm">{children}</div>
    </div>
  )
}

function TransactionDetail({
  transaction: tx,
  explorerUrl,
  actions,
  children,
  className,
  ...props
}: TransactionDetailProps) {
  const ts =
    typeof tx.timestamp === "string"
      ? tx.timestamp
      : tx.timestamp.toLocaleString()

  return (
    <div
      data-slot="transaction-detail"
      data-status={tx.complianceStatus}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
            {DIRECTION_ICONS[tx.direction]}
          </span>
          <div>
            <div className="font-mono font-semibold text-lg tabular-nums">
              {tx.direction === "inbound" ? "+" : tx.direction === "outbound" ? "−" : ""}
              {tx.amount} {tx.asset}
            </div>
            {tx.fiatValue && (
              <div className="font-mono text-muted-foreground text-sm tabular-nums">
                {tx.fiatValue}
              </div>
            )}
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <ComplianceStatusBadge status={tx.complianceStatus} />
              <NetworkBadge network={tx.network} />
              {tx.travelRuleStatus && (
                <TravelRuleStatusComponent status={tx.travelRuleStatus} />
              )}
              {tx.riskScore != null && <RiskScoreInline score={tx.riskScore} showLabel />}
            </div>
          </div>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      <div>
        <DetailRow label="Direction">
          <span className="font-medium">{DIRECTION_LABELS[tx.direction]}</span>
        </DetailRow>
        <DetailRow label="From">
          <AddressDisplay
            address={tx.from.address}
            label={tx.from.label ?? tx.from.vasp}
            riskScore={tx.direction === "inbound" ? tx.riskScore : undefined}
          />
        </DetailRow>
        <DetailRow label="To">
          <AddressDisplay
            address={tx.to.address}
            label={tx.to.label ?? tx.to.vasp}
            riskScore={tx.direction === "outbound" ? tx.riskScore : undefined}
          />
        </DetailRow>
        <DetailRow label="Transaction hash">
          <AddressDisplay address={tx.hash} chars={8} />
        </DetailRow>
        {tx.blockNumber != null && (
          <DetailRow label="Block">
            <span className="tabular-nums">{tx.blockNumber.toLocaleString()}</span>
            {tx.confirmations != null && (
              <span className="ml-1 text-muted-foreground text-xs">
                ({tx.confirmations} confirmations)
              </span>
            )}
          </DetailRow>
        )}
        {tx.fee && (
          <DetailRow label="Fee">
            <span className="tabular-nums">{tx.fee}</span>
          </DetailRow>
        )}
        <DetailRow label="Timestamp">
          <span className="tabular-nums">{ts}</span>
        </DetailRow>
      </div>

      {tx.flags && tx.flags.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="font-medium text-sm">Flags</span>
          <div className="flex flex-wrap gap-1.5">
            {tx.flags.map((flag) => (
              <span
                key={flag}
                className="inline-flex items-center border border-amber-700/30 bg-amber-700/10 px-2 py-0.5 font-medium text-[11px] text-amber-700 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-400"
              >
                {flag.replace(/_/g, " ")}
              </span>
            ))}
          </div>
        </div>
      )}

      {explorerUrl && (
        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-focal text-sm hover:underline"
        >
          View on block explorer
          <ExternalLink className="size-3.5" />
        </a>
      )}

      {children}
    </div>
  )
}

export { TransactionDetail }
export type { TransactionDetailProps }
