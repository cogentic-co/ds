"use client"

import { Canvas } from "@/src/workflow"
import { type ControlDefs, ControlsPanel, useControls } from "./_shared"
import {
  allEdgeTypes,
  nodeTypes,
  workflowCanvasEdges,
  workflowCanvasNodes,
} from "./_workflow-shared"

const canvasControlDefs = {
  layout: { type: "radio", options: ["vertical", "horizontal"], defaultValue: "vertical" },
  panOnDrag: { type: "boolean", defaultValue: false, label: "panOnDrag" },
  zoomOnDoubleClick: { type: "boolean", defaultValue: false, label: "zoomOnDoubleClick" },
} satisfies ControlDefs

export default function WorkflowCanvasPreview() {
  const controls = useControls(canvasControlDefs)
  const isHoriz = controls.values.layout === "horizontal"
  const nodes = isHoriz
    ? [
        {
          id: "1",
          type: "workflowNode",
          position: { x: 0, y: 100 },
          data: { title: "Input", description: "Source data" },
        },
        {
          id: "2",
          type: "workflowNode",
          position: { x: 350, y: 100 },
          data: { title: "Process", description: "AI analysis" },
        },
        {
          id: "3",
          type: "workflowNode",
          position: { x: 700, y: 100 },
          data: { title: "Output", description: "Response" },
        },
      ]
    : workflowCanvasNodes
  return (
    <div className="space-y-4">
      <ControlsPanel controls={controls} />
      <div className="h-[600px] w-full rounded-lg border">
        <Canvas
          nodes={nodes}
          edges={workflowCanvasEdges}
          nodeTypes={nodeTypes}
          edgeTypes={allEdgeTypes}
          layout={controls.values.layout as "vertical" | "horizontal"}
          panOnDrag={controls.values.panOnDrag}
          zoomOnDoubleClick={controls.values.zoomOnDoubleClick}
          fitView
        />
      </div>
    </div>
  )
}
