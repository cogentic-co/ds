import type { ComponentMeta } from "../index"

// ── New components (v0.5.0) ──
export const newComponentsMeta: Record<string, ComponentMeta> = {
  // ── Chat blocks (v0.21.0) ──
  chat: {
    status: "new",
    description:
      "Full chat block. Composes Conversation + Message + sticky PromptInput + empty state with optional suggestions. Self-managed by default; pass `messages` + `onMessagesChange` to control externally. Streaming-aware via `isLoading`.",
    since: "0.21.0",
    importStatement: 'import { ChatBlock } from "@cogentic-co/ds/blocks/chat"',
    dos: [
      "Wrap in a fixed-height container so the conversation can scroll",
      "Pass `suggestions` for an empty-state with starter prompts",
      "Use `isLoading` to disable submit while a response streams",
      "Markdown auto-renders inside MessageResponse — pass model output as a string",
    ],
    donts: [
      "Don't nest ChatBlock inside another scroll container",
      "Don't bypass `onSubmit` to mutate messages directly — use onMessagesChange",
    ],
    codeExample: `import { ChatBlock } from "@cogentic-co/ds/blocks/chat"

<ChatBlock
  title="How can I help?"
  suggestions={["Summarise case", "Find similar tx"]}
  onSubmit={async (msg) => {
    // call your model / AI SDK
    await sendMessage(msg)
  }}
/>`,
  },
  "prompt-input-actions": {
    status: "new",
    description:
      "Polished PromptInput block with a row of action buttons (Plus, Search, More, Voice, Submit). Mirrors prompt-kit's PromptInputWithActions but built from our primitives.",
    since: "0.21.0",
    importStatement:
      'import { PromptInputActionsBlock } from "@cogentic-co/ds/blocks/prompt-input-actions"',
    dos: [
      "Use as a standalone composer above a conversation",
      "Override `leftActions` / `rightActions` to add tools (model selector, attach, etc.)",
      "Set `isLoading` while a response streams — submit becomes a stop button",
    ],
    donts: ["Don't render this and ChatBlock together — ChatBlock has its own input"],
    codeExample: `import { PromptInputActionsBlock } from "@cogentic-co/ds/blocks/prompt-input-actions"

<PromptInputActionsBlock onSubmit={(text) => sendMessage(text)} />`,
  },
  "prompt-input-suggestions": {
    status: "new",
    description:
      "PromptInput with a two-level suggestion picker. First click reveals a group's items; clicking an item pre-fills the input. Mirrors prompt-kit's PromptInputWithSuggestions.",
    since: "0.21.0",
    importStatement:
      'import { PromptInputSuggestionsBlock } from "@cogentic-co/ds/blocks/prompt-input-suggestions"',
    dos: [
      "Use 3–5 suggestion groups for a clean grid",
      "Set `highlight` on each group to bold the action verb in items",
      "Use for empty-state composers where you want to nudge user intent",
    ],
    donts: [
      "Don't use more than ~6 items per group — feels overwhelming",
      "Don't mix this with ChatBlock — ChatBlock has its own empty-state suggestions",
    ],
    codeExample: `import { PromptInputSuggestionsBlock } from "@cogentic-co/ds/blocks/prompt-input-suggestions"

<PromptInputSuggestionsBlock
  groups={[
    { label: "Summary", highlight: "Summarize", items: [...] },
    { label: "Code", highlight: "Help me", items: [...] },
  ]}
  onSubmit={(m) => sendMessage(m)}
/>`,
  },

  // ── Marketing blocks ──
  "pricing-table": {
    status: "stable",
    description:
      "Responsive pricing comparison with plan cards, feature lists, and highlighted recommended tier.",
    since: "0.1.0",
    importStatement: 'import { PricingTable } from "@cogentic-co/ds/blocks/pricing-table"',
    dos: [
      "Use for SaaS pricing pages with 2-4 plan tiers",
      "Highlight one recommended plan via the featured flag",
      "Keep feature lists short and scannable (6-10 items per plan)",
    ],
    donts: [
      "Don't use for more than 4 plans — gets unreadable on mobile",
      "Don't mix feature list lengths wildly between plans — align by padding empty slots",
    ],
    codeExample: `import { PricingTable } from "@cogentic-co/ds/blocks/pricing-table"

<PricingTable
  headline="Simple, transparent pricing"
  subheadline="Start free, upgrade when you're ready."
  plans={[
    {
      name: "Starter",
      price: "$0",
      description: "For small teams getting started",
      features: ["Up to 5 users", "10GB storage", "Community support"],
      ctaLabel: "Get started",
      ctaHref: "/signup",
    },
    {
      name: "Pro",
      price: "$29",
      description: "For growing teams",
      features: ["Unlimited users", "100GB storage", "Priority support", "Advanced analytics"],
      ctaLabel: "Start free trial",
      ctaHref: "/signup?plan=pro",
      featured: true,
    },
  ]}
/>`,
  },
  "stat-card": {
    status: "stable",
    description:
      "Dashboard KPI card with a label, value, trend indicator, and optional description.",
    since: "0.1.0",
    importStatement: 'import { StatCard } from "@cogentic-co/ds/blocks/stat-card"',
    dos: [
      "Use in a grid of 2-4 for a metrics overview at the top of dashboards",
      "Set trendDirection to auto-colour the trend value (up=green, down=red, neutral=grey)",
      "Keep values concise ($12.4k, not $12,400.00)",
    ],
    donts: [
      "Don't overload with more than one trend per card",
      "Don't use for complex data — reach for a chart instead",
    ],
    codeExample: `import { StatCard } from "@cogentic-co/ds/blocks/stat-card"

<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
  <StatCard label="Revenue" value="$12.4k" description="vs last month" trend="+12%" trendDirection="up" />
  <StatCard label="Users" value="1,234" description="active this week" trend="-3%" trendDirection="down" />
  <StatCard label="Orders" value="89" description="today" trend="+5%" trendDirection="up" />
  <StatCard label="Conversion" value="3.2%" description="30-day avg" />
</div>`,
  },
  "feature-section": {
    status: "stable",
    description:
      "Marketing feature grid with title, subtitle, and 2-6 feature cards with icons and descriptions.",
    since: "0.1.0",
    importStatement: 'import { FeatureSection } from "@cogentic-co/ds/blocks/feature-section"',
    dos: [
      "Use for marketing landing pages to showcase 3-6 key features",
      "Pair each feature with a distinctive icon",
      "Keep feature titles short (2-4 words) and descriptions under 2 lines",
    ],
    donts: [
      "Don't use for more than 6 features — use a different layout",
      "Don't use without icons — they anchor the eye and improve scannability",
    ],
    codeExample: `import { FeatureSection } from "@cogentic-co/ds/blocks/feature-section"

<FeatureSection
  title="Everything you need"
  subtitle="Built for modern compliance teams."
  features={[
    { title: "AI Analysis", description: "Automated risk scoring powered by machine learning." },
    { title: "Real-time Alerts", description: "Instant notifications when issues are detected." },
    { title: "Audit Trail", description: "Complete history of every action and decision." },
  ]}
/>`,
  },
  "hero-section": {
    status: "stable",
    description:
      "Top-of-page hero with badge, headline, subtitle, and CTA buttons. Variants: default, centered, split. Sizes: sm, default, lg.",
    since: "0.1.0",
    importStatement: 'import { HeroSection } from "@cogentic-co/ds/blocks/hero-section"',
    dos: [
      "Use the centered variant for single-column marketing pages",
      "Use the split variant when pairing with a hero image or illustration",
      "Keep headlines under 10 words — they're the first thing users read",
    ],
    donts: [
      "Don't stack multiple HeroSections on one page — it dilutes the call to action",
      "Don't use the lg size inside application shells — it overwhelms the layout",
    ],
    codeExample: `import { HeroSection } from "@cogentic-co/ds/blocks/hero-section"

<HeroSection
  variant="centered"
  badge="New Release"
  title="Build faster with Cogentic"
  subtitle="The compliance platform that keeps up with you."
/>`,
  },
  "page-cta": {
    status: "stable",
    description:
      "Full-width call-to-action section with headline, subheadline, and primary/secondary buttons. Typically used at the bottom of marketing pages.",
    since: "0.1.0",
    importStatement: 'import { PageCta } from "@cogentic-co/ds/blocks/page-cta"',
    dos: [
      "Use at the bottom of marketing pages as the final conversion prompt",
      "Keep the headline action-oriented and benefit-focused",
      "Use both primary and secondary CTAs when offering a trial + contact option",
    ],
    donts: ["Don't use mid-page — it competes with content", "Don't use with more than two CTAs"],
    codeExample: `import { PageCta } from "@cogentic-co/ds/blocks/page-cta"

<PageCta
  headline="Ready to simplify your compliance?"
  subheadline="Get started with Cogentic in minutes. No credit card required."
  primaryCta={{ label: "Get started", href: "/signup" }}
  secondaryCta={{ label: "Talk to sales", href: "/contact" }}
/>`,
  },
  "article-card": {
    status: "stable",
    description:
      "Blog/content card with title, excerpt, date, category, and optional author. Used on blog index pages.",
    since: "0.1.0",
    importStatement: 'import { ArticleCard } from "@cogentic-co/ds/blocks/article-card"',
    dos: [
      "Use in grids of 2-3 columns for blog index pages",
      "Keep excerpts to 2-3 lines maximum",
      "Use consistent date formatting across all cards",
    ],
    donts: [
      "Don't use for content that isn't an article (use Card directly for custom layouts)",
      "Don't truncate titles — rewrite them shorter instead",
    ],
    codeExample: `import { ArticleCard } from "@cogentic-co/ds/blocks/article-card"

<div className="grid gap-6 sm:grid-cols-2">
  <ArticleCard
    title="Understanding Travel Rule compliance in APAC"
    excerpt="A comprehensive guide to navigating the evolving regulatory landscape across Asia-Pacific jurisdictions."
    date="15 February 2026"
    category="Compliance"
    author="James Cooke"
  />
  <ArticleCard
    title="How AI is transforming VASP investigations"
    excerpt="Exploring the latest advances in AI-powered compliance tooling."
    date="10 February 2026"
    category="Technology"
  />
</div>`,
  },
  "team-card": {
    status: "stable",
    description:
      "Team member card with name, role, photo, and optional LinkedIn link. Used on About/Team pages.",
    since: "0.1.0",
    importStatement: 'import { TeamCard } from "@cogentic-co/ds/blocks/team-card"',
    dos: [
      "Use in grids of 3-4 columns for team pages",
      "Use consistent photo styles (all headshots, same aspect ratio)",
      "Include LinkedIn links for professional credibility",
    ],
    donts: [
      "Don't mix photos and initials across the same grid — pick one",
      "Don't put company bios in the card (keep it name + role)",
    ],
    codeExample: `import { TeamCard } from "@cogentic-co/ds/blocks/team-card"

<div className="grid gap-6 sm:grid-cols-3">
  <TeamCard name="Alice Smith" role="Engineering Lead" linkedinUrl="https://linkedin.com/in/..." />
  <TeamCard name="Bob Chen" role="Product Designer" />
  <TeamCard name="Carol Davis" role="Staff Engineer" />
</div>`,
  },
  "audit-log": {
    status: "new",
    description:
      "Chronological feed of system or user actions. Ideal for compliance trails and activity history.",
    since: "0.5.0",
    importStatement: `import {
  AuditLog, AuditLogEntry, AuditLogIcon,
  AuditLogContent, AuditLogMessage, AuditLogMeta,
  AuditLogTime, AuditLogDetail,
} from "@cogentic-co/ds/audit-log"`,
    dos: [
      "Use for compliance audit trails and activity logs",
      "Include timestamps and actor information on every entry",
      "Use the action variant to semantically categorize entries",
      "Add AuditLogDetail for supplementary context when needed",
    ],
    donts: [
      "Don't use for real-time chat — use CommentThread instead",
      "Don't omit timestamps — audit logs require temporal context",
      "Don't nest AuditLog components",
    ],
    codeExample: `import {
  AuditLog, AuditLogEntry, AuditLogIcon,
  AuditLogContent, AuditLogMessage, AuditLogMeta,
  AuditLogTime, AuditLogDetail,
} from "@cogentic-co/ds/audit-log"
import { PlusIcon } from "lucide-react"

<AuditLog>
  <AuditLogEntry action="create">
    <AuditLogIcon>
      <PlusIcon className="size-3.5 text-emerald-600" />
    </AuditLogIcon>
    <AuditLogContent>
      <AuditLogMessage>
        <span className="font-medium">Sarah Chen</span> created case CASE-001
      </AuditLogMessage>
      <AuditLogMeta>
        <span>Compliance Team</span>
        <AuditLogTime>Mar 15, 9:30 AM</AuditLogTime>
      </AuditLogMeta>
      <AuditLogDetail>Flagged for unusual transaction pattern.</AuditLogDetail>
    </AuditLogContent>
  </AuditLogEntry>
</AuditLog>`,
  },
  "filter-bar": {
    status: "new",
    description:
      "Horizontal bar of removable filter chips with a clear-all action. For data table and list filtering.",
    since: "0.5.0",
    importStatement: `import { FilterBar, FilterChip, FilterClear } from "@cogentic-co/ds/filter-bar"`,
    dos: [
      "Place above the data table or list it filters",
      "Show label:value pairs for clarity",
      "Include a Clear All action when multiple filters are active",
      "Use onRemove to allow individual chip removal",
    ],
    donts: [
      "Don't use for static tags — use Tag or Badge instead",
      "Don't show the filter bar when no filters are active",
      "Don't put form inputs inside FilterBar — use it for applied filter display only",
    ],
    codeExample: `import { FilterBar, FilterChip, FilterClear } from "@cogentic-co/ds/filter-bar"

<FilterBar>
  <FilterChip label="Status" value="Under Review" onRemove={() => {}} />
  <FilterChip label="Risk Level" value="High" onRemove={() => {}} />
  <FilterClear onClick={() => {}} />
</FilterBar>`,
  },
  "split-pane": {
    status: "new",
    description:
      "Resizable split-view layout built on react-resizable-panels. For master-detail and side-by-side views.",
    since: "0.5.0",
    importStatement: `import { SplitPane, SplitPanePanel, SplitPaneDivider } from "@cogentic-co/ds/split-pane"`,
    dos: [
      "Use for master-detail layouts (list + detail view)",
      "Set sensible minSize values to prevent panels from collapsing",
      "Use direction='vertical' for top/bottom splits",
      "Wrap in a container with a fixed height",
    ],
    donts: [
      "Don't nest more than two levels of split panes",
      "Don't use without a fixed-height parent container",
      "Don't use for simple two-column layouts — use Grid instead",
    ],
    codeExample: `import { SplitPane, SplitPanePanel, SplitPaneDivider } from "@cogentic-co/ds/split-pane"

<div className="h-[500px]">
  <SplitPane direction="horizontal">
    <SplitPanePanel defaultSize={35} minSize={20}>
      <div className="p-4">Left panel</div>
    </SplitPanePanel>
    <SplitPaneDivider />
    <SplitPanePanel defaultSize={65} minSize={30}>
      <div className="p-4">Right panel</div>
    </SplitPanePanel>
  </SplitPane>
</div>`,
  },
  "settings-card-grid": {
    status: "new",
    description:
      "2-column grid of clickable tile cards with icon, title, and description. Used for settings home pages, navigation hubs, and category landing pages — the Plain settings-home pattern.",
    since: "0.9.0",
    importStatement: `import { SettingsCardGrid } from "@cogentic-co/ds/blocks/settings-card-grid"`,
    dos: [
      "Use for settings home pages and navigation hubs with 4–8 destinations",
      "Keep descriptions short — one sentence per card is enough",
      "Use the columns prop to switch between 1, 2, or 3 columns based on available space",
      "Use consistent icon styles (same size and stroke weight) across all items",
    ],
    donts: [
      "Don't use for inline navigation within a page — use Tabs or a sidebar instead",
      "Don't mix clickable cards with non-clickable ones in the same grid",
      "Don't put long descriptions in cards — they break the visual rhythm",
    ],
    codeExample: `import { SettingsCardGrid } from "@cogentic-co/ds/blocks/settings-card-grid"
import { Bell, Settings2, Users } from "lucide-react"

<SettingsCardGrid
  items={[
    {
      icon: <Settings2 className="size-5" />,
      title: "General",
      description: "Configure workspace name, logo, and domain settings",
      href: "/settings/general",
    },
    {
      icon: <Users className="size-5" />,
      title: "Members",
      description: "Add and manage team members and their permissions",
      href: "/settings/members",
    },
    {
      icon: <Bell className="size-5" />,
      title: "Notifications",
      description: "Control when and how you receive workspace notifications",
      href: "/settings/notifications",
    },
  ]}
/>`,
  },
  "rich-radio-list": {
    status: "new",
    description:
      "Card-contained list of radio options with hairline dividers between each row. Each option has a title and optional description, and the whole row is the click target. Implements the Plain role-picker pattern.",
    since: "0.9.0",
    importStatement: `import { RichRadioList } from "@cogentic-co/ds/blocks/rich-radio-list"`,
    dos: [
      "Use when each option has a description that helps the user choose",
      "Prefer over plain RadioGroup for 3–6 options with contextual descriptions",
      "Always provide aria-label or aria-labelledby for accessibility",
    ],
    donts: [
      "Don't use with more than 6–8 options — it gets unwieldy; use a Select instead",
      "Don't use when options have no descriptions — plain RadioGroup is lighter",
      "Don't nest inside another card",
    ],
    codeExample: `import { RichRadioList } from "@cogentic-co/ds/blocks/rich-radio-list"

<RichRadioList
  defaultValue="admin"
  aria-label="Role"
  options={[
    {
      value: "admin",
      title: "Admin",
      description: "Has access to everything, except billing or workspace deletion.",
    },
    {
      value: "support",
      title: "Support",
      description: "Can message customers and use all app features.",
    },
    {
      value: "viewer",
      title: "Viewer",
      description: "Can view threads and participate in internal discussions.",
    },
  ]}
/>`,
  },
  "sequence-builder": {
    status: "new",
    description:
      "Reorderable step-list builder with drag-and-drop, numbered badges, insert-between buttons, and per-step delete. Designed for escalation paths, workflow builders, onboarding sequences, or any ordered-steps editor.",
    since: "0.9.0",
    importStatement: `import { SequenceBuilder } from "@cogentic-co/ds/blocks/sequence-builder"`,
    dos: [
      "Use for editable ordered sequences like escalation paths, onboarding flows, and approval chains",
      "Provide a stable unique id per step — drag-and-drop relies on stable ids to track positions",
      "Keep step content focused — a short description or a single control per step works best",
      "Wire onStepsChange to your state so reorder results are persisted",
    ],
    donts: [
      "Don't use for read-only sequence display — use a plain list or Timeline instead",
      "Don't nest SequenceBuilders inside each other",
      "Avoid more than ~10 steps; beyond that, pagination or collapsing helps usability",
    ],
    codeExample: `import { useState } from "react"
import { SequenceBuilder, type SequenceStep } from "@cogentic-co/ds/blocks/sequence-builder"

function EscalationPathEditor() {
  const [steps, setSteps] = useState<SequenceStep[]>([
    {
      id: "step-1",
      title: "Assign to support team",
      content: (
        <div className="text-muted-foreground text-sm">
          Route new threads to the on-call support engineer
        </div>
      ),
    },
    {
      id: "step-2",
      title: "Escalate to team lead",
      content: (
        <div className="text-muted-foreground text-sm">
          If no response after 15 minutes, notify the team lead
        </div>
      ),
    },
  ])

  function handleAddStep(index: number) {
    setSteps((current) => {
      const next = [...current]
      next.splice(index, 0, {
        id: \`step-\${Date.now()}\`,
        title: "New step",
        content: <div className="text-muted-foreground text-sm">Configure this step</div>,
      })
      return next
    })
  }

  function handleRemoveStep(id: string) {
    setSteps((current) => current.filter((step) => step.id !== id))
  }

  return (
    <SequenceBuilder
      steps={steps}
      onStepsChange={setSteps}
      onAddStep={handleAddStep}
      onRemoveStep={handleRemoveStep}
    />
  )
}`,
  },
  "setting-row": {
    status: "new",
    description:
      "Stacked settings row with icon, title, description, and trailing action slot. Designed to sit inside a Card with Separator dividers between rows — the Plain settings pattern.",
    since: "0.9.0",
    importStatement: `import { SettingRow } from "@cogentic-co/ds/blocks/setting-row"`,
    dos: [
      "Stack multiple SettingRow components inside a Card with Separator dividers between each row",
      "Keep action slots tight — use Switch, Button, or a compact Select",
      "Use the icon prop to reinforce the row's topic at a glance",
      "Keep descriptions short — one sentence or phrase is enough",
    ],
    donts: [
      "Don't place multiple interactive actions per row — one action per row only",
      "Don't write very long descriptions — they break the compact rhythm of a settings list",
      "Don't nest SettingRow components inside each other",
    ],
    codeExample: `import { SettingRow } from "@cogentic-co/ds/blocks/setting-row"
import { Card } from "@cogentic-co/ds/components/card"
import { Separator } from "@cogentic-co/ds/components/separator"
import { Switch } from "@cogentic-co/ds/components/switch"
import { Bell, Mail } from "lucide-react"

<Card className="p-0">
  <SettingRow
    icon={<Bell className="size-4" />}
    title="Email notifications"
    description="Get notified when threads you follow get updates"
    action={<Switch defaultChecked />}
  />
  <Separator />
  <SettingRow
    icon={<Mail className="size-4" />}
    title="Weekly digest"
    description="Receive a summary email every Monday"
    action={<Switch />}
  />
</Card>`,
  },
  step: {
    status: "new",
    description:
      "Single step indicator. Status: done | active | pending | failed | skipped. Size: compact (single-line) | detailed (with description). Use inside Stepper or Plan/Agent Progress lists. Replaces the older StepProgress family.",
    since: "0.18.0",
    importStatement: 'import { Step, Stepper } from "@cogentic-co/ds/step"',
    dos: [
      "Use Stepper as the container, Step as each item",
      "Use detailed size for KYC/onboarding wizards where each step needs context",
      "Use compact size for agent progress lists, plans, or queues",
      "Pass a Badge as `trailing` for status text ('Done', '60/100', 'Error')",
    ],
    donts: [
      "Don't nest Step outside a Stepper unless you need a single status indicator",
      "Don't use more than 7 steps in a wizard — simplify or group",
      "Don't override the indicator icon unless absolutely necessary",
    ],
    codeExample: `import { Step, Stepper } from "@cogentic-co/ds/step"
import { Badge } from "@cogentic-co/ds"

<Stepper>
  <Step status="done" title="Validate inputs" />
  <Step status="active" title="Run sanctions screening" trailing={<Badge variant="ghost">60/100</Badge>} />
  <Step status="pending" title="Generate report" />
</Stepper>`,
  },
  "product-tour": {
    status: "new",
    description:
      "Multi-step onboarding modal with a split left/right layout, animated step transitions, dot pagination, and Back/Next/Get started controls.",
    since: "0.10.0",
    importStatement: `import { ProductTour } from "@cogentic-co/ds/blocks/product-tour"`,
    dos: [
      "Use for first-run onboarding or feature announcements (2-5 steps)",
      "Keep copy short and visual-forward — the right column is the hero",
      "Pass any React content in the step visual (image, animation, component)",
    ],
    donts: [
      "Don't use for required forms or wizards — use a dedicated multi-step form instead",
      "Don't exceed 5 steps — users fatigue quickly",
      "Don't hide the skip button for non-blocking tours",
    ],
    codeExample: `import { useState } from "react"
import { ProductTour } from "@cogentic-co/ds/blocks/product-tour"

function Welcome() {
  const [open, setOpen] = useState(true)
  return (
    <ProductTour
      open={open}
      onOpenChange={setOpen}
      onComplete={() => console.log("done")}
      steps={[
        {
          id: "meet",
          title: "Meet Ari",
          description: "Ari responds to routine requests automatically.",
          visual: <img src="/tour/ari.png" alt="" />,
        },
      ]}
    />
  )
}`,
  },
  "workflow-block-palette": {
    status: "new",
    description:
      "Searchable, category-grouped palette of draggable workflow blocks. Uses native HTML5 drag-and-drop so blocks can be dropped directly onto a Canvas.",
    since: "0.10.0",
    importStatement: `import { WorkflowBlockPalette, WORKFLOW_BLOCK_MIME } from "@cogentic-co/ds/workflow/workflow-block-palette"`,
    dos: [
      "Group related blocks under meaningful category names",
      "Handle both onBlockSelect (click-to-add) and canvas onDrop (drag-to-add)",
      "Read the WORKFLOW_BLOCK_MIME payload on the canvas drop handler",
    ],
    donts: [
      "Don't put more than ~30 blocks without search",
      "Don't nest the palette inside scrollable containers",
    ],
    codeExample: `import { WorkflowBlockPalette, WORKFLOW_BLOCK_MIME } from "@cogentic-co/ds/workflow/workflow-block-palette"

const blocks = [
  { id: "if", label: "If/else", category: "Logic" },
  { id: "assign", label: "Assign to user", category: "Action" },
]

<WorkflowBlockPalette blocks={blocks} onBlockSelect={(b) => addNode(b)} />`,
  },
  "workflow-inspector": {
    status: "new",
    description:
      "Right-side inspector panel for configuring the currently-selected workflow node. Header with back/close + title, scrollable body, optional footer.",
    since: "0.10.0",
    importStatement: `import { WorkflowInspector } from "@cogentic-co/ds/workflow/workflow-inspector"`,
    dos: [
      "Use alongside WorkflowBlockPalette for a full workflow editor layout",
      "Put primary save/discard actions in the footer slot",
      "Show the selected node's label + icon in the header",
    ],
    donts: ["Don't stack multiple inspectors — keep it single-panel"],
    codeExample: `<WorkflowInspector
  title="If/else"
  onClose={() => setSelected(null)}
  footer={<Button size="sm">Save</Button>}
>
  {/* config fields */}
</WorkflowInspector>`,
  },
}
