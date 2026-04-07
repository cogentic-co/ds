import type * as React from "react"
import { cn } from "../lib/utils"

function Timeline({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="timeline" className={cn("relative space-y-0 pl-8", className)} {...props} />
  )
}

type TimelineItemProps = React.ComponentProps<"div">

function TimelineItem({ className, ...props }: TimelineItemProps) {
  return (
    <div
      data-slot="timeline-item"
      className={cn(
        "relative pb-8 last:pb-0",
        "before:absolute before:top-2 before:left-[-25px] before:h-full before:w-px before:bg-border last:before:hidden",
        className,
      )}
      {...props}
    />
  )
}

type TimelineDotProps = React.ComponentProps<"div">

function TimelineDot({ className, children, ...props }: TimelineDotProps) {
  return (
    <div
      data-slot="timeline-dot"
      className={cn(
        "absolute top-0.5 left-[-35px] flex size-[22px] items-center justify-center rounded-full border-2 border-border bg-card",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function TimelineContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="timeline-content" className={cn("text-sm", className)} {...props} />
}

function TimelineTitle({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="timeline-title" className={cn("font-medium", className)} {...props} />
}

function TimelineTime({ className, ...props }: React.ComponentProps<"time">) {
  return (
    <time
      data-slot="timeline-time"
      className={cn("text-muted-foreground text-xs", className)}
      {...props}
    />
  )
}

export { Timeline, TimelineItem, TimelineDot, TimelineContent, TimelineTitle, TimelineTime }
export type { TimelineItemProps, TimelineDotProps }
