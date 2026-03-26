"use client"

import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { type ControlDefs, Playground, useControls } from "./_shared"

const toggleGroupControlDefs = {
  variant: {
    type: "radio" as const,
    options: ["default", "outline"],
    defaultValue: "default",
    label: "Variant",
  },
  size: {
    type: "radio" as const,
    options: ["default", "sm", "lg"],
    defaultValue: "default",
    label: "Size",
  },
} satisfies ControlDefs

export default function ToggleGroupPreview() {
  const controls = useControls(toggleGroupControlDefs)

  return (
    <div className="space-y-6">
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <ToggleGroup
            variant={controls.values.variant as "default"}
            size={controls.values.size as "default"}
          >
            <ToggleGroupItem value="bold" aria-label="Bold">
              <BoldIcon className="size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic">
              <ItalicIcon className="size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Underline">
              <UnderlineIcon className="size-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </Playground>
    </div>
  )
}
