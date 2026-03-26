"use client"

import { Spinner } from "@/components/ui/spinner"
import { type ControlDefs, Playground, useControls } from "./_shared"

const spinnerControlDefs = {
  variant: {
    type: "select" as const,
    options: ["circle", "lines"],
    defaultValue: "circle",
    label: "Variant",
  },
  size: {
    type: "select" as const,
    options: ["sm", "md", "lg"],
    defaultValue: "md",
    label: "Size",
  },
} satisfies ControlDefs

const spinnerSizeClasses: Record<string, string> = {
  sm: "size-3",
  md: "size-4",
  lg: "size-6",
}

export default function SpinnerPreview() {
  const controls = useControls(spinnerControlDefs)

  return (
    <div className="space-y-6">
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <Spinner
            variant={controls.values.variant as "circle"}
            className={spinnerSizeClasses[controls.values.size]}
          />
        </div>
      </Playground>
    </div>
  )
}
