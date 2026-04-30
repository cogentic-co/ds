"use client"

import { Copy, ExternalLink } from "lucide-react"
import type { ComponentProps } from "react"
import { cn } from "../lib/utils"

type AddressDisplayProps = ComponentProps<"span"> & {
  address: string
  /** Human-readable label (e.g. VASP name) shown instead of/alongside the address */
  label?: string
  /** Full address shown in tooltip / title attr; truncation is automatic */
  truncate?: boolean
  /** Number of chars to show at start and end when truncated. Default: 6 */
  chars?: number
  /** URL to a block explorer for this address */
  explorerUrl?: string
  /** Show a copy button. Default: true */
  copyable?: boolean
  /** Inline risk pill (0-100) */
  riskScore?: number
}

function truncateAddress(address: string, chars = 6) {
  if (address.length <= chars * 2 + 3) return address
  return `${address.slice(0, chars)}...${address.slice(-chars)}`
}

function AddressDisplay({
  address,
  label,
  truncate = true,
  chars = 6,
  explorerUrl,
  copyable = true,
  riskScore,
  className,
  ...props
}: AddressDisplayProps) {
  const displayed = truncate ? truncateAddress(address, chars) : address

  return (
    <span
      data-slot="address-display"
      className={cn("inline-flex min-w-0 items-center gap-1.5 font-mono text-xs", className)}
      title={address}
      {...props}
    >
      {label && (
        <span className="min-w-0 truncate font-medium font-sans text-foreground">{label}</span>
      )}
      <span className="min-w-0 truncate text-muted-foreground">{displayed}</span>
      {riskScore != null && <RiskDot score={riskScore} />}
      {copyable && (
        <button
          type="button"
          className="text-muted-foreground/50 transition-colors hover:text-foreground"
          onClick={() => navigator.clipboard.writeText(address)}
          aria-label="Copy address"
        >
          <Copy className="size-3" />
        </button>
      )}
      {explorerUrl && (
        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground/50 transition-colors hover:text-foreground"
          aria-label="View on explorer"
        >
          <ExternalLink className="size-3" />
        </a>
      )}
    </span>
  )
}

function RiskDot({ score }: { score: number }) {
  const color = score >= 70 ? "bg-destructive" : score >= 40 ? "bg-warning" : "bg-success"
  return (
    <span
      className={cn("inline-block size-1.5 rounded-full", color)}
      title={`Risk: ${score}/100`}
      aria-label={`Risk score ${score}`}
    />
  )
}

export type { AddressDisplayProps }
export { AddressDisplay }
