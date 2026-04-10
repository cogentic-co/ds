"use client"

import type { ComponentProps, ReactNode } from "react"
import { cn } from "../lib/utils"
import { ComplianceStatusBadge } from "./compliance-status-badge"
import type { ComplianceStatus } from "./types"

type AuditNoteProps = ComponentProps<"div"> & {
  author: { name: string; avatar?: ReactNode }
  timestamp: string
  /** Optional decision associated with this note */
  decision?: ComplianceStatus
  /** Note body content */
  children: ReactNode
}

function AuditNote({
  author,
  timestamp,
  decision,
  children,
  className,
  ...props
}: AuditNoteProps) {
  return (
    <div
      data-slot="audit-note"
      className={cn("flex gap-3", className)}
      {...props}
    >
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-[10px]">
        {author.avatar ??
          author.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">{author.name}</span>
          <span className="font-mono text-muted-foreground text-[11px]">{timestamp}</span>
          {decision && <ComplianceStatusBadge status={decision} />}
        </div>
        <div className="mt-1 text-muted-foreground text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

export { AuditNote }
export type { AuditNoteProps }
