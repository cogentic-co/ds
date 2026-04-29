import type { ComponentProps } from "react"

import { cn } from "../lib/utils"

/**
 * @figma Sparkline
 * @figmaNode 294:167
 * @figmaUrl https://figma.com/design/1FH1KCGLeK5GR222JUS2Iu?node-id=109-18
 *
 * Inline trend mark. Hand-rolled SVG (no chart library) — sparklines
 * are pure presentational geometry, so a dedicated lib adds weight
 * without simplifying. For full charts with axes/tooltips use
 * `@cogentic-co/ds/charts` (Recharts).
 */

type SparklineProps = Omit<ComponentProps<"svg">, "children" | "points" | "fill"> & {
  /** Series of values. Need ≥ 2 to render. */
  points: number[]
  /** Stroke (and area fill) color. Defaults to `var(--chart-1)` to match Figma. */
  color?: string
  /** Render an area below the line. Default `false`. */
  fill?: boolean
  /** Render a dot at the latest point. Default `false`. */
  showDot?: boolean
  /** Smooth the line with a Catmull-Rom curve. Default `false`. */
  smooth?: boolean
  /** Pixel height of the SVG (width is 100%). Default `36`. */
  height?: number
  /** Stroke width in px. Default `2`. */
  strokeWidth?: number
  /** Override the role/aria-label. Default `aria-label="Trend sparkline"`. */
  ariaLabel?: string
}

const VIEWBOX_WIDTH = 160
const PADDING_Y = 2

function buildLinearPath(pts: ReadonlyArray<readonly [number, number]>) {
  return `M ${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L ")}`
}

function buildSmoothPath(pts: ReadonlyArray<readonly [number, number]>) {
  // Catmull-Rom → cubic Bezier conversion. Smooth but not bouncy.
  if (pts.length < 2) return ""
  const [first, ...rest] = pts
  if (pts.length === 2) return `M ${first[0]} ${first[1]} L ${rest[0][0]} ${rest[0][1]}`
  let d = `M ${first[0].toFixed(1)} ${first[1].toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? p2
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  return d
}

function Sparkline({
  points,
  color = "var(--chart-1)",
  fill = false,
  showDot = false,
  smooth = false,
  height = 36,
  strokeWidth = 2,
  ariaLabel = "Trend sparkline",
  className,
  ...props
}: SparklineProps) {
  if (points.length < 2) return null

  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const w = VIEWBOX_WIDTH
  const h = height
  const usable = h - PADDING_Y * 2

  const pts = points.map(
    (p, i) =>
      [(i / (points.length - 1)) * w, h - PADDING_Y - ((p - min) / range) * usable] as const,
  )
  const d = smooth ? buildSmoothPath(pts) : buildLinearPath(pts)
  const last = pts[pts.length - 1]

  return (
    <svg
      data-slot="sparkline"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      role="img"
      aria-label={ariaLabel}
      className={cn(className)}
      style={{ display: "block", width: "100%", height }}
      {...props}
    >
      {fill && <path d={`${d} L ${w} ${h} L 0 ${h} Z`} fill={color} opacity={0.12} />}
      <path
        d={d}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      {showDot && <circle cx={last[0]} cy={last[1]} r={2.5} fill={color} />}
    </svg>
  )
}

export type { SparklineProps }
export { Sparkline }
