"use client"

import {
  BarChart3,
  Blocks,
  BookOpen,
  Bot,
  Braces,
  Component,
  Layers,
  Layout,
  LayoutGrid,
  MessageSquare,
  Moon,
  Move,
  Paintbrush,
  Palette,
  Play,
  Search,
  Shapes,
  Sparkles,
  Sun,
  Type,
  Workflow,
  Wrench,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function CogenticLogo({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" className={className}>
      <path
        fill="currentColor"
        d="M77.268 97.78a1 1 0 0 1-.066-1.659l41.948-30.653a15 15 0 0 1 17.7 0l41.933 30.643a1 1 0 0 1-.076 1.664l-18.156 10.894a1 1 0 0 1-1.081-.033l-30.345-20.863a2 2 0 0 0-2.255-.008l-30.835 20.873a1 1 0 0 1-1.085.024zM46.565 113.336c-10.625 8.21-10.113 24.409 1.01 31.932l71.918 48.64a16 16 0 0 0 17.987-.041l71.019-48.501c11.108-7.586 11.584-23.802.94-32.027a.79.79 0 0 0-.908-.042l-78.435 49.692a3 3 0 0 1-3.197.009l-79.433-49.707a.79.79 0 0 0-.9.045"
      />
    </svg>
  )
}

import { PixelIcon } from "@/src/icons/pixel"
import type { NavGroup } from "@/src/shells/app-shell"
import { AppShell } from "@/src/shells/app-shell"
import { componentMeta, statusConfig } from "./_component-meta"
import { CommandSearch } from "./command-search"

// Cache PixelIcon wrapper components so we don't create a new component type
// per render. Each unique name → one stable component reference.
const pixelCache = new Map<string, React.ComponentType<React.SVGProps<SVGSVGElement>>>()

function pixel(name: string): React.ComponentType<React.SVGProps<SVGSVGElement>> {
  const cached = pixelCache.get(name)
  if (cached) return cached
  const Component = function PixelIconWrapper(props: React.SVGProps<SVGSVGElement>) {
    return <PixelIcon name={name} {...(props as object)} />
  }
  Component.displayName = `PixelIcon(${name})`
  pixelCache.set(name, Component)
  return Component
}

function toTitle(slug: string) {
  return slug
    .replace(/^animation-/, "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

type SidebarGroupDef = {
  label: string
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  items: string[]
  basePath?: string
}

const componentGroups: SidebarGroupDef[] = [
  {
    label: "Actions",
    items: ["button", "button-group", "toggle", "toggle-group", "dropdown-menu", "context-menu"],
  },
  {
    label: "Forms",
    items: [
      "approval-actions",
      "input",
      "textarea",
      "select",
      "native-select",
      "checkbox",
      "radio-group",
      "switch",
      "slider",
      "number-input",
      "input-group",
      "input-otp",
      "combobox",
      "search-input",
      "filter-bar",
      "calendar",
      "date-picker",
      "file-upload",
      "inline-edit",
      "segmented-control",
      "label",
      "field",
      "form",
    ],
  },
  {
    label: "Layout",
    items: [
      "card",
      "item",
      "separator",
      "aspect-ratio",
      "resizable",
      "split-pane",
      "scroll-area",
      "collapsible",
      "accordion",
      "tabs",
      "grid",
      "direction",
    ],
  },
  {
    label: "Feedback",
    items: [
      "alert",
      "alert-dialog",
      "callout",
      "comment-thread",
      "dialog",
      "drawer",
      "sheet",
      "popover",
      "tooltip",
      "hover-card",
      "sonner",
      "progress",
      "skeleton",
      "spinner",
      "loading-overlay",
      "empty",
      "policy-banner",
      "deadline-countdown",
    ],
  },
  {
    label: "Navigation",
    items: [
      "breadcrumb",
      "pagination",
      "navigation-menu",
      "menubar",
      "command",
      "sidebar",
      "step-progress",
      "timeline",
      "audit-log",
    ],
  },
  {
    label: "Data Display",
    items: [
      "table",
      "data-table",
      "badge",
      "tag",
      "avatar",
      "carousel",
      "compliance-score",
      "stat",
      "risk-gauge",
      "status-indicator",
      "striped-bar",
      "waffle-chart",
      "entity-header",
      "logo-vasp",
      "description-list",
      "code-block",
      "copy-button",
      "kbd",
      "typography",
      "visually-hidden",
    ],
  },
  {
    label: "Animation",
    items: [
      "bg-shader",
      "blocky-shader",
      "ascii-shader",
      "subtle-shader",
      "fade-in",
      "marquee",
      "typewriter",
      "animated-counter",
      "streaming-cards",
    ],
  },
]

const complianceItems = ["case-card"]

const shellItems = ["app-shell"]

const blockItems = [
  "pricing-table",
  "stat-card",
  "feature-section",
  "hero-section",
  "login-form",
  "register-form",
  "rich-radio-list",
  "forgot-password-form",
  "select-org-form",
  "sequence-builder",
  "setting-row",
  "settings-card-grid",
  "magic-link-message",
  "page-cta",
  "article-card",
  "team-card",
]

const chartItems = ["area-chart", "bar-chart", "line-chart", "pie-chart", "radial-chart"]

const workflowItems = [
  "workflow-canvas",
  "workflow-node",
  "workflow-gate",
  "workflow-edge",
  "workflow-connection",
  "workflow-controls",
  "workflow-label",
  "workflow-panel",
  "workflow-toolbar",
  "workflow-minimap",
  "workflow-group",
  "workflow-handle",
]

const chatbotItems = [
  "shimmer",
  "suggestion",
  "reasoning",
  "sources",
  "attachments",
  "inline-citation",
  "message",
  "conversation",
  "prompt-input",
  "chain-of-thought",
  "confirmation",
  "context",
  "checkpoint",
  "plan",
  "task",
  "tool",
  "queue",
  "model-selector",
]

const animationItems = [
  "animation-ai-analysis",
  "animation-audit-trail",
  "animation-compliance-reports",
  "animation-custom-rules",
  "animation-jira-ticket",
  "animation-jurisdiction-detection",
  "animation-multi-protocol",
  "animation-pricing-preview",
  "animation-realtime-updates",
  "animation-rest-api",
  "animation-risk-scoring",
  "animation-sandbox",
  "animation-scheduled-reports",
  "animation-secure-messaging",
  "animation-slack-notification",
  "animation-sop-mapping",
  "animation-team-routing",
  "animation-teams-notification",
  "animation-vasp-identification",
  "animation-webhooks",
]

function buildBadge(slug: string) {
  const meta = componentMeta[slug]
  const status = meta?.status
  if (!status || status === "stable") return undefined
  return (
    <span
      className={`inline-flex items-center rounded-full px-1.5 py-0.5 font-medium text-[10px] leading-none ${statusConfig[status].color}`}
    >
      {statusConfig[status].label}
    </span>
  )
}

function buildNav(pathname: string): NavGroup[] {
  const buildComponentItems = (slugs: readonly string[]) =>
    slugs.map((slug) => ({
      label: toTitle(slug),
      icon: pixel("layout"),
      href: `/components/${slug}`,
      isActive: pathname === `/components/${slug}`,
      badge: buildBadge(slug),
    }))

  // Top-level "Components" group has an empty top items list — its content is
  // organised into sub-groups (Actions, Forms, Layout, etc.) so they render
  // with proper section headers in the sidebar panel.
  const componentSubGroups: NavGroup[] = [
    ...componentGroups.map((group) => ({
      title: group.label,
      items: buildComponentItems(group.items),
      defaultOpen: true,
    })),
    {
      title: "Compliance",
      items: buildComponentItems(complianceItems),
      defaultOpen: true,
    },
    {
      title: "Workflow",
      items: buildComponentItems(workflowItems),
      defaultOpen: true,
    },
    {
      title: "AI / Chatbot",
      items: buildComponentItems(chatbotItems),
      defaultOpen: true,
    },
  ]

  return [
    {
      id: "foundations",
      icon: Palette,
      title: "Foundations",
      items: [
        {
          label: "Getting Started",
          icon: BookOpen,
          href: "/getting-started",
          isActive: pathname === "/getting-started",
        },
        {
          label: "Typography",
          icon: Type,
          href: "/foundations/typography",
          isActive: pathname === "/foundations/typography",
        },
        {
          label: "Colors",
          icon: Palette,
          href: "/foundations/colors",
          isActive: pathname === "/foundations/colors",
        },
        {
          label: "Tokens",
          icon: Braces,
          href: "/foundations/tokens",
          isActive: pathname === "/foundations/tokens",
        },
        {
          label: "Motion",
          icon: Move,
          href: "/foundations/motion",
          isActive: pathname === "/foundations/motion",
        },
        {
          label: "Icons",
          icon: Shapes,
          href: "/foundations/icons",
          isActive: pathname === "/foundations/icons",
        },
        {
          label: "Theme Builder",
          icon: Paintbrush,
          href: "/foundations/theme-builder",
          isActive: pathname === "/foundations/theme-builder",
        },
        { label: "Claude Skills", icon: Bot, href: "/skills", isActive: pathname === "/skills" },
      ],
    },
    {
      id: "components",
      icon: Component,
      title: "Components",
      items: [],
      groups: componentSubGroups,
    },
    {
      id: "blocks",
      icon: LayoutGrid,
      title: "Blocks",
      items: blockItems.map((slug) => ({
        label: toTitle(slug),
        icon: pixel("layout"),
        href: `/blocks/${slug}`,
        isActive: pathname === `/blocks/${slug}`,
        badge: buildBadge(slug),
      })),
    },
    {
      id: "shells",
      icon: Layers,
      title: "Shells",
      items: shellItems.map((slug) => ({
        label: toTitle(slug),
        icon: pixel("layout"),
        href: `/shells/${slug}`,
        isActive: pathname === `/shells/${slug}`,
      })),
    },
    {
      id: "charts",
      icon: Sparkles,
      title: "Charts",
      items: chartItems.map((slug) => ({
        label: toTitle(slug),
        icon: pixel("chart-bar"),
        href: `/components/${slug}`,
        isActive: pathname === `/components/${slug}`,
      })),
    },
    {
      id: "tools",
      icon: Wrench,
      title: "Tools",
      items: animationItems.map((slug) => ({
        label: toTitle(slug),
        icon: pixel("zap"),
        href: `/animations/${slug}`,
        isActive: pathname === `/animations/${slug}`,
      })),
    },
  ]
}

function getBreadcrumbs(pathname: string) {
  if (pathname === "/") return [{ label: "Home" }]
  const segments = pathname.split("/").filter(Boolean)
  return segments.map((seg, i) => ({
    label: toTitle(seg),
    href: i < segments.length - 1 ? `/${segments.slice(0, i + 1).join("/")}` : undefined,
  }))
}

function DarkModeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"))
  }, [])

  const toggle = useCallback(() => {
    const next = !dark
    document.documentElement.classList.toggle("dark", next)
    setDark(next)
  }, [dark])

  return (
    <Button variant="ghost" size="icon" onClick={toggle}>
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  )
}

function filterNav(nav: NavGroup[], query: string): NavGroup[] {
  if (!query) return nav
  const q = query.toLowerCase()
  return nav
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => item.label.toLowerCase().includes(q)),
    }))
    .filter((group) => group.items.length > 0)
}

export function PreviewShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [search, setSearch] = useState("")

  const nav = useMemo(() => filterNav(buildNav(pathname), search), [pathname, search])

  return (
    <AppShell
      logo={{
        icon: <CogenticLogo className="size-4" />,
        title: "Cogentic DS",
        subtitle: "Component Showcase",
      }}
      nav={nav}
      breadcrumbs={getBreadcrumbs(pathname)}
      headerActions={
        <>
          <CommandSearch />
          <DarkModeToggle />
        </>
      }
      sidebarHeaderExtra={
        <div className="relative px-2">
          <Search className="absolute top-1/2 left-4 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Filter..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 pl-8 text-sm"
          />
        </div>
      }
      linkComponent={Link}
      iconRail
    >
      {children}
    </AppShell>
  )
}
