"use client"

import type * as React from "react"
import { Bar, CartesianGrid, BarChart as RechartsBarChart, XAxis, YAxis } from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/chart"
import { ChartShell, GHOST_COLOR, GHOST_KEY, makeGhostData } from "./_empty"

type BarChartProps = React.ComponentProps<"div"> & {
  data: Record<string, unknown>[]
  config: ChartConfig
  xKey: string
  yKeys: string[]
  showGrid?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showLegend?: boolean
  stacked?: boolean
  horizontal?: boolean
  radius?: number
  /** Overlay rendered on top of the chart when `data` is empty. */
  empty?: React.ReactNode
}

function BarChart({
  data,
  config,
  xKey,
  yKeys,
  showGrid = true,
  showXAxis = true,
  showYAxis = false,
  showLegend = false,
  stacked = false,
  horizontal = false,
  radius = 4,
  empty,
  className,
  ...props
}: BarChartProps) {
  const isEmpty = !data || data.length === 0
  const chartData = isEmpty ? makeGhostData(xKey, "noise") : data
  const activeKeys = isEmpty ? [GHOST_KEY] : yKeys

  return (
    <ChartShell slot="bar-chart" isEmpty={isEmpty} empty={empty} className={className} {...props}>
      <ChartContainer config={config}>
        <RechartsBarChart
          data={chartData}
          layout={horizontal ? "vertical" : "horizontal"}
          margin={{ left: 12, right: 12 }}
        >
          {showGrid && <CartesianGrid vertical={!horizontal} horizontal={horizontal} />}
          {horizontal ? (
            <>
              <YAxis
                dataKey={xKey}
                type="category"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              {showYAxis && <XAxis type="number" tickLine={false} axisLine={false} />}
            </>
          ) : (
            <>
              {showXAxis && (
                <XAxis dataKey={xKey} tickLine={false} axisLine={false} tickMargin={8} />
              )}
              {showYAxis && <YAxis tickLine={false} axisLine={false} tickMargin={8} />}
            </>
          )}
          {!isEmpty && <ChartTooltip content={<ChartTooltipContent />} />}
          {!isEmpty && showLegend && <ChartLegend content={<ChartLegendContent />} />}
          {activeKeys.map((key) => (
            <Bar
              key={key}
              dataKey={key}
              fill={isEmpty ? GHOST_COLOR : `var(--color-${key})`}
              fillOpacity={isEmpty ? 0.5 : 1}
              radius={radius}
              stackId={!isEmpty && stacked ? "stack" : undefined}
              isAnimationActive={!isEmpty}
            />
          ))}
        </RechartsBarChart>
      </ChartContainer>
    </ChartShell>
  )
}

export { BarChart }
export type { BarChartProps }
