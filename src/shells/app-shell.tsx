import { ChevronRight, ChevronsUpDown, LogOut, User } from "lucide-react"
import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../components/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/breadcrumb"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../components/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/dropdown-menu"
import { ScrollArea } from "../components/scroll-area"
import { Separator } from "../components/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "../components/sidebar"
import { cn } from "../lib/utils"
import { IconRail, type IconRailItem } from "./icon-rail"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type NavItem = {
  label: string
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  href: string
  isActive?: boolean
  children?: NavItem[]
  /** Optional badge rendered after the label */
  badge?: React.ReactNode
}

type NavGroup = {
  /** Stable id for icon-rail mapping. Defaults to a slug of the title. */
  id?: string
  /** Icon rendered in the icon rail when iconRail is enabled. */
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string
  items: NavItem[]
  defaultOpen?: boolean
}

function groupSlug(group: NavGroup): string {
  return group.id ?? group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
}

function groupContainsActive(group: NavGroup): boolean {
  const walk = (items: NavItem[]): boolean =>
    items.some((item) => item.isActive || (item.children && walk(item.children)))
  return walk(group.items)
}

type AppShellUser = {
  name: string
  email: string
  avatar?: string
}

type BreadcrumbSegment = {
  label: string
  href?: string
}

type AppShellLogo = {
  icon?: React.ReactNode
  title: string
  subtitle?: string
  href?: string
}

interface AppShellProps {
  /** Logo/branding for the sidebar header */
  logo: AppShellLogo
  /** Main navigation groups rendered in the sidebar body */
  nav: NavGroup[]
  /** Optional footer navigation group (e.g. Help, Settings) */
  footerNav?: NavGroup
  /** User data — renders a user menu in the sidebar footer */
  user?: AppShellUser
  /** Breadcrumb segments for the header */
  breadcrumbs?: BreadcrumbSegment[]
  /** Extra content rendered on the right side of the header */
  headerActions?: React.ReactNode
  /** Custom user menu items rendered before the logout item */
  userMenuItems?: React.ReactNode
  /** Called when the user clicks "Log out" */
  onLogout?: () => void
  /** Component to use for links (e.g. Next.js Link). Defaults to `"a"`. */
  linkComponent?: React.ElementType
  /** Extra content rendered below the logo in the sidebar header */
  sidebarHeaderExtra?: React.ReactNode
  /** Page content */
  children: React.ReactNode
  className?: string

  /**
   * Enable the icon rail. When `true`, renders one rail icon per nav group
   * (using each group's `icon` and `title`) and filters the sidebar panel
   * to only show the active group's items. Each `nav` group should have an
   * `icon` field set when this is enabled.
   */
  iconRail?: boolean
  /** Id of the active rail item. Defaults to the group containing an active item. */
  activeRailId?: string
  /** Called when a rail icon is clicked. */
  onRailSelect?: (id: string) => void
  /** Optional top slot for the rail (above the nav icons). */
  iconRailHeader?: React.ReactNode
  /** Optional bottom slot for the rail (below the nav icons). */
  iconRailFooter?: React.ReactNode
}

// ---------------------------------------------------------------------------
// Internal components
// ---------------------------------------------------------------------------

function RailLogo({
  logo,
  linkComponent: Link = "a",
}: {
  logo: AppShellLogo
  linkComponent?: React.ElementType
}) {
  return (
    <Link
      href={logo.href ?? "/"}
      aria-label={logo.title}
      className="flex aspect-square size-9 items-center justify-center rounded-md bg-primary text-primary-foreground"
    >
      {logo.icon}
    </Link>
  )
}

