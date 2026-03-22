"use client"

import { domAnimation, LazyMotion, m } from "motion/react"
import { useCallback, useEffect, useRef, useState } from "react"

import { cn } from "../lib/utils"

type CodeLine = {
  text: string
  colour?: string
  indent?: number
}

const REQUEST: CodeLine[] = [
  { text: "POST /v1/transfers/screen", colour: "text-emerald-400" },
  { text: "Authorization: Bearer sk_live_\u2022\u2022\u2022", colour: "text-gray-500" },
  { text: "Content-Type: application/json", colour: "text-gray-500" },
  { text: "" },
  { text: "{", colour: "text-gray-300" },
  { text: '"transfer_id": "TXN-0847",', colour: "text-[#00D4FF]", indent: 1 },
  { text: '"originator": {', colour: "text-gray-300", indent: 1 },
  { text: '"vasp_id": "vasp_au_001",', colour: "text-amber-400", indent: 2 },
  { text: '"jurisdiction": "AU"', colour: "text-amber-400", indent: 2 },
  { text: "},", colour: "text-gray-300", indent: 1 },
  { text: '"beneficiary": {', colour: "text-gray-300", indent: 1 },
  { text: '"vasp_id": "vasp_sg_042",', colour: "text-amber-400", indent: 2 },
  { text: '"jurisdiction": "SG"', colour: "text-amber-400", indent: 2 },
  { text: "},", colour: "text-gray-300", indent: 1 },
  { text: '"amount": "45000.00",', colour: "text-violet-400", indent: 1 },
  { text: '"currency": "USD"', colour: "text-violet-400", indent: 1 },
  { text: "}", colour: "text-gray-300" },
]

const RESPONSE: CodeLine[] = [
  { text: "200 OK", colour: "text-emerald-400" },
  { text: "" },
  { text: "{", colour: "text-gray-300" },
  { text: '"status": "compliant",', colour: "text-emerald-400", indent: 1 },
  { text: '"risk_score": 18,', colour: "text-[#00D4FF]", indent: 1 },
  { text: '"travel_rule": "verified",', colour: "text-emerald-400", indent: 1 },
  { text: '"jurisdiction_pair": "AU→SG",', colour: "text-amber-400", indent: 1 },
  { text: '"report_ref": "CR-2024-0847"', colour: "text-violet-400", indent: 1 },
  { text: "}", colour: "text-gray-300" },
]

export default function AnimationRestApi({ className }: { className?: string }) {
  const [phase, setPhase] = useState<"request" | "response">("request")
  const [visibleLines, setVisibleLines] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const lines = phase === "request" ? REQUEST : RESPONSE

  const reset = useCallback(() => {
    setPhase("request")
    setVisibleLines(0)
  }, [])

  useEffect(() => {
    if (visibleLines < lines.length) {
      const id = setTimeout(() => setVisibleLines((v) => v + 1), 80)
      return () => clearTimeout(id)
    } else if (phase === "request") {
      const id = setTimeout(() => {
        setPhase("response")
        setVisibleLines(0)
      }, 1200)
      return () => clearTimeout(id)
    } else {
      const id = setTimeout(reset, 3000)
      return () => clearTimeout(id)
    }
  }, [visibleLines, lines.length, phase, reset])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight
    })
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <div className={cn("flex flex-col bg-[#1a1a2e]", className)}>
        {/* Tab bar */}
        <div className="flex items-center gap-3 border-white/10 border-b px-4 py-2">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-red-400/80" />
            <span className="size-2.5 rounded-full bg-amber-400/80" />
            <span className="size-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="ml-2 font-mono text-[10px] text-white/40">cogentic-api</span>
          <m.span
            key={phase}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
              "ml-auto rounded-full px-2 py-0.5 font-bold text-[9px]",
              phase === "request"
                ? "bg-amber-500/20 text-amber-300"
                : "bg-emerald-500/20 text-emerald-300",
            )}
          >
            {phase === "request" ? "REQUEST" : "RESPONSE"}
          </m.span>
        </div>

        {/* Code */}
        <div ref={scrollRef} className="scrollbar-none flex-1 overflow-y-auto px-4 py-3">
          <div className="space-y-0.5">
            {lines.slice(0, visibleLines).map((line, i) => (
              <m.div
                key={`${phase}-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex"
              >
                <span className="w-5 shrink-0 text-right font-mono text-[10px] text-white/20">
                  {i + 1}
                </span>
                <span
                  className={cn("ml-3 font-mono text-[11px]", line.colour ?? "text-white/60")}
                  style={{ paddingLeft: (line.indent ?? 0) * 16 }}
                >
                  {line.text || "\u00A0"}
                </span>
              </m.div>
            ))}
            {visibleLines < lines.length && (
              <div className="flex">
                <span className="w-5" />
                <span className="ml-3 animate-pulse font-mono text-[11px] text-white/30">
                  {"\u2588"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </LazyMotion>
  )
}
