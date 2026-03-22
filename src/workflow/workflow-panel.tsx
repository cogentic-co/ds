import { Panel as PanelPrimitive } from "@xyflow/react"
import type { ComponentProps } from "react"
import { cn } from "../lib/utils"

type WorkflowPanelProps = ComponentProps<typeof PanelPrimitive>

function WorkflowPanel({ className, ...props }: WorkflowPanelProps) {
  return (
    <PanelPrimitive
      data-slot="workflow-panel"
      className={cn("m-4 overflow-hidden rounded-md border bg-card p-1", className)}
      {...props}
    />
  )
}

export { WorkflowPanel }
export type { WorkflowPanelProps }
