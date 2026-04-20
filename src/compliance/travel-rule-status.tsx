"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { ArrowLeftRight, CheckCircle2, Clock, Timer, XCircle } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"
import { cn } from "../lib/utils"
import type { TravelRuleStatusValue } from "./types"

const travelRuleStatusVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium text-[11px] leading-tight",
  {
    variants: {
      status: {
        not_required: "bg-muted text-muted-foreground",
        pending: "bg-highlight text-highlight-ink",
        sent: "bg-sky text-sky-ink",
        received: "bg-mint text-mint-ink",
        expired: "bg-blush text-blush-ink",
      },
    },
    defaultVariants: { status: "not_required" },
  },
)

const LABELS: Record<TravelRuleStatusValue, string> = {
  not_required: "Not required",
  pending: "Pending",
  sent: "Sent",
  received: "Received",
  expired: "Expired",
}

const ICONS: Record<TravelRuleStatusValue, ReactNode> = {
  not_required: <ArrowLeftRight className="size-3" aria-hidden />,
  pending: <Clock className="size-3" aria-hidden />,
  sent: <Timer className="size-3" aria-hidden />,
  received: <CheckCircle2 className="size-3" aria-hidden />,
  expired: <XCircle className="size-3" aria-hidden />,
}

type TravelRuleStatusProps = ComponentProps<"span"> &
  VariantProps<typeof travelRuleStatusVariants> & {
    status: TravelRuleStatusValue
    label?: string
    icon?: ReactNode
  }

function TravelRuleStatus({ status, label, icon, className, ...props }: TravelRuleStatusProps) {
  return (
    <span
      data-slot="travel-rule-status"
      data-status={status}
      className={cn(travelRuleStatusVariants({ status }), className)}
      {...props}
    >
      {icon ?? ICONS[status]}
      {label ?? LABELS[status]}
    </span>
  )
}

export type { TravelRuleStatusProps }
export { TravelRuleStatus, travelRuleStatusVariants }
