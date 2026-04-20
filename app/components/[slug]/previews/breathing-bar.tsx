"use client"

import { BreathingBar } from "@/components/ui/breathing-bar"
import { Section } from "./_shared"

const trafficSegments = [
  { value: 42, variant: "mint" as const, label: "Direct" },
  { value: 31, variant: "sky" as const, label: "Organic" },
  { value: 18, variant: "blush" as const, label: "Paid" },
  { value: 9, variant: "unattributed" as const, label: "Unknown" },
]

export default function BreathingBarPreview() {
  return (
    <div className="space-y-8">
      <Section title="With legend">
        <div className="w-full max-w-xl">
          <BreathingBar segments={trafficSegments} showLegend format={(n) => `${n}%`} />
        </div>
      </Section>

      <Section title="Animated">
        <div className="w-full max-w-xl">
          <BreathingBar segments={trafficSegments} animated />
        </div>
      </Section>

      <Section title="Heights">
        <div className="w-full max-w-xl space-y-3">
          <BreathingBar height="sm" segments={trafficSegments} />
          <BreathingBar height="default" segments={trafficSegments} />
          <BreathingBar height="lg" segments={trafficSegments} />
        </div>
      </Section>
    </div>
  )
}
