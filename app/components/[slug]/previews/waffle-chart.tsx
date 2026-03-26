"use client"

import { WaffleChart } from "@/components/ui/waffle-chart"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const waffleChartControlDefs = {
  mode: {
    type: "select" as const,
    options: ["grid", "bar"],
    defaultValue: "grid",
    label: "Mode",
  },
  size: {
    type: "select" as const,
    options: ["xs", "sm", "default", "lg"],
    defaultValue: "default",
    label: "Size",
  },
  animate: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Animate",
  },
  duration: {
    type: "number" as const,
    defaultValue: 800,
    min: 200,
    max: 3000,
    label: "Duration (ms)",
  },
} satisfies ControlDefs

const exampleSegments = [
  { value: 45, color: "#f87171", label: "Sanctions" },
  { value: 25, color: "#fb923c", label: "Mixer" },
  { value: 15, color: "#facc15", label: "Darknet" },
]

export default function WaffleChartPreview() {
  const controls = useControls(waffleChartControlDefs)
  const { mode, size, animate, duration } = controls.values
  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <div className="w-full py-4">
          <WaffleChart
            key={`${mode}-${size}-${animate}-${duration}`}
            segments={exampleSegments}
            mode={mode as "grid"}
            size={size as "default"}
            animate={animate}
            duration={duration}
          />
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            {exampleSegments.map((seg) => (
              <div key={seg.label} className="flex items-center gap-1.5 text-xs">
                <span className="size-2.5 rounded-full" style={{ backgroundColor: seg.color }} />
                <span className="text-muted-foreground">
                  {seg.label} {seg.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </Playground>
      <Section title="Grid Mode (default)">
        <div className="max-w-sm">
          <WaffleChart segments={exampleSegments} animate={false} />
        </div>
      </Section>
      <Section title="Bar Mode">
        <WaffleChart segments={exampleSegments} mode="bar" animate={false} />
      </Section>
      <Section title="Bar Mode — No Dividers">
        <WaffleChart segments={exampleSegments} mode="bar" dividers={false} animate={false} />
      </Section>
      <Section title="Custom Grid (5x20)">
        <div className="max-w-xl">
          <WaffleChart
            segments={[
              { value: 60, color: "#8b5cf6", label: "Compliant" },
              { value: 25, color: "#f97316", label: "Pending" },
              { value: 10, color: "#ef4444", label: "Failed" },
            ]}
            rows={5}
            cols={20}
            className="aspect-[4/1]"
            animate={false}
          />
        </div>
      </Section>
      <Section title="Single Segment">
        <div className="max-w-sm">
          <WaffleChart segments={[{ value: 100, color: "#f87171" }]} animate={false} />
        </div>
      </Section>
      <Section title="Bar Sizes">
        <div className="space-y-4">
          {(["xs", "sm", "default", "lg"] as const).map((s) => (
            <div key={s}>
              <p className="mb-1 text-muted-foreground text-xs">{s}</p>
              <WaffleChart mode="bar" size={s} segments={exampleSegments} animate={false} />
            </div>
          ))}
        </div>
      </Section>
      <Section title="Grid Sizes">
        <div className="flex items-start gap-6">
          {(["xs", "sm", "default", "lg"] as const).map((s) => (
            <div key={s}>
              <p className="mb-1 text-muted-foreground text-xs">{s}</p>
              <WaffleChart mode="grid" size={s} segments={exampleSegments} animate={false} />
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
