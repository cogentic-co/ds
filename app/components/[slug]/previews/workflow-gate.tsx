"use client"

import type React from "react"
import { GitBranch, GitMerge, Route, StopCircle, Timer } from "lucide-react"
import { WorkflowGate } from "@/src/workflow"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const gateIconMap: Record<string, React.ReactNode> = {
  "if-else": <GitBranch />,
  switch: <Route />,
  merge: <GitMerge />,
  delay: <Timer />,
  end: <StopCircle />,
}

const workflowGateControlDefs = {
  type: {
    type: "select",
    options: ["if-else", "switch", "merge", "delay", "end"],
    defaultValue: "if-else",
    label: "Type",
  },
  selected: { type: "boolean", defaultValue: false, label: "Selected" },
  showBranches: { type: "boolean", defaultValue: true, label: "Show branches" },
  useIcon: { type: "boolean", defaultValue: true, label: "Icon (vs text)" },
} satisfies ControlDefs

export default function WorkflowGatePreview() {
  const controls = useControls(workflowGateControlDefs)
  const gateType = controls.values.type as "if-else"
  return (
    <div className="space-y-10">
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-8">
          <WorkflowGate
            type={gateType}
            selected={controls.values.selected}
            icon={controls.values.useIcon ? gateIconMap[gateType] : undefined}
            label={!controls.values.useIcon ? gateType.toUpperCase().slice(0, 3) : undefined}
            branches={
              controls.values.showBranches ? { left: "Is True", right: "If False" } : undefined
            }
          />
        </div>
      </Playground>

      <Section title="All gate types">
        <div className="flex flex-wrap items-center gap-10 py-4">
          <div className="flex flex-col items-center gap-3">
            <WorkflowGate type="if-else" icon={<GitBranch />} />
            <span className="font-medium text-muted-foreground text-xs">IF / ELSE</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <WorkflowGate type="switch" icon={<Route />} />
            <span className="font-medium text-muted-foreground text-xs">Switch</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <WorkflowGate type="merge" icon={<GitMerge />} />
            <span className="font-medium text-muted-foreground text-xs">Merge</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <WorkflowGate type="delay" icon={<Timer />} />
            <span className="font-medium text-muted-foreground text-xs">Delay</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <WorkflowGate type="end" icon={<StopCircle />} />
            <span className="font-medium text-muted-foreground text-xs">End</span>
          </div>
        </div>
      </Section>
    </div>
  )
}
