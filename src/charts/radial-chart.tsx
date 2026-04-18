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
import { ChartShell, GHOST_COLOR, GHOST_KEY } from "./_empty"

type RadialChartProps = React.ComponentProps<"div"> & {
  data: Record<string, unknown>[]
  config: ChartConfig
  angleKey: string
  dataKeys: string[]
  showLegend?: boolean
  /** Overlay rendered on top of the chart when `data` is empty. */
  empty?: React.ReactNode
}

const RADIAL_GHOST_LABELS = ["A", "B", "C", "D", "E", "F"] as const

function makeRadialGhostData(angleKey: string) {
  return RADIAL_GHOST_LABELS.map((label) => ({
    [angleKey]: label,
    [GHOST_KEY]: 50,
  }))
}

function RadialChart({
  data,
  config,
  angleKey,
  dataKeys,
  showLegend = false,
  empty,
  className,
  ...props
}: RadialChartProps) {
  const isEmpty = !data || data.length === 0
  const chartData = isEmpty ? makeRadialGhostData(angleKey) : data
  const activeKeys = isEmpty ? [GHOST_KEY] : dataKeys

  return (
    <ChartShell
      slot="radial-chart"
      isEmpty={isEmpty}
      empty={empty}
      className={className}
      {...props}
    >
      <ChartContainer config={config}>
        <RechartsRadarChart data={chartData}>
          {!isEmpty && <ChartTooltip content={<ChartTooltipContent />} />}
          {!isEmpty && showLegend && <ChartLegend content={<ChartLegendContent />} />}
          <PolarGrid />
          <PolarAngleAxis dataKey={angleKey} />
          {activeKeys.map((key) => (
            <Radar
              key={key}
              dataKey={key}
              fill={isEmpty ? GHOST_COLOR : `var(--color-${key})`}
              fillOpacity={isEmpty ? 0.25 : 0.3}
              stroke={isEmpty ? GHOST_COLOR : `var(--color-${key})`}
              strokeWidth={2}
              isAnimationActive={!isEmpty}
            />
          ))}
        </RechartsRadarChart>
      </ChartContainer>
    </ChartShell>
  )
}

export type { RadialChartProps }
export { RadialChart }
