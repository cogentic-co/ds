"use client"

import { Inbox } from "lucide-react"
import type * as React from "react"
import { cn } from "../lib/utils"

/**
 * Sentinel data key used by ghost placeholder data. Consumers should avoid
 * using this as a real data key since empty-state rendering writes to it.
 */
const GHOST_KEY = "__ghost__"

/** Standard muted fill/stroke color used for ghost placeholder rendering. */
const GHOST_COLOR = "var(--color-border)"

type GhostShape = "sine" | "noise" | "flat"

/**
 * Build ghost placeholder rows for cartesian charts. Returns `count` rows
 * with an empty string at `xKey` and a value at `GHOST_KEY` derived from
 * `shape`. Hoist the result (static per xKey/count/shape) to avoid
 * per-render allocations.
 */
function makeGhostData(xKey: string, shape: GhostShape = "sine", count = 6) {
  return Array.from({ length: count }, (_, i) => {
    let value: number
    if (shape === "sine") value = 50 + Math.sin(i * 0.9) * 12
    else if (shape === "noise") value = 55 + ((i * 23) % 30)
    else value = 55
    return { [xKey]: "", [GHOST_KEY]: value }
  })
}

type ChartEmptyOverlayProps = {
  /** Icon rendered before the label. Default: Inbox */
  icon?: React.ReactNode
  /** Label text. Default: "No data" */
  label?: string
  className?: string
}

/**
 * Small floating pill rendered on top of a chart when it has no data.
 * Pairs with ghost placeholder content rendered by the chart component
 * so the chart shell (axes, grid, container) stays visible.
 */
function ChartEmptyOverlay({ icon, label = "No data", className }: ChartEmptyOverlayProps) {
  return (
    <div
      data-slot="chart-empty-overlay"
      className={cn(
        "pointer-events-none absolute inset-0 z-10 flex items-center justify-center",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 rounded-md border border-border bg-card/80 px-2.5 py-1 text-muted-foreground text-xs shadow-sm backdrop-blur-sm">
        {icon ?? <Inbox className="size-3.5" aria-hidden />}
        <span>{label}</span>
      </div>
    </div>
  )
}

type ChartShellProps = React.ComponentProps<"div"> & {
  /** data-slot attribute for the root element */
  slot: string
  /** Whether the chart has no data */
  isEmpty: boolean
  /** Custom overlay to render when empty. Defaults to ChartEmptyOverlay. */
  empty?: React.ReactNode
}

/**
 * Root wrapper for all chart components. Handles the empty-state overlay
 * pattern: every chart renders ghost data underneath and this shell floats
 * a `ChartEmptyOverlay` on top when `isEmpty` is true.
 */
function ChartShell({ slot, isEmpty, empty, className, children, ...props }: ChartShellProps) {
  return (
    <div
      data-slot={slot}
      data-empty={isEmpty || undefined}
      className={cn("relative", className)}
      {...props}
    >
      {children}
      {isEmpty && (empty ?? <ChartEmptyOverlay />)}
    </div>
  )
}

export type { ChartEmptyOverlayProps, ChartShellProps, GhostShape }
export { ChartEmptyOverlay, ChartShell, GHOST_COLOR, GHOST_KEY, makeGhostData }
