"use client"

import {
  ArrowDownLeft,
  ArrowUpRight,
  Check,
  Clock,
  ExternalLink,
  Flag,
  MoreHorizontal,
  RefreshCw,
  X,
} from "lucide-react"
import type { ComponentProps, ReactNode } from "react"
import { useState } from "react"

import { Badge } from "../components/badge"
import { Button } from "../components/button"
import { DIRECTION_TONE_CLASSES } from "../lib/tone"
import { cn } from "../lib/utils"
import { AddressDisplay } from "./address-display"
import { FlagCallout } from "./flag-callout"
import { NetworkBadge } from "./network-badge"
import type {
  ComplianceStatus,
  TransactionData,
  TransactionDirection,
  TravelRuleStatusValue,
} from "./types"

type TabKey = "details" | "timeline" | "counterparty"

const DIRECTION_ICONS: Record<TransactionDirection, ReactNode> = {
  inbound: <ArrowDownLeft className="size-5" />,
  outbound: <ArrowUpRight className="size-5" />,
  internal: <RefreshCw className="size-4" />,
}

const STATUS_PILL_VARIANT: Record<ComplianceStatus, ComponentProps<typeof Badge>["variant"]> = {
  pending: "secondary",
  accepted: "mint",
  rejected: "blush",
  flagged: "highlight",
  escalated: "blush",
}

const TRAVEL_RULE_PILL: Record<TravelRuleStatusValue, ComponentProps<typeof Badge>["variant"]> = {
  not_required: "secondary",
  pending: "highlight",
  sent: "sky",
  received: "mint",
  expired: "blush",
}

const TRAVEL_RULE_LABEL: Record<TravelRuleStatusValue, string> = {
  not_required: "Not required",
  pending: "In review",
  sent: "Sent",
  received: "Received",
  expired: "Expired",
}

type TransactionDetailVariant = "inline" | "card" | "panel"

type TransactionDetailProps = Omit<ComponentProps<"div">, "children" | "onClick"> & {
  transaction: TransactionData
  explorerUrl?: string
  /** Optional custom action slot — overrides the default Approve/Escalate buttons. */
  actions?: ReactNode
  onApprove?: () => void
  onEscalate?: () => void
  onMore?: () => void
  onClose?: () => void
  /** Default visible tab. */
  defaultTab?: TabKey
  /** Custom content for the Timeline tab. */
  timelineContent?: ReactNode
  /** Custom content for the Counterparty tab. */
  counterpartyContent?: ReactNode
  /**
   * Visual variant:
   *   - `inline` (default) — no chrome, embed into any container.
   *   - `card` — rounded card with border + card shadow. Good for sitting on a page.
   *   - `panel` — card with lifted shadow. Good for slide-in side panels.
   */
  variant?: TransactionDetailVariant
  children?: ReactNode
}

const VARIANT_CLASSES: Record<TransactionDetailVariant, string> = {
  inline: "",
  card: "overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card shadow-[var(--shadow-card)]",
  panel:
    "overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card shadow-[var(--shadow-lifted)]",
}

function DetailRow({
  label,
  children,
  first = false,
}: {
  label: string
  children: ReactNode
  first?: boolean
}) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 py-3",
        !first && "border-border-light border-t",
      )}
    >
      <span className="shrink-0 text-[13px] text-muted-foreground">{label}</span>
      <div className="min-w-0 text-right">{children}</div>
    </div>
  )
}

