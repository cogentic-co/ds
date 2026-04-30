"use client"

import type { ComponentProps, ReactNode } from "react"
import { cn, initials } from "../lib/utils"
import { ComplianceStatusBadge } from "./status-helpers"
import type { ComplianceStatus } from "./types"

type AuditNoteProps = ComponentProps<"div"> & {
  author: { name: string; avatar?: ReactNode }
  timestamp: string
  /** Optional decision associated with this note */
  decision?: ComplianceStatus
  /** Note body content */
  children: ReactNode
}

function AuditNote({ author, timestamp, decision, children, className, ...props }: AuditNoteProps) {
  return (
    <div data-slot="audit-note" className={cn("flex gap-3", className)} {...props}>
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-[10px] text-muted-foreground">
        {author.avatar ?? initials(author.name)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="truncate font-semibold text-sm">{author.name}</span>
          <span className="whitespace-nowrap font-mono text-[11px] text-muted-foreground">
            {timestamp}
          </span>
          {decision && <ComplianceStatusBadge status={decision} />}
        </div>
        <div className="mt-1 text-muted-foreground text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

export type { AuditNoteProps }
export { AuditNote }
