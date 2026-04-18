"use client"

import { useState } from "react"
import {
  AddressDisplay,
  AlertBanner,
  AuditNote,
  CaseCard,
  type ComplianceStatus,
  ComplianceStatusBadge,
  ComplianceTimeline,
  type ComplianceTimelineStep,
  CounterpartyCard,
  JurisdictionCard,
  NetworkBadge,
  ReportExport,
  ReviewForm,
  RiskScoreInline,
  SanctionsMatch,
  TransactionCard,
  type TransactionData,
  TransactionDetail,
  TransactionFilterBar,
  type TransactionFilters,
  TransactionRow,
  TravelRuleStatus,
} from "@/src/compliance"
import { ComplianceScore } from "@/src/compliance/compliance-score"
import { Button } from "@/src/components/button"
import { Section } from "../../components/[slug]/previews/_shared"
import { type ControlDefs, Playground, useControls } from "../../controls"

// ── Sample data ──

const sampleTx: TransactionData = {
  hash: "0x8a3b1c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890",
  from: {
    address: "0x1234567890abcdef1234567890abcdef12345678",
    label: "Binance",
    vasp: "Binance",
  },
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

const sampleTransactions: TransactionData[] = [
  {
    ...sampleTx,
    hash: "0xaaa1",
    complianceStatus: "flagged",
    riskScore: 82,
    direction: "inbound",
    amount: "15000",
    asset: "USDT",
    fiatValue: "$15,000",
  },
  {
    ...sampleTx,
    hash: "0xbbb2",
    complianceStatus: "accepted",
    riskScore: 12,
    direction: "outbound",
    amount: "0.5",
    asset: "BTC",
    fiatValue: "$32,100",
    network: "bitcoin",
  },
  {
    ...sampleTx,
    hash: "0xccc3",
    complianceStatus: "pending",
    riskScore: 45,
    direction: "inbound",
    amount: "5000",
    asset: "USDC",
    network: "polygon",
  },
  {
    ...sampleTx,
    hash: "0xddd4",
    complianceStatus: "rejected",
    riskScore: 95,
    direction: "outbound",
    amount: "100000",
    asset: "USDT",
    fiatValue: "$100,000",
    network: "tron",
  },
  {
    ...sampleTx,
    hash: "0xeee5",
    complianceStatus: "escalated",
    riskScore: 88,
    direction: "internal",
    amount: "8.2",
    asset: "ETH",
    fiatValue: "$25,420",
  },
]

const timelineSteps: ComplianceTimelineStep[] = [
  {
    id: "1",
    label: "Transaction received",
    description: "Inbound transfer detected",
    timestamp: "10:32 AM",
    status: "completed",
  },
  {
    id: "2",
    label: "Automated screening",
    description: "Risk engine flagged — sanctions match",
    timestamp: "10:32 AM",
    status: "warning",
  },
  {
    id: "3",
    label: "Assigned for review",
    description: "Escalated to compliance team",
    timestamp: "10:35 AM",
    status: "completed",
  },
  {
    id: "4",
    label: "Manual review",
    description: "Under investigation",
    timestamp: "10:48 AM",
    status: "current",
  },
  { id: "5", label: "Decision", status: "upcoming" },
]

// ── Controls ──

const txCardControlDefs = {
  complianceStatus: {
    type: "select",
    options: ["pending", "accepted", "rejected", "flagged", "escalated"],
    defaultValue: "flagged",
    label: "Status",
  },
  direction: {
    type: "select",
    options: ["inbound", "outbound", "internal"],
    defaultValue: "outbound",
    label: "Direction",
  },
  network: {
    type: "select",
    options: ["ethereum", "bitcoin", "tron", "polygon", "solana", "bnb"],
    defaultValue: "ethereum",
    label: "Network",
  },
  riskScore: { type: "number", defaultValue: 72, min: 0, max: 100, step: 1, label: "Risk score" },
} satisfies ControlDefs

const alertControlDefs = {
  severity: {
    type: "select",
    options: ["info", "warning", "critical"],
    defaultValue: "critical",
    label: "Severity",
  },
} satisfies ControlDefs

const counterpartyControlDefs = {
  type: {
    type: "select",
    options: ["vasp", "unhosted", "unknown"],
    defaultValue: "vasp",
    label: "Type",
  },
  verified: { type: "boolean", defaultValue: true, label: "Verified" },
  riskScore: { type: "number", defaultValue: 32, min: 0, max: 100, step: 1, label: "Risk" },
} satisfies ControlDefs

// ── Previews ──

export const compliancePreviews: Record<string, React.ComponentType> = {
  "compliance-status-badge": function ComplianceStatusBadgePreview() {
    return (
      <div className="space-y-6">
        <Section title="All statuses">
          {(["pending", "accepted", "rejected", "flagged", "escalated"] as const).map((s) => (
            <ComplianceStatusBadge key={s} status={s} />
          ))}
        </Section>
      </div>
    )
  },

  "network-badge": function NetworkBadgePreview() {
    return (
      <div className="space-y-6">
        <Section title="All networks">
          {(["ethereum", "bitcoin", "tron", "polygon", "solana", "bnb"] as const).map((n) => (
            <NetworkBadge key={n} network={n} />
          ))}
        </Section>
      </div>
    )
  },

  "risk-score-inline": function RiskScoreInlinePreview() {
    return (
      <div className="space-y-6">
        <Section title="Scores with labels">
          {[8, 12, 39, 45, 70, 72, 88, 95].map((s) => (
            <RiskScoreInline key={s} score={s} showLabel />
          ))}
        </Section>
        <Section title="Score only">
          {[12, 45, 72, 95].map((s) => (
            <RiskScoreInline key={s} score={s} />
          ))}
        </Section>
      </div>
    )
  },

  "address-display": function AddressDisplayPreview() {
    return (
      <div className="flex flex-col gap-4">
        <Section title="With label + risk">
          <AddressDisplay
            address="0x1234567890abcdef1234567890abcdef12345678"
            label="Binance"
            riskScore={72}
          />
        </Section>
        <Section title="Address only">
          <AddressDisplay address="0x1234567890abcdef1234567890abcdef12345678" />
        </Section>
        <Section title="Full (no truncation)">
          <AddressDisplay address="0x1234567890abcdef1234567890abcdef12345678" truncate={false} />
        </Section>
      </div>
    )
  },

  "travel-rule-status": function TravelRuleStatusPreview() {
    return (
      <Section title="All statuses">
        {(["not_required", "pending", "sent", "received", "expired"] as const).map((s) => (
          <TravelRuleStatus key={s} status={s} />
        ))}
      </Section>
    )
  },

  "transaction-card": function TransactionCardPreview() {
    const controls = useControls(txCardControlDefs)
    const tx: TransactionData = {
      ...sampleTx,
      complianceStatus: controls.values.complianceStatus as ComplianceStatus,
      direction: controls.values.direction as TransactionData["direction"],
      network: controls.values.network,
      riskScore: controls.values.riskScore,
    }
    return (
      <div className="space-y-8">
        <Playground controls={controls}>
          <div className="max-w-sm">
            <TransactionCard transaction={tx} onClick={() => console.log("click")} />
          </div>
        </Playground>
        <Section title="All statuses">
          <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
            {sampleTransactions.slice(0, 4).map((t) => (
              <TransactionCard key={t.hash} transaction={t} />
            ))}
          </div>
        </Section>
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
              <Button variant="outline" size="sm">
                Reject
              </Button>
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
    const controls = useControls(counterpartyControlDefs)
    return (
      <div className="space-y-8">
        <Playground controls={controls}>
          <div className="max-w-sm">
            <CounterpartyCard
              type={controls.values.type as "vasp"}
              name={controls.values.type === "vasp" ? "Binance Singapore" : "Unknown wallet"}
              jurisdiction={controls.values.type === "vasp" ? "sg" : undefined}
              registrationStatus={controls.values.type === "vasp" ? "MAS Licensed" : undefined}
              verified={controls.values.verified}
              riskScore={controls.values.riskScore}
            />
          </div>
        </Playground>
        <Section title="Types">
          <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
            <CounterpartyCard
              type="vasp"
              name="Coinbase"
              jurisdiction="us"
              registrationStatus="FinCEN MSB"
              verified
              riskScore={8}
            />
            <CounterpartyCard type="unhosted" name="Unknown wallet" riskScore={85} />
            <CounterpartyCard
              type="unknown"
              name="Unidentified entity"
              jurisdiction="ru"
              riskScore={92}
            />
          </div>
        </Section>
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

  "jurisdiction-card": function JurisdictionCardPreview() {
    return (
      <div className="grid max-w-3xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <JurisdictionCard
          code="SG"
          name="Singapore"
          total={42}
          regulated={38}
          fatfStatus="clear"
          travelRuleStatus="enforced"
          baselAmlScore={3.2}
          cpiScore={83}
          onClick={() => console.log("SG")}
        />
        <JurisdictionCard
          code="US"
          name="United States"
          total={120}
          regulated={95}
          fatfStatus="clear"
          travelRuleStatus="enforced"
          baselAmlScore={4.1}
          cpiScore={67}
          onClick={() => console.log("US")}
        />
        <JurisdictionCard
          code="GB"
          name="United Kingdom"
          total={68}
          regulated={61}
          fatfStatus="clear"
          travelRuleStatus="legislated"
          baselAmlScore={3.5}
          cpiScore={71}
          onClick={() => console.log("GB")}
        />
        <JurisdictionCard
          code="RU"
          name="Russia"
          total={12}
          regulated={4}
          fatfStatus="grey_list"
          travelRuleStatus="none"
          baselAmlScore={6.8}
          cpiScore={28}
          onClick={() => console.log("RU")}
        />
        <JurisdictionCard
          code="KP"
          name="North Korea"
          total={0}
          regulated={0}
          fatfStatus="black_list"
          travelRuleStatus={null}
          baselAmlScore={null}
          cpiScore={null}
        />
        <JurisdictionCard
          code="CH"
          name="Switzerland"
          total={31}
          regulated={29}
          fatfStatus="clear"
          travelRuleStatus="consulting"
          baselAmlScore={3.1}
          cpiScore={82}
          onClick={() => console.log("CH")}
        />
      </div>
    )
  },

  "alert-banner": function AlertBannerPreview() {
    const controls = useControls(alertControlDefs)
    return (
      <div className="space-y-8">
        <Playground controls={controls}>
          <AlertBanner
            severity={controls.values.severity as "critical"}
            title="3 transactions flagged for immediate review"
            description="High-risk transfers detected from sanctioned jurisdictions."
            actions={<Button size="sm">Review now</Button>}
            onDismiss={() => console.log("dismiss")}
          />
        </Playground>
        <Section title="All severities">
          <div className="flex max-w-xl flex-col gap-4">
            <AlertBanner
              severity="critical"
              title="3 transactions flagged for immediate review"
              description="High-risk transfers detected from sanctioned jurisdictions."
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
        </Section>
      </div>
    )
  },

  "transaction-filters": function TransactionFiltersPreview() {
    const [filters, setFilters] = useState<TransactionFilters>({})
    return (
      <div className="space-y-6">
        <TransactionFilterBar filters={filters} onFiltersChange={setFilters} />
        <pre className="rounded-lg bg-muted p-3 font-mono text-xs">
          {JSON.stringify(filters, null, 2)}
        </pre>
      </div>
    )
  },

  "review-form": function ReviewFormPreview() {
    return (
      <div className="max-w-lg">
        <ReviewForm
          onSubmit={(decision, rationale) => console.log("submit", decision, rationale)}
          header={
            <div className="mb-2 text-muted-foreground text-sm">
              Review flagged transaction <span className="font-mono">0x8a3b...7890</span>
            </div>
          }
        />
      </div>
    )
  },

  "audit-note": function AuditNotePreview() {
    return (
      <div className="flex max-w-lg flex-col gap-4">
        <AuditNote author={{ name: "Sarah Chen" }} timestamp="10:48 AM" decision="flagged">
          Flagged for manual review — counterparty address matches a known high-risk cluster
          identified by Chainalysis.
        </AuditNote>
        <AuditNote author={{ name: "James Cooke" }} timestamp="11:15 AM" decision="accepted">
          Verified with the counterparty VASP. Transaction is legitimate — clearing the flag.
        </AuditNote>
      </div>
    )
  },

  "report-export": function ReportExportPreview() {
    return (
      <div className="max-w-lg">
        <ReportExport
          sections={[
            { id: "transactions", label: "Transactions" },
            { id: "alerts", label: "Alerts" },
            { id: "screening", label: "Screening results" },
            { id: "timeline", label: "Compliance timeline" },
            { id: "notes", label: "Audit notes" },
          ]}
          onExport={(config) => console.log("export", config)}
        />
      </div>
    )
  },
}
