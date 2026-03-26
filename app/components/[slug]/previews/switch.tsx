"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { type ControlDefs, Playground, useControls } from "./_shared"

const switchControlDefs = {
  disabled: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Disabled",
  },
  label: {
    type: "text" as const,
    defaultValue: "Airplane mode",
    label: "Label",
  },
} satisfies ControlDefs

export default function SwitchPreview() {
  const controls = useControls(switchControlDefs)

  return (
    <div className="space-y-6">
      {/* Interactive playground */}
      <Playground controls={controls}>
        <div className="flex items-center justify-center gap-2 py-4">
          <Switch id="playground-switch" disabled={controls.values.disabled} />
          <Label htmlFor="playground-switch">{controls.values.label}</Label>
        </div>
      </Playground>

      {/* Static examples */}
      <div className="flex items-center gap-2">
        <Switch id="airplane" />
        <Label htmlFor="airplane">Airplane mode</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="notifications" defaultChecked />
        <Label htmlFor="notifications">Notifications (on)</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="disabled-switch" disabled />
        <Label htmlFor="disabled-switch" className="text-muted-foreground">
          Disabled
        </Label>
      </div>
    </div>
  )
}
