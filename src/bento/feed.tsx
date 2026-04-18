"use client"

import { motion, useInView } from "motion/react"
import { type ComponentProps, useRef } from "react"
import { Badge } from "../components/badge"
import {
  Timeline,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineTitle,
} from "../components/timeline"
import { cn } from "../lib/utils"
import type { FeedItem } from "./types"

const MotionTimelineItem = motion.create(TimelineItem)

const DOT_STYLES: Record<FeedItem["status"], string> = {
  success: "border-success bg-success/15",
  warning: "border-warning bg-warning/15",
  info: "border-focal bg-focal/15",
  default: "border-muted-foreground bg-muted",
}

export interface FeedProps extends ComponentProps<"div"> {
  items: FeedItem[]
}

/**
 * Timeline-style activity feed bento. Each row has a status-coloured
 * dot, label + detail, and an optional trailing meta badge (e.g.
 * regulator / source).
 */
export function Feed({ items, className, ...props }: FeedProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <div ref={ref} data-slot="bento-feed" className={className} {...props}>
      <div className="flex h-full flex-col justify-center p-5">
        <Timeline className="pl-7">
          {items.map((item, i) => (
            <MotionTimelineItem
              key={item.label}
              className="pb-4"
              initial={{ opacity: 0, x: -6 }}
              animate={inView ? { opacity: 1, x: 0 } : undefined}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.3, ease: "easeOut" }}
            >
              <TimelineDot className={cn("size-4", DOT_STYLES[item.status])} />
              <TimelineContent>
                <div className="flex items-baseline justify-between gap-2">
                  <TimelineTitle className="font-medium text-foreground text-xs">
                    {item.label}
                  </TimelineTitle>
                  {item.meta && (
                    <Badge
                      variant="secondary"
                      className="shrink-0 whitespace-nowrap rounded-sm text-xxs"
                    >
                      {item.meta}
                    </Badge>
                  )}
                </div>
                <p className="mt-0.5 text-muted-foreground text-xxs">{item.detail}</p>
              </TimelineContent>
            </MotionTimelineItem>
          ))}
        </Timeline>
      </div>
    </div>
  )
}
