import type * as React from "react"

import { cn } from "../lib/utils"

/* ────────────────────────────────────────────────────────────────────────────
 * Tailwind grid class mappings
 * ──────────────────────────────────────────────────────────────────────────── */

const colsMap: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
  11: "grid-cols-11",
  12: "grid-cols-12",
}

const rowsMap: Record<number, string> = {
  1: "grid-rows-1",
  2: "grid-rows-2",
  3: "grid-rows-3",
  4: "grid-rows-4",
  5: "grid-rows-5",
  6: "grid-rows-6",
  7: "grid-rows-7",
  8: "grid-rows-8",
  9: "grid-rows-9",
  10: "grid-rows-10",
  11: "grid-rows-11",
  12: "grid-rows-12",
}

const flowMap = {
  row: "grid-flow-row",
  col: "grid-flow-col",
  dense: "grid-flow-dense",
  "row-dense": "grid-flow-row-dense",
  "col-dense": "grid-flow-col-dense",
} as const

const autoColsMap = {
  auto: "auto-cols-auto",
  min: "auto-cols-min",
  max: "auto-cols-max",
  fr: "auto-cols-fr",
} as const

const autoRowsMap = {
  auto: "auto-rows-auto",
  min: "auto-rows-min",
  max: "auto-rows-max",
  fr: "auto-rows-fr",
} as const

const gapMap: Record<number | string, string> = {
  0: "gap-0",
  0.5: "gap-0.5",
  1: "gap-1",
  1.5: "gap-1.5",
  2: "gap-2",
  2.5: "gap-2.5",
  3: "gap-3",
  3.5: "gap-3.5",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  7: "gap-7",
  8: "gap-8",
  9: "gap-9",
  10: "gap-10",
  11: "gap-11",
  12: "gap-12",
  14: "gap-14",
  16: "gap-16",
  20: "gap-20",
  24: "gap-24",
  28: "gap-28",
  32: "gap-32",
}

const gapXMap: Record<number | string, string> = {
  0: "gap-x-0",
  0.5: "gap-x-0.5",
  1: "gap-x-1",
  1.5: "gap-x-1.5",
  2: "gap-x-2",
  2.5: "gap-x-2.5",
  3: "gap-x-3",
  3.5: "gap-x-3.5",
  4: "gap-x-4",
  5: "gap-x-5",
  6: "gap-x-6",
  7: "gap-x-7",
  8: "gap-x-8",
  9: "gap-x-9",
  10: "gap-x-10",
  11: "gap-x-11",
  12: "gap-x-12",
  14: "gap-x-14",
  16: "gap-x-16",
  20: "gap-x-20",
  24: "gap-x-24",
  28: "gap-x-28",
  32: "gap-x-32",
}

const gapYMap: Record<number | string, string> = {
  0: "gap-y-0",
  0.5: "gap-y-0.5",
  1: "gap-y-1",
  1.5: "gap-y-1.5",
  2: "gap-y-2",
  2.5: "gap-y-2.5",
  3: "gap-y-3",
  3.5: "gap-y-3.5",
  4: "gap-y-4",
  5: "gap-y-5",
  6: "gap-y-6",
  7: "gap-y-7",
  8: "gap-y-8",
  9: "gap-y-9",
  10: "gap-y-10",
  11: "gap-y-11",
  12: "gap-y-12",
  14: "gap-y-14",
  16: "gap-y-16",
  20: "gap-y-20",
  24: "gap-y-24",
  28: "gap-y-28",
  32: "gap-y-32",
}

/* ────────────────────────────────────────────────────────────────────────────
 * Col class mappings
 * ──────────────────────────────────────────────────────────────────────────── */

const colSpanMap: Record<number | string, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
  full: "col-span-full",
}

const colStartMap: Record<number | string, string> = {
  1: "col-start-1",
  2: "col-start-2",
  3: "col-start-3",
  4: "col-start-4",
  5: "col-start-5",
  6: "col-start-6",
  7: "col-start-7",
  8: "col-start-8",
  9: "col-start-9",
  10: "col-start-10",
  11: "col-start-11",
  12: "col-start-12",
  13: "col-start-13",
  auto: "col-start-auto",
}

const colEndMap: Record<number | string, string> = {
  1: "col-end-1",
  2: "col-end-2",
  3: "col-end-3",
  4: "col-end-4",
  5: "col-end-5",
  6: "col-end-6",
  7: "col-end-7",
  8: "col-end-8",
  9: "col-end-9",
  10: "col-end-10",
  11: "col-end-11",
  12: "col-end-12",
  13: "col-end-13",
  auto: "col-end-auto",
}

