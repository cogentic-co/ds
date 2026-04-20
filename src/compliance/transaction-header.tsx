import {
  ArrowDownLeft,
  ArrowUpRight,
  Check,
  ExternalLink,
  Flag,
  MoreHorizontal,
  RefreshCw,
} from "lucide-react"
import type { ComponentProps, ReactNode } from "react"

import { Button } from "../components/button"
import { StatusPill } from "../components/status-pill"
import { DIRECTION_TONE_CLASSES } from "../lib/tone"
import { cn } from "../lib/utils"
import type { Transaction, TxDirection, TxStatus } from "./types"

const DIRECTION_ICON: Record<TxDirection, ReactNode> = {
  inbound: <ArrowDownLeft className="size-5" />,
  outbound: <ArrowUpRight className="size-5" />,
  internal: <RefreshCw className="size-5" />,
}

const STATUS_VARIANT: Record<TxStatus, React.ComponentProps<typeof StatusPill>["variant"]> = {
  verified: "mint",
  review: "highlight",
  blocked: "blush",
  pending: "neutral",
}

type TransactionHeaderProps = Omit<ComponentProps<"div">, "onClick"> & {
  tx: Transaction
  backHref?: string
  explorerHref?: string
  onApprove?: () => void
  onEscalate?: () => void
  onMore?: () => void
}

function TransactionHeader({
  tx,
  backHref = "/transactions",
  explorerHref,
  onApprove,
  onEscalate,
  onMore,
  className,
  ...props
}: TransactionHeaderProps) {
  const sign = tx.dir === "inbound" ? "+" : tx.dir === "outbound" ? "−" : ""
  return (
    <div
      data-slot="transaction-header"
      className={cn("border-border border-b bg-card px-6 pt-5 pb-4", className)}
      {...props}
    >
      <div className="mb-2.5 flex items-center gap-1.5 text-[13px] text-muted-foreground">
        <a href={backHref} className="hover:text-foreground">
          Transactions
        </a>
        <span>/</span>
        <span className="font-mono text-foreground">{tx.ref}</span>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="flex items-start gap-4">
          <span
            className={cn(
              "flex size-12 items-center justify-center rounded-[var(--radius-md)]",
              DIRECTION_TONE_CLASSES[tx.dir],
            )}
          >
            {DIRECTION_ICON[tx.dir]}
          </span>
          <div>
            <div className="flex flex-wrap items-baseline gap-3">
              <h1
                className="font-mono font-semibold"
                style={{ fontSize: 30, letterSpacing: "-0.02em" }}
              >
                {sign}
                {tx.amt} <span className="font-medium text-muted-foreground">{tx.asset}</span>
              </h1>
              <StatusPill variant={STATUS_VARIANT[tx.status]} size="lg">
                {tx.status}
              </StatusPill>
            </div>
            <div className="mt-1 font-mono text-muted-foreground text-sm">
              {tx.usd} · {tx.time}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          {explorerHref && (
            <Button
              variant="ghost"
              render={
                <a href={explorerHref} target="_blank" rel="noreferrer">
                  <ExternalLink className="size-3.5" /> Explorer
                </a>
              }
            />
          )}
          <Button variant="secondary" onClick={onEscalate}>
            <Flag className="size-3.5" /> Escalate
          </Button>
          <Button onClick={onApprove}>
            <Check className="size-3.5" /> Approve
          </Button>
          <Button variant="ghost" size="icon" onClick={onMore} aria-label="More actions">
            <MoreHorizontal className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export type { TransactionHeaderProps }
export { TransactionHeader }
