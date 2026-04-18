"use client"

import { AnimatePresence, domAnimation, LazyMotion, m } from "motion/react"
import { useEffect, useRef } from "react"

import { useAnimationTimer } from "../hooks/use-animation-timer"
import { cn } from "../lib/utils"

const EASE_OUT: [number, number, number, number] = [0.22, 0.61, 0.36, 1]

interface StreamingCardsProps {
  /** Array of card content to cycle through */
  children: React.ReactNode[]
  /** Number of cards visible at once. Default: 3 */
  maxVisible?: number
  /** Milliseconds between each new card. Default: 2800 */
  interval?: number
  /** Whether older cards fade to lower opacity. Default: true */
  fadeOlder?: boolean
  className?: string
}

function StreamingCards({
  children,
  maxVisible = 3,
  interval = 2800,
  fadeOlder = true,
  className,
}: StreamingCardsProps) {
  const [timerRef, tick] = useAnimationTimer(interval)
  const count = Math.min(tick + 1, maxVisible)
  const startIdx = Math.max(0, tick + 1 - count)
  const visibleIndices = Array.from({ length: count }, (_, i) => (startIdx + i) % children.length)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <div
        ref={timerRef}
        data-slot="streaming-cards"
        className={cn("flex flex-col overflow-hidden", className)}
      >
        <div
          ref={scrollRef}
          className="scrollbar-none flex flex-1 flex-col gap-2.5 overflow-y-auto"
        >
          <AnimatePresence initial={false}>
            {visibleIndices.map((childIdx, i) => {
              const isLatest = i === visibleIndices.length - 1
              return (
                <m.div
                  key={`${i}-${childIdx}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{
                    opacity: fadeOlder ? (isLatest ? 1 : 0.5) : 1,
                    y: 0,
                  }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                >
                  {children[childIdx]}
                </m.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </LazyMotion>
  )
}

export type { StreamingCardsProps }
export { StreamingCards }
