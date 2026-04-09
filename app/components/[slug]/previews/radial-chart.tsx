"use client"

import { RadialChart as RadialChartComponent } from "@/src/charts/radial-chart"
import { radarConfig, radarData } from "./_chart-data"
import { type ControlDefs, Playground, useControls } from "./_shared"

const radialChartControlDefs = {
  showLegend: { type: "boolean", defaultValue: false, label: "Legend" },
  empty: { type: "boolean", defaultValue: false, label: "Empty state" },
} satisfies ControlDefs

export default function RadialChartPreview() {
  const controls = useControls(radialChartControlDefs)
  return (
    <Playground controls={controls}>
      <div className="mx-auto max-w-sm">
        <RadialChartComponent
          data={controls.values.empty ? [] : radarData}
          config={radarConfig}
          angleKey="subject"
          dataKeys={["current", "previous"]}
          showLegend={controls.values.showLegend}
        />
      </div>
    </Playground>
  )
}
