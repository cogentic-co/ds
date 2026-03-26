"use client"

import { Kbd } from "@/components/ui/kbd"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const kbdControlDefs = {
  text: {
    type: "text" as const,
    defaultValue: "⌘K",
    label: "Text",
  },
} satisfies ControlDefs

export default function KbdPreview() {
  const controls = useControls(kbdControlDefs)

  return (
    <div className="space-y-6">
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <Kbd>{controls.values.text}</Kbd>
        </div>
      </Playground>

      <Section title="Single keys">
        <Kbd>⌘</Kbd>
        <Kbd>Shift</Kbd>
        <Kbd>Enter</Kbd>
        <Kbd>Esc</Kbd>
      </Section>
      <Section title="Combinations">
        <span className="flex items-center gap-1 text-sm">
          <Kbd>⌘</Kbd> + <Kbd>K</Kbd>
        </span>
        <span className="flex items-center gap-1 text-sm">
          <Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>P</Kbd>
        </span>
      </Section>
    </div>
  )
}
