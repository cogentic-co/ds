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

type PieChartProps = React.ComponentProps<"div"> & {
  data: { name: string; value: number; fill?: string }[]
  config: ChartConfig
  dataKey?: string
  nameKey?: string
  donut?: boolean
  centerLabel?: string
  centerValue?: string | number
  showLegend?: boolean
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
  className,
  ...props
}: PieChartProps) {
  return (
    <div data-slot="pie-chart" className={className} {...props}>
      <ChartContainer config={config}>
        <RechartsPieChart>
          <ChartTooltip content={<ChartTooltipContent nameKey={nameKey} />} />
          {showLegend && <ChartLegend content={<ChartLegendContent nameKey={nameKey} />} />}
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={nameKey}
            innerRadius={donut ? "60%" : 0}
            outerRadius="80%"
            strokeWidth={2}
            stroke="var(--color-background)"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill ?? `var(--color-${entry.name})`} />
            ))}
            {donut && (centerLabel || centerValue) && (
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
    </div>
  )
}

export { PieChart }
export type { PieChartProps }
