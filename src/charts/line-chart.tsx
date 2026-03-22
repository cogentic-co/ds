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
  className,
  ...props
}: LineChartProps) {
  return (
    <div data-slot="line-chart" className={className} {...props}>
      <ChartContainer config={config}>
        <RechartsLineChart data={data} margin={{ left: 12, right: 12 }}>
          {showGrid && <CartesianGrid vertical={false} />}
          {showXAxis && <XAxis dataKey={xKey} tickLine={false} axisLine={false} tickMargin={8} />}
          {showYAxis && <YAxis tickLine={false} axisLine={false} tickMargin={8} />}
          <ChartTooltip content={<ChartTooltipContent />} />
          {showLegend && <ChartLegend content={<ChartLegendContent />} />}
          {yKeys.map((key) => (
            <Line
              key={key}
              dataKey={key}
              type={curveType}
              stroke={`var(--color-${key})`}
              strokeWidth={2}
              dot={showDots ? { fill: `var(--color-${key})`, r: 3 } : false}
              activeDot={{ r: 5 }}
            />
          ))}
        </RechartsLineChart>
      </ChartContainer>
    </div>
  )
}

export { LineChart }
export type { LineChartProps }
