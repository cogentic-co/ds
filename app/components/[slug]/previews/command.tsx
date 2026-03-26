"use client"

import { CalendarIcon, MailIcon, SearchIcon, SettingsIcon, UserIcon } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

export default function CommandPreview() {
  return (
    <div className="max-w-sm">
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <CalendarIcon className="size-4" />
              Calendar
            </CommandItem>
            <CommandItem>
              <SearchIcon className="size-4" />
              Search
            </CommandItem>
            <CommandItem>
              <SettingsIcon className="size-4" />
              Settings
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <UserIcon className="size-4" />
              Profile
            </CommandItem>
            <CommandItem>
              <MailIcon className="size-4" />
              Mail
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}
