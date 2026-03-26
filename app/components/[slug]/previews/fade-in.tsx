"use client"

import { FadeIn } from "@/components/ui/fade-in"
import { type ControlDefs, Playground, useControls } from "./_shared"

const fadeInControlDefs = {
  delay: {
    type: "number" as const,
    defaultValue: 0,
    min: 0,
    max: 2000,
    step: 50,
    label: "Delay (ms)",
  },
} satisfies ControlDefs

export default function FadeInPreview() {
  const controls = useControls(fadeInControlDefs)

  return (
    <div className="space-y-6">
      <Playground controls={controls}>
        <FadeIn delay={controls.values.delay as number}>
          <div className="rounded-lg border bg-card p-4">Item fades in with configurable delay</div>
        </FadeIn>
      </Playground>

      {/* Staggered example */}
      <div className="space-y-4">
        <FadeIn>
          <div className="rounded-lg border bg-card p-4">First item fades in</div>
        </FadeIn>
        <FadeIn delay={200}>
          <div className="rounded-lg border bg-card p-4">Second item with 200ms delay</div>
        </FadeIn>
        <FadeIn delay={400}>
          <div className="rounded-lg border bg-card p-4">Third item with 400ms delay</div>
        </FadeIn>
      </div>
    </div>
  )
}
