"use client"

import { Canvas } from "@/src/workflow"
import { allEdgeTypes, toolbarNodeTypes } from "./_workflow-shared"

export default function WorkflowToolbarPreview() {
  const toolbarNodes = [
    {
      id: "t1",
      type: "workflowNode",
      position: { x: 100, y: 60 },
      data: { title: "Selected Node", description: "Click this node to see the toolbar" },
      selected: true,
    },
  ]
  return (
    <div className="space-y-3">
      <p className="text-muted-foreground text-sm">
        The toolbar appears below a selected node. Click a node to see it.
      </p>
      <div className="h-[300px] w-full rounded-lg border">
        <Canvas
          nodes={toolbarNodes}
          edges={[]}
          nodeTypes={toolbarNodeTypes}
          edgeTypes={allEdgeTypes}
          fitView
          fitViewOptions={{ padding: 0.5 }}
        />
      </div>
    </div>
  )
}
