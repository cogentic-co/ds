"use client"

import { Callout } from "@/components/ui/callout"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const calloutControlDefs = {
  variant: {
    type: "select" as const,
    options: ["info", "warning", "danger", "tip"],
    defaultValue: "info",
    label: "Variant",
  },
  message: {
    type: "text" as const,
    defaultValue: "This is an informational callout with helpful context.",
    label: "Message",
  },
} satisfies ControlDefs

export default function CalloutPreview() {
  const controls = useControls(calloutControlDefs)
  const { variant, message } = controls.values
  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <div className="max-w-lg">
          <Callout variant={variant as "info"}>{message}</Callout>
        </div>
      </Playground>
      <Section title="All Variants">
        <div className="w-full max-w-lg space-y-4">
          <Callout variant="info">This is an informational callout with helpful context.</Callout>
          <Callout variant="warning">Please review the changes before proceeding.</Callout>
          <Callout variant="danger">Something went wrong. Please try again.</Callout>
          <Callout variant="tip">You can use keyboard shortcuts for faster navigation.</Callout>
        </div>
      </Section>
    </div>
  )
}
