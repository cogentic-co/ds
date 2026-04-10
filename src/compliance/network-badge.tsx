"use client"

import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps, ReactNode } from "react"
import { cn } from "../lib/utils"
import { CHAIN_ICONS } from "./chain-icons"
import type { ChainNetwork } from "./types"

const networkBadgeVariants = cva(
  "inline-flex items-center gap-1 border px-1.5 py-0.5 font-medium text-[11px] leading-tight",
  {
    variants: {
      network: {
        ethereum: "border-[#4B64C8]/40 bg-[#4B64C8]/10 text-[#3B50A8] dark:text-[#8DA0FF]",
        bitcoin: "border-[#E8820A]/40 bg-[#E8820A]/10 text-[#C06C00] dark:text-[#F5A623]",
        tron: "border-[#D4000F]/40 bg-[#D4000F]/10 text-[#B8000D] dark:text-[#FF4D5C]",
        polygon: "border-[#7038C8]/40 bg-[#7038C8]/10 text-[#5B2DA8] dark:text-[#A674FF]",
        solana: "border-[#8030E0]/40 bg-[#8030E0]/10 text-[#6A24BD] dark:text-[#B468FF]",
        bnb: "border-[#C89A00]/40 bg-[#C89A00]/10 text-[#9E7A00] dark:text-[#F0C030]",
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

function NetworkBadge({
  network,
  icon,
  label,
  className,
  ...props
}: NetworkBadgeProps) {
  const knownNetworks = new Set(["ethereum", "bitcoin", "tron", "polygon", "solana", "bnb"])
  const resolvedNetwork = (
    knownNetworks.has(network) ? network : "unknown"
  ) as NonNullable<VariantProps<typeof networkBadgeVariants>["network"]>

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

export { NetworkBadge, networkBadgeVariants }
export type { NetworkBadgeProps }
