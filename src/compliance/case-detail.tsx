"use client"

import { Calendar, User } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"
import { Badge } from "../components/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs"
import { cn, timeAgo } from "../lib/utils"
import { ComplianceStatusBadge } from "./compliance-status-badge"
import type { ComplianceStatus } from "./types"

type CaseDetailTab = {
  id: string
  label: string
  content: ReactNode
  count?: number
}

type CaseDetailProps = ComponentProps<"div"> & {
  /** Case identifier (e.g. "CASE-1042") */
  caseId: string
  title: string
  status: ComplianceStatus
  priority: string
  /** ISO date string */
  updatedAt: string
  assignee?: { name: string; avatar?: ReactNode }
  entities?: string[]
  /** Actions rendered top-right (e.g. Assign, Escalate, Close buttons) */
  actions?: ReactNode
  /** Tab panels for the case content (transactions, alerts, timeline, notes) */
  tabs?: CaseDetailTab[]
  /** Default active tab id */
  defaultTab?: string
  /** Slot below the header, above tabs (e.g. summary stats) */
  summary?: ReactNode
  children?: ReactNode
}

const PRIORITY_COLORS: Record<string, string> = {
  p1: "border-red-700/40 bg-red-700/10 text-red-700 dark:border-red-400/40 dark:bg-red-400/10 dark:text-red-400",
  p2: "border-amber-700/40 bg-amber-700/10 text-amber-700 dark:border-amber-400/40 dark:bg-amber-400/10 dark:text-amber-400",
  p3: "border-border bg-muted text-muted-foreground",
}

function CaseDetail({
  caseId,
  title,
  status,
  priority,
  updatedAt,
  assignee,
  entities,
  actions,
  tabs,
  defaultTab,
  summary,
  children,
  className,
  ...props
}: CaseDetailProps) {
  return (
    <div
      data-slot="case-detail"
      data-status={status}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-muted-foreground text-xs">{caseId}</span>
            <ComplianceStatusBadge status={status} />
            <Badge
              square
              variant="outline"
              className={cn(
                "px-1.5 py-0.5 text-[10px] uppercase leading-none",
                PRIORITY_COLORS[priority] ?? PRIORITY_COLORS.p3,
              )}
            >
              {priority.toUpperCase()}
            </Badge>
          </div>
          <h1 className="font-semibold text-lg leading-tight">{title}</h1>
          {entities && entities.length > 0 && (
            <p className="text-muted-foreground text-sm">{entities.join(" · ")}</p>
          )}
          <div className="flex items-center gap-3 text-muted-foreground text-xs">
            {assignee && (
              <span className="flex items-center gap-1">
                {assignee.avatar ?? <User className="size-3" />}
                {assignee.name}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="size-3" />
              {timeAgo(updatedAt)}
            </span>
          </div>
        </div>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>

      {summary}

      {tabs && tabs.length > 0 && (
        <Tabs defaultValue={defaultTab ?? tabs[0].id}>
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
                {tab.count != null && (
                  <Badge square variant="secondary" className="ml-1.5 px-1 py-0 text-[9px]">
                    {tab.count}
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      )}

      {children}
    </div>
  )
}

export { CaseDetail }
export type { CaseDetailProps, CaseDetailTab }
