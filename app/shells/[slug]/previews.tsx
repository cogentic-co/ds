"use client"

import {
  BarChart3,
  Briefcase,
  ClipboardList,
  Flag,
  HelpCircle,
  Inbox,
  LayoutDashboard,
  List,
  Settings,
  Shield,
  Users,
} from "lucide-react"
import type { NavGroup } from "@/src/shells/app-shell"
import { AppShell } from "@/src/shells/app-shell"
import { AppShell2 } from "@/src/shells/app-shell-2"
import { SettingsLayout } from "@/src/shells/settings-layout"

const sampleNav: NavGroup[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, href: "#", isActive: true },
      { label: "Tasks", icon: ClipboardList, href: "#" },
      { label: "Analytics", icon: BarChart3, href: "#" },
    ],
  },
  {
    title: "Projects",
    items: [
      {
        label: "Active",
        icon: Briefcase,
        href: "#",
        children: [
          { label: "Project Alpha", href: "#" },
          { label: "Project Beta", href: "#" },
        ],
      },
    ],
  },
  {
    title: "Team",
    items: [{ label: "Members", icon: Users, href: "#" }],
  },
]

const sampleFooterNav: NavGroup = {
  title: "Support",
  items: [
    { label: "Help Center", icon: HelpCircle, href: "#" },
    { label: "Settings", icon: Settings, href: "#" },
  ],
}

function AppShellPreview() {
  return (
    <div className="h-[600px] overflow-hidden rounded-lg border">
      <AppShell
        logo={{
          icon: <span className="font-bold text-sm">C</span>,
          title: "Cogentic",
          subtitle: "Design System",
        }}
        nav={sampleNav}
        footerNav={sampleFooterNav}
        user={{
          name: "James Cooke",
          email: "user@example.com",
        }}
        breadcrumbs={[{ label: "Overview", href: "#" }, { label: "Dashboard" }]}
        onLogout={() => alert("Logged out")}
      >
        <div className="flex-1 rounded-xl bg-muted/50 p-8">
          <p className="text-muted-foreground">Page content goes here</p>
        </div>
      </AppShell>
    </div>
  )
}

function SettingsLayoutPreview() {
  return (
    <SettingsLayout
      nav={[
        {
          title: "Workspace",
          items: [
            { label: "General", href: "#", isActive: true, icon: <Settings className="size-4" /> },
            { label: "Members", href: "#", icon: <Users className="size-4" /> },
            { label: "Billing", href: "#" },
            { label: "API keys", href: "#" },
          ],
        },
        {
          title: "Compliance",
          items: [
            { label: "Screening rules", href: "#" },
            { label: "Travel Rule", href: "#" },
            { label: "Risk thresholds", href: "#" },
          ],
        },
      ]}
    >
      <div>
        <h1 className="font-semibold text-2xl">General</h1>
        <p className="mt-1 text-muted-foreground text-sm">Manage your workspace settings.</p>
      </div>
      <div className="rounded-xl border border-border p-6">
        <h3 className="font-medium text-sm">Workspace name</h3>
        <p className="mt-1 text-muted-foreground text-xs">Visible to all members.</p>
        <div className="mt-3 max-w-sm">
          <input
            type="text"
            defaultValue="Cogentic"
            className="w-full rounded-md border border-input bg-card px-3 py-1.5 text-sm"
          />
        </div>
      </div>
      <div className="rounded-xl border border-border p-6">
        <h3 className="font-medium text-sm">Default jurisdiction</h3>
        <p className="mt-1 text-muted-foreground text-xs">Applied to new cases.</p>
      </div>
    </SettingsLayout>
  )
}

function AppShell2Preview() {
  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border">
      <AppShell2
        brand={{
          initial: "C",
          title: "Cogentic",
          subtitle: "Treasury ops",
          env: "PROD",
          envVariant: "mint",
        }}
        user={{
          initials: "MK",
          name: "Mia Kowalski",
          role: "Compliance lead",
          avatarTone: "lilac",
        }}
        active="tx"
        section="Compliance"
        title="Transactions"
        searchPlaceholder="Search hash, address, counterparty"
        kbdHint="⌘K"
        hasNotifications
        nav={[
          {
            label: "Compliance",
            items: [
              { key: "over", icon: BarChart3, label: "Overview" },
              { key: "tx", icon: List, label: "Transactions", count: 12 },
              { key: "cases", icon: Shield, label: "Cases", count: 4 },
              { key: "tr", icon: Inbox, label: "Travel rule", count: 2, dot: true },
            ],
          },
          {
            label: "Operations",
            items: [
              { key: "cp", icon: Users, label: "Counterparties" },
              { key: "rules", icon: Flag, label: "Rules" },
            ],
          },
        ]}
        onNavigate={(k) => console.log("nav", k)}
        onSettings={() => console.log("settings")}
        onBell={() => console.log("bell")}
      >
        <div className="p-10 text-muted-foreground text-sm">
          Main content slot. The filter bar slot sits between header and content.
        </div>
      </AppShell2>
    </div>
  )
}

export const shellPreviews: Record<string, React.ComponentType> = {
  "app-shell": AppShellPreview,
  "app-shell-2": AppShell2Preview,
  "settings-layout": SettingsLayoutPreview,
}
