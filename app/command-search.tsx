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
import { animationPreviews } from "./animations/[slug]/previews"
import { blockPreviews } from "./blocks/[slug]/previews"
import { compliancePreviews } from "./compliance/[slug]/previews"
import { previews as componentPreviews } from "./components/[slug]/previews"
import { layoutPreviews } from "./layouts/[slug]/previews"
import { shellPreviews } from "./shells/[slug]/previews"

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
// Source of truth — every search entry is derived from the actual preview
// registries below. New previews are auto-discoverable; no manual sync.
// ----------------------------------------------------------------------------

const REGISTRIES: Array<{
  registry: Record<string, unknown>
  group: string
  hrefPrefix: string
}> = [
  { registry: componentPreviews, group: "Components", hrefPrefix: "/components" },
  { registry: blockPreviews, group: "Blocks", hrefPrefix: "/blocks" },
  { registry: compliancePreviews, group: "Compliance", hrefPrefix: "/compliance" },
  { registry: layoutPreviews, group: "Layouts", hrefPrefix: "/layouts" },
  { registry: shellPreviews, group: "Shells", hrefPrefix: "/shells" },
  { registry: animationPreviews, group: "Animations", hrefPrefix: "/animations" },
]

// Components that should appear under a more specific group label in search.
// (Their preview lives at /components/<slug> so we keep that href.)
const COMPONENT_SUBGROUPS: Record<string, string> = {
  // Charts
  "area-chart": "Charts",
  "bar-chart": "Charts",
  "line-chart": "Charts",
  "pie-chart": "Charts",
  "radial-chart": "Charts",
  "scatter-chart": "Charts",
  "composed-chart": "Charts",
  "funnel-chart": "Charts",
  "heatmap-chart": "Charts",
  // Workflow
  "workflow-canvas": "Workflow",
  "workflow-node": "Workflow",
  "workflow-node-card": "Workflow",
  "workflow-gate": "Workflow",
  "workflow-group": "Workflow",
  "workflow-handle": "Workflow",
  "workflow-edge": "Workflow",
  "workflow-connection": "Workflow",
  "workflow-label": "Workflow",
  "workflow-controls": "Workflow",
  "workflow-minimap": "Workflow",
  "workflow-panel": "Workflow",
  "workflow-toolbar": "Workflow",
  "workflow-block-palette": "Workflow",
  "workflow-inspector": "Workflow",
  "entity-graph": "Workflow",
  "workflow-slack-message": "Workflow",
  // AI / Chatbot
  message: "AI / Chatbot",
  conversation: "AI / Chatbot",
  "prompt-input": "AI / Chatbot",
  suggestion: "AI / Chatbot",
  markdown: "AI / Chatbot",
  shimmer: "AI / Chatbot",
  reasoning: "AI / Chatbot",
  "chain-of-thought": "AI / Chatbot",
  task: "AI / Chatbot",
  plan: "AI / Chatbot",
  "agent-progress": "AI / Chatbot",
  sources: "AI / Chatbot",
  attachments: "AI / Chatbot",
  "inline-citation": "AI / Chatbot",
  tool: "AI / Chatbot",
  context: "AI / Chatbot",
  confirmation: "AI / Chatbot",
  checkpoint: "AI / Chatbot",
  queue: "AI / Chatbot",
  "model-selector": "AI / Chatbot",
}

function buildSearchItems(): SearchItem[] {
  const items: SearchItem[] = []
  const seen = new Set<string>()

  for (const { registry, group, hrefPrefix } of REGISTRIES) {
    for (const slug of Object.keys(registry)) {
      const groupLabel =
        group === "Components" ? (COMPONENT_SUBGROUPS[slug] ?? "Components") : group
      const meta = componentMeta[slug]
      const key = `${groupLabel}/${slug}`
      if (seen.has(key)) continue
      seen.add(key)
      items.push({
        slug,
        label: toTitle(slug),
        href: `${hrefPrefix}/${slug}`,
        group: groupLabel,
        description: meta?.description,
        status: meta?.status,
      })
    }
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

  // Group ordering — Components / sub-groups first, then everything else
  const GROUP_ORDER = [
    "Components",
    "Charts",
    "Workflow",
    "AI / Chatbot",
    "Blocks",
    "Layouts",
    "Shells",
    "Compliance",
    "Animations",
  ]

  const grouped = useMemo(() => {
    const map = new Map<string, SearchItem[]>()
    for (const item of items) {
      const list = map.get(item.group) ?? []
      list.push(item)
      map.set(item.group, list)
    }
    // Sort each group's items alphabetically by label
    for (const list of map.values()) list.sort((a, b) => a.label.localeCompare(b.label))
    // Return in canonical order, then any unknown groups
    const ordered: Array<[string, SearchItem[]]> = []
    for (const g of GROUP_ORDER) {
      const list = map.get(g)
      if (list) ordered.push([g, list])
    }
    for (const [g, list] of map.entries()) {
      if (!GROUP_ORDER.includes(g)) ordered.push([g, list])
    }
    return ordered
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
