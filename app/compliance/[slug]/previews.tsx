"use client"

import { useState } from "react"
import {
  AddressDisplay,
  AlertBanner,
  AlertsCard,
  AppSidebar,
  AuditNote,
  AwaitingReviewCard,
  CaseCard,
  type ComplianceStatus,
  ComplianceStatusBadge,
  ComplianceTimeline,
  type ComplianceTimelineStep,
  CounterpartyCard,
  CounterpartyIntel,
  DashboardPage,
  EventTimeline,
  FlagCallout,
  FlowDiagram,
  JurisdictionCard,
  NetworkBadge,
  RecentTransactionsCard,
  ReportExport,
  ReviewerNotes,
  ReviewForm,
  RiskExposureCard,
  RiskScoreHero,
  RiskScoreInline,
  SanctionsMatch,
  type Transaction,
  TransactionCard,
  type TransactionData,
  TransactionDetail,
  TransactionDetailPage,
  TransactionFilterBar,
  type TransactionFilters,
  TransactionFlowCard,
  TransactionHeader,
  TransactionRow,
  TravelRuleCard,
  TravelRuleStatus,
} from "@/src/compliance"
import { ComplianceScore } from "@/src/compliance/compliance-score"
import { Button } from "@/src/components/button"
import { SidebarProvider } from "@/src/components/sidebar"
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

// ── Sample Transaction (DS refresh fixtures) ──

