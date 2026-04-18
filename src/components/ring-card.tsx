import type * as React from "react"

import { cn } from "../lib/utils"

type RingCardProps = React.ComponentProps<"div"> & {
  solid?: boolean
  padding?: "default" | "sm" | "lg"
}

const paddingStyles = {
  sm: "p-4",
  default: "p-5",
  lg: "p-8",
} as const

function RingCard({
  className,
  solid = false,
  padding = "default",
  children,
  ...props
}: RingCardProps) {
  return (
    <div
      data-slot="ring-card"
      className={cn(
        "group/ring-card relative px-4 pt-5",
        "after:pointer-events-none after:absolute after:inset-x-9 after:top-2 after:bottom-0",
        "after:rounded-[var(--radius-lg)] after:bg-[color-mix(in_oklab,var(--card)_75%,transparent)]",
        "after:shadow-[inset_0_0_0_1px_var(--border-illustration)] after:backdrop-blur-md",
        "after:transition-transform after:duration-300 after:ease-[cubic-bezier(.2,.8,.2,1)]",
        "before:pointer-events-none before:absolute before:inset-x-6 before:top-4 before:bottom-0",
        "before:rounded-[var(--radius-lg)] before:bg-[color-mix(in_oklab,var(--card)_75%,transparent)]",
        "before:shadow-[inset_0_0_0_1px_var(--border-illustration)] before:backdrop-blur-md",
        "before:transition-transform before:duration-300 before:ease-[cubic-bezier(.2,.8,.2,1)]",
        "hover:[&>[data-slot=ring-card-inner]]:-translate-y-2.5 hover:[&>[data-slot=ring-card-inner]]:shadow-[var(--shadow-lifted)]",
        "hover:after:-translate-y-[6px] hover:before:-translate-y-[3px]",
        !solid &&
          "[-webkit-mask-image:linear-gradient(to_bottom,black_65%,transparent)] [mask-image:linear-gradient(to_bottom,black_65%,transparent)]",
        className,
      )}
      {...props}
    >
      <div
        data-slot="ring-card-inner"
        className={cn(
          "relative z-10 rounded-[var(--radius-lg)] bg-illustration",
          "shadow-[inset_0_0_0_1px_var(--border-illustration),_0_20px_40px_-24px_rgba(20,14,10,0.08)]",
          "transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)]",
          paddingStyles[padding],
        )}
      >
        {children}
      </div>
    </div>
  )
}

export type { RingCardProps }
export { RingCard }
