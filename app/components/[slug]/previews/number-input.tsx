"use client"

import { useState } from "react"
import { NumberInput } from "@/components/ui/number-input"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const numberInputControlDefs = {
  min: {
    type: "number" as const,
    defaultValue: 0,
    min: -100,
    max: 100,
    label: "Min",
  },
  max: {
    type: "number" as const,
    defaultValue: 100,
    min: 0,
    max: 1000,
    label: "Max",
  },
  step: {
    type: "number" as const,
    defaultValue: 1,
    min: 1,
    max: 50,
    label: "Step",
  },
  disabled: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Disabled",
  },
} satisfies ControlDefs

export default function NumberInputPreview() {
  const controls = useControls(numberInputControlDefs)
  const { min, max, step, disabled } = controls.values
  const [value, setValue] = useState(5)
  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <NumberInput
            value={value}
            onChange={setValue}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
          />
        </div>
      </Playground>
      <Section title="With Step = 5">
        <NumberInput defaultValue={10} min={0} max={100} step={5} />
      </Section>
    </div>
  )
}
