import type { ComponentProps, ReactNode } from "react"

import { KeyValueList } from "../components/key-value-list"
import { cn } from "../lib/utils"
import { AddressDisplay } from "./address-display"
import { CounterpartyIntel } from "./counterparty-intel"
import { EventTimeline } from "./event-timeline"
import { FlagCallout } from "./flag-callout"
import { FlowDiagram } from "./flow-diagram"
import { ReviewerNotes } from "./reviewer-notes"
import { RiskScoreHero } from "./risk-score-hero"
import { TransactionHeader } from "./transaction-header"
import { TravelRuleCard } from "./travel-rule-card"
import type { ReviewerNote, Transaction } from "./types"

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
  return (
    <div data-slot="transaction-detail-page" className={cn(className)} {...props}>
      <TransactionHeader
        tx={tx}
        backHref={backHref}
        explorerHref={explorerHref}
        onApprove={onApprove}
        onEscalate={onEscalate}
      />

      {tx.flags.length > 0 && (
        <div className="mx-6 mt-4">
          <FlagCallout flags={tx.flags} tone={tx.status === "blocked" ? "blush" : "highlight"} />
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
                <EventTimeline events={tx.timeline} />
              </div>
            </Section>
          )}

          <Section title="Counterparty intel">
            {renderIntel ? (
              renderIntel(tx)
            ) : (
              <CounterpartyIntel
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
