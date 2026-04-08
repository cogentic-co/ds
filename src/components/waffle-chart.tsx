import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { cn } from "../lib/utils"

type WaffleChartSegment = {
  /** Percentage value (0–100) */
  value: number
  /** CSS color (hex, rgb, hsl, oklch). Defaults to var(--color-primary) resolved at render time. */
  color?: string
  /** Optional label */
  label?: string
}

type WaffleChartMode = "grid" | "bar"
type WaffleChartSize = "xs" | "sm" | "default" | "lg"

const waffleChartVariants = cva("w-full text-foreground", {
  variants: {
    mode: {
      grid: "",
      bar: "",
    },
    size: {
      xs: "",
      sm: "",
      default: "",
      lg: "",
    },
  },
  compoundVariants: [
    { mode: "bar", size: "xs", className: "h-4" },
    { mode: "bar", size: "sm", className: "h-6" },
    { mode: "bar", size: "default", className: "h-10" },
    { mode: "bar", size: "lg", className: "h-16" },
    { mode: "grid", size: "xs", className: "max-w-32 aspect-square" },
    { mode: "grid", size: "sm", className: "max-w-48 aspect-square" },
    { mode: "grid", size: "default", className: "max-w-sm aspect-square" },
    { mode: "grid", size: "lg", className: "max-w-lg aspect-square" },
  ],
  defaultVariants: {
    mode: "grid",
    size: "default",
  },
})

type WaffleChartProps = Omit<React.ComponentProps<"div">, "size"> &
  Omit<VariantProps<typeof waffleChartVariants>, "mode"> & {
    /** Segments to display. Remaining cells render as muted. */
    segments: WaffleChartSegment[]
    /** Display mode. "grid" renders a square waffle grid, "bar" renders a horizontal striped bar. Defaults to "grid". */
    mode?: WaffleChartMode
    /** Size variant. Defaults to "default". */
    size?: WaffleChartSize
    /** Whether to animate cells filling in. Defaults to true. */
    animate?: boolean
    /** Animation duration in ms. Defaults to 800. */
    duration?: number
    /** Gap between cells in px. Defaults to 2 for grid, 2.5 for bar. */
    gap?: number
    /** Corner radius of each cell in px. Defaults to 2 for grid, 1 for bar. */
    radius?: number
    /** Number of rows (grid mode). Defaults to 10. */
    rows?: number
    /** Number of columns (grid mode). Defaults to 10. */
    cols?: number
    /** Total number of stripes (bar mode). Defaults to 60. */
    stripes?: number
    /** Show dotted dividers between segments (bar mode only). Defaults to true. */
    dividers?: boolean
  }

