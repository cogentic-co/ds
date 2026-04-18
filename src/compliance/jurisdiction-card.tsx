"use client"

import { Building2, Scale, Shield } from "lucide-react"
import type { ComponentProps } from "react"
import { Badge } from "../components/badge"
import { Card } from "../components/card"
import { cn, countryFlag } from "../lib/utils"

type FatfStatus = "clear" | "grey_list" | "black_list"
type JurisdictionTravelRuleStatus = "enforced" | "legislated" | "consulting" | "none" | null

type JurisdictionCardLabels = {
  /** Label prefix shown before the travel rule status (e.g. "Travel Rule") */
  travelRulePrefix?: string
  /** Label for the FATF black list badge */
  blackList?: string
  /** Label for the FATF grey list badge */
  greyList?: string
  /** Format the VASPs count line. Defaults to "{count} VASPs" */
  vaspsCount?: (count: number) => string
  /** Format the regulated percentage line. Defaults to "{count} regulated ({percent}%)" */
  regulated?: (count: number, percent: number) => string
  /** Format the Basel AML score. Defaults to "Basel AML {score}" */
  basel?: (score: string) => string
  /** Format the CPI score. Defaults to "CPI {score}" */
  cpi?: (score: number) => string
}

type JurisdictionCardProps = Omit<ComponentProps<typeof Card>, "title"> & {
  /** ISO 3166-1 alpha-2 country code (e.g. "SG", "US") */
  code: string
  /** Country name */
  name: string
  /** Total VASP count for this jurisdiction */
  total: number
  /** Number of regulated VASPs */
  regulated: number
  fatfStatus: FatfStatus
  travelRuleStatus: JurisdictionTravelRuleStatus
  /** Basel AML risk score (lower is better, typically 0-10) */
  baselAmlScore?: number | null
  /** Corruption Perceptions Index score (higher is better, 0-100) */
  cpiScore?: number | null
  /** Override default English labels for i18n */
  labels?: JurisdictionCardLabels
  onClick?: () => void
}

const FATF_VARIANT: Record<FatfStatus, "destructive" | "outline" | "secondary"> = {
  black_list: "destructive",
  grey_list: "outline",
  clear: "secondary",
}

const TRAVEL_RULE_VARIANT: Record<string, "secondary" | "outline"> = {
  enforced: "secondary",
  legislated: "outline",
  consulting: "outline",
}

const DEFAULT_LABELS: Required<JurisdictionCardLabels> = {
  travelRulePrefix: "Travel Rule",
  blackList: "Black list",
  greyList: "Grey list",
  vaspsCount: (count) => `${count} VASPs`,
  regulated: (count, percent) => `${count} regulated (${percent}%)`,
  basel: (score) => `Basel AML ${score}`,
  cpi: (score) => `CPI ${score}`,
}

function JurisdictionCard({
  code,
  name,
  total,
  regulated,
  fatfStatus,
  travelRuleStatus,
  baselAmlScore,
  cpiScore,
  labels,
  onClick,
  className,
  ...props
}: JurisdictionCardProps) {
  const l = { ...DEFAULT_LABELS, ...labels }
  const regulatedPct = total > 0 ? Math.round((regulated / total) * 100) : 0

  return (
    <Card
      data-slot="jurisdiction-card"
      data-fatf={fatfStatus}
      padding="none"
      className={cn(
        "h-full p-4 transition-all duration-200",
        onClick && "cursor-pointer hover:-translate-y-0.5 hover:shadow-md",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      <div className="flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 font-mono text-muted-foreground text-xs">
            <span className="text-base" aria-hidden>
              {countryFlag(code)}
            </span>
            {code}
          </span>
          {fatfStatus !== "clear" && (
            <Badge variant={FATF_VARIANT[fatfStatus]}>
              {fatfStatus === "black_list" ? l.blackList : l.greyList}
            </Badge>
          )}
        </div>

        <div>
          <p className="font-semibold text-sm leading-snug">{name}</p>
          <p className="mt-0.5 text-muted-foreground text-xs">{l.vaspsCount(total)}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {travelRuleStatus && travelRuleStatus !== "none" && (
            <Badge variant={TRAVEL_RULE_VARIANT[travelRuleStatus]}>
              <Shield className="size-3" />
              {l.travelRulePrefix}{" "}
              {travelRuleStatus.charAt(0).toUpperCase() + travelRuleStatus.slice(1)}
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 border-t border-dashed pt-3 text-muted-foreground text-xs">
          <span className="flex items-center gap-1">
            <Building2 className="size-3" />
            {l.regulated(regulated, regulatedPct)}
          </span>
          {baselAmlScore != null && (
            <span className="flex items-center gap-1">
              <Scale className="size-3" />
              {l.basel(Number(baselAmlScore).toFixed(1))}
            </span>
          )}
          {cpiScore != null && <span>{l.cpi(cpiScore)}</span>}
        </div>
      </div>
    </Card>
  )
}

export type {
  FatfStatus,
  JurisdictionCardLabels,
  JurisdictionCardProps,
  JurisdictionTravelRuleStatus,
}
export { JurisdictionCard }
