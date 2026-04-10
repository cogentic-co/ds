"use client"

import { Filter, X } from "lucide-react"
import { type ComponentProps, useCallback, useState } from "react"
import { Badge } from "../components/badge"
import { Button } from "../components/button"
import { Input } from "../components/input"
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
  search?: string
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
  /** Networks to show in the network dropdown */
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

function activeFilterCount(filters: TransactionFilters): number {
  let count = 0
  if (filters.search) count++
  if (filters.status) count++
  if (filters.direction) count++
  if (filters.network) count++
  if (filters.riskMin != null || filters.riskMax != null) count++
  if (filters.dateFrom || filters.dateTo) count++
  return count
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
        search: "",
        status: "",
        direction: "",
        network: "",
        riskMin: undefined,
        riskMax: undefined,
        dateFrom: "",
        dateTo: "",
      }),
    [onFiltersChange],
  )

  const count = activeFilterCount(filters)

  return (
    <div
      data-slot="transaction-filters"
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    >
      <div className="relative">
        <Filter className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={filters.search ?? ""}
          onChange={(e) => update({ search: e.target.value })}
          placeholder="Search hash, address, VASP..."
          className="h-8 w-56 pl-8 font-mono text-xs"
        />
      </div>

      <Select value={filters.status ?? ""} onValueChange={(v) => update({ status: v as ComplianceStatus })}>
        <SelectTrigger className="h-8 w-32 text-xs">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="accepted">Accepted</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
          <SelectItem value="flagged">Flagged</SelectItem>
          <SelectItem value="escalated">Escalated</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.direction ?? ""} onValueChange={(v) => update({ direction: v as TransactionDirection })}>
        <SelectTrigger className="h-8 w-28 text-xs">
          <SelectValue placeholder="Direction" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="inbound">Inbound</SelectItem>
          <SelectItem value="outbound">Outbound</SelectItem>
          <SelectItem value="internal">Internal</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.network ?? ""} onValueChange={(v) => update({ network: v as ChainNetwork })}>
        <SelectTrigger className="h-8 w-28 text-xs">
          <SelectValue placeholder="Network" />
        </SelectTrigger>
        <SelectContent>
          {networks.map((n) => (
            <SelectItem key={n.value} value={n.value}>
              {n.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="date"
        value={filters.dateFrom ?? ""}
        onChange={(e) => update({ dateFrom: e.target.value })}
        className="h-8 w-32 text-xs"
        placeholder="From"
      />
      <Input
        type="date"
        value={filters.dateTo ?? ""}
        onChange={(e) => update({ dateTo: e.target.value })}
        className="h-8 w-32 text-xs"
        placeholder="To"
      />

      {count > 0 && (
        <Button variant="ghost" size="sm" onClick={clear} className="h-8 gap-1 text-xs">
          <X className="size-3" />
          Clear
          <Badge square variant="secondary" className="ml-1 px-1 py-0 text-[9px]">
            {count}
          </Badge>
        </Button>
      )}
    </div>
  )
}

export { TransactionFilterBar }
export type { TransactionFilters, TransactionFiltersProps }
