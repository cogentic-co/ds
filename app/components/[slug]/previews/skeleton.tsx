"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const skeletonControlDefs = {
  shape: {
    type: "radio" as const,
    options: ["rectangle", "circle"],
    defaultValue: "rectangle",
    label: "Shape",
  },
} satisfies ControlDefs

export default function SkeletonPreview() {
  const controls = useControls(skeletonControlDefs)

  return (
    <div className="max-w-sm space-y-6">
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <Skeleton
            className={controls.values.shape === "circle" ? "size-12 rounded-full" : "h-4 w-48"}
          />
        </div>
      </Playground>

      <Section title="Card skeleton">
        <div className="flex items-center gap-4">
          <Skeleton className="size-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </Section>
    </div>
  )
}
