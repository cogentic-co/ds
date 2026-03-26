"use client"

import { Canvas, WorkflowMinimap } from "@/src/workflow"
import { allEdgeTypes, toolbarNodeTypes } from "./_workflow-shared"

export default function WorkflowMinimapPreview() {
  const minimapNodes = [
    { id: "m1", type: "workflowNode", position: { x: 0, y: 0 }, data: { title: "Start" } },
    { id: "m2", type: "workflowNode", position: { x: 250, y: 0 }, data: { title: "Process" } },
    { id: "m3", type: "workflowNode", position: { x: 500, y: 0 }, data: { title: "End" } },
    { id: "m4", type: "workflowNode", position: { x: 250, y: 200 }, data: { title: "Branch" } },
  ]
  const minimapEdges = [
    { id: "me1", source: "m1", target: "m2", type: "solid" },
    { id: "me2", source: "m2", target: "m3", type: "solid" },
    { id: "me3", source: "m2", target: "m4", type: "dotted" },
  ]
  return (
    <div className="space-y-3">
      <p className="text-muted-foreground text-sm">
        A themed minimap overlay — drag the viewport indicator or click to navigate.
      </p>
      <div className="h-[400px] w-full rounded-lg border">
        <Canvas
          nodes={minimapNodes}
          edges={minimapEdges}
          nodeTypes={toolbarNodeTypes}
          edgeTypes={allEdgeTypes}
          fitView
          fitViewOptions={{ padding: 0.3 }}
        >
          <WorkflowMinimap />
        </Canvas>
      </div>
    </div>
  )
}
