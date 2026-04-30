"use client"

import { ArrowDownLeft, ArrowRight, ArrowUpRight, RefreshCw } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"
import { Badge } from "../components/badge"
import { DIRECTION_TONE_CLASSES } from "../lib/tone"
import { cn } from "../lib/utils"
import { RiskScoreInline } from "./risk-score-inline"
import { ComplianceStatusBadge } from "./status-helpers"
import type { TransactionData, TransactionDirection } from "./types"

const DIRECTION_ICONS: Record<TransactionDirection, ReactNode> = {
  inbound: <ArrowDownLeft className="size-3.5" />,
  outbound: <ArrowUpRight className="size-3.5" />,
  internal: <RefreshCw className="size-3" />,
}

const DIRECTION_AMOUNT: Record<TransactionDirection, string> = {
  inbound: "text-mint-ink",
  outbound: "text-foreground",
  internal: "text-foreground",
}

type TransactionRowProps = ComponentProps<"div"> & {
  transaction: TransactionData
  onClick?: () => void
}

function formatTimestamp(t: string | Date) {
  const d = typeof t === "string" ? new Date(t) : t
  if (Number.isNaN(d.getTime())) return typeof t === "string" ? t : t.toString()
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function partyLabel(party: TransactionData["from"]) {
  if (party.label) return party.label
  if (party.vasp) return party.vasp
  if (party.address.length > 14) return `${party.address.slice(0, 6)}…${party.address.slice(-4)}`
  return party.address
}

function TransactionRow({ transaction: tx, onClick, className, ...props }: TransactionRowProps) {
  const ts = formatTimestamp(tx.timestamp)
  const sign = tx.direction === "inbound" ? "+" : tx.direction === "outbound" ? "−" : ""
  const fromLabel = partyLabel(tx.from)
  const toLabel = partyLabel(tx.to)

  return (
    <div
      data-slot="transaction-row"
      data-status={tx.complianceStatus}
      data-direction={tx.direction}
      onClick={onClick}
      className={cn(
        "group flex items-center gap-3 border-border border-b px-3 py-3 text-xs transition-colors last:border-b-0 sm:px-4",
        onClick && "cursor-pointer hover:bg-muted/40",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-full",
          DIRECTION_TONE_CLASSES[tx.direction],
        )}
      >
        {DIRECTION_ICONS[tx.direction]}
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex min-w-0 items-center gap-1.5">
          <span className="min-w-0 truncate font-medium text-foreground text-sm">{fromLabel}</span>
          <ArrowRight className="size-3 shrink-0 text-muted-foreground/40" />
          <span className="min-w-0 truncate text-muted-foreground text-sm">{toLabel}</span>
        </div>
        <span className="truncate font-mono text-[10px] text-muted-foreground/70">{ts}</span>
      </div>

      <span className="hidden w-20 shrink-0 sm:block">
        <Badge square variant="outline" className="px-1 py-0.5 text-[9px] uppercase leading-none">
          {tx.network}
        </Badge>
      </span>

      {tx.riskScore != null && (
        <span className="hidden w-12 shrink-0 sm:block">
          <RiskScoreInline score={tx.riskScore} />
        </span>
      )}

      <div className="flex shrink-0 flex-col items-end gap-1 sm:w-44 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
        <span
          className={cn(
            "whitespace-nowrap font-mono font-semibold tabular-nums",
            DIRECTION_AMOUNT[tx.direction],
          )}
        >
          {sign}
          {tx.amount} {tx.asset}
        </span>
        <ComplianceStatusBadge status={tx.complianceStatus} />
      </div>
    </div>
  )
}

export type { TransactionRowProps }
export { TransactionRow }
