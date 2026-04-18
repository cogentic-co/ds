"use client"

import { Handle, Position } from "@xyflow/react"
import { cva, type VariantProps } from "class-variance-authority"
import { Component, type ComponentProps, type ErrorInfo, type ReactNode } from "react"
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

// ---------------------------------------------------------------------------
// CVA — gate type drives the shape/colour accent
// ---------------------------------------------------------------------------

const workflowGateVariants = cva(
  [
    "group/gate relative flex items-center justify-center",
    "overflow-visible bg-card",
    "transition-shadow duration-150",
  ].join(" "),
  {
    variants: {
      type: {
        "if-else": "size-14 rotate-45 rounded-lg ring-2 ring-amber-400 dark:ring-amber-500",
        switch: "size-14 rotate-45 rounded-lg ring-2 ring-violet-400 dark:ring-violet-500",
        merge: "size-14 rotate-45 rounded-lg ring-2 ring-sky-400 dark:ring-sky-500",
        delay: "size-14 rounded-full ring-2 ring-orange-400 dark:ring-orange-500",
        end: "size-10 rounded-full ring-2 ring-red-400 dark:ring-red-500",
      },
      selected: {
        true: "shadow-md ring-[3px] ring-primary",
        false: "",
      },
    },
    defaultVariants: { type: "if-else", selected: false },
  },
)

// Icon accent colour per type
const iconColor: Record<string, string> = {
  "if-else": "text-amber-500 dark:text-amber-400",
  switch: "text-violet-500 dark:text-violet-400",
  merge: "text-sky-500 dark:text-sky-400",
  delay: "text-orange-500 dark:text-orange-400",
  end: "text-red-500 dark:text-red-400",
}

// Branch label colour per type
const branchLabelColor: Record<string, string> = {
  "if-else":
    "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
  switch:
    "border-violet-300 bg-violet-50 text-violet-700 dark:border-violet-600 dark:bg-violet-950/40 dark:text-violet-400",
  merge:
    "border-sky-300 bg-sky-50 text-sky-700 dark:border-sky-600 dark:bg-sky-950/40 dark:text-sky-400",
  delay:
    "border-orange-300 bg-orange-50 text-orange-700 dark:border-orange-600 dark:bg-orange-950/40 dark:text-orange-400",
  end: "border-red-300 bg-red-50 text-red-700 dark:border-red-600 dark:bg-red-950/40 dark:text-red-400",
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type WorkflowGateProps = ComponentProps<"div"> &
  VariantProps<typeof workflowGateVariants> & {
    /** Label shown inside the diamond/circle */
    label?: ReactNode
    /** Icon shown inside the gate shape */
    icon?: ReactNode
    /** Handle configuration */
    handles?: {
      top?: boolean
      bottom?: boolean
      left?: boolean
      right?: boolean
    }
    /** Labels for left and right branches (displayed as pills beside the gate) */
    branches?: {
      left?: string
      right?: string
    }
  }

// ---------------------------------------------------------------------------
// Branch label pill — positioned beside the gate
// ---------------------------------------------------------------------------

function BranchLabel({
  children,
  side,
  type,
}: {
  children: ReactNode
  side: "left" | "right"
  type: string
}) {
  return (
    <span
      className={cn(
        "absolute top-1/2 -translate-y-1/2 whitespace-nowrap",
        "rounded-md border px-2.5 py-1 font-semibold text-[11px]",
        branchLabelColor[type] ?? branchLabelColor["if-else"],
        side === "left" ? "right-full mr-4" : "left-full ml-4",
      )}
    >
      {children}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Handle dot — small, clean
// ---------------------------------------------------------------------------

const handleClassName = cn(
  "!size-2.5 !rounded-full !border-[1.5px] !border-card !bg-muted-foreground/60",
  "hover:!bg-primary !transition-colors",
)

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function WorkflowGate({
  type = "if-else",
  selected,
  label,
  icon,
  handles,
  branches,
  className,
  ...props
}: WorkflowGateProps) {
  const isRotated = type === "if-else" || type === "switch" || type === "merge"
  const gateType = type ?? "if-else"

  let layout: "vertical" | "horizontal" = "vertical"
  try {
    // biome-ignore lint/correctness/useHookAtTopLevel: intentional try/catch pattern for optional context
    layout = useWorkflowLayout()
  } catch {
    // Outside context — default to vertical
  }

  return (
    <div
      data-slot="workflow-gate"
      data-gate-type={gateType}
      className={cn("relative flex items-center justify-center", className)}
      {...props}
    >
      {/* The diamond / circle shape */}
      <div className={cn(workflowGateVariants({ type, selected }))}>
        {/* Inner content counter-rotated so icon reads normally */}
        <div
          className={cn(
            "flex flex-col items-center justify-center gap-0.5",
            isRotated && "-rotate-45",
          )}
        >
          {icon && <span className={cn("[&>svg]:size-5", iconColor[gateType])}>{icon}</span>}
          {label && !icon && (
            <span
              className={cn("font-bold text-[9px] uppercase tracking-wider", iconColor[gateType])}
            >
              {label}
            </span>
          )}
        </div>
      </div>

      {/* Branch labels */}
      {branches?.left && (
        <BranchLabel side="left" type={gateType}>
          {branches.left}
        </BranchLabel>
      )}
      {branches?.right && (
        <BranchLabel side="right" type={gateType}>
          {branches.right}
        </BranchLabel>
      )}

      {/* Handles */}
      {handles?.top && (
        <HandleBoundary>
          <Handle
            type="target"
            position={layout === "horizontal" ? Position.Left : Position.Top}
            className={handleClassName}
          />
        </HandleBoundary>
      )}
      {handles?.bottom && (
        <HandleBoundary>
          <Handle
            type="source"
            position={layout === "horizontal" ? Position.Right : Position.Bottom}
            className={handleClassName}
          />
        </HandleBoundary>
      )}
      {handles?.left && (
        <HandleBoundary>
          <Handle type="source" position={Position.Left} id="left" className={handleClassName} />
        </HandleBoundary>
      )}
      {handles?.right && (
        <HandleBoundary>
          <Handle type="source" position={Position.Right} id="right" className={handleClassName} />
        </HandleBoundary>
      )}
    </div>
  )
}

export type { WorkflowGateProps }
export { WorkflowGate, workflowGateVariants }
