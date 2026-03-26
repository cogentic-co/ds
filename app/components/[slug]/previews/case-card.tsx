"use client"

import { CaseCard } from "@/components/ui/case-card"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const caseCardControlDefs = {
  sla: {
    type: "radio" as const,
    options: ["on_track", "at_risk", "overdue"],
    defaultValue: "on_track",
    label: "SLA",
  },
  priority: {
    type: "radio" as const,
    options: ["p1", "p2", "p3"],
    defaultValue: "p2",
    label: "Priority",
  },
  showAssignee: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Show Assignee",
  },
  showAlerts: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Show Linked Alerts",
  },
  showTransactions: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Show Linked Transactions",
  },
} satisfies ControlDefs

const sampleAlerts = [
  { id: "alert-001", severity: "high", trigger: "Threshold Breach", type: "velocity" },
  { id: "alert-002", severity: "medium", trigger: "Pattern Match", type: "behavioral" },
]

const sampleTransactions = [
  { id: "tx-001", amount: "5,000", asset: "USDT", direction: "outbound" },
  { id: "tx-002", amount: "12,500", asset: "BTC", direction: "inbound" },
]

export default function CaseCardPreview() {
  const controls = useControls(caseCardControlDefs)
  const { sla, priority, showAssignee, showAlerts, showTransactions } = controls.values

  return (
    <div className="max-w-sm space-y-8">
      <Playground controls={controls}>
        <CaseCard
          id="case-12345"
          title="Suspicious Transaction Pattern Detected"
          entities={["ACME Corp", "John Doe"]}
          sla={sla}
          priority={priority}
          updatedAt={new Date(Date.now() - 3600000).toISOString()}
          assignee={showAssignee ? { name: "Sarah Chen" } : undefined}
          linkedAlerts={showAlerts ? sampleAlerts : []}
          linkedTransactions={showTransactions ? sampleTransactions : []}
        />
      </Playground>

      <Section title="SLA Variants">
        <div className="flex w-full flex-col gap-3">
          <CaseCard
            id="case-001"
            title="On Track — Routine Review"
            entities={["Binance", "Wallet 0x1a2b"]}
            sla="on_track"
            priority="p3"
            updatedAt={new Date(Date.now() - 7200000).toISOString()}
            assignee={{ name: "Sarah Chen" }}
          />
          <CaseCard
            id="case-002"
            title="At Risk — Requires Attention"
            entities={["Coinbase", "Wallet 0x3c4d"]}
            sla="at_risk"
            priority="p2"
            updatedAt={new Date(Date.now() - 86400000).toISOString()}
            assignee={{ name: "James Lee" }}
            linkedAlerts={[sampleAlerts[0]]}
          />
          <CaseCard
            id="case-003"
            title="Overdue — Immediate Action Required"
            entities={["Kraken", "Wallet 0x5e6f"]}
            sla="overdue"
            priority="p1"
            updatedAt={new Date(Date.now() - 172800000).toISOString()}
            assignee={{ name: "Maria Gonzalez" }}
            linkedAlerts={sampleAlerts}
            linkedTransactions={sampleTransactions}
          />
        </div>
      </Section>

      <Section title="Without Assignee (Inbox)">
        <CaseCard
          id="case-004"
          title="My Inbox Card — No Assignee Avatar"
          entities={["FTX", "Wallet 0x7g8h"]}
          sla="on_track"
          priority="p2"
          updatedAt={new Date().toISOString()}
          linkedAlerts={[sampleAlerts[0]]}
        />
      </Section>
    </div>
  )
}
