"use client"

import type { ComponentProps } from "react"
import { cn } from "../lib/utils"

type HeatmapCell = {
  x: string
  y: string
  value: number
}

type HeatmapChartProps = ComponentProps<"div"> & {
  data: HeatmapCell[]
  /** Column headers (x-axis labels, e.g. hours: "00:00", "02:00", ...) */
  xLabels: string[]
  /** Row headers (y-axis labels, e.g. days: "Mon", "Tue", ...) */
  yLabels: string[]
  /** Color scale — low end */
  colorLow?: string
  /** Color scale — high end */
  colorHigh?: string
  /** Show a legend bar. Default: true */
  showLegend?: boolean
  /** Legend labels */
  legendLow?: string
  legendHigh?: string
}

function intensityClass(value: number, max: number): string {
  if (max === 0) return "bg-muted/30"
  const ratio = value / max
  if (ratio === 0) return "bg-muted/30"
  if (ratio < 0.25) return "bg-focal/10"
  if (ratio < 0.5) return "bg-focal/25"
  if (ratio < 0.75) return "bg-focal/50"
  return "bg-focal/80"
}

function HeatmapChart({
  data,
  xLabels,
  yLabels,
  showLegend = true,
  legendLow = "Lower",
  legendHigh = "Higher",
  className,
  ...props
}: HeatmapChartProps) {
  const lookup = new Map<string, number>()
  let max = 0
  for (const cell of data) {
    const key = `${cell.y}|${cell.x}`
    lookup.set(key, cell.value)
    if (cell.value > max) max = cell.value
  }

  return (
    <div
      data-slot="heatmap-chart"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    >
      {showLegend && (
        <div className="flex items-center justify-end gap-2 text-muted-foreground text-[10px]">
          <span>{legendLow}</span>
          <div className="flex gap-0.5">
            {["bg-muted/30", "bg-focal/10", "bg-focal/25", "bg-focal/50", "bg-focal/80"].map(
              (c) => (
                <span key={c} className={cn("size-3 rounded-sm", c)} />
              ),
            )}
          </div>
          <span>{legendHigh}</span>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-1">
          <thead>
            <tr>
              <th className="w-12" />
              {xLabels.map((x) => (
                <th
                  key={x}
                  className="px-0 pb-1 text-center font-mono font-normal text-muted-foreground text-[10px]"
                >
                  {x}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {yLabels.map((y) => (
              <tr key={y}>
                <td className="pr-2 text-right font-mono text-muted-foreground text-[10px]">
                  {y}
                </td>
                {xLabels.map((x) => {
                  const val = lookup.get(`${y}|${x}`) ?? 0
                  return (
                    <td key={x} className="p-0">
                      <div
                        className={cn(
                          "aspect-square w-full min-w-5 rounded-sm transition-colors",
                          intensityClass(val, max),
                        )}
                        title={`${y} ${x}: ${val}`}
                      />
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export { HeatmapChart }
export type { HeatmapCell, HeatmapChartProps }
