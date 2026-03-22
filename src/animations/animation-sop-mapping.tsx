"use client"

import { cn } from "../lib/utils"

type SopItem = {
  code: string
  regulation: string
  jurisdiction: string
  flag: string
  version: string
  coverage: string
  lastReview: string
  status: "mapped" | "review" | "updated"
}

const ITEMS: SopItem[] = [
  {
    code: "SOP-001",
    regulation: "AML/CFT Policy",
    jurisdiction: "AUSTRAC",
    flag: "\u{1F1E6}\u{1F1FA}",
    version: "v3.2",
    coverage: "14 controls mapped",
    lastReview: "Reviewed 3 days ago",
    status: "mapped",
  },
  {
    code: "SOP-014",
    regulation: "Travel Rule — IVMS101",
    jurisdiction: "MAS",
    flag: "\u{1F1F8}\u{1F1EC}",
    version: "v2.1",
    coverage: "8 controls mapped",
    lastReview: "Updated 12 hours ago",
    status: "updated",
  },
  {
    code: "SOP-007",
    regulation: "Enhanced Due Diligence",
    jurisdiction: "FCA",
    flag: "\u{1F1EC}\u{1F1E7}",
    version: "v1.8",
    coverage: "11 controls mapped",
    lastReview: "Review due in 2 days",
    status: "review",
  },
  {
    code: "SOP-023",
    regulation: "Sanctions Screening",
    jurisdiction: "OFAC",
    flag: "\u{1F1FA}\u{1F1F8}",
    version: "v4.0",
    coverage: "6 controls mapped",
    lastReview: "Reviewed 1 week ago",
    status: "mapped",
  },
  {
    code: "SOP-009",
    regulation: "MiCA Compliance",
    jurisdiction: "EU",
    flag: "\u{1F1EA}\u{1F1FA}",
    version: "v1.4",
    coverage: "19 controls mapped",
    lastReview: "Updated 2 days ago",
    status: "updated",
  },
  {
    code: "SOP-031",
    regulation: "VA Licensing Framework",
    jurisdiction: "SFC",
    flag: "\u{1F1ED}\u{1F1F0}",
    version: "v2.0",
    coverage: "9 controls mapped",
    lastReview: "Reviewed 5 days ago",
    status: "mapped",
  },
  {
    code: "SOP-018",
    regulation: "Threshold Reporting",
    jurisdiction: "FINTRAC",
    flag: "\u{1F1E8}\u{1F1E6}",
    version: "v3.1",
    coverage: "7 controls mapped",
    lastReview: "Review due tomorrow",
    status: "review",
  },
  {
    code: "SOP-042",
    regulation: "VASP Obligations",
    jurisdiction: "VARA",
    flag: "\u{1F1E6}\u{1F1EA}",
    version: "v1.1",
    coverage: "12 controls mapped",
    lastReview: "Reviewed 2 weeks ago",
    status: "mapped",
  },
]

const statusStyle: Record<SopItem["status"], { dot: string; label: string; bg: string }> = {
  mapped: { dot: "bg-emerald-400", label: "Mapped", bg: "bg-emerald-50 text-emerald-700" },
  review: { dot: "bg-amber-400", label: "Review", bg: "bg-amber-50 text-amber-700" },
  updated: { dot: "bg-[#00D4FF]", label: "Updated", bg: "bg-sky-50 text-sky-700" },
}

export default function AnimationSopMapping({ className }: { className?: string }) {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div className={cn("relative flex items-center overflow-hidden", className)}>
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-card/40 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-card/40 to-transparent" />

      {/* Scrolling row */}
      <div
        className="flex w-max animate-marquee-left gap-4 px-4"
        style={{ animationDuration: "55s" }}
      >
        {doubled.map((item, i) => {
          const st = statusStyle[item.status]
          return (
            <div
              key={`${item.code}-${i}`}
              className="flex shrink-0 flex-col rounded-xl border border-gray-200 bg-white shadow-sm"
              style={{ width: 260 }}
            >
              {/* Header */}
              <div className="flex items-center gap-2 border-gray-100 border-b px-4 py-3">
                <span className="font-bold font-mono text-[11px] text-gray-400">{item.code}</span>
                <span className="text-[10px] text-gray-300">{item.version}</span>
                <span
                  className={cn(
                    "ml-auto rounded-full px-2 py-0.5 font-semibold text-[10px]",
                    st.bg,
                  )}
                >
                  {st.label}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-col gap-2.5 px-4 py-3">
                <div>
                  <p className="font-semibold text-[13px] text-gray-900 leading-snug">
                    {item.regulation}
                  </p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="text-sm">{item.flag}</span>
                    <span className="text-[11px] text-gray-500">{item.jurisdiction}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[10px] text-gray-500">{item.coverage}</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        item.status === "mapped"
                          ? "bg-emerald-400"
                          : item.status === "updated"
                            ? "bg-[#00D4FF]"
                            : "bg-amber-400",
                      )}
                      style={{
                        width:
                          item.status === "mapped"
                            ? "100%"
                            : item.status === "updated"
                              ? "85%"
                              : "60%",
                      }}
                    />
                  </div>
                </div>

                <p className="text-[10px] text-gray-400">{item.lastReview}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
