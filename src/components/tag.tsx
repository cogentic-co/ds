"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { XIcon } from "lucide-react"
import type * as React from "react"
import { cn } from "../lib/utils"

const tagVariants = cva(
  "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-medium text-xs transition-colors",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-foreground hover:bg-muted",
        primary: "border-primary/30 bg-primary/10 text-primary",
        secondary: "border-secondary bg-secondary text-secondary-foreground",
        destructive: "border-destructive/30 bg-destructive/10 text-destructive",
        success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
      },
    },
    defaultVariants: { variant: "default" },
  },
)

type TagProps = React.ComponentProps<"span"> &
  VariantProps<typeof tagVariants> & {
    /** Called when the remove button is clicked. If provided, shows the X button. */
    onRemove?: () => void
  }

function Tag({ className, variant, children, onRemove, ...props }: TagProps) {
  return (
    <span data-slot="tag" className={cn(tagVariants({ variant }), className)} {...props}>
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-0.5 cursor-pointer rounded-sm opacity-70 transition-opacity hover:opacity-100"
          aria-label="Remove"
        >
          <XIcon className="size-3" />
        </button>
      )}
    </span>
  )
}

export type { TagProps }
export { Tag, tagVariants }
