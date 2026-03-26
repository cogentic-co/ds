"use client"

import { PieChart as PieChartComponent } from "@/src/charts/pie-chart"
import { type ControlDefs, Playground, useControls } from "./_shared"
import { pieConfig, pieData } from "./_chart-data"

const pieChartControlDefs = {
  donut: { type: "boolean", defaultValue: false, label: "Donut" },
  showLegend: { type: "boolean", defaultValue: false, label: "Legend" },
  centerLabel: {
    type: "text",
    defaultValue: "",
    label: "Center label",
    placeholder: "e.g. Browsers",
  },
  centerValue: { type: "text", defaultValue: "", label: "Center value", placeholder: "e.g. 925" },
} satisfies ControlDefs

export default function PieChartPreview() {
  const controls = useControls(pieChartControlDefs)
  return (
    <Playground controls={controls}>
      <div className="mx-auto max-w-xs">
        <PieChartComponent
          data={pieData}
          config={pieConfig}
          donut={controls.values.donut}
          showLegend={controls.values.showLegend}
          centerLabel={controls.values.centerLabel || undefined}
          centerValue={controls.values.centerValue || undefined}
        />
      </div>
    </Playground>
  )
}
