"use client"

import { useEffect, useState } from "react"

interface AnimatedCounterProps {
  /** Target value to animate to */
  value: number
  /** Animation duration in milliseconds. Default: 1000 */
  duration?: number
  /** Optional prefix (e.g. "$") */
  prefix?: string
  /** Optional suffix (e.g. "%") */
  suffix?: string
  /** Number of decimal places. Default: 0 */
  decimals?: number
  className?: string
}

function AnimatedCounter({
  value,
  duration = 1000,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: AnimatedCounterProps) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    let start: number | null = null
    let raf: number

    function tick(ts: number) {
      if (start === null) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      // Cubic ease-out
      const eased = 1 - (1 - progress) ** 3
      setDisplay(value * eased)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])

  return (
    <span data-slot="animated-counter" className={className}>
      {prefix}
      {decimals > 0 ? display.toFixed(decimals) : Math.round(display)}
      {suffix}
    </span>
  )
}

export type { AnimatedCounterProps }
export { AnimatedCounter }
