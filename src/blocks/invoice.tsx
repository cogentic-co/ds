"use client"

import type { ComponentProps, ReactNode } from "react"
import { cn } from "../lib/utils"

type InvoiceLineItem = {
  id: string
  description: string
  quantity?: number
  unitPrice: string
  total: string
}

type InvoiceParty = {
  name: string
  lines?: string[]
}

type InvoiceProps = ComponentProps<"div"> & {
  /** Invoice number / ID */
  number: string
  /** Issue date (human readable string) */
  issuedAt: string
  /** Optional due date */
  dueAt?: string
  /** Status pill text (e.g. "Paid", "Due", "Overdue") */
  status?: ReactNode
  /** Company details issuing the invoice */
  from: InvoiceParty
  /** Customer details */
  to: InvoiceParty
  /** Line items */
  items: InvoiceLineItem[]
  /** Subtotal string */
  subtotal: string
  /** Tax line label + amount */
  tax?: { label: string; amount: string }
  /** Total due */
  total: string
  /** Currency symbol / code shown alongside totals (optional) */
  currency?: string
  /** Optional notes (payment instructions, terms) */
  notes?: ReactNode
  /** Logo / brand mark */
  logo?: ReactNode
}

function Invoice({
  number,
  issuedAt,
  dueAt,
  status,
  from,
  to,
  items,
  subtotal,
  tax,
  total,
  currency,
  notes,
  logo,
  className,
  ...props
}: InvoiceProps) {
  return (
    <div
      data-slot="invoice"
      className={cn("flex flex-col gap-8 rounded-xl border border-border bg-card p-8", className)}
      {...props}
    >
      <header className="flex items-start justify-between gap-6">
        <div className="flex items-center gap-3">{logo}</div>
        <div className="text-right">
          <h1 className="font-semibold text-2xl">Invoice</h1>
          <p className="font-mono text-muted-foreground text-sm">#{number}</p>
          {status && <div className="mt-2">{status}</div>}
        </div>
      </header>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="flex flex-col gap-1">
          <span className="font-medium text-muted-foreground text-xs uppercase">Issued</span>
          <span className="font-mono text-sm">{issuedAt}</span>
        </div>
        {dueAt && (
          <div className="flex flex-col gap-1">
            <span className="font-medium text-muted-foreground text-xs uppercase">Due</span>
            <span className="font-mono text-sm">{dueAt}</span>
          </div>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <span className="font-medium text-muted-foreground text-xs uppercase">From</span>
          <span className="font-semibold text-sm">{from.name}</span>
          {from.lines?.map((line) => (
            <span key={line} className="text-muted-foreground text-sm">
              {line}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-medium text-muted-foreground text-xs uppercase">Bill to</span>
          <span className="font-semibold text-sm">{to.name}</span>
          {to.lines?.map((line) => (
            <span key={line} className="text-muted-foreground text-sm">
              {line}
            </span>
          ))}
        </div>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-border border-b">
            <th className="pb-2 text-left font-medium text-muted-foreground text-xs uppercase">
              Description
            </th>
            <th className="pb-2 text-right font-medium text-muted-foreground text-xs uppercase">
              Qty
            </th>
            <th className="pb-2 text-right font-medium text-muted-foreground text-xs uppercase">
              Unit
            </th>
            <th className="pb-2 text-right font-medium text-muted-foreground text-xs uppercase">
              Total
            </th>
          </tr>
        </thead>
        <tbody className="font-mono tabular-nums">
          {items.map((item) => (
            <tr key={item.id} className="border-border/60 border-b">
              <td className="py-3 font-sans">{item.description}</td>
              <td className="py-3 text-right">{item.quantity ?? 1}</td>
              <td className="py-3 text-right">{item.unitPrice}</td>
              <td className="py-3 text-right">{item.total}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="font-mono tabular-nums">
          <tr>
            <td colSpan={3} className="pt-3 text-right font-sans text-muted-foreground text-xs">
              Subtotal
            </td>
            <td className="pt-3 text-right">{subtotal}</td>
          </tr>
          {tax && (
            <tr>
              <td colSpan={3} className="pt-1 text-right font-sans text-muted-foreground text-xs">
                {tax.label}
              </td>
              <td className="pt-1 text-right">{tax.amount}</td>
            </tr>
          )}
          <tr className="border-border border-t">
            <td colSpan={3} className="pt-2 text-right font-sans font-semibold text-sm">
              Total {currency && <span className="text-muted-foreground">{currency}</span>}
            </td>
            <td className="pt-2 text-right font-semibold">{total}</td>
          </tr>
        </tfoot>
      </table>

      {notes && (
        <div className="rounded-lg bg-muted/60 p-4 text-muted-foreground text-sm">{notes}</div>
      )}
    </div>
  )
}

export type { InvoiceLineItem, InvoiceParty, InvoiceProps }
export { Invoice }
