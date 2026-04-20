import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircleIcon, InfoIcon, LightbulbIcon, TriangleAlertIcon } from "lucide-react"
import type * as React from "react"
import { cn } from "../lib/utils"

const calloutVariants = cva("flex gap-3 rounded-[var(--radius-md)] border p-4", {
  variants: {
    variant: {
      info: "border-[var(--sky-ink)]/20 bg-sky/40 text-foreground [&>svg]:text-[var(--sky-ink)]",
      warning:
        "border-[var(--highlight-ink)]/25 bg-highlight/40 text-foreground [&>svg]:text-[var(--highlight-ink)]",
      danger:
        "border-[var(--blush-ink)]/25 bg-blush/40 text-foreground [&>svg]:text-[var(--blush-ink)]",
      tip: "border-[var(--mint-ink)]/25 bg-mint/40 text-foreground [&>svg]:text-[var(--mint-ink)]",
    },
  },
  defaultVariants: { variant: "info" },
})

const iconMap = {
  info: InfoIcon,
  warning: TriangleAlertIcon,
  danger: AlertCircleIcon,
  tip: LightbulbIcon,
}

type CalloutProps = React.ComponentProps<"div"> & VariantProps<typeof calloutVariants>

function Callout({ variant = "info", className, children, ...props }: CalloutProps) {
  const Icon = iconMap[variant!]
  return (
    <div data-slot="callout" className={cn(calloutVariants({ variant }), className)} {...props}>
      <Icon className="mt-0.5 size-4 shrink-0" />
      <div className="text-sm [&>p]:leading-relaxed">{children}</div>
    </div>
  )
}

export type { CalloutProps }
export { Callout, calloutVariants }
