import { ExternalLink } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"

import { StatusPill } from "../components/status-pill"
import { cn } from "../lib/utils"
import type { TravelRuleStatusValue } from "./types"

type TravelRuleCardProps = Omit<ComponentProps<"div">, "children"> & {
  provider: string
  status: TravelRuleStatusValue
  body: ReactNode
  payloadHref?: string
}

const statusToPill: Record<
  TravelRuleStatusValue,
  React.ComponentProps<typeof StatusPill>["variant"]
> = {
  not_required: "neutral",
  pending: "neutral",
  sent: "sky",
  received: "mint",
  expired: "blush",
}

const statusLabel: Record<TravelRuleStatusValue, string> = {
  not_required: "N/A",
  pending: "Pending",
  sent: "Sent",
  received: "Received",
  expired: "Expired",
}

function TravelRuleCard({
  provider,
  status,
  body,
  payloadHref,
  className,
  ...props
}: TravelRuleCardProps) {
  return (
    <div
      data-slot="travel-rule-card"
      className={cn(
        "rounded-[var(--radius-lg)] border border-border bg-card p-3.5 shadow-[var(--shadow-card)]",
        className,
      )}
      {...props}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="font-semibold text-[13px]">{provider} request</span>
        <StatusPill variant={statusToPill[status]}>{statusLabel[status]}</StatusPill>
      </div>
      <div className="text-muted-foreground text-xs leading-relaxed">{body}</div>
      {payloadHref && (
        <a
          href={payloadHref}
          className="mt-2.5 inline-flex items-center gap-1 font-medium text-xs"
          style={{ color: "var(--focal)" }}
        >
          View FATF payload <ExternalLink className="size-3" />
        </a>
      )}
    </div>
  )
}

export type { TravelRuleCardProps }
export { TravelRuleCard }
