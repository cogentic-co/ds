import type * as React from "react"

import { cn } from "../lib/utils"

type KeyValueListItem = {
  label: React.ReactNode
  value: React.ReactNode
  mono?: boolean
}

type KeyValueListProps = React.ComponentProps<"div"> & {
  items: KeyValueListItem[]
  bordered?: boolean
}

function KeyValueList({ items, bordered = true, className, ...props }: KeyValueListProps) {
  return (
    <div
      data-slot="key-value-list"
      className={cn(
        "px-[18px]",
        bordered && "rounded-lg border border-border bg-card shadow-card",
        className,
      )}
      {...props}
    >
      {items.map((item, i) => (
        <div
          key={typeof item.label === "string" ? item.label : i}
          data-slot="key-value-list-row"
          className={cn(
            "flex items-start justify-between gap-4 py-3",
            i > 0 && "border-border-light border-t",
          )}
        >
          <span className="shrink-0 pt-px text-muted-foreground text-sm-plus">{item.label}</span>
          <div
            className={cn("min-w-0 text-right font-medium text-sm-plus", item.mono && "font-mono")}
          >
            {item.value}
          </div>
        </div>
      ))}
    </div>
  )
}

export type { KeyValueListItem, KeyValueListProps }
export { KeyValueList }
