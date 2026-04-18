"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { ChevronDown, ChevronUp, GripVertical } from "lucide-react"
import { Check, Clock, Loader, WarningDiamond } from "pixelarticons/react"
import { type ComponentProps, type ReactNode, useState } from "react"
import { cn } from "../lib/utils"

/**
 * Pure visual workflow node card. No xyflow/ReactFlow dependency — use this
 * when you want the node styling outside a Canvas (e.g. marketing pages,
 * dashboards, inline documentation).
 *
 * For the canvas-aware version (with connection handles), import
 * `WorkflowNode` from `@cogentic-co/ds/workflow/workflow-node` instead.
 */

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
        running: "animate-workflow-running border-focal motion-reduce:animate-none",
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
  running: <Loader className="size-3 animate-spin" aria-hidden />,
  completed: <Check className="size-3" aria-hidden />,
  failed: <WarningDiamond className="size-3" aria-hidden />,
  queued: <Clock className="size-3" aria-hidden />,
}

type WorkflowNodeStatusBadgeProps = {
  status: WorkflowNodeStatus
  label?: string
  icon?: ReactNode
  /** Hide the text label; show icon only. Useful for compact node rows. */
  hideStatusLabel?: boolean
  className?: string
}

function WorkflowNodeStatusBadge({
  status,
  label,
  icon,
  hideStatusLabel,
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
      {!hideStatusLabel && (label ?? STATUS_LABELS[status])}
    </span>
  )
}

type WorkflowNodeCardProps = ComponentProps<"div"> &
  VariantProps<typeof workflowNodeVariants> & {
    /** Show the 6-dot drag grip in the header */
    draggable?: boolean
    /** Icon rendered before the title — wrap in a coloured square for the best look */
    icon?: ReactNode
    /** Node title text */
    title?: ReactNode
    /**
     * Floating "kind" badge rendered above the top-left of the node,
     * describing the node's role (e.g. "Trigger", "Condition", "AI").
     */
    kind?: ReactNode
    /** Category chip rendered inside the header trailing edge */
    category?: ReactNode
    /** Custom label for the floating status badge */
    statusLabel?: string
    /** Custom icon for the status badge */
    statusIcon?: ReactNode
    /** Hide the text label on the status badge; show icon only */
    hideStatusLabel?: boolean
    /** Notification badge count rendered on the icon */
    badge?: number | string
    /** Make the body collapsible with an expand/close footer toggle */
    collapsible?: boolean
    /** Start collapsed when collapsible is true */
    defaultCollapsed?: boolean
    /** Custom footer content (ignored when collapsible is true) */
    footer?: ReactNode
    /** Extra content rendered at the top of the node (e.g. xyflow handles) */
    topSlot?: ReactNode
    /** Extra content rendered at the bottom of the node (e.g. xyflow handles) */
    bottomSlot?: ReactNode
  }

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

type WorkflowNodeIconProps = ComponentProps<"span"> & VariantProps<typeof workflowNodeIconVariants>

function WorkflowNodeIcon({ tone, className, children, ...props }: WorkflowNodeIconProps) {
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
  value: ReactNode
  icon?: ReactNode
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

function WorkflowNodeCard({
  state,
  status,
  statusLabel,
  statusIcon,
  hideStatusLabel,
  draggable: showDragHandle,
  icon,
  title,
  kind,
  category,
  badge,
  collapsible,
  defaultCollapsed = false,
  footer,
  topSlot,
  bottomSlot,
  className,
  children,
  ...props
}: WorkflowNodeCardProps) {
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
        hideStatusLabel={hideStatusLabel}
      />

      {topSlot}

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

      {bottomSlot}
    </div>
  )
}

export type {
  WorkflowNodeCardProps,
  WorkflowNodeIconProps,
  WorkflowNodeState,
  WorkflowNodeStatus,
  WorkflowNodeStatusBadgeProps,
}
export {
  WorkflowNodeAction,
  WorkflowNodeCard,
  WorkflowNodeContent,
  WorkflowNodeDescription,
  WorkflowNodeFooter,
  WorkflowNodeHeader,
  WorkflowNodeIcon,
  WorkflowNodeRow,
  WorkflowNodeSeparator,
  WorkflowNodeStatusBadge,
  WorkflowNodeTitle,
  workflowNodeIconVariants,
  workflowNodeVariants,
}
