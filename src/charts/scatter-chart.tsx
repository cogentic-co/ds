"use client"

import type * as React from "react"
import {
  CartesianGrid,
  ScatterChart as RechartsScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/chart"
import { ChartShell, GHOST_COLOR, GHOST_KEY } from "./_empty"

type ScatterSeries = {
  key: string
  data: Record<string, unknown>[]
}

type ScatterChartProps = React.ComponentProps<"div"> & {
  series: ScatterSeries[]
  config: ChartConfig
  xKey: string
  yKey: string
  /** Optional third dimension controlling bubble size. */
  sizeKey?: string
  sizeRange?: [number, number]
  showGrid?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showLegend?: boolean
  /** Overlay rendered on top of the chart when every series has empty data. */
  empty?: React.ReactNode
}

function makeScatterGhostSeries(xKey: string, yKey: string, sizeKey?: string): ScatterSeries[] {
  return [
    {
      key: GHOST_KEY,
      data: Array.from({ length: 12 }, (_, i) => ({
        [xKey]: 10 + ((i * 17) % 80),
        [yKey]: 15 + ((i * 29) % 75),
        ...(sizeKey ? { [sizeKey]: 80 } : {}),
      })),
    },
  ]
}

function ScatterChart({
  series,
  config,
  xKey,
  yKey,
  sizeKey,
  sizeRange = [60, 400],
  showGrid = true,
  showXAxis = true,
  showYAxis = true,
  showLegend = false,
  empty,
  className,
  ...props
}: ScatterChartProps) {
  const isEmpty = !series || series.every((s) => !s.data || s.data.length === 0)
  const activeSeries = isEmpty ? makeScatterGhostSeries(xKey, yKey, sizeKey) : series

  return (
    <ChartShell
      slot="scatter-chart"
      isEmpty={isEmpty}
      empty={empty}
      className={className}
      {...props}
    >
      <ChartContainer config={config}>
        <RechartsScatterChart margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
          {showGrid && <CartesianGrid />}
          {showXAxis && (
            <XAxis dataKey={xKey} type="number" tickLine={false} axisLine={false} tickMargin={8} />
          )}
          {showYAxis && (
            <YAxis dataKey={yKey} type="number" tickLine={false} axisLine={false} tickMargin={8} />
          )}
          {sizeKey && <ZAxis dataKey={sizeKey} range={sizeRange} />}
          {!isEmpty && (
            <ChartTooltip cursor={{ strokeDasharray: "3 3" }} content={<ChartTooltipContent />} />
          )}
          {!isEmpty && showLegend && <ChartLegend content={<ChartLegendContent />} />}
          {activeSeries.map((s) => (
            <Scatter
              key={s.key}
              name={s.key}
              data={s.data}
              fill={isEmpty ? GHOST_COLOR : `var(--color-${s.key})`}
              fillOpacity={isEmpty ? 0.4 : 1}
              isAnimationActive={!isEmpty}
            />
          ))}
        </RechartsScatterChart>
      </ChartContainer>
    </ChartShell>
  )
}

export type { ScatterChartProps, ScatterSeries }
export { ScatterChart }
