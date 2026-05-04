"use client"

import { Bell, Mail, MessageSquare } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"
import { useState } from "react"

import { SettingRow } from "../blocks/setting-row"
import { Separator } from "../components/separator"
import { Switch } from "../components/switch"
import { cn } from "../lib/utils"
import { SettingsLayout } from "./settings-layout"

// Settings → Notifications tab. Channels + Event types + Quiet hours.
// Copy-source recipe.

type NotificationChannelId = "email" | "slack" | "inApp"
type NotificationEventId =
  | "criticalAlerts"
  | "sanctionsHits"
  | "thresholdCrossings"
  | "dailySummary"
  | "weeklyDigest"
type NotificationToggleId = NotificationChannelId | NotificationEventId | "quietHours"

type NotificationsState = Record<NotificationToggleId, boolean>

const DEFAULT_NOTIFICATIONS: NotificationsState = {
  email: true,
  slack: true,
  inApp: true,
  criticalAlerts: true,
  sanctionsHits: true,
  thresholdCrossings: true,
  dailySummary: true,
  weeklyDigest: false,
  quietHours: false,
}

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

type SettingsNotificationsPageProps = {
  notifications?: Partial<NotificationsState>
  onTabChange?: (value: string) => void
  onChange?: (key: NotificationToggleId, value: boolean) => void
}

function SettingsNotificationsPage({
  notifications: notificationsProp,
  onTabChange,
  onChange,
}: SettingsNotificationsPageProps) {
  const [notifications, setNotifications] = useState<NotificationsState>(() => {
    const merged: NotificationsState = { ...DEFAULT_NOTIFICATIONS }
    if (notificationsProp) Object.assign(merged, notificationsProp)
    return merged
  })

  const setToggle = (key: NotificationToggleId, value: boolean) => {
    setNotifications((s) => ({ ...s, [key]: value }))
    onChange?.(key, value)
  }

  return (
    <SettingsLayout activeTab="notifications" onTabChange={onTabChange}>
      <Section title="Channels" description="Where notifications are delivered when they fire.">
        <SettingsCard>
          <SettingRow
            icon={<Mail className="size-4" />}
            title="Email"
            description="Send to your verified workspace email."
            action={
              <Switch
                checked={notifications.email}
                onCheckedChange={(v) => setToggle("email", v)}
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
                checked={notifications.slack}
                onCheckedChange={(v) => setToggle("slack", v)}
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
                checked={notifications.inApp}
                onCheckedChange={(v) => setToggle("inApp", v)}
                aria-label="In-app notifications"
              />
            }
          />
        </SettingsCard>
      </Section>

      <Section title="Event types" description="Pick which events trigger a notification.">
        <SettingsCard>
          <SettingRow
            title="Critical alerts"
            description="Immediately notify on sanctions hits and high-risk transactions."
            action={
              <Switch
                checked={notifications.criticalAlerts}
                onCheckedChange={(v) => setToggle("criticalAlerts", v)}
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
                checked={notifications.sanctionsHits}
                onCheckedChange={(v) => setToggle("sanctionsHits", v)}
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
                checked={notifications.thresholdCrossings}
                onCheckedChange={(v) => setToggle("thresholdCrossings", v)}
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
                checked={notifications.dailySummary}
                onCheckedChange={(v) => setToggle("dailySummary", v)}
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
                checked={notifications.weeklyDigest}
                onCheckedChange={(v) => setToggle("weeklyDigest", v)}
                aria-label="Weekly digest"
              />
            }
          />
        </SettingsCard>
      </Section>

      <Section
        title="Quiet hours"
        description="Hold non-critical notifications outside business hours."
      >
        <SettingsCard>
          <SettingRow
            title="Pause non-critical alerts"
            description="Critical alerts and sanctions hits always come through."
            action={
              <Switch
                checked={notifications.quietHours}
                onCheckedChange={(v) => setToggle("quietHours", v)}
                aria-label="Quiet hours"
              />
            }
          />
        </SettingsCard>
      </Section>
    </SettingsLayout>
  )
}

export type {
  NotificationChannelId,
  NotificationEventId,
  NotificationsState,
  NotificationToggleId,
  SettingsNotificationsPageProps,
}
export { SettingsNotificationsPage }
