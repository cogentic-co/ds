"use client"

import type * as React from "react"
import { cn } from "../lib/utils"

type SettingRowProps = Omit<React.ComponentProps<"div">, "title"> & {
  icon?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
}

function SettingRow({ icon, title, description, action, className, ...props }: SettingRowProps) {
  return (
    <div data-slot="setting-row" className={cn("flex items-start gap-4 p-5", className)} {...props}>
      {icon && (
        <div
          data-slot="setting-row-icon"
          className="flex size-5 shrink-0 items-center justify-center text-muted-foreground"
        >
          {icon}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="font-semibold text-sm">{title}</div>
        {description && <div className="mt-0.5 text-muted-foreground text-sm">{description}</div>}
      </div>
      {action && (
        <div data-slot="setting-row-action" className="shrink-0">
          {action}
        </div>
      )}
    </div>
  )
}

export { SettingRow }
export type { SettingRowProps }
