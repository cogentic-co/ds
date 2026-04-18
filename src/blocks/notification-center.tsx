"use client"

import { Bell } from "lucide-react"
import { type ComponentProps, type ReactNode, useMemo, useState } from "react"
import { Badge } from "../components/badge"
import { Button } from "../components/button"
import { Popover, PopoverContent, PopoverTrigger } from "../components/popover"
import { ScrollArea } from "../components/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "../components/tabs"
import { cn, timeAgo } from "../lib/utils"

type NotificationSeverity = "info" | "warning" | "critical"

type NotificationItem = {
  id: string
  title: string
  description?: ReactNode
  /** ISO timestamp */
  timestamp: string
  read?: boolean
  severity?: NotificationSeverity
  icon?: ReactNode
  onClick?: () => void
}

type NotificationCenterProps = ComponentProps<"div"> & {
  notifications: NotificationItem[]
  onMarkAllRead?: () => void
  onNotificationClick?: (id: string) => void
  /** Label for the trigger button */
  label?: string
}

const SEVERITY_DOT: Record<NotificationSeverity, string> = {
  info: "bg-focal",
  warning: "bg-amber-600 dark:bg-amber-400",
  critical: "bg-red-600 dark:bg-red-400",
}

function NotificationCenter({
  notifications,
  onMarkAllRead,
  onNotificationClick,
  label = "Notifications",
  className,
  ...props
}: NotificationCenterProps) {
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications])

  const visible = useMemo(
    () => (filter === "unread" ? notifications.filter((n) => !n.read) : notifications),
    [filter, notifications],
  )

  return (
    <div data-slot="notification-center" className={className} {...props}>
      <Popover>
        <PopoverTrigger
          render={
            <Button variant="ghost" size="icon-sm" className="relative">
              <Bell className="size-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-destructive font-bold text-[10px] text-destructive-foreground leading-none">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
              <span className="sr-only">{label}</span>
            </Button>
          }
        />
        <PopoverContent align="end" className="w-96 p-0">
          <div className="flex items-center justify-between border-border border-b px-3 py-2.5">
            <span className="font-semibold text-sm">{label}</span>
            {onMarkAllRead && unreadCount > 0 && (
              <button
                type="button"
                onClick={onMarkAllRead}
                className="text-focal text-xs hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>
          <Tabs value={filter} onValueChange={(v) => setFilter(v as "all" | "unread")}>
            <TabsList className="mx-3 mt-2">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                {unreadCount > 0 && (
                  <Badge square variant="secondary" className="ml-1.5 px-1 py-0 text-[9px]">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <ScrollArea className="max-h-96">
            {visible.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
                <Bell className="size-6 text-muted-foreground/40" />
                <p className="text-muted-foreground text-sm">
                  {filter === "unread" ? "No unread notifications" : "No notifications yet"}
                </p>
              </div>
            ) : (
              <div>
                {visible.map((n) => (
                  <button
                    type="button"
                    key={n.id}
                    onClick={() => {
                      n.onClick?.()
                      onNotificationClick?.(n.id)
                    }}
                    className={cn(
                      "flex w-full items-start gap-3 border-border border-b px-3 py-3 text-left transition-colors last:border-b-0",
                      "hover:bg-muted/50",
                      !n.read && "bg-focal-soft/30",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-1.5 size-2 shrink-0 rounded-full",
                        n.severity ? SEVERITY_DOT[n.severity] : "bg-muted-foreground/40",
                      )}
                      aria-hidden
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate font-medium text-sm">{n.title}</span>
                        {!n.read && <span className="size-1.5 shrink-0 rounded-full bg-focal" />}
                      </span>
                      {n.description && (
                        <span className="mt-0.5 block text-muted-foreground text-xs">
                          {n.description}
                        </span>
                      )}
                      <span className="mt-1 block font-mono text-[10px] text-muted-foreground/70">
                        {timeAgo(n.timestamp)}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export type { NotificationCenterProps, NotificationItem, NotificationSeverity }
export { NotificationCenter }
