"use client"

import { TrendingUp } from "lucide-react"
import { KpiCard } from "@/components/ui/kpi-card"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const trend = [8, 12, 9, 14, 11, 16, 13, 18, 15, 21, 19, 24]
const flatish = [10, 11, 10, 12, 11, 12, 11, 13, 12, 13]

const kpiCardControlDefs = {
  label: { type: "text", defaultValue: "Volume (24h)", label: "Label" },
  value: { type: "text", defaultValue: "$1.24M", label: "Value" },
  delta: { type: "text", defaultValue: "+12%", label: "Delta" },
  deltaTone: {
    type: "select",
    options: ["positive", "negative", "neutral"],
    defaultValue: "positive",
    label: "Delta tone",
  },
  deltaArrow: { type: "boolean", defaultValue: false, label: "Delta arrow" },
  hint: { type: "text", defaultValue: "vs 7d avg", label: "Hint" },
  withSparkline: { type: "boolean", defaultValue: true, label: "Sparkline" },
  withIcon: { type: "boolean", defaultValue: false, label: "Icon" },
} satisfies ControlDefs

export default function KpiCardPreview() {
  const controls = useControls(kpiCardControlDefs)

  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <div className="w-full max-w-xs">
          <KpiCard
            label={controls.values.label}
            value={controls.values.value}
            delta={controls.values.delta || undefined}
            deltaTone={controls.values.deltaTone as "positive" | "negative" | "neutral"}
            deltaArrow={controls.values.deltaArrow}
            hint={controls.values.hint || undefined}
            icon={controls.values.withIcon ? <TrendingUp /> : undefined}
            sparkline={controls.values.withSparkline ? trend : undefined}
          />
        </div>
      </Playground>

      <Section title="Four-up grid">
        <div className="grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            label="Volume (24h)"
            value="$1.24M"
            delta="+12%"
            deltaTone="positive"
            deltaArrow
            hint="vs 7d avg"
            sparkline={trend}
          />
          <KpiCard
            label="Tx reviewed"
            value="218"
            delta="+4"
            deltaTone="positive"
            sparkline={flatish}
          />
          <KpiCard
            label="Flagged"
            value="12"
            delta="-2"
            deltaTone="negative"
            deltaArrow
            sparkline={[5, 7, 9, 11, 13, 15, 12]}
            sparklineColor="var(--blush-ink)"
          />
          <KpiCard label="Queue wait (p95)" value="6m 42s" delta="+1m" deltaTone="neutral" />
        </div>
      </Section>
    </div>
  )
}
