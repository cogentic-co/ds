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
import { SidebarLayout } from "@/src/layouts/sidebar-layout"
import type { NavGroup } from "@/src/shells/app-shell"
import { AppShell } from "@/src/shells/app-shell"

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
    <iframe
      src="/preview-live/app-shell"
      title="App Shell live preview"
      className="h-[700px] w-full overflow-hidden rounded-lg border border-border"
    />
  )
}

function SidebarLayoutPreview() {
  return (
    <SidebarLayout
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
    </SidebarLayout>
  )
}

export const shellPreviews: Record<string, React.ComponentType> = {
  "app-shell": AppShellPreview,
  "sidebar-layout": SidebarLayoutPreview,
}
