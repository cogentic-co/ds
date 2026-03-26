"use client"

import { addEdge, type Connection, type Edge } from "@xyflow/react"
import { useCallback, useState } from "react"
import { cn } from "@/src/lib/utils"
import {
  Canvas,
  WorkflowConnection,
  WorkflowConnectionAnimated,
  WorkflowConnectionDashed,
  WorkflowConnectionDotted,
} from "@/src/workflow"
import { allEdgeTypes, nodeTypes } from "./_workflow-shared"

const connectionVariants = {
  default: WorkflowConnection,
  dotted: WorkflowConnectionDotted,
  dashed: WorkflowConnectionDashed,
  animated: WorkflowConnectionAnimated,
} as const

const variantToEdgeType: Record<keyof typeof connectionVariants, string> = {
  default: "solid",
  dotted: "dotted",
  dashed: "dashed",
  animated: "animated",
}

export default function WorkflowConnectionPreview() {
  const [variant, setVariant] = useState<keyof typeof connectionVariants>("default")
  const [edges, setEdges] = useState<Edge[]>([])

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((prev) => addEdge({ ...connection, type: variantToEdgeType[variant] }, prev))
    },
    [variant],
  )

  const connNodes = [
    {
      id: "c1",
      type: "workflowNode",
      position: { x: 100, y: 30 },
      data: { title: "Source Node", description: "Drag from the bottom handle ↓" },
    },
    {
      id: "c2",
      type: "workflowNode",
      position: { x: 100, y: 300 },
      data: { title: "Target Node", description: "Drop on the top handle ↑" },
    },
  ]

  return (
    <div className="space-y-3">
      <p className="text-muted-foreground text-sm">
        Select a variant, then drag from the bottom handle to the top handle. Both the drag line and
        the resulting edge use the selected style.
      </p>
      <div className="flex gap-2">
        {(Object.keys(connectionVariants) as (keyof typeof connectionVariants)[]).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setVariant(v)}
            className={cn(
              "rounded-md border px-3 py-1.5 font-medium text-xs transition-colors",
              variant === v
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:bg-muted",
            )}
          >
            {v}
          </button>
        ))}
        {edges.length > 0 && (
          <button
            type="button"
            onClick={() => setEdges([])}
            className="rounded-md border border-border px-3 py-1.5 font-medium text-muted-foreground text-xs transition-colors hover:bg-muted"
          >
            Clear edges
          </button>
        )}
      </div>
      <div className="h-[500px] w-full rounded-lg border">
        <Canvas
          key={variant}
          nodes={connNodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={allEdgeTypes}
          onConnect={onConnect}
          connectionLineComponent={connectionVariants[variant]}
          fitView
          fitViewOptions={{ padding: 0.3 }}
        />
      </div>
    </div>
  )
}
