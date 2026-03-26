"use client"

import { Marquee } from "@/components/ui/marquee"
import { type ControlDefs, Playground, useControls } from "./_shared"

const marqueeControlDefs = {
  duration: {
    type: "number" as const,
    defaultValue: 20,
    min: 5,
    max: 120,
    step: 5,
    label: "Duration (s)",
  },
  pauseOnHover: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Pause on Hover",
  },
} satisfies ControlDefs

export default function MarqueePreview() {
  const controls = useControls(marqueeControlDefs)
  const items = ["Design", "System", "Components", "Animations", "Hooks", "Utilities"]

  return (
    <div className="w-full space-y-6">
      <Playground controls={controls}>
        <Marquee
          duration={controls.values.duration as number}
          pauseOnHover={controls.values.pauseOnHover as boolean}
        >
          {items.map((item) => (
            <div
              key={item}
              className="flex shrink-0 items-center rounded-lg border bg-card px-6 py-3"
            >
              <span className="font-medium text-sm">{item}</span>
            </div>
          ))}
        </Marquee>
      </Playground>
    </div>
  )
}
