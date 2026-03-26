"use client"

import { Stat, StatLabel, StatTrend, StatValue } from "@/components/ui/stat"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const statControlDefs = {
  label: {
    type: "text" as const,
    defaultValue: "Total Revenue",
    label: "Label",
  },
  value: {
    type: "text" as const,
    defaultValue: "$45,231.89",
    label: "Value",
  },
  trendDirection: {
    type: "select" as const,
    options: ["up", "down", "neutral"],
    defaultValue: "up",
    label: "Trend Direction",
  },
  trendText: {
    type: "text" as const,
    defaultValue: "+20.1% from last month",
    label: "Trend Text",
  },
} satisfies ControlDefs

export default function StatPreview() {
  const controls = useControls(statControlDefs)
  const { label, value, trendDirection, trendText } = controls.values
  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <Stat>
            <StatLabel>{label}</StatLabel>
            <StatValue>{value}</StatValue>
            <StatTrend direction={trendDirection as "up"}>{trendText}</StatTrend>
          </Stat>
        </div>
      </Playground>
      <Section title="Multiple Stats">
        <div className="grid grid-cols-3 gap-6">
          <Stat>
            <StatLabel>Users</StatLabel>
            <StatValue>2,350</StatValue>
            <StatTrend direction="up">+180 this week</StatTrend>
          </Stat>
          <Stat>
            <StatLabel>Bounce Rate</StatLabel>
            <StatValue>12.5%</StatValue>
            <StatTrend direction="down">-2.3% from last month</StatTrend>
          </Stat>
          <Stat>
            <StatLabel>Sessions</StatLabel>
            <StatValue>14,208</StatValue>
            <StatTrend direction="neutral">No change</StatTrend>
          </Stat>
        </div>
      </Section>
    </div>
  )
}
