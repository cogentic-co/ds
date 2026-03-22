"use client"

import type * as React from "react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart as RechartsRadarChart } from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/chart"

type RadialChartProps = React.ComponentProps<"div"> & {
  data: Record<string, unknown>[]
  config: ChartConfig
  angleKey: string
  dataKeys: string[]
  showLegend?: boolean
}

function RadialChart({
  data,
  config,
  angleKey,
  dataKeys,
  showLegend = false,
  className,
  ...props
}: RadialChartProps) {
  return (
    <div data-slot="radial-chart" className={className} {...props}>
      <ChartContainer config={config}>
        <RechartsRadarChart data={data}>
          <ChartTooltip content={<ChartTooltipContent />} />
          {showLegend && <ChartLegend content={<ChartLegendContent />} />}
          <PolarGrid />
          <PolarAngleAxis dataKey={angleKey} />
          {dataKeys.map((key) => (
            <Radar
              key={key}
              dataKey={key}
              fill={`var(--color-${key})`}
              fillOpacity={0.3}
              stroke={`var(--color-${key})`}
              strokeWidth={2}
            />
          ))}
        </RechartsRadarChart>
      </ChartContainer>
    </div>
  )
}

export { RadialChart }
export type { RadialChartProps }
