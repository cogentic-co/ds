import type { ComponentProps } from "react"

import { RingCard } from "../components/ring-card"
import { cn } from "../lib/utils"

type ReviewRule = {
  name: string
  value: number
  tone: "highlight" | "blush" | "sky" | "lilac" | "mint"
}

type AwaitingReviewCardProps = Omit<ComponentProps<"div">, "children"> & {
  rules: ReviewRule[]
  avgResolution?: string
  title?: string
  subtitle?: string
}

const toneBg: Record<ReviewRule["tone"], string> = {
  highlight: "bg-highlight",
  blush: "bg-blush",
  sky: "bg-sky",
  lilac: "bg-lilac",
  mint: "bg-mint",
}

function AwaitingReviewCard({
  rules,
  avgResolution,
  title = "Awaiting review",
  subtitle = "Transactions held by compliance rules",
  className,
  ...props
}: AwaitingReviewCardProps) {
  const max = Math.max(...rules.map((r) => r.value), 1)

  return (
    <RingCard className={cn(className)} {...props}>
      <div className="font-semibold text-sm">{title}</div>
      <div className="mt-0.5 text-[13px] text-muted-foreground">{subtitle}</div>

      <div className="mt-3.5 grid gap-2">
        {rules.map((r) => (
          <div
            key={r.name}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-2.5"
          >
            <span
              className={cn(
                "size-2 rounded-[2px]",
                toneBg[r.tone],
              )}
            />
            <span className="font-medium text-[13px]">{r.name}</span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-14 overflow-hidden rounded-full bg-muted">
                <span
                  className={cn("block h-full", toneBg[r.tone])}
                  style={{ width: `${(r.value / max) * 100}%` }}
                />
              </span>
              <span className="w-5 text-right font-mono font-semibold text-xs">
                {r.value}
              </span>
            </span>
          </div>
        ))}
      </div>

      {avgResolution && (
        <div className="mt-3.5 flex items-baseline justify-between border-border border-t border-dashed pt-2.5 text-muted-foreground text-xs">
          <span>Avg resolution</span>
          <span className="font-mono font-semibold">{avgResolution}</span>
        </div>
      )}
    </RingCard>
  )
}

export { AwaitingReviewCard }
export type { AwaitingReviewCardProps, ReviewRule }
