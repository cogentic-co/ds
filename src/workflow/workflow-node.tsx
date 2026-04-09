"use client"

import { Handle, Position } from "@xyflow/react"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronDown, ChevronUp, GripVertical, Plus } from "lucide-react"
import { Component, type ComponentProps, type ErrorInfo, type ReactNode, useState } from "react"
import { cn } from "../lib/utils"
import { useWorkflowLayout } from "./workflow-context"

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

// ---------------------------------------------------------------------------
// CVA — state drives the ring/border treatment
// ---------------------------------------------------------------------------

const workflowNodeVariants = cva(
  [
    "group/node relative flex flex-col bg-card text-card-foreground",
    "w-80 overflow-visible rounded-2xl shadow-sm",
    "transition-shadow duration-150",
  ].join(" "),
  {
    variants: {
      state: {
        default: "ring-1 ring-border/70",
        selected: "shadow-md ring-[3px] ring-primary",
        dotted: "border-2 border-muted-foreground/30 border-dashed shadow-none",
      },
    },
    defaultVariants: { state: "default" },
  },
)

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type WorkflowNodeProps = ComponentProps<"div"> &
  VariantProps<typeof workflowNodeVariants> & {
    /** Show the 6-dot drag grip in the header */
    draggable?: boolean
    /** Icon rendered before the title — wrap in a coloured square for the best look */
    icon?: React.ReactNode
    /** Node title text */
    title?: React.ReactNode
    /** Status badge (e.g. "TRIGGER") shown at the trailing edge of the header */
    status?: React.ReactNode
    /** Notification badge count rendered on the icon */
    badge?: number | string
    /** Make the body collapsible with an expand/close footer toggle */
    collapsible?: boolean
    /** Start collapsed when collapsible is true */
    defaultCollapsed?: boolean
    /** Custom footer content (ignored when collapsible is true) */
    footer?: React.ReactNode
    /** Configure source/target handles at the top and bottom edges */
    handles?: { target?: boolean; source?: boolean }
  }

// ---------------------------------------------------------------------------
// Handle connector — circle with a subtle plus icon
// ---------------------------------------------------------------------------

function NodeHandle({ type }: { type: "source" | "target" }) {
  let layout: "vertical" | "horizontal" = "vertical"
  try {
    // biome-ignore lint/correctness/useHookAtTopLevel: intentional try/catch pattern for optional context
    layout = useWorkflowLayout()
  } catch {
    // Outside context — default to vertical
  }

  // vertical:  target=Top, source=Bottom
  // horizontal: target=Left, source=Right
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

// ---------------------------------------------------------------------------
// Header — drag grip ·· icon · title · status pill
// ---------------------------------------------------------------------------

function WorkflowNodeHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="workflow-node-header"
      className={cn("flex items-center gap-3 px-4 py-3.5", className)}
      {...props}
    />
  )
}

function WorkflowNodeTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="workflow-node-title"
      className={cn("min-w-0 flex-1 truncate font-bold text-sm leading-tight", className)}
      {...props}
    />
  )
}

function WorkflowNodeDescription({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="workflow-node-description"
      className={cn("text-muted-foreground text-xs", className)}
      {...props}
    />
  )
}

