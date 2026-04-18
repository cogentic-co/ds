"use client"

import { StatusPill } from "@/components/ui/status-pill"
import { AlertTriangle, Check, Clock, X } from "lucide-react"
import { Section } from "./_shared"

export default function StatusPillPreview() {
  return (
    <div className="space-y-8">
      <Section title="Variants">
        <div className="flex flex-wrap gap-2">
          <StatusPill variant="neutral">Neutral</StatusPill>
          <StatusPill variant="mint">Mint</StatusPill>
          <StatusPill variant="sky">Sky</StatusPill>
          <StatusPill variant="blush">Blush</StatusPill>
          <StatusPill variant="lilac">Lilac</StatusPill>
          <StatusPill variant="highlight">Highlight</StatusPill>
        </div>
      </Section>

      <Section title="Sizes">
        <div className="flex flex-wrap items-center gap-2">
          <StatusPill size="sm" variant="mint">
            Small
          </StatusPill>
          <StatusPill variant="mint">Default</StatusPill>
          <StatusPill size="lg" variant="mint">
            Large
          </StatusPill>
        </div>
      </Section>

      <Section title="With icons">
        <div className="flex flex-wrap gap-2">
          <StatusPill variant="mint">
            <Check /> Verified
          </StatusPill>
          <StatusPill variant="highlight">
            <AlertTriangle /> Needs review
          </StatusPill>
          <StatusPill variant="blush">
            <X /> Blocked
          </StatusPill>
          <StatusPill variant="neutral">
            <Clock /> Pending
          </StatusPill>
        </div>
      </Section>
    </div>
  )
}
