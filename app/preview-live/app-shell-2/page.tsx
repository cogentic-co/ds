"use client"

import { BarChart3, Flag, Inbox, List, Shield, Users } from "lucide-react"
import { AppShell2 } from "@/src/shells/app-shell-2"

export default function AppShell2LivePreview() {
  return (
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
        Main content area. The filter bar slot sits between header and content.
      </div>
    </AppShell2>
  )
}