function ShellLogo({
  logo,
  linkComponent: Link = "a",
}: {
  logo: AppShellLogo
  linkComponent?: React.ElementType
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" render={<Link href={logo.href ?? "/"} />}>
          {logo.icon && (
            <div className="flex aspect-square size-8 items-center justify-center rounded-sm bg-primary text-primary-foreground">
              {logo.icon}
            </div>
          )}
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-medium">{logo.title}</span>
            {logo.subtitle && (
              <span className="text-muted-foreground text-xs">{logo.subtitle}</span>
            )}
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

function ShellNavItem({
  item,
  linkComponent: Link = "a",
}: {
  item: NavItem
  linkComponent?: React.ElementType
}) {
  const Icon = item.icon
  const hasChildren = item.children && item.children.length > 0

  if (!hasChildren) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton render={<Link href={item.href} />} isActive={item.isActive}>
          {Icon && <Icon className="size-4" />}
          <span>{item.label}</span>
          {item.badge && <span className="ml-auto">{item.badge}</span>}
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger render={<SidebarMenuButton isActive={item.isActive} />}>
          {Icon && <Icon className="size-4" />}
          <span>{item.label}</span>
          <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.children!.map((child) => (
              <SidebarMenuSubItem key={child.label}>
                <SidebarMenuSubButton render={<Link href={child.href} />} isActive={child.isActive}>
                  {child.label}
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

function ShellUserMenu({
  user,
  userMenuItems,
  onLogout,
}: {
  user: AppShellUser
  userMenuItems?: React.ReactNode
  onLogout?: () => void
}) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <SidebarMenu>
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
            <Avatar className="size-8 rounded-lg">
              {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
              <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-muted-foreground text-xs">{user.email}</span>
            </div>
            <ChevronsUpDown className="ml-auto size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-56 rounded-lg"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-8 rounded-lg">
                  {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                  <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-muted-foreground text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {userMenuItems ?? (
              <DropdownMenuItem>
                <User className="mr-2 size-4" />
                Account
              </DropdownMenuItem>
            )}
            {onLogout && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="mr-2 size-4" />
                  Log out
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

// ---------------------------------------------------------------------------
// AppShell
// ---------------------------------------------------------------------------

function AppShell({
  logo,
  nav,
  footerNav,
  user,
  breadcrumbs,
  headerActions,
  userMenuItems,
  onLogout,
  sidebarHeaderExtra,
  linkComponent: Link = "a",
  children,
  className,
  iconRail,
  activeRailId,
  onRailSelect,
  iconRailHeader,
  iconRailFooter,
}: AppShellProps) {
  // Derive icon rail items from nav groups when iconRail is enabled.
  const railItems: IconRailItem[] | undefined = iconRail
    ? nav.map((group) => ({
        id: groupSlug(group),
        icon: group.icon ? <group.icon className="size-5" /> : null,
        label: group.title,
        href: group.items[0]?.href,
      }))
    : undefined

  // Auto-derive active rail id from the group containing the active item,
  // unless an explicit activeRailId is provided.
  const resolvedActiveRailId = (() => {
    if (activeRailId) return activeRailId
    if (!iconRail) return undefined
    const active = nav.find(groupContainsActive)
    return active ? groupSlug(active) : groupSlug(nav[0])
  })()

  // Filter nav groups to only the active rail's group when rail is enabled.
  const visibleNav =
    iconRail && resolvedActiveRailId
      ? nav.filter((g) => groupSlug(g) === resolvedActiveRailId)
      : nav

  return (
    <div className="flex h-svh w-full overflow-hidden bg-background">
      {iconRail && railItems && (
        <IconRail
          items={railItems}
          activeId={resolvedActiveRailId}
          onSelect={onRailSelect}
          header={iconRailHeader ?? <RailLogo logo={logo} linkComponent={Link} />}
          footer={iconRailFooter}
          linkComponent={Link}
        />
      )}
      <SidebarProvider
        className={cn("flex-1", className)}
        style={iconRail ? ({ "--sidebar-left-offset": "56px" } as React.CSSProperties) : undefined}
      >
        <Sidebar variant="inset">
          <SidebarHeader>
            {!iconRail && <ShellLogo logo={logo} linkComponent={Link} />}
            {sidebarHeaderExtra}
          </SidebarHeader>

          <SidebarContent className="overflow-hidden">
            <ScrollArea className="min-h-0 flex-1">
              {visibleNav.map((group) => (
                <SidebarGroup key={group.title}>
                  <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {group.items.map((item) => (
                        <ShellNavItem key={item.label} item={item} linkComponent={Link} />
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </ScrollArea>
          </SidebarContent>

          <SidebarFooter>
            {footerNav && (
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {footerNav.items.map((item) => (
                      <ShellNavItem key={item.label} item={item} linkComponent={Link} />
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
            {user && (
              <ShellUserMenu user={user} userMenuItems={userMenuItems} onLogout={onLogout} />
            )}
          </SidebarFooter>

          <SidebarRail />
        </Sidebar>

        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 hidden data-[orientation=vertical]:h-4 md:block"
            />
            {/* Mobile logo */}
            <Link href={logo.href ?? "/"} className="flex items-center gap-2 md:hidden">
              {logo.icon && (
                <div className="flex aspect-square size-8 items-center justify-center rounded-sm bg-primary text-primary-foreground">
                  {logo.icon}
                </div>
              )}
              <span className="font-semibold">{logo.title}</span>
            </Link>

            {/* Breadcrumbs */}
            {breadcrumbs && breadcrumbs.length > 0 && (
              <Breadcrumb className="hidden md:block">
                <BreadcrumbList>
                  {breadcrumbs.map((segment, i) => (
                    <React.Fragment key={segment.label}>
                      {i > 0 && <BreadcrumbSeparator />}
                      <BreadcrumbItem>
                        {i === breadcrumbs.length - 1 || !segment.href ? (
                          <BreadcrumbPage>{segment.label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={segment.href}>{segment.label}</BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            )}

            {headerActions && (
              <div className="ml-auto flex items-center gap-2">{headerActions}</div>
            )}
          </header>

          <div className="scrollbar-hide flex flex-1 flex-col gap-4 overflow-y-auto p-4">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

export { AppShell }
export type { AppShellProps, AppShellLogo, AppShellUser, NavItem, NavGroup, BreadcrumbSegment }
export type { IconRailItem } from "./icon-rail"
