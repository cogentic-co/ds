"use client"

import { SearchIcon } from "lucide-react"
import * as React from "react"
import { Input } from "../components/input"
import { ScrollArea } from "../components/scroll-area"
import { cn } from "../lib/utils"

/** Payload type written to dataTransfer on drag start. */
const WORKFLOW_BLOCK_MIME = "application/x-workflow-block"

type WorkflowBlockDefinition = {
  id: string
  label: string
  category: string
  icon?: React.ReactNode
  description?: string
  /** Arbitrary payload handed back to consumers on drop / click. */
  data?: Record<string, unknown>
}

type WorkflowBlockPaletteProps = {
  blocks: WorkflowBlockDefinition[]
  /** Placeholder for the search input. */
  searchPlaceholder?: string
  /** Fired when a block is activated (click, Enter, or dropped on a target). */
  onBlockSelect?: (block: WorkflowBlockDefinition) => void
  /** Optional header slot above the search input. */
  header?: React.ReactNode
  /** Optional footer slot below the scroll area. */
  footer?: React.ReactNode
  className?: string
}

function groupBlocks(
  blocks: WorkflowBlockDefinition[],
): { category: string; items: WorkflowBlockDefinition[] }[] {
  const map = new Map<string, WorkflowBlockDefinition[]>()
  for (const block of blocks) {
    const list = map.get(block.category)
    if (list) list.push(block)
    else map.set(block.category, [block])
  }
  return Array.from(map, ([category, items]) => ({ category, items }))
}

function matches(block: WorkflowBlockDefinition, query: string): boolean {
  if (!query) return true
  const q = query.toLowerCase()
  return (
    block.label.toLowerCase().includes(q) ||
    block.category.toLowerCase().includes(q) ||
    (block.description?.toLowerCase().includes(q) ?? false)
  )
}

function WorkflowBlockPalette({
  blocks,
  searchPlaceholder = "Search blocks...",
  onBlockSelect,
  header,
  footer,
  className,
}: WorkflowBlockPaletteProps) {
  const [query, setQuery] = React.useState("")

  const filtered = React.useMemo(() => blocks.filter((b) => matches(b, query)), [blocks, query])
  const grouped = React.useMemo(() => groupBlocks(filtered), [filtered])

  const handleDragStart = (
    event: React.DragEvent<HTMLButtonElement>,
    block: WorkflowBlockDefinition,
  ) => {
    // Strip non-serializable fields (icon is a React element).
    const payload = {
      id: block.id,
      label: block.label,
      category: block.category,
      description: block.description,
      data: block.data,
    }
    event.dataTransfer.setData(WORKFLOW_BLOCK_MIME, JSON.stringify(payload))
    event.dataTransfer.setData("text/plain", block.label)
    event.dataTransfer.effectAllowed = "copy"
  }

  return (
    <aside
      data-slot="workflow-block-palette"
      className={cn("flex h-full w-72 shrink-0 flex-col border-border border-l bg-card", className)}
    >
      {header && <div className="border-border border-b p-3">{header}</div>}
      <div className="border-border border-b p-3">
        <div className="relative">
          <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="h-9 pl-8"
            aria-label="Search blocks"
          />
        </div>
      </div>
      <ScrollArea className="min-h-0 flex-1">
        <div className="flex flex-col gap-4 p-3">
          {grouped.length === 0 && (
            <p className="px-2 py-6 text-center text-muted-foreground text-sm">No blocks found</p>
          )}
          {grouped.map((group) => (
            <div key={group.category} className="flex flex-col gap-1">
              <div className="px-2 pb-1 font-medium text-[11px] text-muted-foreground uppercase tracking-wide">
                {group.category}
              </div>
              {group.items.map((block) => (
                <button
                  key={block.id}
                  type="button"
                  draggable
                  onDragStart={(e) => handleDragStart(e, block)}
                  onClick={() => onBlockSelect?.(block)}
                  className={cn(
                    "group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm outline-none transition-colors",
                    "hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-focal/30",
                    "cursor-grab active:cursor-grabbing",
                  )}
                  data-slot="workflow-block-palette-item"
                >
                  {block.icon && (
                    <span className="flex size-5 shrink-0 items-center justify-center text-muted-foreground group-hover:text-foreground">
                      {block.icon}
                    </span>
                  )}
                  <span className="flex-1 truncate">{block.label}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </ScrollArea>
      {footer && <div className="border-border border-t p-3">{footer}</div>}
    </aside>
  )
}

export type { WorkflowBlockDefinition, WorkflowBlockPaletteProps }
export { WORKFLOW_BLOCK_MIME, WorkflowBlockPalette }
