"use client"

import { Handle, type HandleProps, Position } from "@xyflow/react"
import { Component, type ErrorInfo, type ReactNode } from "react"
import { cn } from "../lib/utils"
import { useWorkflowLayout } from "./workflow-context"

// Error boundary for handles outside ReactFlow context
class HandleBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(_: Error, __: ErrorInfo) {}
  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

type WorkflowHandleProps = Omit<HandleProps, "position"> & {
  /** Override position. If omitted, auto-detects based on layout context and type (source→bottom/right, target→top/left) */
  position?: Position
  className?: string
}

const handleBase =
  "!size-2.5 !rounded-full !border-[1.5px] !border-card !bg-muted-foreground/60 hover:!bg-primary !transition-colors"

function WorkflowHandle({ type, position, className, ...props }: WorkflowHandleProps) {
  let layout: "vertical" | "horizontal" = "vertical"
  try {
    // biome-ignore lint/correctness/useHookAtTopLevel: intentional try/catch pattern for optional context
    layout = useWorkflowLayout()
  } catch {
    // Outside context — default to vertical
  }

  const resolvedPosition =
    position ??
    (type === "source"
      ? layout === "horizontal"
        ? Position.Right
        : Position.Bottom
      : layout === "horizontal"
        ? Position.Left
        : Position.Top)

  return (
    <HandleBoundary>
      <Handle
        type={type}
        position={resolvedPosition}
        className={cn(handleBase, className)}
        {...props}
      />
    </HandleBoundary>
  )
}

export type { WorkflowHandleProps }
export { HandleBoundary, handleBase, WorkflowHandle }
