"use client"

import { cn } from "../lib/utils"

interface MarqueeProps {
  children: React.ReactNode
  className?: string
  /** Duration in seconds for one full loop. Default: 40 */
  duration?: number
  /** Scroll direction. Default: "left" */
  direction?: "left" | "right"
  /** Pause on hover. Default: true */
  pauseOnHover?: boolean
  /** Show fade edges. Default: true */
  fadeEdges?: boolean
}

function Marquee({
  children,
  className,
  duration = 40,
  direction = "left",
  pauseOnHover = true,
  fadeEdges = true,
}: MarqueeProps) {
  return (
    <div
      data-slot="marquee"
      className={cn("relative flex items-center overflow-hidden", className)}
    >
      {fadeEdges && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
        </>
      )}
      <div
        className={cn(
          "flex w-max gap-4",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
        style={{ animationDuration: `${duration}s` }}
      >
        {children}
        {children}
      </div>
    </div>
  )
}

export type { MarqueeProps }
export { Marquee }
