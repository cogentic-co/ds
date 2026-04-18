"use client"

import { ArrowDownLeft, ArrowRight, ArrowUpRight, RefreshCw } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"
import { Badge } from "../components/badge"
import { cn } from "../lib/utils"
import { AddressDisplay } from "./address-display"
import { ComplianceStatusBadge } from "./compliance-status-badge"
import { RiskScoreInline } from "./risk-score-inline"
import type { TransactionData, TransactionDirection } from "./types"

const DIRECTION_ICONS: Record<TransactionDirection, ReactNode> = {
  inbound: <ArrowDownLeft className="size-3.5" />,
  outbound: <ArrowUpRight className="size-3.5" />,
  internal: <RefreshCw className="size-3" />,
}

const DIRECTION_CIRCLE: Record<TransactionDirection, string> = {
  inbound: "bg-mint text-mint-ink",
  outbound: "bg-sky text-sky-ink",
  internal: "bg-lilac text-lilac-ink",
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

function TransactionRow({ transaction: tx, onClick, className, ...props }: TransactionRowProps) {
  const ts = typeof tx.timestamp === "string" ? tx.timestamp : tx.timestamp.toLocaleString()

  return (
    <div
      data-slot="transaction-row"
      data-status={tx.complianceStatus}
      data-direction={tx.direction}
      onClick={onClick}
      className={cn(
        "group flex items-center gap-3 border-border border-b px-4 py-3 font-mono text-xs transition-colors last:border-b-0",
        onClick && "cursor-pointer hover:bg-muted/40",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-full",
          DIRECTION_CIRCLE[tx.direction],
        )}
      >
        {DIRECTION_ICONS[tx.direction]}
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-center gap-1">
          <AddressDisplay
            address={tx.from.address}
            label={tx.from.label ?? tx.from.vasp}
            copyable={false}
          />
          <ArrowRight className="size-3 shrink-0 text-muted-foreground/40" />
          <AddressDisplay
            address={tx.to.address}
            label={tx.to.label ?? tx.to.vasp}
            copyable={false}
          />
        </div>
        <span className="text-[10px] text-muted-foreground/70">{ts}</span>
      </div>

      <span
        className={cn(
          "w-24 shrink-0 text-right font-semibold tabular-nums",
          DIRECTION_AMOUNT[tx.direction],
        )}
      >
        {tx.direction === "inbound" ? "+" : tx.direction === "outbound" ? "−" : ""}
        {tx.amount} {tx.asset}
      </span>

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

      <span className="w-28 shrink-0 text-right">
        <ComplianceStatusBadge status={tx.complianceStatus} />
      </span>
    </div>
  )
}

export type { TransactionRowProps }
export { TransactionRow }
