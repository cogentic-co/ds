"use client"

import type * as React from "react"

import { cn } from "../lib/utils"

type BreathingBarSegment = {
  value: number
  variant?: "mint" | "sky" | "blush" | "lilac" | "highlight" | "unattributed"
  label?: string
}

type BreathingBarProps = React.ComponentProps<"div"> & {
  segments: BreathingBarSegment[]
  /** Animate the whole bar with a left-anchored scaleX pulse. */
  animated?: boolean
  height?: "sm" | "default" | "lg"
  showLegend?: boolean
  format?: (n: number) => string
}

const heightMap = {
  sm: "h-2",
  default: "h-3",
  lg: "h-4",
} as const

const variantBg = {
  mint: "bg-mint",
  sky: "bg-sky",
  blush: "bg-blush",
  lilac: "bg-lilac",
  highlight: "bg-highlight",
  unattributed: "bar-diag",
} as const

const variantInk = {
  mint: "text-mint-ink",
  sky: "text-sky-ink",
  blush: "text-blush-ink",
  lilac: "text-lilac-ink",
  highlight: "text-highlight-ink",
  unattributed: "text-muted-foreground",
} as const

function BreathingBar({
  segments,
  animated = false,
  height = "default",
  showLegend = false,
  format = (n) => String(n),
  className,
  ...props
}: BreathingBarProps) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1

  return (
    <div data-slot="breathing-bar" className={cn("flex w-full flex-col gap-2", className)} {...props}>
      <div
        role="img"
        aria-label={`Bar chart: ${segments.map((s) => `${s.label ?? ""} ${format(s.value)}`).join(", ")}`}
        className={cn(
          "flex w-full origin-left overflow-hidden rounded-full",
          heightMap[height],
          animated && "bar-breathe",
        )}
      >
        {segments.map((seg, i) => {
          const variant = seg.variant ?? "sky"
          return (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: segments are stable per render
              key={i}
              style={{ width: `${(seg.value / total) * 100}%` }}
              className={cn(
                "block h-full transition-[width] duration-500",
                variantBg[variant],
                i === 0 && "rounded-l-full",
                i === segments.length - 1 && "rounded-r-full",
              )}
              aria-hidden
            />
          )
        })}
      </div>

      {showLegend && (
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
          {segments.map((seg, i) => {
            const variant = seg.variant ?? "sky"
            return (
              <li
                // biome-ignore lint/suspicious/noArrayIndexKey: segments are stable per render
                key={i}
                className="flex items-center gap-1.5"
              >
                <span className={cn("inline-block size-2 rounded-full", variantBg[variant])} />
                <span className="text-muted-foreground">{seg.label ?? `Series ${i + 1}`}</span>
                <span className={cn("font-medium font-mono", variantInk[variant])}>
                  {format(seg.value)}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export type { BreathingBarProps, BreathingBarSegment }
export { BreathingBar }
