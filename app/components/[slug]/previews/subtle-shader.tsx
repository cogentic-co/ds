"use client"

import { SubtleShader } from "@/components/ui/subtle-shader"
import { type ControlDefs, Playground, useControls } from "./_shared"

const subtleShaderControlDefs = {
  palette: {
    type: "radio" as const,
    options: ["blue", "green", "amber"],
    defaultValue: "blue",
    label: "Palette",
  },
  paused: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Paused",
  },
} satisfies ControlDefs

export default function SubtleShaderPreview() {
  const controls = useControls(subtleShaderControlDefs)
  const { palette, paused } = controls.values

  return (
    <div className="space-y-6">
      <Playground controls={controls}>
        <div className="relative h-64 w-full overflow-hidden rounded-lg border">
          <SubtleShader palette={palette as "blue"} paused={paused as boolean} />
          <div className="relative z-10 flex h-full items-center justify-center">
            <p className="font-semibold text-lg">Content over subtle shader</p>
          </div>
        </div>
      </Playground>
    </div>
  )
}
