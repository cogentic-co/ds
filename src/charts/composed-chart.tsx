"use client"

import type * as React from "react"
import {
  Area,
  Bar,
  CartesianGrid,
  Line,
  ComposedChart as RechartsComposedChart,
  XAxis,
  YAxis,
} from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/chart"
import { ChartShell, GHOST_COLOR } from "./_empty"

const COMPOSED_GHOST_BAR_KEY = "__ghostBar__"
const COMPOSED_GHOST_LINE_KEY = "__ghostLine__"

function makeComposedGhostData(xKey: string) {
  return Array.from({ length: 6 }, (_, i) => ({
    [xKey]: "",
    [COMPOSED_GHOST_BAR_KEY]: 55 + ((i * 23) % 30),
    [COMPOSED_GHOST_LINE_KEY]: 60 + Math.sin(i) * 8,
  }))
}

type ComposedSeries = {
  key: string
  type: "bar" | "line" | "area"
  /** Optional override for the stackId on bar/area. */
  stackId?: string
  /** Optional override for the curve type on line/area. */
  curveType?: "natural" | "linear" | "step" | "monotone"
}

type ComposedChartProps = React.ComponentProps<"div"> & {
  data: Record<string, unknown>[]
  config: ChartConfig
  xKey: string
  series: ComposedSeries[]
  showGrid?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showLegend?: boolean
  /** Rendered instead of the chart when `data` is empty. */
  empty?: React.ReactNode
}

function ComposedChart({
  data,
  config,
  xKey,
  series,
  showGrid = true,
  showXAxis = true,
  showYAxis = true,
  showLegend = false,
  empty,
  className,
  ...props
}: ComposedChartProps) {
  const isEmpty = !data || data.length === 0
  const chartData = isEmpty ? makeComposedGhostData(xKey) : data

  return (
    <ChartShell
      slot="composed-chart"
      isEmpty={isEmpty}
      empty={empty}
      className={className}
      {...props}
    >
      <ChartContainer config={config}>
        <RechartsComposedChart data={chartData} margin={{ left: 12, right: 12 }}>
          {showGrid && <CartesianGrid vertical={false} />}
          {showXAxis && <XAxis dataKey={xKey} tickLine={false} axisLine={false} tickMargin={8} />}
          {showYAxis && <YAxis tickLine={false} axisLine={false} tickMargin={8} />}
          {!isEmpty && <ChartTooltip content={<ChartTooltipContent />} />}
          {!isEmpty && showLegend && <ChartLegend content={<ChartLegendContent />} />}
          {isEmpty ? (
            <>
              <Bar
                dataKey={COMPOSED_GHOST_BAR_KEY}
                fill={GHOST_COLOR}
                fillOpacity={0.5}
                radius={4}
                isAnimationActive={false}
              />
              <Line
                dataKey={COMPOSED_GHOST_LINE_KEY}
                type="natural"
                stroke={GHOST_COLOR}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </>
          ) : (
            series.map((s) => {
              if (s.type === "bar") {
                return (
                  <Bar
                    key={s.key}
                    dataKey={s.key}
                    fill={`var(--color-${s.key})`}
                    radius={4}
                    stackId={s.stackId}
                  />
                )
              }
              if (s.type === "area") {
                return (
                  <Area
                    key={s.key}
                    dataKey={s.key}
                    type={s.curveType ?? "natural"}
                    fill={`var(--color-${s.key})`}
                    fillOpacity={0.2}
                    stroke={`var(--color-${s.key})`}
                    stackId={s.stackId}
                  />
                )
              }
              return (
                <Line
                  key={s.key}
                  dataKey={s.key}
                  type={s.curveType ?? "natural"}
                  stroke={`var(--color-${s.key})`}
                  strokeWidth={2}
                  dot={{ fill: `var(--color-${s.key})`, r: 3 }}
                  activeDot={{ r: 5 }}
                />
              )
            })
          )}
        </RechartsComposedChart>
      </ChartContainer>
    </ChartShell>
  )
}

export type { ComposedChartProps, ComposedSeries }
export { ComposedChart }
