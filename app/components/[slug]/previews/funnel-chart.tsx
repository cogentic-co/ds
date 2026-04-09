"use client"

import { FunnelChart as FunnelChartComponent } from "@/src/charts/funnel-chart"
import { funnelConfig, funnelData } from "./_chart-data"
import { type ControlDefs, Playground, useControls } from "./_shared"

const funnelChartControlDefs = {
  showLabels: { type: "boolean", defaultValue: true, label: "Labels" },
  empty: { type: "boolean", defaultValue: false, label: "Empty state" },
} satisfies ControlDefs

export default function FunnelChartPreview() {
  const controls = useControls(funnelChartControlDefs)
  return (
    <Playground controls={controls}>
      <div className="max-w-lg">
        <FunnelChartComponent
          data={controls.values.empty ? [] : funnelData}
          config={funnelConfig}
          showLabels={controls.values.showLabels}
        />
      </div>
    </Playground>
  )
}
