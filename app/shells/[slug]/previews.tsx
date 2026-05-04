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

export const shellPreviews: Record<string, React.ComponentType> = {
  "app-shell": AppShellPreview,
}
