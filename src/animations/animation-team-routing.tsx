"use client"

import { domAnimation, LazyMotion, m } from "motion/react"

import { useAnimationTimer } from "../hooks/use-animation-timer"

import { EASE_OUT } from "../lib/animation"
import { cn } from "../lib/utils"

type Transfer = {
  txn: string
  corridor: string
  risk: "Low" | "Medium" | "High"
  assignee: { name: string; initials: string; colour: string }
  reason: string
}

const TRANSFERS: Transfer[] = [
  {
    txn: "TXN-0847",
    corridor: "AU \u2192 SG",
    risk: "High",
    assignee: { name: "Sarah Chen", initials: "SC", colour: "bg-violet-100 text-violet-700" },
    reason: "High risk \u2192 Senior analyst",
  },
  {
    txn: "TXN-0848",
    corridor: "DE \u2192 US",
    risk: "Low",
    assignee: {
      name: "Auto-approved",
      initials: "\u2713",
      colour: "bg-emerald-100 text-emerald-700",
    },
    reason: "Low risk \u2192 Auto-approval",
  },
  {
    txn: "TXN-0849",
    corridor: "JP \u2192 AE",
    risk: "Medium",
    assignee: { name: "Marcus Webb", initials: "MW", colour: "bg-blue-100 text-blue-700" },
    reason: "MENA specialist",
  },
  {
    txn: "TXN-0850",
    corridor: "CA \u2192 HK",
    risk: "High",
    assignee: { name: "Li Wei", initials: "LW", colour: "bg-amber-100 text-amber-700" },
    reason: "APAC jurisdiction",
  },
]

const riskColour: Record<string, string> = {
  Low: "bg-emerald-50 text-emerald-700",
  Medium: "bg-amber-50 text-amber-700",
  High: "bg-red-50 text-red-700",
}

export default function AnimationTeamRouting({ className }: { className?: string }) {
  const [timerRef, tick] = useAnimationTimer(2400)
  const count = Math.min(tick + 1, 4)
  const startIdx = Math.max(0, tick + 1 - count)
  const visible = Array.from({ length: count }, (_, i) => (startIdx + i) % TRANSFERS.length)

  return (
    <LazyMotion features={domAnimation}>
      <div ref={timerRef} className={cn("flex flex-col p-5", className)}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-[15px] text-foreground">Team Routing</p>
            <p className="text-[12px] text-gray-400">Automatic assignment</p>
          </div>
          <div className="flex -space-x-1.5">
            {["SC", "MW", "LW"].map((init) => (
              <div
                key={init}
                className="flex size-6 items-center justify-center rounded-full border-2 border-white bg-gray-100 font-bold text-[9px] text-gray-500"
              >
                {init}
              </div>
            ))}
            <div className="flex size-6 items-center justify-center rounded-full border-2 border-white bg-gray-100 font-bold text-[9px] text-gray-400">
              +4
            </div>
          </div>
        </div>

        {/* Routing entries */}
        <div className="mt-4 space-y-2">
          {visible.map((tIdx, i) => {
            const t = TRANSFERS[tIdx]
            const isLatest = i === visible.length - 1
            return (
              <m.div
                key={`${i}-${tIdx}`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: isLatest ? 1 : 0.5, x: 0 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
                className={cn(
                  "flex items-center gap-3 rounded-lg border bg-white px-3 py-2.5",
                  isLatest ? "border-gray-200 shadow-sm" : "border-gray-100",
                )}
              >
                {/* Avatar */}
                <div
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full font-bold text-[11px]",
                    t.assignee.colour,
                  )}
                >
                  {t.assignee.initials}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-mono text-[11px] text-gray-400">{t.txn}</span>
                    <span className="text-[11px] text-gray-400">{t.corridor}</span>
                  </div>
                  <p className="truncate text-[11px] text-gray-500">{t.reason}</p>
                </div>

                {/* Risk badge */}
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2 py-0.5 font-semibold text-[10px]",
                    riskColour[t.risk],
                  )}
                >
                  {t.risk}
                </span>
              </m.div>
            )
          })}
        </div>
      </div>
    </LazyMotion>
  )
}
