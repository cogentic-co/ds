"use client"

import {
  AlertTriangle,
  ArrowDownLeft,
  ArrowUpRight,
  Check,
  ExternalLink,
  Flag,
  MoreHorizontal,
  RefreshCw,
} from "lucide-react"
import type { ComponentProps, ReactNode } from "react"
import { AddressDisplay } from "../compliance/address-display"
import { CounterpartyIntel } from "../compliance/counterparty-intel"
import { FlowDiagram } from "../compliance/flow-diagram"
import { ReviewerNotes } from "../compliance/reviewer-notes"
import { RiskScoreHero } from "../compliance/risk-score-hero"
import { TravelRuleCard } from "../compliance/travel-rule-card"
import type { ReviewerNote, Transaction, TxDirection, TxStatus } from "../compliance/types"
import { Alert, AlertDescription, AlertTitle } from "../components/alert"
import { Badge } from "../components/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../components/breadcrumb"
import { Button } from "../components/button"
import { Header } from "../components/header"
import { KeyValueList } from "../components/key-value-list"
import {
  Timeline,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "../components/timeline"
import { DIRECTION_TONE_CLASSES } from "../lib/tone"
import { cn } from "../lib/utils"

const TIMELINE_DOT_BG: Record<string, string> = {
  neutral: "bg-muted-foreground border-muted-foreground",
  sky: "bg-sky-ink border-sky-ink",
  mint: "bg-mint-ink border-mint-ink",
  blush: "bg-blush-ink border-blush-ink",
  highlight: "bg-highlight-ink border-highlight-ink",
}

const DIRECTION_ICON: Record<TxDirection, ReactNode> = {
  inbound: <ArrowDownLeft className="size-5" />,
  outbound: <ArrowUpRight className="size-5" />,
  internal: <RefreshCw className="size-5" />,
}

const STATUS_VARIANT: Record<TxStatus, "mint" | "highlight" | "blush" | "secondary"> = {
  verified: "mint",
  review: "highlight",
  blocked: "blush",
  pending: "secondary",
}

// Example: transaction detail page.
//
// Shows how to compose Header + Breadcrumb + RiskScoreHero + FlowDiagram +
// CounterpartyIntel + TravelRuleCard + ReviewerNotes + Timeline + KeyValueList
// into a full transaction-review page. Sample data is inline; layouts are
// not bundled — copy this file into your app and edit freely.

const SAMPLE_TX: Transaction = {
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

function Section({
  title,
  action,
  children,
}: {
  title: string
  action?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="mb-5">
      <div className="mb-2.5 flex items-baseline justify-between">
        <h2 className="font-semibold text-sm">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}

export default function TransactionDetailPage() {
  const tx = SAMPLE_TX
  const notes = tx.notes ?? []
  const sign = tx.dir === "inbound" ? "+" : tx.dir === "outbound" ? "−" : ""
  return (
    <div data-slot="transaction-detail-page">
      <Header
        bordered
        breadcrumb={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/transactions">Transactions</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="font-mono text-foreground">{tx.ref}</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
        leadingIcon={
          <span
            className={cn(
              "flex size-12 items-center justify-center rounded-md",
              DIRECTION_TONE_CLASSES[tx.dir],
            )}
          >
            {DIRECTION_ICON[tx.dir]}
          </span>
        }
        title={
          <span
            className="font-mono font-semibold"
            style={{ fontSize: 30, letterSpacing: "-0.02em" }}
          >
            {sign}
            {tx.amt} <span className="font-medium text-muted-foreground">{tx.asset}</span>
          </span>
        }
        badges={<Badge variant={STATUS_VARIANT[tx.status]}>{tx.status}</Badge>}
        subtitle={
          <span className="font-mono">
            {tx.usd} · {tx.time}
          </span>
        }
        actions={
          <>
            <Button
              variant="ghost"
              render={
                <a href={`https://etherscan.io/tx/${tx.hash}`} target="_blank" rel="noreferrer">
                  <ExternalLink className="size-3.5" /> Explorer
                </a>
              }
            />
            <Button variant="secondary">
              <Flag className="size-3.5" /> Escalate
            </Button>
            <Button>
              <Check className="size-3.5" /> Approve
            </Button>
            <Button variant="ghost" size="icon" aria-label="More actions">
              <MoreHorizontal className="size-4" />
            </Button>
          </>
        }
      />

      {tx.flags.length > 0 && (
        <div className="mx-6 mt-4">
          <Alert variant={tx.status === "blocked" ? "destructive" : "warning"}>
            <AlertTriangle />
            <AlertTitle>
              {tx.flags.length} compliance flag{tx.flags.length > 1 ? "s" : ""}
            </AlertTitle>
            <AlertDescription className="font-mono text-xxs uppercase tracking-wide">
              {tx.flags.join(" · ").replace(/_/g, " ")}
            </AlertDescription>
          </Alert>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 px-6 py-5 pb-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0">
          {tx.riskDrivers && tx.riskDrivers.length > 0 && (
            <Section title="Risk assessment">
              <RiskScoreHero score={tx.risk} drivers={tx.riskDrivers} />
            </Section>
          )}

          <Section title="Flow">
            <FlowDiagram from={tx.from} to={tx.to} network={tx.net} fee={tx.fee} />
          </Section>

          <Section title="On-chain details">
            <KeyValueList
              items={[
                {
                  label: "Transaction hash",
                  mono: true,
                  value: <AddressDisplay address={tx.hash} copyable />,
                },
                {
                  label: "Block",
                  mono: true,
                  value: tx.block.toLocaleString(),
                },
                {
                  label: "Confirmations",
                  mono: true,
                  value: tx.confirmations,
                },
                {
                  label: "Network",
                  value: `${tx.net}${tx.chainId ? ` · chain ${tx.chainId}` : ""}`,
                },
                { label: "Network fee", mono: true, value: tx.fee },
                ...(tx.gasUsed != null
                  ? [
                      {
                        label: "Gas used",
                        mono: true,
                        value: tx.gasUsed.toLocaleString(),
                      },
                    ]
                  : []),
                ...(tx.nonce != null
                  ? [
                      {
                        label: "Nonce",
                        mono: true,
                        value: tx.nonce.toLocaleString(),
                      },
                    ]
                  : []),
              ]}
            />
          </Section>

          <Section
            title="Reviewer notes"
            action={<span className="text-muted-foreground text-xs">{notes.length} notes</span>}
          >
            <ReviewerNotes notes={notes} />
          </Section>
        </div>

        <aside>
          {tx.timeline && tx.timeline.length > 0 && (
            <Section title="Timeline">
              <div className="rounded-lg border border-border bg-card p-4 shadow-card">
                <Timeline className="pl-6">
                  {tx.timeline.map((e, i) => (
                    <TimelineItem key={`${e.time}-${e.title}-${i}`}>
                      <TimelineDot className={cn("size-2.5", TIMELINE_DOT_BG[e.variant])} />
                      <TimelineContent>
                        <TimelineTime className="font-mono">{e.time}</TimelineTime>
                        <TimelineTitle className="text-sm-plus">{e.title}</TimelineTitle>
                        <p className="mt-0.5 text-muted-foreground text-xs">{e.by}</p>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </div>
            </Section>
          )}

          <Section title="Counterparty intel">
            <CounterpartyIntel
              title=""
              firstSeen="Mar 14, 2026"
              firstSeenHint="34 days ago"
              priorStats={{
                label: "Prior w/ us",
                value: "3 tx · $66,200",
                hint: "All outbound, all <$50k",
              }}
              related={tx.related}
            />
          </Section>

          {tx.travelRule && (
            <Section title="Travel rule">
              <TravelRuleCard
                framed={false}
                provider="Notabene"
                status={tx.travelRule}
                body="Originator data sent. Awaiting beneficiary VASP response."
              />
            </Section>
          )}
        </aside>
      </div>
    </div>
  )
}
