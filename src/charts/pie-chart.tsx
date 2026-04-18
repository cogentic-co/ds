"use client"

import type * as React from "react"
import { Cell, Label, Pie, PieChart as RechartsPieChart } from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/chart"
import { ChartShell, GHOST_COLOR, GHOST_KEY } from "./_empty"

const PIE_GHOST_DATA = [{ name: GHOST_KEY, value: 1, fill: GHOST_COLOR }]

type PieChartProps = React.ComponentProps<"div"> & {
  data: { name: string; value: number; fill?: string }[]
  config: ChartConfig
  dataKey?: string
  nameKey?: string
  donut?: boolean
  centerLabel?: string
  centerValue?: string | number
  showLegend?: boolean
  /** Rendered instead of the chart when `data` is empty or undefined. */
  empty?: React.ReactNode
}

function PieChart({
  data,
  config,
  dataKey = "value",
  nameKey = "name",
  donut = false,
  centerLabel,
  centerValue,
  showLegend = false,
  empty,
  className,
  ...props
}: PieChartProps) {
  const isEmpty = !data || data.length === 0
  const chartData = isEmpty ? PIE_GHOST_DATA : data
  return (
    <ChartShell slot="pie-chart" isEmpty={isEmpty} empty={empty} className={className} {...props}>
      <ChartContainer config={config}>
        <RechartsPieChart>
          {!isEmpty && <ChartTooltip content={<ChartTooltipContent nameKey={nameKey} />} />}
          {!isEmpty && showLegend && (
            <ChartLegend content={<ChartLegendContent nameKey={nameKey} />} />
          )}
          <Pie
            data={chartData}
            dataKey={dataKey}
            nameKey={nameKey}
            innerRadius={donut ? "60%" : 0}
            outerRadius="80%"
            strokeWidth={2}
            stroke="var(--color-background)"
            fillOpacity={isEmpty ? 0.5 : 1}
            isAnimationActive={!isEmpty}
          >
            {chartData.map((entry) => (
              <Cell key={entry.name} fill={entry.fill ?? `var(--color-${entry.name})`} />
            ))}
            {!isEmpty && donut && (centerLabel || centerValue) && (
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        {centerValue && (
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 8}
                            className="fill-foreground font-bold text-2xl"
                          >
                            {centerValue}
                          </tspan>
                        )}
                        {centerLabel && (
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 12}
                            className="fill-muted-foreground text-xs"
                          >
                            {centerLabel}
                          </tspan>
                        )}
                      </text>
                    )
                  }
                }}
              />
            )}
          </Pie>
        </RechartsPieChart>
      </ChartContainer>
    </ChartShell>
  )
}

export type { PieChartProps }
export { PieChart }
