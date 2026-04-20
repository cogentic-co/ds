"use client"

import { Building2, Shield, ShieldAlert, ShieldCheck, Wallet } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"
import { cn, countryFlag } from "../lib/utils"
import { RiskScoreInline } from "./risk-score-inline"

type CounterpartyType = "vasp" | "unhosted" | "unknown"

type CounterpartyCardProps = ComponentProps<"div"> & {
  /** Counterparty type */
  type: CounterpartyType
  /** VASP or wallet name */
  name: string
  /** Optional logo/avatar */
  logo?: ReactNode
  /** Two-letter country code (rendered as flag emoji) */
  jurisdiction?: string
  /** Registration status text (e.g. "MAS Licensed", "Unregistered") */
  registrationStatus?: string
  /** Whether the counterparty is registered/verified */
  verified?: boolean
  /** Risk score 0-100 */
  riskScore?: number
  /** Extra info rendered below the header */
  children?: ReactNode
}

const TYPE_ICONS: Record<CounterpartyType, ReactNode> = {
  vasp: <Building2 className="size-4" />,
  unhosted: <Wallet className="size-4" />,
  unknown: <ShieldAlert className="size-4" />,
}

const TYPE_LABELS: Record<CounterpartyType, string> = {
  vasp: "VASP",
  unhosted: "Unhosted wallet",
  unknown: "Unknown",
}

function CounterpartyCard({
  type,
  name,
  logo,
  jurisdiction,
  registrationStatus,
  verified,
  riskScore,
  children,
  className,
  ...props
}: CounterpartyCardProps) {
  return (
    <div
      data-slot="counterparty-card"
      data-type={type}
      className={cn(
        "flex flex-col gap-3 rounded-[var(--radius-md)] border border-border bg-card p-4 text-sm shadow-[var(--shadow-card)]",
        type === "unhosted" && "border-[var(--highlight-ink)]/40",
        className,
      )}
      {...props}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-lg",
            type === "vasp" && "bg-focal-soft text-focal",
            type === "unhosted" && "bg-warning/15 text-warning-foreground",
            type === "unknown" && "bg-muted text-muted-foreground",
          )}
        >
          {logo ?? TYPE_ICONS[type]}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate font-semibold text-foreground">{name}</span>
            {verified != null &&
              (verified ? (
                <ShieldCheck className="size-3.5 shrink-0 text-success" />
              ) : (
                <Shield className="size-3.5 shrink-0 text-muted-foreground" />
              ))}
          </div>
          <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-muted-foreground text-xs">
            <span className="border border-border bg-muted/60 px-1.5 py-0.5 font-medium text-[10px] uppercase">
              {TYPE_LABELS[type]}
            </span>
            {jurisdiction && (
              <span className="border border-border bg-muted/60 px-1.5 py-0.5 font-medium text-[10px]">
                {countryFlag(jurisdiction)} {jurisdiction.toUpperCase()}
              </span>
            )}
            {registrationStatus && (
              <span className="text-[10px] text-muted-foreground">{registrationStatus}</span>
            )}
          </div>
        </div>
        {riskScore != null && <RiskScoreInline score={riskScore} showLabel />}
      </div>
      {children}
    </div>
  )
}

export type { CounterpartyCardProps }
export { CounterpartyCard }
