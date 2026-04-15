"use client"

import { Handle, Position } from "@xyflow/react"
import { Plus } from "lucide-react"
import { Component, type ErrorInfo, type ReactNode } from "react"
import { cn } from "../lib/utils"
import { useWorkflowLayout } from "./workflow-context"
import { WorkflowNodeCard, type WorkflowNodeCardProps } from "./workflow-node-card"

/**
 * Canvas-aware workflow node — wraps `WorkflowNodeCard` with xyflow connection
 * handles. Use this inside a Canvas/ReactFlow. For the pure visual (no xyflow
 * dependency), import `WorkflowNodeCard` from
 * `@cogentic-co/ds/workflow/workflow-node-card`.
 */

// Silently swallow Handle errors when rendered outside ReactFlow context
class HandleBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(_: Error, __: ErrorInfo) {
    // Intentionally silent — handles are optional outside a canvas
  }
  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

function NodeHandle({ type }: { type: "source" | "target" }) {
  let layout: "vertical" | "horizontal" = "vertical"
  try {
    // biome-ignore lint/correctness/useHookAtTopLevel: intentional try/catch pattern for optional context
    layout = useWorkflowLayout()
  } catch {
    // Outside context — default to vertical
  }

  const position =
    layout === "horizontal"
      ? type === "target"
        ? Position.Left
        : Position.Right
      : type === "target"
        ? Position.Top
        : Position.Bottom

  return (
    <Handle
      type={type}
      position={position}
      className={cn(
        "!flex !items-center !justify-center",
        "!size-5 !rounded-full !border-2 !border-card !bg-muted-foreground/70",
        "hover:!bg-primary hover:!border-primary/20 !transition-colors",
      )}
    >
      <Plus className="pointer-events-none size-2.5 text-card" />
    </Handle>
  )
}

type WorkflowNodeProps = WorkflowNodeCardProps & {
  /** Configure source/target handles at the top and bottom edges */
  handles?: { target?: boolean; source?: boolean }
}

function WorkflowNode({ handles, topSlot, bottomSlot, ...props }: WorkflowNodeProps) {
  const resolvedTop = handles?.target ? (
    <>
      <HandleBoundary>
        <NodeHandle type="target" />
      </HandleBoundary>
      {topSlot}
    </>
  ) : (
    topSlot
  )

  const resolvedBottom = handles?.source ? (
    <>
      {bottomSlot}
      <HandleBoundary>
        <NodeHandle type="source" />
      </HandleBoundary>
    </>
  ) : (
    bottomSlot
  )

  return <WorkflowNodeCard {...props} topSlot={resolvedTop} bottomSlot={resolvedBottom} />
}

export { WorkflowNode }
export type { WorkflowNodeProps }

// Re-export everything from workflow-node-card for backward compat so
// consumers importing from "@cogentic-co/ds/workflow/workflow-node" still
// get all the sub-components.
export {
  WorkflowNodeAction,
  WorkflowNodeCard,
  WorkflowNodeContent,
  WorkflowNodeDescription,
  WorkflowNodeFooter,
  WorkflowNodeHeader,
  WorkflowNodeIcon,
  workflowNodeIconVariants,
  WorkflowNodeRow,
  WorkflowNodeSeparator,
  WorkflowNodeStatusBadge,
  WorkflowNodeTitle,
  workflowNodeVariants,
} from "./workflow-node-card"
export type {
  WorkflowNodeCardProps,
  WorkflowNodeIconProps,
  WorkflowNodeState,
  WorkflowNodeStatus,
  WorkflowNodeStatusBadgeProps,
} from "./workflow-node-card"
