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
  sky: "bg-[var(--sky-ink)] border-[var(--sky-ink)]",
  mint: "bg-[var(--mint-ink)] border-[var(--mint-ink)]",
  blush: "bg-[var(--blush-ink)] border-[var(--blush-ink)]",
  highlight: "bg-[var(--highlight-ink)] border-[var(--highlight-ink)]",
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

type TransactionDetailPageProps = ComponentProps<"div"> & {
  tx: Transaction
  onApprove?: () => void
  onEscalate?: () => void
  onSubmitNote?: (body: string) => void
  explorerHref?: string
  backHref?: string
  notes?: ReviewerNote[]
  renderIntel?: (tx: Transaction) => ReactNode
  renderTravelRule?: (tx: Transaction) => ReactNode
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

function TransactionDetailPage({
  tx,
  onApprove,
  onEscalate,
  onSubmitNote,
  explorerHref,
  backHref,
  notes = tx.notes ?? [],
  renderIntel,
  renderTravelRule,
  className,
  ...props
}: TransactionDetailPageProps) {
  const sign = tx.dir === "inbound" ? "+" : tx.dir === "outbound" ? "−" : ""
  return (
    <div data-slot="transaction-detail-page" className={cn(className)} {...props}>
      <Header
        bordered
        breadcrumb={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={backHref ?? "/transactions"}>Transactions</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="font-mono text-foreground">{tx.ref}</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
        leadingIcon={
          <span
            className={cn(
              "flex size-12 items-center justify-center rounded-[var(--radius-md)]",
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
            {explorerHref && (
              <Button
                variant="ghost"
                render={
                  <a href={explorerHref} target="_blank" rel="noreferrer">
                    <ExternalLink className="size-3.5" /> Explorer
                  </a>
                }
              />
            )}
            <Button variant="secondary" onClick={onEscalate}>
              <Flag className="size-3.5" /> Escalate
            </Button>
            <Button onClick={onApprove}>
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
            <AlertDescription className="font-mono text-[11px] uppercase tracking-wide">
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
            <ReviewerNotes notes={notes} onSubmit={onSubmitNote} />
          </Section>
        </div>

        <aside>
          {tx.timeline && tx.timeline.length > 0 && (
            <Section title="Timeline">
              <div className="rounded-[var(--radius-lg)] border border-border bg-card p-4 shadow-[var(--shadow-card)]">
                <Timeline className="pl-6">
                  {tx.timeline.map((e, i) => (
                    <TimelineItem key={`${e.time}-${e.title}-${i}`}>
                      <TimelineDot className={cn("size-2.5", TIMELINE_DOT_BG[e.variant])} />
                      <TimelineContent>
                        <TimelineTime className="font-mono">{e.time}</TimelineTime>
                        <TimelineTitle className="text-[13px]">{e.title}</TimelineTitle>
                        <p className="mt-0.5 text-muted-foreground text-xs">{e.by}</p>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </div>
            </Section>
          )}

          <Section title="Counterparty intel">
            {renderIntel ? (
              renderIntel(tx)
            ) : (
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
            )}
          </Section>

          {tx.travelRule && (
            <Section title="Travel rule">
              {renderTravelRule ? (
                renderTravelRule(tx)
              ) : (
                <TravelRuleCard
                  framed={false}
                  provider="Notabene"
                  status={tx.travelRule}
                  body="Originator data sent. Awaiting beneficiary VASP response."
                />
              )}
            </Section>
          )}
        </aside>
      </div>
    </div>
  )
}

export type { TransactionDetailPageProps }
export { TransactionDetailPage }
