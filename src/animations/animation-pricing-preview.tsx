"use client"

import { CheckCircle2 } from "lucide-react"
import { AnimatePresence, domAnimation, LazyMotion, m } from "motion/react"
import { useMemo } from "react"

import { useCycleIndex } from "../hooks/use-cycle-index"

import { cn } from "../lib/utils"

interface Plan {
  name: string
  features: string[]
  ctaLabel: string
  highlight?: boolean
  monthlyPrice?: string
  annualPrice?: string
}

const DEFAULT_PLANS: Plan[] = [
  {
    name: "Starter",
    features: ["50 transfers/mo", "5 jurisdictions", "Audit trail"],
    ctaLabel: "Get started",
    highlight: false,
  },
  {
    name: "Growth",
    monthlyPrice: "$499",
    annualPrice: "$399",
    features: ["1,000 transfers/mo", "25 jurisdictions", "AI investigation"],
    ctaLabel: "Start trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    features: ["Unlimited transfers", "45+ jurisdictions", "Custom workflows"],
    ctaLabel: "Talk to sales",
    highlight: false,
  },
]

const MAX_FEATURES = 3
const CYCLE_MS = 4000

export default function AnimationPricingPreview({
  className,
  plans,
}: {
  className?: string
  plans?: Plan[]
}) {
  const [containerRef, cycleIndex] = useCycleIndex(2, CYCLE_MS)
  const yearly = cycleIndex === 0

  // Use CMS plans if provided (pick first 3), otherwise defaults
  const items = useMemo(() => {
    if (!plans?.length) return DEFAULT_PLANS
    return plans.slice(0, 3).map((p) => ({
      ...p,
      features: p.features.slice(0, MAX_FEATURES),
    }))
  }, [plans])

  return (
    <LazyMotion features={domAnimation}>
      <div
        ref={containerRef}
        className={cn("flex flex-col items-center justify-center p-5", className)}
      >
        {/* Toggle */}
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "font-semibold text-[11px] transition-colors",
              !yearly ? "text-gray-900" : "text-gray-400",
            )}
          >
            Monthly
          </span>
          <span
            className="relative h-5 w-9 rounded-full bg-gray-900 transition-colors"
            aria-label="Toggle billing"
          >
            <m.div
              className="absolute top-0.5 size-4 rounded-full bg-white"
              animate={{ left: yearly ? 18 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </span>
          <span
            className={cn(
              "font-semibold text-[11px] transition-colors",
              yearly ? "text-gray-900" : "text-gray-400",
            )}
          >
            Yearly
          </span>
        </div>

        {/* Cards */}
        <div className="-mx-[70px] mt-4 flex w-[calc(100%+140px)] gap-2.5 sm:mx-0 sm:w-full">
          {items.map((plan, i) => {
            const rawPrice = yearly ? plan.annualPrice : plan.monthlyPrice
            const price = rawPrice || (i === 0 ? "Free" : "Let\u2019s talk")
            const hasPrice = yearly ? !!plan.annualPrice : !!plan.monthlyPrice
            return (
              <m.div
                key={plan.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                className={cn(
                  "flex flex-1 flex-col rounded-xl border p-3",
                  plan.highlight
                    ? "border-gray-900 bg-gray-50 shadow-sm"
                    : "border-gray-200 bg-white",
                )}
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[11px] text-gray-900">{plan.name}</span>
                  {plan.highlight && (
                    <span className="rounded bg-gray-900 px-1.5 py-0.5 font-bold text-[8px] text-white">
                      Popular
                    </span>
                  )}
                </div>

                <div className="mt-2 flex items-baseline gap-0.5">
                  <AnimatePresence mode="wait">
                    <m.span
                      key={price}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.2 }}
                      className="font-bold text-gray-900 text-lg"
                    >
                      {price}
                    </m.span>
                  </AnimatePresence>
                  {hasPrice && <span className="text-[9px] text-gray-400">/mo</span>}
                </div>

                <div className="mt-2.5 flex flex-col gap-1.5">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-1">
                      <CheckCircle2
                        className="size-3 shrink-0 text-emerald-500"
                        strokeWidth={2.5}
                      />
                      <span className="font-medium text-[9px] text-gray-600 leading-tight">
                        {f}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  className={cn(
                    "mt-3 rounded-md py-1.5 text-center font-semibold text-[9px]",
                    plan.highlight
                      ? "bg-gray-900 text-white"
                      : "border border-gray-200 text-gray-700",
                  )}
                >
                  {plan.ctaLabel}
                </div>
              </m.div>
            )
          })}
        </div>

        {/* Bottom metric row */}
        <div className="mt-3 flex w-full gap-2.5">
          {[
            { label: "Avg. savings", value: "42%", sub: "vs manual compliance" },
            { label: "Setup time", value: "<1hr", sub: "fully operational" },
            { label: "Uptime SLA", value: "99.9%", sub: "guaranteed" },
          ].map((metric, i) => (
            <m.div
              key={metric.label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.08 }}
              className="flex flex-1 flex-col items-center rounded-lg border border-gray-100 bg-white px-2 py-2"
            >
              <span className="font-bold text-gray-900 text-sm">{metric.value}</span>
              <span className="text-[8px] text-gray-400">{metric.sub}</span>
            </m.div>
          ))}
        </div>
      </div>
    </LazyMotion>
  )
}
