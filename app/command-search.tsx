"use client"

import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { componentMeta, statusConfig } from "./_component-meta"

function toTitle(slug: string) {
  return slug
    .replace(/^animation-/, "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

type SearchItem = {
  slug: string
  label: string
  href: string
  group: string
  description?: string
  status?: string
}

// ----------------------------------------------------------------------------
// Source of truth — keep this in sync with preview-shell.tsx
// Slugs here generate /components/<slug>, /compliance/<slug>, etc.
// ----------------------------------------------------------------------------

const componentGroups: { label: string; items: string[] }[] = [
  {
    label: "Actions",
    items: ["button", "button-group", "toggle", "toggle-group", "dropdown-menu", "context-menu"],
  },
  {
    label: "Forms",
    items: [
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

const workflowItems = [
  "workflow-canvas",
  "workflow-node",
  "workflow-node-card",
  "workflow-gate",
  "workflow-group",
  "workflow-handle",
  "workflow-edge",
  "workflow-connection",
  "workflow-label",
  "workflow-controls",
  "workflow-minimap",
  "workflow-panel",
  "workflow-toolbar",
  "workflow-block-palette",
  "workflow-inspector",
  "entity-graph",
  "workflow-slack-message",
]

const chatbotItems = [
  // Conversation
  "message",
  "conversation",
  "prompt-input",
  "suggestion",
  // Streaming
  "markdown",
  "shimmer",
  "reasoning",
  "chain-of-thought",
  "task",
  "plan",
  "agent-progress",
  // Rich content
  "sources",
  "attachments",
  "inline-citation",
  "tool",
  "context",
  // Controls
  "confirmation",
  "checkpoint",
  "queue",
  "model-selector",
]

const blockItems = [
  // Marketing
  "hero-section",
  "feature-section",
  "pricing-table",
  "page-cta",
  "article-card",
  "team-card",
  // Dashboard
  "stat-card",
  "usage-meter",
  "notification-center",
  // Page chrome
  "page-header",
  "command-palette",
  // Workflow
  "kanban",
  "multi-step-form",
  // Admin
  "team-table",
  "api-key-manager",
  // Marketing/Other
  "changelog",
  "invoice",
  // Auth
  "login-form",
  "register-form",
  "forgot-password-form",
  "magic-link-message",
  "select-org-form",
  // Settings
  "setting-row",
  "settings-card-grid",
  "rich-radio-list",
  "sequence-builder",
  // Onboarding
  "product-tour",
]

const layoutItems = [
  "app-shell",
  "app-shell-2",
  "settings-layout",
  "transaction-detail-page",
  "dashboard-page",
]

const complianceItems = [
  "case-card",
  "transaction-card",
  "transaction-row",
  "transaction-detail",
  "flag-callout",
  "risk-score-hero",
  "flow-diagram",
  "event-timeline",
  "counterparty-intel",
  "reviewer-notes",
  "travel-rule-card",
  "transaction-flow-card",
  "risk-exposure-card",
  "awaiting-review-card",
  "recent-transactions-card",
  "alerts-card",
  "compliance-status-badge",
  "address-display",
  "network-badge",
  "risk-score-inline",
  "travel-rule-status",
  "transaction-filters",
  "compliance-score",
  "review-form",
  "audit-note",
  "report-export",
  "sanctions-match",
  "counterparty-card",
  "jurisdiction-card",
  "compliance-timeline",
  "alert-banner",
]

const animationItems = [
  "animation-ai-analysis",
  "animation-risk-scoring",
  "animation-jurisdiction-detection",
  "animation-vasp-identification",
  "animation-sop-mapping",
  "animation-audit-trail",
  "animation-custom-rules",
  "animation-compliance-reports",
  "animation-scheduled-reports",
  "animation-team-routing",
  "animation-sandbox",
  "animation-jira-ticket",
  "animation-slack-notification",
  "animation-teams-notification",
  "animation-secure-messaging",
  "animation-multi-protocol",
  "animation-webhooks",
  "animation-rest-api",
  "animation-realtime-updates",
  "animation-pricing-preview",
]

function buildSearchItems(): SearchItem[] {
  const items: SearchItem[] = []

  for (const group of componentGroups) {
    for (const slug of group.items) {
      const meta = componentMeta[slug]
      items.push({
        slug,
        label: toTitle(slug),
        href: `/components/${slug}`,
        group: group.label,
        description: meta?.description,
        status: meta?.status,
      })
    }
  }

  for (const slug of chartItems) {
    const meta = componentMeta[slug]
    items.push({
      slug,
      label: toTitle(slug),
      href: `/components/${slug}`,
      group: "Charts",
      description: meta?.description,
      status: meta?.status,
    })
  }

  for (const slug of workflowItems) {
    const meta = componentMeta[slug]
    items.push({
      slug,
      label: toTitle(slug),
      href: `/components/${slug}`,
      group: "Workflow",
      description: meta?.description,
      status: meta?.status,
    })
  }

  for (const slug of chatbotItems) {
    const meta = componentMeta[slug]
    items.push({
      slug,
      label: toTitle(slug),
      href: `/components/${slug}`,
      group: "AI / Chatbot",
      description: meta?.description,
      status: meta?.status,
    })
  }

  for (const slug of blockItems) {
    const meta = componentMeta[slug]
    items.push({
      slug,
      label: toTitle(slug),
      href: `/blocks/${slug}`,
      group: "Blocks",
      description: meta?.description,
      status: meta?.status,
    })
  }

  for (const slug of layoutItems) {
    const meta = componentMeta[slug]
    items.push({
      slug,
      label: toTitle(slug),
      href: `/layouts/${slug}`,
      group: "Layouts",
      description: meta?.description,
      status: meta?.status,
    })
  }

  for (const slug of complianceItems) {
    const meta = componentMeta[slug]
    items.push({
      slug,
      label: toTitle(slug),
      href: `/compliance/${slug}`,
      group: "Compliance",
      description: meta?.description,
      status: meta?.status,
    })
  }

  for (const slug of animationItems) {
    const meta = componentMeta[slug]
    items.push({
      slug,
      label: toTitle(slug),
      href: `/animations/${slug}`,
      group: "Animations",
      description: meta?.description,
      status: meta?.status,
    })
  }

  return items
}

export function CommandSearch() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const items = useMemo(() => buildSearchItems(), [])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const onSelect = useCallback(
    (href: string) => {
      setOpen(false)
      router.push(href)
    },
    [router],
  )

  const grouped = useMemo(() => {
    const map = new Map<string, SearchItem[]>()
    for (const item of items) {
      const list = map.get(item.group) ?? []
      list.push(item)
      map.set(item.group, list)
    }
    return Array.from(map.entries())
  }, [items])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-8 items-center gap-2 rounded-md border border-input bg-background px-2.5 text-muted-foreground text-xs hover:bg-muted"
      >
        <span className="hidden sm:inline">Search</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">
          ⌘K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command shouldFilter>
          <CommandInput placeholder="Search components, blocks, layouts…" />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            {grouped.map(([group, list]) => (
              <CommandGroup key={group} heading={group}>
                {list.map((item) => (
                  <CommandItem
                    key={`${item.group}/${item.slug}`}
                    value={`${item.label} ${item.slug} ${item.description ?? ""}`}
                    onSelect={() => onSelect(item.href)}
                  >
                    <div className="flex flex-1 items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm">{item.label}</span>
                        {item.description && (
                          <span className="line-clamp-1 text-muted-foreground text-xs">
                            {item.description}
                          </span>
                        )}
                      </div>
                      {item.status && item.status !== "stable" && (
                        <span
                          className={`inline-flex items-center rounded-full px-1.5 py-0.5 font-medium text-[10px] leading-none ${statusConfig[item.status as keyof typeof statusConfig]?.color ?? ""}`}
                        >
                          {statusConfig[item.status as keyof typeof statusConfig]?.label ??
                            item.status}
                        </span>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
