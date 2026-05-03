"use client"

import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  ChevronRight,
  Clock,
  Package,
  RefreshCw,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  type ColumnDef,
  DataTable,
  DataTableColumnHeader,
  DataTableFacetedFilter,
  DataTablePagination,
  DataTableToolbar,
  useDataTable,
} from "@/components/ui/data-table"
import { Input } from "@/components/ui/input"
import { DIRECTION_TONE_CLASSES } from "@/src/lib/tone"
import { cn } from "@/src/lib/utils"
import { Section } from "./_shared"

type Order = {
  id: string
  customer: string
  status: string
  amount: string
  items: number
}

const orderStatusOptions = [
  { label: "Fulfilled", value: "Fulfilled", icon: CheckCircle },
  { label: "Ready for pickup", value: "Ready for pickup", icon: Package },
  { label: "Unfulfilled", value: "Unfulfilled", icon: Clock },
]

const orderColumns: ColumnDef<Order, unknown>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Order" />,
    cell: ({ row }) => <div className="font-mono">{row.original.id}</div>,
    enableHiding: false,
    meta: { label: "Order" },
  },
  {
    accessorKey: "customer",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
    cell: ({ row }) => <div className="max-w-[150px] truncate">{row.original.customer}</div>,
    meta: { label: "Customer" },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <Badge
          variant={
            status === "Fulfilled"
              ? "default"
              : status === "Ready for pickup"
                ? "secondary"
                : "outline"
          }
          className="gap-1 whitespace-nowrap"
        >
          {status}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      if (!Array.isArray(value) || value.length === 0) return true
      return value.includes(String(row.getValue(id)))
    },
    enableSorting: false,
    meta: { label: "Status" },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    cell: ({ row }) => <div className="text-right font-mono">{row.original.amount}</div>,
    meta: { label: "Amount" },
  },
]

const orderData: Order[] = [
  { id: "#301456", customer: "Sarah Johnson", status: "Fulfilled", amount: "$2,500", items: 3 },
  { id: "#789123", customer: "Michael Brown", status: "Fulfilled", amount: "$1,200", items: 2 },
  { id: "#654321", customer: "Emily Davis", status: "Unfulfilled", amount: "$3,100", items: 4 },
  { id: "#987654", customer: "David Lee", status: "Ready for pickup", amount: "$800", items: 1 },
  { id: "#432187", customer: "Lisa Wang", status: "Fulfilled", amount: "$950", items: 2 },
  {
    id: "#567890",
    customer: "James Carter",
    status: "Ready for pickup",
    amount: "$1,750",
    items: 1,
  },
  { id: "#234567", customer: "Rachel Kim", status: "Fulfilled", amount: "$4,200", items: 3 },
  { id: "#876543", customer: "Thomas Allen", status: "Unfulfilled", amount: "$620", items: 2 },
  { id: "#345678", customer: "Anna Patel", status: "Ready for pickup", amount: "$1,100", items: 1 },
  { id: "#456789", customer: "Robert Singh", status: "Fulfilled", amount: "$3,400", items: 4 },
  { id: "#678901", customer: "Sophie Turner", status: "Fulfilled", amount: "$2,100", items: 2 },
  { id: "#890123", customer: "Henry Clark", status: "Unfulfilled", amount: "$550", items: 1 },
]

// ── Compliance transactions table (matches claude design) ──

type Tx = {
  id: string
  dir: "inbound" | "outbound" | "internal"
  from: { lbl: string; addr: string }
  to: { lbl: string; addr: string }
  amt: string
  asset: string
  usd: string
  net: "ETH" | "BTC" | "SOL" | "TRON"
  risk: number
  status: "verified" | "review" | "blocked"
  time: string
  flags: string[]
}

