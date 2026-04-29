"use client"

import {
  AlertTriangle,
  ArrowLeftRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Timer,
  XCircle,
} from "lucide-react"
import type { ComponentProps, ReactNode } from "react"

import { Badge } from "../components/badge"
import type { ComplianceStatus, TravelRuleStatusValue } from "./types"

type BadgeVariant = NonNullable<ComponentProps<typeof Badge>["variant"]>
type StatusBadgeShape = { variant: BadgeVariant; icon: ReactNode; label: string }

/* ── Lookup tables ── */

export const COMPLIANCE_STATUS_BADGE: Record<ComplianceStatus, StatusBadgeShape> = {
  pending: { variant: "secondary", icon: <Clock className="size-3" />, label: "Review" },
  accepted: { variant: "mint", icon: <CheckCircle2 className="size-3" />, label: "Accepted" },
  rejected: { variant: "blush", icon: <XCircle className="size-3" />, label: "Rejected" },
  flagged: { variant: "highlight", icon: <AlertTriangle className="size-3" />, label: "Flagged" },
  escalated: { variant: "blush", icon: <ArrowUpRight className="size-3" />, label: "Escalated" },
}

export const TRAVEL_RULE_STATUS_BADGE: Record<TravelRuleStatusValue, StatusBadgeShape> = {
  not_required: {
    variant: "secondary",
    icon: <ArrowLeftRight className="size-3" />,
    label: "Not required",
  },
  pending: { variant: "highlight", icon: <Clock className="size-3" />, label: "Pending" },
  sent: { variant: "sky", icon: <Timer className="size-3" />, label: "Sent" },
  received: { variant: "mint", icon: <CheckCircle2 className="size-3" />, label: "Received" },
  expired: { variant: "blush", icon: <XCircle className="size-3" />, label: "Expired" },
}

/* ── Convenience components — thin wrappers around Badge ── */

type ComplianceStatusBadgeProps = Omit<ComponentProps<typeof Badge>, "variant" | "children"> & {
  status: ComplianceStatus
  label?: string
  icon?: ReactNode
}

function ComplianceStatusBadge({ status, label, icon, ...props }: ComplianceStatusBadgeProps) {
  const cfg = COMPLIANCE_STATUS_BADGE[status]
  return (
    <Badge data-status={status} variant={cfg.variant} {...props}>
      {icon ?? cfg.icon}
      {label ?? cfg.label}
    </Badge>
  )
}

type TravelRuleStatusProps = Omit<ComponentProps<typeof Badge>, "variant" | "children"> & {
  status: TravelRuleStatusValue
  label?: string
  icon?: ReactNode
}

function TravelRuleStatus({ status, label, icon, ...props }: TravelRuleStatusProps) {
  const cfg = TRAVEL_RULE_STATUS_BADGE[status]
  return (
    <Badge data-status={status} variant={cfg.variant} {...props}>
      {icon ?? cfg.icon}
      {label ?? cfg.label}
    </Badge>
  )
}

export type { ComplianceStatusBadgeProps, TravelRuleStatusProps }
export { ComplianceStatusBadge, TravelRuleStatus }
