"use client"

import { StripedBar } from "@/components/ui/striped-bar"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const stripedBarControlDefs = {
  animated: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Animated",
  },
  stripes: {
    type: "number" as const,
    defaultValue: 60,
    min: 10,
    max: 120,
    label: "Stripes",
  },
  duration: {
    type: "number" as const,
    defaultValue: 800,
    min: 200,
    max: 3000,
    label: "Duration (ms)",
  },
} satisfies ControlDefs

export default function StripedBarPreview() {
  const controls = useControls(stripedBarControlDefs)
  const { animated, stripes, duration } = controls.values
  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <div className="w-full py-4">
          <StripedBar
            key={`${animated}-${stripes}-${duration}`}
            segments={[
              { value: 45, color: "#f87171", label: "Sanctions" },
              { value: 25, color: "#fb923c", label: "Mixer" },
              { value: 15, color: "#facc15", label: "Darknet" },
            ]}
            stripes={stripes}
            animated={animated}
            duration={duration}
          />
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="size-2.5 rounded-full" style={{ backgroundColor: "#f87171" }} />
              <span className="text-muted-foreground">Sanctions 45%</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="size-2.5 rounded-full" style={{ backgroundColor: "#fb923c" }} />
              <span className="text-muted-foreground">Mixer 25%</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="size-2.5 rounded-full" style={{ backgroundColor: "#facc15" }} />
              <span className="text-muted-foreground">Darknet 15%</span>
            </div>
          </div>
        </div>
      </Playground>
      <Section title="Single Segment">
        <StripedBar segments={[{ value: 100, color: "#f87171" }]} />
      </Section>
      <Section title="No Color (uses primary)">
        <StripedBar segments={[{ value: 70 }]} />
      </Section>
      <Section title="Multiple Segments with Dividers">
        <StripedBar
          segments={[
            { value: 30, color: "#22c55e" },
            { value: 20, color: "#3b82f6" },
            { value: 25, color: "#f97316" },
            { value: 15, color: "#ef4444" },
          ]}
        />
      </Section>
      <Section title="Taller Height">
        <StripedBar
          className="h-16"
          segments={[
            { value: 60, color: "#8b5cf6" },
            { value: 30, color: "#06b6d4" },
          ]}
        />
      </Section>
    </div>
  )
}
