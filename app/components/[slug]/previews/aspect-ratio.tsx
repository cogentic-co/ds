"use client"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { type ControlDefs, Playground, useControls } from "./_shared"

const aspectRatioControlDefs = {
  ratio: {
    type: "select" as const,
    options: ["16/9", "4/3", "1/1", "21/9"],
    defaultValue: "16/9",
    label: "Ratio",
  },
} satisfies ControlDefs

const aspectRatioValues: Record<string, number> = {
  "16/9": 16 / 9,
  "4/3": 4 / 3,
  "1/1": 1,
  "21/9": 21 / 9,
}

export default function AspectRatioPreview() {
  const controls = useControls(aspectRatioControlDefs)
  const ratio = aspectRatioValues[controls.values.ratio] ?? 16 / 9

  return (
    <div className="max-w-sm space-y-6">
      <Playground controls={controls}>
        <div className="w-72">
          <AspectRatio ratio={ratio}>
            <div className="flex size-full items-center justify-center rounded-md bg-muted text-muted-foreground text-sm">
              {controls.values.ratio}
            </div>
          </AspectRatio>
        </div>
      </Playground>
    </div>
  )
}
