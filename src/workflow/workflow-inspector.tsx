"use client"

import { ChevronLeftIcon, XIcon } from "lucide-react"
import type * as React from "react"
import { Button } from "../components/button"
import { ScrollArea } from "../components/scroll-area"
import { cn } from "../lib/utils"

type WorkflowInspectorProps = {
  /** Title shown in the header (e.g. the selected node's label). */
  title: React.ReactNode
  /** Icon rendered before the title. */
  icon?: React.ReactNode
  /** Called when the back/close button is clicked. */
  onClose?: () => void
  /**
   * Which close affordance to render in the header.
   * - "back": left-side chevron (default)
   * - "close": right-side X
   * - "none": no close button
   */
  closeVariant?: "back" | "close" | "none"
  /** Optional footer slot (save/discard buttons etc). */
  footer?: React.ReactNode
  children: React.ReactNode
  className?: string
}

function WorkflowInspector({
  title,
  icon,
  onClose,
  closeVariant = "back",
  footer,
  children,
  className,
}: WorkflowInspectorProps) {
  return (
    <aside
      data-slot="workflow-inspector"
      className={cn("flex h-full w-80 shrink-0 flex-col border-border border-l bg-card", className)}
    >
      <div className="flex items-center gap-2 border-border border-b px-3 py-2.5">
        {closeVariant === "back" && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            aria-label="Back"
            className="-ml-1"
          >
            <ChevronLeftIcon />
          </Button>
        )}
        {icon && (
          <span className="flex size-5 items-center justify-center text-muted-foreground">
            {icon}
          </span>
        )}
        <h2 data-slot="workflow-inspector-title" className="flex-1 truncate font-semibold text-sm">
          {title}
        </h2>
        {closeVariant === "close" && (
          <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label="Close">
            <XIcon />
          </Button>
        )}
      </div>
      <ScrollArea className="min-h-0 flex-1">
        <div className="flex flex-col gap-4 p-4">{children}</div>
      </ScrollArea>
      {footer && (
        <div className="flex items-center justify-end gap-2 border-border border-t bg-card px-4 py-3">
          {footer}
        </div>
      )}
    </aside>
  )
}

export type { WorkflowInspectorProps }
export { WorkflowInspector }
