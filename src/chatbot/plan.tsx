"use client"

import { ChevronDown, ListChecks } from "lucide-react"
import { type ComponentProps, createContext, useCallback, useContext, useId, useState } from "react"
import { cn } from "../lib/utils"

type PlanContextValue = {
  open: boolean
  toggle: () => void
  contentId: string
}

const PlanContext = createContext<PlanContextValue | null>(null)

function Plan({
  defaultOpen = true,
  className,
  children,
  ...props
}: ComponentProps<"div"> & { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const toggle = useCallback(() => setOpen((o) => !o), [])
  const contentId = useId()

  return (
    <PlanContext.Provider value={{ open, toggle, contentId }}>
      <div
        data-slot="plan"
        data-state={open ? "open" : "closed"}
        className={cn("rounded-xl border border-border bg-card", className)}
        {...props}
      >
        {children}
      </div>
    </PlanContext.Provider>
  )
}

function PlanHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="plan-header"
      className={cn("flex items-center gap-3 px-4 py-3", className)}
      {...props}
    />
  )
}

function PlanTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="plan-title"
      className={cn("flex-1 font-medium text-foreground text-sm", className)}
      {...props}
    />
  )
}

function PlanDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="plan-description"
      className={cn("px-4 pb-3 text-muted-foreground text-xs", className)}
      {...props}
    />
  )
}

function PlanTrigger({ className, ...props }: ComponentProps<"button">) {
  const ctx = useContext(PlanContext)
  if (!ctx) throw new Error("PlanTrigger must be used within <Plan>")

  return (
    <button
      data-slot="plan-trigger"
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
      <ListChecks aria-hidden="true" className="size-4 shrink-0" />
      <span className="flex-1 text-left">{props.children ?? "Execution Plan"}</span>
      <ChevronDown
        aria-hidden="true"
        className={cn(
          "size-4 shrink-0 transition-transform duration-200",
          ctx.open && "rotate-180",
        )}
      />
    </button>
  )
}

function PlanContent({ className, ...props }: ComponentProps<"div">) {
  const ctx = useContext(PlanContext)
  if (!ctx?.open) return null

  return (
    <div
      id={ctx.contentId}
      data-slot="plan-content"
      role="region"
      className={cn("space-y-2 border-border border-t px-4 py-3", className)}
      {...props}
    />
  )
}

function PlanFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="plan-footer"
      className={cn("flex items-center gap-2 border-border border-t px-4 py-2.5", className)}
      {...props}
    />
  )
}

function PlanAction({ className, ...props }: ComponentProps<"button">) {
  return (
    <button
      data-slot="plan-action"
      type="button"
      className={cn(
        "inline-flex items-center rounded-lg px-3 py-1.5 font-medium text-xs",
        "bg-primary text-primary-foreground transition-colors hover:bg-primary/90",
        className,
      )}
      {...props}
    />
  )
}

export {
  Plan,
  PlanHeader,
  PlanTitle,
  PlanDescription,
  PlanTrigger,
  PlanContent,
  PlanFooter,
  PlanAction,
}
