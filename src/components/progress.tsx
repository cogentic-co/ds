"use client"

import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import React from "react"

import { cn } from "../lib/utils"

function hasProgressTrack(children: React.ReactNode): boolean {
  let found = false
  React.Children.forEach(children, (child) => {
    if (
      React.isValidElement(child) &&
      (child.type === ProgressTrack ||
        (child.type as { displayName?: string })?.displayName === "ProgressTrack")
    ) {
      found = true
    }
  })
  return found
}

type ProgressProps = ProgressPrimitive.Root.Props & {
  /** Animate the indicator from 0 on mount. Defaults to false. */
  animate?: boolean
}

function Progress({ className, children, value, animate, ...props }: ProgressProps) {
  const hasCustomTrack = hasProgressTrack(children)
  const [mountedValue, setMountedValue] = React.useState(animate ? 0 : value)

  React.useEffect(() => {
    if (animate) {
      const id = requestAnimationFrame(() => setMountedValue(value))
      return () => cancelAnimationFrame(id)
    }
    setMountedValue((prev) => (prev === value ? prev : value))
  }, [animate, value])

  return (
    <ProgressPrimitive.Root
      value={mountedValue}
      data-slot="progress"
      className={cn("flex flex-wrap gap-3", className)}
      {...props}
    >
      {children}
      {!hasCustomTrack && (
        <ProgressTrack>
          <ProgressIndicator
            className={animate ? "transition-all duration-700 ease-out" : undefined}
          />
        </ProgressTrack>
      )}
    </ProgressPrimitive.Root>
  )
}

function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
  return (
    <ProgressPrimitive.Track
      className={cn(
        "relative flex h-1.5 w-full items-center overflow-x-hidden rounded-full bg-muted",
        className,
      )}
      data-slot="progress-track"
      {...props}
    />
  )
}

ProgressTrack.displayName = "ProgressTrack"

function ProgressIndicator({ className, ...props }: ProgressPrimitive.Indicator.Props) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn("h-full bg-primary transition-all", className)}
      {...props}
    />
  )
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      className={cn("font-medium text-sm", className)}
      data-slot="progress-label"
      {...props}
    />
  )
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      className={cn("ml-auto text-muted-foreground text-sm tabular-nums", className)}
      data-slot="progress-value"
      {...props}
    />
  )
}

export { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue }
