"use client"

import type { ComponentProps } from "react"
import { useState } from "react"

import { Badge } from "../components/badge"
import { Button } from "../components/button"
import { Input } from "../components/input"
import { Label } from "../components/label"
import { Separator } from "../components/separator"
import { cn } from "../lib/utils"
import { SettingsLayout } from "./settings-layout"

// Settings → Integrations tab. KYT, KYC, messaging providers + outbound
// webhooks. Copy-source recipe.

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

function SettingsCard({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("overflow-hidden rounded-lg border border-border bg-card", className)}
      {...props}
    />
  )
}

function IntegrationRow({
  integration,
  onTest,
  onConfigure,
  onConnect,
}: {
  integration: Integration
  onTest?: (id: string) => void
  onConfigure?: (id: string) => void
  onConnect?: (id: string) => void
}) {
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
  integrations,
  onTest,
  onConfigure,
  onConnect,
}: {
  title: string
  description: string
  integrations: Integration[]
  onTest?: (id: string) => void
  onConfigure?: (id: string) => void
  onConnect?: (id: string) => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="font-semibold text-base">{title}</h3>
        <p className="mt-0.5 text-muted-foreground text-sm">{description}</p>
      </div>
      <SettingsCard>
        {integrations.map((integration, i) => (
          <div key={integration.id}>
            <IntegrationRow
              integration={integration}
              onTest={onTest}
              onConfigure={onConfigure}
              onConnect={onConnect}
            />
            {i < integrations.length - 1 && <Separator />}
          </div>
        ))}
      </SettingsCard>
    </div>
  )
}

type SettingsIntegrationsPageProps = {
  integrations?: Integration[]
  webhookUrl?: string
  webhookSecret?: string
  onTabChange?: (value: string) => void
  onTestIntegration?: (id: string) => void
  onConfigureIntegration?: (id: string) => void
  onConnectIntegration?: (id: string) => void
  onSaveWebhook?: (values: { url: string; secret: string }) => void
  onSendTestWebhook?: () => void
  onRotateWebhookSecret?: () => void
}

function SettingsIntegrationsPage({
  integrations = DEFAULT_INTEGRATIONS,
  webhookUrl: webhookUrlProp = "https://example.com/cogentic/events",
  webhookSecret: webhookSecretProp = "whsec_••••••••••••••••••••••••",
  onTabChange,
  onTestIntegration,
  onConfigureIntegration,
  onConnectIntegration,
  onSaveWebhook,
  onSendTestWebhook,
  onRotateWebhookSecret,
}: SettingsIntegrationsPageProps) {
  const [webhookUrl, setWebhookUrl] = useState(webhookUrlProp)
  const [webhookSecret, setWebhookSecret] = useState(webhookSecretProp)

  const kyt = integrations.filter((i) => i.kind === "kyt")
  const kyc = integrations.filter((i) => i.kind === "kyc")
  const messaging = integrations.filter((i) => i.kind === "messaging")

  return (
    <SettingsLayout activeTab="integrations" onTabChange={onTabChange}>
      <section className="flex flex-col gap-6">
        <div>
          <h2 className="font-semibold text-2xl tracking-tight">Integrations</h2>
          <p className="mt-1 text-muted-foreground text-sm">
            Connect compliance providers, messaging tools, and outbound webhooks.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          <IntegrationGroup
            title="Transaction monitoring (KYT)"
            description="Resolve risk on counterparty wallets and entities."
            integrations={kyt}
            onTest={onTestIntegration}
            onConfigure={onConfigureIntegration}
            onConnect={onConnectIntegration}
          />
          <IntegrationGroup
            title="Identity verification (KYC)"
            description="Verify counterparties for travel-rule and onboarding."
            integrations={kyc}
            onTest={onTestIntegration}
            onConfigure={onConfigureIntegration}
            onConnect={onConnectIntegration}
          />
          <IntegrationGroup
            title="Notifications & messaging"
            description="Where your team gets pinged about new alerts and reviews."
            integrations={messaging}
            onTest={onTestIntegration}
            onConfigure={onConfigureIntegration}
            onConnect={onConnectIntegration}
          />

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
      </section>
    </SettingsLayout>
  )
}

export type { Integration, IntegrationKind, IntegrationStatus, SettingsIntegrationsPageProps }
export { SettingsIntegrationsPage }
