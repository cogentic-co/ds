"use client"

import { CopyButton } from "@/components/ui/copy-button"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const copyButtonControlDefs = {
  value: {
    type: "text" as const,
    defaultValue: "pnpm add @cogentic/ds",
    label: "Value",
  },
} satisfies ControlDefs

export default function CopyButtonPreview() {
  const controls = useControls(copyButtonControlDefs)
  const { value } = controls.values
  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <div className="flex items-center justify-center gap-2 py-4">
          <div className="flex items-center gap-2 rounded-md border px-3 py-2">
            <code className="text-sm">{value}</code>
            <CopyButton value={value} />
          </div>
        </div>
      </Playground>
      <Section title="Icon only">
        <CopyButton value="npm install @cogentic/ds" />
      </Section>
    </div>
  )
}
