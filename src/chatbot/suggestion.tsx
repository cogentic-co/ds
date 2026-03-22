"use client"

import type { ComponentProps } from "react"
import { cn } from "../lib/utils"

function Suggestions({ className, ...props }: ComponentProps<"div">) {
  return (
    <div data-slot="suggestions" className={cn("flex flex-wrap gap-2", className)} {...props} />
  )
}

function Suggestion({ className, ...props }: ComponentProps<"button">) {
  return (
    <button
      data-slot="suggestion"
      type="button"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2",
        "text-foreground text-sm transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    />
  )
}

export { Suggestions, Suggestion }
