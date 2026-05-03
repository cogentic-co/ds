"use client"

import type React from "react"
import { SidebarCard, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar"
import { Code, PropTable, Row } from "./_shared"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h3 className="font-medium text-muted-foreground text-sm">{title}</h3>
      <div className="w-60 rounded-xl border border-border bg-card p-2 shadow-sm">
        <SidebarMenu>{children}</SidebarMenu>
      </div>
    </section>
  )
}

export default function SidebarCardPreview() {
  return (
    <div className="space-y-8">
      <PropTable
        title="<SidebarCard> props"
        rows={
          <>
            <Row name="reference" type="ReactNode">
              Top-line monospace reference — e.g. <Code>CASE-72</Code>.
            </Row>
            <Row name="title" type="ReactNode">
              Main label.
            </Row>
            <Row name="meta" type="ReactNode">
              Optional bottom meta line — priority, time, etc.
            </Row>
            <Row name="status" type='"online" | "offline" | "busy" | "away" | "pending"'>
              StatusIndicator variant for the leading dot. Omit for no dot.
            </Row>
            <Row name="isActive" type="boolean">
              Sets <Code>data-active</Code> for the highlighted state.
            </Row>
            <Row name="render" type="useRender.RenderProp">
              Render as another element (e.g. a Next.js <Code>Link</Code>) using Base UI's render
              pattern.
            </Row>
          </>
        }
      />

      <Section title="Case (warning / busy)">
        <SidebarMenuItem>
          <SidebarCard
            reference="CASE-72"
            title="Sanctions hit — Helix Labs"
            meta="P2 · 2d ago"
            status="busy"
          />
        </SidebarMenuItem>
      </Section>

      <Section title="Investigation (success / online)">
        <SidebarMenuItem>
          <SidebarCard
            reference="INV-2026-00098"
            title="Wallet risk — Helix Labs"
            meta="Completed · 2h ago"
            status="online"
          />
        </SidebarMenuItem>
      </Section>

      <Section title="Active state">
        <SidebarMenuItem>
          <SidebarCard
            reference="CASE-104"
            title="Document re-review"
            meta="P1 · in progress"
            status="pending"
            isActive
          />
        </SidebarMenuItem>
      </Section>

      <Section title="Stack of recent">
        <SidebarMenuItem>
          <SidebarCard
            reference="CASE-72"
            title="Sanctions hit — Helix Labs"
            meta="P2 · 2d ago"
            status="busy"
          />
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarCard
            reference="CASE-104"
            title="Document re-review"
            meta="P1 · in progress"
            status="pending"
          />
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarCard
            reference="INV-2026-00098"
            title="Wallet risk — Helix Labs"
            meta="Completed · 2h ago"
            status="online"
          />
        </SidebarMenuItem>
      </Section>

      <Section title="Without status dot">
        <SidebarMenuItem>
          <SidebarCard
            reference="REPORT-1138"
            title="Quarterly transactions summary"
            meta="Drafted · 5h ago"
          />
        </SidebarMenuItem>
      </Section>
    </div>
  )
}
