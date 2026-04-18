"use client"

import { BarChart3, Flag, Inbox, List, Settings, Shield, Users } from "lucide-react"
import type { ComponentType } from "react"

import { Badge } from "../components/badge"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/sidebar"

type NavKey = "over" | "tx" | "cases" | "tr" | "cp" | "rules"

type AppSidebarProps = {
  active?: NavKey
  user?: { name: string; role: string; initials: string }
  env?: "PROD" | "STAGING" | "DEV"
  counts?: Partial<Record<NavKey, number>>
  dots?: Partial<Record<NavKey, boolean>>
  onNavigate?: (key: NavKey, href: string) => void
}

type NavItem = {
  key: NavKey
  icon: ComponentType<{ className?: string }>
  label: string
  href: string
}

const compliance: readonly NavItem[] = [
  { key: "over", icon: BarChart3, label: "Overview", href: "/" },
  { key: "tx", icon: List, label: "Transactions", href: "/transactions" },
  { key: "cases", icon: Shield, label: "Cases", href: "/cases" },
  { key: "tr", icon: Inbox, label: "Travel rule", href: "/travel-rule" },
]

const operations: readonly NavItem[] = [
  { key: "cp", icon: Users, label: "Counterparties", href: "/counterparties" },
  { key: "rules", icon: Flag, label: "Rules", href: "/rules" },
]

function AppSidebar({
  active = "tx",
  user = { name: "Mia Kowalski", role: "Compliance lead", initials: "MK" },
  env = "PROD",
  counts = { tx: 12, cases: 4, tr: 2 },
  dots = { tr: true },
  onNavigate,
}: AppSidebarProps) {
  const renderItem = (it: NavItem) => (
    <SidebarMenuItem key={it.key}>
      <SidebarMenuButton
        isActive={active === it.key}
        tooltip={it.label}
        render={
          <a
            href={it.href}
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault()
                onNavigate(it.key, it.href)
              }
            }}
          />
        }
      >
        <it.icon />
        <span>{it.label}</span>
      </SidebarMenuButton>
      {counts[it.key] != null && <SidebarMenuBadge>{counts[it.key]}</SidebarMenuBadge>}
      {dots[it.key] && (
        <span className="pointer-events-none absolute top-1/2 right-2.5 size-1.5 -translate-y-1/2 rounded-full bg-destructive" />
      )}
    </SidebarMenuItem>
  )

  return (
    <Sidebar data-slot="app-sidebar">
      <SidebarHeader className="gap-3 border-border border-b border-dashed px-3 pt-3.5 pb-3">
        <div className="flex items-center gap-2.5">
          <div
            className="flex size-7 items-center justify-center rounded-[var(--radius-md)] font-bold text-[13px] text-primary-foreground tracking-tight"
            style={{
              background:
                "linear-gradient(135deg, var(--primary), color-mix(in oklab, var(--primary) 60%, var(--focal)))",
            }}
            aria-hidden
          >
            C
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate font-semibold text-[13px] tracking-tight">Cogentic</div>
            <div className="text-[11px] text-muted-foreground">Treasury ops</div>
          </div>
          <Badge variant="mint" className="h-5 px-1.5 font-mono text-[10px] tracking-wider">
            {env}
          </Badge>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 pt-2">
        <SidebarGroup>
          <SidebarGroupLabel>Compliance</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{compliance.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Operations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{operations.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <div className="flex items-center gap-2.5 rounded-[var(--radius-md)] border border-border bg-card p-2.5 shadow-[var(--shadow-card)]">
          <div
            className="flex size-7 items-center justify-center rounded-full font-bold text-[11px]"
            style={{ background: "var(--lilac)", color: "var(--lilac-ink)" }}
            aria-hidden
          >
            {user.initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate font-semibold text-xs">{user.name}</div>
            <div className="truncate text-[11px] text-muted-foreground">{user.role}</div>
          </div>
          <button
            type="button"
            className="rounded p-1 text-muted-foreground hover:text-foreground"
            aria-label="Settings"
          >
            <Settings className="size-[14px]" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export type { AppSidebarProps, NavKey }
export { AppSidebar }
