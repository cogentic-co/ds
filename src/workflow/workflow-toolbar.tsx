import { NodeToolbar, Position } from "@xyflow/react"
import type { ComponentProps } from "react"
import { cn } from "../lib/utils"

type WorkflowToolbarProps = ComponentProps<typeof NodeToolbar>

function WorkflowToolbar({ className, ...props }: WorkflowToolbarProps) {
  return (
    <NodeToolbar
      data-slot="workflow-toolbar"
      className={cn("flex items-center gap-1 rounded-sm border bg-background p-1.5", className)}
      position={Position.Bottom}
      {...props}
    />
  )
}

export type { WorkflowToolbarProps }
export { WorkflowToolbar }
