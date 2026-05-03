"use client"

import { Zap } from "lucide-react"
import { AnimatePresence, domAnimation, LazyMotion, m } from "motion/react"
import { useEffect, useRef } from "react"

import { useAnimationTimer } from "../hooks/use-animation-timer"

import { cn } from "../lib/utils"

type WebhookEvent = {
  event: string
  status: number
  latency: string
  payload: string
  colour: string
}

const EVENTS: WebhookEvent[] = [
  {
    event: "transfer.screened",
    status: 200,
    latency: "42ms",
    payload: '{ "id": "TXN-0847", "result": "compliant" }',
    colour: "text-emerald-400",
  },
  {
    event: "transfer.flagged",
    status: 200,
    latency: "38ms",
    payload: '{ "id": "TXN-0846", "risk": "high", "reason": "threshold" }',
    colour: "text-amber-400",
  },
  {
    event: "verification.complete",
    status: 200,
    latency: "51ms",
    payload: '{ "transfer": "TXN-0845", "travel_rule": "verified" }',
    colour: "text-cyan",
  },
  {
    event: "report.generated",
    status: 200,
    latency: "67ms",
    payload: '{ "ref": "CR-2024-Q4", "type": "quarterly" }',
    colour: "text-violet-400",
  },
  {
    event: "rule.triggered",
    status: 200,
    latency: "29ms",
    payload: '{ "rule": "CR-007", "transfer": "TXN-0851" }',
    colour: "text-red-400",
  },
]

export default function AnimationWebhooks({ className }: { className?: string }) {
  const [timerRef, tick] = useAnimationTimer(2200)
  const count = Math.min(tick + 1, 6)
  const startIdx = Math.max(0, tick + 1 - count)
  const visible = Array.from({ length: count }, (_, i) => (startIdx + i) % EVENTS.length)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight
    })
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <div ref={timerRef} className={cn("flex flex-col bg-terminal", className)}>
        {/* Header */}
        <div className="flex items-center gap-2 border-white/10 border-b px-4 py-2">
          <Zap className="size-3 text-amber-400" />
          <span className="font-mono text-white/60 text-xxs">Webhook Events</span>
          <span className="ml-auto flex items-center gap-1">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-2xs text-emerald-400">live</span>
          </span>
        </div>

        {/* Events */}
        <div ref={scrollRef} className="scrollbar-none flex-1 overflow-y-auto px-3 py-2">
          <div className="space-y-1.5">
            <AnimatePresence initial={false}>
              {visible.map((evIdx, i) => {
                const ev = EVENTS[evIdx]
                const isLatest = i === visible.length - 1
                return (
                  <m.div
                    key={`${i}-${evIdx}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: isLatest ? 1 : 0.4, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-md border border-white/5 bg-white/5 px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className={cn("font-mono font-semibold text-xxs", ev.colour)}>
                        {ev.event}
                      </span>
                      <span className="ml-auto font-mono text-2xs text-emerald-400">
                        {ev.status}
                      </span>
                      <span className="font-mono text-2xs text-white/30">{ev.latency}</span>
                    </div>
                    {isLatest && (
                      <m.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="mt-1 truncate font-mono text-2xs text-white/40"
                      >
                        {ev.payload}
                      </m.p>
                    )}
                  </m.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </LazyMotion>
  )
}
