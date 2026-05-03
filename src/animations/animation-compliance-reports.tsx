"use client"

import { CheckCircle2, Download, FileText } from "lucide-react"
import { domAnimation, LazyMotion, m } from "motion/react"

import { useCycleIndex } from "../hooks/use-cycle-index"

import { cn } from "../lib/utils"

type Report = {
  ref: string
  title: string
  jurisdiction: string
  flag: string
  period: string
  status: "Generated" | "Pending"
  sections: { name: string; items: number }[]
}

const REPORTS: Report[] = [
  {
    ref: "CR-2024-Q4",
    title: "AUSTRAC Compliance Report",
    jurisdiction: "Australia",
    flag: "\u{1F1E6}\u{1F1FA}",
    period: "Q4 2024",
    status: "Generated",
    sections: [
      { name: "Transfers screened", items: 4821 },
      { name: "STRs filed", items: 3 },
      { name: "Sanctions hits", items: 0 },
      { name: "Travel Rule compliance", items: 99 },
    ],
  },
  {
    ref: "CR-2024-MAS",
    title: "MAS Regulatory Filing",
    jurisdiction: "Singapore",
    flag: "\u{1F1F8}\u{1F1EC}",
    period: "H2 2024",
    status: "Generated",
    sections: [
      { name: "Transfers screened", items: 2340 },
      { name: "High-risk flagged", items: 18 },
      { name: "EDD completed", items: 18 },
      { name: "Travel Rule compliance", items: 100 },
    ],
  },
]

export default function AnimationComplianceReports({ className }: { className?: string }) {
  const [containerRef, index] = useCycleIndex(REPORTS.length, 4500)

  const r = REPORTS[index]

  return (
    <LazyMotion features={domAnimation}>
      <div ref={containerRef} className={cn("flex flex-col p-5", className)}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-foreground text-sm">Compliance Reports</p>
            <p className="text-gray-400 text-xs">One-click generation</p>
          </div>
          <FileText className="size-4 text-gray-400" />
        </div>

        {/* Report card */}
        <m.div
          key={`report-${index}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 rounded-lg border border-gray-100 bg-gray-50"
        >
          <div className="flex items-center gap-3 border-gray-100 border-b px-4 py-3">
            <span className="text-lg">{r.flag}</span>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-sm-plus">{r.title}</p>
              <p className="text-2xs text-gray-400">
                {r.ref} {"\u2022"} {r.period}
              </p>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5">
              <CheckCircle2 className="size-3 text-emerald-500" />
              <span className="font-semibold text-2xs text-emerald-700">{r.status}</span>
            </div>
          </div>

          {/* Report sections */}
          <div className="grid grid-cols-2 gap-2 p-3">
            {r.sections.map((s, i) => (
              <m.div
                key={s.name}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="rounded-md bg-white px-3 py-2"
              >
                <p className="text-2xs text-gray-400">{s.name}</p>
                <p className="mt-0.5 font-bold font-mono text-gray-900 text-sm">
                  {typeof s.items === "number" && s.items > 100
                    ? s.items.toLocaleString()
                    : s.name.includes("compliance")
                      ? `${s.items}%`
                      : s.items}
                </p>
              </m.div>
            ))}
          </div>
        </m.div>

        {/* Download button mock */}
        <m.div
          key={`dl-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-2 font-medium text-gray-600 text-xs"
        >
          <Download className="size-3.5" />
          Download PDF
        </m.div>
      </div>
    </LazyMotion>
  )
}
