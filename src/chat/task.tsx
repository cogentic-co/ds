"use client"

import { Check, ChevronDown, Circle, XCircle } from "lucide-react"
import {
  type ComponentProps,
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useId,
  useState,
} from "react"
import { Spinner } from "../components/spinner"
import { cn } from "../lib/utils"

type TaskContextValue = {
  open: boolean
  toggle: () => void
  contentId: string
  collapsible: boolean
}

const TaskContext = createContext<TaskContextValue | null>(null)

type TaskStatus = "pending" | "running" | "complete" | "error"

function StatusIcon({ status, className }: { status: TaskStatus; className?: string }) {
  if (status === "running") return <Spinner variant="lines" className={cn("size-4", className)} />
  if (status === "complete") return <Check aria-hidden="true" className={className} />
  if (status === "error") return <XCircle aria-hidden="true" className={className} />
  return <Circle aria-hidden="true" className={className} />
}

const statusIconColor: Record<TaskStatus, string> = {
  pending: "text-muted-foreground",
  running: "text-mint-ink",
  complete: "text-mint-ink",
  error: "text-blush-ink",
}

const triggerToneClass: Record<TaskStatus, string> = {
  pending: "",
  running: "",
  complete: "bg-mint/40 text-mint-ink hover:bg-mint/50",
  error: "bg-blush/40 text-blush-ink hover:bg-blush/50",
}

function Task({
  defaultOpen = false,
  collapsible = true,
  className,
  children,
  ...props
}: ComponentProps<"div"> & {
  defaultOpen?: boolean
  /** When false the trigger doesn't toggle and no chevron is shown. */
  collapsible?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const toggle = useCallback(() => {
    if (collapsible) setOpen((o) => !o)
  }, [collapsible])
  const contentId = useId()

  return (
    <TaskContext.Provider value={{ open, toggle, contentId, collapsible }}>
      <div
        data-slot="task"
        data-state={open ? "open" : "closed"}
        data-collapsible={collapsible || undefined}
        className={cn("w-full overflow-hidden rounded-xl border border-border bg-card", className)}
        {...props}
      >
        {children}
      </div>
    </TaskContext.Provider>
  )
}

function TaskTrigger({
  status = "pending",
  className,
  children,
  ...props
}: ComponentProps<"button"> & { status?: TaskStatus }) {
  const ctx = useContext(TaskContext)
  if (!ctx) throw new Error("TaskTrigger must be used within <Task>")

  const buttonProps = ctx.collapsible
    ? { onClick: ctx.toggle, "aria-expanded": ctx.open, "aria-controls": ctx.contentId }
    : { tabIndex: -1 as const, "aria-disabled": true }

  return (
    <button
      data-slot="task-trigger"
      type="button"
      data-status={status}
      className={cn(
        "flex w-full items-center gap-2.5 px-4 text-sm",
        ctx.collapsible ? "py-3" : "py-2",
        "text-foreground transition-colors",
        ctx.collapsible && "cursor-pointer hover:bg-muted/50",
        triggerToneClass[status],
        !ctx.collapsible && "cursor-default",
        className,
      )}
      {...buttonProps}
      {...props}
    >
      <StatusIcon status={status} className={cn("size-4 shrink-0", statusIconColor[status])} />
      <span className="flex-1 truncate text-left font-medium">{children}</span>
      {ctx.collapsible && (
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
            ctx.open && "rotate-180",
          )}
        />
      )}
    </button>
  )
}

function TaskContent({
  className,
  children,
  ...props
}: ComponentProps<"div"> & { children?: ReactNode }) {
  const ctx = useContext(TaskContext)
  if (!ctx) return null
  if (ctx.collapsible && !ctx.open) return null

  return (
    <div
      id={ctx.contentId}
      data-slot="task-content"
      role="region"
      className={cn(
        "space-y-2 border-border border-t px-4 py-3 text-muted-foreground text-sm",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function TaskItem({
  status = "pending",
  className,
  children,
  ...props
}: ComponentProps<"div"> & { status?: TaskStatus }) {
  return (
    <div data-slot="task-item" className={cn("flex items-center gap-2 py-1", className)} {...props}>
      <StatusIcon
        status={status}
        className={cn(
          "size-3.5 shrink-0",
          status === "complete" && "text-mint-ink",
          status === "running" && "text-mint-ink",
          status === "error" && "text-blush-ink",
          status === "pending" && "text-muted-foreground/60",
        )}
      />
      <span className={cn("text-sm", status === "complete" && "text-muted-foreground")}>
        {children}
      </span>
    </div>
  )
}

function TaskItemFile({
  filename,
  className,
  ...props
}: ComponentProps<"span"> & { filename: string }) {
  return (
    <span
      data-slot="task-item-file"
      className={cn(
        "inline-flex items-center rounded bg-muted px-1.5 py-0.5 font-mono text-xs",
        className,
      )}
      {...props}
    >
      {filename}
    </span>
  )
}

export type { TaskStatus }
export { Task, TaskContent, TaskItem, TaskItemFile, TaskTrigger }
