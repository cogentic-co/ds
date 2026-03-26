"use client"

import { Typewriter } from "@/components/ui/typewriter"
import { type ControlDefs, Playground, useControls } from "./_shared"

const typewriterControlDefs = {
  speed: {
    type: "number" as const,
    defaultValue: 100,
    min: 20,
    max: 500,
    step: 10,
    label: "Speed (ms)",
  },
  loop: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Loop",
  },
  showLineNumbers: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Line Numbers",
  },
  showCursor: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Cursor",
  },
} satisfies ControlDefs

export default function TypewriterPreview() {
  const controls = useControls(typewriterControlDefs)
  const lines = [
    { text: "import { Button } from '@cogentic/ds'", className: "text-emerald-500" },
    { text: "" },
    { text: "export default function App() {", className: "text-blue-500" },
    { text: "return (", indent: 1, className: "text-foreground/60" },
    { text: '<Button variant="default">', indent: 2, className: "text-amber-500" },
    { text: "Click me", indent: 3 },
    { text: "</Button>", indent: 2, className: "text-amber-500" },
    { text: ")", indent: 1, className: "text-foreground/60" },
    { text: "}", className: "text-blue-500" },
  ]

  return (
    <div className="space-y-6">
      <Playground controls={controls}>
        <div className="max-w-md rounded-lg border bg-card p-4">
          <Typewriter
            lines={lines}
            speed={controls.values.speed as number}
            loop={controls.values.loop as boolean}
            showLineNumbers={controls.values.showLineNumbers as boolean}
            showCursor={controls.values.showCursor as boolean}
          />
        </div>
      </Playground>
    </div>
  )
}
