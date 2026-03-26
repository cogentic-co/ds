"use client"

import { AnimatedCounter } from "@/components/ui/animated-counter"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const animatedCounterControlDefs = {
  value: {
    type: "number" as const,
    defaultValue: 56,
    min: 0,
    max: 10000,
    step: 1,
    label: "Value",
  },
  duration: {
    type: "number" as const,
    defaultValue: 1500,
    min: 500,
    max: 3000,
    step: 100,
    label: "Duration (ms)",
  },
} satisfies ControlDefs

export default function AnimatedCounterPreview() {
  const controls = useControls(animatedCounterControlDefs)

  return (
    <div className="space-y-6">
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <div className="text-center">
            <div className="font-bold text-4xl">
              <AnimatedCounter
                key={`${controls.values.value}-${controls.values.duration}`}
                value={controls.values.value}
                duration={controls.values.duration}
              />
            </div>
            <p className="text-muted-foreground text-sm">Counter</p>
          </div>
        </div>
      </Playground>

      <Section title="Examples">
        <div className="flex gap-8">
          <div className="text-center">
            <div className="font-bold text-4xl">
              <AnimatedCounter value={99.9} duration={2000} decimals={1} suffix="%" />
            </div>
            <p className="text-muted-foreground text-sm">Uptime</p>
          </div>
          <div className="text-center">
            <div className="font-bold text-4xl">
              <AnimatedCounter value={4200} duration={2500} prefix="$" />
            </div>
            <p className="text-muted-foreground text-sm">Saved</p>
          </div>
        </div>
      </Section>
    </div>
  )
}
