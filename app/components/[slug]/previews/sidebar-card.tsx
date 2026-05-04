"use client"

import type React from "react"
import { SidebarCard, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar"
import { Code, type ControlDefs, Playground, PropTable, Row, useControls } from "./_shared"

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

const sidebarCardControlDefs = {
  reference: { type: "text", defaultValue: "CASE-72", label: "Reference" },
  title: { type: "text", defaultValue: "Sanctions hit — Helix Labs", label: "Title" },
  meta: { type: "text", defaultValue: "P2 · 2d ago", label: "Meta" },
  status: {
    type: "select",
    options: ["none", "online", "offline", "busy", "away", "pending"],
    defaultValue: "busy",
    label: "Status",
  },
  isActive: { type: "boolean", defaultValue: false, label: "Active" },
} satisfies ControlDefs

export default function SidebarCardPreview() {
  const controls = useControls(sidebarCardControlDefs)
  const status = controls.values.status as
    | "none"
    | "online"
    | "offline"
    | "busy"
    | "away"
    | "pending"

  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <div className="w-60 rounded-xl border border-border bg-card p-2 shadow-sm">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarCard
                reference={controls.values.reference}
                title={controls.values.title}
                meta={controls.values.meta || undefined}
                status={status === "none" ? undefined : status}
                isActive={controls.values.isActive}
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </Playground>

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
