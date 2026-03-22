"use client"

import { ChevronDown } from "lucide-react"
import { type ComponentProps, createContext, useCallback, useContext, useId, useState } from "react"
import { cn } from "../lib/utils"

type ReasoningContextValue = {
  open: boolean
  toggle: () => void
  contentId: string
}

const ReasoningContext = createContext<ReasoningContextValue | null>(null)

function useReasoning() {
  const ctx = useContext(ReasoningContext)
  if (!ctx) throw new Error("useReasoning must be used within <Reasoning>")
  return ctx
}

function Reasoning({
  defaultOpen = false,
  className,
  children,
  ...props
}: ComponentProps<"div"> & { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const toggle = useCallback(() => setOpen((o) => !o), [])
  const contentId = useId()

  return (
    <ReasoningContext.Provider value={{ open, toggle, contentId }}>
      <div
        data-slot="reasoning"
        data-state={open ? "open" : "closed"}
        className={cn("rounded-xl border border-border bg-card", className)}
        {...props}
      >
        {children}
      </div>
    </ReasoningContext.Provider>
  )
}

function ReasoningTrigger({ className, children, ...props }: ComponentProps<"button">) {
  const { open, toggle, contentId } = useReasoning()

  return (
    <button
      data-slot="reasoning-trigger"
      type="button"
      onClick={toggle}
      aria-expanded={open}
      aria-controls={contentId}
      className={cn(
        "flex w-full items-center gap-2 px-4 py-3 font-medium text-muted-foreground text-sm",
        "transition-colors hover:text-foreground",
        className,
      )}
      {...props}
    >
      <ChevronDown
        aria-hidden="true"
        className={cn("size-4 shrink-0 transition-transform duration-200", open && "rotate-180")}
      />
      {children ?? (open ? "Hide reasoning" : "Show reasoning")}
    </button>
  )
}

function ReasoningContent({ className, ...props }: ComponentProps<"div">) {
  const { open, contentId } = useReasoning()
  if (!open) return null

  return (
    <div
      id={contentId}
      data-slot="reasoning-content"
      role="region"
      className={cn(
        "border-border border-t px-4 py-3",
        "font-mono text-muted-foreground text-sm leading-relaxed",
        className,
      )}
      {...props}
    />
  )
}

export { Reasoning, ReasoningTrigger, ReasoningContent, useReasoning }
