import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "../lib/utils"

const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-[var(--radius-md)] border px-4 py-3 text-left text-sm has-data-[slot=alert-action]:relative has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 has-data-[slot=alert-action]:pr-18 *:[svg:not([class*='size-'])]:size-4 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-card-foreground",
        info: "border-[var(--sky-ink)]/20 bg-sky/40 text-[var(--sky-ink)] *:data-[slot=alert-description]:text-foreground/80 *:[svg]:text-[var(--sky-ink)]",
        warning:
          "border-[var(--highlight-ink)]/25 bg-highlight/40 text-[var(--highlight-ink)] *:data-[slot=alert-description]:text-foreground/80 *:[svg]:text-[var(--highlight-ink)]",
        success:
          "border-[var(--mint-ink)]/25 bg-mint/40 text-[var(--mint-ink)] *:data-[slot=alert-description]:text-foreground/80 *:[svg]:text-[var(--mint-ink)]",
        destructive:
          "border-[var(--blush-ink)]/25 bg-blush/40 text-[var(--blush-ink)] *:data-[slot=alert-description]:text-foreground/80 *:[svg]:text-[var(--blush-ink)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
        className,
      )}
      {...props}
    />
  )
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-balance text-muted-foreground text-sm md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
        className,
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-2.5 right-3", className)}
      {...props}
    />
  )
}

export { Alert, AlertAction, AlertDescription, AlertTitle }
