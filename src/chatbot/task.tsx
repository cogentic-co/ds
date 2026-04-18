"use client"

import { Check, ChevronDown, Circle, Loader2 } from "lucide-react"
import { type ComponentProps, createContext, useCallback, useContext, useId, useState } from "react"
import { cn } from "../lib/utils"

type TaskContextValue = {
  open: boolean
  toggle: () => void
  contentId: string
}

const TaskContext = createContext<TaskContextValue | null>(null)

type TaskStatus = "pending" | "running" | "complete" | "error"

const statusIcons: Record<TaskStatus, typeof Check> = {
  pending: Circle,
  running: Loader2,
  complete: Check,
  error: Circle,
}

function Task({
  defaultOpen = false,
  className,
  children,
  ...props
}: ComponentProps<"div"> & { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const toggle = useCallback(() => setOpen((o) => !o), [])
  const contentId = useId()

  return (
    <TaskContext.Provider value={{ open, toggle, contentId }}>
      <div
        data-slot="task"
        data-state={open ? "open" : "closed"}
        className={cn("rounded-xl border border-border bg-card", className)}
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

  const Icon = statusIcons[status]

  return (
    <button
      data-slot="task-trigger"
      type="button"
      onClick={ctx.toggle}
      aria-expanded={ctx.open}
      aria-controls={ctx.contentId}
      className={cn(
        "flex w-full items-center gap-2.5 px-4 py-3 text-sm",
        "text-foreground transition-colors hover:bg-muted/50",
        className,
      )}
      {...props}
    >
      <Icon
        aria-hidden="true"
        className={cn(
          "size-4 shrink-0",
          status === "complete" && "text-emerald-500",
          status === "running" && "animate-spin text-primary",
          status === "error" && "text-red-500",
          status === "pending" && "text-muted-foreground",
        )}
      />
      <span className="flex-1 truncate text-left font-medium">{children}</span>
      <ChevronDown
        aria-hidden="true"
        className={cn(
          "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
          ctx.open && "rotate-180",
        )}
      />
    </button>
  )
}

function TaskContent({ className, ...props }: ComponentProps<"div">) {
  const ctx = useContext(TaskContext)
  if (!ctx?.open) return null

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
    />
  )
}

function TaskItem({
  status = "pending",
  className,
  ...props
}: ComponentProps<"div"> & { status?: TaskStatus }) {
  const Icon = statusIcons[status]

  return (
    <div data-slot="task-item" className={cn("flex items-center gap-2 py-1", className)} {...props}>
      <Icon
        className={cn(
          "size-3.5 shrink-0",
          status === "complete" && "text-emerald-500",
          status === "running" && "animate-spin text-primary",
          status === "error" && "text-red-500",
          status === "pending" && "text-muted-foreground/50",
        )}
      />
      <span
        className={cn("text-sm", status === "complete" && "text-muted-foreground line-through")}
      >
        {props.children}
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
