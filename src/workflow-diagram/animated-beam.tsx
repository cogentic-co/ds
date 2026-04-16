"use client"

import { motion } from "motion/react"
import { type RefObject, useEffect, useId, useLayoutEffect, useRef, useState } from "react"
import { cn } from "../lib/utils"

/**
 * Ref-based animated connector between two DOM nodes inside a shared
 * container. Measures `fromRef` + `toRef` relative to `containerRef`
 * and draws a cubic-bezier path between them, with an optional
 * travelling dot marker.
 *
 * Use when you want to connect two elements whose positions depend on
 * flexbox/grid layout — avoids hard-coded SVG coordinates and adapts
 * on resize.
 *
 * ## Lifecycle gotchas
 *
 * - Measurement happens via `ResizeObserver` + `getBoundingClientRect`
 *   in a `useLayoutEffect`. If the target elements are animated in with
 *   CSS transforms (and not a layout change), the observer won't fire —
 *   the initial bounding rect is captured on mount and stays correct
 *   unless layout shifts.
 * - One post-paint `requestAnimationFrame` re-measure is built in to
 *   cover fonts/images that shift layout after first paint.
 * - If the `from` or `to` element is initially `display: none`, the
 *   path won't render until it's in the layout flow.
 *
 * For stage-to-stage diagrams (1→N, N→1 fan-out/merge) where the node
 * count is known up-front, prefer `WorkflowDiagram` — it draws inline
 * SVG against stage counts and is more reliable with motion's lifecycle.
 */

type BeamTone = "primary" | "success" | "muted"

export interface AnimatedBeamProps {
  containerRef: RefObject<HTMLElement | null>
  fromRef: RefObject<HTMLElement | null>
  toRef: RefObject<HTMLElement | null>
  /**
   * Curvature of the connector. 0 = straight line. Positive values
   * bow the line outward (useful for vertical flows between stacked
   * stages); negative values invert. Defaults to a gentle vertical S.
   */
  curvature?: number
  /** Flow direction — picks whether the bezier bulge is along Y (vertical) or X (horizontal). */
  flow?: "vertical" | "horizontal"
  /** Dashed line for "not taken" / muted paths. */
  dashed?: boolean
  tone?: BeamTone
  /** Show a pulsing dot travelling along the path. Off by default. */
  marker?: "dot" | "none"
  /** Duration of one travelling-dot cycle in seconds. */
  pulseDuration?: number
  /** Initial offset into the pulse cycle (to stagger multiple beams). */
  pulseDelay?: number
  className?: string
}

const TONE_STROKE: Record<BeamTone, string> = {
  primary: "text-primary",
  success: "text-success",
  muted: "text-border",
}

const TONE_FILL: Record<BeamTone, string> = {
  primary: "fill-primary",
  success: "fill-success",
  muted: "fill-border",
}

export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  curvature = 0.5,
  flow = "vertical",
  dashed = false,
  tone = "muted",
  marker = "none",
  pulseDuration = 1.6,
  pulseDelay = 0,
  className,
}: AnimatedBeamProps) {
  const id = useId()
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [path, setPath] = useState<string | null>(null)
  const [endpoints, setEndpoints] = useState<{
    from: { x: number; y: number }
    to: { x: number; y: number }
  } | null>(null)

  const rafRef = useRef<number | null>(null)

  useLayoutEffect(() => {
    const container = containerRef.current
    const fromEl = fromRef.current
    const toEl = toRef.current
    if (!container || !fromEl || !toEl) return

    const measure = () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const containerRect = container.getBoundingClientRect()
        const fromRect = fromEl.getBoundingClientRect()
        const toRect = toEl.getBoundingClientRect()

        const fromX = fromRect.left - containerRect.left + fromRect.width / 2
        const toX = toRect.left - containerRect.left + toRect.width / 2

        const fromY =
          flow === "vertical"
            ? fromRect.bottom - containerRect.top
            : fromRect.top - containerRect.top + fromRect.height / 2
        const toY =
          flow === "vertical"
            ? toRect.top - containerRect.top
            : toRect.top - containerRect.top + toRect.height / 2

        const fromXH = flow === "horizontal" ? fromRect.right - containerRect.left : fromX
        const toXH = flow === "horizontal" ? toRect.left - containerRect.left : toX

        const startX = flow === "horizontal" ? fromXH : fromX
        const endX = flow === "horizontal" ? toXH : toX

        const dy = flow === "vertical" ? toY - fromY : 0
        const dx = endX - startX
        const bulge = flow === "vertical" ? dy * curvature : dx * curvature

        const c1x = flow === "vertical" ? startX : startX + bulge
        const c1y = flow === "vertical" ? fromY + bulge : fromY
        const c2x = flow === "vertical" ? endX : endX - bulge
        const c2y = flow === "vertical" ? toY - bulge : toY

        setPath(`M ${startX} ${fromY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${toY}`)
        setEndpoints({ from: { x: startX, y: fromY }, to: { x: endX, y: toY } })
        setSize({ width: containerRect.width, height: containerRect.height })
      })
    }

    measure()

    const ro = new ResizeObserver(measure)
    ro.observe(container)
    ro.observe(fromEl)
    ro.observe(toEl)
    window.addEventListener("resize", measure)

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [containerRef, fromRef, toRef, curvature, flow])

  // Re-measure once after first paint in case fonts/images shifted layout.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const container = containerRef.current
      if (container) container.dispatchEvent(new Event("resize"))
    })
    return () => cancelAnimationFrame(raf)
  }, [containerRef])

  if (!path || !endpoints || size.width === 0) return null

  const pulseId = `beam-pulse-${id}`

  return (
    <svg
      data-slot="animated-beam"
      className={cn("pointer-events-none absolute inset-0", className)}
      width={size.width}
      height={size.height}
      viewBox={`0 0 ${size.width} ${size.height}`}
      fill="none"
      aria-hidden
    >
      <path
        d={path}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeDasharray={dashed ? "3 3" : undefined}
        className={TONE_STROKE[tone]}
      />
      <circle cx={endpoints.from.x} cy={endpoints.from.y} r={3} className={TONE_FILL[tone]} />
      <circle cx={endpoints.to.x} cy={endpoints.to.y} r={3} className={TONE_FILL[tone]} />
      {marker === "dot" && (
        <motion.circle r={2.5} className={TONE_FILL[tone]} initial={{ opacity: 0 }}>
          <animateMotion
            id={pulseId}
            dur={`${pulseDuration}s`}
            begin={pulseDelay > 0 ? `${pulseDelay}s` : "0s"}
            repeatCount="indefinite"
            path={path}
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur={`${pulseDuration}s`}
            begin={pulseDelay > 0 ? `${pulseDelay}s` : "0s"}
            repeatCount="indefinite"
          />
        </motion.circle>
      )}
    </svg>
  )
}
