"use client"

import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import { cva, type VariantProps } from "class-variance-authority"
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

const progressTrackVariants = cva(
  "relative flex w-full items-center overflow-x-hidden rounded-full",
  {
    variants: {
      size: {
        xs: "h-1",
        sm: "h-1.5",
        default: "h-2",
        lg: "h-3",
        xl: "h-5",
      },
      hatched: {
        true: "bg-card",
        false: "bg-muted",
      },
    },
    defaultVariants: { size: "sm", hatched: false },
  },
)

const progressIndicatorVariants = cva("h-full transition-all", {
  variants: {
    variant: {
      default: "bg-primary",
      warning: "bg-[var(--highlight-ink)]",
      destructive: "bg-destructive",
      success: "bg-[var(--mint-ink)]",
    },
  },
  defaultVariants: { variant: "default" },
})

type ProgressVariant = NonNullable<VariantProps<typeof progressIndicatorVariants>["variant"]>

type ProgressProps = ProgressPrimitive.Root.Props &
  VariantProps<typeof progressTrackVariants> & {
    /** Indicator color tone. */
    variant?: ProgressVariant
    /** Animate the indicator from 0 on mount. Defaults to false. */
    animate?: boolean
  }

function Progress({
  className,
  children,
  value,
  animate,
  size,
  hatched,
  variant,
  ...props
}: ProgressProps) {
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
        <ProgressTrack size={size} hatched={hatched}>
          <ProgressIndicator
            variant={variant}
            className={animate ? "transition-all duration-700 ease-out" : undefined}
          />
        </ProgressTrack>
      )}
    </ProgressPrimitive.Root>
  )
}

const HATCH_BG_STYLE: React.CSSProperties = {
  backgroundImage:
    "repeating-linear-gradient(-45deg, var(--border) 0 1.5px, transparent 1.5px 6px)",
}

type ProgressTrackProps = ProgressPrimitive.Track.Props & VariantProps<typeof progressTrackVariants>

function ProgressTrack({ className, size, hatched, style, ...props }: ProgressTrackProps) {
  return (
    <ProgressPrimitive.Track
      className={cn(progressTrackVariants({ size, hatched }), className)}
      data-slot="progress-track"
      data-hatched={hatched ? "true" : undefined}
      style={hatched ? { ...HATCH_BG_STYLE, ...style } : style}
      {...props}
    />
  )
}

ProgressTrack.displayName = "ProgressTrack"

type ProgressIndicatorProps = ProgressPrimitive.Indicator.Props &
  VariantProps<typeof progressIndicatorVariants>

function ProgressIndicator({ className, variant, ...props }: ProgressIndicatorProps) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      data-variant={variant ?? "default"}
      className={cn(progressIndicatorVariants({ variant }), className)}
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

export type { ProgressIndicatorProps, ProgressProps, ProgressTrackProps, ProgressVariant }
export {
  Progress,
  ProgressIndicator,
  progressIndicatorVariants,
  ProgressLabel,
  ProgressTrack,
  progressTrackVariants,
  ProgressValue,
}