const TXS: Tx[] = [
  {
    id: "t1",
    dir: "outbound",
    from: { lbl: "Treasury Ops", addr: "0x742d…f44e" },
    to: { lbl: "Helix Labs", addr: "0x9b2a…c11d" },
    amt: "125,000",
    asset: "USDC",
    usd: "$125,000",
    net: "ETH",
    risk: 78,
    status: "review",
    time: "Apr 17 · 14:32",
    flags: ["high_value", "sanctions_adjacent"],
  },
  {
    id: "t2",
    dir: "inbound",
    from: { lbl: "Binance", addr: "0x5f1c…a842" },
    to: { lbl: "Treasury Ops", addr: "0x742d…f44e" },
    amt: "48,200",
    asset: "USDT",
    usd: "$48,200",
    net: "TRON",
    risk: 12,
    status: "verified",
    time: "Apr 17 · 14:18",
    flags: [],
  },
  {
    id: "t3",
    dir: "inbound",
    from: { lbl: "Tornado relay", addr: "0xtorn…4444" },
    to: { lbl: "Exchange hot", addr: "0x5e9b…ff10" },
    amt: "3.14",
    asset: "ETH",
    usd: "$11,230",
    net: "ETH",
    risk: 88,
    status: "blocked",
    time: "Apr 17 · 13:55",
    flags: ["mixer_exposure"],
  },
  {
    id: "t4",
    dir: "outbound",
    from: { lbl: "Treasury Ops", addr: "0x742d…f44e" },
    to: { lbl: "Circle", addr: "0x55fe…a0c1" },
    amt: "75,000",
    asset: "USDC",
    usd: "$75,000",
    net: "ETH",
    risk: 8,
    status: "verified",
    time: "Apr 17 · 13:40",
    flags: [],
  },
  {
    id: "t5",
    dir: "outbound",
    from: { lbl: "Treasury Ops", addr: "0x742d…f44e" },
    to: { lbl: "Kraken", addr: "0x31aa…ffa0" },
    amt: "0.82",
    asset: "BTC",
    usd: "$56,940",
    net: "BTC",
    risk: 22,
    status: "verified",
    time: "Apr 17 · 12:58",
    flags: [],
  },
  {
    id: "t6",
    dir: "internal",
    from: { lbl: "Hot wallet", addr: "0x0a0a…1111" },
    to: { lbl: "Cold storage", addr: "0x0b0b…2222" },
    amt: "500,000",
    asset: "USDC",
    usd: "$500,000",
    net: "ETH",
    risk: 2,
    status: "verified",
    time: "Apr 17 · 12:10",
    flags: [],
  },
  {
    id: "t7",
    dir: "inbound",
    from: { lbl: "Sanctioned address", addr: "0xdead…beef" },
    to: { lbl: "Treasury Ops", addr: "0x742d…f44e" },
    amt: "12.75",
    asset: "BTC",
    usd: "$812,250",
    net: "BTC",
    risk: 95,
    status: "blocked",
    time: "Apr 17 · 11:44",
    flags: ["sanctions_match"],
  },
]

function DirCell({ dir }: { dir: Tx["dir"] }) {
  const Icon = dir === "inbound" ? ArrowDownLeft : dir === "outbound" ? ArrowUpRight : RefreshCw
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-7 shrink-0 items-center justify-center rounded-full",
        DIRECTION_TONE_CLASSES[dir],
      )}
    >
      <Icon className="size-3.5" />
    </span>
  )
}

const NETWORK_COLOR: Record<Tx["net"], string> = {
  BTC: "#F59E0B",
  ETH: "#6366F1",
  SOL: "#10B981",
  TRON: "#EF4444",
}

function NetCell({ net }: { net: Tx["net"] }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-2xs border border-border bg-card px-1.5 py-0.5 font-mono font-semibold text-2xs text-muted-foreground tracking-wider">
      <span className="size-1.5 rounded-full" style={{ background: NETWORK_COLOR[net] }} />
      {net}
    </span>
  )
}

function RiskCell({ score }: { score: number }) {
  const color =
    score >= 75 ? "var(--destructive)" : score >= 40 ? "var(--highlight-ink)" : "var(--success)"
  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono font-semibold text-xs"
      style={{ color }}
    >
      <span className="relative inline-block h-1 w-4 overflow-hidden rounded-3xs bg-muted">
        <span className="absolute inset-0" style={{ width: `${score}%`, background: color }} />
      </span>
      {score}
    </span>
  )
}

const TX_STATUS_VARIANT: Record<Tx["status"], "mint" | "highlight" | "blush"> = {
  verified: "mint",
  review: "highlight",
  blocked: "blush",
}

const TX_STATUS_LABEL: Record<Tx["status"], string> = {
  verified: "Verified",
  review: "In review",
  blocked: "Blocked",
}

