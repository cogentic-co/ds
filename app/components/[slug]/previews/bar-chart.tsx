"use client"

import { BarChart as BarChartComponent } from "@/src/charts/bar-chart"
import { timeSeriesConfig, timeSeriesData } from "./_chart-data"
import { type ControlDefs, Playground, useControls } from "./_shared"

const barChartControlDefs = {
  showGrid: { type: "boolean", defaultValue: true, label: "Grid" },
  showXAxis: { type: "boolean", defaultValue: true, label: "X Axis" },
  showYAxis: { type: "boolean", defaultValue: false, label: "Y Axis" },
  showLegend: { type: "boolean", defaultValue: false, label: "Legend" },
  stacked: { type: "boolean", defaultValue: false, label: "Stacked" },
  horizontal: { type: "boolean", defaultValue: false, label: "Horizontal" },
  radius: { type: "number", defaultValue: 4, min: 0, max: 20, step: 1, label: "Radius" },
  empty: { type: "boolean", defaultValue: false, label: "Empty state" },
} satisfies ControlDefs

export default function BarChartPreview() {
  const controls = useControls(barChartControlDefs)
  return (
    <Playground controls={controls}>
      <div className="max-w-lg">
        <BarChartComponent
          data={controls.values.empty ? [] : timeSeriesData}
          config={timeSeriesConfig}
          xKey="month"
          yKeys={["desktop", "mobile"]}
          showGrid={controls.values.showGrid}
          showXAxis={controls.values.showXAxis}
          showYAxis={controls.values.showYAxis}
          showLegend={controls.values.showLegend}
          stacked={controls.values.stacked}
          horizontal={controls.values.horizontal}
          radius={controls.values.radius}
        />
      </div>
    </Playground>
  )
}
