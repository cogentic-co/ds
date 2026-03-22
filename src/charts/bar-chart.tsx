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
  className,
  ...props
}: BarChartProps) {
  return (
    <div data-slot="bar-chart" className={className} {...props}>
      <ChartContainer config={config}>
        <RechartsBarChart
          data={data}
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
          <ChartTooltip content={<ChartTooltipContent />} />
          {showLegend && <ChartLegend content={<ChartLegendContent />} />}
          {yKeys.map((key) => (
            <Bar
              key={key}
              dataKey={key}
              fill={`var(--color-${key})`}
              radius={radius}
              stackId={stacked ? "stack" : undefined}
            />
          ))}
        </RechartsBarChart>
      </ChartContainer>
    </div>
  )
}

export { BarChart }
export type { BarChartProps }
