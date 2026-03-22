"use client"

import { MiniMap } from "@xyflow/react"
import type { ComponentProps } from "react"
import { cn } from "../lib/utils"

type WorkflowMinimapProps = ComponentProps<typeof MiniMap>

function WorkflowMinimap({ className, ...props }: WorkflowMinimapProps) {
  return (
    <MiniMap
      data-slot="workflow-minimap"
      className={cn("!rounded-lg !border !border-border !bg-card !shadow-sm", className)}
      maskColor="var(--color-muted)"
      nodeColor="var(--color-primary)"
      nodeStrokeColor="var(--color-border)"
      nodeBorderRadius={8}
      {...props}
    />
  )
}

export { WorkflowMinimap }
export type { WorkflowMinimapProps }
