"use client"

import { Info } from "lucide-react"
import type { ComponentProps } from "react"
import { cn } from "../lib/utils"

function Context({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="context"
      className={cn("space-y-3 rounded-xl border border-border bg-card p-4", className)}
      {...props}
    />
  )
}

function ContextHeader({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="context-header"
      className={cn("flex items-center gap-2 font-medium text-foreground text-sm", className)}
      {...props}
    >
      <Info aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
      {children ?? "Context"}
    </div>
  )
}

function ContextBody({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="context-body" className={cn("space-y-2", className)} {...props} />
}

function ContextUsage({
  label,
  used,
  total,
  className,
  ...props
}: ComponentProps<"div"> & {
  label: string
  used: number
  total: number
}) {
  const percentage = Math.min(100, Math.round((used / total) * 100))
  const isHigh = percentage > 80

  return (
    <div data-slot="context-usage" className={cn("space-y-1.5", className)} {...props}>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span
          className={cn("font-mono tabular-nums", isHigh ? "text-amber-500" : "text-foreground")}
        >
          {used.toLocaleString()} / {total.toLocaleString()}
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={used}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={label}
        className="h-1.5 overflow-hidden rounded-full bg-muted"
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300",
            isHigh ? "bg-amber-500" : "bg-primary",
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export { Context, ContextBody, ContextHeader, ContextUsage }
