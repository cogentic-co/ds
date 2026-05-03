"use client"

import { Sparkles } from "lucide-react"
import { AnimatePresence, domAnimation, LazyMotion, m } from "motion/react"
import { useEffect, useRef } from "react"

import { useAnimationTimer } from "../hooks/use-animation-timer"

import { EASE_OUT } from "../lib/animation"
import { cn } from "../lib/utils"

type Insight = {
  category: string
  text: string
}

const INSIGHTS: Insight[] = [
  {
    category: "Risk Assessment",
    text: "Counterparty risk assessed as {low} based on VASP registration status and historical transaction patterns.",
  },
  {
    category: "Threshold Analysis",
    text: "Transfer {exceeds SGD 20,000} reporting threshold — enhanced due diligence triggered under MAS Notice PSN01.",
  },
  {
    category: "Travel Rule",
    text: "Beneficiary VASP {verified} against IVMS101 directory — originator and beneficiary data complete.",
  },
  {
    category: "Jurisdiction Mapping",
    text: "Corridor {SG → US} mapped — both counterparties subject to Travel Rule data requirements.",
  },
  {
    category: "Sanctions Screening",
    text: "Screening {cleared} — no matches found across OFAC SDN, EU consolidated, and UN sanctions lists.",
  },
]

function renderHighlightedText(text: string) {
  const parts = text.split(/\{([^}]+)\}/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="rounded-sm bg-cyan/10 px-1 font-medium text-cyan-dark">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

export default function AnimationAIAnalysis({ className }: { className?: string }) {
  const [timerRef, tick] = useAnimationTimer(2800)
  const count = Math.min(tick + 1, 3)
  const startIdx = Math.max(0, tick + 1 - count)
  const visibleCards = Array.from({ length: count }, (_, i) => (startIdx + i) % INSIGHTS.length)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new card appears
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
      <div ref={timerRef} className={cn("flex flex-col overflow-hidden", className)}>
        <div
          ref={scrollRef}
          className="scrollbar-none flex flex-1 flex-col gap-2.5 overflow-y-auto px-4 py-4"
        >
          <AnimatePresence initial={false}>
            {visibleCards.map((insightIdx, i) => {
              const insight = INSIGHTS[insightIdx]
              const isLatest = i === visibleCards.length - 1
              return (
                <m.div
                  key={`${i}-${insightIdx}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: isLatest ? 1 : 0.5, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                  className={cn(
                    "shrink-0 rounded-xl border bg-white p-3.5 transition-shadow duration-300",
                    isLatest ? "border-gray-200 shadow-sm" : "border-gray-100",
                  )}
                >
                  <div className="flex items-center gap-2 font-medium text-gray-400 text-xxs">
                    <Sparkles className={cn("h-3 w-3", isLatest ? "text-cyan" : "text-gray-300")} />
                    {insight.category}
                  </div>
                  <p
                    className={cn(
                      "mt-1.5 text-xs leading-relaxed sm:text-sm-plus",
                      isLatest ? "text-gray-700" : "text-gray-400",
                    )}
                  >
                    {renderHighlightedText(insight.text)}
                  </p>
                </m.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </LazyMotion>
  )
}
