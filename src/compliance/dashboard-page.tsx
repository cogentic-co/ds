"use client"

import { Download, Plus } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"

import { Button } from "../components/button"
import { KpiCard } from "../components/kpi-card"
import { cn } from "../lib/utils"
import { AwaitingReviewCard } from "./awaiting-review-card"
import { RiskExposureCard } from "./risk-exposure-card"
import { TransactionFlowCard } from "./transaction-flow-card"

type DashboardPageProps = Omit<ComponentProps<"div">, "children"> & {
  greeting?: string
  tagline?: ReactNode
  onExport?: () => void
  onNewCase?: () => void
  extraContent?: ReactNode
}

function DashboardPage({
  greeting = "Good afternoon, Mia.",
  tagline,
  onExport,
  onNewCase,
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
        />
      </div>

      {extraContent}
    </div>
  )
}

export { DashboardPage }
export type { DashboardPageProps }
