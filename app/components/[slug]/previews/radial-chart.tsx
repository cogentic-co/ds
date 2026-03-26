"use client"

import { RadialChart as RadialChartComponent } from "@/src/charts/radial-chart"
import { type ControlDefs, Playground, useControls } from "./_shared"
import { radarConfig, radarData } from "./_chart-data"

const radialChartControlDefs = {
  showLegend: { type: "boolean", defaultValue: false, label: "Legend" },
} satisfies ControlDefs

export default function RadialChartPreview() {
  const controls = useControls(radialChartControlDefs)
  return (
    <Playground controls={controls}>
      <div className="mx-auto max-w-sm">
        <RadialChartComponent
          data={radarData}
          config={radarConfig}
          angleKey="subject"
          dataKeys={["current", "previous"]}
          showLegend={controls.values.showLegend}
        />
      </div>
    </Playground>
  )
}
