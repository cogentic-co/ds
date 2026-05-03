"use client"

import { AlertTriangle, ShieldAlert, ShieldCheck } from "lucide-react"
import { domAnimation, LazyMotion, m } from "motion/react"
import { useEffect, useState } from "react"

import { useCycleIndex } from "../hooks/use-cycle-index"

import { EASE_OUT } from "../lib/animation"
import { cn } from "../lib/utils"

type Scenario = {
  txn: string
  corridor: string
  score: number
  level: "Low" | "Medium" | "High"
  colour: string
  barColour: string
  icon: typeof ShieldCheck
  checks: { label: string; result: string; ok: boolean }[]
}

const SCENARIOS: Scenario[] = [
  {
    txn: "TXN-0847",
    corridor: "AU \u2192 SG",
    score: 18,
    level: "Low",
    colour: "text-emerald-600",
    barColour: "bg-emerald-400",
    icon: ShieldCheck,
    checks: [
      { label: "Sanctions", result: "Clear", ok: true },
      { label: "PEP screening", result: "Clear", ok: true },
      { label: "Travel Rule", result: "Verified", ok: true },
      { label: "Threshold", result: "Below limit", ok: true },
    ],
  },
  {
    txn: "TXN-0846",
    corridor: "HK \u2192 GB",
    score: 72,
    level: "High",
    colour: "text-red-500",
    barColour: "bg-red-400",
    icon: ShieldAlert,
    checks: [
      { label: "Sanctions", result: "Clear", ok: true },
      { label: "PEP screening", result: "1 match", ok: false },
      { label: "Travel Rule", result: "Verified", ok: true },
      { label: "Threshold", result: "Exceeded", ok: false },
    ],
  },
  {
    txn: "TXN-0845",
    corridor: "AE \u2192 NL",
    score: 41,
    level: "Medium",
    colour: "text-amber-500",
    barColour: "bg-amber-400",
    icon: AlertTriangle,
    checks: [
      { label: "Sanctions", result: "Clear", ok: true },
      { label: "PEP screening", result: "Clear", ok: true },
      { label: "Travel Rule", result: "Pending", ok: false },
      { label: "Threshold", result: "Below limit", ok: true },
    ],
  },
]

const CYCLE_MS = 3800

function AnimatedNumber({ value, duration = 1000 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    let start: number | null = null
    let raf: number

    function tick(ts: number) {
      if (start === null) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setDisplay(Math.round(value * eased))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])

  return <>{display}</>
}

export default function AnimationRiskScoring({ className }: { className?: string }) {
  const [containerRef, index] = useCycleIndex(SCENARIOS.length, CYCLE_MS)
  const s = SCENARIOS[index]
  const Icon = s.icon

  return (
    <LazyMotion features={domAnimation}>
      <div ref={containerRef} className={cn("flex flex-col p-5", className)}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-forground text-sm">Risk Analysis</p>
            <p className="text-gray-400 text-xs">Real-time transfer scoring</p>
          </div>
          <m.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-2.5 py-1",
              s.level === "Low"
                ? "bg-emerald-50"
                : s.level === "Medium"
                  ? "bg-amber-50"
                  : "bg-red-50",
            )}
          >
            <Icon className={cn("size-3.5", s.colour)} strokeWidth={2} />
            <span className={cn("font-semibold text-xxs", s.colour)}>{s.level}</span>
          </m.div>
        </div>

        {/* Transfer info */}
        <m.div
          key={`info-${index}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5"
        >
          <div className="flex-1">
            <p className="font-bold font-mono text-gray-400 text-xxs">{s.txn}</p>
            <p className="font-medium text-gray-700 text-xs">{s.corridor}</p>
          </div>
          <div className="text-right">
            <p className="font-bold font-mono text-2xl text-gray-900">
              <AnimatedNumber value={s.score} />
            </p>
            <p className="text-2xs text-gray-400">/100</p>
          </div>
        </m.div>

        {/* Score bar */}
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
          <m.div
            key={`bar-${index}`}
            className={cn("h-full rounded-full", s.barColour)}
            style={{ transformOrigin: "left", width: "100%" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: s.score / 100 }}
            transition={{ duration: 1, ease: EASE_OUT }}
          />
        </div>

        {/* Check results */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {s.checks.map((check, i) => (
            <m.div
              key={`${check.label}-${index}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.1 + i * 0.08 }}
              className="flex items-center justify-between rounded-lg border border-gray-100 bg-white px-3 py-2"
            >
              <span className="font-medium text-gray-600 text-xxs">{check.label}</span>
              <span
                className={cn(
                  "font-semibold text-2xs",
                  check.ok ? "text-emerald-600" : "text-red-500",
                )}
              >
                {check.result}
              </span>
            </m.div>
          ))}
        </div>
      </div>
    </LazyMotion>
  )
}
