"use client"

import { CheckCircle, Clock, Package } from "lucide-react"
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

export default function DataTablePreview() {
  const { table } = useDataTable({
    data: orderData,
    columns: orderColumns,
    getRowId: (row) => row.id,
  })

  return (
    <div className="space-y-8">
      <Section title="Data Table with Toolbar">
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
