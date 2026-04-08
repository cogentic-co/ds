"use client"

import { useVirtualizer } from "@tanstack/react-virtual"
import type * as React from "react"
import { useCallback, useRef } from "react"
import { cn } from "../lib/utils"

/**
 * VirtualizedGrid — renders a large collection of items efficiently by only
 * mounting the rows currently visible in the scroll container. Built on
 * @tanstack/react-virtual.
 *
 * Use this when you have hundreds or thousands of grid items (e.g. icon
 * browsers, large picker galleries) and a plain grid would cause long
 * initial render times or janky scroll.
 *
 * @example
 * ```tsx
 * <VirtualizedGrid
 *   items={allIcons}
 *   columns={8}
 *   rowHeight={80}
 *   gap={12}
 *   className="h-[600px]"
 *   renderItem={(icon) => <IconButton key={icon.name} icon={icon} />}
 * />
 * ```
 */

type VirtualizedGridProps<T> = Omit<React.ComponentProps<"div">, "children"> & {
  /** The full list of items to render. */
  items: T[]
  /** Number of columns per row. */
  columns: number
  /** Height of each row in pixels. */
  rowHeight: number
  /** Gap between items (both row and column) in pixels. Default 0. */
  gap?: number
  /** Number of extra rows to render above/below the visible area. Default 2. */
  overscan?: number
  /** Render function for a single item. */
  renderItem: (item: T, index: number) => React.ReactNode
  /** A stable key accessor for each item. Defaults to index. */
  getItemKey?: (item: T, index: number) => string | number
}

function VirtualizedGrid<T>({
  items,
  columns,
  rowHeight,
  gap = 0,
  overscan = 2,
  renderItem,
  getItemKey,
  className,
  ...props
}: VirtualizedGridProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null)

  const rowCount = Math.ceil(items.length / columns)
  const estimateSize = useCallback(() => rowHeight + gap, [rowHeight, gap])

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize,
    overscan,
  })

  return (
    <div
      ref={parentRef}
      data-slot="virtualized-grid"
      className={cn("overflow-auto", className)}
      {...props}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const rowStart = virtualRow.index * columns
          const rowItems = items.slice(rowStart, rowStart + columns)
          return (
            <div
              key={virtualRow.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${rowHeight}px`,
                transform: `translateY(${virtualRow.start}px)`,
                display: "grid",
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                gap: `${gap}px`,
              }}
            >
              {rowItems.map((item, colIndex) => {
                const index = rowStart + colIndex
                const key = getItemKey ? getItemKey(item, index) : index
                return (
                  <div key={key} style={{ minWidth: 0 }}>
                    {renderItem(item, index)}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { VirtualizedGrid }
export type { VirtualizedGridProps }
