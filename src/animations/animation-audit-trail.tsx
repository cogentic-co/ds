"use client"

import { AlertTriangle, CheckCircle2, ChevronRight, FileText } from "lucide-react"
import { domAnimation, LazyMotion, m } from "motion/react"
import { memo, useEffect, useRef, useState } from "react"

import { cn } from "../lib/utils"

type EntryType = "log" | "success" | "warning" | "report"

interface AuditEntry {
  timestamp: string
  text: string
  type: EntryType
}

const AUDIT_SEQUENCES: AuditEntry[][] = [
  [
    {
      timestamp: "14:32:01",
      text: "Transfer TXN-0847 received — compliance check initiated",
      type: "log",
    },
    { timestamp: "14:32:02", text: "SOP AML/CFT Policy v3.2 applied", type: "log" },
    {
      timestamp: "14:32:03",
      text: "Travel Rule verification — VASP identity confirmed",
      type: "success",
    },
    { timestamp: "14:32:04", text: "Sanctions screening — 12,847 entries checked", type: "log" },
    {
      timestamp: "14:32:05",
      text: "No sanctions matches found — OFAC, EU, UN clear",
      type: "success",
    },
    { timestamp: "14:32:06", text: "PEP screening — 2 beneficial owners cleared", type: "success" },
    { timestamp: "14:32:07", text: "Risk score calculated: 18/100 — Low", type: "success" },
    { timestamp: "14:32:08", text: "Decision: APPROVED — all checks passed", type: "success" },
    {
      timestamp: "14:32:08",
      text: "Compliance report generated — ref CR-2024-0847",
      type: "report",
    },
  ],
  [
    {
      timestamp: "14:33:12",
      text: "Transfer TXN-0846 received — compliance check initiated",
      type: "log",
    },
    { timestamp: "14:33:13", text: "SOP Enhanced Due Diligence v2.1 applied", type: "log" },
    {
      timestamp: "14:33:14",
      text: "Travel Rule verification — counterparty VASP verified",
      type: "success",
    },
    { timestamp: "14:33:15", text: "High-risk corridor detected (HK → GB)", type: "warning" },
    {
      timestamp: "14:33:16",
      text: "Enhanced due diligence triggered — FATF grey list",
      type: "warning",
    },
    { timestamp: "14:33:17", text: "Amount exceeds USD 100K threshold", type: "warning" },
    { timestamp: "14:33:18", text: "Risk score calculated: 72/100 — High", type: "warning" },
    { timestamp: "14:33:19", text: "Decision: FLAGGED — manual review required", type: "warning" },
    {
      timestamp: "14:33:19",
      text: "Escalation report generated — ref ESC-2024-0846",
      type: "report",
    },
  ],
  [
    {
      timestamp: "14:34:05",
      text: "Transfer TXN-0845 received — compliance check initiated",
      type: "log",
    },
    { timestamp: "14:34:06", text: "SOP MiCA Compliance v1.4 applied", type: "log" },
    {
      timestamp: "14:34:07",
      text: "Travel Rule verification — both VASPs registered",
      type: "success",
    },
    { timestamp: "14:34:08", text: "AE→NL corridor approved — MiCA compliant", type: "success" },
    { timestamp: "14:34:09", text: "Sanctions screening — 9,234 entries checked", type: "log" },
    { timestamp: "14:34:10", text: "All sanctions lists clear", type: "success" },
    { timestamp: "14:34:11", text: "Below EUR 10K threshold — no STR required", type: "success" },
    { timestamp: "14:34:12", text: "Risk score calculated: 12/100 — Low", type: "success" },
    {
      timestamp: "14:34:12",
      text: "Compliance report generated — ref CR-2024-0845",
      type: "report",
    },
  ],
]

const ENTRY_DELAY = 450

const iconMap: Record<EntryType, typeof CheckCircle2> = {
  log: ChevronRight,
  success: CheckCircle2,
  warning: AlertTriangle,
  report: FileText,
}

const colorMap: Record<EntryType, string> = {
  log: "text-foreground/80",
  success: "text-emerald-600",
  warning: "text-amber-600",
  report: "text-violet-600",
}

const TypeWriter = memo(function TypeWriter({ text }: { text: string }) {
  const spanRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = spanRef.current
    if (!el) return
    let count = 0
    let raf: number

    function tick() {
      count = Math.min(count + 3, text.length)
      el!.textContent = count < text.length ? `${text.slice(0, count)}▌` : text
      if (count < text.length) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text])

  return <span ref={spanRef} />
})

export default function AnimationAuditTrail({ className }: { className?: string }) {
  const [seqIndex, setSeqIndex] = useState(0)
  const [visibleEntries, setVisibleEntries] = useState<AuditEntry[]>([])
  const [entryCount, setEntryCount] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const sequence = AUDIT_SEQUENCES[seqIndex]

  // Auto-scroll (deferred to avoid layout thrashing)
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight
    })
  }, [])

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    // Clear immediately so stale entries don't flash with new keys
    setVisibleEntries([])
    setEntryCount(0)

    const seq = AUDIT_SEQUENCES[seqIndex]

    function streamEntry(idx: number) {
      if (idx >= seq.length) {
        timeoutRef.current = setTimeout(() => {
          setSeqIndex((prev) => (prev + 1) % AUDIT_SEQUENCES.length)
        }, 2000)
        return
      }

      timeoutRef.current = setTimeout(() => {
        setVisibleEntries((prev) => [...prev, seq[idx]])
        setEntryCount((c) => c + 1)
        streamEntry(idx + 1)
      }, ENTRY_DELAY)
    }

    const start = setTimeout(() => streamEntry(0), 300)
    return () => {
      clearTimeout(start)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [seqIndex])

  return (
    <LazyMotion features={domAnimation}>
      <div className={cn("flex flex-col", className)}>
        {/* Mini header */}
        <div className="flex items-center gap-2 border-gray-100 border-b bg-gray-50/80 px-3 py-1.5">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
          </span>
          <span className="font-semibold text-[10px] text-gray-700">Audit Log</span>
          <span className="ml-auto font-mono text-[10px] text-gray-400">{entryCount} entries</span>
        </div>

        {/* Log entries */}
        <div ref={scrollRef} className="scrollbar-none flex-1 overflow-y-auto px-3 py-2">
          <div className="space-y-0.5">
            {visibleEntries.map((entry, i) => {
              const Icon = iconMap[entry.type]
              return (
                <m.div
                  key={`${seqIndex}-${i}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex items-start gap-1.5 font-mono text-[10px] leading-relaxed"
                >
                  <span className="shrink-0 text-foreground">{entry.timestamp}</span>
                  <Icon className={cn("mt-0.5 size-2.5 shrink-0", colorMap[entry.type])} />
                  <span className={cn(colorMap[entry.type])}>
                    <TypeWriter text={entry.text} />
                  </span>
                </m.div>
              )
            })}
            {visibleEntries.length < sequence.length && (
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-gray-300">
                <span className="shrink-0 text-transparent">00:00:00</span>
                <ChevronRight className="size-2.5 shrink-0" />
                <span className="animate-pulse">▌</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </LazyMotion>
  )
}
