import type * as React from "react"
import { cn } from "../lib/utils"
import { Spinner } from "./spinner"

type LoadingOverlayProps = React.ComponentProps<"div"> & {
  /** Whether the overlay is visible */
  loading: boolean
  /** Optional label */
  label?: string
}

function LoadingOverlay({ loading, label, className, children, ...props }: LoadingOverlayProps) {
  return (
    <div data-slot="loading-overlay" className={cn("relative", className)} {...props}>
      {children}
      {loading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-2 rounded-[inherit] bg-card/80 backdrop-blur-[2px]">
          <Spinner className="size-6" />
          {label && <p className="text-muted-foreground text-sm">{label}</p>}
        </div>
      )}
    </div>
  )
}

export { LoadingOverlay }
export type { LoadingOverlayProps }
