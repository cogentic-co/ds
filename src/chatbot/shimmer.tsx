"use client"

import type { ComponentProps, ElementType } from "react"
import { cn } from "../lib/utils"

type ShimmerProps<T extends ElementType = "p"> = Omit<ComponentProps<"p">, "as"> & {
  /** The HTML element to render as */
  as?: T
  /** Animation duration in seconds */
  duration?: number
  /** Size of the shimmer gradient spread (0-1) */
  spread?: number
}

function Shimmer<T extends ElementType = "p">({
  as,
  className,
  duration = 2,
  spread = 0.3,
  style,
  ...props
}: ShimmerProps<T>) {
  const Component = (as || "p") as ElementType

  return (
    <Component
      data-slot="shimmer"
      role="status"
      aria-label="Loading"
      className={cn(
        "animate-shimmer bg-clip-text text-transparent",
        "bg-[length:200%_100%]",
        "bg-gradient-to-r from-muted-foreground via-foreground to-muted-foreground",
        className,
      )}
      style={{
        animationDuration: `${duration}s`,
        ...style,
      }}
      {...props}
    />
  )
}

export type { ShimmerProps }
export { Shimmer }
