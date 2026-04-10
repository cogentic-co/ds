"use client"

import { ExternalLink, Wallet } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"
import { Badge } from "../components/badge"
import { cn } from "../lib/utils"
import { AddressDisplay } from "./address-display"
import { NetworkBadge } from "./network-badge"
import { RiskScoreInline } from "./risk-score-inline"
import type { ChainNetwork } from "./types"

type WalletProfileProps = ComponentProps<"div"> & {
  address: string
  /** Human-readable label (e.g. VASP name, ENS) */
  label?: string
  network: ChainNetwork
  riskScore?: number
  /** Type badge (e.g. "VASP", "Unhosted", "Exchange", "DeFi") */
  type?: string
  /** URL to block explorer for this address */
  explorerUrl?: string
  /** Tags/labels applied to this wallet */
  tags?: string[]
  /** Stats rendered in a row below the header (e.g. total volume, tx count, first seen) */
  stats?: { label: string; value: string }[]
  /** Actions slot (e.g. Add label, Flag, Block) */
  actions?: ReactNode
  /** Content below header (e.g. linked transactions, risk chart) */
  children?: ReactNode
}

function WalletProfile({
  address,
  label,
  network,
  riskScore,
  type,
  explorerUrl,
  tags,
  stats,
  actions,
  children,
  className,
  ...props
}: WalletProfileProps) {
  return (
    <div
      data-slot="wallet-profile"
      className={cn("flex flex-col gap-5", className)}
      {...props}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
            <Wallet className="size-5 text-muted-foreground" />
          </span>
          <div className="flex flex-col gap-1.5">
            {label && <h2 className="font-semibold text-lg leading-tight">{label}</h2>}
            <AddressDisplay address={address} truncate={!label} chars={label ? 6 : 10} />
            <div className="flex flex-wrap items-center gap-1.5">
              <NetworkBadge network={network} />
              {type && (
                <Badge square variant="outline" className="px-1.5 py-0.5 text-[10px] uppercase leading-none">
                  {type}
                </Badge>
              )}
              {riskScore != null && <RiskScoreInline score={riskScore} showLabel />}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {explorerUrl && (
            <a
              href={explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-focal text-xs hover:underline"
            >
              Explorer <ExternalLink className="size-3" />
            </a>
          )}
          {actions}
        </div>
      </div>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge key={tag} square variant="secondary" className="text-[10px]">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {stats && stats.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col rounded-lg border border-border p-3">
              <span className="text-muted-foreground text-[11px]">{stat.label}</span>
              <span className="font-mono font-semibold text-sm tabular-nums">{stat.value}</span>
            </div>
          ))}
        </div>
      )}

      {children}
    </div>
  )
}

export { WalletProfile }
export type { WalletProfileProps }
