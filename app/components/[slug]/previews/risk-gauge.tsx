"use client"

import { RiskGauge } from "@/components/ui/risk-gauge"
import { type ControlDefs, Playground, useControls } from "./_shared"

const riskGaugeControlDefs = {
  score: {
    type: "number" as const,
    defaultValue: 65,
    label: "Score",
    min: 0,
    max: 100,
  },
  tier: {
    type: "radio" as const,
    options: ["low", "medium", "high", "severe"],
    defaultValue: "medium",
    label: "Tier",
  },
  size: {
    type: "radio" as const,
    options: ["sm", "lg"],
    defaultValue: "sm",
    label: "Size",
  },
  label: {
    type: "text" as const,
    defaultValue: "Risk Score",
    label: "Label",
  },
} satisfies ControlDefs

export default function RiskGaugePreview() {
  const controls = useControls(riskGaugeControlDefs)
  const { score, tier, size, label } = controls.values

  return (
    <div className="max-w-sm space-y-6">
      <Playground controls={controls}>
        <RiskGauge
          score={Number(score)}
          tier={tier as string}
          size={size as "sm"}
          label={label as string}
        />
      </Playground>

      {/* Static examples for each tier */}
      <div className="space-y-4">
        <RiskGauge score={25} tier="low" label="Low Risk" />
        <RiskGauge score={50} tier="medium" label="Medium Risk" />
        <RiskGauge score={75} tier="high" label="High Risk" />
        <RiskGauge score={95} tier="severe" label="Severe Risk" />
      </div>

      {/* Large size */}
      <RiskGauge score={65} tier="moderateTrust" size="lg" label="Trust Score (lg)" />
    </div>
  )
}
