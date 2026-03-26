"use client"

import { Badge } from "@/components/ui/badge"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const badgeControlDefs = {
  variant: {
    type: "radio" as const,
    options: ["default", "secondary", "destructive", "outline"],
    defaultValue: "default",
    label: "Variant",
  },
  label: {
    type: "text" as const,
    defaultValue: "Badge",
    label: "Label",
  },
} satisfies ControlDefs

export default function BadgePreview() {
  const controls = useControls(badgeControlDefs)

  return (
    <div className="space-y-6">
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <Badge variant={controls.values.variant as "default"}>{controls.values.label}</Badge>
        </div>
      </Playground>

      <Section title="All Variants">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </Section>
    </div>
  )
}
