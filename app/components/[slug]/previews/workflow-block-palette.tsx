"use client"

import { ReactFlowProvider, useReactFlow } from "@xyflow/react"
import {
  BellIcon,
  ClockIcon,
  FlagIcon,
  GitBranchIcon,
  LockIcon,
  MailIcon,
  TagIcon,
  UserPlusIcon,
} from "lucide-react"
import { useCallback, useState } from "react"
import { Canvas } from "@/src/workflow/canvas"
import {
  WORKFLOW_BLOCK_MIME,
  type WorkflowBlockDefinition,
  WorkflowBlockPalette,
} from "@/src/workflow/workflow-block-palette"
import { WorkflowNode } from "@/src/workflow/workflow-node"

const blocks: WorkflowBlockDefinition[] = [
  { id: "if", label: "If/else", category: "Logic", icon: <GitBranchIcon /> },
  { id: "wait", label: "Wait for", category: "Logic", icon: <ClockIcon /> },
  { id: "apply-labels", label: "Apply labels", category: "Action", icon: <TagIcon /> },
  { id: "assign-user", label: "Assign to user", category: "Action", icon: <UserPlusIcon /> },
  { id: "set-priority", label: "Set priority", category: "Action", icon: <FlagIcon /> },
  { id: "send-message", label: "Send message", category: "Action", icon: <MailIcon /> },
  { id: "notify", label: "Notify team", category: "Action", icon: <BellIcon /> },
  { id: "lock", label: "Lock thread", category: "Action", icon: <LockIcon /> },
]

type PaletteNodeData = { label: string; category: string }

function PaletteNodeRenderer({ data }: { data: PaletteNodeData }) {
  return (
    <WorkflowNode title={data.label} handles={{ target: true, source: true }}>
      <p className="text-muted-foreground text-xs">{data.category}</p>
    </WorkflowNode>
  )
}

const nodeTypes = { paletteNode: PaletteNodeRenderer }

function PalettePreviewInner() {
  const [nodes, setNodes] = useState<
    Array<{
      id: string
      type: string
      position: { x: number; y: number }
      data: PaletteNodeData
    }>
  >([])
  const { screenToFlowPosition } = useReactFlow()

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      const json = event.dataTransfer.getData(WORKFLOW_BLOCK_MIME)
      if (!json) return
      const block = JSON.parse(json) as Pick<WorkflowBlockDefinition, "id" | "label" | "category">
      const position = screenToFlowPosition({ x: event.clientX, y: event.clientY })
      setNodes((current) => [
        ...current,
        {
          id: `${block.id}-${current.length}`,
          type: "paletteNode",
          position,
          data: { label: block.label, category: block.category },
        },
      ])
    },
    [screenToFlowPosition],
  )

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "copy"
  }, [])

  return (
    <div className="flex h-[520px] w-full overflow-hidden rounded-lg border border-border">
      <div className="relative flex-1" onDrop={handleDrop} onDragOver={handleDragOver}>
        <Canvas nodes={nodes} nodeTypes={nodeTypes} fitView={nodes.length > 0} />
        {nodes.length === 0 && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-center text-muted-foreground text-sm">
            <p>
              Drag a block from the palette →
              <br />
              drop it anywhere on the canvas
            </p>
          </div>
        )}
      </div>
      <WorkflowBlockPalette
        blocks={blocks}
        onBlockSelect={(block) =>
          setNodes((current) => [
            ...current,
            {
              id: `${block.id}-${current.length}`,
              type: "paletteNode",
              position: { x: 80 + current.length * 24, y: 80 + current.length * 24 },
              data: { label: block.label, category: block.category },
            },
          ])
        }
      />
    </div>
  )
}

export default function WorkflowBlockPalettePreview() {
  return (
    <ReactFlowProvider>
      <PalettePreviewInner />
    </ReactFlowProvider>
  )
}
