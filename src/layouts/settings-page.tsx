"use client"

import { CreditCard, Lock, Settings as SettingsIcon, User } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"
import { useState } from "react"

import { type ApiKey, ApiKeyManager } from "../blocks/api-key-manager"
import { SettingRow } from "../blocks/setting-row"
import { SettingsCardGrid, type SettingsCardGridItem } from "../blocks/settings-card-grid"
import { type TeamMember, TeamTable } from "../blocks/team-table"
import { UsageMeter, type UsageMeterProps } from "../blocks/usage-meter"
import { Header } from "../components/header"
import { Separator } from "../components/separator"
import { Switch } from "../components/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs"
import { cn } from "../lib/utils"

// ---------------------------------------------------------------------------
// Defaults — sample data so the layout renders out-of-the-box
// ---------------------------------------------------------------------------

const DEFAULT_QUICK_ACCESS: SettingsCardGridItem[] = [
  {
    icon: <User className="size-5" />,
    title: "Profile",
    description: "Manage your personal information.",
    href: "#profile",
  },
  {
    icon: <SettingsIcon className="size-5" />,
    title: "Workspace",
    description: "Name, slug, and domain for this workspace.",
    href: "#workspace",
  },
  {
    icon: <Lock className="size-5" />,
    title: "Security",
    description: "Two-factor, SSO, and session controls.",
    href: "#security",
  },
  {
    icon: <CreditCard className="size-5" />,
    title: "Billing",
    description: "Plan, usage, and invoices.",
    href: "#billing",
  },
]

const DEFAULT_API_KEYS: ApiKey[] = [
  {
    id: "k1",
    name: "Production key",
    preview: "sk_live_…d674",
    createdAt: "2026-03-09T10:00:00Z",
    lastUsed: "2026-05-02T08:30:00Z",
    scope: "Full access",
    active: true,
  },
  {
    id: "k2",
    name: "Staging key",
    preview: "sk_test_…ab92",
    createdAt: "2026-02-14T14:20:00Z",
    lastUsed: "2026-04-30T11:14:00Z",
    scope: "Read only",
    active: true,
  },
  {
    id: "k3",
    name: "Analytics read-only",
    preview: "sk_live_…f10c",
    createdAt: "2026-01-20T09:45:00Z",
    scope: "Read only",
    active: false,
  },
]

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

type SecurityToggleId = "twoFactor" | "sso" | "sessionTimeout" | "ipAllowlist"

type SecurityState = Record<SecurityToggleId, boolean>

const DEFAULT_SECURITY: SecurityState = {
  twoFactor: true,
  sso: false,
  sessionTimeout: true,
  ipAllowlist: false,
}

// ---------------------------------------------------------------------------
// Section helper
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

// ---------------------------------------------------------------------------
// SettingsPage
// ---------------------------------------------------------------------------

type SettingsPageProps = Omit<ComponentProps<"div">, "children"> & {
  /** Title of the page header. */
  title?: ReactNode
  /** Subtitle below the title. */
  subtitle?: ReactNode
  /** Quick access cards at the top of the General tab. */
  quickAccess?: SettingsCardGridItem[]
  /** API keys shown on the General tab. Defaults to sample data. */
  apiKeys?: ApiKey[]
  /** Team members shown on the General tab. Defaults to sample data. */
  members?: TeamMember[]
  /** Usage meters shown next to Members on the General tab. Defaults to sample data. */
  usage?: UsageMeterProps[]
  /** Initial security toggle states. */
  security?: Partial<SecurityState>
  onSecurityChange?: (key: SecurityToggleId, value: boolean) => void
  onCreateApiKey?: () => void
  onRevokeApiKey?: (id: string) => void
}

function SettingsPage({
  title = "Settings",
  subtitle = "Manage your workspace, team, and billing.",
  quickAccess = DEFAULT_QUICK_ACCESS,
  apiKeys = DEFAULT_API_KEYS,
  members = DEFAULT_MEMBERS,
  usage = DEFAULT_USAGE,
  security: securityProp,
  onSecurityChange,
  onCreateApiKey,
  onRevokeApiKey,
  className,
  ...props
}: SettingsPageProps) {
  const [security, setSecurity] = useState<SecurityState>(() => {
    const merged: SecurityState = { ...DEFAULT_SECURITY }
    if (securityProp) Object.assign(merged, securityProp)
    return merged
  })

  const setToggle = (key: SecurityToggleId, value: boolean) => {
    setSecurity((s) => ({ ...s, [key]: value }))
    onSecurityChange?.(key, value)
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
            <TabsTrigger value="api-keys">API keys</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-12 pt-6">
            <Section title="Quick access" description="Jump to common settings.">
              <SettingsCardGrid items={quickAccess} columns={3} />
            </Section>

            <Section title="Security" description="Authentication and sign-in policies.">
              <div className="rounded-lg border border-border bg-card">
                <SettingRow
                  title="Two-factor authentication"
                  description="Require a verification code in addition to your password."
                  action={
                    <Switch
                      checked={security.twoFactor}
                      onCheckedChange={(v) => setToggle("twoFactor", v)}
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
                      onCheckedChange={(v) => setToggle("sso", v)}
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
                      onCheckedChange={(v) => setToggle("sessionTimeout", v)}
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
                      onCheckedChange={(v) => setToggle("ipAllowlist", v)}
                      aria-label="IP allowlist"
                    />
                  }
                />
              </div>
            </Section>

            <Section title="API keys" description="Programmatic access to your workspace.">
              <ApiKeyManager keys={apiKeys} onCreate={onCreateApiKey} onRevoke={onRevokeApiKey} />
            </Section>

            <div className="grid gap-12 lg:grid-cols-2">
              <Section
                title="Members"
                description={`${members.length} team member${members.length === 1 ? "" : "s"}.`}
              >
                <TeamTable members={members} roles={DEFAULT_ROLES} />
              </Section>

              <Section title="Usage" description="Current billing period.">
                <div className="flex flex-col gap-4">
                  {usage.map((u) => (
                    <UsageMeter key={String(u.label)} {...u} />
                  ))}
                </div>
              </Section>
            </div>
          </TabsContent>

          <TabsContent value="members" className="pt-6">
            <Section title="Members" description="Manage team access and roles.">
              <TeamTable members={members} roles={DEFAULT_ROLES} />
            </Section>
          </TabsContent>

          <TabsContent value="api-keys" className="pt-6">
            <Section title="API keys" description="Programmatic access to your workspace.">
              <ApiKeyManager keys={apiKeys} onCreate={onCreateApiKey} onRevoke={onRevokeApiKey} />
            </Section>
          </TabsContent>

          <TabsContent value="billing" className="pt-6">
            <Section title="Billing" description="Plan, usage, and invoices.">
              <div className="flex flex-col gap-4">
                {usage.map((u) => (
                  <UsageMeter key={String(u.label)} {...u} />
                ))}
              </div>
            </Section>
          </TabsContent>

          <TabsContent value="notifications" className="pt-6">
            <Section title="Notifications" description="Where and when we ping you.">
              <div className="rounded-lg border border-border bg-card p-6 text-muted-foreground text-sm">
                Notification preferences go here.
              </div>
            </Section>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export type { SecurityState, SecurityToggleId, SettingsPageProps }
export { SettingsPage }