const rowSpanMap: Record<number | string, string> = {
  1: "row-span-1",
  2: "row-span-2",
  3: "row-span-3",
  4: "row-span-4",
  5: "row-span-5",
  6: "row-span-6",
  7: "row-span-7",
  8: "row-span-8",
  9: "row-span-9",
  10: "row-span-10",
  11: "row-span-11",
  12: "row-span-12",
  full: "row-span-full",
}

const rowStartMap: Record<number | string, string> = {
  1: "row-start-1",
  2: "row-start-2",
  3: "row-start-3",
  4: "row-start-4",
  5: "row-start-5",
  6: "row-start-6",
  7: "row-start-7",
  8: "row-start-8",
  9: "row-start-9",
  10: "row-start-10",
  11: "row-start-11",
  12: "row-start-12",
  13: "row-start-13",
  auto: "row-start-auto",
}

const rowEndMap: Record<number | string, string> = {
  1: "row-end-1",
  2: "row-end-2",
  3: "row-end-3",
  4: "row-end-4",
  5: "row-end-5",
  6: "row-end-6",
  7: "row-end-7",
  8: "row-end-8",
  9: "row-end-9",
  10: "row-end-10",
  11: "row-end-11",
  12: "row-end-12",
  13: "row-end-13",
  auto: "row-end-auto",
}

/* ────────────────────────────────────────────────────────────────────────────
 * Grid
 * ──────────────────────────────────────────────────────────────────────────── */

type GridProps = React.ComponentProps<"div"> & {
  /** Number of columns (1–12) or a custom Tailwind class like "grid-cols-[200px_1fr]" */
  cols?: number | string
  /** Number of rows (1–12) or a custom Tailwind class like "grid-rows-[auto_1fr_auto]" */
  rows?: number | string
  /** Grid auto-flow: row | col | dense | row-dense | col-dense */
  flow?: keyof typeof flowMap
  /** Auto columns: auto | min | max | fr */
  autoCols?: keyof typeof autoColsMap
  /** Auto rows: auto | min | max | fr */
  autoRows?: keyof typeof autoRowsMap
  /** Gap (Tailwind spacing scale) */
  gap?: number
  /** Column gap (Tailwind spacing scale) */
  gapX?: number
  /** Row gap (Tailwind spacing scale) */
  gapY?: number
}

function Grid({
  className,
  cols,
  rows,
  flow,
  autoCols,
  autoRows,
  gap,
  gapX,
  gapY,
  ...props
}: GridProps) {
  return (
    <div
      data-slot="grid"
      className={cn(
        "grid",
        typeof cols === "number" ? colsMap[cols] : cols,
        typeof rows === "number" ? rowsMap[rows] : rows,
        flow && flowMap[flow],
        autoCols && autoColsMap[autoCols],
        autoRows && autoRowsMap[autoRows],
        gap != null && gapMap[gap],
        gapX != null && gapXMap[gapX],
        gapY != null && gapYMap[gapY],
        className,
      )}
      {...props}
    />
  )
}

/* ────────────────────────────────────────────────────────────────────────────
 * Col
 * ──────────────────────────────────────────────────────────────────────────── */

type ColProps = React.ComponentProps<"div"> & {
  /** Column span (1–12 or "full") */
  span?: number | "full"
  /** Column start line (1–13 or "auto") */
  start?: number | "auto"
  /** Column end line (1–13 or "auto") */
  end?: number | "auto"
  /** Row span (1–12 or "full") */
  rowSpan?: number | "full"
  /** Row start line (1–13 or "auto") */
  rowStart?: number | "auto"
  /** Row end line (1–13 or "auto") */
  rowEnd?: number | "auto"
}

function Col({ className, span, start, end, rowSpan, rowStart, rowEnd, ...props }: ColProps) {
  return (
    <div
      data-slot="col"
      className={cn(
        span != null && colSpanMap[span],
        start != null && colStartMap[start],
        end != null && colEndMap[end],
        rowSpan != null && rowSpanMap[rowSpan],
        rowStart != null && rowStartMap[rowStart],
        rowEnd != null && rowEndMap[rowEnd],
        className,
      )}
      {...props}
    />
  )
}

export type { ColProps, GridProps }
export { Col, Grid }
