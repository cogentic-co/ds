"use client"

import { Badge } from "@/components/ui/badge"
import { EntityHeader } from "@/components/ui/entity-header"
import { type ControlDefs, Playground, useControls } from "./_shared"

const entityHeaderControlDefs = {
  size: {
    type: "radio" as const,
    options: ["sm", "default", "lg"],
    defaultValue: "default",
    label: "Size",
  },
  name: {
    type: "text" as const,
    defaultValue: "Acme Corporation",
    label: "Name",
  },
  subtitle: {
    type: "text" as const,
    defaultValue: "Also known as Acme Inc",
    label: "Subtitle",
  },
  description: {
    type: "text" as const,
    defaultValue: "A leading financial services provider specialising in cross-border payments.",
    label: "Description",
  },
} satisfies ControlDefs

export default function EntityHeaderPreview() {
  const controls = useControls(entityHeaderControlDefs)
  const { size, name, subtitle, description } = controls.values

  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <EntityHeader
          size={size as "default"}
          name={name as string}
          subtitle={subtitle as string}
          description={description as string}
          meta={[
            { text: "Singapore", icon: "🇸🇬" },
            { text: "example.com", href: "https://example.com", external: true },
          ]}
          rightCol={<Badge variant="secondary">Active</Badge>}
        />
      </Playground>

      {/* With logo */}
      <EntityHeader
        name="Example Bank"
        subtitle="Licensed Virtual Asset Service Provider"
        logoUrl="https://placehold.co/48x48/1a1a2e/ffffff?text=EB"
        meta={[{ text: "Hong Kong", icon: "🇭🇰" }, { text: "Tier 1" }]}
      />

      {/* With emoji */}
      <EntityHeader name="DeFi Protocol" emoji="🔗" size="sm" meta={[{ text: "Decentralised" }]} />
    </div>
  )
}
