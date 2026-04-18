"use client"

import { KeyValueList } from "@/components/ui/key-value-list"
import { Section } from "./_shared"

export default function KeyValueListPreview() {
  const items = [
    { label: "Hash", value: "0x9f3b…678", mono: true },
    { label: "Block", value: "21,394,012", mono: true },
    { label: "Confirmations", value: "18", mono: true },
    { label: "Network", value: "ETH · chain 1" },
    { label: "Gas used", value: "42,800", mono: true },
  ]

  return (
    <div className="space-y-8">
      <Section title="Default (bordered)">
        <div className="max-w-md">
          <KeyValueList items={items} />
        </div>
      </Section>

      <Section title="Borderless">
        <div className="max-w-md">
          <KeyValueList items={items} bordered={false} />
        </div>
      </Section>
    </div>
  )
}