function WaffleChart({
  segments,
  mode = "grid",
  size = "default",
  animate = true,
  duration = 800,
  gap: gapProp,
  radius: radiusProp,
  rows = 10,
  cols = 10,
  stripes = 60,
  dividers = true,
  className,
  ...props
}: WaffleChartProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const progressRef = React.useRef(animate ? 0 : 1)
  const startTimeRef = React.useRef<number | null>(null)
  const colorsRef = React.useRef<{ muted: string; divider: string; primary: string } | null>(null)

  const gap = gapProp ?? (mode === "bar" ? 2.5 : 2)
  const radius = radiusProp ?? (mode === "bar" ? 1 : 2)

  // ── Grid mode data ──
  const totalCells = rows * cols
  const gridCellData = React.useMemo(() => {
    if (mode !== "grid") return []
    const cells: { color: string | null; useDefault: boolean }[] = []
    for (const seg of segments) {
      const count = Math.round((seg.value / 100) * totalCells)
      const hasExplicitColor = seg.color != null
      for (let i = 0; i < count; i++) {
        cells.push({ color: seg.color ?? null, useDefault: !hasExplicitColor })
      }
    }
    const remaining = Math.max(0, totalCells - cells.length)
    for (let i = 0; i < remaining; i++) {
      cells.push({ color: null, useDefault: false })
    }
    return cells
  }, [segments, totalCells, mode])

  // ── Bar mode data ──
  const { barBlocks: barBlockData, barDividerCount } = React.useMemo(() => {
    if (mode !== "bar")
      return {
        barBlocks: [] as { color: string | null; useDefault: boolean; dividerAfter: boolean }[],
        barDividerCount: 0,
      }
    const blocks: { color: string | null; useDefault: boolean; dividerAfter: boolean }[] = []
    for (const seg of segments) {
      const count = Math.round((seg.value / 100) * stripes)
      const hasExplicitColor = seg.color != null
      for (let i = 0; i < count; i++) {
        blocks.push({
          color: seg.color ?? null,
          useDefault: !hasExplicitColor,
          dividerAfter: false,
        })
      }
      if (dividers && blocks.length > 0) {
        blocks[blocks.length - 1].dividerAfter = true
      }
    }
    const remaining = Math.max(0, stripes - blocks.length)
    for (let i = 0; i < remaining; i++) {
      blocks.push({ color: null, useDefault: false, dividerAfter: false })
    }
    if (blocks.length > 0) {
      blocks[blocks.length - 1].dividerAfter = false
    }
    return { barBlocks: blocks, barDividerCount: blocks.filter((b) => b.dividerAfter).length }
  }, [segments, stripes, dividers, mode])

  // Resolve theme colors once on mount
  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const style = getComputedStyle(container)
    const fg = style.color
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

  // ── Grid draw ──
  const drawGrid = React.useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      if (totalCells === 0) return
      const cellW = (w - (cols - 1) * gap) / cols
      const cellH = (h - (rows - 1) * gap) / rows
      const progress = progressRef.current
      const visibleCells = Math.floor(progress * totalCells)
      const colors = colorsRef.current ?? {
        muted: "oklch(0.5 0 0 / 0.1)",
        primary: "var(--color-primary)",
      }

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const idx = row * cols + col
          const cell = gridCellData[idx]
          if (!cell) continue
          const hasColor = cell.color !== null || cell.useDefault
          const isFilled = hasColor && idx < visibleCells
          const fillColor = cell.useDefault ? colors.primary : cell.color!
          ctx.fillStyle = isFilled ? fillColor : colors.muted
          const x = col * (cellW + gap)
          const y = row * (cellH + gap)
          ctx.beginPath()
          ctx.roundRect(x, y, cellW, cellH, radius)
          ctx.fill()
        }
      }
    },
    [gridCellData, rows, cols, gap, radius, totalCells],
  )

  // ── Bar draw ──
  const drawBar = React.useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      const total = barBlockData.length
      if (total === 0) return

      const rowGap = gap
      const colGap = gap
      const dividerGap = 10
      const dividerCount = barDividerCount

      const targetSize = 4
      const barRows = Math.max(1, Math.floor((h + rowGap) / (targetSize + rowGap)))
      const blockH = (h - (barRows - 1) * rowGap) / barRows
      // For divider blocks, replace the normal colGap with dividerGap (equal space on each side of dots)
      const normalGaps = total - 1 - dividerCount
      const availableWidth = w - normalGaps * colGap - dividerCount * dividerGap
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
        const block = barBlockData[col]
        const hasColor = block.color !== null || block.useDefault
        const isFilled = hasColor && col < visibleCols
        const fillColor = block.useDefault ? colors.primary : block.color!
        ctx.fillStyle = isFilled ? fillColor : colors.muted

        for (let row = 0; row < barRows; row++) {
          const y = row * (blockH + rowGap)
          ctx.beginPath()
          ctx.roundRect(x, y, blockW, blockH, radius)
          ctx.fill()
        }

        if (block.dividerAfter) {
          // Advance past the block, then center dots in the dividerGap
          const halfGap = dividerGap / 2
          x += blockW + halfGap

          const dotRadius = 1
          const dotSpacing = 4
          const dotCount = Math.max(3, Math.floor(h / dotSpacing))
          const totalDotH = dotCount * dotSpacing
          const startY = (h - totalDotH) / 2 + dotSpacing / 2
          ctx.fillStyle = colors.divider
          for (let d = 0; d < dotCount; d++) {
            const dotY = startY + d * dotSpacing
            ctx.beginPath()
            ctx.arc(x, dotY, dotRadius, 0, Math.PI * 2)
            ctx.fill()
          }

          x += halfGap
        } else if (col < total - 1) {
          x += blockW + colGap
        }
      }
    },
    [barBlockData, gap, radius, barDividerCount],
  )

  const draw = React.useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const dpr = window.devicePixelRatio || 1
    const rect = container.getBoundingClientRect()
    const w = rect.width
    const h = rect.height
    if (w === 0 || h === 0) return

    const newW = Math.round(w * dpr)
    const newH = Math.round(h * dpr)
    if (canvas.width !== newW || canvas.height !== newH) {
      canvas.width = newW
      canvas.height = newH
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
    }

    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, w, h)

    if (mode === "grid") {
      drawGrid(ctx, w, h)
    } else {
      drawBar(ctx, w, h)
    }
  }, [mode, drawGrid, drawBar])

  // Animation loop
  React.useEffect(() => {
    if (!animate) {
      progressRef.current = 1
      const id = requestAnimationFrame(() => draw())
      return () => cancelAnimationFrame(id)
    }

    progressRef.current = 0
    startTimeRef.current = null
    let rafId: number

    function animateFrame(timestamp: number) {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const elapsed = timestamp - startTimeRef.current
      const t = Math.min(elapsed / duration, 1)
      progressRef.current = 1 - (1 - t) ** 3
      draw()
      if (t < 1) {
        rafId = requestAnimationFrame(animateFrame)
      }
    }

    rafId = requestAnimationFrame(animateFrame)
    return () => cancelAnimationFrame(rafId)
  }, [animate, duration, draw])

  // Redraw on resize
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

  const ariaLabel =
    segments
      .filter((s) => s.label)
      .map((s) => `${s.label} ${s.value}%`)
      .join(", ") || "Chart"

  return (
    <div
      ref={containerRef}
      data-slot="waffle-chart"
      role="img"
      aria-label={ariaLabel}
      className={cn(waffleChartVariants({ mode, size }), className)}
      {...props}
    >
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  )
}

export { WaffleChart, waffleChartVariants }
export type { WaffleChartProps, WaffleChartSegment, WaffleChartMode, WaffleChartSize }
