"use client"

import type { ComponentProps } from "react"
import { useState } from "react"

import { SettingRow } from "../blocks/setting-row"
import { UsageMeter, type UsageMeterProps } from "../blocks/usage-meter"
import { Separator } from "../components/separator"
import { Switch } from "../components/switch"
import { cn } from "../lib/utils"
import { SettingsLayout } from "./settings-layout"

// General / overview tab. Shows Security toggles + a single full-width Usage
// card. Copy-source recipe: layouts are not packaged — fork as needed.

const DEFAULT_USAGE: UsageMeterProps[] = [
  { label: "Transactions / month", used: 45_120, limit: 100_000 },
  { label: "API requests / day", used: 5_800, limit: 10_000 },
  { label: "Team members", used: 12, limit: 25 },
]

type SecurityToggleId = "twoFactor" | "sso" | "sessionTimeout" | "ipAllowlist"
type SecurityState = Record<SecurityToggleId, boolean>

const DEFAULT_SECURITY: SecurityState = {
  twoFactor: true,
  sso: false,
  sessionTimeout: true,
  ipAllowlist: false,
}

type SectionProps = ComponentProps<"section"> & {
  title: string
  description?: string
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

type SettingsPageProps = {
  usage?: UsageMeterProps[]
  security?: Partial<SecurityState>
  onSecurityChange?: (key: SecurityToggleId, value: boolean) => void
  onTabChange?: (value: string) => void
}

function SettingsPage({
  usage = DEFAULT_USAGE,
  security: securityProp,
  onSecurityChange,
  onTabChange,
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
    <SettingsLayout activeTab="general" onTabChange={onTabChange}>
      <Section title="Security" description="Authentication and sign-in policies.">
        <SettingsCard>
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
        </SettingsCard>
      </Section>

      <Section title="Usage" description="Current billing period.">
        <SettingsCard className="flex flex-col gap-5 p-6">
          {usage.map((u) => (
            <UsageMeter key={String(u.label)} {...u} />
          ))}
        </SettingsCard>
      </Section>
    </SettingsLayout>
  )
}

export type { SecurityState, SecurityToggleId, SettingsPageProps }
export { SettingsPage }
