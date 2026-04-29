"use client"

import { Sparkline } from "@/src/components/sparkline"
import { Section } from "./_shared"

const series = [3, 5, 4, 7, 6, 9, 8, 11, 10, 13, 12, 16]
const trendDown = [15, 12, 13, 11, 9, 7, 5]
const flat = [10, 11, 10, 9, 11, 10, 12, 11, 10]

export default function SparklinePreview() {
  return (
    <div className="space-y-8">
      <Section title="Default (line only, chart-1)">
        <div className="max-w-md">
          <Sparkline points={series} />
        </div>
      </Section>

      <Section title="Smooth curve">
        <div className="max-w-md">
          <Sparkline points={series} smooth />
        </div>
      </Section>

      <Section title="With area fill">
        <div className="max-w-md">
          <Sparkline points={series} fill />
        </div>
      </Section>

      <Section title="With end dot">
        <div className="max-w-md">
          <Sparkline points={series} showDot />
        </div>
      </Section>

      <Section title="Token tones">
        <div className="grid max-w-2xl grid-cols-2 gap-4">
          <Sparkline points={series} color="var(--chart-1)" />
          <Sparkline points={series} color="var(--chart-2)" />
          <Sparkline points={series} color="var(--mint-ink)" />
          <Sparkline points={trendDown} color="var(--blush-ink)" />
        </div>
      </Section>

      <Section title="Inline usage (with metric label)">
        <div className="flex max-w-md items-center gap-3 rounded-lg border bg-card p-3">
          <div className="min-w-0">
            <p className="text-muted-foreground text-xs">Active sessions</p>
            <p className="font-mono font-semibold text-xl">12,488</p>
          </div>
          <div className="ml-auto w-24">
            <Sparkline points={flat} smooth />
          </div>
        </div>
      </Section>
    </div>
  )
}
