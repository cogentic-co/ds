"use client"

import { Controls as ControlsPrimitive } from "@xyflow/react"
import type { ComponentProps } from "react"
import { cn } from "../lib/utils"

type WorkflowControlsProps = ComponentProps<typeof ControlsPrimitive>

function WorkflowControls({ className, ...props }: WorkflowControlsProps) {
  return (
    <ControlsPrimitive
      data-slot="workflow-controls"
      className={cn(
        "gap-px overflow-hidden rounded-md border bg-card p-1 shadow-none!",
        "[&>button]:rounded-md [&>button]:border-none! [&>button]:bg-transparent! [&>button]:hover:bg-secondary!",
        className,
      )}
      {...props}
    />
  )
}

export type { WorkflowControlsProps }
export { WorkflowControls }
