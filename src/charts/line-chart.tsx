"use client"

import type * as React from "react"
import { CartesianGrid, Line, LineChart as RechartsLineChart, XAxis, YAxis } from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/chart"
import { ChartShell, GHOST_COLOR, GHOST_KEY, makeGhostData } from "./_empty"

type LineChartProps = React.ComponentProps<"div"> & {
  data: Record<string, unknown>[]
  config: ChartConfig
  xKey: string
  yKeys: string[]
  showGrid?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showLegend?: boolean
  showDots?: boolean
  curveType?: "natural" | "linear" | "step" | "monotone"
  /** Overlay rendered on top of the chart when `data` is empty. */
  empty?: React.ReactNode
}

function LineChart({
  data,
  config,
  xKey,
  yKeys,
  showGrid = true,
  showXAxis = true,
  showYAxis = false,
  showLegend = false,
  showDots = true,
  curveType = "natural",
  empty,
  className,
  ...props
}: LineChartProps) {
  const isEmpty = !data || data.length === 0
  const chartData = isEmpty ? makeGhostData(xKey, "sine") : data
  const activeKeys = isEmpty ? [GHOST_KEY] : yKeys

  return (
    <ChartShell slot="line-chart" isEmpty={isEmpty} empty={empty} className={className} {...props}>
      <ChartContainer config={config}>
        <RechartsLineChart data={chartData} margin={{ left: 12, right: 12 }}>
          {showGrid && <CartesianGrid vertical={false} />}
          {showXAxis && <XAxis dataKey={xKey} tickLine={false} axisLine={false} tickMargin={8} />}
          {showYAxis && <YAxis tickLine={false} axisLine={false} tickMargin={8} />}
          {!isEmpty && <ChartTooltip content={<ChartTooltipContent />} />}
          {!isEmpty && showLegend && <ChartLegend content={<ChartLegendContent />} />}
          {activeKeys.map((key) => (
            <Line
              key={key}
              dataKey={key}
              type={curveType}
              stroke={isEmpty ? GHOST_COLOR : `var(--color-${key})`}
              strokeWidth={2}
              dot={!isEmpty && showDots ? { fill: `var(--color-${key})`, r: 3 } : false}
              activeDot={isEmpty ? false : { r: 5 }}
              isAnimationActive={!isEmpty}
            />
          ))}
        </RechartsLineChart>
      </ChartContainer>
    </ChartShell>
  )
}

export type { LineChartProps }
export { LineChart }
