"use client"

import { ScatterChart as ScatterChartComponent } from "@/src/charts/scatter-chart"
import { scatterConfig, scatterHighRisk, scatterLowRisk } from "./_chart-data"
import { type ControlDefs, Playground, useControls } from "./_shared"

const scatterChartControlDefs = {
  showGrid: { type: "boolean", defaultValue: true, label: "Grid" },
  showXAxis: { type: "boolean", defaultValue: true, label: "X Axis" },
  showYAxis: { type: "boolean", defaultValue: true, label: "Y Axis" },
  showLegend: { type: "boolean", defaultValue: true, label: "Legend" },
  useBubbleSize: { type: "boolean", defaultValue: true, label: "Bubble size (volume)" },
  empty: { type: "boolean", defaultValue: false, label: "Empty state" },
} satisfies ControlDefs

export default function ScatterChartPreview() {
  const controls = useControls(scatterChartControlDefs)
  return (
    <Playground controls={controls}>
      <div className="max-w-xl">
        <ScatterChartComponent
          series={
            controls.values.empty
              ? []
              : [
                  { key: "high", data: scatterHighRisk },
                  { key: "low", data: scatterLowRisk },
                ]
          }
          config={scatterConfig}
          xKey="probability"
          yKey="impact"
          sizeKey={controls.values.useBubbleSize ? "volume" : undefined}
          showGrid={controls.values.showGrid}
          showXAxis={controls.values.showXAxis}
          showYAxis={controls.values.showYAxis}
          showLegend={controls.values.showLegend}
        />
      </div>
    </Playground>
  )
}