function TransactionDetail({
  transaction: tx,
  explorerUrl,
  actions,
  onApprove,
  onEscalate,
  onMore,
  onClose,
  defaultTab = "details",
  timelineContent,
  counterpartyContent,
  variant = "inline",
  children,
  className,
  ...props
}: TransactionDetailProps) {
  const [tab, setTab] = useState<TabKey>(defaultTab)
  const ts = typeof tx.timestamp === "string" ? tx.timestamp : tx.timestamp.toLocaleString()

  const statusLabel =
    tx.complianceStatus === "flagged"
      ? "In review"
      : tx.complianceStatus.charAt(0).toUpperCase() + tx.complianceStatus.slice(1)

  return (
    <div
      data-slot="transaction-detail"
      data-status={tx.complianceStatus}
      data-variant={variant}
      className={cn("flex flex-col", VARIANT_CLASSES[variant], className)}
      {...props}
    >
      {/* Header */}
      <div className="border-border border-b px-5 pt-[18px] pb-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-[10px]",
                DIRECTION_TONE_CLASSES[tx.direction],
              )}
              aria-hidden
            >
              {DIRECTION_ICONS[tx.direction]}
            </span>
            <div>
              <div
                className="font-mono font-semibold tabular-nums"
                style={{ fontSize: 20, letterSpacing: "-0.01em" }}
              >
                {tx.direction === "inbound" ? "+" : tx.direction === "outbound" ? "−" : ""}
                {tx.amount} <span className="text-muted-foreground">{tx.asset}</span>
              </div>
              {tx.fiatValue && (
                <div className="mt-px font-mono text-[13px] text-muted-foreground tabular-nums">
                  {tx.fiatValue}
                </div>
              )}
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <Badge variant={STATUS_PILL_VARIANT[tx.complianceStatus]}>
                  <Clock /> {statusLabel}
                </Badge>
                <NetworkBadge network={tx.network} />
              </div>
            </div>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex size-7 items-center justify-center rounded-[var(--radius-md)] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="mt-3.5 flex gap-1.5">
          {actions ?? (
            <>
              <Button onClick={onApprove} className="flex-1">
                <Check /> Approve
              </Button>
              <Button variant="outline" onClick={onEscalate} className="flex-1">
                <Flag /> Escalate
              </Button>
              <Button variant="outline" size="icon" onClick={onMore} aria-label="More actions">
                <MoreHorizontal />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0.5 border-border border-b px-5">
        {(["details", "timeline", "counterparty"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "relative h-[38px] px-2.5 text-[13px] capitalize transition-colors",
              tab === t
                ? "font-semibold text-foreground after:absolute after:right-0 after:bottom-[-1px] after:left-0 after:h-[2px] after:bg-foreground"
                : "font-medium text-muted-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-auto px-5 py-4">
        {tab === "details" && (
          <div className="flex flex-col gap-4">
            {tx.flags && tx.flags.length > 0 && (
              <FlagCallout
                flags={tx.flags}
                tone={tx.complianceStatus === "rejected" ? "blush" : "highlight"}
              />
            )}
            <div>
              <DetailRow label="From" first>
                <div className="font-semibold text-[13px]">
                  {tx.from.label ?? tx.from.vasp ?? "—"}
                </div>
                <AddressDisplay
                  address={tx.from.address}
                  copyable={false}
                  className="mt-0.5 justify-end text-[11px] text-muted-foreground"
                />
              </DetailRow>
              <DetailRow label="To">
                <div
                  className={cn(
                    "font-semibold text-[13px]",
                    (tx.riskScore ?? 0) >= 75 && "text-destructive",
                  )}
                >
                  {tx.to.label ?? tx.to.vasp ?? "—"}
                </div>
                <AddressDisplay
                  address={tx.to.address}
                  copyable={false}
                  className="mt-0.5 justify-end text-[11px] text-muted-foreground"
                />
              </DetailRow>
              <DetailRow label="Hash">
                <AddressDisplay
                  address={tx.hash}
                  chars={4}
                  copyable={false}
                  className="justify-end text-[13px]"
                />
              </DetailRow>
              {tx.blockNumber != null && (
                <DetailRow label="Block">
                  <span className="font-mono text-[13px] tabular-nums">
                    {tx.blockNumber.toLocaleString()}
                  </span>
                </DetailRow>
              )}
              {tx.confirmations != null && (
                <DetailRow label="Confirmations">
                  <span className="font-mono text-[13px] tabular-nums">{tx.confirmations}</span>
                </DetailRow>
              )}
              {tx.fee && (
                <DetailRow label="Network fee">
                  <span className="font-mono text-[13px] tabular-nums">{tx.fee}</span>
                </DetailRow>
              )}
              {tx.travelRuleStatus && (
                <DetailRow label="Travel rule">
                  <Badge variant={TRAVEL_RULE_PILL[tx.travelRuleStatus]} className="ml-auto">
                    <Clock /> {TRAVEL_RULE_LABEL[tx.travelRuleStatus]}
                  </Badge>
                </DetailRow>
              )}
              <DetailRow label="Timestamp">
                <span className="font-mono text-[13px] tabular-nums">{ts} UTC</span>
              </DetailRow>
            </div>
            {explorerUrl && (
              <a
                href={explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-[13px]"
                style={{ color: "var(--focal)" }}
              >
                View on block explorer <ExternalLink className="size-3" />
              </a>
            )}
          </div>
        )}

        {tab === "timeline" &&
          (timelineContent ?? (
            <div className="text-muted-foreground text-sm">
              Timeline content goes here. Pass <code>timelineContent</code> to customize.
            </div>
          ))}

        {tab === "counterparty" &&
          (counterpartyContent ?? (
            <div className="text-muted-foreground text-sm">
              Counterparty content goes here. Pass <code>counterpartyContent</code> to customize.
            </div>
          ))}

        {children}
      </div>
    </div>
  )
}

export type { TransactionDetailProps, TransactionDetailVariant }
export { TransactionDetail }