function WorkflowNodeAction({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="workflow-node-action"
      className={cn("ml-auto shrink-0", className)}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// Content area — sits between dotted separators
// ---------------------------------------------------------------------------

function WorkflowNodeContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="workflow-node-content"
      className={cn("space-y-2.5 px-4 py-3", className)}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

function WorkflowNodeFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="workflow-node-footer"
      className={cn(
        "flex items-center justify-center gap-1.5 px-4 py-2.5",
        "font-semibold text-muted-foreground text-xs",
        className,
      )}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// Dotted separator
// ---------------------------------------------------------------------------

function WorkflowNodeSeparator({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="workflow-node-separator"
      className={cn("mx-3 border-muted-foreground/20 border-t border-dashed", className)}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// Row — a label/value pair rendered as a rounded grey chip (like in the image)
// ---------------------------------------------------------------------------

function WorkflowNodeRow({
  label,
  value,
  icon,
  className,
  ...props
}: ComponentProps<"div"> & {
  label: string
  value: React.ReactNode
  icon?: React.ReactNode
}) {
  return (
    <div
      data-slot="workflow-node-row"
      className={cn(
        "flex items-center justify-between gap-3 rounded-xl bg-muted/60 px-4 py-2.5",
        className,
      )}
      {...props}
    >
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className="inline-flex items-center gap-2 font-semibold text-sm">
        {icon && (
          <span className="shrink-0 [&>img]:size-6 [&>img]:rounded-full [&>svg]:size-4">
            {icon}
          </span>
        )}
        {value}
      </span>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

function WorkflowNode({
  state,
  draggable: showDragHandle,
  icon,
  title,
  status,
  badge,
  collapsible,
  defaultCollapsed = false,
  footer,
  handles,
  className,
  children,
  ...props
}: WorkflowNodeProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)

  const hasHeader = icon || title || status || showDragHandle
  const hasContent = !!children
  const hasFooter = footer || collapsible

  return (
    <div
      data-slot="workflow-node"
      data-state={state ?? "default"}
      className={cn(workflowNodeVariants({ state }), className)}
      {...props}
    >
      {/* Target handle */}
      {handles?.target && (
        <HandleBoundary>
          <NodeHandle type="target" />
        </HandleBoundary>
      )}

      {/* Header */}
      {hasHeader && (
        <WorkflowNodeHeader>
          {showDragHandle && (
            <span className="shrink-0 cursor-grab text-muted-foreground/40 transition-colors hover:text-muted-foreground active:cursor-grabbing">
              <GripVertical className="size-4" />
            </span>
          )}
          {icon && (
            <span className="relative shrink-0 [&>img]:size-8 [&>img]:rounded-lg [&>svg]:size-7">
              {icon}
              {badge != null && (
                <span className="absolute -top-1.5 -right-1.5 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 font-bold text-[10px] text-primary-foreground leading-none ring-2 ring-card">
                  {badge}
                </span>
              )}
            </span>
          )}
          {title && <WorkflowNodeTitle>{title}</WorkflowNodeTitle>}
          {status && (
            <span className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-full border border-border/80 bg-muted/40 px-2.5 py-1 font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
              <ChevronDown className="size-2.5" />
              {status}
            </span>
          )}
        </WorkflowNodeHeader>
      )}

      {/* Body (collapsible) */}
      {hasContent && !collapsed && (
        <>
          {hasHeader && <WorkflowNodeSeparator />}
          <WorkflowNodeContent>{children}</WorkflowNodeContent>
        </>
      )}

      {/* Footer */}
      {hasFooter && (
        <>
          <WorkflowNodeSeparator />
          <WorkflowNodeFooter>
            {collapsible ? (
              <button
                type="button"
                onClick={() => setCollapsed((c) => !c)}
                className="inline-flex items-center gap-1.5 font-semibold text-muted-foreground text-xs transition-colors hover:text-foreground"
              >
                {collapsed ? (
                  <>
                    <ChevronDown className="size-3.5" />
                    Expand
                  </>
                ) : (
                  <>
                    <ChevronUp className="size-3.5" />
                    Close
                  </>
                )}
              </button>
            ) : (
              footer
            )}
          </WorkflowNodeFooter>
        </>
      )}

      {/* Source handle */}
      {handles?.source && (
        <HandleBoundary>
          <NodeHandle type="source" />
        </HandleBoundary>
      )}
    </div>
  )
}

export {
  WorkflowNode,
  WorkflowNodeHeader,
  WorkflowNodeTitle,
  WorkflowNodeDescription,
  WorkflowNodeAction,
  WorkflowNodeContent,
  WorkflowNodeFooter,
  WorkflowNodeSeparator,
  WorkflowNodeRow,
  workflowNodeVariants,
}
export type { WorkflowNodeProps }
