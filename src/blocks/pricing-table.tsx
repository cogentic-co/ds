"use client"

import { CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Button } from "../components/button"
import { FadeIn } from "../components/fade-in"
import { Switch } from "../components/switch"
import { cn } from "../lib/utils"

type Plan = {
  name: string
  monthlyPrice?: string
  annualPrice?: string
  perUnitMonthly?: string
  perUnitAnnual?: string
  features: string[]
  ctaLabel: string
  ctaHref?: string
  highlight?: boolean
  badge?: string
  blurb?: string
}

interface PricingTableProps {
  headline?: string
  subheadline?: string
  plans?: Plan[]
  className?: string
}

const DEFAULT_PLANS: Plan[] = [
  {
    name: "Starter",
    blurb: "For early-stage VASPs getting started with Travel Rule compliance.",
    features: [
      "Up to 50 transfers/month",
      "5 jurisdictions",
      "Basic jurisdiction detection",
      "Email support",
      "Audit trail",
    ],
    ctaLabel: "Get started free",
    ctaHref: "/contact",
  },
  {
    name: "Growth",
    monthlyPrice: "$499",
    annualPrice: "$399",
    perUnitMonthly: "Per month",
    perUnitAnnual: "Per month / billed yearly",
    blurb: "For scaling VASPs with growing transfer volumes.",
    features: [
      "Up to 1,000 transfers/month",
      "25 jurisdictions",
      "AI-powered investigation",
      "SOP mapping",
      "Priority support",
      "API access",
      "Custom reports",
    ],
    ctaLabel: "Start free trial",
    ctaHref: "/contact",
    highlight: true,
  },
  {
    name: "Enterprise",
    blurb: "For high-volume VASPs with complex compliance requirements.",
    features: [
      "Unlimited transfers",
      "All 45+ jurisdictions",
      "Custom AI models",
      "Dedicated compliance adviser",
      "SLA guarantee",
      "SSO & advanced security",
      "Data residency options",
      "Custom integrations",
    ],
    ctaLabel: "Talk to sales",
    ctaHref: "/contact",
  },
]

function PricingCard({
  plan,
  index,
  yearly,
  prevPlanName,
}: {
  plan: Plan
  index: number
  yearly: boolean
  prevPlanName: string | null
}) {
  const price = yearly ? plan.annualPrice : plan.monthlyPrice
  const perUnit = yearly ? plan.perUnitAnnual : plan.perUnitMonthly

  return (
    <FadeIn
      as="article"
      delay={index * 100}
      className={cn("flex flex-col", plan.highlight && "bg-muted")}
    >
      <div className="flex h-[300px] flex-col gap-y-4 p-6">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground text-lg">{plan.name}</h3>
          {yearly && plan.badge && (
            <span className="rounded-md bg-accent px-2 py-0.5 text-foreground text-xs">
              {plan.badge}
            </span>
          )}
        </div>

        {!!plan.blurb && <p className="mt-2 text-muted-foreground text-sm">{plan.blurb}</p>}

        <div className="mt-auto">
          {price ? (
            <>
              <div className="font-semibold text-[40px] text-foreground leading-none sm:text-[44px]">
                {price}
              </div>
              {!!perUnit && <div className="mt-2 text-muted-foreground text-sm">{perUnit}</div>}
            </>
          ) : (
            <>
              <div className="font-medium text-[40px] text-foreground leading-none sm:text-[44px]">
                {index === 0 ? "Free" : "Let\u2019s talk"}
              </div>
              <div className="mt-2 text-muted-foreground text-sm">
                {index === 0 ? "No credit card required" : "Contact us for details"}
              </div>
            </>
          )}
        </div>

        <Button
          variant={plan.highlight ? "default" : "outline"}
          {...(plan.ctaHref ? { render: <Link href={plan.ctaHref} /> } : {})}
        >
          {plan.ctaLabel}
        </Button>
      </div>

      <div className="border-t p-6">
        <p className="mb-4 font-medium text-foreground">
          {prevPlanName ? `Everything in ${prevPlanName}, and:` : "Features"}
        </p>
        <ul className="flex flex-col gap-y-3">
          {plan.features.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" strokeWidth={2.5} />
              <span className="font-semibold text-muted-foreground text-sm">{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </FadeIn>
  )
}

function PricingTable({ headline, subheadline, plans, className }: PricingTableProps) {
  const items = plans?.length ? plans : DEFAULT_PLANS
  const [yearly, setYearly] = useState(true)

  return (
    <section data-slot="pricing-table" className={cn("bg-background px-6 lg:px-0", className)}>
      <div className="container px-0 md:px-6">
        <div className="relative overflow-hidden">
          {headline && (
            <div className="mx-auto max-w-4xl px-6 py-12 text-center sm:px-8 sm:py-16 md:py-20">
              <h1 className="text-balance font-medium text-4xl text-foreground leading-tight tracking-tight sm:text-5xl md:text-[68px]">
                {headline}
              </h1>
              {subheadline && (
                <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
                  {subheadline}
                </p>
              )}
            </div>
          )}

          <div className="flex items-center justify-center gap-3 pb-8">
            <span className="font-semibold text-muted-foreground text-sm sm:text-base">
              Monthly
            </span>
            <Switch
              checked={yearly}
              onCheckedChange={setYearly}
              aria-label="Toggle yearly billing"
            />
            <span className={cn("font-semibold text-sm sm:text-base", yearly && "text-foreground")}>
              Yearly
            </span>
          </div>

          <div className="mx-auto max-w-7xl px-6 pb-12 sm:px-8">
            <div className="grid rounded-md border md:grid-cols-2 lg:grid-cols-3 lg:divide-x">
              {items.map((plan, i) => (
                <PricingCard
                  key={plan.name}
                  plan={plan}
                  index={i}
                  yearly={yearly}
                  prevPlanName={i > 0 ? items[i - 1].name : null}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export type { Plan, PricingTableProps }
export { PricingTable }
