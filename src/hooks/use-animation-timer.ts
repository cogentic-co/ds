"use client"

import { useCallback, useEffect, useRef, useState } from "react"

/**
 * Combines an interval timer with IntersectionObserver visibility detection.
 * The timer only runs when the component is visible in the viewport.
 * Returns [ref, tick] where ref should be attached to the container element,
 * and tick is a counter that increments on each interval.
 */
export function useAnimationTimer(intervalMs: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold: 0.1,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const advance = useCallback(() => {
    setTick((t) => t + 1)
  }, [])

  useEffect(() => {
    if (!isVisible) return
    const id = setInterval(advance, intervalMs)
    return () => clearInterval(id)
  }, [isVisible, intervalMs, advance])

  return [ref, tick] as const
}
