"use client"

import { cva } from "class-variance-authority"
import { AlertCircle, Check, ChevronDown, Circle, GripVertical, Loader2 } from "lucide-react"
import {
  type ComponentProps,
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useId,
  useState,
} from "react"
import { cn } from "../lib/utils"

// ---------------------------------------------------------------------------
// Queue section (collapsible group)
// ---------------------------------------------------------------------------

type QueueSectionContextValue = {
  open: boolean
  toggle: () => void
  contentId: string
}

const QueueSectionContext = createContext<QueueSectionContextValue | null>(null)

function QueueSection({
  defaultOpen = true,
  className,
  children,
  ...props
}: ComponentProps<"div"> & { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const toggle = useCallback(() => setOpen((o) => !o), [])
  const contentId = useId()

  return (
    <QueueSectionContext.Provider value={{ open, toggle, contentId }}>
      <div data-slot="queue-section" className={cn("space-y-1", className)} {...props}>
        {children}
      </div>
    </QueueSectionContext.Provider>
  )
}

function QueueSectionTrigger({ className, ...props }: ComponentProps<"button">) {
  const ctx = useContext(QueueSectionContext)
  if (!ctx) throw new Error("QueueSectionTrigger must be used within <QueueSection>")

  return (
    <button
      data-slot="queue-section-trigger"
      type="button"
      onClick={ctx.toggle}
      aria-expanded={ctx.open}
      aria-controls={ctx.contentId}
      className={cn(
        "flex w-full items-center gap-2 px-2 py-1.5 font-medium text-muted-foreground text-xs",
        "rounded-md transition-colors hover:text-foreground",
        className,
      )}
      {...props}
    >
      <ChevronDown
        aria-hidden="true"
        className={cn(
          "size-3.5 shrink-0 transition-transform duration-200",
          ctx.open && "rotate-180",
        )}
      />
      {props.children}
    </button>
  )
}

function QueueSectionLabel({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="queue-section-label"
      className={cn("flex-1 text-left", className)}
      {...props}
    />
  )
}

function QueueList({ className, ...props }: ComponentProps<"div">) {
  const ctx = useContext(QueueSectionContext)
  if (ctx && !ctx.open) return null

  return (
    <div
      id={ctx?.contentId}
      data-slot="queue-list"
      role="list"
      className={cn("space-y-1", className)}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// Queue item (aligned with Step styling — border-circle indicator + icon)
// ---------------------------------------------------------------------------

type QueueItemStatus = "pending" | "active" | "complete" | "error"

const queueItemIndicatorVariants = cva(
  "relative z-10 flex size-5 shrink-0 items-center justify-center rounded-full border-2 font-semibold text-xs",
  {
    variants: {
      status: {
        pending: "border-border bg-card text-muted-foreground",
        active: "border-primary bg-primary text-primary-foreground",
        complete: "border-mint-ink bg-mint-ink text-mint",
        error: "border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: { status: "pending" },
  },
)

const STATUS_ICON: Record<QueueItemStatus, ReactNode> = {
  pending: <Circle className="size-2 fill-current" />,
  active: <Loader2 className="size-3 animate-spin" />,
  complete: <Check className="size-3.5" />,
  error: <AlertCircle className="size-3.5" />,
}

function QueueItem({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="queue-item"
      role="listitem"
      className={cn(
        "group/queue-item flex items-start gap-3 rounded-lg px-3 py-2.5",
        "transition-colors hover:bg-muted/50",
        className,
      )}
      {...props}
    />
  )
}

function QueueItemDragHandle({ className, ...props }: ComponentProps<"button">) {
  return (
    <button
      data-slot="queue-item-drag-handle"
      type="button"
      aria-label="Drag to reorder"
      tabIndex={-1}
      className={cn(
        "flex shrink-0 cursor-grab items-center pt-1 text-muted-foreground/40 transition-colors hover:text-muted-foreground active:cursor-grabbing",
        className,
      )}
      {...props}
    >
      <GripVertical aria-hidden="true" className="size-4" />
    </button>
  )
}

function QueueItemIndicator({
  status = "pending",
  className,
  children,
  ...props
}: ComponentProps<"span"> & { status?: QueueItemStatus }) {
  return (
    <span
      data-slot="queue-item-indicator"
      role="img"
      aria-label={status}
      data-status={status}
      className={cn(queueItemIndicatorVariants({ status }), "mt-0.5", className)}
      {...props}
    >
      {children ?? STATUS_ICON[status]}
    </span>
  )
}

function QueueItemContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div data-slot="queue-item-content" className={cn("min-w-0 flex-1", className)} {...props} />
  )
}

function QueueItemDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="queue-item-description"
      className={cn("mt-0.5 text-muted-foreground text-xs", className)}
      {...props}
    />
  )
}

function QueueItemActions({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="queue-item-actions"
      className={cn("flex shrink-0 items-center gap-1", className)}
      {...props}
    />
  )
}

export type { QueueItemStatus }
export {
  QueueItem,
  QueueItemActions,
  QueueItemContent,
  QueueItemDescription,
  QueueItemDragHandle,
  QueueItemIndicator,
  QueueList,
  QueueSection,
  QueueSectionLabel,
  QueueSectionTrigger,
  queueItemIndicatorVariants,
}
