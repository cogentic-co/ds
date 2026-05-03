"use client"

import { Activity, AlertTriangle, ShieldCheck } from "lucide-react"
import { domAnimation, LazyMotion, m } from "motion/react"

import { useCycleIndex } from "../hooks/use-cycle-index"

import { EASE_OUT } from "../lib/animation"
import { cn } from "../lib/utils"

type Scenario = {
  transfers: { value: string; change: string; up: boolean }
  compliant: { value: string; change: string; up: boolean }
  flagged: { value: string; change: string; up: boolean }
  bars: number[]
  activeBar: number
}

const SCENARIOS: Scenario[] = [
  {
    transfers: { value: "1,247", change: "12.3%", up: true },
    compliant: { value: "1,238", change: "14.1%", up: true },
    flagged: { value: "9", change: "8.2%", up: false },
    bars: [30, 55, 70, 100, 45, 25, 60],
    activeBar: 3,
  },
  {
    transfers: { value: "892", change: "6.7%", up: true },
    compliant: { value: "874", change: "5.2%", up: true },
    flagged: { value: "18", change: "22.4%", up: true },
    bars: [45, 35, 60, 50, 80, 100, 40],
    activeBar: 5,
  },
  {
    transfers: { value: "2,103", change: "18.9%", up: true },
    compliant: { value: "2,091", change: "19.3%", up: true },
    flagged: { value: "12", change: "4.1%", up: false },
    bars: [60, 75, 50, 85, 65, 90, 100],
    activeBar: 6,
  },
]

const DAYS = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"]

const CYCLE_MS = 4000

function AnimatedValue({ value }: { value: string }) {
  return (
    <m.span
      key={value}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
    >
      {value}
    </m.span>
  )
}

export default function AnimationRealtimeUpdates({ className }: { className?: string }) {
  const [containerRef, index] = useCycleIndex(SCENARIOS.length, CYCLE_MS)
  const scenario = SCENARIOS[index]

  const metrics = [
    {
      icon: Activity,
      label: "Transfers screened",
      sub: "All protocols",
      ...scenario.transfers,
    },
    {
      icon: ShieldCheck,
      label: "Compliant",
      sub: "Auto-approved",
      ...scenario.compliant,
    },
    {
      icon: AlertTriangle,
      label: "Flagged",
      sub: "Manual review",
      ...scenario.flagged,
    },
  ]

  return (
    <LazyMotion features={domAnimation}>
      <div ref={containerRef} className={cn("flex flex-col p-5", className)}>
        {/* Dashboard header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="font-semibold text-foreground text-sm">Compliance Overview</p>
            <p className="text-gray-400 text-xs">Weekly screening summary</p>
          </div>
          <div className="flex gap-0.5">
            <span className="size-1 rounded-full bg-gray-300" />
            <span className="size-1 rounded-full bg-gray-300" />
            <span className="size-1 rounded-full bg-gray-300" />
          </div>
        </div>

        {/* Metric rows */}
        <div className="mt-4 flex flex-col gap-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-gray-100">
                <metric.icon className="size-4 text-foreground" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm-plus">{metric.label}</p>
                <p className="text-2xs text-gray-400">{metric.sub}</p>
              </div>
              <div className="text-right">
                <p className="font-mono font-semibold text-foreground text-sm">
                  <AnimatedValue value={metric.value} />
                </p>
              </div>
              <div
                className={cn(
                  "flex items-center gap-0.5 font-medium text-xxs",
                  metric.up ? "text-foreground" : "text-emerald-600",
                )}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  className={cn(!metric.up && "rotate-180")}
                >
                  <path d="M5 2L8.5 7H1.5L5 2Z" fill="currentColor" />
                </svg>
                <AnimatedValue value={metric.change} />
              </div>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="mt-4 flex flex-1 items-end gap-2">
          {scenario.bars.map((height, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="relative w-full" style={{ height: 80 }}>
                <m.div
                  className={cn(
                    "absolute inset-x-0 bottom-0 rounded-t-md",
                    i === scenario.activeBar ? "bg-tagline" : "bg-foreground",
                  )}
                  style={{ transformOrigin: "bottom", height: "100%" }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: height / 100 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.05,
                    ease: EASE_OUT,
                  }}
                  key={`${index}-${i}`}
                />
              </div>
              <span
                className={cn(
                  "font-medium text-2xs",
                  i === scenario.activeBar ? "text-gray-900" : "text-gray-400",
                )}
              >
                {DAYS[i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </LazyMotion>
  )
}
