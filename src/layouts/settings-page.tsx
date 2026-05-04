"use client"

import { Bell, Mail, MessageSquare } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"
import { useState } from "react"

import { SettingRow } from "../blocks/setting-row"
import { type TeamMember, TeamTable } from "../blocks/team-table"
import { UsageMeter, type UsageMeterProps } from "../blocks/usage-meter"
import { Badge } from "../components/badge"
import { Button } from "../components/button"
import { Header } from "../components/header"
import { Input } from "../components/input"
import { Label } from "../components/label"
import { Separator } from "../components/separator"
import { Switch } from "../components/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs"
import { cn } from "../lib/utils"

// ---------------------------------------------------------------------------
// Defaults — sample data so the layout renders out-of-the-box
// ---------------------------------------------------------------------------

const DEFAULT_MEMBERS: TeamMember[] = [
  {
    id: "u1",
    name: "Mia Kowalski",
    email: "mia@cogentic.co",
    role: "Compliance Lead",
    status: "active",
  },
  {
    id: "u2",
    name: "Sam Takeda",
    email: "sam@cogentic.co",
    role: "Compliance Lead",
    status: "active",
  },
  {
    id: "u3",
    name: "Priya Raj",
    email: "priya@cogentic.co",
    role: "Compliance Lead",
    status: "invited",
  },
  {
    id: "u4",
    name: "Alex Chen",
    email: "alex@cogentic.co",
    role: "Compliance Lead",
    status: "active",
  },
]

const DEFAULT_USAGE: UsageMeterProps[] = [
  { label: "Transactions / month", used: 45_120, limit: 100_000 },
  { label: "API requests / day", used: 5_800, limit: 10_000 },
  { label: "Team members", used: 12, limit: 25 },
]

const DEFAULT_ROLES = [
  { value: "owner", label: "Owner" },
  { value: "admin", label: "Admin" },
  { value: "member", label: "Member" },
]

// Security ------------------------------------------------------------------

type SecurityToggleId = "twoFactor" | "sso" | "sessionTimeout" | "ipAllowlist"
type SecurityState = Record<SecurityToggleId, boolean>

const DEFAULT_SECURITY: SecurityState = {
  twoFactor: true,
  sso: false,
  sessionTimeout: true,
  ipAllowlist: false,
}

// Integrations --------------------------------------------------------------

type IntegrationKind = "kyt" | "kyc" | "messaging"
type IntegrationStatus = "connected" | "not-connected"

type Integration = {
  id: string
  kind: IntegrationKind
  name: string
  description: string
  status: IntegrationStatus
}

const DEFAULT_INTEGRATIONS: Integration[] = [
  // KYT
  {
    id: "trm",
    kind: "kyt",
    name: "TRM Labs",
    description: "Wallet screening, risk scoring, sanctions exposure.",
    status: "connected",
  },
  {
    id: "chainalysis",
    kind: "kyt",
    name: "Chainalysis",
    description: "KYT API for transaction risk and entity attribution.",
    status: "not-connected",
  },
  {
    id: "elliptic",
    kind: "kyt",
    name: "Elliptic",
    description: "Sanctions screening, blockchain analytics.",
    status: "not-connected",
  },
  // KYC
  {
    id: "sumsub",
    kind: "kyc",
    name: "Sumsub",
    description: "Document verification, liveness, sanctions screening.",
    status: "connected",
  },
  {
    id: "persona",
    kind: "kyc",
    name: "Persona",
    description: "Modular KYC flows with trust signals.",
    status: "not-connected",
  },
  {
    id: "onfido",
    kind: "kyc",
    name: "Onfido",
    description: "Identity & document verification.",
    status: "not-connected",
  },
  // Messaging
  {
    id: "slack",
    kind: "messaging",
    name: "Slack",
    description: "Channel notifications and slash-commands.",
    status: "connected",
  },
  {
    id: "teams",
    kind: "messaging",
    name: "Microsoft Teams",
    description: "Channel notifications via webhook.",
    status: "not-connected",
  },
  {
    id: "email",
    kind: "messaging",
    name: "Email",
    description: "Daily digest and per-event email alerts.",
    status: "connected",
  },
]

