"use client"

import { type TeamMember, TeamTable } from "../blocks/team-table"
import { SettingsLayout } from "./settings-layout"

// Settings → Members tab. Copy-source recipe.

const DEFAULT_MEMBERS: TeamMember[] = [
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

const DEFAULT_ROLES = [
  { value: "owner", label: "Owner" },
  { value: "admin", label: "Admin" },
  { value: "member", label: "Member" },
]

type SettingsMembersPageProps = {
  members?: TeamMember[]
  roles?: { value: string; label: string }[]
  onTabChange?: (value: string) => void
  onRoleChange?: (memberId: string, role: string) => void
  onRemove?: (memberId: string) => void
  onResendInvite?: (memberId: string) => void
}

function SettingsMembersPage({
  members = DEFAULT_MEMBERS,
  roles = DEFAULT_ROLES,
  onTabChange,
  onRoleChange,
  onRemove,
  onResendInvite,
}: SettingsMembersPageProps) {
  return (
    <SettingsLayout activeTab="members" onTabChange={onTabChange}>
      <section className="flex flex-col gap-6">
        <div>
          <h2 className="font-semibold text-2xl tracking-tight">Members</h2>
          <p className="mt-1 text-muted-foreground text-sm">
            Manage team access and roles. {members.length} team member
            {members.length === 1 ? "" : "s"}.
          </p>
        </div>
        <TeamTable
          members={members}
          roles={roles}
          onRoleChange={onRoleChange}
          onRemove={onRemove}
          onResendInvite={onResendInvite}
        />
      </section>
    </SettingsLayout>
  )
}

export type { SettingsMembersPageProps }
export { SettingsMembersPage }
