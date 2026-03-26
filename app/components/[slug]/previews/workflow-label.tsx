"use client"

import { WorkflowLabel } from "@/src/workflow"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const workflowLabelControlDefs = {
  variant: {
    type: "select",
    options: ["default", "success", "warning", "error", "muted"],
    defaultValue: "default",
    label: "Variant",
  },
  text: { type: "text", defaultValue: "Approved", label: "Text" },
} satisfies ControlDefs

export default function WorkflowLabelPreview() {
  const controls = useControls(workflowLabelControlDefs)
  return (
    <div className="space-y-6">
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <WorkflowLabel variant={controls.values.variant as "default"}>
            {controls.values.text}
          </WorkflowLabel>
        </div>
      </Playground>

      <Section title="All variants">
        <div className="flex flex-wrap gap-2">
          <WorkflowLabel>Default</WorkflowLabel>
          <WorkflowLabel variant="success">Success</WorkflowLabel>
          <WorkflowLabel variant="warning">Condition met</WorkflowLabel>
          <WorkflowLabel variant="error">Failed</WorkflowLabel>
          <WorkflowLabel variant="muted">Skipped</WorkflowLabel>
        </div>
      </Section>
      <Section title="On an edge (use as edge data.label)">
        <div className="flex items-center gap-4 text-muted-foreground text-sm">
          <span>Node A</span>
          <div className="relative flex flex-1 items-center justify-center border-muted-foreground/30 border-t border-dashed">
            <WorkflowLabel variant="success" className="absolute">
              Yes
            </WorkflowLabel>
          </div>
          <span>Node B</span>
        </div>
      </Section>
    </div>
  )
}
