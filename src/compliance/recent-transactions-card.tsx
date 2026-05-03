"use client"

import { ArrowDownLeft, ArrowRight, ArrowUpRight, RefreshCw } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"

import { Badge } from "../components/badge"
import { DIRECTION_TONE_CLASSES } from "../lib/tone"
import { cn } from "../lib/utils"
import type { Transaction, TxDirection, TxStatus } from "./types"

const DIR_ICON: Record<TxDirection, ReactNode> = {
  inbound: <ArrowDownLeft className="size-3.5" />,
  outbound: <ArrowUpRight className="size-3.5" />,
  internal: <RefreshCw className="size-3" />,
}

const STATUS_VARIANT: Record<TxStatus, ComponentProps<typeof Badge>["variant"]> = {
  verified: "mint",
  review: "highlight",
  blocked: "blush",
  pending: "secondary",
}

type RecentTransactionsCardProps = Omit<ComponentProps<"div">, "children" | "onSelect"> & {
  transactions: Transaction[]
  title?: string
  subtitle?: string
  viewAllLabel?: string
  onViewAll?: () => void
  onSelect?: (tx: Transaction) => void
}

function RecentTransactionsCard({
  transactions,
  title = "Recent transactions",
  subtitle = "Last 60 minutes",
  viewAllLabel = "Open queue →",
  onViewAll,
  onSelect,
  className,
  ...props
}: RecentTransactionsCardProps) {
  return (
    <div
      data-slot="recent-transactions-card"
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-card shadow-card",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between border-border-light border-b px-[18px] py-3.5">
        <div>
          <div className="font-semibold text-sm">{title}</div>
          {subtitle && <div className="mt-0.5 text-muted-foreground text-sm-plus">{subtitle}</div>}
        </div>
        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="font-medium text-xs"
            style={{ color: "var(--focal)" }}
          >
            {viewAllLabel}
          </button>
        )}
      </div>

      {transactions.length === 0 && (
        <div className="px-[18px] py-8 text-center text-muted-foreground text-sm">
          No transactions in this window.
        </div>
      )}

      {transactions.map((tx, i) => {
        const sign = tx.dir === "inbound" ? "+" : tx.dir === "outbound" ? "−" : ""
        return (
          <button
            key={tx.id}
            type="button"
            onClick={onSelect ? () => onSelect(tx) : undefined}
            className={cn(
              "grid w-full grid-cols-[28px_1fr_auto_auto] items-center gap-3 px-[18px] py-2.5 text-left outline-none transition-colors focus-visible:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
              i < transactions.length - 1 && "border-border-light border-b",
              onSelect && "cursor-pointer hover:bg-muted/40",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "flex size-7 items-center justify-center rounded-full",
                DIRECTION_TONE_CLASSES[tx.dir],
              )}
            >
              {DIR_ICON[tx.dir]}
            </span>
            <div className="min-w-0">
              <div className="flex min-w-0 items-center gap-1.5 font-medium text-sm-plus">
                <span className="min-w-0 max-w-[88px] truncate sm:max-w-[140px]">
                  {tx.from.lbl}
                </span>
                <ArrowRight className="size-3 shrink-0 text-muted-foreground" />
                <span
                  className={cn(
                    "min-w-0 max-w-[88px] truncate sm:max-w-[140px]",
                    tx.risk >= 75 && "font-semibold text-destructive",
                  )}
                >
                  {tx.to.lbl}
                </span>
              </div>
              <div className="mt-px font-mono text-muted-foreground text-xxs">{tx.time}</div>
            </div>
            <div className="font-mono font-semibold text-sm-plus tabular-nums">
              {sign}
              {tx.usd}
            </div>
            <Badge variant={STATUS_VARIANT[tx.status]}>
              {tx.status === "verified"
                ? "Verified"
                : tx.status === "review"
                  ? "In review"
                  : tx.status === "blocked"
                    ? "Blocked"
                    : "Pending"}
            </Badge>
          </button>
        )
      })}
    </div>
  )
}

export type { RecentTransactionsCardProps }
export { RecentTransactionsCard }
