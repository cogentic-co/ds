"use client"

import { PlusIcon, SettingsIcon } from "lucide-react"
import { Canvas, WorkflowPanel } from "@/src/workflow"
import {
  allEdgeTypes,
  nodeTypes,
  workflowCanvasEdges,
  workflowCanvasNodes,
} from "./_workflow-shared"

export default function WorkflowPanelPreview() {
  return (
    <div className="h-[600px] w-full rounded-lg border">
      <Canvas
        nodes={workflowCanvasNodes}
        edges={workflowCanvasEdges}
        nodeTypes={nodeTypes}
        edgeTypes={allEdgeTypes}
        fitView
      >
        <WorkflowPanel position="top-left">
          <div className="w-48 space-y-2 p-2">
            <p className="font-semibold text-foreground text-xs">Workflow Info</p>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Nodes</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Edges</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Status</span>
                <span className="inline-flex items-center gap-1 font-medium text-emerald-600">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Active
                </span>
              </div>
            </div>
          </div>
        </WorkflowPanel>
        <WorkflowPanel position="top-right">
          <div className="flex items-center gap-1 p-1">
            <button
              type="button"
              className="rounded px-2 py-1 text-muted-foreground text-xs transition-colors hover:bg-muted"
            >
              <PlusIcon className="size-3.5" />
            </button>
            <button
              type="button"
              className="rounded px-2 py-1 text-muted-foreground text-xs transition-colors hover:bg-muted"
            >
              <SettingsIcon className="size-3.5" />
            </button>
          </div>
        </WorkflowPanel>
      </Canvas>
    </div>
  )
}
