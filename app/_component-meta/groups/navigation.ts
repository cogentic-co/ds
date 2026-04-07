import type { ComponentMeta } from "../index"

// ── Navigation ──
export const navigationMeta: Record<string, ComponentMeta> = {
  breadcrumb: {
    status: "stable",
    description: "Hierarchical page location indicator.",
    since: "0.1.0",
    importStatement:
      'import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@cogentic-co/ds/breadcrumb"',
    dos: [
      "Show the full path from root to current page",
      "Make all breadcrumb items except the last one clickable",
    ],
    donts: [
      "Don't use for less than 2 levels of depth",
      "Don't duplicate breadcrumbs with other navigation",
    ],
  },
  pagination: {
    status: "stable",
    description: "Page navigation for large data sets.",
    since: "0.1.0",
    importStatement:
      'import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@cogentic-co/ds/pagination"',
    dos: [
      "Show current page and total pages",
      "Include previous/next buttons for keyboard navigation",
    ],
    donts: [
      "Don't show pagination for fewer than 2 pages",
      "Don't use for infinite scroll — load more inline",
    ],
  },
  "navigation-menu": {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/navigation-menu",
    description: "Top-level navigation with dropdown panels.",
    since: "0.1.0",
    importStatement:
      'import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from "@cogentic-co/ds/navigation-menu"',
    dos: [
      "Use for marketing/landing page top navigation",
      "Group related links in dropdown panels",
    ],
    donts: [
      "Don't use for app navigation — use Sidebar or Tabs",
      "Don't put too many items in the top level (>6)",
    ],
  },
  menubar: {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/menubar",
    description: "Application menu bar (File, Edit, View pattern).",
    since: "0.1.0",
    importStatement:
      'import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "@cogentic-co/ds/menubar"',
    dos: [
      "Use for desktop-style application menus",
      "Include keyboard shortcuts for common actions",
    ],
    donts: [
      "Don't use for web navigation — use NavigationMenu",
      "Don't use on mobile — the pattern doesn't translate",
    ],
  },
  command: {
    status: "stable",
    description: "Command palette / searchable command list.",
    since: "0.1.0",
    importStatement:
      'import { Command, CommandDialog, CommandInput, CommandList, CommandGroup, CommandItem } from "@cogentic-co/ds/command"',
    dos: [
      "Use CommandDialog for Cmd+K search patterns",
      "Group commands by category with CommandGroup",
    ],
    donts: ["Don't use as a regular dropdown — use Select or Combobox"],
  },
  sidebar: {
    status: "stable",
    description: "Application sidebar navigation.",
    since: "0.1.0",
    importStatement:
      'import { Sidebar, SidebarProvider, SidebarContent, SidebarMenu } from "@cogentic-co/ds/sidebar"',
    dos: ["Use with AppShell for full application layouts", "Group navigation items by section"],
    donts: ["Don't use for marketing pages — use NavigationMenu"],
  },
}
