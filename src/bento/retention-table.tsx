"use client"

import { motion, useInView } from "motion/react"
import { type ComponentProps, useRef } from "react"
import { Badge } from "../components/badge"
import { cn } from "../lib/utils"
import type { RetentionTableRow } from "./types"

const STATUS_TONE: Record<NonNullable<RetentionTableRow["status"]>, string> = {
  active: "bg-success/10 text-success",
  configurable: "bg-primary/10 text-primary",
  default: "bg-muted text-muted-foreground",
}

export interface RetentionTableProps extends ComponentProps<"div"> {
  rows: RetentionTableRow[]
  /** Override the default "Retention by jurisdiction" heading. */
  heading?: string
}

/**
 * Jurisdiction-keyed retention / policy table: flag + name, right-aligned
 * years badge, optional status pill.
 */
export function RetentionTable({
  rows,
  heading = "Retention by jurisdiction",
  className,
  ...props
}: RetentionTableProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <div ref={ref} data-slot="bento-retention-table" className={className} {...props}>
      <div className="flex h-full flex-col justify-center p-4">
        <p className="mb-2 font-semibold text-muted-foreground text-xxs uppercase tracking-wider">
          {heading}
        </p>

        <ul className="divide-y divide-border/60 rounded-md border border-border bg-card">
          {rows.map((row, i) => (
            <motion.li
              key={row.jurisdiction}
              initial={{ opacity: 0, x: -4 }}
              animate={inView ? { opacity: 1, x: 0 } : undefined}
              transition={{ delay: 0.15 + i * 0.06, duration: 0.25, ease: "easeOut" }}
              className="flex items-center gap-2.5 px-2.5 py-1.5"
            >
              {row.flag && (
                <span aria-hidden className="text-sm leading-none">
                  {row.flag}
                </span>
              )}
              <span className="min-w-0 flex-1 truncate text-foreground text-xs">
                {row.jurisdiction}
              </span>
              <span className="font-mono font-semibold tabular-nums text-foreground/80 text-xxs">
                {typeof row.years === "number" ? `${row.years} yrs` : row.years}
              </span>
              {row.status && (
                <Badge variant="secondary" className={cn("rounded-sm text-xxs", STATUS_TONE[row.status])}>
                  {row.status}
                </Badge>
              )}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  )
}
