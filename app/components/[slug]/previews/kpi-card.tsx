"use client"

import { KpiCard } from "@/components/ui/kpi-card"
import { Section } from "./_shared"

const trend = [8, 12, 9, 14, 11, 16, 13, 18, 15, 21, 19, 24]
const flatish = [10, 11, 10, 12, 11, 12, 11, 13, 12, 13]

export default function KpiCardPreview() {
  return (
    <div className="space-y-8">
      <Section title="Four-up grid">
        <div className="grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            label="Volume (24h)"
            value="$1.24M"
            delta="+12%"
            deltaTone="positive"
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
            sparkline={[5, 7, 9, 11, 13, 15, 12]}
            sparklineColor="var(--blush-ink)"
          />
          <KpiCard label="Queue wait (p95)" value="6m 42s" delta="+1m" deltaTone="neutral" />
        </div>
      </Section>
    </div>
  )
}
