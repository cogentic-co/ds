import { Clock, ExternalLink } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"

import { Badge } from "../components/badge"
import { cn } from "../lib/utils"
import type { TravelRuleStatusValue } from "./types"

type TravelRuleCardProps = Omit<ComponentProps<"div">, "children"> & {
  title?: string
  provider: string
  status: TravelRuleStatusValue
  body: ReactNode
  payloadHref?: string
  /** When true, wraps in a title + card (outer framing). Default true. */
  framed?: boolean
}

const statusToPill: Record<TravelRuleStatusValue, React.ComponentProps<typeof Badge>["variant"]> = {
  not_required: "secondary",
  pending: "highlight",
  sent: "sky",
  received: "mint",
  expired: "blush",
}

const statusLabel: Record<TravelRuleStatusValue, string> = {
  not_required: "N/A",
  pending: "In review",
  sent: "Sent",
  received: "Received",
  expired: "Expired",
}

function TravelRuleCard({
  title = "Travel rule",
  provider,
  status,
  body,
  payloadHref,
  framed = true,
  className,
  ...props
}: TravelRuleCardProps) {
  const card = (
    <div
      data-slot="travel-rule-card"
      className={cn("rounded-[var(--radius-md)] border border-border bg-card p-4", className)}
      {...props}
    >
      <div className="mb-2 flex items-start justify-between gap-3">
        <span className="font-semibold text-sm">{provider} request</span>
        <Badge variant={statusToPill[status]}>
          <Clock /> {statusLabel[status]}
        </Badge>
      </div>
      <div className="text-[13px] text-muted-foreground leading-relaxed">{body}</div>
      {payloadHref && (
        <a
          href={payloadHref}
          className="mt-3 inline-flex items-center gap-1 font-medium text-[13px]"
          style={{ color: "var(--focal)" }}
        >
          View FATF payload <ExternalLink className="size-3" />
        </a>
      )}
    </div>
  )

  if (!framed) return card

  return (
    <div>
      <div className="mb-2.5 font-semibold text-sm">{title}</div>
      {card}
    </div>
  )
}

export type { TravelRuleCardProps }
export { TravelRuleCard }
