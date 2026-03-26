"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { type ControlDefs, Playground, useControls } from "./_shared"

const labelControlDefs = {
  text: {
    type: "text" as const,
    defaultValue: "Email address",
    label: "Label Text",
  },
} satisfies ControlDefs

export default function LabelPreview() {
  const controls = useControls(labelControlDefs)

  return (
    <div className="space-y-6">
      <Playground controls={controls}>
        <div className="grid gap-1.5">
          <Label htmlFor="label-demo">{controls.values.text}</Label>
          <Input id="label-demo" type="email" placeholder="you@example.com" />
        </div>
      </Playground>
    </div>
  )
}
