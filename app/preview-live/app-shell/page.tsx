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
    title: "Workspace",
    items: [
      { label: "Team", icon: Users, href: "#" },
      { label: "Projects", icon: Briefcase, href: "#" },
    ],
  },
]

const sampleFooterNav: NavGroup = {
  title: "Help",
  items: [
    { label: "Settings", icon: Settings, href: "#" },
    { label: "Help", icon: HelpCircle, href: "#" },
  ],
}

export default function AppShellLivePreview() {
  return (
    <AppShell
      logo={{
        icon: <span className="font-bold text-sm">C</span>,
        title: "Cogentic",
        subtitle: "Design System",
      }}
      nav={sampleNav}
      footerNav={sampleFooterNav}
      user={{ name: "Mia Kowalski", email: "mia@cogentic.co" }}
      breadcrumbs={[{ label: "Overview", href: "#" }, { label: "Dashboard" }]}
      onLogout={() => console.log("logout")}
    >
      <div className="flex-1 rounded-xl bg-muted/50 p-8">
        <p className="text-muted-foreground">Page content goes here</p>
      </div>
    </AppShell>
  )
}
