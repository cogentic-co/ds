"use client"

import { Package } from "lucide-react"
import { WorkflowGroup } from "@/src/workflow"
import { Playground, useControls } from "./_shared"

export default function WorkflowGroupPreview() {
  const controls = useControls({
    variant: {
      type: "select" as const,
      options: ["default", "primary", "success", "warning"],
      defaultValue: "default",
      label: "Variant",
    },
    selected: { type: "boolean" as const, defaultValue: false, label: "Selected" },
    label: { type: "text" as const, defaultValue: "Retry Loop", label: "Label" },
    showIcon: { type: "boolean" as const, defaultValue: true, label: "Show Icon" },
  })
  const { values } = controls

  return (
    <Playground controls={controls}>
      <div className="flex items-center justify-center p-8">
        <WorkflowGroup
          variant={values.variant as "default" | "primary" | "success" | "warning"}
          selected={values.selected as boolean}
          label={values.label as string}
          icon={values.showIcon ? <Package /> : undefined}
          className="w-72"
        >
          <div className="flex flex-col gap-3 p-2">
            <div className="rounded-xl border bg-card p-3 text-sm">Node A</div>
            <div className="rounded-xl border bg-card p-3 text-sm">Node B</div>
          </div>
        </WorkflowGroup>
      </div>
    </Playground>
  )
}
