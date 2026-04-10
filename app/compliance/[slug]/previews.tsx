"use client"

import { useState } from "react"
import { Button } from "@/src/components/button"
import {
  AddressDisplay,
  AlertBanner,
  CaseCard,
  type CaseCardProps,
  ComplianceStatusBadge,
  ComplianceTimeline,
  type ComplianceTimelineStep,
  CounterpartyCard,
  NetworkBadge,
  RiskScoreInline,
  SanctionsMatch,
  TransactionCard,
  type TransactionData,
  TransactionDetail,
  TransactionRow,
  TravelRuleStatus,
} from "@/src/compliance"
import { ComplianceScore } from "@/src/compliance/compliance-score"

// ── Sample data ──

const sampleTx: TransactionData = {
  hash: "0x8a3b1c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890",
  from: { address: "0x1234567890abcdef1234567890abcdef12345678", label: "Binance", vasp: "Binance" },
  to: { address: "0xabcdef1234567890abcdef1234567890abcdef12", vasp: "Coinbase" },
  amount: "2.5",
  asset: "ETH",
  network: "ethereum",
  direction: "outbound",
  timestamp: "2026-04-09 10:32 AM",
  blockNumber: 19847523,
  confirmations: 42,
  fee: "0.0021 ETH",
  fiatValue: "$7,825.00",
  riskScore: 72,
  complianceStatus: "flagged",
  travelRuleStatus: "sent",
  flags: ["high_risk_jurisdiction", "sanctions_match"],
}

const allStatuses = ["pending", "accepted", "rejected", "flagged", "escalated"] as const

const sampleTransactions: TransactionData[] = [
  { ...sampleTx, hash: "0xaaa1", complianceStatus: "flagged", riskScore: 82, direction: "inbound", amount: "15000", asset: "USDT", fiatValue: "$15,000" },
  { ...sampleTx, hash: "0xbbb2", complianceStatus: "accepted", riskScore: 12, direction: "outbound", amount: "0.5", asset: "BTC", fiatValue: "$32,100", network: "bitcoin" },
  { ...sampleTx, hash: "0xccc3", complianceStatus: "pending", riskScore: 45, direction: "inbound", amount: "5000", asset: "USDC", network: "polygon" },
  { ...sampleTx, hash: "0xddd4", complianceStatus: "rejected", riskScore: 95, direction: "outbound", amount: "100000", asset: "USDT", fiatValue: "$100,000", network: "tron" },
  { ...sampleTx, hash: "0xeee5", complianceStatus: "escalated", riskScore: 88, direction: "internal", amount: "8.2", asset: "ETH", fiatValue: "$25,420" },
]

const timelineSteps: ComplianceTimelineStep[] = [
  { id: "1", label: "Transaction received", description: "Inbound transfer detected", timestamp: "10:32 AM", status: "completed" },
  { id: "2", label: "Automated screening", description: "Risk engine flagged — sanctions match", timestamp: "10:32 AM", status: "warning" },
  { id: "3", label: "Assigned for review", description: "Escalated to compliance team", timestamp: "10:35 AM", status: "completed" },
  { id: "4", label: "Manual review", description: "Under investigation", timestamp: "10:48 AM", status: "current" },
  { id: "5", label: "Decision", status: "upcoming" },
]

// ── Previews ──

