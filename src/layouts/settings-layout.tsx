"use client"

import type { ComponentProps, ReactNode } from "react"

import { Header } from "../components/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs"
import { cn } from "../lib/utils"

// Shared chrome for the Settings family of pages (General, Members,
// Integrations, Billing, Notifications). Renders the Header, the tab strip,
// and a slot for the active tab's content.
//
// Each Settings page (settings-page, settings-members-page, etc.) wraps its
// content in this layout with the right `activeTab`. Layouts live in
// src/layouts/ as copy-source recipes — they are NOT bundled into the
// published @cogentic-co/ds package.

const SETTINGS_TABS = [
  { value: "general", label: "General", href: "/settings" },
  { value: "members", label: "Members", href: "/settings/members" },
  { value: "integrations", label: "Integrations", href: "/settings/integrations" },
  { value: "billing", label: "Billing", href: "/settings/billing" },
  { value: "notifications", label: "Notifications", href: "/settings/notifications" },
] as const

export type SettingsTabValue = (typeof SETTINGS_TABS)[number]["value"]

type SettingsLayoutProps = Omit<ComponentProps<"div">, "title" | "children"> & {
  /** Which tab is currently active. */
  activeTab: SettingsTabValue
  /** Page title. Defaults to "Settings". */
  title?: ReactNode
  /** Subtitle below the title. */
  subtitle?: ReactNode
  /** Tab content. */
  children: ReactNode
  /** Called when the user clicks another tab — e.g. router.push. */
  onTabChange?: (value: SettingsTabValue) => void
  /** Render-prop for tab triggers — pass a render fn that receives the tab and returns a custom node (e.g. for routing). */
  renderTabLink?: (tab: { value: SettingsTabValue; label: string; href: string }) => ReactNode
}

function SettingsLayout({
  activeTab,
  title = "Settings",
  subtitle = "Manage your workspace, team, billing, and integrations.",
  children,
  onTabChange,
  renderTabLink,
  className,
  ...props
}: SettingsLayoutProps) {
  return (
    <div
      data-slot="settings-layout"
      className={cn("flex min-h-svh flex-col bg-background", className)}
      {...props}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-12 py-10">
        <Header title={title} subtitle={subtitle} size="lg" />

        <Tabs value={activeTab} onValueChange={(v) => onTabChange?.(v as SettingsTabValue)}>
          <TabsList>
            {SETTINGS_TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {renderTabLink ? renderTabLink(tab) : tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="space-y-12 pt-6">
            {children}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export type { SettingsLayoutProps }
export { SETTINGS_TABS, SettingsLayout }
