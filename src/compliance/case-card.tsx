"use client"

import { AlertTriangle, ArrowLeftRight, Calendar } from "lucide-react"
import type * as React from "react"

import { cn, timeAgo } from "../lib/utils"
import { Badge } from "../components/badge"
import { Card } from "../components/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../components/hover-card"
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "../components/item"

/* ------------------------------------------------------------------ */
/*  Style maps                                                         */
/* ------------------------------------------------------------------ */

const SLA_BADGE: Record<string, string> = {
  on_track:
    "text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950 dark:border-emerald-800",
  at_risk:
    "text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950 dark:border-amber-800",
  overdue:
    "text-red-700 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950 dark:border-red-800",
}

const PRIORITY_BADGE: Record<string, string> = {
  p1: "text-red-700 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950 dark:border-red-800",
  p2: "text-orange-700 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-950 dark:border-orange-800",
  p3: "text-slate-700 bg-slate-100 border-slate-200 dark:text-slate-400 dark:bg-slate-900 dark:border-slate-700",
}

const SEVERITY_DOT: Record<string, string> = {
  low: "bg-slate-400",
  medium: "bg-amber-500",
  high: "bg-orange-500",
  critical: "bg-red-500",
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type CaseCardAlert = {
  id: string
  severity: string
  trigger: string
  type: string
  href?: string
}

export type CaseCardTransaction = {
  id: string
  amount: string
  asset: string
  direction: string
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
  sla: string
  priority: string
  updatedAt: string
  assignee?: CaseCardAssignee
  linkedAlerts?: CaseCardAlert[]
  linkedTransactions?: CaseCardTransaction[]
  onClick?: () => void
  className?: string
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

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
  const initials = assignee
    ? assignee.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
    : null

  return (
    <Card
      padding="none"
      className={cn(
        "cursor-pointer p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-800 hover:bg-emerald-50/20 hover:shadow-md",
        className,
      )}
      onClick={onClick}
    >
      {/* Header: ID + SLA */}
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

        {/* Body: title + entities */}
        <div className="flex flex-col gap-y-1">
          <p className="line-clamp-2 font-semibold text-sm leading-snug">{title}</p>
          <p className="truncate text-muted-foreground text-xs">{entities.join(", ")}</p>
        </div>

        {/* Meta: priority + assignee */}
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
          {assignee && initials && (
            <HoverCard>
              <HoverCardTrigger onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-[10px] text-primary transition-all hover:ring-2 hover:ring-primary/20">
                  {initials}
                </div>
              </HoverCardTrigger>
              <HoverCardContent side="top" className="w-48 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary text-xs">
                    {initials}
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

      {/* Footer: linked items + timestamp */}
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
