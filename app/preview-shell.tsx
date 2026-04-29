"use client"

import {
  BarChart3,
  BookOpen,
  Bot,
  Braces,
  Component,
  LayoutDashboard,
  LayoutGrid,
  MessageSquare,
  Moon,
  Move,
  Paintbrush,
  Palette,
  Play,
  Search,
  Shapes,
  Shield,
  Sparkles,
  Sun,
  Type,
  Workflow,
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

import type { NavGroup } from "@/src/shells/app-shell"
import { AppShell } from "@/src/shells/app-shell"
import { componentMeta, statusConfig } from "./_component-meta"
import { CommandSearch } from "./command-search"

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
    ],
  },
  {
    label: "Feedback",
    items: [
      "alert",
      "alert-dialog",
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
      "step",
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
      "avatar",
      "carousel",
      "stat",
      "risk-gauge",
      "status-indicator",
      "striped-bar",
      "waffle-chart",
      "header",
      "logo-vasp",
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
  {
    label: "DS refresh",
    items: ["ring-card", "key-value-list", "kpi-card", "sparkline"],
  },
]

const complianceItems = ["case-card"]

const blockGroups: { label: string; items: string[] }[] = [
  {
    label: "Marketing",
    items: [
      "hero-section",
      "feature-section",
      "pricing-table",
      "page-cta",
      "article-card",
      "team-card",
    ],
  },
  {
    label: "Dashboard",
    items: ["stat-card", "usage-meter", "notification-center"],
  },
  {
    label: "Page chrome",
    items: ["page-header", "command-palette"],
  },
  {
    label: "Workflow",
    items: ["kanban", "multi-step-form"],
  },
  {
    label: "Admin",
    items: ["team-table", "api-key-manager"],
  },
  {
    label: "Marketing/Other",
    items: ["changelog", "invoice"],
  },
  {
    label: "Auth",
    items: [
      "login-form",
      "register-form",
      "forgot-password-form",
      "magic-link-message",
      "select-org-form",
    ],
  },
  {
    label: "Settings",
    items: ["setting-row", "settings-card-grid", "rich-radio-list", "sequence-builder"],
  },
  {
    label: "Onboarding",
    items: ["product-tour"],
  },
]

const chartItems = [
  "area-chart",
  "bar-chart",
  "line-chart",
  "pie-chart",
  "radial-chart",
  "scatter-chart",
  "composed-chart",
  "funnel-chart",
  "heatmap-chart",
]

const workflowGroups: { label: string; items: string[] }[] = [
  {
    label: "Canvas & core",
    items: [
      "workflow-canvas",
      "workflow-node",
      "workflow-node-card",
      "workflow-gate",
      "workflow-group",
      "workflow-handle",
    ],
  },
  {
    label: "Connections",
    items: ["workflow-edge", "workflow-connection", "workflow-label"],
  },
  {
    label: "Overlays",
    items: ["workflow-controls", "workflow-minimap", "workflow-panel", "workflow-toolbar"],
  },
  {
    label: "Editor",
    items: ["workflow-block-palette", "workflow-inspector"],
  },
  {
    label: "Visualisation",
    items: ["entity-graph"],
  },
  {
    label: "Previews",
    items: ["workflow-slack-message"],
  },
]

const chatbotGroups: { label: string; items: string[] }[] = [
  {
    label: "Conversation",
    items: ["message", "conversation", "prompt-input", "suggestion"],
  },
  {
    label: "Streaming",
    items: [
      "markdown",
      "shimmer",
      "reasoning",
      "chain-of-thought",
      "task",
      "plan",
      "agent-progress",
    ],
  },
  {
    label: "Rich content",
    items: ["sources", "attachments", "inline-citation", "tool", "context"],
  },
  {
    label: "Controls",
    items: ["confirmation", "checkpoint", "queue", "model-selector"],
  },
]

const animationGroups: { label: string; items: string[] }[] = [
  {
    label: "AI & analysis",
    items: [
      "animation-ai-analysis",
      "animation-risk-scoring",
      "animation-jurisdiction-detection",
      "animation-vasp-identification",
      "animation-sop-mapping",
    ],
  },
  {
    label: "Workflow & compliance",
    items: [
      "animation-audit-trail",
      "animation-custom-rules",
      "animation-compliance-reports",
      "animation-scheduled-reports",
      "animation-team-routing",
      "animation-sandbox",
    ],
  },
  {
    label: "Integrations & messaging",
    items: [
      "animation-jira-ticket",
      "animation-slack-notification",
      "animation-teams-notification",
      "animation-secure-messaging",
      "animation-multi-protocol",
      "animation-webhooks",
      "animation-rest-api",
    ],
  },
  {
    label: "Product surfaces",
    items: ["animation-realtime-updates", "animation-pricing-preview"],
  },
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
      icon: Component,
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
      items: [],
      groups: blockGroups.map((group) => ({
        title: group.label,
        items: group.items.map((slug) => ({
          label: toTitle(slug),
          icon: Component,
          href: `/blocks/${slug}`,
          isActive: pathname === `/blocks/${slug}`,
          badge: buildBadge(slug),
        })),
        defaultOpen: true,
      })),
    },
    {
      id: "layouts",
      icon: LayoutDashboard,
      title: "Layouts",
      items: [
        "app-shell",
        "app-shell-2",
        "settings-layout",
        "transaction-detail-page",
        "dashboard-page",
      ].map((slug) => ({
        label: toTitle(slug),
        icon: LayoutDashboard,
        href: `/layouts/${slug}`,
        isActive: pathname === `/layouts/${slug}`,
      })),
    },
    {
      id: "charts",
      icon: BarChart3,
      title: "Charts",
      items: chartItems.map((slug) => ({
        label: toTitle(slug),
        icon: BarChart3,
        href: `/components/${slug}`,
        isActive: pathname === `/components/${slug}`,
      })),
    },
    {
      id: "workflow",
      icon: Workflow,
      title: "Workflow",
      items: [],
      groups: workflowGroups.map((group) => ({
        title: group.label,
        items: buildComponentItems(group.items),
        defaultOpen: true,
      })),
    },
    {
      id: "chatbot",
      icon: MessageSquare,
      title: "AI / Chatbot",
      items: [],
      groups: chatbotGroups.map((group) => ({
        title: group.label,
        items: buildComponentItems(group.items),
        defaultOpen: true,
      })),
    },
    {
      id: "compliance",
      icon: Shield,
      title: "Compliance",
      items: [],
      groups: [
        {
          title: "Transaction",
          items: ["transaction-card", "transaction-row", "transaction-detail"].map((slug) => ({
            label: toTitle(slug),
            icon: Component,
            href: `/compliance/${slug}`,
            isActive: pathname === `/compliance/${slug}`,
          })),
          defaultOpen: true,
        },
        {
          title: "Detail blocks",
          items: [
            "flag-callout",
            "risk-score-hero",
            "flow-diagram",
            "event-timeline",
            "counterparty-intel",
            "reviewer-notes",
            "travel-rule-card",
          ].map((slug) => ({
            label: toTitle(slug),
            icon: Component,
            href: `/compliance/${slug}`,
            isActive: pathname === `/compliance/${slug}`,
          })),
          defaultOpen: true,
        },
        {
          title: "Dashboard cards",
          items: [
            "transaction-flow-card",
            "risk-exposure-card",
            "awaiting-review-card",
            "recent-transactions-card",
            "alerts-card",
          ].map((slug) => ({
            label: toTitle(slug),
            icon: Component,
            href: `/compliance/${slug}`,
            isActive: pathname === `/compliance/${slug}`,
          })),
          defaultOpen: true,
        },
        {
          title: "Foundations",
          items: [
            "compliance-status-badge",
            "address-display",
            "network-badge",
            "risk-score-inline",
            "travel-rule-status",
          ].map((slug) => ({
            label: toTitle(slug),
            icon: Component,
            href: `/compliance/${slug}`,
            isActive: pathname === `/compliance/${slug}`,
          })),
          defaultOpen: true,
        },
        {
          title: "Filters",
          items: ["transaction-filters"].map((slug) => ({
            label: toTitle(slug),
            icon: Component,
            href: `/compliance/${slug}`,
            isActive: pathname === `/compliance/${slug}`,
          })),
          defaultOpen: true,
        },
        {
          title: "Case & scoring",
          items: ["case-card", "compliance-score"].map((slug) => ({
            label: toTitle(slug),
            icon: Component,
            href: `/compliance/${slug}`,
            isActive: pathname === `/compliance/${slug}`,
          })),
          defaultOpen: true,
        },
        {
          title: "Review & reporting",
          items: ["review-form", "audit-note", "report-export"].map((slug) => ({
            label: toTitle(slug),
            icon: Component,
            href: `/compliance/${slug}`,
            isActive: pathname === `/compliance/${slug}`,
          })),
          defaultOpen: true,
        },
        {
          title: "Supporting",
          items: [
            "sanctions-match",
            "counterparty-card",
            "jurisdiction-card",
            "compliance-timeline",
            "alert-banner",
          ].map((slug) => ({
            label: toTitle(slug),
            icon: Component,
            href: `/compliance/${slug}`,
            isActive: pathname === `/compliance/${slug}`,
          })),
          defaultOpen: true,
        },
      ],
    },
    {
      id: "animations",
      icon: Play,
      title: "Animations",
      items: [],
      groups: animationGroups.map((group) => ({
        title: group.label,
        items: group.items.map((slug) => ({
          label: toTitle(slug),
          icon: Play,
          href: `/animations/${slug}`,
          isActive: pathname === `/animations/${slug}`,
        })),
        defaultOpen: true,
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
  const filter = (groups: NavGroup[]): NavGroup[] =>
    groups
      .map((group) => {
        const filteredItems = group.items.filter((item) => item.label.toLowerCase().includes(q))
        const filteredGroups = group.groups ? filter(group.groups) : undefined
        return { ...group, items: filteredItems, groups: filteredGroups }
      })
      .filter((group) => group.items.length > 0 || (group.groups && group.groups.length > 0))
  return filter(nav)
}

export function PreviewShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [search, setSearch] = useState("")

  const nav = useMemo(() => filterNav(buildNav(pathname), search), [pathname, search])

  // Live-preview routes skip the dev PreviewShell so nested AppShells
  // (which use fixed-positioned sidebars) don't cover the outer nav.
  if (pathname?.startsWith("/preview-live/")) {
    return <>{children}</>
  }

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
