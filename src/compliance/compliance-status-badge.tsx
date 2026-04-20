"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { AlertTriangle, ArrowUpRight, CheckCircle2, Clock, XCircle } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"
import { cn } from "../lib/utils"
import type { ComplianceStatus } from "./types"

const complianceStatusBadgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium text-[11px] leading-tight",
  {
    variants: {
      status: {
        pending: "bg-muted text-muted-foreground",
        accepted: "bg-mint text-mint-ink",
        rejected: "bg-blush text-blush-ink",
        flagged: "bg-highlight text-highlight-ink",
        escalated: "bg-blush text-blush-ink",
      },
    },
    defaultVariants: { status: "pending" },
  },
)

const STATUS_LABELS: Record<ComplianceStatus, string> = {
  pending: "Review",
  accepted: "Accepted",
  rejected: "Rejected",
  flagged: "Flagged",
  escalated: "Escalated",
}

const STATUS_ICONS: Record<ComplianceStatus, ReactNode> = {
  pending: <Clock className="size-3" aria-hidden />,
  accepted: <CheckCircle2 className="size-3" aria-hidden />,
  rejected: <XCircle className="size-3" aria-hidden />,
  flagged: <AlertTriangle className="size-3" aria-hidden />,
  escalated: <ArrowUpRight className="size-3" aria-hidden />,
}

type ComplianceStatusBadgeProps = ComponentProps<"span"> &
  VariantProps<typeof complianceStatusBadgeVariants> & {
    status: ComplianceStatus
    label?: string
    icon?: ReactNode
  }

function ComplianceStatusBadge({
  status,
  label,
  icon,
  className,
  ...props
}: ComplianceStatusBadgeProps) {
  return (
    <span
      data-slot="compliance-status-badge"
      data-status={status}
      className={cn(complianceStatusBadgeVariants({ status }), className)}
      {...props}
    >
      {icon ?? STATUS_ICONS[status]}
      {label ?? STATUS_LABELS[status]}
    </span>
  )
}

export type { ComplianceStatusBadgeProps }
export { ComplianceStatusBadge, complianceStatusBadgeVariants }
