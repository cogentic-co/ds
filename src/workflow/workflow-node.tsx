"use client"

import { Handle, Position } from "@xyflow/react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  GripVertical,
  Loader2,
  Plus,
} from "lucide-react"
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
// CVA — two orthogonal axes: visual state (selection) + execution status
// ---------------------------------------------------------------------------

const workflowNodeVariants = cva(
  [
    "group/node relative flex flex-col bg-card text-card-foreground",
    "w-80 overflow-visible rounded-2xl",
    "transition-[box-shadow,border-color] duration-150",
  ].join(" "),
  {
    variants: {
      state: {
        default: "border border-border",
        selected: "border border-focal",
        dotted: "border-2 border-muted-foreground/30 border-dashed",
      },
      status: {
        idle: "",
        running: "border-focal animate-workflow-running motion-reduce:animate-none",
        completed: "border-success",
        failed: "border-destructive",
        queued: "border-muted-foreground/50 border-dashed",
      },
    },
    defaultVariants: { state: "default", status: "idle" },
  },
)

type WorkflowNodeState = NonNullable<VariantProps<typeof workflowNodeVariants>["state"]>
type WorkflowNodeStatus = NonNullable<VariantProps<typeof workflowNodeVariants>["status"]>

// ---------------------------------------------------------------------------
// Status badge — floating pill on the top-right edge of the node
// ---------------------------------------------------------------------------

const statusBadgeVariants = cva(
  [
    "absolute right-3 bottom-full z-10 mb-1.5",
    "inline-flex items-center gap-1 rounded-md border px-2 py-0.5",
    "font-medium text-[11px]",
  ].join(" "),
  {
    variants: {
      status: {
        idle: "",
        running: "border-focal/40 bg-focal-soft text-focal",
        completed: "border-success/40 bg-success/15 text-success",
        failed: "border-destructive/40 bg-destructive/15 text-destructive",
        queued: "border-border bg-muted text-muted-foreground",
      },
    },
    defaultVariants: { status: "idle" },
  },
)

const STATUS_LABELS: Record<WorkflowNodeStatus, string> = {
  idle: "",
  running: "Running",
  completed: "Completed",
  failed: "Failed",
  queued: "Queued",
}

const STATUS_ICONS: Record<WorkflowNodeStatus, ReactNode> = {
  idle: null,
  running: <Loader2 className="size-3 animate-spin" aria-hidden />,
  completed: <CheckCircle2 className="size-3" aria-hidden />,
  failed: <AlertCircle className="size-3" aria-hidden />,
  queued: <Clock className="size-3" aria-hidden />,
}

type WorkflowNodeStatusBadgeProps = {
  status: WorkflowNodeStatus
  label?: string
  icon?: ReactNode
  className?: string
}

function WorkflowNodeStatusBadge({
  status,
  label,
  icon,
  className,
}: WorkflowNodeStatusBadgeProps) {
  if (status === "idle") return null
  return (
    <span
      data-slot="workflow-node-status-badge"
      data-status={status}
      className={cn(statusBadgeVariants({ status }), className)}
    >
      {icon ?? STATUS_ICONS[status]}
      {label ?? STATUS_LABELS[status]}
    </span>
  )
}

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
    /**
     * Floating "kind" badge rendered above the top-left of the node,
     * describing the node's role in the workflow (e.g. "Trigger", "Condition",
     * "Action", "AI"). Pass an icon + label for the Plain-style look.
     */
    kind?: React.ReactNode
    /** Category chip rendered inside the header trailing edge (e.g. "Deals", "Slack", "Webflow") */
    category?: React.ReactNode
    /**
     * Custom label for the floating status badge. Defaults to a capitalised
     * version of the `status` value (e.g. "Completed").
     */
    statusLabel?: string
    /** Custom icon for the status badge. Defaults to a status-appropriate icon. */
    statusIcon?: ReactNode
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
// Sub-components
// ---------------------------------------------------------------------------

function WorkflowNodeHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="workflow-node-header"
      className={cn("flex items-center gap-3 px-4 py-4", className)}
      {...props}
    />
  )
}

function WorkflowNodeTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="workflow-node-title"
      className={cn("min-w-0 flex-1 truncate font-semibold text-sm leading-tight", className)}
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

function WorkflowNodeContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="workflow-node-content"
      className={cn("space-y-2.5 px-4 py-4", className)}
      {...props}
    />
  )
}

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

function WorkflowNodeSeparator({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="workflow-node-separator"
      className={cn("border-border/60 border-t", className)}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// Icon — themed coloured square for the node's leading icon. Lets consumers
// highlight AI/Slack/notification/etc. nodes without repeating class soup.
// ---------------------------------------------------------------------------

const workflowNodeIconVariants = cva(
  "inline-flex size-8 shrink-0 items-center justify-center rounded-lg [&>svg]:size-4",
  {
    variants: {
      tone: {
        default: "bg-muted text-muted-foreground",
        ai: "bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-300",
        slack: "bg-[#4A154B] text-white",
        email: "bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-300",
        success: "bg-success/15 text-success",
        warning: "bg-warning/15 text-warning",
        destructive: "bg-destructive/15 text-destructive",
        primary: "bg-primary text-primary-foreground",
      },
    },
    defaultVariants: { tone: "default" },
  },
)

type WorkflowNodeIconProps = ComponentProps<"span"> &
  VariantProps<typeof workflowNodeIconVariants>

function WorkflowNodeIcon({
  tone,
  className,
  children,
  ...props
}: WorkflowNodeIconProps) {
  return (
    <span
      data-slot="workflow-node-icon"
      className={cn(workflowNodeIconVariants({ tone }), className)}
      {...props}
    >
      {children}
    </span>
  )
}

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
  status,
  statusLabel,
  statusIcon,
  draggable: showDragHandle,
  icon,
  title,
  kind,
  category,
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

  const resolvedStatus: WorkflowNodeStatus = status ?? "idle"
  const hasHeader = icon || title || category || showDragHandle
  const hasContent = !!children
  const hasFooter = footer || collapsible

  return (
    <div
      data-slot="workflow-node"
      data-state={state ?? "default"}
      data-status={resolvedStatus}
      className={cn(workflowNodeVariants({ state, status: resolvedStatus }), className)}
      {...props}
    >
      {kind && (
        <span
          data-slot="workflow-node-kind"
          className="absolute bottom-full left-3 z-10 mb-1.5 inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-0.5 font-medium text-[11px] text-muted-foreground"
        >
          {kind}
        </span>
      )}

      <WorkflowNodeStatusBadge
        status={resolvedStatus}
        label={statusLabel}
        icon={statusIcon}
      />

      {handles?.target && (
        <HandleBoundary>
          <NodeHandle type="target" />
        </HandleBoundary>
      )}

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
          {category && (
            <span
              data-slot="workflow-node-category"
              className="ml-auto inline-flex shrink-0 items-center rounded-md border border-border bg-muted/60 px-1.5 py-0.5 font-medium text-[11px] text-muted-foreground"
            >
              {category}
            </span>
          )}
        </WorkflowNodeHeader>
      )}

      {hasContent && !collapsed && (
        <>
          {hasHeader && <WorkflowNodeSeparator />}
          <WorkflowNodeContent>{children}</WorkflowNodeContent>
        </>
      )}

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
  WorkflowNodeAction,
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
}
export type {
  WorkflowNodeIconProps,
  WorkflowNodeProps,
  WorkflowNodeState,
  WorkflowNodeStatus,
  WorkflowNodeStatusBadgeProps,
}
