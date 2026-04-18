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
import type { VersionHistoryVersion, VersionStatus } from "./types"

const MotionTimelineItem = motion.create(TimelineItem)

const STATUS_DOT: Record<VersionStatus, string> = {
  current: "border-success bg-success/15 text-success",
  previous: "border-muted-foreground/40 bg-muted text-muted-foreground",
  draft: "border-warning bg-warning/15 text-warning",
}

export interface VersionHistoryProps extends ComponentProps<"div"> {
  title: string
  versions: VersionHistoryVersion[]
}

/**
 * Git-style version history for a versioned artefact. Each version is
 * a timeline dot + commit-style summary + author byline + optional
 * stats chips. The first version defaults to `current` status; the
 * rest to `previous` unless overridden.
 */
export function VersionHistory({ title, versions, className, ...props }: VersionHistoryProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <div
      ref={ref}
      data-slot="showcase-version-history"
      className={cn("flex h-full items-center justify-center p-6", className)}
      {...props}
    >
      <div className="w-full max-w-[400px]">
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="truncate font-semibold text-foreground text-xs">{title}</p>
            <Badge variant="tagline" className="shrink-0 rounded-sm text-xxs">
              Version history
            </Badge>
          </div>

          <Timeline className="pl-7">
            {versions.map((v, i) => {
              const status: VersionStatus = v.status ?? (i === 0 ? "current" : "previous")
              return (
                <MotionTimelineItem
                  key={v.version}
                  className="pb-5"
                  initial={{ opacity: 0, x: -6 }}
                  animate={inView ? { opacity: 1, x: 0 } : undefined}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.3, ease: "easeOut" }}
                >
                  <TimelineDot className={cn("size-4", STATUS_DOT[status])} />
                  <TimelineContent>
                    <div className="flex items-center gap-2">
                      <TimelineTitle className="font-mono font-semibold text-foreground text-xs tabular-nums">
                        {v.version}
                      </TimelineTitle>
                      <Badge
                        variant="secondary"
                        className={cn(
                          "rounded-sm text-xxs",
                          status === "current" && "bg-success/10 text-success",
                          status === "draft" && "bg-warning/10 text-warning",
                        )}
                      >
                        {status}
                      </Badge>
                    </div>

                    {v.summary && (
                      <p className="mt-1 text-foreground text-xs leading-snug">{v.summary}</p>
                    )}

                    {(v.author || v.date || v.range) && (
                      <p className="mt-1 text-muted-foreground text-xxs">
                        {v.author && (
                          <>
                            <span className="font-medium text-foreground/80">{v.author}</span>
                            {v.role && <span>{` · ${v.role}`}</span>}
                          </>
                        )}
                        {v.date && (v.author ? ` · ${v.date}` : v.date)}
                        {v.range && !v.date && v.range}
                      </p>
                    )}

                    {v.stats && v.stats.length > 0 && (
                      <ul className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-0.5">
                        {v.stats.map((s) => (
                          <li key={s.label} className="text-muted-foreground text-xxs">
                            <span className="font-mono font-semibold text-foreground/80 tabular-nums">
                              {s.value}
                            </span>{" "}
                            {s.label}
                          </li>
                        ))}
                      </ul>
                    )}
                  </TimelineContent>
                </MotionTimelineItem>
              )
            })}
          </Timeline>
        </div>
      </div>
    </div>
  )
}
