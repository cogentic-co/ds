"use client"

// Example: Settings → Notifications tab.
//
// Shows how to compose SettingsLayout + SettingRow + Switch into Channels +
// Event types + Quiet hours sections. Layouts are not bundled — copy this
// file into your app and edit freely.

import { Bell, Mail, MessageSquare } from "lucide-react"
import { useState } from "react"

import { SettingRow } from "../blocks/setting-row"
import { Separator } from "../components/separator"
import { Switch } from "../components/switch"
import { SettingsLayout } from "./settings-layout"

export default function SettingsNotificationsPage() {
  const [n, setN] = useState({
    email: true,
    slack: true,
    inApp: true,
    criticalAlerts: true,
    sanctionsHits: true,
    thresholdCrossings: true,
    dailySummary: true,
    weeklyDigest: false,
    quietHours: false,
  })

  function toggle<K extends keyof typeof n>(key: K, value: boolean) {
    setN((s) => ({ ...s, [key]: value }))
  }

  return (
    <SettingsLayout activeTab="notifications">
      <section className="flex flex-col gap-6">
        <div>
          <h2 className="font-semibold text-2xl tracking-tight">Channels</h2>
          <p className="mt-1 text-muted-foreground text-sm">
            Where notifications are delivered when they fire.
          </p>
        </div>
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <SettingRow
            icon={<Mail className="size-4" />}
            title="Email"
            description="Send to your verified workspace email."
            action={
              <Switch
                checked={n.email}
                onCheckedChange={(v) => toggle("email", v)}
                aria-label="Email notifications"
              />
            }
          />
          <Separator />
          <SettingRow
            icon={<MessageSquare className="size-4" />}
            title="Slack"
            description="Post to the connected Slack channel."
            action={
              <Switch
                checked={n.slack}
                onCheckedChange={(v) => toggle("slack", v)}
                aria-label="Slack notifications"
              />
            }
          />
          <Separator />
          <SettingRow
            icon={<Bell className="size-4" />}
            title="In-app"
            description="Show alerts in the notification center."
            action={
              <Switch
                checked={n.inApp}
                onCheckedChange={(v) => toggle("inApp", v)}
                aria-label="In-app notifications"
              />
            }
          />
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div>
          <h2 className="font-semibold text-2xl tracking-tight">Event types</h2>
          <p className="mt-1 text-muted-foreground text-sm">
            Pick which events trigger a notification.
          </p>
        </div>
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <SettingRow
            title="Critical alerts"
            description="Immediately notify on sanctions hits and high-risk transactions."
            action={
              <Switch
                checked={n.criticalAlerts}
                onCheckedChange={(v) => toggle("criticalAlerts", v)}
                aria-label="Critical alerts"
              />
            }
          />
          <Separator />
          <SettingRow
            title="Sanctions hits"
            description="Any direct or 1-hop counterparty match on watchlists."
            action={
              <Switch
                checked={n.sanctionsHits}
                onCheckedChange={(v) => toggle("sanctionsHits", v)}
                aria-label="Sanctions hits"
              />
            }
          />
          <Separator />
          <SettingRow
            title="Threshold crossings"
            description="Transactions that cross your configured value or risk thresholds."
            action={
              <Switch
                checked={n.thresholdCrossings}
                onCheckedChange={(v) => toggle("thresholdCrossings", v)}
                aria-label="Threshold crossings"
              />
            }
          />
          <Separator />
          <SettingRow
            title="Daily summary"
            description="One email each morning with yesterday's queue and outcomes."
            action={
              <Switch
                checked={n.dailySummary}
                onCheckedChange={(v) => toggle("dailySummary", v)}
                aria-label="Daily summary"
              />
            }
          />
          <Separator />
          <SettingRow
            title="Weekly digest"
            description="Volume, risk-mix, and SLA trends — Mondays."
            action={
              <Switch
                checked={n.weeklyDigest}
                onCheckedChange={(v) => toggle("weeklyDigest", v)}
                aria-label="Weekly digest"
              />
            }
          />
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div>
          <h2 className="font-semibold text-2xl tracking-tight">Quiet hours</h2>
          <p className="mt-1 text-muted-foreground text-sm">
            Hold non-critical notifications outside business hours.
          </p>
        </div>
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <SettingRow
            title="Pause non-critical alerts"
            description="Critical alerts and sanctions hits always come through."
            action={
              <Switch
                checked={n.quietHours}
                onCheckedChange={(v) => toggle("quietHours", v)}
                aria-label="Quiet hours"
              />
            }
          />
        </div>
      </section>
    </SettingsLayout>
  )
}
