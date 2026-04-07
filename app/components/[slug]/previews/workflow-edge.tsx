"use client"

import { Canvas } from "@/src/workflow"
import { allEdgeTypes, nodeTypes } from "./_workflow-shared"

export default function WorkflowEdgePreview() {
  const colSpacing = 380
  const edgeNodes = [
    {
      id: "a",
      type: "workflowNode",
      position: { x: 0, y: 0 },
      data: { title: "Start", description: "Trigger" },
    },
    {
      id: "b",
      type: "workflowNode",
      position: { x: 0, y: 250 },
      data: { title: "Solid", description: "Default edge" },
    },
    {
      id: "c",
      type: "workflowNode",
      position: { x: colSpacing, y: 0 },
      data: { title: "Source", description: "Data" },
    },
    {
      id: "d",
      type: "workflowNode",
      position: { x: colSpacing, y: 250 },
      data: { title: "Dotted", description: "Pending" },
    },
    {
      id: "e",
      type: "workflowNode",
      position: { x: colSpacing * 2, y: 0 },
      data: { title: "Input", description: "Queue" },
    },
    {
      id: "f",
      type: "workflowNode",
      position: { x: colSpacing * 2, y: 250 },
      data: { title: "Dashed", description: "Optional" },
    },
    {
      id: "g",
      type: "workflowNode",
      position: { x: colSpacing * 3, y: 0 },
      data: { title: "Agent", description: "AI" },
    },
    {
      id: "h",
      type: "workflowNode",
      position: { x: colSpacing * 3, y: 250 },
      data: { title: "Animated", description: "Active" },
    },
  ]
  const edgeEdges = [
    { id: "e-ab", source: "a", target: "b", type: "solid" },
    { id: "e-cd", source: "c", target: "d", type: "dotted" },
    { id: "e-ef", source: "e", target: "f", type: "dashed" },
    { id: "e-gh", source: "g", target: "h", type: "animated" },
  ]
  return (
    <div className="space-y-4">
      <div className="flex gap-6 text-muted-foreground text-xs">
        <span>
          <strong>Solid</strong> — default connection
        </span>
        <span>
          <strong>Dotted</strong> — pending/optional
        </span>
        <span>
          <strong>Dashed</strong> — conditional
        </span>
        <span>
          <strong>Animated</strong> — active data flow
        </span>
      </div>
      <div className="h-[500px] w-full rounded-lg border">
        <Canvas
          nodes={edgeNodes}
          edges={edgeEdges}
          nodeTypes={nodeTypes}
          edgeTypes={allEdgeTypes}
          fitView
          fitViewOptions={{ padding: 0.3 }}
        />
      </div>
    </div>
  )
}
