"use client"

import { Canvas, WorkflowControls } from "@/src/workflow"
import {
  allEdgeTypes,
  nodeTypes,
  workflowCanvasEdges,
  workflowCanvasNodes,
} from "./_workflow-shared"

export default function WorkflowControlsPreview() {
  return (
    <div className="h-[600px] w-full rounded-lg border">
      <Canvas
        nodes={workflowCanvasNodes}
        edges={workflowCanvasEdges}
        nodeTypes={nodeTypes}
        edgeTypes={allEdgeTypes}
        fitView
      >
        <WorkflowControls />
      </Canvas>
    </div>
  )
}
