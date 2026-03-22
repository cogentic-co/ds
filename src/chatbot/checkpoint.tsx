"use client"

import { Bookmark } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"
import { cn } from "../lib/utils"

function Checkpoint({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="checkpoint"
      className={cn(
        "flex items-center gap-3 rounded-lg border border-border border-dashed bg-muted/30 px-4 py-2.5",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function CheckpointIcon({
  icon,
  className,
  ...props
}: ComponentProps<"span"> & { icon?: ReactNode }) {
  return (
    <span
      data-slot="checkpoint-icon"
      className={cn("shrink-0 text-muted-foreground", className)}
      {...props}
    >
      {icon ?? <Bookmark className="size-4" />}
    </span>
  )
}

function CheckpointTrigger({ className, ...props }: ComponentProps<"button">) {
  return (
    <button
      data-slot="checkpoint-trigger"
      type="button"
      className={cn(
        "flex-1 truncate text-left text-muted-foreground text-sm transition-colors hover:text-foreground",
        className,
      )}
      {...props}
    />
  )
}

export { Checkpoint, CheckpointIcon, CheckpointTrigger }
