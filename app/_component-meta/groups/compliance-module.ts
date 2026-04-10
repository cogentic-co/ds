import type { ComponentMeta } from "../index"

export const complianceModuleMeta: Record<string, ComponentMeta> = {
  "transaction-card": {
    status: "new",
    description:
      "Compact blockchain transaction summary card with direction icon, amount, from/to addresses, network badge, risk score, and compliance status border. Matches CaseCard styling with hover lift and dashed footer.",
    since: "0.11.0",
    importStatement: `import { TransactionCard } from "@cogentic-co/ds/compliance/transaction-card"`,
    dos: [
      "Use for dashboard grids and case detail sidebars",
      "Pass onClick for navigation to transaction detail",
      "Transaction data follows the shared TransactionData type from @cogentic-co/ds/compliance",
    ],
    donts: [
      "Don't use for inline lists — use TransactionRow instead",
      "Don't show more than 6 cards in a grid without pagination",
    ],
    codeExample: `<TransactionCard
  transaction={{
    hash: "0x8a3b1c...",
    from: { address: "0x1234...", label: "Binance" },
    to: { address: "0xabcd...", vasp: "Coinbase" },
    amount: "2.5",
    asset: "ETH",
    network: "ethereum",
    direction: "outbound",
    timestamp: "2026-04-09 10:32 AM",
    fiatValue: "$7,825.00",
    riskScore: 72,
    complianceStatus: "flagged",
  }}
  onClick={() => router.push("/tx/0x8a3b1c")}
/>`,
  },
  "transaction-row": {
    status: "new",
    description:
      "Compact single-line transaction row for tables and lists. From→To with arrow, amount, network badge, risk score, and compliance status. Designed for DataTable or standalone scrollable lists.",
    since: "0.11.0",
    importStatement: `import { TransactionRow } from "@cogentic-co/ds/compliance/transaction-row"`,
    dos: [
      "Wrap in a bordered container for a table look",
      "Use alongside DataTable for sortable/filterable transaction lists",
    ],
    donts: [
      "Don't use for detail views — use TransactionDetail",
    ],
    codeExample: `<div className="rounded-xl border bg-card">
  {transactions.map(tx => (
    <TransactionRow key={tx.hash} transaction={tx} onClick={() => select(tx)} />
  ))}
</div>`,
  },
  "transaction-detail": {
    status: "new",
    description:
      "Full transaction detail view with all fields, addresses with copy buttons, explorer link, flags, and action buttons. Network, risk, travel rule, and status badges are grouped in the header.",
    since: "0.11.0",
    importStatement: `import { TransactionDetail } from "@cogentic-co/ds/compliance/transaction-detail"`,
    dos: [
      "Use as the main content of a transaction detail page or inspector panel",
      "Pass actions slot for approve/reject buttons",
      "Pass explorerUrl to link to the block explorer",
    ],
    donts: [
      "Don't nest inside a Card — it manages its own layout",
    ],
    codeExample: `<TransactionDetail
  transaction={tx}
  explorerUrl="https://etherscan.io/tx/0x..."
  actions={<><Button variant="outline" size="sm">Reject</Button><Button size="sm">Accept</Button></>}
/>`,
  },
  "compliance-status-badge": {
    status: "new",
    description:
      "Square badge showing compliance review status: pending, accepted, rejected, flagged, or escalated. Color-coded with icon. Used across transaction cards, rows, and details.",
    since: "0.11.0",
    importStatement: `import { ComplianceStatusBadge } from "@cogentic-co/ds/compliance/compliance-status-badge"`,
    dos: ["Use inside transaction components and case detail headers"],
    donts: ["Don't use for non-compliance statuses — use Badge instead"],
    codeExample: `<ComplianceStatusBadge status="flagged" />`,
  },
  "address-display": {
    status: "new",
    description:
      "Truncated blockchain address with copy button, optional block explorer link, VASP label, and inline risk dot. Font-mono for address readability.",
    since: "0.11.0",
    importStatement: `import { AddressDisplay } from "@cogentic-co/ds/compliance/address-display"`,
    dos: [
      "Pass label for known VASPs (e.g. 'Binance')",
      "Pass explorerUrl to link to the block explorer",
    ],
    donts: ["Don't use for non-blockchain identifiers"],
    codeExample: `<AddressDisplay address="0x1234...abcd" label="Binance" riskScore={72} />`,
  },
  "network-badge": {
    status: "new",
    description:
      "Chain/network badge with brand-colored square pill. Supports Ethereum, Bitcoin, Tron, Polygon, Solana, BNB, with auto-fallback for unknown chains.",
    since: "0.11.0",
    importStatement: `import { NetworkBadge } from "@cogentic-co/ds/compliance/network-badge"`,
    dos: ["Use inside transaction cards, rows, and detail views"],
    donts: ["Don't invent custom colors — use the built-in chain variants"],
    codeExample: `<NetworkBadge network="ethereum" />`,
  },
  "risk-score-inline": {
    status: "new",
    description:
      "Compact inline risk indicator with icon, score (0-100), and optional label (Low/Medium/High). Color-coded: emerald for low, amber for medium, red for high.",
    since: "0.11.0",
    importStatement: `import { RiskScoreInline } from "@cogentic-co/ds/compliance/risk-score-inline"`,
    dos: ["Use inside rows, cards, and headers for at-a-glance risk"],
    donts: ["Don't use for full risk breakdowns — use RiskGauge instead"],
    codeExample: `<RiskScoreInline score={72} showLabel />`,
  },
  "travel-rule-status": {
    status: "new",
    description:
      "IVMS101 Travel Rule data exchange status badge: not_required, pending, sent, received, expired. Square styling consistent with other compliance badges.",
    since: "0.11.0",
    importStatement: `import { TravelRuleStatus } from "@cogentic-co/ds/compliance/travel-rule-status"`,
    dos: ["Use in transaction detail and case views"],
    donts: ["Don't abbreviate the label — the statuses are already short"],
    codeExample: `<TravelRuleStatus status="sent" />`,
  },
  "sanctions-match": {
    status: "new",
    description:
      "Watchlist/sanctions hit card showing source list (OFAC, EU, UN), entity name, match score percentage, reason, and dismiss/confirm actions.",
    since: "0.11.0",
    importStatement: `import { SanctionsMatch } from "@cogentic-co/ds/compliance/sanctions-match"`,
    dos: ["Use in case detail views and alert triage panels"],
    donts: ["Don't show more than 3 matches without grouping/collapsing"],
    codeExample: `<SanctionsMatch
  source="OFAC SDN"
  entityName="Alpha Exchange LLC"
  matchScore={87}
  reason="Name similarity + jurisdiction overlap"
  onDismiss={() => dismiss(id)}
  onConfirm={() => confirm(id)}
/>`,
  },
  "counterparty-card": {
    status: "new",
    description:
      "Counterparty identity card showing VASP/unhosted/unknown type, jurisdiction flag in a square badge, registration status, verified shield, and risk score.",
    since: "0.11.0",
    importStatement: `import { CounterpartyCard } from "@cogentic-co/ds/compliance/counterparty-card"`,
    dos: ["Use in transaction detail and case views to show the other party"],
    donts: ["Don't use for internal entities — this is for counterparties"],
    codeExample: `<CounterpartyCard
  type="vasp"
  name="Binance Singapore"
  jurisdiction="sg"
  registrationStatus="MAS Licensed"
  verified
  riskScore={32}
/>`,
  },
  "compliance-timeline": {
    status: "new",
    description:
      "Vertical timeline showing a transaction's compliance lifecycle with step states: completed, current, upcoming, warning, rejected. Connected by colored lines with no gaps.",
    since: "0.11.0",
    importStatement: `import { ComplianceTimeline } from "@cogentic-co/ds/compliance/compliance-timeline"`,
    dos: [
      "Use in transaction detail or case detail sidebars",
      "Order steps chronologically top to bottom",
    ],
    donts: ["Don't use for generic timelines — use the Timeline component"],
    codeExample: `<ComplianceTimeline steps={[
  { id: "1", label: "Transaction received", status: "completed", timestamp: "10:32 AM" },
  { id: "2", label: "Screening", status: "warning", description: "Sanctions match" },
  { id: "3", label: "Review", status: "current" },
  { id: "4", label: "Decision", status: "upcoming" },
]} />`,
  },
  "alert-banner": {
    status: "new",
    description:
      "Severity-colored compliance alert banner (info, warning, critical) with icon, title, description, dismiss button, and actions slot.",
    since: "0.11.0",
    importStatement: `import { AlertBanner } from "@cogentic-co/ds/compliance/alert-banner"`,
    dos: [
      "Use at the top of dashboard pages for urgent compliance items",
      "Pass actions for quick triage (e.g. 'Review now')",
    ],
    donts: ["Don't use for success messages — use a toast instead"],
    codeExample: `<AlertBanner
  severity="critical"
  title="3 transactions flagged for immediate review"
  description="High-risk transfers detected."
  actions={<Button size="sm">Review now</Button>}
  onDismiss={() => dismiss()}
/>`,
  },
}
