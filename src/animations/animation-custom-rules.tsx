"use client"

import { AlertTriangle, ShieldCheck } from "lucide-react"
import { domAnimation, LazyMotion, m } from "motion/react"

import { useCycleIndex } from "../hooks/use-cycle-index"

import { cn } from "../lib/utils"

type Rule = {
  id: string
  name: string
  condition: string
  action: string
  status: "active" | "triggered" | "paused"
  triggers: string
}

const RULES: Rule[] = [
  {
    id: "CR-001",
    name: "High-value transfer flag",
    condition: "IF amount > USD 50,000",
    action: "THEN escalate to senior analyst",
    status: "active",
    triggers: "142 this month",
  },
  {
    id: "CR-007",
    name: "Grey-list jurisdiction",
    condition: "IF jurisdiction IN fatf_grey_list",
    action: "THEN apply enhanced due diligence",
    status: "triggered",
    triggers: "28 this month",
  },
  {
    id: "CR-012",
    name: "Repeat counterparty check",
    condition: "IF counterparty_txns > 5 in 24h",
    action: "THEN flag for velocity review",
    status: "active",
    triggers: "9 this month",
  },
  {
    id: "CR-019",
    name: "New VASP verification",
    condition: "IF counterparty.first_seen < 30d",
    action: "THEN require manual VASP check",
    status: "active",
    triggers: "67 this month",
  },
]

const statusStyle: Record<Rule["status"], { bg: string; label: string }> = {
  active: { bg: "bg-emerald-50 text-emerald-700", label: "Active" },
  triggered: { bg: "bg-amber-50 text-amber-700", label: "Triggered" },
  paused: { bg: "bg-gray-100 text-gray-500", label: "Paused" },
}

export default function AnimationCustomRules({ className }: { className?: string }) {
  const [containerRef, activeIdx] = useCycleIndex(RULES.length, 3200)

  return (
    <LazyMotion features={domAnimation}>
      <div ref={containerRef} className={cn("flex flex-col p-5", className)}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-foreground text-sm">Custom Rules</p>
            <p className="text-gray-400 text-xs">{RULES.length} rules configured</p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1">
            <ShieldCheck className="size-3 text-emerald-600" />
            <span className="font-semibold text-emerald-700 text-xxs">All active</span>
          </div>
        </div>

        {/* Rule list */}
        <div className="mt-4 space-y-2">
          {RULES.map((rule, i) => {
            const st = statusStyle[rule.status]
            const isActive = i === activeIdx
            return (
              <m.div
                key={rule.id}
                animate={{
                  borderColor: isActive ? "#00D4FF" : "#f3f4f6",
                  boxShadow: isActive ? "0 0 0 1px rgba(0,212,255,0.15)" : "none",
                }}
                transition={{ duration: 0.3 }}
                className="rounded-lg border bg-white px-3 py-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-mono text-2xs text-gray-400">{rule.id}</span>
                    <span className="font-semibold text-gray-800 text-xs">{rule.name}</span>
                  </div>
                  <span className={cn("rounded-full px-2 py-0.5 font-semibold text-2xs", st.bg)}>
                    {st.label}
                  </span>
                </div>

                {isActive && (
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.25 }}
                    className="mt-2 space-y-1 border-gray-100 border-t pt-2"
                  >
                    <p className="font-mono text-2xs text-cyan-dark">{rule.condition}</p>
                    <p className="font-mono text-2xs text-gray-600">{rule.action}</p>
                    <div className="flex items-center gap-1 pt-1">
                      <AlertTriangle className="size-2.5 text-gray-400" />
                      <span className="text-2xs text-gray-400">{rule.triggers}</span>
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
