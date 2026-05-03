"use client"

import { ArrowDownLeft, ArrowUpRight, RefreshCw } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"
import { Badge } from "../components/badge"
import { Card } from "../components/card"
import { cn, timeAgo } from "../lib/utils"
import { AddressDisplay } from "./address-display"
import { NetworkBadge } from "./network-badge"
import { RiskScoreInline } from "./risk-score-inline"
import { ComplianceStatusBadge } from "./status-helpers"
import type { ComplianceStatus, TransactionData, TransactionDirection } from "./types"

const STATUS_BORDER: Record<ComplianceStatus, string> = {
  pending: "",
  accepted: "border-success/50",
  rejected: "border-destructive/50",
  flagged: "border-warning/50",
  escalated: "border-destructive/50",
}

const DIRECTION_ICONS: Record<TransactionDirection, ReactNode> = {
  inbound: <ArrowDownLeft className="size-4 text-success" />,
  outbound: <ArrowUpRight className="size-4 text-destructive" />,
  internal: <RefreshCw className="size-3.5 text-muted-foreground" />,
}

type TransactionCardProps = ComponentProps<typeof Card> & {
  transaction: TransactionData
  onClick?: () => void
}

function TransactionCard({ transaction: tx, onClick, className, ...props }: TransactionCardProps) {
  const ts = typeof tx.timestamp === "string" ? tx.timestamp : timeAgo(tx.timestamp.toISOString())

  return (
    <Card
      data-slot="transaction-card"
      data-status={tx.complianceStatus}
      data-direction={tx.direction}
      padding="none"
      className={cn(
        "cursor-pointer p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
        STATUS_BORDER[tx.complianceStatus],
        className,
      )}
      onClick={onClick}
      {...props}
    >
      <div className="flex flex-col gap-y-2 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-muted">
              {DIRECTION_ICONS[tx.direction]}
            </span>
            <div className="flex flex-col">
              <span className="font-mono font-semibold text-foreground text-sm tabular-nums">
                {tx.direction === "inbound" ? "+" : tx.direction === "outbound" ? "−" : ""}
                {tx.amount} {tx.asset}
              </span>
              {tx.fiatValue && (
                <span className="font-mono text-muted-foreground text-xs tabular-nums">
                  {tx.fiatValue}
                </span>
              )}
            </div>
          </div>
          <ComplianceStatusBadge status={tx.complianceStatus} />
        </div>

        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 py-1 font-mono text-xs">
          <dt className="text-muted-foreground uppercase">From</dt>
          <dd className="min-w-0 truncate">
            <AddressDisplay
              address={tx.from.address}
              label={tx.from.label ?? tx.from.vasp}
              copyable={false}
            />
          </dd>
          <dt className="text-muted-foreground uppercase">To</dt>
          <dd className="min-w-0 truncate">
            <AddressDisplay
              address={tx.to.address}
              label={tx.to.label ?? tx.to.vasp}
              copyable={false}
            />
          </dd>
        </dl>
      </div>

      <div className="-mx-4 -mb-3 flex items-center justify-between gap-2 border-t border-dashed px-4 py-3 font-mono text-2xs">
        <div className="flex items-center gap-2">
          <Badge square variant="outline" className="px-1 py-0.5 text-3xs uppercase leading-none">
            {tx.network}
          </Badge>
          {tx.riskScore != null && <RiskScoreInline score={tx.riskScore} />}
        </div>
        <span className="text-muted-foreground">{ts}</span>
      </div>
    </Card>
  )
}

export type { TransactionCardProps }
export { TransactionCard }