// Notifications -------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Section / Card helpers
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Integration row — mirrors the Figma "API Key Row" pattern: title + status
// badge + description + Test/Configure (or Connect) action.
// ---------------------------------------------------------------------------

type IntegrationRowProps = {
  integration: Integration
  onTest?: (id: string) => void
  onConfigure?: (id: string) => void
  onConnect?: (id: string) => void
}

function IntegrationRow({ integration, onTest, onConfigure, onConnect }: IntegrationRowProps) {
  const isConnected = integration.status === "connected"
  return (
    <div
      data-slot="integration-row"
      data-status={integration.status}
      className="flex items-center gap-4 px-5 py-4"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">{integration.name}</span>
          <Badge variant={isConnected ? "mint" : "secondary"} size="sm">
            {isConnected ? "Connected" : "Not connected"}
          </Badge>
        </div>
        <p className="mt-1 font-mono text-muted-foreground text-xs">{integration.description}</p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {isConnected && (
          <Button variant="outline" size="sm" onClick={() => onTest?.(integration.id)}>
            Test
          </Button>
        )}
        <Button
          size="sm"
          onClick={() =>
            isConnected ? onConfigure?.(integration.id) : onConnect?.(integration.id)
          }
        >
          {isConnected ? "Configure" : "Connect"}
        </Button>
      </div>
    </div>
  )
}

function IntegrationGroup({
  title,
  description,
  rows,
}: {
  title: ReactNode
  description: ReactNode
  rows: ReactNode
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="font-semibold text-base">{title}</h3>
        <p className="mt-0.5 text-muted-foreground text-sm">{description}</p>
      </div>
      <SettingsCard>{rows}</SettingsCard>
    </div>
  )
}

// ---------------------------------------------------------------------------
// SettingsPage
// ---------------------------------------------------------------------------

type SettingsPageProps = Omit<ComponentProps<"div">, "children"> & {
  title?: ReactNode
  subtitle?: ReactNode
  members?: TeamMember[]
  usage?: UsageMeterProps[]
  integrations?: Integration[]
  security?: Partial<SecurityState>
  notifications?: Partial<NotificationsState>
  onSecurityChange?: (key: SecurityToggleId, value: boolean) => void
  onNotificationChange?: (key: NotificationToggleId, value: boolean) => void
  onTestIntegration?: (id: string) => void
  onConfigureIntegration?: (id: string) => void
  onConnectIntegration?: (id: string) => void
  /** Initial outbound webhook URL */
  webhookUrl?: string
  /** Initial outbound webhook signing secret (display-only) */
  webhookSecret?: string
  onSaveWebhook?: (values: { url: string; secret: string }) => void
  onSendTestWebhook?: () => void
  onRotateWebhookSecret?: () => void
}

