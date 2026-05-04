import type { ComponentMeta } from "../index"

export const v013BlocksMeta: Record<string, ComponentMeta> = {
  "command-palette": {
    status: "new",
    description:
      "Cmd+K command palette composing CommandDialog with grouped actions, icons, shortcuts, and a built-in keyboard binding.",
    since: "0.13.0",
    importStatement: `import { CommandPalette } from "@cogentic-co/ds/blocks/command-palette"`,
    dos: [
      "Group actions by category (Navigation, Actions, Recent)",
      "Include keyboard shortcuts for power users",
      "Use enableShortcut={true} (default) to bind ⌘K globally",
    ],
    donts: [
      "Don't show more than ~30 actions — fuzzy search degrades",
      "Don't nest dialogs/popovers inside command items",
    ],
    codeExample: `const [open, setOpen] = useState(false)
<CommandPalette
  open={open}
  onOpenChange={setOpen}
  groups={[
    { heading: "Navigation", actions: [{ id: "home", label: "Dashboard", shortcut: "G H", onSelect: () => router.push("/") }] },
  ]}
/>`,
  },
  "notification-center": {
    status: "new",
    description:
      "Bell icon trigger + popover with unread/all tabs, severity dots, mark-all-read action, and timestamp formatting via timeAgo. Composes Popover + ScrollArea + Tabs.",
    since: "0.13.0",
    importStatement: `import { NotificationCenter } from "@cogentic-co/ds/blocks/notification-center"`,
    dos: [
      "Use in the app header for global compliance alerts",
      "Pass severity (info/warning/critical) for color-coded dots",
      "Wire onMarkAllRead to bulk-update server state",
    ],
    donts: [
      "Don't show more than ~50 notifications without pagination",
      "Don't use for transient toasts — use Sonner for those",
    ],
    codeExample: `<NotificationCenter
  notifications={notifications}
  onMarkAllRead={() => api.markAllRead()}
  onNotificationClick={(id) => api.markRead(id)}
/>`,
  },
  kanban: {
    status: "new",
    description:
      "Drag-and-drop kanban board built on @dnd-kit. Supports multiple columns with limits, custom card render-prop, and column accent colors.",
    since: "0.13.0",
    importStatement: `import { Kanban } from "@cogentic-co/ds/blocks/kanban"`,
    dos: [
      "Use for case triage (new → in review → resolved)",
      "Set column limits to enforce WIP constraints",
      "Pass renderCard for custom card content",
    ],
    donts: [
      "Don't use for sortable lists — use SequenceBuilder instead",
      "Don't add more than ~5 columns; the board becomes hard to scan",
    ],
    codeExample: `<Kanban
  columns={[{ id: "new", title: "New" }, { id: "review", title: "In review", limit: 5 }, { id: "resolved", title: "Resolved" }]}
  cards={cards}
  onCardsChange={setCards}
/>`,
  },
  "team-table": {
    status: "new",
    description:
      "Team members table with avatar, role dropdown, status badge, last-active timestamp, and per-row actions menu. Composes Table + Avatar + Select + DropdownMenu.",
    since: "0.13.0",
    importStatement: `import { TeamTable } from "@cogentic-co/ds/blocks/team-table"`,
    dos: [
      "Use in workspace settings for member management",
      "Provide roles array to enable inline role changes",
      "Wire onResendInvite for invited members",
    ],
    donts: ["Don't use for non-team data — use DataTable for generic rows"],
    codeExample: `<TeamTable
  members={members}
  roles={[{ value: "admin", label: "Admin" }, { value: "viewer", label: "Viewer" }]}
  onRoleChange={(id, role) => api.setRole(id, role)}
  onRemove={(id) => api.remove(id)}
/>`,
  },
  "api-key-manager": {
    status: "new",
    description:
      "API key list with masked previews, copy-to-clipboard, scope display, last-used timestamp, and rotate/revoke actions.",
    since: "0.13.0",
    importStatement: `import { ApiKeyManager } from "@cogentic-co/ds/blocks/api-key-manager"`,
    dos: [
      "Only pass the masked preview (e.g. 'sk_live_...ab42'); never store the full key client-side after creation",
      "Show scope summary so users know what each key can do",
    ],
    donts: ["Don't expose full key value after the create-once modal"],
    codeExample: `<ApiKeyManager
  keys={keys}
  onCreate={() => openCreateModal()}
  onRotate={(id) => api.rotate(id)}
  onRevoke={(id) => api.revoke(id)}
/>`,
  },
  "usage-meter": {
    status: "new",
    description:
      "Usage / quota progress card with auto-coloring (focal → amber → red) at configurable thresholds, optional CTA when near limit, and unit display.",
    since: "0.13.0",
    importStatement: `import { UsageMeter } from "@cogentic-co/ds/blocks/usage-meter"`,
    dos: [
      "Use for billing limits, rate quotas, seat counts",
      "Provide cta when near limit for clear upgrade path",
    ],
    donts: ["Don't use for KPIs — use StatCard instead"],
    codeExample: `<UsageMeter
  label="API requests"
  used={2_400_000}
  limit={5_000_000}
  description="Resets in 12 days"
  cta={<Button size="xs">Upgrade</Button>}
/>`,
  },
  changelog: {
    status: "new",
    description:
      "Versioned release entries with date, type tags (feature/fix/improvement/breaking/security), and rich content body.",
    since: "0.13.0",
    importStatement: `import { Changelog } from "@cogentic-co/ds/blocks/changelog"`,
    dos: [
      "Use semver-formatted versions (v1.2.3) so they sort correctly",
      "Tag entries for at-a-glance scanning",
    ],
    donts: ["Don't put every commit in the changelog — group meaningful changes per release"],
    codeExample: `<Changelog entries={[
  { version: "v1.2.0", date: "2026-04-09", tags: ["feature"], children: <p>Added compliance module.</p> },
]} />`,
  },
  "multi-step-form": {
    status: "new",
    description:
      "Multi-step form wrapper with StepProgress at the top, per-step validation hook, and Back/Next/Submit controls. Consumers provide step content as ReactNode.",
    since: "0.13.0",
    importStatement: `import { MultiStepForm } from "@cogentic-co/ds/blocks/multi-step-form"`,
    dos: [
      "Use for onboarding flows, multi-page forms, wizards",
      "Pass step.validate to block advancement on invalid input",
    ],
    donts: ["Don't use for >5 steps — split into separate pages"],
    codeExample: `<MultiStepForm
  steps={[
    { id: "1", title: "Account", content: <Input placeholder="Name" /> },
    { id: "2", title: "Verify", content: <Input placeholder="VASP ID" /> },
  ]}
  onSubmit={() => save()}
/>`,
  },
  invoice: {
    status: "new",
    description:
      "Print-ready invoice / receipt template with from/to parties, line items table, tax line, totals, and notes section.",
    since: "0.13.0",
    importStatement: `import { Invoice } from "@cogentic-co/ds/blocks/invoice"`,
    dos: [
      "Use for billing receipts, tax invoices, payment summaries",
      "Pass currency for clear total denomination",
    ],
    donts: ["Don't use for arbitrary data tables — use Table"],
    codeExample: `<Invoice
  number="INV-2026-0042"
  issuedAt="9 April 2026"
  from={{ name: "Cogentic", lines: ["1 Compliance Way"] }}
  to={{ name: "Acme Corp", lines: ["100 Main Street"] }}
  items={[{ id: "1", description: "Pro plan", quantity: 1, unitPrice: "$2,400.00", total: "$2,400.00" }]}
  subtotal="$2,400.00"
  total="$2,400.00"
  currency="USD"
/>`,
  },
  "sidebar-layout": {
    status: "stable",
    description:
      "Generic sidebar + content page layout. Sticky left-rail nav with grouped items, scrollable main column. Copy-source recipe in src/layouts/.",
    since: "0.13.0",
    importStatement: `// Copy from src/layouts/sidebar-layout.tsx — layouts are not packaged.`,
    dos: [
      "Group nav items by domain (Workspace, Compliance, Billing)",
      "Pass linkComponent={Link} for Next.js client-side navigation",
      "Fork the file and tailor for your app",
    ],
    donts: ["Don't nest inside AppShell's main content column"],
    codeExample: `<SidebarLayout
  nav={[
    { title: "Workspace", items: [{ label: "General", href: "/settings", isActive: true }, { label: "Members", href: "/settings/members" }] },
  ]}
>
  <h1>General</h1>
  ...
</SidebarLayout>`,
  },
  "entity-graph": {
    status: "new",
    description:
      "Pre-configured xyflow canvas for visualising wallet/VASP relationship clusters. Nodes are entities (VASPs, unhosted wallets, unknowns); edges are transactions or relationships with active/inactive variants.",
    since: "0.13.0",
    importStatement: `import { EntityGraph } from "@cogentic-co/ds/workflow/entity-graph"`,
    dos: [
      "Use for cluster analysis, fund flow visualisation",
      "Mark high-priority paths with edge.data.active = true",
      "Pair with TransactionDetail in a sidebar for entity details on click",
    ],
    donts: ["Don't render >100 nodes — performance degrades; aggregate or paginate"],
    codeExample: `<EntityGraph
  nodes={[
    { id: "binance", type: "entity", position: { x: 0, y: 0 }, data: { label: "Binance", type: "vasp", riskScore: 32 } },
  ]}
  edges={[{ id: "e1", source: "binance", target: "wallet-1", data: { label: "2.5 ETH", active: true } }]}
  onNodeClick={(id) => select(id)}
/>`,
  },
}
