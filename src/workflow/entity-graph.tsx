"use client"

import type { Edge, Node, NodeProps } from "@xyflow/react"
import { MarkerType } from "@xyflow/react"
import { Building2, Wallet } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"
import { cn } from "../lib/utils"
import { Canvas } from "./canvas"
import { WorkflowNodeCard } from "./workflow-node-card"

/**
 * EntityGraph — a canvas pre-configured for showing wallet / VASP relationship
 * graphs for compliance cluster analysis. Nodes represent entities (VASPs or
 * unhosted wallets); edges represent transactions or relationships between
 * them.
 *
 * Wraps Canvas + WorkflowNodeCard with entity-specific defaults.
 */

type EntityType = "vasp" | "unhosted" | "unknown"

type EntityNodeData = {
  label: string
  type: EntityType
  /** Risk score 0-100 */
  riskScore?: number
  /** Jurisdiction code (e.g. "SG", "US") */
  jurisdiction?: string
  /** Extra description / sub-label */
  description?: string
}

type EntityEdgeData = {
  /** Edge label (e.g. "2.5 ETH", "15 txns") */
  label?: string
  /** Whether this edge represents the highlighted / active path */
  active?: boolean
}

type EntityGraphProps = ComponentProps<"div"> & {
  nodes: Node<EntityNodeData>[]
  edges: Edge<EntityEdgeData>[]
  onNodeClick?: (nodeId: string) => void
}

function EntityNodeView({ data }: NodeProps<Node<EntityNodeData>>) {
  const icon =
    data.type === "vasp" ? <Building2 /> : data.type === "unhosted" ? <Wallet /> : null
  return (
    <WorkflowNodeCard
      title={data.label}
      category={data.type === "vasp" ? "VASP" : data.type === "unhosted" ? "Wallet" : "Unknown"}
      icon={icon && <span className="inline-flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground [&>svg]:size-4">{icon}</span>}
    >
      {data.description && (
        <p className="text-muted-foreground text-xs">{data.description}</p>
      )}
      {(data.riskScore != null || data.jurisdiction) && (
        <div className="flex items-center gap-2 text-xs">
          {data.jurisdiction && (
            <span className="rounded border border-border bg-muted/60 px-1.5 py-0.5 font-mono text-[10px]">
              {data.jurisdiction}
            </span>
          )}
          {data.riskScore != null && (
            <span
              className={cn(
                "font-mono font-semibold tabular-nums",
                data.riskScore >= 70
                  ? "text-red-700 dark:text-red-400"
                  : data.riskScore >= 40
                    ? "text-amber-700 dark:text-amber-400"
                    : "text-emerald-700 dark:text-emerald-400",
              )}
            >
              {data.riskScore}
            </span>
          )}
        </div>
      )}
    </WorkflowNodeCard>
  )
}

const nodeTypes = { entity: EntityNodeView }

function EntityGraph({
  nodes,
  edges,
  onNodeClick,
  className,
  ...props
}: EntityGraphProps) {
  const decoratedEdges = edges.map<Edge>((e) => ({
    ...e,
    label: e.data?.label,
    animated: e.data?.active ?? false,
    style: e.data?.active
      ? { stroke: "var(--color-focal)", strokeWidth: 2 }
      : { stroke: "var(--color-muted-foreground)", strokeOpacity: 0.5, strokeWidth: 1 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: e.data?.active ? "var(--color-focal)" : "var(--color-muted-foreground)",
    },
  }))

  return (
    <div data-slot="entity-graph" className={cn("h-[600px] w-full", className)} {...props}>
      <Canvas
        nodes={nodes.map((n) => ({ ...n, type: "entity" }))}
        edges={decoratedEdges}
        nodeTypes={nodeTypes}
        fitView
        onNodeClick={(_, node) => onNodeClick?.(node.id)}
      />
    </div>
  )
}

export { EntityGraph }
export type { EntityEdgeData, EntityGraphProps, EntityNodeData, EntityType }
