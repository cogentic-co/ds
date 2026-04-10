"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { AlertTriangle, Info, ShieldAlert, XIcon } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"
import { cn } from "../lib/utils"

const alertBannerVariants = cva(
  "flex items-start gap-3 rounded-xl border p-4 text-sm",
  {
    variants: {
      severity: {
        info: "border-focal/30 bg-focal-soft/50 text-foreground",
        warning: "border-warning/30 bg-warning/10 text-foreground",
        critical: "border-destructive/30 bg-destructive/10 text-foreground",
      },
    },
    defaultVariants: { severity: "info" },
  },
)

const SEVERITY_ICONS: Record<string, ReactNode> = {
  info: <Info className="size-4 text-focal" />,
  warning: <AlertTriangle className="size-4 text-warning-foreground" />,
  critical: <ShieldAlert className="size-4 text-destructive" />,
}

type AlertBannerProps = ComponentProps<"div"> &
  VariantProps<typeof alertBannerVariants> & {
    severity: "info" | "warning" | "critical"
    title: string
    description?: ReactNode
    icon?: ReactNode
    /** Called when the user dismisses the banner */
    onDismiss?: () => void
    /** Actions slot (e.g. "Review now" button) */
    actions?: ReactNode
  }

function AlertBanner({
  severity,
  title,
  description,
  icon,
  onDismiss,
  actions,
  className,
  ...props
}: AlertBannerProps) {
  return (
    <div
      data-slot="alert-banner"
      data-severity={severity}
      className={cn(alertBannerVariants({ severity }), className)}
      {...props}
    >
      <span className="mt-0.5 shrink-0">{icon ?? SEVERITY_ICONS[severity]}</span>
      <div className="min-w-0 flex-1">
        <div className="font-semibold">{title}</div>
        {description && (
          <div className="mt-0.5 text-muted-foreground text-sm">{description}</div>
        )}
        {actions && <div className="mt-2 flex items-center gap-2">{actions}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Dismiss"
        >
          <XIcon className="size-4" />
        </button>
      )}
    </div>
  )
}

export { AlertBanner, alertBannerVariants }
export type { AlertBannerProps }
