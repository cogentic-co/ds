"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { type ControlDefs, Playground, useControls } from "./_shared"

const tooltipControlDefs = {
  content: {
    type: "text" as const,
    defaultValue: "This is a tooltip",
    label: "Content",
  },
  side: {
    type: "select" as const,
    options: ["top", "right", "bottom", "left"],
    defaultValue: "top",
    label: "Side",
  },
} satisfies ControlDefs

export default function TooltipPreview() {
  const controls = useControls(tooltipControlDefs)

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <Playground controls={controls}>
          <div className="flex items-center justify-center py-8">
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" />}>Hover me</TooltipTrigger>
              <TooltipContent side={controls.values.side as "top"}>
                <p>{controls.values.content}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </Playground>
      </div>
    </TooltipProvider>
  )
}