const sampleRichTx: Transaction = {
  id: "tx-2026-04-17-0182",
  ref: "TX-2026-04-17-0182",
  dir: "outbound",
  amt: "125,000",
  asset: "USDC",
  usd: "$125,000.00",
  fee: "$1.82",
  net: "ETH",
  chainId: 1,
  hash: "0x9f3b8c4e2d1a5678f0abcdef1234567890abcdef1234567890abcdef12345678",
  block: 21394012,
  confirmations: 18,
  gasUsed: 42_800,
  nonce: 217,
  status: "review",
  risk: 78,
  time: "Apr 17, 2026 · 14:32 UTC",
  flags: ["high_value", "sanctions_adjacent", "new_counterparty"],
  from: {
    lbl: "Treasury Ops",
    addr: "0x1234567890abcdef1234567890abcdef12345678",
    type: "Internal wallet",
    verified: true,
  },
  to: {
    lbl: "Helix Labs",
    addr: "0xabcdef1234567890abcdef1234567890abcdef12",
    type: "External · unverified",
    verified: false,
  },
  travelRule: "sent",
  riskDrivers: [
    { label: "Counterparty new to us", weight: 22, variant: "blush" },
    { label: "Value above threshold", weight: 18, variant: "highlight" },
    { label: "Mixer proximity (2 hops)", weight: 26, variant: "blush" },
    { label: "Jurisdiction risk (PA)", weight: 12, variant: "sky" },
  ],
  timeline: [
    { time: "14:32:01", title: "Transaction broadcast", by: "on-chain", variant: "neutral" },
    {
      time: "14:32:18",
      title: "Risk engine scored 78",
      by: "system",
      variant: "blush",
      active: true,
    },
    { time: "14:33:05", title: "Travel rule request sent", by: "Notabene", variant: "sky" },
    { time: "14:35:22", title: "Assigned for review", by: "auto-assign", variant: "highlight" },
  ],
  notes: [
    {
      who: "Mia K",
      role: "Compliance lead",
      at: "15 min ago",
      body: "Looping in legal. Counterparty claims regulated status in DE — verifying.",
      avatarTone: "lilac",
    },
    {
      who: "Sam T",
      role: "Analyst",
      at: "2 min ago",
      body: "Mixer hop is weak signal (2 levels removed). Recommending approve pending travel-rule response.",
      avatarTone: "mint",
    },
  ],
  related: [
    { id: "r1", lbl: "Payroll Q1", addr: "0x1234…5678", amt: "$45,000", time: "Mar 14" },
    { id: "r2", lbl: "Vendor A", addr: "0xabcd…ef12", amt: "$12,200", time: "Feb 28" },
    { id: "r3", lbl: "Ops wallet", addr: "0xdead…beef", amt: "$9,000", time: "Feb 05" },
  ],
}

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
    const richTx = {
      ...sampleTx,
      amount: "125,000",
      asset: "USDC",
      direction: "outbound" as const,
      fiatValue: "$125,000",
      complianceStatus: "flagged" as const,
      travelRuleStatus: "pending" as const,
      hash: "0x7f3a000000000000000000000000000000c291",
      blockNumber: 19_284_571,
      confirmations: 128,
      fee: "0.00124 USDC",
      timestamp: "Apr 17 · 14:18",
      from: {
        address: "0x742d000000000000000000000000000000f44e",
        label: "Cogentic Treasury",
      },
      to: {
        address: "0x9b2a000000000000000000000000000000c11d",
        label: "Unknown wallet",
      },
      riskScore: 78,
      flags: ["high_value", "unverified_counterparty"],
    }
    return (
      <div className="space-y-8">
        <Section title="Panel (slide-in side panel, lifted shadow)">
          <div className="max-w-md">
            <TransactionDetail
              variant="panel"
              transaction={richTx}
              explorerUrl="#"
              onClose={() => console.log("close")}
              onApprove={() => console.log("approve")}
              onEscalate={() => console.log("escalate")}
              onMore={() => console.log("more")}
            />
          </div>
        </Section>
        <Section title="Card (sitting on page)">
          <div className="max-w-md">
            <TransactionDetail
              variant="card"
              transaction={richTx}
              explorerUrl="#"
              onApprove={() => console.log("approve")}
              onEscalate={() => console.log("escalate")}
            />
          </div>
        </Section>
        <Section title="Inline (no chrome — embed in your own container)">
          <div className="max-w-md">
            <TransactionDetail
              transaction={richTx}
              explorerUrl="#"
              onApprove={() => console.log("approve")}
              onEscalate={() => console.log("escalate")}
            />
          </div>
        </Section>
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

  // ── DS refresh previews ──

  "flag-callout": function FlagCalloutPreview() {
    return (
      <div className="space-y-4">
        <Section title="Highlight tone (default)">
          <FlagCallout flags={sampleRichTx.flags} />
        </Section>
        <Section title="Blush tone (blocked)">
          <FlagCallout flags={["blocked_jurisdiction", "sanctions_match"]} tone="blush" />
        </Section>
      </div>
    )
  },

  "risk-score-hero": function RiskScoreHeroPreview() {
    return (
      <div className="space-y-6">
        <RiskScoreHero score={sampleRichTx.risk} drivers={sampleRichTx.riskDrivers ?? []} />
        <RiskScoreHero
          score={25}
          drivers={[
            { label: "Known counterparty", weight: 8, variant: "sky" },
            { label: "Below threshold", weight: 5, variant: "sky" },
          ]}
        />
      </div>
    )
  },

  "flow-diagram": function FlowDiagramPreview() {
    return (
      <div className="max-w-3xl">
        <FlowDiagram
          from={sampleRichTx.from}
          to={sampleRichTx.to}
          network={sampleRichTx.net}
          fee={sampleRichTx.fee}
        />
      </div>
    )
  },

  "event-timeline": function EventTimelinePreview() {
    return (
      <div className="max-w-md rounded-[var(--radius-lg)] border border-border bg-card p-4 shadow-[var(--shadow-card)]">
        <EventTimeline events={sampleRichTx.timeline ?? []} />
      </div>
    )
  },

  "counterparty-intel": function CounterpartyIntelPreview() {
    return (
      <div className="max-w-md">
        <CounterpartyIntel
          firstSeen="Mar 14, 2026"
          firstSeenHint="34 days ago"
          priorStats={{
            label: "Prior w/ us",
            value: "3 tx · $66,200",
            hint: "All outbound, all <$50k",
          }}
          related={[
            {
              id: "r1",
              lbl: "Unknown wallet",
              addr: "0x9b2a…611d",
              amt: "$45,000",
              time: "Apr 12",
            },
            {
              id: "r2",
              lbl: "Unknown wallet",
              addr: "0x9b2a…611d",
              amt: "$12,800",
              time: "Mar 28",
            },
            { id: "r3", lbl: "Unknown wallet", addr: "0x9b2a…611d", amt: "$8,400", time: "Mar 14" },
          ]}
        />
      </div>
    )
  },

  "reviewer-notes": function ReviewerNotesPreview() {
    return (
      <div className="max-w-xl">
        <ReviewerNotes
          notes={sampleRichTx.notes ?? []}
          onSubmit={(body) => console.log("submit", body)}
        />
      </div>
    )
  },

  "travel-rule-card": function TravelRuleCardPreview() {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <TravelRuleCard
          provider="Notabene"
          status="sent"
          body="Originator data sent. Awaiting beneficiary VASP response."
        />
        <TravelRuleCard
          provider="Sumsub"
          status="received"
          body="Payload verified. KYC-matched on both sides."
          payloadHref="#"
        />
        <TravelRuleCard
          provider="Chainalysis KYT"
          status="expired"
          body="Provider response window lapsed — manual review required."
        />
        <TravelRuleCard
          provider="Notabene"
          status="not_required"
          body="Counterparty below travel-rule threshold."
        />
      </div>
    )
  },

  "transaction-header": function TransactionHeaderPreview() {
    return (
      <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border">
        <TransactionHeader
          tx={sampleRichTx}
          explorerHref="#"
          onApprove={() => console.log("approve")}
          onEscalate={() => console.log("escalate")}
        />
      </div>
    )
  },

  "transaction-detail-page": function TransactionDetailPagePreview() {
    return (
      <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-background">
        <TransactionDetailPage
          tx={sampleRichTx}
          explorerHref="#"
          onApprove={() => console.log("approve")}
          onEscalate={() => console.log("escalate")}
          onSubmitNote={(body) => console.log("note", body)}
        />
      </div>
    )
  },

  "transaction-flow-card": function TransactionFlowCardPreview() {
    return (
      <div className="max-w-md">
        <TransactionFlowCard
          inboundUsd="$1.42M"
          outboundUsd="$980K"
          inboundPct={42}
          outboundPct={28}
          unattributedPct={30}
          categories={[
            { label: "Exchange", percent: 42, hint: "avg 4.2 min", tone: "solid" },
            { label: "OTC", percent: 28, tone: "muted", pulse: true },
          ]}
          topCounterparties={[
            { name: "Binance", value: "$480K", direction: "in" },
            { name: "Kraken", value: "$312K", direction: "out" },
            { name: "Coinbase Prime", value: "$280K", direction: "in" },
          ]}
        />
      </div>
    )
  },

  "risk-exposure-card": function RiskExposureCardPreview() {
    return (
      <div className="max-w-md">
        <RiskExposureCard
          value="$2.1M"
          delta="−8.4%"
          deltaTone="positive"
          bars={[12, 18, 14, 22, 28, 24, 31, 26, 34, 40, 36, 48, 42]}
          rangeStart="Apr 5"
          rangeEnd="Apr 17"
          breakdown={[
            { label: "Sanctions exposure", value: "$812K", tone: "destructive" },
            { label: "Mixer-adjacent", value: "$420K", tone: "highlight" },
            { label: "Unverified VASP", value: "$868K", tone: "muted" },
          ]}
        />
      </div>
    )
  },

  "recent-transactions-card": function RecentTransactionsCardPreview() {
    const txs: Transaction[] = [
      {
        ...sampleRichTx,
        id: "r1",
        ref: "TX-1",
        dir: "inbound",
        amt: "158,420",
        usd: "$158,420",
        status: "verified",
        risk: 22,
        time: "Apr 17 · 14:32",
        flags: [],
        from: { ...sampleRichTx.from, lbl: "Binance" },
        to: { ...sampleRichTx.to, lbl: "Kraken" },
      },
      {
        ...sampleRichTx,
        id: "r2",
        ref: "TX-2",
        time: "Apr 17 · 14:18",
      },
      {
        ...sampleRichTx,
        id: "r3",
        ref: "TX-3",
        dir: "inbound",
        amt: "172,308",
        usd: "$172,308",
        status: "verified",
        risk: 8,
        time: "Apr 17 · 13:56",
        flags: [],
        from: { ...sampleRichTx.from, lbl: "Coinbase Prime" },
        to: { ...sampleRichTx.to, lbl: "Fireblocks Vault" },
      },
      {
        ...sampleRichTx,
        id: "r4",
        ref: "TX-4",
        dir: "inbound",
        amt: "812,250",
        usd: "$812,250",
        status: "blocked",
        risk: 95,
        time: "Apr 17 · 12:44",
        flags: ["sanctions_match"],
        from: { ...sampleRichTx.from, lbl: "Sanctioned address", verified: false },
        to: { ...sampleRichTx.to, lbl: "Cogentic Treasury", verified: true },
      },
    ]
    return (
      <div className="max-w-2xl">
        <RecentTransactionsCard
          transactions={txs}
          onViewAll={() => console.log("view all")}
          onSelect={(tx) => console.log("select", tx.id)}
        />
      </div>
    )
  },

  "alerts-card": function AlertsCardPreview() {
    return (
      <div className="max-w-xl">
        <AlertsCard
          onViewAll={() => console.log("view all")}
          alerts={[
            {
              id: "a1",
              tone: "blush",
              title: "Sanctions match — TX-6621",
              body: "Inbound 12.75 BTC from OFAC-listed address. Blocked automatically.",
              time: "2m ago",
            },
            {
              id: "a2",
              tone: "highlight",
              title: "High-value review — TX-0182",
              body: "125K USDC to unverified counterparty. Awaiting Mia's approval.",
              time: "8m ago",
            },
            {
              id: "a3",
              tone: "sky",
              title: "Travel rule SLA breached",
              body: "Notabene counterparty VASP has not responded in 12m (SLA: 5m).",
              time: "14m ago",
            },
            {
              id: "a4",
              tone: "lilac",
              title: "Rule updated",
              body: "“Mixer exposure threshold” lowered to $10K by Priya R.",
              time: "1h ago",
            },
          ]}
        />
      </div>
    )
  },

  "awaiting-review-card": function AwaitingReviewCardPreview() {
    return (
      <div className="max-w-md">
        <AwaitingReviewCard
          avgResolution="4h 12m"
          rules={[
            { name: "Travel rule incomplete", value: 7, tone: "highlight" },
            { name: "High value (>$100K)", value: 4, tone: "blush" },
            { name: "Counterparty KYC missing", value: 3, tone: "sky" },
            { name: "Mixer exposure", value: 2, tone: "lilac" },
          ]}
          oldestInQueue={[
            { id: "TX-4821", age: "2h 14m" },
            { id: "TX-4829", age: "1h 48m" },
            { id: "TX-4833", age: "1h 02m" },
          ]}
        />
      </div>
    )
  },

  "dashboard-page": function DashboardPagePreview() {
    return (
      <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-background">
        <DashboardPage
          tagline={
            <>
              <span className="rounded-[3px] bg-highlight px-1 py-px font-semibold text-highlight-ink">
                3 items
              </span>{" "}
              need your eyes before end of day · queue cleared{" "}
              <span className="font-mono font-semibold">68%</span> faster than last week
            </>
          }
          onExport={() => console.log("export")}
          onNewCase={() => console.log("new case")}
        />
      </div>
    )
  },

  "app-sidebar": function AppSidebarPreview() {
    return (
      <div className="h-[560px] overflow-hidden rounded-[var(--radius-lg)] border border-border">
        <SidebarProvider>
          <AppSidebar active="tx" />
          <div className="flex-1 bg-background p-6">
            <div className="text-muted-foreground text-sm">
              Main content area. Click sidebar items to see hover/active states.
            </div>
          </div>
        </SidebarProvider>
      </div>
    )
  },
}
