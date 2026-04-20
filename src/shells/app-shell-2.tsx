"use client"

import { Bell, Search, Settings } from "lucide-react"
import type { ComponentType, ReactNode } from "react"

import { type Tone, TONE_CLASSES } from "../lib/tone"
import { cn } from "../lib/utils"

type NavEntry = {
  key: string
  icon: ComponentType<{ className?: string }>
  label: string
  count?: number
  dot?: boolean
  href?: string
}

type NavSection = {
  label?: string
  items: NavEntry[]
}

type AppShell2Brand = {
  initial: string
  title: string
  subtitle?: string
  env?: string
  envVariant?: Tone
}

type AppShell2User = {
  initials: string
  name: string
  role: string
  avatarTone?: Tone
}

type AppShell2SidebarProps = {
  brand: AppShell2Brand
  nav: NavSection[]
  active?: string
  user: AppShell2User
  onNavigate?: (key: string, href?: string) => void
  onSettings?: () => void
}

function AppShell2Sidebar({
  brand,
  nav,
  active,
  user,
  onNavigate,
  onSettings,
}: AppShell2SidebarProps) {
  const envTone = brand.envVariant ?? "mint"
  const avatarTone = user.avatarTone ?? "lilac"

  return (
    <aside
      data-slot="app-shell-2-sidebar"
      className="sticky top-0 flex h-screen w-[248px] shrink-0 flex-col border-border border-r px-3 pt-3.5 pb-3"
      style={{
        background: "color-mix(in oklab, var(--card) 60%, var(--background))",
      }}
    >
      {/* Brand */}
      <div className="mb-2.5 flex items-center gap-2.5 border-border border-b border-dashed px-2 pt-1 pb-3.5">
        <div
          className="flex size-7 items-center justify-center rounded-[var(--radius-md)] font-bold text-[13px] text-primary-foreground tracking-tight"
          style={{
            background:
              "linear-gradient(135deg, var(--primary), color-mix(in oklab, var(--primary) 60%, var(--focal)))",
          }}
          aria-hidden
        >
          {brand.initial}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate font-semibold text-[13px] tracking-tight">{brand.title}</div>
          {brand.subtitle && (
            <div className="text-[11px] text-muted-foreground">{brand.subtitle}</div>
          )}
        </div>
        {brand.env && (
          <span
            className={cn(
              "rounded-[4px] px-1.5 py-0.5 font-mono font-semibold text-[10px]",
              TONE_CLASSES[envTone],
            )}
          >
            {brand.env}
          </span>
        )}
      </div>

      {/* Nav */}
      <div className="-mx-1 flex-1 overflow-auto px-1">
        {nav.map((section) => (
          <AppShell2NavGroup
            key={section.label ?? "unlabeled"}
            section={section}
            active={active}
            onNavigate={onNavigate}
          />
        ))}
      </div>

      {/* User footer card */}
      <div className="mt-2 flex items-center gap-2.5 rounded-[var(--radius-md)] border border-border bg-card p-2.5 shadow-[var(--shadow-card)]">
        <div
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-full font-bold text-[11px]",
            TONE_CLASSES[avatarTone],
          )}
          aria-hidden
        >
          {user.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate font-semibold text-xs">{user.name}</div>
          <div className="truncate text-[11px] text-muted-foreground">{user.role}</div>
        </div>
        <button
          type="button"
          onClick={onSettings}
          className="rounded p-1 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Settings"
        >
          <Settings className="size-[14px]" />
        </button>
      </div>
    </aside>
  )
}