export const compliancePreviews: Record<string, React.ComponentType> = {
  "compliance-status-badge": function ComplianceStatusBadgePreview() {
    return (
      <div className="flex flex-wrap gap-3">
        {allStatuses.map((s) => (
          <ComplianceStatusBadge key={s} status={s} />
        ))}
      </div>
    )
  },

  "network-badge": function NetworkBadgePreview() {
    return (
      <div className="flex flex-wrap gap-3">
        {(["ethereum", "bitcoin", "tron", "polygon", "solana", "bnb"] as const).map((n) => (
          <NetworkBadge key={n} network={n} />
        ))}
      </div>
    )
  },

  "risk-score-inline": function RiskScoreInlinePreview() {
    return (
      <div className="flex flex-wrap gap-6">
        {[12, 45, 72, 95].map((s) => (
          <RiskScoreInline key={s} score={s} showLabel />
        ))}
      </div>
    )
  },

  "address-display": function AddressDisplayPreview() {
    return (
      <div className="flex flex-col gap-4">
        <AddressDisplay address="0x1234567890abcdef1234567890abcdef12345678" />
        <AddressDisplay address="0x1234567890abcdef1234567890abcdef12345678" label="Binance" riskScore={72} />
        <AddressDisplay address="0x1234567890abcdef1234567890abcdef12345678" truncate={false} />
      </div>
    )
  },

  "travel-rule-status": function TravelRuleStatusPreview() {
    return (
      <div className="flex flex-wrap gap-3">
        {(["not_required", "pending", "sent", "received", "expired"] as const).map((s) => (
          <TravelRuleStatus key={s} status={s} />
        ))}
      </div>
    )
  },

  "transaction-card": function TransactionCardPreview() {
    return (
      <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
        {sampleTransactions.slice(0, 4).map((tx) => (
          <TransactionCard key={tx.hash} transaction={tx} onClick={() => console.log(tx.hash)} />
        ))}
      </div>
    )
  },

  "transaction-row": function TransactionRowPreview() {
    return (
      <div className="max-w-4xl overflow-hidden rounded-xl border border-border bg-card">
        {sampleTransactions.map((tx) => (
          <TransactionRow key={tx.hash} transaction={tx} onClick={() => console.log(tx.hash)} />
        ))}
      </div>
    )
  },

  "transaction-detail": function TransactionDetailPreview() {
    return (
      <div className="max-w-lg">
        <TransactionDetail
          transaction={sampleTx}
          explorerUrl="#"
          actions={
            <>
              <Button variant="outline" size="sm">Reject</Button>
              <Button size="sm">Accept</Button>
            </>
          }
        />
      </div>
    )
  },

  "sanctions-match": function SanctionsMatchPreview() {
    return (
      <div className="flex max-w-lg flex-col gap-4">
        <SanctionsMatch
          source="OFAC SDN"
          entityName="Alpha Exchange LLC"
          matchScore={87}
          reason="Name similarity + jurisdiction overlap"
          onDismiss={() => console.log("dismiss")}
          onConfirm={() => console.log("confirm")}
        />
        <SanctionsMatch
          source="EU Consolidated"
          entityName="Beta Holdings"
          matchScore={42}
          reason="Partial alias match"
          onDismiss={() => console.log("dismiss")}
        />
      </div>
    )
  },

  "counterparty-card": function CounterpartyCardPreview() {
    return (
      <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
        <CounterpartyCard
          type="vasp"
          name="Binance Singapore"
          jurisdiction="sg"
          registrationStatus="MAS Licensed"
          verified
          riskScore={32}
        />
        <CounterpartyCard
          type="unhosted"
          name="Unknown wallet"
          riskScore={85}
        />
        <CounterpartyCard
          type="vasp"
          name="Coinbase"
          jurisdiction="us"
          registrationStatus="FinCEN MSB"
          verified
          riskScore={8}
        />
        <CounterpartyCard
          type="unknown"
          name="Unidentified entity"
          jurisdiction="ru"
          riskScore={92}
        />
      </div>
    )
  },

  "compliance-timeline": function ComplianceTimelinePreview() {
    return (
      <div className="max-w-sm">
        <ComplianceTimeline steps={timelineSteps} />
      </div>
    )
  },

  "case-card": function CaseCardPreview() {
    return (
      <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
        <CaseCard
          id="case-1042"
          title="High-risk VASP transfer flagged for review"
          entities={["Binance Singapore", "0x1a2b...3c4d"]}
          sla="at_risk"
          priority="p1"
          updatedAt={new Date(Date.now() - 3600000).toISOString()}
          assignee={{ name: "Sarah Chen", role: "Compliance Analyst" }}
          linkedAlerts={[
            { id: "ALT-201", severity: "high", trigger: "Sanctions match", type: "OFAC" },
          ]}
          linkedTransactions={[
            { id: "TX-8821", amount: "15,000", asset: "USDT", direction: "inbound" },
          ]}
          onClick={() => console.log("case click")}
        />
        <CaseCard
          id="case-1041"
          title="KYC document verification pending"
          entities={["Acme Corp", "john@acme.com"]}
          sla="on_track"
          priority="p3"
          updatedAt={new Date(Date.now() - 7200000).toISOString()}
          assignee={{ name: "James Cooke" }}
          onClick={() => console.log("case click")}
        />
      </div>
    )
  },

  "compliance-score": function ComplianceScorePreview() {
    return (
      <div className="flex flex-wrap items-end gap-8">
        <ComplianceScore score={92} label="Overall" size="lg" />
        <ComplianceScore score={78} label="KYC" />
        <ComplianceScore score={45} label="Travel Rule" />
        <ComplianceScore score={15} label="Sanctions" size="sm" />
      </div>
    )
  },

  "alert-banner": function AlertBannerPreview() {
    return (
      <div className="flex max-w-xl flex-col gap-4">
        <AlertBanner
          severity="critical"
          title="3 transactions flagged for immediate review"
          description="High-risk transfers detected from sanctioned jurisdictions."
          actions={<Button size="sm">Review now</Button>}
          onDismiss={() => console.log("dismiss")}
        />
        <AlertBanner
          severity="warning"
          title="Travel Rule data pending"
          description="2 outbound transfers are awaiting counterparty VASP response."
        />
        <AlertBanner
          severity="info"
          title="Screening rules updated"
          description="OFAC SDN list was refreshed 5 minutes ago."
        />
      </div>
    )
  },
}
