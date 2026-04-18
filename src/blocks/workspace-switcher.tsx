"use client"

import { ChevronsUpDown, Plus } from "lucide-react"
import type * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../components/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../components/sidebar"
import { cn } from "../lib/utils"

type Workspace = {
  id: string
  name: string
  subtitle?: string
  /** Logo / icon rendered in a 32px square. Any ReactNode — typically a lucide icon or SVG. */
  logo: React.ReactNode
  /** Optional keyboard shortcut hint (e.g. "⌘1") shown on the right in the dropdown. */
  shortcut?: string
}

type WorkspaceSwitcherProps = {
  /** The currently-active workspace. Rendered in the trigger button. */
  active: Workspace
  /** All available workspaces (including the active one) rendered in the dropdown list. */
  workspaces?: Workspace[]
  /** Label above the list in the dropdown. Defaults to "Workspaces". */
  listLabel?: string
  /** Called when the user picks a workspace from the dropdown. */
  onSelect?: (workspace: Workspace) => void
  /** Called when the user clicks the "Add workspace" footer item. Omit to hide the footer. */
  onAddWorkspace?: () => void
  /** Label for the add footer. Defaults to "Add workspace". */
  addLabel?: string
  className?: string
}

/**
 * WorkspaceSwitcher — sidebar-header-sized dropdown trigger showing the
 * currently-active workspace (logo + name + optional subtitle) with a
 * chevron. Clicking opens a dropdown listing all workspaces with keyboard
 * shortcuts and an optional "Add workspace" footer.
 *
 * Designed to live inside `SidebarHeader` as a replacement for the static
 * workspace/logo block. Use it when your app has multiple workspaces, teams,
 * or tenants that the user can switch between.
 *
 * @example
 * ```tsx
 * <SidebarHeader>
 *   <WorkspaceSwitcher
 *     active={currentWorkspace}
 *     workspaces={allWorkspaces}
 *     onSelect={(ws) => router.push(`/${ws.id}`)}
 *     onAddWorkspace={() => router.push("/workspaces/new")}
 *   />
 * </SidebarHeader>
 * ```
 */
function WorkspaceSwitcher({
  active,
  workspaces,
  listLabel = "Workspaces",
  onSelect,
  onAddWorkspace,
  addLabel = "Add workspace",
  className,
}: WorkspaceSwitcherProps) {
  return (
    <SidebarMenu data-slot="workspace-switcher" className={className}>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              />
            }
          >
            <div
              data-slot="workspace-switcher-logo"
              className="flex aspect-square size-8 items-center justify-center rounded-md bg-primary text-primary-foreground"
            >
              {active.logo}
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{active.name}</span>
              {active.subtitle && (
                <span className="truncate text-muted-foreground text-xs">{active.subtitle}</span>
              )}
            </div>
            <ChevronsUpDown className="ml-auto size-4 shrink-0 text-muted-foreground" />
          </DropdownMenuTrigger>
          {workspaces && workspaces.length > 0 && (
            <DropdownMenuContent
              className="min-w-56 rounded-lg"
              align="start"
              side="right"
              sideOffset={8}
            >
              <DropdownMenuLabel className="text-muted-foreground text-xs">
                {listLabel}
              </DropdownMenuLabel>
              {workspaces.map((workspace) => (
                <DropdownMenuItem
                  key={workspace.id}
                  data-slot="workspace-switcher-item"
                  onClick={() => onSelect?.(workspace)}
                  className="gap-2"
                >
                  <div
                    className={cn(
                      "flex aspect-square size-6 shrink-0 items-center justify-center rounded-sm border border-border text-muted-foreground",
                      workspace.id === active.id &&
                        "border-primary/30 bg-primary/5 text-foreground",
                    )}
                  >
                    {workspace.logo}
                  </div>
                  <span className="truncate">{workspace.name}</span>
                  {workspace.shortcut && (
                    <DropdownMenuShortcut>{workspace.shortcut}</DropdownMenuShortcut>
                  )}
                </DropdownMenuItem>
              ))}
              {onAddWorkspace && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    data-slot="workspace-switcher-add"
                    onClick={onAddWorkspace}
                    className="gap-2 text-muted-foreground"
                  >
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-sm border border-border border-dashed">
                      <Plus className="size-3.5" />
                    </div>
                    <span>{addLabel}</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export type { Workspace, WorkspaceSwitcherProps }
export { WorkspaceSwitcher }
