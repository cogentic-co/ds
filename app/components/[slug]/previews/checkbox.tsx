"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const checkboxControlDefs = {
  checked: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Checked",
  },
  disabled: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Disabled",
  },
} satisfies ControlDefs

export default function CheckboxPreview() {
  const controls = useControls(checkboxControlDefs)

  return (
    <div className="space-y-6">
      <Playground controls={controls}>
        <div className="flex items-center justify-center gap-2 py-4">
          <Checkbox
            id="playground-checkbox"
            checked={controls.values.checked}
            onCheckedChange={(checked) => controls.set("checked", !!checked)}
            disabled={controls.values.disabled}
          />
          <Label htmlFor="playground-checkbox">Accept terms and conditions</Label>
        </div>
      </Playground>

      <Section title="States">
        <div className="flex items-center gap-2">
          <Checkbox id="checked" defaultChecked />
          <Label htmlFor="checked">Checked</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="disabled" disabled />
          <Label htmlFor="disabled" className="text-muted-foreground">
            Disabled
          </Label>
        </div>
      </Section>
    </div>
  )
}
