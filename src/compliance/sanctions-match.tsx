"use client"

import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"
import { Button } from "../components/button"
import { cn } from "../lib/utils"

type SanctionsMatchProps = ComponentProps<"div"> & {
  /** Source list (e.g. "OFAC SDN", "EU Sanctions", "UN Consolidated") */
  source: string
  /** Name of the matched entity */
  entityName: string
  /** Match confidence as a percentage (0-100) */
  matchScore: number
  /** Optional description or reason for the match */
  reason?: string
  /** Called when the user dismisses this match as a false positive */
  onDismiss?: () => void
  /** Called when the user confirms this is a true match */
  onConfirm?: () => void
  /** Custom labels for the action buttons */
  dismissLabel?: string
  confirmLabel?: string
  /** Extra content (e.g. entity details, aliases) */
  children?: ReactNode
}

function SanctionsMatch({
  source,
  entityName,
  matchScore,
  reason,
  onDismiss,
  onConfirm,
  dismissLabel = "False positive",
  confirmLabel = "Confirm match",
  children,
  className,
  ...props
}: SanctionsMatchProps) {
  const scoreColor =
    matchScore >= 80
      ? "text-destructive"
      : matchScore >= 50
        ? "text-warning-foreground"
        : "text-muted-foreground"

  return (
    <div
      data-slot="sanctions-match"
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-amber-700/30 bg-amber-700/5 p-4 text-sm dark:border-amber-400/30 dark:bg-amber-400/5",
        className,
      )}
      {...props}
    >
      <div className="flex items-start gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-amber-700/15 text-amber-700 dark:bg-amber-400/15 dark:text-amber-400">
          <AlertTriangle className="size-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold text-foreground">{entityName}</span>
            <span className={cn("font-mono font-bold text-base tabular-nums", scoreColor)}>
              {matchScore}%
            </span>
          </div>
          <div className="mt-0.5 flex items-center gap-2 text-muted-foreground text-xs">
            <span className="rounded border border-border bg-card px-1.5 py-0.5 font-medium">
              {source}
            </span>
            {reason && <span>{reason}</span>}
          </div>
        </div>
      </div>

      {children}

      {(onDismiss || onConfirm) && (
        <div className="flex items-center justify-end gap-2 border-t border-amber-700/20 pt-3 dark:border-amber-400/20">
          {onDismiss && (
            <Button variant="ghost" size="sm" onClick={onDismiss}>
              <XCircle className="mr-1 size-3.5" />
              {dismissLabel}
            </Button>
          )}
          {onConfirm && (
            <Button variant="destructive" size="sm" onClick={onConfirm}>
              <CheckCircle2 className="mr-1 size-3.5" />
              {confirmLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export { SanctionsMatch }
export type { SanctionsMatchProps }
