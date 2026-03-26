"use client"

import { CopyIcon, SettingsIcon, Trash2Icon } from "lucide-react"
import {
  AnimatedEdge,
  DashedEdge,
  DottedEdge,
  SolidEdge,
  TemporaryEdge,
  WorkflowNode,
  WorkflowToolbar,
} from "@/src/workflow"

export const workflowCanvasNodes = [
  {
    id: "1",
    type: "workflowNode",
    position: { x: 100, y: 30 },
    data: { title: "Input", description: "User message" },
  },
  {
    id: "2",
    type: "workflowNode",
    position: { x: 100, y: 230 },
    data: { title: "Process", description: "AI analysis" },
  },
  {
    id: "3",
    type: "workflowNode",
    position: { x: 100, y: 430 },
    data: { title: "Output", description: "Response" },
  },
]

export const workflowCanvasEdges = [
  { id: "e1-2", source: "1", target: "2", type: "solid" },
  { id: "e2-3", source: "2", target: "3", type: "animated" },
]

export function WorkflowNodeRenderer({ data }: { data: { title: string; description: string } }) {
  return (
    <WorkflowNode title={data.title} handles={{ target: true, source: true }}>
      <p className="text-muted-foreground text-xs">{data.description}</p>
    </WorkflowNode>
  )
}

export const nodeTypes = { workflowNode: WorkflowNodeRenderer }

export const allEdgeTypes = {
  solid: SolidEdge,
  dotted: DottedEdge,
  dashed: DashedEdge,
  animated: AnimatedEdge,
  temporary: TemporaryEdge,
}

function ToolbarNodeRenderer({ data }: { data: { title: string; description: string } }) {
  return (
    <WorkflowNode title={data.title} handles={{ target: true, source: true }}>
      <p className="text-muted-foreground text-xs">{data.description}</p>
      <WorkflowToolbar>
        <button
          type="button"
          className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <CopyIcon className="size-3.5" />
        </button>
        <button
          type="button"
          className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <SettingsIcon className="size-3.5" />
        </button>
        <button
          type="button"
          className="rounded p-1 text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
        >
          <Trash2Icon className="size-3.5" />
        </button>
      </WorkflowToolbar>
    </WorkflowNode>
  )
}

export const toolbarNodeTypes = { workflowNode: ToolbarNodeRenderer }
