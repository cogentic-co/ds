"use client"

import { Canvas, WorkflowHandle } from "@/src/workflow"
import { allEdgeTypes, toolbarNodeTypes } from "./_workflow-shared"

function HandleDemoNode({ data }: { data: { label: string } }) {
  return (
    <div className="relative rounded-xl border-2 border-border bg-card px-6 py-4 font-medium text-sm">
      <WorkflowHandle type="target" />
      {data.label}
      <WorkflowHandle type="source" />
    </div>
  )
}

export default function WorkflowHandlePreview() {
  return (
    <div className="space-y-3">
      <p className="text-muted-foreground text-sm">
        Standalone styled handles that auto-detect position from layout context. Includes an error
        boundary for safe rendering outside ReactFlow.
      </p>
      <div className="h-[300px] w-full rounded-lg border">
        <Canvas
          nodes={[
            {
              id: "h1",
              type: "handleDemo",
              position: { x: 50, y: 80 },
              data: { label: "Source" },
            },
            {
              id: "h2",
              type: "handleDemo",
              position: { x: 350, y: 80 },
              data: { label: "Target" },
            },
          ]}
          edges={[{ id: "he1", source: "h1", target: "h2", type: "solid" }]}
          nodeTypes={{
            ...toolbarNodeTypes,
            handleDemo: HandleDemoNode,
          }}
          edgeTypes={allEdgeTypes}
          fitView
          fitViewOptions={{ padding: 0.5 }}
        />
      </div>
    </div>
  )
}