function SettingsPage({
  title = "Settings",
  subtitle = "Manage your workspace, team, billing, and integrations.",
  members = DEFAULT_MEMBERS,
  usage = DEFAULT_USAGE,
  integrations = DEFAULT_INTEGRATIONS,
  security: securityProp,
  notifications: notificationsProp,
  onSecurityChange,
  onNotificationChange,
  onTestIntegration,
  onConfigureIntegration,
  onConnectIntegration,
  webhookUrl: webhookUrlProp = "https://example.com/cogentic/events",
  webhookSecret: webhookSecretProp = "whsec_••••••••••••••••••••••••",
  onSaveWebhook,
  onSendTestWebhook,
  onRotateWebhookSecret,
  className,
  ...props
}: SettingsPageProps) {
  const [security, setSecurity] = useState<SecurityState>(() => {
    const merged: SecurityState = { ...DEFAULT_SECURITY }
    if (securityProp) Object.assign(merged, securityProp)
    return merged
  })
  const [notifications, setNotifications] = useState<NotificationsState>(() => {
    const merged: NotificationsState = { ...DEFAULT_NOTIFICATIONS }
    if (notificationsProp) Object.assign(merged, notificationsProp)
    return merged
  })
  const [webhookUrl, setWebhookUrl] = useState(webhookUrlProp)
  const [webhookSecret, setWebhookSecret] = useState(webhookSecretProp)

  const setSecurityToggle = (key: SecurityToggleId, value: boolean) => {
    setSecurity((s) => ({ ...s, [key]: value }))
    onSecurityChange?.(key, value)
  }
  const setNotificationToggle = (key: NotificationToggleId, value: boolean) => {
    setNotifications((s) => ({ ...s, [key]: value }))
    onNotificationChange?.(key, value)
  }

  // Group integrations by kind for the Integrations tab
  const kytIntegrations = integrations.filter((i) => i.kind === "kyt")
  const kycIntegrations = integrations.filter((i) => i.kind === "kyc")
  const messagingIntegrations = integrations.filter((i) => i.kind === "messaging")

  function renderIntegrationRows(items: Integration[]) {
    return items.map((integration, i) => (
      <div key={integration.id}>
        <IntegrationRow
          integration={integration}
          onTest={onTestIntegration}
          onConfigure={onConfigureIntegration}
          onConnect={onConnectIntegration}
        />
        {i < items.length - 1 && <Separator />}
      </div>
    ))
  }

  return (
    <div
      data-slot="settings-page"
      className={cn("flex min-h-svh flex-col bg-background", className)}
      {...props}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-12 py-10">
        <Header title={title} subtitle={subtitle} size="lg" />

        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* General ------------------------------------------------------ */}
          <TabsContent value="general" className="space-y-12 pt-6">
            <Section title="Security" description="Authentication and sign-in policies.">
              <SettingsCard>
                <SettingRow
                  title="Two-factor authentication"
                  description="Require a verification code in addition to your password."
                  action={
                    <Switch
                      checked={security.twoFactor}
                      onCheckedChange={(v) => setSecurityToggle("twoFactor", v)}
                      aria-label="Two-factor authentication"
                    />
                  }
                />
                <Separator />
                <SettingRow
                  title="Single sign-on (SSO)"
                  description="Let team members sign in with your identity provider."
                  action={
                    <Switch
                      checked={security.sso}
                      onCheckedChange={(v) => setSecurityToggle("sso", v)}
                      aria-label="Single sign-on"
                    />
                  }
                />
                <Separator />
                <SettingRow
                  title="Session timeout"
                  description="Automatically sign out after 30 minutes of inactivity."
                  action={
                    <Switch
                      checked={security.sessionTimeout}
                      onCheckedChange={(v) => setSecurityToggle("sessionTimeout", v)}
                      aria-label="Session timeout"
                    />
                  }
                />
                <Separator />
                <SettingRow
                  title="IP allowlist"
                  description="Restrict access to specific IP ranges."
                  action={
                    <Switch
                      checked={security.ipAllowlist}
                      onCheckedChange={(v) => setSecurityToggle("ipAllowlist", v)}
                      aria-label="IP allowlist"
                    />
                  }
                />
              </SettingsCard>
            </Section>

            <Section title="Usage" description="Current billing period.">
              <SettingsCard className="flex flex-col gap-5 p-6">
                {usage.map((u) => (
                  <UsageMeter key={String(u.label)} {...u} />
                ))}
              </SettingsCard>
            </Section>
          </TabsContent>

          {/* Members ------------------------------------------------------ */}
          <TabsContent value="members" className="pt-6">
            <Section title="Members" description="Manage team access and roles.">
              <TeamTable members={members} roles={DEFAULT_ROLES} />
            </Section>
          </TabsContent>

          {/* Integrations ------------------------------------------------- */}
          <TabsContent value="integrations" className="space-y-12 pt-6">
            <Section
              title="Integrations"
              description="Connect compliance providers, messaging tools, and outbound webhooks."
            >
              <div className="flex flex-col gap-10">
                <IntegrationGroup
                  title="Transaction monitoring (KYT)"
                  description="Resolve risk on counterparty wallets and entities."
                  rows={renderIntegrationRows(kytIntegrations)}
                />
                <IntegrationGroup
                  title="Identity verification (KYC)"
                  description="Verify counterparties for travel-rule and onboarding."
                  rows={renderIntegrationRows(kycIntegrations)}
                />
                <IntegrationGroup
                  title="Notifications & messaging"
                  description="Where your team gets pinged about new alerts and reviews."
                  rows={renderIntegrationRows(messagingIntegrations)}
                />

                {/* Outbound webhooks */}
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="font-semibold text-base">Outbound webhooks</h3>
                    <p className="mt-0.5 text-muted-foreground text-sm">
                      Stream events to your own endpoint for archival and downstream processing.
                    </p>
                  </div>
                  <SettingsCard className="flex flex-col gap-5 p-6">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="settings-webhook-url">Webhook URL</Label>
                      <Input
                        id="settings-webhook-url"
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                        className="font-mono text-xs"
                      />
                      <p className="text-muted-foreground text-xs">
                        POST endpoint that receives event payloads.
                      </p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="settings-webhook-secret">Signing secret</Label>
                      <Input
                        id="settings-webhook-secret"
                        value={webhookSecret}
                        onChange={(e) => setWebhookSecret(e.target.value)}
                        className="font-mono text-xs"
                      />
                      <p className="text-muted-foreground text-xs">
                        Used to sign payloads — verify with HMAC-SHA256.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={onSendTestWebhook}>
                        Send test event
                      </Button>
                      <Button variant="outline" size="sm" onClick={onRotateWebhookSecret}>
                        Rotate secret
                      </Button>
                      <Button
                        size="sm"
                        className="ml-auto"
                        onClick={() => onSaveWebhook?.({ url: webhookUrl, secret: webhookSecret })}
                      >
                        Save
                      </Button>
                    </div>
                  </SettingsCard>
                </div>
              </div>
            </Section>
          </TabsContent>

          {/* Billing ------------------------------------------------------ */}
          <TabsContent value="billing" className="pt-6">
            <Section title="Billing" description="Plan, usage, and invoices.">
              <SettingsCard className="flex flex-col gap-5 p-6">
                {usage.map((u) => (
                  <UsageMeter key={String(u.label)} {...u} />
                ))}
              </SettingsCard>
            </Section>
          </TabsContent>

          {/* Notifications ------------------------------------------------ */}
          <TabsContent value="notifications" className="space-y-12 pt-6">
            <Section
              title="Channels"
              description="Where notifications are delivered when they fire."
            >
              <SettingsCard>
                <SettingRow
                  icon={<Mail className="size-4" />}
                  title="Email"
                  description="Send to your verified workspace email."
                  action={
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(v) => setNotificationToggle("email", v)}
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
                      onCheckedChange={(v) => setNotificationToggle("slack", v)}
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
                      onCheckedChange={(v) => setNotificationToggle("inApp", v)}
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
                      onCheckedChange={(v) => setNotificationToggle("criticalAlerts", v)}
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
                      onCheckedChange={(v) => setNotificationToggle("sanctionsHits", v)}
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
                      onCheckedChange={(v) => setNotificationToggle("thresholdCrossings", v)}
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
                      onCheckedChange={(v) => setNotificationToggle("dailySummary", v)}
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
                      onCheckedChange={(v) => setNotificationToggle("weeklyDigest", v)}
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
                      onCheckedChange={(v) => setNotificationToggle("quietHours", v)}
                      aria-label="Quiet hours"
                    />
                  }
                />
              </SettingsCard>
            </Section>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export type {
  Integration,
  IntegrationKind,
  IntegrationStatus,
  NotificationsState,
  NotificationToggleId,
  SecurityState,
  SecurityToggleId,
  SettingsPageProps,
}
export { SettingsPage }
