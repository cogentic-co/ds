"use client"

import { MoreHorizontal } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../components/avatar"
import { Badge } from "../components/badge"
import { Button } from "../components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/table"
import { cn, initials, timeAgo } from "../lib/utils"

type TeamMemberStatus = "active" | "invited" | "suspended"

type TeamMember = {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
  status?: TeamMemberStatus
  /** ISO timestamp */
  lastActive?: string
}

type TeamTableProps = ComponentProps<"div"> & {
  members: TeamMember[]
  /** Available roles for the role dropdown */
  roles: { value: string; label: string }[]
  onRoleChange?: (memberId: string, role: string) => void
  onRemove?: (memberId: string) => void
  onResendInvite?: (memberId: string) => void
  /** Optional custom per-row action menu items */
  renderActions?: (member: TeamMember) => ReactNode
}

const STATUS_BADGE: Record<TeamMemberStatus, string> = {
  active:
    "border-emerald-700/40 bg-emerald-700/10 text-emerald-700 dark:border-emerald-400/40 dark:bg-emerald-400/10 dark:text-emerald-400",
  invited: "border-border bg-muted text-muted-foreground",
  suspended:
    "border-red-700/40 bg-red-700/10 text-red-700 dark:border-red-400/40 dark:bg-red-400/10 dark:text-red-400",
}

function TeamTable({
  members,
  roles,
  onRoleChange,
  onRemove,
  onResendInvite,
  renderActions,
  className,
  ...props
}: TeamTableProps) {
  return (
    <div
      data-slot="team-table"
      className={cn("rounded-xl border border-border", className)}
      {...props}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last active</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="size-8">
                    {member.avatar && <AvatarImage src={member.avatar} alt={member.name} />}
                    <AvatarFallback className="text-[11px]">{initials(member.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{member.name}</span>
                    <span className="text-muted-foreground text-xs">{member.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {onRoleChange ? (
                  <Select
                    value={member.role}
                    onValueChange={(v) => v && onRoleChange(member.id, v)}
                  >
                    <SelectTrigger className="h-8 w-32 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((r) => (
                        <SelectItem key={r.value} value={r.value}>
                          {r.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <span className="text-sm">{member.role}</span>
                )}
              </TableCell>
              <TableCell>
                <Badge
                  square
                  variant="outline"
                  className={cn(
                    "px-1.5 py-0.5 text-[10px] uppercase leading-none",
                    STATUS_BADGE[member.status ?? "active"],
                  )}
                >
                  {member.status ?? "active"}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="font-mono text-muted-foreground text-xs">
                  {member.lastActive ? timeAgo(member.lastActive) : "—"}
                </span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button variant="ghost" size="icon-xs">
                        <MoreHorizontal className="size-3.5" />
                      </Button>
                    }
                  />
                  <DropdownMenuContent align="end">
                    {renderActions?.(member)}
                    {member.status === "invited" && onResendInvite && (
                      <DropdownMenuItem onClick={() => onResendInvite(member.id)}>
                        Resend invite
                      </DropdownMenuItem>
                    )}
                    {onRemove && (
                      <DropdownMenuItem
                        onClick={() => onRemove(member.id)}
                        className="text-destructive"
                      >
                        Remove
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export type { TeamMember, TeamMemberStatus, TeamTableProps }
export { TeamTable }
