"use client"

import { domAnimation, LazyMotion, m } from "motion/react"

import { useCycleIndex } from "../hooks/use-cycle-index"

import { cn } from "../lib/utils"

type Corridor = {
  from: { code: string; flag: string; jurisdiction: string }
  to: { code: string; flag: string; jurisdiction: string }
  requirement: string
  threshold: string
  status: "Resolved" | "Pending"
}

const CORRIDORS: Corridor[] = [
  {
    from: { code: "AU", flag: "\u{1F1E6}\u{1F1FA}", jurisdiction: "AUSTRAC" },
    to: { code: "SG", flag: "\u{1F1F8}\u{1F1EC}", jurisdiction: "MAS" },
    requirement: "Full Travel Rule — IVMS101",
    threshold: "AUD 10,000 / SGD 20,000",
    status: "Resolved",
  },
  {
    from: { code: "HK", flag: "\u{1F1ED}\u{1F1F0}", jurisdiction: "SFC" },
    to: { code: "GB", flag: "\u{1F1EC}\u{1F1E7}", jurisdiction: "FCA" },
    requirement: "Enhanced Due Diligence",
    threshold: "No de minimis",
    status: "Resolved",
  },
  {
    from: { code: "AE", flag: "\u{1F1E6}\u{1F1EA}", jurisdiction: "VARA" },
    to: { code: "NL", flag: "\u{1F1F3}\u{1F1F1}", jurisdiction: "DNB" },
    requirement: "MiCA — Travel Rule",
    threshold: "EUR 1,000",
    status: "Pending",
  },
]

const CYCLE_MS = 3500

export default function AnimationJurisdictionDetection({ className }: { className?: string }) {
  const [containerRef, index] = useCycleIndex(CORRIDORS.length, CYCLE_MS)
  const c = CORRIDORS[index]

  return (
    <LazyMotion features={domAnimation}>
      <div ref={containerRef} className={cn("flex flex-col p-5", className)}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-foreground text-sm">Jurisdiction Detection</p>
            <p className="text-gray-400 text-xs">Automatic corridor mapping</p>
          </div>
          <m.span
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
              "rounded-full px-2.5 py-1 font-semibold text-xxs",
              c.status === "Resolved"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-amber-50 text-amber-700",
            )}
          >
            {c.status}
          </m.span>
        </div>

        {/* Corridor visualisation */}
        <m.div
          key={`corridor-${index}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"
        >
          {/* From */}
          <div className="text-center">
            <span className="text-2xl">{c.from.flag}</span>
            <p className="mt-1 font-bold font-mono text-gray-900 text-xs">{c.from.code}</p>
            <p className="text-2xs text-gray-400">{c.from.jurisdiction}</p>
          </div>

          {/* Arrow */}
          <div className="mx-3 flex flex-1 flex-col items-center gap-1">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent" />
            <span className="font-medium text-2xs text-cyan-dark">Travel Rule</span>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent" />
          </div>

          {/* To */}
          <div className="text-center">
            <span className="text-2xl">{c.to.flag}</span>
            <p className="mt-1 font-bold font-mono text-gray-900 text-xs">{c.to.code}</p>
            <p className="text-2xs text-gray-400">{c.to.jurisdiction}</p>
          </div>
        </m.div>

        {/* Details */}
        <m.div
          key={`detail-${index}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.15 }}
          className="mt-3 grid grid-cols-2 gap-2"
        >
          <div className="rounded-lg border border-gray-100 bg-white px-3 py-2.5">
            <span className="font-medium text-2xs text-gray-400">Requirement</span>
            <p className="mt-0.5 font-semibold text-gray-800 text-xs">{c.requirement}</p>
          </div>
          <div className="rounded-lg border border-gray-100 bg-white px-3 py-2.5">
            <span className="font-medium text-2xs text-gray-400">Threshold</span>
            <p className="mt-0.5 font-semibold text-gray-800 text-xs">{c.threshold}</p>
          </div>
        </m.div>

        {/* Mini log */}
        <m.div
          key={`log-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-3 space-y-1 rounded-lg border border-gray-100 bg-white px-3 py-2"
        >
          {[
            `Originator jurisdiction: ${c.from.jurisdiction}`,
            `Beneficiary jurisdiction: ${c.to.jurisdiction}`,
            `Applicable requirement: ${c.requirement}`,
          ].map((line, i) => (
            <p key={i} className="font-mono text-2xs text-gray-500">
              <span className="text-emerald-500">{"\u2713"}</span> {line}
            </p>
          ))}
        </m.div>
      </div>
    </LazyMotion>
  )
}
