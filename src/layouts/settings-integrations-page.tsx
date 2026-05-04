"use client"

// Example: Settings → Integrations tab.
//
// Shows how to compose SettingsLayout + Item + Badge + Button to build a
// list of KYT / KYC / messaging providers, plus a webhook config form.
// Layouts are not bundled — copy this file into your app and edit freely.

import { useState } from "react"

import { Badge } from "../components/badge"
import { Button } from "../components/button"
import { Input } from "../components/input"
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "../components/item"
import { Label } from "../components/label"
import { Separator } from "../components/separator"
import { SettingsLayout } from "./settings-layout"

type Integration = {
  id: string
  kind: "kyt" | "kyc" | "messaging"
  name: string
  description: string
  status: "connected" | "not-connected"
}

const INTEGRATIONS: Integration[] = [
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

function IntegrationItem({ integration }: { integration: Integration }) {
  const isConnected = integration.status === "connected"
  return (
    <Item data-slot="integration-row" data-status={integration.status} variant="default" size="sm">
      <ItemContent>
        <div className="flex items-center gap-2">
          <ItemTitle className="font-medium">{integration.name}</ItemTitle>
          <Badge variant={isConnected ? "mint" : "secondary"} size="sm">
            {isConnected ? "Connected" : "Not connected"}
          </Badge>
        </div>
        <ItemDescription className="font-mono text-xs">{integration.description}</ItemDescription>
      </ItemContent>
      <ItemActions>
        {isConnected && (
          <Button variant="outline" size="sm">
            Test
          </Button>
        )}
        <Button size="sm">{isConnected ? "Configure" : "Connect"}</Button>
      </ItemActions>
    </Item>
  )
}

function IntegrationGroup({
  title,
  description,
  items,
}: {
  title: string
  description: string
  items: Integration[]
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="font-semibold text-base">{title}</h3>
        <p className="mt-0.5 text-muted-foreground text-sm">{description}</p>
      </div>
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        {items.map((it, i) => (
          <div key={it.id}>
            <IntegrationItem integration={it} />
            {i < items.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SettingsIntegrationsPage() {
  const [webhookUrl, setWebhookUrl] = useState("https://example.com/cogentic/events")
  const [webhookSecret, setWebhookSecret] = useState("whsec_••••••••••••••••••••••••")

  const kyt = INTEGRATIONS.filter((i) => i.kind === "kyt")
  const kyc = INTEGRATIONS.filter((i) => i.kind === "kyc")
  const messaging = INTEGRATIONS.filter((i) => i.kind === "messaging")

  return (
    <SettingsLayout activeTab="integrations">
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
            items={kyt}
          />
          <IntegrationGroup
            title="Identity verification (KYC)"
            description="Verify counterparties for travel-rule and onboarding."
            items={kyc}
          />
          <IntegrationGroup
            title="Notifications & messaging"
            description="Where your team gets pinged about new alerts and reviews."
            items={messaging}
          />

          {/* Outbound webhooks */}
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="font-semibold text-base">Outbound webhooks</h3>
              <p className="mt-0.5 text-muted-foreground text-sm">
                Stream events to your own endpoint for archival and downstream processing.
              </p>
            </div>
            <div className="flex flex-col gap-5 rounded-lg border border-border bg-card p-6">
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
                <Button variant="outline" size="sm">
                  Send test event
                </Button>
                <Button variant="outline" size="sm">
                  Rotate secret
                </Button>
                <Button size="sm" className="ml-auto">
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SettingsLayout>
  )
}
