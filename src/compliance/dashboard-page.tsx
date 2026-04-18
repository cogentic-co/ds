"use client"

import { Download, Plus } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"

import { Button } from "../components/button"
import { KpiCard } from "../components/kpi-card"
import { cn } from "../lib/utils"
import { AlertsCard } from "./alerts-card"
import { AwaitingReviewCard } from "./awaiting-review-card"
import { RecentTransactionsCard } from "./recent-transactions-card"
import { RiskExposureCard } from "./risk-exposure-card"
import { TransactionFlowCard } from "./transaction-flow-card"
import type { Transaction } from "./types"

const DEFAULT_TXS: Transaction[] = [
  {
    id: "d1",
    ref: "TX-1",
    dir: "inbound",
    amt: "158,420",
    asset: "USDC",
    usd: "$158,420",
    fee: "$1.24",
    net: "ETH",
    hash: "0x11aa",
    block: 0,
    confirmations: 22,
    status: "verified",
    risk: 22,
    time: "Apr 17 · 14:32",
    flags: [],
    from: {
      lbl: "Binance",
      addr: "0xaaaa",
      type: "VASP",
      verified: true,
    },
    to: {
      lbl: "Kraken",
      addr: "0xbbbb",
      type: "VASP",
      verified: true,
    },
  },
  {
    id: "d2",
    ref: "TX-2",
    dir: "outbound",
    amt: "125,000",
    asset: "USDC",
    usd: "$125,000",
    fee: "$1.82",
    net: "ETH",
    hash: "0x22bb",
    block: 0,
    confirmations: 18,
    status: "review",
    risk: 78,
    time: "Apr 17 · 14:18",
    flags: ["high_value"],
    from: {
      lbl: "Cogentic Treasury",
      addr: "0x742d",
      type: "Internal",
      verified: true,
    },
    to: {
      lbl: "Unknown wallet",
      addr: "0x9b2a",
      type: "External · unverified",
      verified: false,
    },
  },
  {
    id: "d3",
    ref: "TX-3",
    dir: "inbound",
    amt: "172,308",
    asset: "USDC",
    usd: "$172,308",
    fee: "$0.92",
    net: "ETH",
    hash: "0x33cc",
    block: 0,
    confirmations: 8,
    status: "verified",
    risk: 8,
    time: "Apr 17 · 13:56",
    flags: [],
    from: {
      lbl: "Coinbase Prime",
      addr: "0xcccc",
      type: "VASP",
      verified: true,
    },
    to: {
      lbl: "Fireblocks Vault",
      addr: "0xdddd",
      type: "VASP",
      verified: true,
    },
  },
  {
    id: "d4",
    ref: "TX-4",
    dir: "inbound",
    amt: "812,250",
    asset: "BTC",
    usd: "$812,250",
    fee: "$5.40",
    net: "BTC",
    hash: "0x44dd",
    block: 0,
    confirmations: 95,
    status: "blocked",
    risk: 95,
    time: "Apr 17 · 12:44",
    flags: ["sanctions_match"],
    from: {
      lbl: "Sanctioned address",
      addr: "0xdead",
      type: "External",
      verified: false,
    },
    to: {
      lbl: "Cogentic Treasury",
      addr: "0x742d",
      type: "Internal",
      verified: true,
    },
  },
]

const DEFAULT_ALERTS = [
  {
    id: "a1",
    tone: "blush" as const,
    title: "Sanctions match — TX-6621",
    body: "Inbound 12.75 BTC from OFAC-listed address. Blocked automatically.",
    time: "2m ago",
  },
  {
    id: "a2",
    tone: "highlight" as const,
    title: "High-value review — TX-0182",
    body: "125K USDC to unverified counterparty. Awaiting Mia's approval.",
    time: "8m ago",
  },
  {
    id: "a3",
    tone: "sky" as const,
    title: "Travel rule SLA breached",
    body: "Notabene counterparty VASP has not responded in 12m (SLA: 5m).",
    time: "14m ago",
  },
  {
    id: "a4",
    tone: "lilac" as const,
    title: "Rule updated",
    body: "“Mixer exposure threshold” lowered to $10K by Priya R.",
    time: "1h ago",
  },
]

