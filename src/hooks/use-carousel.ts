"use client"

import { useCallback, useState } from "react"

export interface UseCarouselOptions {
  initialIndex?: number
  loop?: boolean
}

/**
 * Custom hook for managing carousel/slider state.
 *
 * @param itemCount - Total number of items in the carousel
 * @param options - Configuration options (initialIndex, loop behavior)
 * @returns Object with carousel state and navigation methods
 */
export function useCarouselState(itemCount: number, options: UseCarouselOptions = {}) {
  const { initialIndex = 0, loop = true } = options
  const [activeIndex, setActiveIndex] = useState(initialIndex)

  const goToPrev = useCallback(() => {
    setActiveIndex((current) => {
      if (current === 0) {
        return loop ? itemCount - 1 : 0
      }
      return current - 1
    })
  }, [itemCount, loop])

  const goToNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === itemCount - 1) {
        return loop ? 0 : itemCount - 1
      }
      return current + 1
    })
  }, [itemCount, loop])

  const goToIndex = useCallback(
    (index: number) => {
      if (index >= 0 && index < itemCount) {
        setActiveIndex(index)
      }
    },
    [itemCount],
  )

  return {
    activeIndex,
    setActiveIndex,
    goToPrev,
    goToNext,
    goToIndex,
  }
}
