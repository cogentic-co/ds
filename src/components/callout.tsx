import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircleIcon, InfoIcon, LightbulbIcon, TriangleAlertIcon } from "lucide-react"
import type * as React from "react"
import { cn } from "../lib/utils"

const calloutVariants = cva("flex gap-3 rounded-lg border p-4", {
  variants: {
    variant: {
      info: "border-blue-500/20 bg-blue-500/5 text-blue-900 dark:text-blue-200 [&>svg]:text-blue-500",
      warning:
        "border-amber-500/20 bg-amber-500/5 text-amber-900 dark:text-amber-200 [&>svg]:text-amber-500",
      danger: "border-red-500/20 bg-red-500/5 text-red-900 dark:text-red-200 [&>svg]:text-red-500",
      tip: "border-emerald-500/20 bg-emerald-500/5 text-emerald-900 dark:text-emerald-200 [&>svg]:text-emerald-500",
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
