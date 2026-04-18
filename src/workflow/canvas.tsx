"use client"

import type { ReactFlowProps } from "@xyflow/react"
import { Background, ReactFlow } from "@xyflow/react"
import type { ReactNode } from "react"
import "@xyflow/react/dist/style.css"
import { cn } from "../lib/utils"
import { WorkflowContext, type WorkflowLayout } from "./workflow-context"

type CanvasProps = ReactFlowProps & {
  children?: ReactNode
  className?: string
  /** Flow direction — "vertical" (top→bottom) or "horizontal" (left→right). Default: "vertical" */
  layout?: WorkflowLayout
}

const deleteKeyCode = ["Backspace", "Delete"]

function Canvas({ children, className, layout = "vertical", ...props }: CanvasProps) {
  return (
    <WorkflowContext value={layout}>
      <ReactFlow
        data-slot="canvas"
        deleteKeyCode={deleteKeyCode}
        fitView
        panOnDrag={false}
        panOnScroll
        selectionOnDrag={true}
        zoomOnDoubleClick={false}
        className={cn("", className)}
        {...props}
      >
        <Background bgColor="var(--color-sidebar)" />
        {children}
      </ReactFlow>
    </WorkflowContext>
  )
}

export type { CanvasProps }
export { Canvas }
