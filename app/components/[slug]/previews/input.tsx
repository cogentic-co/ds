"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const inputControlDefs = {
  type: {
    type: "select" as const,
    options: ["text", "email", "password", "number"],
    defaultValue: "text",
    label: "Type",
  },
  placeholder: {
    type: "text" as const,
    defaultValue: "Enter value...",
    label: "Placeholder",
  },
  disabled: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Disabled",
  },
  value: {
    type: "text" as const,
    defaultValue: "",
    label: "Value",
  },
} satisfies ControlDefs

export default function InputPreview() {
  const controls = useControls(inputControlDefs)

  return (
    <div className="max-w-sm space-y-6">
      {/* Interactive playground */}
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <Input
            type={controls.values.type}
            placeholder={controls.values.placeholder}
            disabled={controls.values.disabled}
            value={controls.values.value}
            onChange={() => {}}
          />
        </div>
      </Playground>

      {/* Static examples */}
      <Section title="Types">
        <Input type="text" placeholder="Text input" />
        <Input type="email" placeholder="Email input" />
        <Input type="password" placeholder="Password" />
        <Input type="number" placeholder="Number" />
      </Section>
      <Section title="States">
        <Input placeholder="Disabled" disabled />
        <Input placeholder="With value" defaultValue="Hello world" />
      </Section>
      <Section title="With label">
        <div className="grid w-full gap-1.5">
          <Label htmlFor="email-demo">Email</Label>
          <Input type="email" id="email-demo" placeholder="you@example.com" />
        </div>
      </Section>
    </div>
  )
}
