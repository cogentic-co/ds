"use client"

import { Play, RotateCcw } from "lucide-react"
import { domAnimation, LazyMotion, m } from "motion/react"
import { useCallback, useEffect, useRef, useState } from "react"

import { cn } from "../lib/utils"

type ConsoleLine = {
  type: "command" | "output" | "success" | "info"
  text: string
}

const SCRIPT: ConsoleLine[] = [
  { type: "command", text: "$ cogentic-cli test transfer --corridor AU:SG --amount 45000" },
  { type: "info", text: "\u2192 Using sandbox environment (test mode)" },
  { type: "output", text: "Creating test transfer TXN-TEST-0001..." },
  { type: "output", text: "Screening against sandbox ruleset..." },
  { type: "output", text: "  Jurisdiction: AUSTRAC \u2192 MAS" },
  { type: "output", text: "  Threshold check: AUD 10,000 exceeded" },
  { type: "output", text: "  Travel Rule: IVMS101 required" },
  { type: "output", text: "  Risk score: 18/100 (Low)" },
  { type: "success", text: "\u2713 Transfer screened: COMPLIANT" },
  { type: "info", text: "\u2192 Sandbox report: SR-TEST-0001 generated" },
  { type: "info", text: "\u2192 No production data affected" },
  { type: "command", text: "" },
  { type: "command", text: "$ cogentic-cli test transfer --corridor HK:GB --amount 120000" },
  { type: "info", text: "\u2192 Using sandbox environment (test mode)" },
  { type: "output", text: "Creating test transfer TXN-TEST-0002..." },
  { type: "output", text: "Screening against sandbox ruleset..." },
  { type: "output", text: "  Jurisdiction: SFC \u2192 FCA" },
  { type: "output", text: "  High-risk corridor detected" },
  { type: "output", text: "  Enhanced due diligence triggered" },
  { type: "output", text: "  Risk score: 72/100 (High)" },
  { type: "success", text: "\u26A0 Transfer screened: FLAGGED \u2014 manual review required" },
]

const lineColour: Record<ConsoleLine["type"], string> = {
  command: "text-white/90",
  output: "text-white/50",
  success: "text-emerald-400",
  info: "text-cyan/80",
}

export default function AnimationSandbox({ className }: { className?: string }) {
  const [visibleLines, setVisibleLines] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const reset = useCallback(() => {
    setVisibleLines(0)
  }, [])

  useEffect(() => {
    if (visibleLines < SCRIPT.length) {
      const line = SCRIPT[visibleLines]
      const delay = line.type === "command" ? 400 : line.text === "" ? 200 : 120
      const id = setTimeout(() => setVisibleLines((v) => v + 1), delay)
      return () => clearTimeout(id)
    } else {
      const id = setTimeout(reset, 4000)
      return () => clearTimeout(id)
    }
  }, [visibleLines, reset])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight
    })
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <div className={cn("flex flex-col bg-terminal", className)}>
        {/* Terminal bar */}
        <div className="flex items-center gap-3 border-white/10 border-b px-4 py-2">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-red-400/80" />
            <span className="size-2.5 rounded-full bg-amber-400/80" />
            <span className="size-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="ml-2 font-mono text-2xs text-white/40">cogentic-sandbox</span>
          <div className="ml-auto flex items-center gap-2">
            <span className="rounded-full bg-amber-500/20 px-2 py-0.5 font-bold font-mono text-3xs text-amber-300">
              SANDBOX
            </span>
            <button
              onClick={reset}
              className="text-white/30 transition-colors hover:text-white/60"
              aria-label="Restart"
            >
              <RotateCcw className="size-3" />
            </button>
          </div>
        </div>

        {/* Console output */}
        <div ref={scrollRef} className="scrollbar-none flex-1 overflow-y-auto px-4 py-3">
          <div className="space-y-0.5">
            {SCRIPT.slice(0, visibleLines).map((line, i) => (
              <m.p
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={cn("font-mono text-xxs leading-relaxed", lineColour[line.type])}
              >
                {line.text || "\u00A0"}
              </m.p>
            ))}
            {visibleLines < SCRIPT.length && (
              <p className="animate-pulse font-mono text-white/30 text-xxs">{"\u2588"}</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 border-white/10 border-t px-4 py-1.5">
          <Play className="size-3 text-emerald-400" />
          <span className="font-mono text-3xs text-white/30">
            Sandbox {"\u2022"} No production data {"\u2022"} Realistic responses
          </span>
        </div>
      </div>
    </LazyMotion>
  )
}
