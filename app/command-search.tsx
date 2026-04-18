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

const componentGroups = [
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
      "input-group",
      "input-otp",
      "combobox",
      "calendar",
      "date-picker",
      "label",
      "field",
      "form",
    ],
  },
  {
    label: "Layout",
    items: [
      "card",
      "separator",
      "aspect-ratio",
      "resizable",
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
      "empty",
    ],
  },
  {
    label: "Navigation",
    items: ["breadcrumb", "pagination", "navigation-menu", "menubar", "command", "sidebar"],
  },
  {
    label: "Data Display",
    items: ["table", "data-table", "badge", "avatar", "carousel", "chart", "kbd", "typography"],
  },
  {
    label: "Animation",
    items: ["bg-shader", "fade-in", "marquee", "typewriter", "animated-counter", "streaming-cards"],
  },
]

const foundationPages: SearchItem[] = [
  {
    slug: "getting-started",
    label: "Getting Started",
    href: "/getting-started",
    group: "Foundations",
    description: "Installation, setup, and usage guide.",
  },
  {
    slug: "typography",
    label: "Typography",
    href: "/foundations/typography",
    group: "Foundations",
    description: "Font families, sizes, and text styles.",
  },
  {
    slug: "colors",
    label: "Colors",
    href: "/foundations/colors",
    group: "Foundations",
    description: "OKLch color palette and semantic tokens.",
  },
  {
    slug: "tokens",
    label: "Tokens",
    href: "/foundations/tokens",
    group: "Foundations",
    description: "Design token reference for spacing, radii, and more.",
  },
  {
    slug: "motion",
    label: "Motion",
    href: "/foundations/motion",
    group: "Foundations",
    description: "Animation constants, easing curves, and transitions.",
  },
  {
    slug: "theme-builder",
    label: "Theme Builder",
    href: "/foundations/theme-builder",
    group: "Foundations",
    description: "Interactive theme customization tool.",
  },
]

const blockPages: SearchItem[] = [
  { slug: "pricing-table", label: "Pricing Table", href: "/blocks/pricing-table", group: "Blocks" },
  { slug: "page-cta", label: "Page Cta", href: "/blocks/page-cta", group: "Blocks" },
  { slug: "article-card", label: "Article Card", href: "/blocks/article-card", group: "Blocks" },
  { slug: "team-card", label: "Team Card", href: "/blocks/team-card", group: "Blocks" },
]

/**
 * Infer the route prefix for a slug by looking at the importStatement in
 * its metadata (e.g. `@cogentic-co/ds/blocks/foo` → `/blocks/foo`).
 * Falls back to `/components/{slug}` for legacy entries.
 */
function inferRoute(slug: string, importStatement?: string): { href: string; group: string } {
  if (importStatement) {
    const match = importStatement.match(
      /@cogentic-co\/ds\/(blocks|compliance|workflow|charts|shells)\//,
    )
    if (match) {
      const segment = match[1]
      const groupLabels: Record<string, string> = {
        blocks: "Blocks",
        compliance: "Compliance",
        workflow: "Workflow",
        charts: "Charts",
        shells: "Shells",
      }
      return { href: `/${segment}/${slug}`, group: groupLabels[segment] }
    }
  }
  return { href: `/components/${slug}`, group: "Components" }
}

function buildSearchItems(): SearchItem[] {
  const items: SearchItem[] = []
  const seen = new Set<string>()

  for (const slug of Object.keys(componentMeta)) {
    if (seen.has(slug)) continue
    seen.add(slug)
    const meta = componentMeta[slug]
    const { href, group } = inferRoute(slug, meta?.importStatement)
    items.push({
      slug,
      label: toTitle(slug),
      href,
      group,
      description: meta?.description,
      status: meta?.status !== "stable" ? meta?.status : undefined,
    })
  }

  // Components without meta (most legacy primitives) — add via the original groups
  for (const group of componentGroups) {
    for (const slug of group.items) {
      if (seen.has(slug)) continue
      seen.add(slug)
      items.push({
        slug,
        label: toTitle(slug),
        href: `/components/${slug}`,
        group: "Components",
      })
    }
  }

  items.push(...foundationPages)
  items.push(...blockPages.filter((p) => !seen.has(p.slug)))

  return items
}

export function CommandSearch() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const searchItems = useMemo(() => buildSearchItems(), [])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  const handleSelect = useCallback(
    (href: string) => {
      setOpen(false)
      router.push(href)
    },
    [router],
  )

  const grouped = useMemo(() => {
    const groups: Record<string, SearchItem[]> = {}
    for (const item of searchItems) {
      if (!groups[item.group]) groups[item.group] = []
      groups[item.group].push(item)
    }
    return groups
  }, [searchItems])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-8 items-center gap-2 rounded-md border border-input px-3 text-muted-foreground text-sm transition-colors hover:bg-muted hover:text-foreground"
      >
        <span>Search...</span>
        <kbd className="pointer-events-none inline-flex h-5 items-center gap-0.5 rounded border bg-muted px-1.5 font-medium font-mono text-[10px] text-muted-foreground">
          <span className="text-xs">&#8984;</span>K
        </kbd>
      </button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search"
        description="Search components, foundations, and blocks."
      >
        <Command>
          <CommandInput placeholder="Search components, foundations, blocks..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {Object.entries(grouped).map(([group, items]) => (
              <CommandGroup key={group} heading={group}>
                {items.map((item) => (
                  <CommandItem
                    key={item.href}
                    value={`${item.label} ${item.description ?? ""}`}
                    onSelect={() => handleSelect(item.href)}
                  >
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span>{item.label}</span>
                        {item.status && (
                          <span
                            className={`inline-flex items-center rounded-full px-1.5 py-0.5 font-medium text-[10px] leading-none ${statusConfig[item.status as keyof typeof statusConfig].color}`}
                          >
                            {statusConfig[item.status as keyof typeof statusConfig].label}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <span className="line-clamp-1 text-muted-foreground text-xs">
                          {item.description}
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
