"use client"

import type { ComponentProps, ReactNode } from "react"
import { cn } from "../lib/utils"

function Suggestions({ className, ...props }: ComponentProps<"div">) {
  return (
    <div data-slot="suggestions" className={cn("flex flex-wrap gap-2", className)} {...props} />
  )
}

type SuggestionProps = ComponentProps<"button"> & {
  /**
   * If set, occurrences of this string within the children text will be
   * rendered with stronger emphasis (font-medium foreground). Mirrors
   * prompt-kit's `<PromptSuggestion highlight>` API.
   */
  highlight?: string
  /** Optional leading icon. Sized to 1rem and inherits muted-foreground. */
  icon?: ReactNode
}

function Suggestion({ className, children, highlight, icon, ...props }: SuggestionProps) {
  let body: ReactNode = children
  if (highlight && typeof children === "string") {
    const idx = children.toLowerCase().indexOf(highlight.toLowerCase())
    if (idx !== -1) {
      const before = children.slice(0, idx)
      const match = children.slice(idx, idx + highlight.length)
      const after = children.slice(idx + highlight.length)
      body = (
        <>
          {before}
          <span className="font-medium text-foreground">{match}</span>
          {after}
        </>
      )
    }
  }

  return (
    <button
      data-slot="suggestion"
      type="button"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2",
        "text-foreground text-sm transition-colors",
        highlight && "text-muted-foreground",
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "[&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-muted-foreground",
        className,
      )}
      {...props}
    >
      {icon && (
        <span
          data-slot="suggestion-icon"
          className="flex size-4 items-center justify-center text-muted-foreground"
        >
          {icon}
        </span>
      )}
      {body}
    </button>
  )
}

export type { SuggestionProps }
export { Suggestion, Suggestions }
