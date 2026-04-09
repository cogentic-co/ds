"use client"

import { ComposedChart as ComposedChartComponent } from "@/src/charts/composed-chart"
import { composedConfig, composedData } from "./_chart-data"
import { type ControlDefs, Playground, useControls } from "./_shared"

const composedChartControlDefs = {
  showGrid: { type: "boolean", defaultValue: true, label: "Grid" },
  showXAxis: { type: "boolean", defaultValue: true, label: "X Axis" },
  showYAxis: { type: "boolean", defaultValue: true, label: "Y Axis" },
  showLegend: { type: "boolean", defaultValue: true, label: "Legend" },
  lineType: {
    type: "select",
    options: ["natural", "linear", "step", "monotone"],
    defaultValue: "natural",
    label: "Line curve",
  },
  empty: { type: "boolean", defaultValue: false, label: "Empty state" },
} satisfies ControlDefs

export default function ComposedChartPreview() {
  const controls = useControls(composedChartControlDefs)
  return (
    <Playground controls={controls}>
      <div className="max-w-lg">
        <ComposedChartComponent
          data={controls.values.empty ? [] : composedData}
          config={composedConfig}
          xKey="month"
          series={[
            { key: "volume", type: "bar" },
            { key: "avg", type: "line", curveType: controls.values.lineType as "natural" },
          ]}
          showGrid={controls.values.showGrid}
          showXAxis={controls.values.showXAxis}
          showYAxis={controls.values.showYAxis}
          showLegend={controls.values.showLegend}
        />
      </div>
    </Playground>
  )
}
