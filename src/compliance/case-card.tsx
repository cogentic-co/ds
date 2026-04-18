"use client"

import { AlertTriangle, ArrowLeftRight, Calendar } from "lucide-react"
import type * as React from "react"
import { Badge } from "../components/badge"
import { Card } from "../components/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../components/hover-card"
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "../components/item"
import { cn, initials, timeAgo } from "../lib/utils"

type CaseSla = "on_track" | "at_risk" | "overdue"
type CasePriority = "p1" | "p2" | "p3"
type CaseSeverity = "low" | "medium" | "high" | "critical"
type CaseDirection = "inbound" | "outbound" | "internal"

const SLA_BADGE: Record<CaseSla, string> = {
  on_track:
    "text-emerald-700 bg-emerald-700/10 border-emerald-700/30 dark:text-emerald-400 dark:bg-emerald-400/10 dark:border-emerald-400/30",
  at_risk:
    "text-amber-700 bg-amber-700/10 border-amber-700/30 dark:text-amber-400 dark:bg-amber-400/10 dark:border-amber-400/30",
  overdue:
    "text-red-700 bg-red-700/10 border-red-700/30 dark:text-red-400 dark:bg-red-400/10 dark:border-red-400/30",
}

const PRIORITY_BADGE: Record<CasePriority, string> = {
  p1: "text-red-700 bg-red-700/10 border-red-700/30 dark:text-red-400 dark:bg-red-400/10 dark:border-red-400/30",
  p2: "text-amber-700 bg-amber-700/10 border-amber-700/30 dark:text-amber-400 dark:bg-amber-400/10 dark:border-amber-400/30",
  p3: "text-muted-foreground bg-muted border-border",
}

const SEVERITY_DOT: Record<CaseSeverity, string> = {
  low: "bg-muted-foreground/60",
  medium: "bg-amber-500",
  high: "bg-amber-700 dark:bg-amber-400",
  critical: "bg-red-700 dark:bg-red-400",
}

export type CaseCardAlert = {
  id: string
  severity: CaseSeverity
  trigger: string
  type: string
  href?: string
}

export type CaseCardTransaction = {
  id: string
  amount: string
  asset: string
  direction: CaseDirection
  href?: string
}

export type CaseCardAssignee = {
  name: string
  role?: string
}

export type CaseCardProps = {
  id: string
  title: string
  entities: string[]
  sla: CaseSla
  priority: CasePriority
  updatedAt: string
  assignee?: CaseCardAssignee
  linkedAlerts?: CaseCardAlert[]
  linkedTransactions?: CaseCardTransaction[]
  onClick?: () => void
  className?: string
}

function CaseCard({
  id,
  title,
  entities,
  sla,
  priority,
  updatedAt,
  assignee,
  linkedAlerts = [],
  linkedTransactions = [],
  onClick,
  className,
}: CaseCardProps) {
  const assigneeInitials = assignee ? initials(assignee.name) : null

  return (
    <Card
      padding="none"
      className={cn(
        "cursor-pointer p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
        className,
      )}
      onClick={onClick}
    >
      <div className="flex flex-col gap-y-2 pb-2">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
            {id.replace("case-", "CASE-")}
          </span>
          <Badge
            square
            variant="outline"
            className={cn(
              "items-center px-1 py-0.5 text-[9px] uppercase leading-none",
              SLA_BADGE[sla],
            )}
          >
            {sla === "overdue" && (
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-red-500" />
              </span>
            )}
            {sla.replace("_", " ")}
          </Badge>
        </div>

        <div className="flex flex-col gap-y-1">
          <p className="line-clamp-2 font-semibold text-sm leading-snug">{title}</p>
          <p className="truncate text-muted-foreground text-xs">{entities.join(", ")}</p>
        </div>

        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-1.5">
            <Badge
              square
              variant="outline"
              className={cn("px-1.5 py-0.5 text-[10px] leading-none", PRIORITY_BADGE[priority])}
            >
              {priority.toUpperCase()}
            </Badge>
          </div>
          {assignee && assigneeInitials && (
            <HoverCard>
              <HoverCardTrigger onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-[10px] text-primary transition-all hover:ring-2 hover:ring-primary/20">
                  {assigneeInitials}
                </div>
              </HoverCardTrigger>
              <HoverCardContent side="top" className="w-48 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary text-xs">
                    {assigneeInitials}
                  </div>
                  <div>
                    <p className="font-medium">{assignee.name}</p>
                    <p className="text-muted-foreground">{assignee.role ?? "Compliance Analyst"}</p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          )}
        </div>
      </div>

      <div className="-mx-4 -mb-3 flex items-center gap-4 border-t border-dashed px-4 py-3 font-mono text-muted-foreground text-xs">
        {linkedAlerts.length > 0 && (
          <HoverCard>
            <HoverCardTrigger
              className="flex items-center gap-1 transition-colors hover:text-foreground"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <AlertTriangle className="size-3.5" />
              {linkedAlerts.length}
            </HoverCardTrigger>
            <HoverCardContent side="top" className="w-72 p-2">
              <p className="px-2 py-1 font-medium text-muted-foreground text-xs">Linked Alerts</p>
              {linkedAlerts.map((a) => (
                <Item
                  key={a.id}
                  size="xs"
                  {...(a.href
                    ? {
                        render: (
                          <a href={a.href} onClick={(e: React.MouseEvent) => e.stopPropagation()} />
                        ),
                      }
                    : {})}
                >
                  <ItemMedia>
                    <div className={cn("size-2 rounded-full", SEVERITY_DOT[a.severity])} />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle className="text-xs">{a.trigger}</ItemTitle>
                    <ItemDescription className="text-[10px]">
                      {a.id} · {a.type}
                    </ItemDescription>
                  </ItemContent>
                </Item>
              ))}
            </HoverCardContent>
          </HoverCard>
        )}
        {linkedTransactions.length > 0 && (
          <HoverCard>
            <HoverCardTrigger
              className="flex items-center gap-1 transition-colors hover:text-foreground"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <ArrowLeftRight className="size-3.5" />
              {linkedTransactions.length}
            </HoverCardTrigger>
            <HoverCardContent side="top" className="w-72 p-2">
              <p className="px-2 py-1 font-medium text-muted-foreground text-xs">
                Linked Transactions
              </p>
              {linkedTransactions.map((t) => (
                <Item
                  key={t.id}
                  size="xs"
                  {...(t.href
                    ? {
                        render: (
                          <a href={t.href} onClick={(e: React.MouseEvent) => e.stopPropagation()} />
                        ),
                      }
                    : {})}
                >
                  <ItemMedia>
                    <ArrowLeftRight className="size-3 text-muted-foreground" />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle className="text-xs">
                      {t.amount} {t.asset}
                    </ItemTitle>
                    <ItemDescription className="text-[10px]">
                      {t.id} · {t.direction}
                    </ItemDescription>
                  </ItemContent>
                </Item>
              ))}
            </HoverCardContent>
          </HoverCard>
        )}
        <span className="ml-auto flex items-center gap-1">
          <Calendar className="size-3.5" />
          {timeAgo(updatedAt)}
        </span>
      </div>
    </Card>
  )
}

export { CaseCard }
