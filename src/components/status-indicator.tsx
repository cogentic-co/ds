import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/utils"

const statusIndicatorVariants = cva("relative inline-flex shrink-0 rounded-full", {
  variants: {
    variant: {
      online: "bg-emerald-500",
      offline: "bg-muted-foreground/40",
      busy: "bg-destructive",
      away: "bg-amber-500",
      pending: "bg-blue-500",
    },
    size: {
      sm: "size-2",
      default: "size-2.5",
      lg: "size-3.5",
    },
    pulse: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    { pulse: true, variant: "online", className: "animate-pulse" },
    { pulse: true, variant: "busy", className: "animate-pulse" },
    { pulse: true, variant: "pending", className: "animate-pulse" },
  ],
  defaultVariants: {
    variant: "online",
    size: "default",
    pulse: false,
  },
})

type StatusIndicatorProps = React.ComponentProps<"span"> &
  VariantProps<typeof statusIndicatorVariants> & {
    /** Accessible label describing the status */
    label?: string
  }

function StatusIndicator({
  variant,
  size,
  pulse,
  label,
  className,
  ...props
}: StatusIndicatorProps) {
  const defaultLabels: Record<string, string> = {
    online: "Online",
    offline: "Offline",
    busy: "Busy",
    away: "Away",
    pending: "Pending",
  }

  return (
    <span
      data-slot="status-indicator"
      role="status"
      aria-label={label ?? defaultLabels[variant ?? "online"]}
      className={cn(statusIndicatorVariants({ variant, size, pulse }), className)}
      {...props}
    />
  )
}

export { StatusIndicator, statusIndicatorVariants }
export type { StatusIndicatorProps }
