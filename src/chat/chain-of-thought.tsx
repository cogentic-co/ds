"use client"

import { ChevronDown, Search } from "lucide-react"
import { type ComponentProps, createContext, useCallback, useContext, useId, useState } from "react"
import { cn } from "../lib/utils"

type ChainOfThoughtContextValue = {
  open: boolean
  toggle: () => void
  contentId: string
}

const ChainOfThoughtContext = createContext<ChainOfThoughtContextValue | null>(null)

function ChainOfThought({
  defaultOpen = false,
  className,
  children,
  ...props
}: ComponentProps<"div"> & { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const toggle = useCallback(() => setOpen((o) => !o), [])
  const contentId = useId()

  return (
    <ChainOfThoughtContext.Provider value={{ open, toggle, contentId }}>
      <div
        data-slot="chain-of-thought"
        data-state={open ? "open" : "closed"}
        className={cn("rounded-xl border border-border bg-card", className)}
        {...props}
      >
        {children}
      </div>
    </ChainOfThoughtContext.Provider>
  )
}

function ChainOfThoughtHeader({ className, children, ...props }: ComponentProps<"button">) {
  const ctx = useContext(ChainOfThoughtContext)
  if (!ctx) throw new Error("ChainOfThoughtHeader must be used within <ChainOfThought>")

  return (
    <button
      data-slot="chain-of-thought-header"
      type="button"
      onClick={ctx.toggle}
      aria-expanded={ctx.open}
      aria-controls={ctx.contentId}
      className={cn(
        "flex w-full items-center gap-2 px-4 py-3 font-medium text-sm",
        "text-muted-foreground transition-colors hover:text-foreground",
        className,
      )}
      {...props}
    >
      <ChevronDown
        aria-hidden="true"
        className={cn(
          "size-4 shrink-0 transition-transform duration-200",
          ctx.open && "rotate-180",
        )}
      />
      {children ?? "Chain of thought"}
    </button>
  )
}

function ChainOfThoughtContent({ className, ...props }: ComponentProps<"div">) {
  const ctx = useContext(ChainOfThoughtContext)
  if (!ctx?.open) return null

  return (
    <div
      id={ctx.contentId}
      data-slot="chain-of-thought-content"
      role="region"
      className={cn("space-y-3 border-border border-t px-4 py-3", className)}
      {...props}
    />
  )
}

function ChainOfThoughtStep({
  step,
  status,
  className,
  children,
  ...props
}: ComponentProps<"div"> & {
  step: number
  status?: "pending" | "active" | "complete"
}) {
  return (
    <div
      data-slot="chain-of-thought-step"
      data-status={status}
      className={cn("flex gap-3", className)}
      {...props}
    >
      <span
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-full font-bold text-xs",
          status === "complete" && "bg-primary text-primary-foreground",
          status === "active" && "bg-primary/20 text-primary ring-2 ring-primary/30",
          (!status || status === "pending") && "bg-muted text-muted-foreground",
        )}
      >
        {step}
      </span>
      <div className="min-w-0 flex-1 text-foreground text-sm">{children}</div>
    </div>
  )
}

function ChainOfThoughtSearchResults({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="chain-of-thought-search-results"
      className={cn("space-y-2 pl-9", className)}
      {...props}
    />
  )
}

function ChainOfThoughtSearchResult({
  title,
  url,
  className,
  ...props
}: ComponentProps<"a"> & { title: string; url: string }) {
  return (
    <a
      data-slot="chain-of-thought-search-result"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center gap-2 rounded-lg p-2 text-sm transition-colors hover:bg-muted/50",
        className,
      )}
      {...props}
    >
      <Search className="size-3.5 shrink-0 text-muted-foreground" />
      <span className="truncate text-foreground">{title}</span>
    </a>
  )
}

export {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtSearchResult,
  ChainOfThoughtSearchResults,
  ChainOfThoughtStep,
}
