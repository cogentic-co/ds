"use client"

import { CheckCircle2, Clock, Mail } from "lucide-react"
import { domAnimation, LazyMotion, m } from "motion/react"

import { useCycleIndex } from "../hooks/use-cycle-index"

import { cn } from "../lib/utils"

type ScheduledReport = {
  name: string
  frequency: string
  recipients: string
  lastSent: string
  nextDue: string
  status: "sent" | "scheduled" | "overdue"
}

const REPORTS: ScheduledReport[] = [
  {
    name: "Weekly compliance summary",
    frequency: "Every Monday 09:00",
    recipients: "compliance-team@",
    lastSent: "Today, 09:00",
    nextDue: "Next Monday",
    status: "sent",
  },
  {
    name: "Monthly STR filing digest",
    frequency: "1st of each month",
    recipients: "cco@, legal@",
    lastSent: "1 Feb 2025",
    nextDue: "1 Mar 2025",
    status: "scheduled",
  },
  {
    name: "Quarterly board report",
    frequency: "Quarterly",
    recipients: "board@, cco@",
    lastSent: "1 Jan 2025",
    nextDue: "1 Apr 2025",
    status: "scheduled",
  },
  {
    name: "Daily high-risk alerts",
    frequency: "Daily 08:00",
    recipients: "senior-analysts@",
    lastSent: "Today, 08:00",
    nextDue: "Tomorrow, 08:00",
    status: "sent",
  },
]

const statusConfig: Record<string, { icon: typeof Clock; colour: string; label: string }> = {
  sent: { icon: CheckCircle2, colour: "text-emerald-500", label: "Sent" },
  scheduled: { icon: Clock, colour: "text-[#00D4FF]", label: "Scheduled" },
  overdue: { icon: Clock, colour: "text-red-500", label: "Overdue" },
}

export default function AnimationScheduledReports({ className }: { className?: string }) {
  const [containerRef, activeIdx] = useCycleIndex(REPORTS.length, 3000)

  return (
    <LazyMotion features={domAnimation}>
      <div ref={containerRef} className={cn("flex flex-col p-5", className)}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-[15px] text-foreground">Scheduled Reports</p>
            <p className="text-[12px] text-gray-400">{REPORTS.length} active schedules</p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-[#00D4FF]/10 px-2.5 py-1">
            <Mail className="size-3 text-[#00D4FF]" />
            <span className="font-semibold text-[#0099BB] text-[11px]">Auto</span>
          </div>
        </div>

        {/* Report list */}
        <div className="mt-4 space-y-2">
          {REPORTS.map((r, i) => {
            const st = statusConfig[r.status]
            const Icon = st.icon
            const isActive = i === activeIdx
            return (
              <m.div
                key={r.name}
                animate={{
                  borderColor: isActive ? "#00D4FF" : "#f3f4f6",
                }}
                transition={{ duration: 0.3 }}
                className="rounded-lg border bg-white px-3 py-2.5"
              >
                <div className="flex items-center gap-2">
                  <Icon className={cn("size-3.5 shrink-0", st.colour)} />
                  <span className="flex-1 truncate font-semibold text-[12px] text-gray-800">
                    {r.name}
                  </span>
                  <span className="text-[10px] text-gray-400">{r.frequency}</span>
                </div>

                {isActive && (
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.25 }}
                    className="mt-2 grid grid-cols-2 gap-2 border-gray-100 border-t pt-2"
                  >
                    <div>
                      <p className="text-[9px] text-gray-400">Recipients</p>
                      <p className="font-mono text-[10px] text-gray-600">{r.recipients}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-400">Last sent</p>
                      <p className="font-medium text-[10px] text-gray-700">{r.lastSent}</p>
                    </div>
                  </m.div>
                )}
              </m.div>
            )
          })}
        </div>
      </div>
    </LazyMotion>
  )
}
