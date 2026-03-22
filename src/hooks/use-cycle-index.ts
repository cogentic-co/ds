"use client"

import { useAnimationTimer } from "./use-animation-timer"

/**
 * Returns a cycling index (0 → length−1) that advances on a visibility-gated interval.
 * Built on top of useAnimationTimer — the timer only ticks while the element is visible.
 *
 * @param length Number of items to cycle through
 * @param intervalMs Milliseconds between each advance
 * @returns [ref, currentIndex] — attach ref to the container element
 */
export function useCycleIndex(length: number, intervalMs: number) {
  const [ref, tick] = useAnimationTimer(intervalMs)
  return [ref, tick % length] as const
}
