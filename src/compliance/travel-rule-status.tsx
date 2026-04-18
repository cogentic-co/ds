"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { ArrowLeftRight, CheckCircle2, Clock, Timer, XCircle } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"
import { cn } from "../lib/utils"
import type { TravelRuleStatusValue } from "./types"

const travelRuleStatusVariants = cva(
  "inline-flex items-center gap-1 border px-2 py-0.5 font-medium text-[11px] leading-tight",
  {
    variants: {
      status: {
        not_required: "border-border bg-muted text-muted-foreground",
        pending:
          "border-amber-700/30 bg-amber-700/10 text-amber-700 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-400",
        sent: "border-[#3B50A8]/30 bg-[#3B50A8]/10 text-[#3B50A8] dark:border-[#8DA0FF]/30 dark:bg-[#8DA0FF]/10 dark:text-[#8DA0FF]",
        received:
          "border-emerald-700/30 bg-emerald-700/10 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-400",
        expired:
          "border-red-700/30 bg-red-700/10 text-red-700 dark:border-red-400/30 dark:bg-red-400/10 dark:text-red-400",
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
