"use client"

import Link from "next/link"
import type * as React from "react"
import { cn } from "../lib/utils"

type SettingsCardGridItem = {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}

type SettingsCardGridProps = React.ComponentProps<"div"> & {
  items: SettingsCardGridItem[]
  columns?: 1 | 2 | 3
}

const columnsClasses: Record<NonNullable<SettingsCardGridProps["columns"]>, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
}

function SettingsCardGrid({ items, columns = 2, className, ...props }: SettingsCardGridProps) {
  return (
    <div
      data-slot="settings-card-grid"
      className={cn("grid gap-4", columnsClasses[columns], className)}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          data-slot="settings-card-grid-item"
          className={cn(
            "group flex items-start gap-4 rounded-lg border border-border bg-card p-5",
            "transition-colors hover:bg-muted/40",
          )}
        >
          <div
            data-slot="settings-card-grid-icon"
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-md",
              "bg-focus-soft text-focus",
            )}
          >
            {item.icon}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-base">{item.title}</div>
            <div className="mt-1 text-muted-foreground text-sm">{item.description}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export { SettingsCardGrid }
export type { SettingsCardGridProps, SettingsCardGridItem }
