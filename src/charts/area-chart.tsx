"use client"

import type * as React from "react"
import { Area, CartesianGrid, AreaChart as RechartsAreaChart, XAxis, YAxis } from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/chart"
import { ChartShell, GHOST_COLOR, GHOST_KEY, makeGhostData } from "./_empty"

type AreaChartProps = React.ComponentProps<"div"> & {
  data: Record<string, unknown>[]
  config: ChartConfig
  xKey: string
  yKeys: string[]
  showGrid?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showLegend?: boolean
  stacked?: boolean
  gradient?: boolean
  /** Overlay rendered on top of the chart when `data` is empty. */
  empty?: React.ReactNode
}

function AreaChart({
  data,
  config,
  xKey,
  yKeys,
  showGrid = true,
  showXAxis = true,
  showYAxis = false,
  showLegend = false,
  stacked = false,
  gradient = true,
  empty,
  className,
  ...props
}: AreaChartProps) {
  const isEmpty = !data || data.length === 0
  const chartData = isEmpty ? makeGhostData(xKey, "sine") : data
  const activeKeys = isEmpty ? [GHOST_KEY] : yKeys

  return (
    <ChartShell slot="area-chart" isEmpty={isEmpty} empty={empty} className={className} {...props}>
      <ChartContainer config={config}>
        <RechartsAreaChart data={chartData} margin={{ left: 12, right: 12 }}>
          {!isEmpty && gradient && (
            <defs>
              {yKeys.map((key) => (
                <linearGradient key={key} id={`fill-${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={`var(--color-${key})`} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={`var(--color-${key})`} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>
          )}
          {showGrid && <CartesianGrid vertical={false} />}
          {showXAxis && <XAxis dataKey={xKey} tickLine={false} axisLine={false} tickMargin={8} />}
          {showYAxis && <YAxis tickLine={false} axisLine={false} tickMargin={8} />}
          {!isEmpty && <ChartTooltip content={<ChartTooltipContent />} />}
          {!isEmpty && showLegend && <ChartLegend content={<ChartLegendContent />} />}
          {activeKeys.map((key) => (
            <Area
              key={key}
              dataKey={key}
              type="natural"
              fill={
                isEmpty
                  ? GHOST_COLOR
                  : gradient
                    ? `url(#fill-${key})`
                    : `var(--color-${key})`
              }
              fillOpacity={isEmpty ? 0.35 : 1}
              stroke={isEmpty ? GHOST_COLOR : `var(--color-${key})`}
              stackId={!isEmpty && stacked ? "stack" : undefined}
              isAnimationActive={!isEmpty}
            />
          ))}
        </RechartsAreaChart>
      </ChartContainer>
    </ChartShell>
  )
}

export { AreaChart }
export type { AreaChartProps }
