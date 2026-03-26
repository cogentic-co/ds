"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const textareaControlDefs = {
  placeholder: {
    type: "text" as const,
    defaultValue: "Type your message here.",
    label: "Placeholder",
  },
  disabled: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Disabled",
  },
} satisfies ControlDefs

export default function TextareaPreview() {
  const controls = useControls(textareaControlDefs)

  return (
    <div className="max-w-sm space-y-6">
      <Playground controls={controls}>
        <div className="grid gap-1.5">
          <Label htmlFor="playground-textarea">Message</Label>
          <Textarea
            id="playground-textarea"
            placeholder={controls.values.placeholder}
            disabled={controls.values.disabled}
          />
        </div>
      </Playground>

      <Section title="Disabled">
        <Textarea placeholder="Disabled textarea" disabled />
      </Section>
    </div>
  )
}
