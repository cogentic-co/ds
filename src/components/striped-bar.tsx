import * as React from "react"
import { cn } from "../lib/utils"

type StripedBarSegment = {
  /** Percentage value (0–100) */
  value: number
  /** CSS color (hex, rgb, hsl, oklch). Defaults to var(--color-primary) resolved at render time. */
  color?: string
  /** Optional label */
  label?: string
}

type StripedBarProps = React.ComponentProps<"div"> & {
  /** Segments to display. Remaining percentage renders as muted blocks. */
  segments: StripedBarSegment[]
  /** Total number of columns. Defaults to 60. */
  stripes?: number
  /** Whether to animate blocks filling in. Defaults to true. */
  animated?: boolean
  /** Animation duration in ms. Defaults to 800. */
  duration?: number
}

function StripedBar({
  segments,
  stripes: totalStripes = 60,
  animated = true,
  duration = 800,
  className,
  ...props
}: StripedBarProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const progressRef = React.useRef(animated ? 0 : 1)
  const startTimeRef = React.useRef<number | null>(null)
  const colorsRef = React.useRef<{ muted: string; divider: string; primary: string } | null>(null)

  const blockData = React.useMemo(() => {
    const blocks: { color: string | null; useDefault: boolean; dividerAfter: boolean }[] = []

    for (let s = 0; s < segments.length; s++) {
      const seg = segments[s]
      const count = Math.round((seg.value / 100) * totalStripes)
      const hasExplicitColor = seg.color != null
      for (let i = 0; i < count; i++) {
        blocks.push({
          color: seg.color ?? null,
          useDefault: !hasExplicitColor,
          dividerAfter: false,
        })
      }
      if (blocks.length > 0) {
        blocks[blocks.length - 1].dividerAfter = true
      }
    }

    const remaining = Math.max(0, totalStripes - blocks.length)
    for (let i = 0; i < remaining; i++) {
      blocks.push({ color: null, useDefault: false, dividerAfter: false })
    }

    if (blocks.length > 0) {
      blocks[blocks.length - 1].dividerAfter = false
    }

    return blocks
  }, [segments, totalStripes])

  // Resolve theme colors once on mount (not during draw)
  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const style = getComputedStyle(container)
    const fg = style.color
    // Parse the foreground color to create muted/divider variants
    // fg is typically "rgb(r, g, b)" or "rgba(r, g, b, a)"
    const match = fg.match(/[\d.]+/g)
    const primary =
      style.getPropertyValue("--color-primary").trim() || style.getPropertyValue("--primary").trim()
    if (match && match.length >= 3) {
      const [r, g, b] = match
      colorsRef.current = {
        muted: `rgba(${r}, ${g}, ${b}, 0.1)`,
        divider: `rgba(${r}, ${g}, ${b}, 0.3)`,
        primary: primary || `rgb(${r}, ${g}, ${b})`,
      }
    } else {
      colorsRef.current = {
        muted: "color-mix(in oklch, var(--foreground) 10%, transparent)",
        divider: "color-mix(in oklch, var(--foreground) 30%, transparent)",
        primary: primary || "var(--color-primary)",
      }
    }
  }, [])

  const draw = React.useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const dpr = window.devicePixelRatio || 1
    const rect = container.getBoundingClientRect()
    const w = rect.width
    const h = rect.height
    if (w === 0 || h === 0) return

    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`

    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, w, h)

    const total = blockData.length
    if (total === 0) return

    const colGap = 2.5
    const rowGap = 2.5
    const dividerGap = 8
    const dividerCount = blockData.filter((b) => b.dividerAfter).length
    const radius = 1

    const targetSize = 4
    const rows = Math.max(1, Math.floor((h + rowGap) / (targetSize + rowGap)))
    const blockH = (h - (rows - 1) * rowGap) / rows

    const availableWidth = w - (total - 1) * colGap - dividerCount * dividerGap
    const blockW = Math.max(2, availableWidth / total)

    const progress = progressRef.current
    const visibleCols = Math.floor(progress * total)

    const colors = colorsRef.current ?? {
      muted: "oklch(0.5 0 0 / 0.1)",
      divider: "oklch(0.5 0 0 / 0.3)",
      primary: "var(--color-primary)",
    }

    let x = 0
    for (let col = 0; col < total; col++) {
      const block = blockData[col]
      const hasColor = block.color !== null || block.useDefault
      const isFilled = hasColor && col < visibleCols

      const fillColor = block.useDefault ? colors.primary : block.color!
      ctx.fillStyle = isFilled ? fillColor : colors.muted

      for (let row = 0; row < rows; row++) {
        const y = row * (blockH + rowGap)
        ctx.beginPath()
        ctx.roundRect(x, y, blockW, blockH, radius)
        ctx.fill()
      }

      x += blockW + colGap

      if (block.dividerAfter) {
        const dotRadius = 1.2
        const dotSpacing = 4.5
        const dotCount = Math.max(3, Math.floor(h / dotSpacing))
        const totalDotH = dotCount * dotSpacing
        const startY = (h - totalDotH) / 2 + dotSpacing / 2
        const dotX = x + dividerGap / 2 - colGap / 2

        ctx.fillStyle = colors.divider
        for (let d = 0; d < dotCount; d++) {
          const dotY = startY + d * dotSpacing
          ctx.beginPath()
          ctx.arc(dotX, dotY, dotRadius, 0, Math.PI * 2)
          ctx.fill()
        }

        x += dividerGap - colGap
      }
    }
  }, [blockData])

  // Animation loop
  React.useEffect(() => {
    if (!animated) {
      progressRef.current = 1
      // Defer to allow colors to resolve first
      const id = requestAnimationFrame(() => draw())
      return () => cancelAnimationFrame(id)
    }

    progressRef.current = 0
    startTimeRef.current = null
    let rafId: number

    function animate(timestamp: number) {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const elapsed = timestamp - startTimeRef.current
      const t = Math.min(elapsed / duration, 1)
      progressRef.current = 1 - (1 - t) ** 3
      draw()
      if (t < 1) {
        rafId = requestAnimationFrame(animate)
      }
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [animated, duration, draw])

  // Redraw on resize (debounced to avoid loops)
  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return
    let timeout: ReturnType<typeof setTimeout>
    const observer = new ResizeObserver(() => {
      clearTimeout(timeout)
      timeout = setTimeout(() => draw(), 50)
    })
    observer.observe(container)
    return () => {
      observer.disconnect()
      clearTimeout(timeout)
    }
  }, [draw])

  return (
    <div
      ref={containerRef}
      data-slot="striped-bar"
      className={cn("h-10 w-full text-foreground", className)}
      {...props}
    >
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  )
}

export { StripedBar }
export type { StripedBarProps, StripedBarSegment }