const txColumns: ColumnDef<Tx, unknown>[] = [
  {
    id: "dir",
    header: "",
    cell: ({ row }) => <DirCell dir={row.original.dir} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "from",
    header: "From → To",
    cell: ({ row }) => {
      const tx = row.original
      return (
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 font-medium text-sm-plus">
            <span className="truncate">{tx.from.lbl}</span>
            <ArrowRight className="size-3 shrink-0 text-muted-foreground" />
            <span className={cn("truncate", tx.risk >= 75 && "font-semibold text-destructive")}>
              {tx.to.lbl}
            </span>
          </div>
          <div className="mt-0.5 flex gap-2 font-mono text-muted-foreground text-xxs">
            <span>{tx.from.addr}</span>
            <span className="text-border">·</span>
            <span>{tx.time}</span>
            {tx.flags.length > 0 && (
              <span className="font-semibold text-highlight-ink">
                {tx.flags.length} flag{tx.flags.length > 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
      )
    },
    enableSorting: false,
    meta: { label: "From → To" },
  },
  {
    accessorKey: "amt",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const tx = row.original
      const sign = tx.dir === "inbound" ? "+" : tx.dir === "outbound" ? "−" : ""
      const color =
        tx.dir === "inbound"
          ? "text-success"
          : tx.dir === "outbound"
            ? "text-foreground"
            : "text-muted-foreground"
      return (
        <div className="text-right">
          <div className={cn("font-mono font-semibold text-sm-plus", color)}>
            {sign}
            {tx.amt} <span className="font-medium text-muted-foreground">{tx.asset}</span>
          </div>
          <div className="mt-px font-mono text-muted-foreground text-xxs">{tx.usd}</div>
        </div>
      )
    },
    enableSorting: false,
    meta: { label: "Amount" },
  },
  {
    accessorKey: "net",
    header: "Network",
    cell: ({ row }) => <NetCell net={row.original.net} />,
    enableSorting: false,
    meta: { label: "Network" },
  },
  {
    accessorKey: "risk",
    header: "Risk",
    cell: ({ row }) => <RiskCell score={row.original.risk} />,
    meta: { label: "Risk" },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-right">Status</div>,
    cell: ({ row }) => (
      <div className="text-right">
        <Badge variant={TX_STATUS_VARIANT[row.original.status]}>
          <Clock /> {TX_STATUS_LABEL[row.original.status]}
        </Badge>
      </div>
    ),
    enableSorting: false,
    meta: { label: "Status" },
  },
  {
    id: "caret",
    header: "",
    cell: () => <ChevronRight className="size-3.5 text-muted-foreground" />,
    enableSorting: false,
    enableHiding: false,
  },
]

const txStatusOptions = [
  { label: "Verified", value: "verified", icon: CheckCircle },
  { label: "In review", value: "review", icon: Clock },
  { label: "Blocked", value: "blocked", icon: Package },
]

export default function DataTablePreview() {
  const { table } = useDataTable({
    data: orderData,
    columns: orderColumns,
    getRowId: (row) => row.id,
  })
  const { table: txTable } = useDataTable({
    data: TXS,
    columns: txColumns,
    getRowId: (row) => row.id,
    enablePagination: false,
  })

  return (
    <div className="space-y-8">
      <Section title="Transactions table (claude design)">
        <div className="w-full">
          <DataTableToolbar table={txTable} showViewOptions={false}>
            <Input
              placeholder="Search hash, address, counterparty"
              value={(txTable.getState().globalFilter as string) ?? ""}
              onChange={(e) => txTable.setGlobalFilter(e.target.value)}
              className="h-8 w-full lg:w-[280px]"
            />
            {txTable.getColumn("status") && (
              <DataTableFacetedFilter
                column={txTable.getColumn("status")}
                title="Status"
                options={txStatusOptions}
              />
            )}
          </DataTableToolbar>
          <DataTable table={txTable} columns={txColumns} />
        </div>
      </Section>

      <Section title="Orders table (with toolbar + pagination)">
        <div className="w-full">
          <DataTableToolbar table={table}>
            <Input
              placeholder="Search..."
              value={(table.getState().globalFilter as string) ?? ""}
              onChange={(e) => table.setGlobalFilter(e.target.value)}
              className="h-8 w-full lg:w-[250px]"
            />
            {table.getColumn("status") && (
              <DataTableFacetedFilter
                column={table.getColumn("status")}
                title="Status"
                options={orderStatusOptions}
              />
            )}
          </DataTableToolbar>
          <DataTable table={table} columns={orderColumns} />
          <DataTablePagination table={table} />
        </div>
      </Section>
    </div>
  )
}
