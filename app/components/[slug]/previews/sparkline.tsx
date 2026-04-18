"use client"

import { Sparkline } from "@/components/ui/sparkline"
import { Section } from "./_shared"

export default function SparklinePreview() {
  return (
    <div className="space-y-8">
      <Section title="Filled (default)">
        <div className="max-w-xs">
          <Sparkline points={[3, 5, 4, 7, 6, 9, 8, 11, 10, 13, 12, 16]} />
        </div>
      </Section>

      <Section title="Line only">
        <div className="max-w-xs">
          <Sparkline points={[12, 11, 13, 12, 14, 13, 15]} fill={false} />
        </div>
      </Section>

      <Section title="Custom color (blush)">
        <div className="max-w-xs">
          <Sparkline points={[15, 12, 13, 11, 9, 7, 5]} color="var(--blush-ink)" />
        </div>
      </Section>
    </div>
  )
}
