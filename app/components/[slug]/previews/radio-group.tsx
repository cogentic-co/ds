"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { type ControlDefs, Playground, useControls } from "./_shared"

const radioGroupControlDefs = {
  disabled: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Disabled",
  },
} satisfies ControlDefs

export default function RadioGroupPreview() {
  const controls = useControls(radioGroupControlDefs)

  return (
    <div className="space-y-6">
      <Playground controls={controls}>
        <RadioGroup defaultValue="comfortable" disabled={controls.values.disabled}>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">Default</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">Comfortable</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="compact" id="r3" />
            <Label htmlFor="r3">Compact</Label>
          </div>
        </RadioGroup>
      </Playground>
    </div>
  )
}
