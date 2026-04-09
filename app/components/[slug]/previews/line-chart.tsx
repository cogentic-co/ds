"use client"

import { LineChart as LineChartComponent } from "@/src/charts/line-chart"
import { timeSeriesConfig, timeSeriesData } from "./_chart-data"
import { type ControlDefs, Playground, useControls } from "./_shared"

const lineChartControlDefs = {
  showGrid: { type: "boolean", defaultValue: true, label: "Grid" },
  showXAxis: { type: "boolean", defaultValue: true, label: "X Axis" },
  showYAxis: { type: "boolean", defaultValue: false, label: "Y Axis" },
  showLegend: { type: "boolean", defaultValue: false, label: "Legend" },
  showDots: { type: "boolean", defaultValue: true, label: "Dots" },
  curveType: {
    type: "select",
    options: ["natural", "linear", "step", "monotone"],
    defaultValue: "natural",
    label: "Curve",
  },
  empty: { type: "boolean", defaultValue: false, label: "Empty state" },
} satisfies ControlDefs

export default function LineChartPreview() {
  const controls = useControls(lineChartControlDefs)
  return (
    <Playground controls={controls}>
      <div className="max-w-lg">
        <LineChartComponent
          data={controls.values.empty ? [] : timeSeriesData}
          config={timeSeriesConfig}
          xKey="month"
          yKeys={["desktop", "mobile"]}
          showGrid={controls.values.showGrid}
          showXAxis={controls.values.showXAxis}
          showYAxis={controls.values.showYAxis}
          showLegend={controls.values.showLegend}
          showDots={controls.values.showDots}
          curveType={controls.values.curveType as "natural"}
        />
      </div>
    </Playground>
  )
}