function AppShell2NavGroup({
  section,
  active,
  onNavigate,
}: {
  section: NavSection
  active?: string
  onNavigate?: (key: string, href?: string) => void
}) {
  return (
    <div className="flex flex-col gap-0.5 pb-2.5">
      {section.label && (
        <div className="px-2.5 pt-2 pb-1 font-mono font-semibold text-[10px] text-muted-foreground uppercase tracking-[0.1em]">
          {section.label}
        </div>
      )}
      {section.items.map((item) => (
        <AppShell2NavItem
          key={item.key}
          item={item}
          isActive={item.key === active}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  )
}

function AppShell2NavItem({
  item,
  isActive,
  onNavigate,
}: {
  item: NavEntry
  isActive: boolean
  onNavigate?: (key: string, href?: string) => void
}) {
  const Icon = item.icon
  return (
    <button
      type="button"
      onClick={() => onNavigate?.(item.key, item.href)}
      data-active={isActive || undefined}
      className={cn(
        "relative flex w-full items-center gap-2.5 rounded-[8px] px-2.5 py-[7px] text-left text-[13px] transition-colors",
        isActive
          ? "bg-card font-semibold text-foreground shadow-[inset_0_0_0_1px_var(--border),_var(--shadow-card)]"
          : "font-medium text-muted-foreground hover:bg-[color-mix(in_oklab,var(--muted)_70%,transparent)]",
      )}
    >
      {isActive && (
        <span
          className="absolute top-1/2 left-[-12px] h-4 w-[3px] -translate-y-1/2 rounded-[2px]"
          style={{ background: "var(--highlight-ink)" }}
          aria-hidden
        />
      )}
      <Icon className={cn("size-[15px] shrink-0", isActive ? "text-[var(--highlight-ink)]" : "")} />
      <span className="flex-1 truncate">{item.label}</span>
      {item.count != null && (
        <span
          className={cn(
            "rounded-full px-1.5 py-[1px] font-mono font-semibold text-[10px]",
            isActive
              ? "bg-highlight text-highlight-ink"
              : "bg-[color-mix(in_oklab,var(--muted)_80%,transparent)] text-muted-foreground shadow-[inset_0_0_0_1px_var(--border-light)]",
          )}
        >
          {item.count}
        </span>
      )}
      {item.dot && <span className="size-1.5 shrink-0 rounded-full bg-destructive" aria-hidden />}
    </button>
  )
}

type AppShell2HeaderProps = {
  section: string
  title: string
  searchPlaceholder?: string
  onSearchChange?: (value: string) => void
  searchValue?: string
  kbdHint?: string
  onBell?: () => void
  hasNotifications?: boolean
  headerActions?: ReactNode
}

function AppShell2Header({
  section,
  title,
  searchPlaceholder = "Search…",
  searchValue,
  onSearchChange,
  kbdHint = "⌘K",
  onBell,
  hasNotifications,
  headerActions,
}: AppShell2HeaderProps) {
  return (
    <div
      data-slot="app-shell-2-header"
      className="flex items-center gap-3 border-border border-b bg-background px-6 py-3.5"
    >
      <div className="min-w-0">
        <div className="font-medium text-muted-foreground text-xs">{section}</div>
        <div className="font-semibold text-xl" style={{ letterSpacing: "-0.02em" }}>
          {title}
        </div>
      </div>
      <div className="flex-1" />
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder={searchPlaceholder}
          className="h-9 w-80 rounded-[var(--radius-md)] border border-border bg-card pr-3 pl-8 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25"
        />
      </div>
      {kbdHint && (
        <span className="inline-flex h-9 items-center gap-1.5 rounded-[var(--radius-md)] border border-border bg-card px-2.5 font-mono font-semibold text-[11px] text-muted-foreground">
          {kbdHint}
        </span>
      )}
      <button
        type="button"
        onClick={onBell}
        aria-label="Notifications"
        className="relative inline-flex size-9 items-center justify-center rounded-[var(--radius-md)] border border-border bg-card text-foreground"
      >
        <Bell className="size-[15px]" />
        {hasNotifications && (
          <span
            className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-destructive"
            aria-hidden
          />
        )}
      </button>
      {headerActions}
    </div>
  )
}

type AppShell2Props = {
  brand: AppShell2Brand
  nav: NavSection[]
  active?: string
  user: AppShell2User
  section: string
  title: string
  searchPlaceholder?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  kbdHint?: string
  hasNotifications?: boolean
  onBell?: () => void
  onSettings?: () => void
  onNavigate?: (key: string, href?: string) => void
  headerActions?: ReactNode
  filters?: ReactNode
  children?: ReactNode
  className?: string
}

function AppShell2({
  brand,
  nav,
  active,
  user,
  section,
  title,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  kbdHint,
  hasNotifications,
  onBell,
  onSettings,
  onNavigate,
  headerActions,
  filters,
  children,
  className,
}: AppShell2Props) {
  return (
    <div data-slot="app-shell-2" className={cn("flex min-h-screen bg-background", className)}>
      <AppShell2Sidebar
        brand={brand}
        nav={nav}
        active={active}
        user={user}
        onNavigate={onNavigate}
        onSettings={onSettings}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppShell2Header
          section={section}
          title={title}
          searchPlaceholder={searchPlaceholder}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          kbdHint={kbdHint}
          hasNotifications={hasNotifications}
          onBell={onBell}
          headerActions={headerActions}
        />
        {filters}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}

export type {
  AppShell2Brand,
  AppShell2HeaderProps,
  AppShell2Props,
  AppShell2SidebarProps,
  AppShell2User,
  NavEntry as AppShell2NavEntry,
  NavSection as AppShell2NavSection,
}
export { AppShell2, AppShell2Header, AppShell2Sidebar }
