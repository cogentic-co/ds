"use client"

import { CheckCircle2, XCircle } from "lucide-react"
import { domAnimation, LazyMotion, m } from "motion/react"

import { useCycleIndex } from "../hooks/use-cycle-index"

import { cn } from "../lib/utils"

type Vasp = {
  name: string
  jurisdiction: string
  flag: string
  registered: boolean
  regulator: string
  protocols: string[]
  riskLevel: "Low" | "Medium" | "High"
  lastVerified: string
}

const VASPS: Vasp[] = [
  {
    name: "Aqua Exchange",
    jurisdiction: "Singapore",
    flag: "\u{1F1F8}\u{1F1EC}",
    registered: true,
    regulator: "MAS",
    protocols: ["TRP", "TRISA"],
    riskLevel: "Low",
    lastVerified: "2 hours ago",
  },
  {
    name: "Atlas Digital",
    jurisdiction: "United Kingdom",
    flag: "\u{1F1EC}\u{1F1E7}",
    registered: true,
    regulator: "FCA",
    protocols: ["OpenVASP", "TRP"],
    riskLevel: "Low",
    lastVerified: "4 hours ago",
  },
  {
    name: "Nova Crypto",
    jurisdiction: "UAE",
    flag: "\u{1F1E6}\u{1F1EA}",
    registered: true,
    regulator: "VARA",
    protocols: ["Sygna"],
    riskLevel: "Medium",
    lastVerified: "1 day ago",
  },
]

const riskColour: Record<string, string> = {
  Low: "bg-emerald-50 text-emerald-700",
  Medium: "bg-amber-50 text-amber-700",
  High: "bg-red-50 text-red-700",
}

export default function AnimationVaspIdentification({ className }: { className?: string }) {
  const [containerRef, index] = useCycleIndex(VASPS.length, 3800)

  const v = VASPS[index]

  return (
    <LazyMotion features={domAnimation}>
      <div ref={containerRef} className={cn("flex flex-col p-5", className)}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-foreground text-sm">Counterparty VASP</p>
            <p className="text-gray-400 text-xs">Identity verification</p>
          </div>
          <m.span
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
              "rounded-full px-2.5 py-1 font-semibold text-xxs",
              riskColour[v.riskLevel],
            )}
          >
            {v.riskLevel} risk
          </m.span>
        </div>

        {/* VASP card */}
        <m.div
          key={`vasp-${index}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 rounded-lg border border-gray-100 bg-gray-50"
        >
          {/* Name & jurisdiction */}
          <div className="flex items-center gap-3 border-gray-100 border-b px-4 py-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-white text-lg shadow-sm">
              {v.flag}
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm-plus">{v.name}</p>
              <p className="text-gray-500 text-xxs">
                {v.jurisdiction} {"\u2022"} {v.regulator}
              </p>
            </div>
          </div>

          {/* Verification checks */}
          <div className="grid grid-cols-2 gap-2 p-3">
            {[
              { label: "Registered", ok: v.registered },
              { label: "Identity verified", ok: true },
              { label: "Sanctions clear", ok: true },
              { label: "Travel Rule ready", ok: v.protocols.length > 0 },
            ].map((check, i) => (
              <m.div
                key={check.label}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1.5"
              >
                {check.ok ? (
                  <CheckCircle2 className="size-3 text-emerald-500" />
                ) : (
                  <XCircle className="size-3 text-red-500" />
                )}
                <span className="font-medium text-2xs text-gray-600">{check.label}</span>
              </m.div>
            ))}
          </div>
        </m.div>

        {/* Protocols */}
        <m.div
          key={`proto-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-3 flex items-center gap-2"
        >
          <span className="font-medium text-2xs text-gray-400">Protocols:</span>
          {v.protocols.map((p) => (
            <span
              key={p}
              className="rounded-full border border-gray-200 bg-white px-2.5 py-0.5 font-semibold text-2xs text-gray-600"
            >
              {p}
            </span>
          ))}
          <span className="ml-auto text-2xs text-gray-400">Verified {v.lastVerified}</span>
        </m.div>
      </div>
    </LazyMotion>
  )
}
