"use client"

import type * as React from "react"
import { Cell, Funnel, LabelList, FunnelChart as RechartsFunnelChart } from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/chart"
import { ChartShell, GHOST_COLOR } from "./_empty"

type FunnelDatum = {
  name: string
  value: number
  fill?: string
}

const FUNNEL_GHOST_DATA: FunnelDatum[] = [
  { name: "s1", value: 100, fill: GHOST_COLOR },
  { name: "s2", value: 80, fill: GHOST_COLOR },
  { name: "s3", value: 60, fill: GHOST_COLOR },
  { name: "s4", value: 40, fill: GHOST_COLOR },
]

type FunnelChartProps = React.ComponentProps<"div"> & {
  data: FunnelDatum[]
  config: ChartConfig
  /** Whether to render stage labels inside the funnel. Default: true */
  showLabels?: boolean
  /** Whether the funnel tapers towards the bottom (default) or top. */
  isAnimationActive?: boolean
  /** Rendered instead of the chart when `data` is empty or undefined. */
  empty?: React.ReactNode
}

function FunnelChart({
  data,
  config,
  showLabels = true,
  isAnimationActive = true,
  empty,
  className,
  ...props
}: FunnelChartProps) {
  const isEmpty = !data || data.length === 0
  const chartData = isEmpty ? FUNNEL_GHOST_DATA : data

  return (
    <ChartShell
      slot="funnel-chart"
      isEmpty={isEmpty}
      empty={empty}
      className={className}
      {...props}
    >
      <ChartContainer config={config}>
        <RechartsFunnelChart>
          {!isEmpty && <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />}
          <Funnel
            dataKey="value"
            data={chartData}
            isAnimationActive={!isEmpty && isAnimationActive}
          >
            {chartData.map((entry) => (
              <Cell
                key={entry.name}
                fill={entry.fill ?? `var(--color-${entry.name})`}
                fillOpacity={isEmpty ? 0.5 : 1}
              />
            ))}
            {!isEmpty && showLabels && (
              <LabelList
                position="right"
                fill="var(--color-foreground)"
                stroke="none"
                dataKey="name"
                className="fill-foreground text-xs"
              />
            )}
          </Funnel>
        </RechartsFunnelChart>
      </ChartContainer>
    </ChartShell>
  )
}

export type { FunnelChartProps, FunnelDatum }
export { FunnelChart }
