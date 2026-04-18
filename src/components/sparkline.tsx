import type { ComponentProps } from "react"

import { cn } from "../lib/utils"

type SparklineProps = Omit<ComponentProps<"svg">, "children" | "points" | "fill"> & {
  points: number[]
  color?: string
  fill?: boolean
  height?: number
}

function Sparkline({
  points,
  color = "var(--focal)",
  fill = true,
  height = 36,
  className,
  ...props
}: SparklineProps) {
  if (points.length < 2) return null

  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const w = 160
  const h = height

  const pts = points.map(
    (p, i) => [(i / (points.length - 1)) * w, h - ((p - min) / range) * (h - 4) - 2] as const,
  )
  const d = `M ${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L ")}`
  const last = pts[pts.length - 1]

  return (
    <svg
      data-slot="sparkline"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      role="img"
      aria-label="Trend sparkline"
      className={cn(className)}
      style={{ display: "block", width: "100%", height }}
      {...props}
    >
      {fill && <path d={`${d} L ${w} ${h} L 0 ${h} Z`} fill={color} opacity={0.12} />}
      <path
        d={d}
        stroke={color}
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={last[0]} cy={last[1]} r={2.5} fill={color} />
    </svg>
  )
}

export type { SparklineProps }
export { Sparkline }
