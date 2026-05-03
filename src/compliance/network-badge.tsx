"use client"

import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps, ReactNode } from "react"
import { cn } from "../lib/utils"
import { CHAIN_ICONS } from "./chain-icons"
import type { ChainNetwork } from "./types"

const networkBadgeVariants = cva(
  "inline-flex items-center gap-1 border px-1.5 py-0.5 font-medium text-xxs leading-tight",
  {
    variants: {
      network: {
        ethereum:
          "border-chain-eth/40 bg-chain-eth/10 text-chain-eth-fg dark:text-chain-eth-fg-dark",
        bitcoin:
          "border-chain-btc/40 bg-chain-btc/10 text-chain-btc-fg dark:text-chain-btc-fg-dark",
        tron: "border-chain-tron/40 bg-chain-tron/10 text-chain-tron-fg dark:text-chain-tron-fg-dark",
        polygon:
          "border-chain-poly/40 bg-chain-poly/10 text-chain-poly-fg dark:text-chain-poly-fg-dark",
        solana: "border-chain-sol/40 bg-chain-sol/10 text-chain-sol-fg dark:text-chain-sol-fg-dark",
        bnb: "border-chain-bnb/40 bg-chain-bnb/10 text-chain-bnb-fg dark:text-chain-bnb-fg-dark",
        unknown: "border-border bg-muted text-muted-foreground",
      },
    },
    defaultVariants: { network: "unknown" },
  },
)

const NETWORK_LABELS: Record<string, string> = {
  ethereum: "Ethereum",
  bitcoin: "Bitcoin",
  tron: "Tron",
  polygon: "Polygon",
  solana: "Solana",
  bnb: "BNB Chain",
}

type NetworkBadgeProps = ComponentProps<"span"> & {
  network: ChainNetwork
  icon?: ReactNode
  label?: string
}

function NetworkBadge({ network, icon, label, className, ...props }: NetworkBadgeProps) {
  const knownNetworks = new Set(["ethereum", "bitcoin", "tron", "polygon", "solana", "bnb"])
  const resolvedNetwork = (knownNetworks.has(network) ? network : "unknown") as NonNullable<
    VariantProps<typeof networkBadgeVariants>["network"]
  >

  return (
    <span
      data-slot="network-badge"
      data-network={network}
      className={cn(networkBadgeVariants({ network: resolvedNetwork }), className)}
      {...props}
    >
      {icon ?? (CHAIN_ICONS[network] ? CHAIN_ICONS[network]({ className: "size-3" }) : null)}
      {label ?? NETWORK_LABELS[network] ?? network}
    </span>
  )
}

export type { NetworkBadgeProps }
export { NetworkBadge, networkBadgeVariants }
