"use client"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const sliderControlDefs = {
  defaultValue: {
    type: "number" as const,
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
    label: "Value",
  },
  disabled: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Disabled",
  },
} satisfies ControlDefs

export default function SliderPreview() {
  const controls = useControls(sliderControlDefs)

  return (
    <div className="max-w-sm space-y-6">
      <Playground controls={controls}>
        <div className="space-y-2">
          <Label>Volume</Label>
          <Slider
            key={controls.values.defaultValue}
            defaultValue={[controls.values.defaultValue]}
            max={100}
            step={1}
            disabled={controls.values.disabled}
          />
        </div>
      </Playground>

      <Section title="Range">
        <div className="w-full space-y-2">
          <Label>Range</Label>
          <Slider defaultValue={[25, 75]} max={100} step={1} />
        </div>
      </Section>
    </div>
  )
}
