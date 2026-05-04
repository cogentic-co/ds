"use client"

import type { ComponentProps, ReactNode } from "react"

import { UsageMeter, type UsageMeterProps } from "../blocks/usage-meter"
import { Badge } from "../components/badge"
import { Button } from "../components/button"
import { Separator } from "../components/separator"
import { cn } from "../lib/utils"
import { SettingsLayout } from "./settings-layout"

// Settings → Billing tab. Plan + payment method + usage + recent invoices.
// Copy-source recipe.

const DEFAULT_USAGE: UsageMeterProps[] = [
  { label: "Transactions / month", used: 45_120, limit: 100_000 },
  { label: "API requests / day", used: 5_800, limit: 10_000 },
  { label: "Team members", used: 12, limit: 25 },
]

type BillingPlan = {
  name: string
  price: string
  cadence: string
  renewsOn: string
  badge?: string
}

const DEFAULT_PLAN: BillingPlan = {
  name: "Compliance Pro",
  price: "$12,000 / year",
  cadence: "$1,000 / month equivalent",
  renewsOn: "Renews 22 Sep 2026 · billed yearly",
  badge: "Annual",
}

type PaymentMethod = {
  brand: string
  last4: string
  expiry: string
  holder: string
}

const DEFAULT_PAYMENT: PaymentMethod = {
  brand: "VISA",
  last4: "4242",
  expiry: "09/2027",
  holder: "Mia Kowalski",
}

type Invoice = {
  id: string
  date: string
  amount: string
  status: "Paid" | "Refunded" | "Open" | "Void"
}

const DEFAULT_INVOICES: Invoice[] = [
  { id: "INV-2026-09", date: "Sep 22, 2026", amount: "$12,000.00", status: "Paid" },
  { id: "INV-2025-09", date: "Sep 22, 2025", amount: "$12,000.00", status: "Paid" },
  { id: "INV-2024-09", date: "Sep 22, 2024", amount: "$10,000.00", status: "Paid" },
  { id: "INV-2024-Q3", date: "Jul 04, 2024", amount: "$2,400.00", status: "Refunded" },
]

type SectionProps = ComponentProps<"section"> & {
  title: ReactNode
  description?: ReactNode
}

function Section({ title, description, className, children, ...props }: SectionProps) {
  return (
    <section className={cn("flex flex-col gap-6", className)} {...props}>
      <div>
        <h2 className="font-semibold text-2xl tracking-tight">{title}</h2>
        {description && <p className="mt-1 text-muted-foreground text-sm">{description}</p>}
      </div>
      {children}
    </section>
  )
}

function SettingsCard({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("overflow-hidden rounded-lg border border-border bg-card", className)}
      {...props}
    />
  )
}

type SettingsBillingPageProps = {
  plan?: BillingPlan
  payment?: PaymentMethod
  usage?: UsageMeterProps[]
  invoices?: Invoice[]
  onTabChange?: (value: string) => void
  onChangePlan?: () => void
  onCancelPlan?: () => void
  onUpgradePlan?: () => void
  onUpdatePayment?: () => void
  onDownloadInvoice?: (id: string) => void
}

function SettingsBillingPage({
  plan = DEFAULT_PLAN,
  payment = DEFAULT_PAYMENT,
  usage = DEFAULT_USAGE,
  invoices = DEFAULT_INVOICES,
  onTabChange,
  onChangePlan,
  onCancelPlan,
  onUpgradePlan,
  onUpdatePayment,
  onDownloadInvoice,
}: SettingsBillingPageProps) {
  return (
    <SettingsLayout activeTab="billing" onTabChange={onTabChange}>
      <Section title="Plan" description="Your current Cogentic plan and renewal.">
        <SettingsCard className="flex flex-col gap-4 p-6">
          <div className="flex items-center justify-between gap-6">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-2xl tracking-tight">{plan.name}</span>
                {plan.badge && (
                  <Badge variant="secondary" size="sm">
                    {plan.badge}
                  </Badge>
                )}
              </div>
              <p className="mt-1 text-muted-foreground text-sm">{plan.renewsOn}</p>
            </div>
            <div className="text-right">
              <div className="font-semibold text-lg">{plan.price}</div>
              <div className="text-muted-foreground text-sm">{plan.cadence}</div>
            </div>
          </div>
          <Separator />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onChangePlan}>
              Change plan
            </Button>
            <Button variant="outline" size="sm" onClick={onCancelPlan}>
              Cancel plan
            </Button>
            <Button size="sm" className="ml-auto" onClick={onUpgradePlan}>
              Upgrade
            </Button>
          </div>
        </SettingsCard>
      </Section>

      <Section title="Payment method" description="Card used for renewal and overage charges.">
        <SettingsCard className="flex items-center gap-4 p-4 pl-5">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted font-semibold text-2xs tracking-wider">
            {payment.brand}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-medium text-sm">
              {payment.brand[0] + payment.brand.slice(1).toLowerCase()} ending in {payment.last4}
            </div>
            <div className="text-muted-foreground text-sm">
              Expires {payment.expiry} · {payment.holder}
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onUpdatePayment}>
            Update
          </Button>
        </SettingsCard>
      </Section>

      <Section title="Usage" description="Current billing period.">
        <SettingsCard className="flex flex-col gap-5 p-6">
          {usage.map((u) => (
            <UsageMeter key={String(u.label)} {...u} />
          ))}
        </SettingsCard>
      </Section>

      <Section title="Recent invoices" description="Last 12 months.">
        <SettingsCard>
          {invoices.map((inv, i) => (
            <div key={inv.id}>
              <div className="flex items-center gap-4 px-5 py-3.5">
                <div className="min-w-0 flex-1">
                  <div className="font-medium font-mono text-sm">{inv.id}</div>
                  <div className="text-muted-foreground text-xs">{inv.date}</div>
                </div>
                <div className="font-mono text-sm tabular-nums">{inv.amount}</div>
                <Badge variant="secondary" size="sm">
                  {inv.status}
                </Badge>
                <Button variant="outline" size="sm" onClick={() => onDownloadInvoice?.(inv.id)}>
                  Download
                </Button>
              </div>
              {i < invoices.length - 1 && <Separator />}
            </div>
          ))}
        </SettingsCard>
      </Section>
    </SettingsLayout>
  )
}

export type { BillingPlan, Invoice, PaymentMethod, SettingsBillingPageProps }
export { SettingsBillingPage }
