"use client"

import { useEffect } from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../components/command"

type CommandPaletteAction = {
  id: string
  label: string
  icon?: React.ReactNode
  shortcut?: string
  onSelect: () => void
}

type CommandPaletteGroup = {
  heading: string
  actions: CommandPaletteAction[]
}

type CommandPaletteProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  groups: CommandPaletteGroup[]
  /** Placeholder for the search input. Default: "Search commands..." */
  placeholder?: string
  /** Text shown when no results match. Default: "No results found." */
  emptyMessage?: string
  /** Bind Cmd/Ctrl+K to toggle the palette. Default: true */
  enableShortcut?: boolean
}

function CommandPalette({
  open,
  onOpenChange,
  groups,
  placeholder = "Search commands...",
  emptyMessage = "No results found.",
  enableShortcut = true,
}: CommandPaletteProps) {
  useEffect(() => {
    if (!enableShortcut) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, onOpenChange, enableShortcut])

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder={placeholder} />
      <CommandList>
        <CommandEmpty>{emptyMessage}</CommandEmpty>
        {groups.map((group, gi) => (
          <div key={group.heading}>
            {gi > 0 && <CommandSeparator />}
            <CommandGroup heading={group.heading}>
              {group.actions.map((action) => (
                <CommandItem
                  key={action.id}
                  onSelect={() => {
                    action.onSelect()
                    onOpenChange(false)
                  }}
                >
                  {action.icon && (
                    <span className="mr-2 inline-flex size-4 items-center justify-center text-muted-foreground [&>svg]:size-4">
                      {action.icon}
                    </span>
                  )}
                  {action.label}
                  {action.shortcut && <CommandShortcut>{action.shortcut}</CommandShortcut>}
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        ))}
      </CommandList>
    </CommandDialog>
  )
}

export type { CommandPaletteAction, CommandPaletteGroup, CommandPaletteProps }
export { CommandPalette }
