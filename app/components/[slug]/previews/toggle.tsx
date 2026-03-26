"use client"

import { BoldIcon, ItalicIcon } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const toggleControlDefs = {
  variant: {
    type: "select" as const,
    options: ["default", "outline"],
    defaultValue: "default",
    label: "Variant",
  },
  size: {
    type: "select" as const,
    options: ["sm", "default", "lg"],
    defaultValue: "default",
    label: "Size",
  },
  disabled: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Disabled",
  },
  pressed: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Pressed",
  },
} satisfies ControlDefs

export default function TogglePreview() {
  const controls = useControls(toggleControlDefs)
  const { variant, size, disabled, pressed } = controls.values

  return (
    <div className="space-y-6">
      {/* Interactive playground */}
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <Toggle
            variant={variant as "default"}
            size={size as "default"}
            disabled={disabled}
            pressed={pressed}
            aria-label="Toggle bold"
          >
            <BoldIcon className="size-4" />
          </Toggle>
        </div>
      </Playground>

      {/* Static examples */}
      <Section title="Variants">
        <Toggle aria-label="Toggle bold">
          <BoldIcon className="size-4" />
        </Toggle>
        <Toggle variant="outline" aria-label="Toggle italic">
          <ItalicIcon className="size-4" />
        </Toggle>
      </Section>
      <Section title="Sizes">
        <Toggle size="sm" aria-label="Small">
          <BoldIcon className="size-4" />
        </Toggle>
        <Toggle size="default" aria-label="Default">
          <BoldIcon className="size-4" />
        </Toggle>
        <Toggle size="lg" aria-label="Large">
          <BoldIcon className="size-4" />
        </Toggle>
      </Section>
    </div>
  )
}
