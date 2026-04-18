import type { ComponentProps } from "react"

import { cn } from "../lib/utils"
import type { ComplianceTimelineEvent } from "./types"

type EventTimelineProps = ComponentProps<"div"> & {
  events: ComplianceTimelineEvent[]
}

const dotVar: Record<ComplianceTimelineEvent["variant"], string> = {
  neutral: "var(--muted-foreground)",
  sky: "var(--sky-ink)",
  mint: "var(--mint-ink)",
  blush: "var(--blush-ink)",
  highlight: "var(--highlight-ink)",
}

function EventTimeline({ events, className, ...props }: EventTimelineProps) {
  return (
    <div data-slot="event-timeline" className={cn(className)} {...props}>
      {events.map((e, i) => {
        const isLast = i === events.length - 1
        const dot = dotVar[e.variant]
        return (
          <div
            key={`${e.time}-${e.title}`}
            className={cn("relative grid grid-cols-[72px_18px_1fr] gap-3", !isLast && "pb-[18px]")}
          >
            {!isLast && <div className="absolute top-3.5 bottom-0 left-20 w-px bg-border" />}
            <div className="pt-[3px] text-right font-mono text-[11px] text-muted-foreground">
              {e.time}
            </div>
            <div className="flex justify-center pt-[3px]">
              <span
                className={cn(
                  "size-2.5 rounded-full border-2 border-card",
                  e.active && "motion-safe:animate-pulse",
                )}
                style={{
                  background: dot,
                  boxShadow: `0 0 0 1px ${dot}`,
                }}
              />
            </div>
            <div>
              <div className="font-semibold text-[13px]">{e.title}</div>
              <div className="mt-0.5 text-muted-foreground text-xs">{e.by}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export type { EventTimelineProps }
export { EventTimeline }
