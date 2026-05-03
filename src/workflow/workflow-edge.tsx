"use client"

import type { EdgeProps } from "@xyflow/react"
import { BaseEdge, EdgeLabelRenderer, getBezierPath, getSimpleBezierPath } from "@xyflow/react"
import { cn } from "../lib/utils"

// ---------------------------------------------------------------------------
// Edge variant type
// ---------------------------------------------------------------------------

type WorkflowEdgeVariant = "solid" | "dotted" | "animated" | "dashed"

type WorkflowEdgeData = {
  variant?: WorkflowEdgeVariant
  color?: string
  label?: string
  /** Show a directional arrow at the target end */
  arrow?: boolean
  /**
   * Active branch — rendered with a stronger colour and a filled-card label.
   * Used for condition outputs like "Qualified" (active) vs "Not qualified"
   * (inactive/dashed).
   */
  active?: boolean
}

type WorkflowEdgeProps = EdgeProps & { data?: WorkflowEdgeData }

// ---------------------------------------------------------------------------
// Stroke styles per variant
// ---------------------------------------------------------------------------

const variantStyles: Record<WorkflowEdgeVariant, React.CSSProperties> = {
  solid: {},
  dotted: { strokeDasharray: "3, 6", strokeLinecap: "round" },
  dashed: { strokeDasharray: "8, 4" },
  animated: {},
}

// ---------------------------------------------------------------------------
// Shared edge label pill rendered via xyflow's EdgeLabelRenderer
// ---------------------------------------------------------------------------

function EdgeLabelPill({
  label,
  labelX,
  labelY,
  active,
}: {
  label: string
  labelX: number
  labelY: number
  active?: boolean
}) {
  return (
    <EdgeLabelRenderer>
      <div
        data-slot="workflow-edge-label"
        data-active={active || undefined}
        style={{
          position: "absolute",
          transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
          pointerEvents: "all",
        }}
        className={cn(
          "inline-flex items-center rounded-md border px-2 py-0.5",
          "font-medium text-xxs leading-tight",
          active
            ? "border-focal/30 bg-card text-foreground"
            : "border-border bg-muted/80 text-muted-foreground",
        )}
      >
        {label}
      </div>
    </EdgeLabelRenderer>
  )
}

// ---------------------------------------------------------------------------
// SolidEdge — basic bezier with props-based path computation
// ---------------------------------------------------------------------------

function SolidEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
  style,
}: WorkflowEdgeProps) {
  const variant = data?.variant ?? "solid"
  const color = data?.color
  const strokeColor = color ?? "var(--color-muted-foreground)"
  const markerId = `arrow-${id}`
  const resolvedMarkerEnd = data?.arrow ? `url(#${markerId})` : markerEnd

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  })

  return (
    <>
      {data?.arrow && (
        <defs>
          <marker
            id={markerId}
            markerWidth="12"
            markerHeight="12"
            refX="10"
            refY="6"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M2,2 L10,6 L2,10 Z" fill={strokeColor} />
          </marker>
        </defs>
      )}
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={resolvedMarkerEnd}
        className="!stroke-muted-foreground/50"
        style={{
          strokeWidth: 2,
          ...variantStyles[variant],
          ...(color ? { stroke: color } : {}),
          ...style,
        }}
      />
      {data?.label && (
        <EdgeLabelPill label={data.label} labelX={labelX} labelY={labelY} active={data.active} />
      )}
    </>
  )
}

// ---------------------------------------------------------------------------
// DottedEdge — convenience wrapper
// ---------------------------------------------------------------------------

function DottedEdge(props: WorkflowEdgeProps) {
  return <SolidEdge {...props} data={{ ...props.data, variant: "dotted" }} />
}

// ---------------------------------------------------------------------------
// DashedEdge — convenience wrapper
// ---------------------------------------------------------------------------

function DashedEdge(props: WorkflowEdgeProps) {
  return <SolidEdge {...props} data={{ ...props.data, variant: "dashed" }} />
}

// ---------------------------------------------------------------------------
// TemporaryEdge — used while user is dragging a new connection
// ---------------------------------------------------------------------------

function TemporaryEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}: EdgeProps) {
  const [edgePath] = getSimpleBezierPath({
    sourcePosition,
    sourceX,
    sourceY,
    targetPosition,
    targetX,
    targetY,
  })

  return (
    <BaseEdge
      className="!stroke-ring"
      id={id}
      path={edgePath}
      style={{ strokeWidth: 2, strokeDasharray: "5, 5" }}
    />
  )
}

// ---------------------------------------------------------------------------
// AnimatedEdge — path with a travelling dot
// ---------------------------------------------------------------------------

function AnimatedEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  style,
  data,
}: WorkflowEdgeProps) {
  const color = data?.color
  const strokeColor = color ?? "var(--color-primary)"
  const markerId = `arrow-${id}`
  const resolvedMarkerEnd = data?.arrow ? `url(#${markerId})` : markerEnd

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  })

  return (
    <>
      {data?.arrow && (
        <defs>
          <marker
            id={markerId}
            markerWidth="12"
            markerHeight="12"
            refX="10"
            refY="6"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M2,2 L10,6 L2,10 Z" fill={strokeColor} />
          </marker>
        </defs>
      )}
      <BaseEdge
        id={id}
        markerEnd={resolvedMarkerEnd}
        path={edgePath}
        className="!stroke-primary/40"
        style={{ strokeWidth: 2, ...(color ? { stroke: color } : {}), ...style }}
      />
      <circle fill={strokeColor} r="4">
        <animateMotion dur="2s" path={edgePath} repeatCount="indefinite" />
      </circle>
      {data?.label && (
        <EdgeLabelPill label={data.label} labelX={labelX} labelY={labelY} active={data.active} />
      )}
    </>
  )
}

// ---------------------------------------------------------------------------
// Convenience namespace + exports
// ---------------------------------------------------------------------------

const WorkflowEdge = {
  Solid: SolidEdge,
  Dotted: DottedEdge,
  Dashed: DashedEdge,
  Animated: AnimatedEdge,
  Temporary: TemporaryEdge,
}

export type { WorkflowEdgeData, WorkflowEdgeProps, WorkflowEdgeVariant }
export { AnimatedEdge, DashedEdge, DottedEdge, SolidEdge, TemporaryEdge, WorkflowEdge }
