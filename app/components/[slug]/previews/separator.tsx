"use client"

import { Separator } from "@/components/ui/separator"
import { type ControlDefs, Playground, useControls } from "./_shared"

const separatorControlDefs = {
  orientation: {
    type: "radio" as const,
    options: ["horizontal", "vertical"],
    defaultValue: "horizontal",
    label: "Orientation",
  },
} satisfies ControlDefs

export default function SeparatorPreview() {
  const controls = useControls(separatorControlDefs)
  const isVertical = controls.values.orientation === "vertical"

  return (
    <div className="max-w-md space-y-6">
      <Playground controls={controls}>
        {isVertical ? (
          <div className="flex h-12 items-center gap-4 text-sm">
            <span className="font-medium">Blog</span>
            <Separator orientation="vertical" />
            <span className="font-medium">Docs</span>
            <Separator orientation="vertical" />
            <span className="font-medium">Source</span>
          </div>
        ) : (
          <div className="space-y-0">
            <div className="space-y-1 py-2">
              <p className="font-medium text-sm">Cogentic Design System</p>
              <p className="text-muted-foreground text-sm">An open-source UI component library.</p>
            </div>
            <Separator />
            <div className="flex items-center gap-4 py-2 text-sm">
              <span>Blog</span>
              <span>Docs</span>
              <span>Source</span>
            </div>
          </div>
        )}
      </Playground>
    </div>
  )
}
