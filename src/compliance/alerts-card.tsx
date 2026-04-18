import { AlertTriangle } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"

import { cn } from "../lib/utils"

type AlertTone = "highlight" | "blush" | "sky" | "lilac" | "mint"

type AlertEntry = {
  id: string
  tone: AlertTone
  title: string
  body: ReactNode
  time: string
  icon?: ReactNode
}

const TONE_CLASSES: Record<AlertTone, string> = {
  highlight: "bg-highlight text-highlight-ink",
  blush: "bg-blush text-blush-ink",
  sky: "bg-sky text-sky-ink",
  lilac: "bg-lilac text-lilac-ink",
  mint: "bg-mint text-mint-ink",
}

type AlertsCardProps = Omit<ComponentProps<"div">, "children"> & {
  alerts: AlertEntry[]
  title?: string
  viewAllLabel?: string
  onViewAll?: () => void
  onSelect?: (alert: AlertEntry) => void
}

function AlertsCard({
  alerts,
  title = "Alerts",
  viewAllLabel = "View all",
  onViewAll,
  onSelect,
  className,
  ...props
}: AlertsCardProps) {
  return (
    <div
      data-slot="alerts-card"
      className={cn(
        "overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card shadow-[var(--shadow-card)]",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between border-border-light border-b px-[18px] py-3.5">
        <div className="font-semibold text-sm">{title}</div>
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

      {alerts.map((a, i) => (
        <button
          key={a.id}
          type="button"
          onClick={onSelect ? () => onSelect(a) : undefined}
          className={cn(
            "grid w-full grid-cols-[auto_1fr_auto] items-start gap-3 px-[18px] py-3 text-left transition-colors",
            i < alerts.length - 1 && "border-border-light border-b",
            onSelect && "cursor-pointer hover:bg-muted/40",
          )}
        >
          <span
            aria-hidden
            className={cn(
              "mt-0.5 inline-flex size-7 items-center justify-center rounded-[var(--radius-md)]",
              TONE_CLASSES[a.tone],
            )}
          >
            {a.icon ?? <AlertTriangle className="size-3.5" />}
          </span>
          <div className="min-w-0">
            <div className="font-semibold text-[13px]">{a.title}</div>
            <div className="mt-0.5 text-muted-foreground text-xs leading-[1.45]">
              {a.body}
            </div>
          </div>
          <div className="whitespace-nowrap font-mono text-[11px] text-muted-foreground">
            {a.time}
          </div>
        </button>
      ))}
    </div>
  )
}

export { AlertsCard }
export type { AlertsCardProps, AlertEntry, AlertTone }
