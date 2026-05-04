"use client"

// Example: Settings → Billing tab.
//
// Shows how to compose SettingsLayout + Badge + Button + UsageMeter into
// a Plan / Payment method / Usage / Recent invoices layout. Layouts are
// not bundled — copy this file into your app and edit freely.

import { UsageMeter } from "../blocks/usage-meter"
import { Badge } from "../components/badge"
import { Button } from "../components/button"
import { Separator } from "../components/separator"
import { SettingsLayout } from "./settings-layout"

const USAGE = [
  { label: "Transactions / month", used: 45_120, limit: 100_000 },
  { label: "API requests / day", used: 5_800, limit: 10_000 },
  { label: "Team members", used: 12, limit: 25 },
]

const INVOICES = [
  { id: "INV-2026-09", date: "Sep 22, 2026", amount: "$12,000.00", status: "Paid" },
  { id: "INV-2025-09", date: "Sep 22, 2025", amount: "$12,000.00", status: "Paid" },
  { id: "INV-2024-09", date: "Sep 22, 2024", amount: "$10,000.00", status: "Paid" },
  { id: "INV-2024-Q3", date: "Jul 04, 2024", amount: "$2,400.00", status: "Refunded" },
]

export default function SettingsBillingPage() {
  return (
    <SettingsLayout activeTab="billing">
      <section className="flex flex-col gap-6">
        <div>
          <h2 className="font-semibold text-2xl tracking-tight">Plan</h2>
          <p className="mt-1 text-muted-foreground text-sm">
            Your current Cogentic plan and renewal.
          </p>
        </div>
        <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between gap-6">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-2xl tracking-tight">Compliance Pro</span>
                <Badge variant="secondary" size="sm">
                  Annual
                </Badge>
              </div>
              <p className="mt-1 text-muted-foreground text-sm">
                Renews 22 Sep 2026 · billed yearly
              </p>
            </div>
            <div className="text-right">
              <div className="font-semibold text-lg">$12,000 / year</div>
              <div className="text-muted-foreground text-sm">$1,000 / month equivalent</div>
            </div>
          </div>
          <Separator />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Change plan
            </Button>
            <Button variant="outline" size="sm">
              Cancel plan
            </Button>
            <Button size="sm" className="ml-auto">
              Upgrade
            </Button>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div>
          <h2 className="font-semibold text-2xl tracking-tight">Payment method</h2>
          <p className="mt-1 text-muted-foreground text-sm">
            Card used for renewal and overage charges.
          </p>
        </div>
        <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 pl-5">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted font-semibold text-2xs tracking-wider">
            VISA
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-medium text-sm">Visa ending in 4242</div>
            <div className="text-muted-foreground text-sm">Expires 09/2027 · Mia Kowalski</div>
          </div>
          <Button variant="outline" size="sm">
            Update
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div>
          <h2 className="font-semibold text-2xl tracking-tight">Usage</h2>
          <p className="mt-1 text-muted-foreground text-sm">Current billing period.</p>
        </div>
        <div className="flex flex-col gap-5 rounded-lg border border-border bg-card p-6">
          {USAGE.map((u) => (
            <UsageMeter key={u.label} {...u} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div>
          <h2 className="font-semibold text-2xl tracking-tight">Recent invoices</h2>
          <p className="mt-1 text-muted-foreground text-sm">Last 12 months.</p>
        </div>
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          {INVOICES.map((inv, i) => (
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
                <Button variant="outline" size="sm">
                  Download
                </Button>
              </div>
              {i < INVOICES.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </section>
    </SettingsLayout>
  )
}
