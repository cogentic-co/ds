"use client"

import { AreaChart as AreaChartComponent } from "@/src/charts/area-chart"
import { timeSeriesConfig, timeSeriesData } from "./_chart-data"
import { type ControlDefs, Playground, useControls } from "./_shared"

const areaChartControlDefs = {
  showGrid: { type: "boolean", defaultValue: true, label: "Grid" },
  showXAxis: { type: "boolean", defaultValue: true, label: "X Axis" },
  showYAxis: { type: "boolean", defaultValue: false, label: "Y Axis" },
  showLegend: { type: "boolean", defaultValue: false, label: "Legend" },
  stacked: { type: "boolean", defaultValue: false, label: "Stacked" },
  gradient: { type: "boolean", defaultValue: true, label: "Gradient fill" },
  empty: { type: "boolean", defaultValue: false, label: "Empty state" },
} satisfies ControlDefs

export default function AreaChartPreview() {
  const controls = useControls(areaChartControlDefs)
  return (
    <Playground controls={controls}>
      <div className="max-w-lg">
        <AreaChartComponent
          data={controls.values.empty ? [] : timeSeriesData}
          config={timeSeriesConfig}
          xKey="month"
          yKeys={["desktop", "mobile"]}
          showGrid={controls.values.showGrid}
          showXAxis={controls.values.showXAxis}
          showYAxis={controls.values.showYAxis}
          showLegend={controls.values.showLegend}
          stacked={controls.values.stacked}
          gradient={controls.values.gradient}
        />
      </div>
    </Playground>
  )
}
