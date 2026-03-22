"use client"

import {
  BarChart3,
  Briefcase,
  ClipboardList,
  HelpCircle,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react"
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

export const shellPreviews: Record<string, React.ComponentType> = {
  "app-shell": AppShellPreview,
}
