"use client"

import {
  ArrowRightLeft,
  Bell,
  Briefcase,
  FileBarChart,
  LayoutDashboard,
  Settings as SettingsIcon,
  User,
} from "lucide-react"
import type React from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarBrand,
  SidebarCard,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarUser,
} from "@/components/ui/sidebar"

function CogenticMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M77.268 97.78a1 1 0 0 1-.066-1.659l41.948-30.653a15 15 0 0 1 17.7 0l41.933 30.643a1 1 0 0 1-.076 1.664l-18.156 10.894a1 1 0 0 1-1.081-.033l-30.345-20.863a2 2 0 0 0-2.255-.008l-30.835 20.873a1 1 0 0 1-1.085.024zM46.565 113.336c-10.625 8.21-10.113 24.409 1.01 31.932l71.918 48.64a16 16 0 0 0 17.987-.041l71.019-48.501c11.108-7.586 11.584-23.802.94-32.027a.79.79 0 0 0-.908-.042l-78.435 49.692a3 3 0 0 1-3.197.009l-79.433-49.707a.79.79 0 0 0-.9.045"
      />
    </svg>
  )
}

function Code({ children }: { children: React.ReactNode }) {
  return <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px]">{children}</code>
}

function Row({ name, type, children }: { name: string; type: string; children: React.ReactNode }) {
  return (
    <tr className="border-border border-b last:border-b-0">
      <td className="py-1.5 pr-4 align-top font-mono text-xs">{name}</td>
      <td className="py-1.5 pr-4 align-top font-mono text-muted-foreground text-xs">{type}</td>
      <td className="py-1.5 align-top text-foreground text-sm">{children}</td>
    </tr>
  )
}

function PropTable({ title, rows }: { title: string; rows: React.ReactNode }) {
  return (
    <div className="space-y-2 rounded-lg border border-border p-3">
      <div className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
        {title}
      </div>
      <table className="w-full">
        <tbody>{rows}</tbody>
      </table>
    </div>
  )
}

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, isActive: true },
  { label: "Transactions", icon: ArrowRightLeft },
  { label: "Clients", icon: Briefcase },
  { label: "Reports", icon: FileBarChart },
  { label: "Settings", icon: SettingsIcon },
]

export default function SidebarPreview() {
  return (
    <div className="space-y-8">
      <PropTable
        title="<SidebarBrand> props"
        rows={
          <>
            <Row name="logo" type="ReactNode">
              The brand mark — typically an SVG or icon. Sized to 24×24 by default.
            </Row>
            <Row name="label" type="ReactNode">
              Optional brand label rendered next to the logo. Hidden in icon-collapsed mode.
            </Row>
            <Row name="actions" type="ReactNode">
              Optional trailing slot — notifications bell, account chip, etc.
            </Row>
          </>
        }
      />

      <PropTable
        title="<SidebarCard> props"
        rows={
          <>
            <Row name="reference" type="ReactNode">
              Top-line monospace reference — e.g. <Code>CASE-72</Code>.
            </Row>
            <Row name="title" type="ReactNode">
              Main label.
            </Row>
            <Row name="meta" type="ReactNode">
              Optional bottom meta line — priority, time, etc.
            </Row>
            <Row name="status" type='"online" | "offline" | "busy" | "away" | "pending"'>
              StatusIndicator variant for the leading dot. Omit for no dot.
            </Row>
            <Row name="isActive" type="boolean">
              Sets <Code>data-active</Code> for the highlighted state.
            </Row>
          </>
        }
      />

      <PropTable
        title="<SidebarUser> props"
        rows={
          <>
            <Row name="name" type="string">
              Display name. Initials are derived from this for the avatar fallback.
            </Row>
            <Row name="subtitle" type="ReactNode">
              Secondary line — email, role, workspace, etc.
            </Row>
            <Row name="avatar" type="string">
              Avatar image URL. Falls back to initials of <Code>name</Code>.
            </Row>
            <Row name="fallback" type="ReactNode">
              Override the avatar fallback (defaults to initials).
            </Row>
            <Row name="menuContent" type="ReactNode">
              Items inside the dropdown — compose with <Code>DropdownMenuItem</Code>,{" "}
              <Code>DropdownMenuSeparator</Code>, etc.
            </Row>
            <Row name="onLogout" type="() => void">
              When set, appends a Log out item below <Code>menuContent</Code>.
            </Row>
          </>
        }
      />

      <section className="space-y-3">
        <h3 className="font-medium text-muted-foreground text-sm">Live preview</h3>
        <SidebarProvider className="min-h-0">
          <div className="relative h-[600px] w-[260px] overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <Sidebar collapsible="none" className="h-full w-full bg-transparent">
              <SidebarHeader>
                <SidebarBrand
                  logo={<CogenticMark className="size-6 text-foreground" />}
                  label="Cogentic"
                  actions={
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Notifications"
                      className="relative size-8"
                    >
                      <Bell className="size-4" />
                      <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-destructive" />
                    </Button>
                  }
                />
                <SidebarInput placeholder="Search..." />
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {navItems.map((item) => (
                        <SidebarMenuItem key={item.label}>
                          <SidebarMenuButton isActive={item.isActive}>
                            <item.icon />
                            <span>{item.label}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                  <SidebarGroupLabel>Investigations</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarCard
                          reference="CASE-72"
                          title="Sanctions hit — Helix Labs"
                          meta="P2 · 2d ago"
                          status="busy"
                        />
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarCard
                          reference="INV-2026-00098"
                          title="Wallet risk — Helix Labs"
                          meta="Completed · 2h ago"
                          status="online"
                        />
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
              <SidebarFooter>
                <SidebarUser
                  name="Mia Kowalski"
                  subtitle="Compliance lead · Cogentic"
                  menuContent={
                    <DropdownMenuItem>
                      <User className="mr-2 size-4" />
                      Account
                    </DropdownMenuItem>
                  }
                  onLogout={() => {}}
                />
              </SidebarFooter>
            </Sidebar>
          </div>
        </SidebarProvider>
      </section>
    </div>
  )
}
