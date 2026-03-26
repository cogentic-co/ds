"use client"

import { ClipboardIcon, CopyIcon, ScissorsIcon, Trash2Icon } from "lucide-react"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export default function ContextMenuPreview() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex h-36 w-72 items-center justify-center rounded-md border border-dashed text-muted-foreground text-sm">
          Right click here
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <CopyIcon className="size-4" />
          Copy
        </ContextMenuItem>
        <ContextMenuItem>
          <ScissorsIcon className="size-4" />
          Cut
        </ContextMenuItem>
        <ContextMenuItem>
          <ClipboardIcon className="size-4" />
          Paste
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <Trash2Icon className="size-4" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
