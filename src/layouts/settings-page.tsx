"use client"

// Example: Settings → General page.
//
// Shows how to compose SettingsLayout + SettingRow + Switch + UsageMeter.
// Layouts are not bundled — copy this file into your app and edit freely.

import { useState } from "react"

import { SettingRow } from "../blocks/setting-row"
import { UsageMeter } from "../blocks/usage-meter"
import { Separator } from "../components/separator"
import { Switch } from "../components/switch"
import { SettingsLayout } from "./settings-layout"

const USAGE = [
  { label: "Transactions / month", used: 45_120, limit: 100_000 },
  { label: "API requests / day", used: 5_800, limit: 10_000 },
  { label: "Team members", used: 12, limit: 25 },
]

export default function SettingsPage() {
  const [security, setSecurity] = useState({
    twoFactor: true,
    sso: false,
    sessionTimeout: true,
    ipAllowlist: false,
  })

  return (
    <SettingsLayout activeTab="general">
      <section className="flex flex-col gap-6">
        <div>
          <h2 className="font-semibold text-2xl tracking-tight">Security</h2>
          <p className="mt-1 text-muted-foreground text-sm">Authentication and sign-in policies.</p>
        </div>
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <SettingRow
            title="Two-factor authentication"
            description="Require a verification code in addition to your password."
            action={
              <Switch
                checked={security.twoFactor}
                onCheckedChange={(v) => setSecurity((s) => ({ ...s, twoFactor: v }))}
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
                onCheckedChange={(v) => setSecurity((s) => ({ ...s, sso: v }))}
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
                onCheckedChange={(v) => setSecurity((s) => ({ ...s, sessionTimeout: v }))}
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
                onCheckedChange={(v) => setSecurity((s) => ({ ...s, ipAllowlist: v }))}
                aria-label="IP allowlist"
              />
            }
          />
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
    </SettingsLayout>
  )
}
