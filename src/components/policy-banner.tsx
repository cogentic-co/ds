import { cva, type VariantProps } from "class-variance-authority"
import { XIcon } from "lucide-react"
import * as React from "react"
import { cn } from "../lib/utils"

const policyBannerVariants = cva(
  "relative flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-sm",
  {
    variants: {
      variant: {
        info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100",
        warning:
          "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100",
        critical:
          "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
)

type PolicyBannerProps = React.ComponentProps<"div"> &
  VariantProps<typeof policyBannerVariants> & {
    /** Optional icon displayed before the message */
    icon?: React.ReactNode
    /** Action element (e.g. a Button) displayed after the message */
    action?: React.ReactNode
    /** Whether the banner can be dismissed. Defaults to true. */
    dismissible?: boolean
    /** Callback when dismissed */
    onDismiss?: () => void
  }

function PolicyBanner({
  variant,
  icon,
  action,
  dismissible = true,
  onDismiss,
  children,
  className,
  ...props
}: PolicyBannerProps) {
  const [visible, setVisible] = React.useState(true)

  if (!visible) return null

  function handleDismiss() {
    setVisible(false)
    onDismiss?.()
  }

  return (
    <div
      data-slot="policy-banner"
      role="alert"
      className={cn(policyBannerVariants({ variant }), className)}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <div className="flex-1">{children}</div>
      {action && <span className="shrink-0">{action}</span>}
      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          className="shrink-0 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Dismiss"
        >
          <XIcon className="size-4" />
        </button>
      )}
    </div>
  )
}

export type { PolicyBannerProps }
export { PolicyBanner, policyBannerVariants }
