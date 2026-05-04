"use client"

// Example: Settings → Members tab.
//
// Shows how to compose SettingsLayout + TeamTable. Layouts are not
// bundled — copy this file into your app and edit freely.

import { type TeamMember, TeamTable } from "../blocks/team-table"
import { SettingsLayout } from "./settings-layout"

const MEMBERS: TeamMember[] = [
  {
    id: "u1",
    name: "Mia Kowalski",
    email: "mia@cogentic.co",
    role: "Compliance Lead",
    status: "active",
  },
  {
    id: "u2",
    name: "Sam Takeda",
    email: "sam@cogentic.co",
    role: "Compliance Lead",
    status: "active",
  },
  {
    id: "u3",
    name: "Priya Raj",
    email: "priya@cogentic.co",
    role: "Compliance Lead",
    status: "invited",
  },
  {
    id: "u4",
    name: "Alex Chen",
    email: "alex@cogentic.co",
    role: "Compliance Lead",
    status: "active",
  },
]

const ROLES = [
  { value: "owner", label: "Owner" },
  { value: "admin", label: "Admin" },
  { value: "member", label: "Member" },
]

export default function SettingsMembersPage() {
  return (
    <SettingsLayout activeTab="members">
      <section className="flex flex-col gap-6">
        <div>
          <h2 className="font-semibold text-2xl tracking-tight">Members</h2>
          <p className="mt-1 text-muted-foreground text-sm">
            Manage team access and roles. {MEMBERS.length} team members.
          </p>
        </div>
        <TeamTable members={MEMBERS} roles={ROLES} />
      </section>
    </SettingsLayout>
  )
}
