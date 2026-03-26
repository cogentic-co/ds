"use client"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { type ControlDefs, Playground, useControls } from "./_shared"

const selectControlDefs = {
  disabled: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Disabled",
  },
  placeholder: {
    type: "text" as const,
    defaultValue: "Select a fruit",
    label: "Placeholder",
  },
} satisfies ControlDefs

export default function SelectPreview() {
  const controls = useControls(selectControlDefs)
  const { disabled, placeholder } = controls.values

  return (
    <div className="max-w-sm space-y-6">
      {/* Interactive playground */}
      <Playground controls={controls}>
        <div className="grid gap-1.5">
          <Label>Fruit</Label>
          <Select disabled={disabled}>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="cherry">Cherry</SelectItem>
              <SelectItem value="grape">Grape</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Playground>
    </div>
  )
}
