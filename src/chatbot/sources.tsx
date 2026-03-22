"use client"

import { ChevronDown, ExternalLink } from "lucide-react"
import { type ComponentProps, createContext, useCallback, useContext, useId, useState } from "react"
import { cn } from "../lib/utils"

type SourcesContextValue = {
  open: boolean
  toggle: () => void
  contentId: string
}

const SourcesContext = createContext<SourcesContextValue | null>(null)

function Sources({
  defaultOpen = false,
  className,
  children,
  ...props
}: ComponentProps<"div"> & { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const toggle = useCallback(() => setOpen((o) => !o), [])
  const contentId = useId()

  return (
    <SourcesContext.Provider value={{ open, toggle, contentId }}>
      <div
        data-slot="sources"
        data-state={open ? "open" : "closed"}
        className={cn("rounded-xl border border-border bg-card", className)}
        {...props}
      >
        {children}
      </div>
    </SourcesContext.Provider>
  )
}

function SourcesTrigger({ className, children, ...props }: ComponentProps<"button">) {
  const ctx = useContext(SourcesContext)
  if (!ctx) throw new Error("SourcesTrigger must be used within <Sources>")

  return (
    <button
      data-slot="sources-trigger"
      type="button"
      onClick={ctx.toggle}
      aria-expanded={ctx.open}
      aria-controls={ctx.contentId}
      className={cn(
        "flex w-full items-center gap-2 px-4 py-3 font-medium text-muted-foreground text-sm",
        "transition-colors hover:text-foreground",
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
      {children ?? `${ctx.open ? "Hide" : "Show"} sources`}
    </button>
  )
}

function SourcesContent({ className, ...props }: ComponentProps<"div">) {
  const ctx = useContext(SourcesContext)
  if (!ctx) throw new Error("SourcesContent must be used within <Sources>")
  if (!ctx.open) return null

  return (
    <div
      id={ctx.contentId}
      data-slot="sources-content"
      role="region"
      className={cn("space-y-2 border-border border-t px-4 py-3", className)}
      {...props}
    />
  )
}

function Source({
  href,
  title,
  description,
  favicon,
  className,
  ...props
}: ComponentProps<"a"> & {
  title: string
  description?: string
  favicon?: string
}) {
  return (
    <a
      data-slot="source"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-start gap-3 rounded-lg p-3 transition-colors",
        "hover:bg-muted/50",
        className,
      )}
      {...props}
    >
      {favicon && <img src={favicon} alt="" className="mt-0.5 size-4 shrink-0 rounded" />}
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-foreground text-sm">{title}</p>
        {description && (
          <p className="mt-0.5 line-clamp-2 text-muted-foreground text-xs">{description}</p>
        )}
      </div>
      <ExternalLink className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
    </a>
  )
}

export { Sources, SourcesTrigger, SourcesContent, Source }
