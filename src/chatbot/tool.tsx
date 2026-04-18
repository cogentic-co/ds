"use client"

import { cva } from "class-variance-authority"
import { ChevronDown, Terminal } from "lucide-react"
import { type ComponentProps, createContext, useCallback, useContext, useId, useState } from "react"
import { cn } from "../lib/utils"

type ToolContextValue = {
  open: boolean
  toggle: () => void
  contentId: string
}

const ToolContext = createContext<ToolContextValue | null>(null)

type ToolStatus = "pending" | "running" | "success" | "error"

const statusBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2 py-0.5 font-medium text-[10px] uppercase tracking-wider",
  {
    variants: {
      status: {
        pending: "bg-muted text-muted-foreground",
        running: "bg-primary/10 text-primary",
        success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        error: "bg-red-500/10 text-red-600 dark:text-red-400",
      },
    },
    defaultVariants: { status: "pending" },
  },
)

function getStatusLabel(status: ToolStatus): string {
  switch (status) {
    case "pending":
      return "Pending"
    case "running":
      return "Running"
    case "success":
      return "Done"
    case "error":
      return "Error"
  }
}

function Tool({
  defaultOpen = false,
  className,
  children,
  ...props
}: ComponentProps<"div"> & { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const toggle = useCallback(() => setOpen((o) => !o), [])
  const contentId = useId()

  return (
    <ToolContext.Provider value={{ open, toggle, contentId }}>
      <div
        data-slot="tool"
        data-state={open ? "open" : "closed"}
        className={cn("rounded-xl border border-border bg-card", className)}
        {...props}
      >
        {children}
      </div>
    </ToolContext.Provider>
  )
}

function ToolHeader({
  name,
  status = "pending",
  icon,
  className,
  ...props
}: ComponentProps<"button"> & {
  name: string
  status?: ToolStatus
  icon?: React.ReactNode
}) {
  const ctx = useContext(ToolContext)
  if (!ctx) throw new Error("ToolHeader must be used within <Tool>")

  return (
    <button
      data-slot="tool-header"
      type="button"
      onClick={ctx.toggle}
      aria-expanded={ctx.open}
      aria-controls={ctx.contentId}
      className={cn(
        "flex w-full items-center gap-2.5 px-4 py-3 text-sm transition-colors hover:bg-muted/50",
        className,
      )}
      {...props}
    >
      {icon ?? <Terminal aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />}
      <span className="flex-1 truncate text-left font-medium font-mono text-foreground">
        {name}
      </span>
      <span className={statusBadgeVariants({ status })}>{getStatusLabel(status)}</span>
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

function ToolContent({ className, ...props }: ComponentProps<"div">) {
  const ctx = useContext(ToolContext)
  if (!ctx?.open) return null

  return (
    <div
      id={ctx.contentId}
      data-slot="tool-content"
      role="region"
      className={cn("border-border border-t", className)}
      {...props}
    />
  )
}

function ToolInput({ className, ...props }: ComponentProps<"div">) {
  return (
    <div data-slot="tool-input" className={cn("space-y-1 px-4 py-3", className)} {...props}>
      <p className="font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
        Input
      </p>
      <pre className="overflow-x-auto rounded-lg bg-muted p-3 font-mono text-xs">
        {props.children}
      </pre>
    </div>
  )
}

function ToolOutput({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="tool-output"
      className={cn("space-y-1 border-border border-t px-4 py-3", className)}
      {...props}
    >
      <p className="font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
        Output
      </p>
      <pre className="overflow-x-auto rounded-lg bg-muted p-3 font-mono text-xs">
        {props.children}
      </pre>
    </div>
  )
}

export type { ToolStatus }
export { getStatusLabel, statusBadgeVariants, Tool, ToolContent, ToolHeader, ToolInput, ToolOutput }