type DashboardPageProps = Omit<ComponentProps<"div">, "children"> & {
  greeting?: string
  tagline?: ReactNode
  onExport?: () => void
  onNewCase?: () => void
  /** Recent transactions shown in the bottom-left card. Defaults to sample data. */
  recentTransactions?: Transaction[]
  /** Alerts shown in the bottom-right card. Defaults to sample data. */
  alerts?: Array<{
    id: string
    tone: "highlight" | "blush" | "sky" | "lilac" | "mint"
    title: string
    body: ReactNode
    time: string
  }>
  onViewAllTransactions?: () => void
  onViewAllAlerts?: () => void
  extraContent?: ReactNode
}

function DashboardPage({
  greeting = "Good afternoon, Mia.",
  tagline,
  onExport,
  onNewCase,
  recentTransactions = DEFAULT_TXS,
  alerts = DEFAULT_ALERTS,
  onViewAllTransactions,
  onViewAllAlerts,
  extraContent,
  className,
  ...props
}: DashboardPageProps) {
  return (
    <div
      data-slot="dashboard-page"
      className={cn("px-6 pt-5 pb-8", className)}
      {...props}
    >
      {/* Welcome strip */}
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div
            className="font-semibold"
            style={{ fontSize: 22, letterSpacing: "-0.02em" }}
          >
            {greeting}
          </div>
          {tagline && (
            <div className="mt-1 text-[13px] text-muted-foreground">{tagline}</div>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onExport}>
            <Download className="size-[13px]" /> Export report
          </Button>
          <Button onClick={onNewCase}>
            <Plus className="size-[13px]" /> New case
          </Button>
        </div>
      </div>

      {/* KPI row */}
      <div className="mb-4 grid grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Volume · 24h"
          value="$2.40M"
          delta="+18.2%"
          deltaTone="positive"
          sparkline={[420, 480, 520, 460, 550, 610, 640, 590, 680, 710, 820, 890, 1420]}
        />
        <KpiCard
          label="In review"
          value="12"
          delta="+3"
          deltaTone="negative"
          hint="Avg age 2h 14m"
          sparkline={[5, 7, 6, 8, 9, 8, 10, 9, 11, 10, 12, 11, 12]}
          sparklineColor="var(--highlight-ink)"
        />
        <KpiCard
          label="Blocked · 24h"
          value="$820K"
          delta="1 event"
          deltaTone="negative"
          hint="OFAC match on TX-6621"
          sparkline={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 820]}
          sparklineColor="var(--destructive)"
          sparklineFill={false}
        />
        <KpiCard
          label="Avg risk score"
          value="31"
          delta="−4.1%"
          deltaTone="positive"
          hint="Rolling 7-day window"
          sparkline={[38, 36, 37, 35, 34, 32, 33, 32, 31, 30, 32, 31, 31]}
          sparklineColor="var(--success)"
        />
      </div>

      {/* Three-up card row (flow / risk / queue) */}
      <div className="mb-4 grid grid-cols-1 gap-3.5 lg:grid-cols-3">
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
        <RiskExposureCard
          value="$2.1M"
          delta="−8.4%"
          deltaTone="positive"
          bars={[12, 18, 14, 22, 28, 24, 31, 26, 34, 40, 36, 48, 42]}
          rangeStart="Apr 5"
          rangeEnd="Apr 17"
        />
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

      {/* Recent transactions + Alerts */}
      <div className="mb-4 grid grid-cols-1 gap-3.5 lg:grid-cols-2">
        <RecentTransactionsCard
          transactions={recentTransactions}
          onViewAll={onViewAllTransactions}
        />
        <AlertsCard alerts={alerts} onViewAll={onViewAllAlerts} />
      </div>

      {extraContent}
    </div>
  )
}

export { DashboardPage }
export type { DashboardPageProps }
