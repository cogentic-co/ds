"use client"

import { useState } from "react"
import { InlineEdit } from "@/components/ui/inline-edit"
import { type ControlDefs, Playground, useControls } from "./_shared"

const inlineEditControlDefs = {
  placeholder: {
    type: "text" as const,
    defaultValue: "Click to edit",
    label: "Placeholder",
  },
} satisfies ControlDefs

export default function InlineEditPreview() {
  const controls = useControls(inlineEditControlDefs)
  const { placeholder } = controls.values
  const [value, setValue] = useState("Click to edit this text")
  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <InlineEdit value={value} onChange={setValue} placeholder={placeholder} />
        </div>
      </Playground>
    </div>
  )
}
