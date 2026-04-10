"use client"

import { type ComponentProps, useCallback } from "react"
import { FilterBar, FilterChip, FilterClear } from "../components/filter-bar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/select"
import { cn } from "../lib/utils"
import type { ChainNetwork, ComplianceStatus, TransactionDirection } from "./types"

type TransactionFilters = {
  status?: ComplianceStatus | ""
  direction?: TransactionDirection | ""
  network?: ChainNetwork | ""
  riskMin?: number
  riskMax?: number
  dateFrom?: string
  dateTo?: string
}

type TransactionFiltersProps = ComponentProps<"div"> & {
  filters: TransactionFilters
  onFiltersChange: (filters: TransactionFilters) => void
  networks?: { value: string; label: string }[]
}

const DEFAULT_NETWORKS = [
  { value: "ethereum", label: "Ethereum" },
  { value: "bitcoin", label: "Bitcoin" },
  { value: "tron", label: "Tron" },
  { value: "polygon", label: "Polygon" },
  { value: "solana", label: "Solana" },
  { value: "bnb", label: "BNB Chain" },
]

const STATUS_LABELS: Record<ComplianceStatus, string> = {
  pending: "Pending",
  accepted: "Accepted",
  rejected: "Rejected",
  flagged: "Flagged",
  escalated: "Escalated",
}

const DIRECTION_LABELS: Record<TransactionDirection, string> = {
  inbound: "Inbound",
  outbound: "Outbound",
  internal: "Internal",
}

function hasFilters(filters: TransactionFilters): boolean {
  return !!(
    filters.status ||
    filters.direction ||
    filters.network ||
    filters.dateFrom ||
    filters.dateTo
  )
}

function TransactionFilterBar({
  filters,
  onFiltersChange,
  networks = DEFAULT_NETWORKS,
  className,
  ...props
}: TransactionFiltersProps) {
  const update = useCallback(
    (patch: Partial<TransactionFilters>) => onFiltersChange({ ...filters, ...patch }),
    [filters, onFiltersChange],
  )

  const clear = useCallback(
    () =>
      onFiltersChange({
        status: "",
        direction: "",
        network: "",
        dateFrom: "",
        dateTo: "",
      }),
    [onFiltersChange],
  )

  const networkLabel = filters.network
    ? (networks.find((n) => n.value === filters.network)?.label ?? filters.network)
    : undefined

  return (
    <FilterBar className={className} {...props}>
      {filters.status ? (
        <FilterChip
          label="Status"
          value={STATUS_LABELS[filters.status as ComplianceStatus]}
          onRemove={() => update({ status: "" })}
        />
      ) : (
        <Select value="" onValueChange={(v) => update({ status: v as ComplianceStatus })}>
          <SelectTrigger className="h-8 w-28 border-dashed text-xs">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(STATUS_LABELS).map(([k, v]) => (
              <SelectItem key={k} value={k}>{v}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {filters.direction ? (
        <FilterChip
          label="Direction"
          value={DIRECTION_LABELS[filters.direction as TransactionDirection]}
          onRemove={() => update({ direction: "" })}
        />
      ) : (
        <Select value="" onValueChange={(v) => update({ direction: v as TransactionDirection })}>
          <SelectTrigger className="h-8 w-28 border-dashed text-xs">
            <SelectValue placeholder="Direction" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(DIRECTION_LABELS).map(([k, v]) => (
              <SelectItem key={k} value={k}>{v}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {filters.network ? (
        <FilterChip
          label="Network"
          value={networkLabel}
          onRemove={() => update({ network: "" })}
        />
      ) : (
        <Select value="" onValueChange={(v) => update({ network: v as ChainNetwork })}>
          <SelectTrigger className="h-8 w-28 border-dashed text-xs">
            <SelectValue placeholder="Network" />
          </SelectTrigger>
          <SelectContent>
            {networks.map((n) => (
              <SelectItem key={n.value} value={n.value}>{n.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {filters.dateFrom && (
        <FilterChip label="From" value={filters.dateFrom} onRemove={() => update({ dateFrom: "" })} />
      )}
      {filters.dateTo && (
        <FilterChip label="To" value={filters.dateTo} onRemove={() => update({ dateTo: "" })} />
      )}

      {hasFilters(filters) && <FilterClear onClick={clear} />}
    </FilterBar>
  )
}

export { TransactionFilterBar }
export type { TransactionFilters, TransactionFiltersProps }
