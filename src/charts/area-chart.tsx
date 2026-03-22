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
  className,
  ...props
}: AreaChartProps) {
  return (
    <div data-slot="area-chart" className={className} {...props}>
      <ChartContainer config={config}>
        <RechartsAreaChart data={data} margin={{ left: 12, right: 12 }}>
          {gradient && (
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
          <ChartTooltip content={<ChartTooltipContent />} />
          {showLegend && <ChartLegend content={<ChartLegendContent />} />}
          {yKeys.map((key) => (
            <Area
              key={key}
              dataKey={key}
              type="natural"
              fill={gradient ? `url(#fill-${key})` : `var(--color-${key})`}
              stroke={`var(--color-${key})`}
              stackId={stacked ? "stack" : undefined}
            />
          ))}
        </RechartsAreaChart>
      </ChartContainer>
    </div>
  )
}

export { AreaChart }
export type { AreaChartProps }
