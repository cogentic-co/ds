import type { ComponentMeta } from "../index"

// ── New components (v0.5.0) ──
export const newComponentsMeta: Record<string, ComponentMeta> = {
  // ── Chat blocks (v0.21.0) ──
  "chat-block": {
    status: "new",
    description:
      "Full chat block. Composes Conversation + Message + sticky PromptInput + empty state with optional suggestions. Self-managed by default; pass `messages` + `onMessagesChange` to control externally. Streaming-aware via `isLoading`.",
    since: "0.21.0",
    importStatement: 'import { ChatBlock } from "@cogentic-co/ds/chat/chat-block"',
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
    codeExample: `import { ChatBlock } from "@cogentic-co/ds/chat/chat-block"

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
      'import { PromptInputActionsBlock } from "@cogentic-co/ds/chat/prompt-input-actions"',
    dos: [
      "Use as a standalone composer above a conversation",
      "Override `leftActions` / `rightActions` to add tools (model selector, attach, etc.)",
      "Set `isLoading` while a response streams — submit becomes a stop button",
    ],
    donts: ["Don't render this and ChatBlock together — ChatBlock has its own input"],
    codeExample: `import { PromptInputActionsBlock } from "@cogentic-co/ds/chat/prompt-input-actions"

<PromptInputActionsBlock onSubmit={(text) => sendMessage(text)} />`,
  },
  "prompt-input-suggestions": {
    status: "new",
    description:
      "PromptInput with a two-level suggestion picker. First click reveals a group's items; clicking an item pre-fills the input. Mirrors prompt-kit's PromptInputWithSuggestions.",
    since: "0.21.0",
    importStatement:
      'import { PromptInputSuggestionsBlock } from "@cogentic-co/ds/chat/prompt-input-suggestions"',
    dos: [
      "Use 3–5 suggestion groups for a clean grid",
      "Set `highlight` on each group to bold the action verb in items",
      "Use for empty-state composers where you want to nudge user intent",
    ],
    donts: [
      "Don't use more than ~6 items per group — feels overwhelming",
      "Don't mix this with ChatBlock — ChatBlock has its own empty-state suggestions",
    ],
    codeExample: `import { PromptInputSuggestionsBlock } from "@cogentic-co/ds/chat/prompt-input-suggestions"

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

  // ── Previously undocumented utilities + cards ──
  "code-block": {
    status: "stable",
    description:
      "Display a block of code with a language label, a copy button, and shiki-powered syntax highlighting. Theme follows the document `dark` class by default; override with `theme`.",
    since: "0.10.0",
    importStatement: 'import { CodeBlock } from "@cogentic-co/ds"',
    dos: [
      "Pass `language` so the right tokens highlight (ts, tsx, js, py, json, sql, sh, etc.)",
      "Use inside Markdown only when you need a standalone code block — Markdown already highlights fenced code",
      "Use `showLineNumbers` for tutorial / documentation contexts",
    ],
    donts: [
      "Don't use for inline code — that's a `<code>` element or rely on Markdown's inline code style",
      "Don't pass massive blobs (1000+ lines) without a max-height wrapper",
    ],
    codeExample: `<CodeBlock
  language="ts"
  code={\`function risk(score: number) {
  return score > 70 ? "high" : score > 40 ? "medium" : "low"
}\`}
/>`,
  },
  "copy-button": {
    status: "stable",
    description:
      "Small button that copies a string to the clipboard and flips icon to a checkmark for 2s on success.",
    since: "0.10.0",
    importStatement: 'import { CopyButton } from "@cogentic-co/ds"',
    dos: [
      "Use next to read-only values (transaction hash, API key, address)",
      "Pair with a tooltip if the affordance isn't obvious",
    ],
    donts: ["Don't use for editable text — let users select normally"],
    codeExample: `<CopyButton value="0x742d…f44e" />`,
  },
  "file-upload": {
    status: "stable",
    description:
      "Drop-zone + file picker with optional list of selected files. Drives multipart uploads, dataset imports, attachment pickers.",
    since: "0.10.0",
    importStatement: 'import { FileUpload } from "@cogentic-co/ds"',
    dos: [
      "Set `accept` to constrain types and `maxSize` to enforce per-file limits",
      "Wire `onChange` to your upload mutation",
    ],
    donts: ["Don't use for chat attachments — use PromptInput's upload slot or Asset"],
    codeExample: `<FileUpload accept="application/pdf" maxFiles={3} onChange={setFiles} />`,
  },
  "heatmap-chart": {
    status: "stable",
    description:
      "2D heatmap chart for risk distribution / time-of-day analysis. Built on recharts.",
    since: "0.16.0",
    importStatement: 'import { HeatmapChart } from "@cogentic-co/ds/charts/heatmap-chart"',
    dos: [
      "Use for sparse 2D data (day × hour, jurisdiction × risk band)",
      "Pick a sequential colour scale that maps to the data domain",
    ],
    donts: ["Don't use for dense matrices — a regular table is faster to scan"],
    codeExample: `<HeatmapChart data={dataset} xKey="hour" yKey="weekday" valueKey="count" />`,
  },
  "inline-edit": {
    status: "stable",
    description:
      "Click-to-edit text — renders as plain text until activated, then shows an input with save / cancel.",
    since: "0.13.0",
    importStatement: 'import { InlineEdit } from "@cogentic-co/ds"',
    dos: [
      "Use for fields that are read-only most of the time (case title, note text)",
      "Validate on save and show errors inline",
    ],
    donts: ["Don't use for primary form fields — those should always be editable"],
    codeExample: `<InlineEdit value={title} onSave={setTitle} />`,
  },
  "key-value-list": {
    status: "stable",
    description:
      "Compact label/value list for entity metadata — case fields, transaction params, settings summaries.",
    since: "0.13.0",
    importStatement: 'import { KeyValueList } from "@cogentic-co/ds"',
    dos: [
      "Keep labels short and consistent (sentence case)",
      "Use `dense` density inside cards or sidebars",
    ],
    donts: ["Don't use for editable forms — that's Field"],
    codeExample: `<KeyValueList items={[{ label: "Status", value: "Open" }, { label: "Risk", value: "78" }]} />`,
  },
  "kpi-card": {
    status: "stable",
    description:
      "Single metric card with label, large value, optional delta and sparkline. Replaces the deprecated StatCard.",
    since: "0.13.0",
    importStatement: 'import { KpiCard } from "@cogentic-co/ds"',
    dos: [
      "Use in 2–4 column grids for dashboard summaries",
      "Pass `sparkline` for trend context",
      "Use `deltaArrow` + `deltaTone` to colour-code direction",
      "Keep values terse ($12.4k, 3.2%, 1,234)",
    ],
    donts: [
      "Don't pile multiple deltas on one card",
      "Don't use for full chart data — use a Chart component",
    ],
    codeExample: `<KpiCard label="Volume (24h)" value="$1.2M" delta="+12%" deltaTone="positive" deltaArrow sparkline={[1,2,3,4,5,6,7]} hint="vs 7d avg" />`,
  },
  "loading-overlay": {
    status: "stable",
    description:
      "Full-cover loading veil with optional message. Anchors to its nearest positioned ancestor.",
    since: "0.10.0",
    importStatement: 'import { LoadingOverlay } from "@cogentic-co/ds"',
    dos: [
      "Use on cards/panels during refresh",
      "Pair with optimistic UI when possible — avoid blocking the whole screen",
    ],
    donts: ["Don't use for full-page loads — use a Skeleton"],
    codeExample: `<div className="relative">
  {isLoading && <LoadingOverlay message="Loading…" />}
  <DataTable …/>
</div>`,
  },
  "number-input": {
    status: "stable",
    description: "Numeric input with stepper buttons, min/max clamping, and step increment.",
    since: "0.13.0",
    importStatement: 'import { NumberInput } from "@cogentic-co/ds"',
    dos: ["Set `min`/`max` to constrain", "Use `step` for non-integer increments"],
    donts: ["Don't use for currency without locale formatting"],
    codeExample: `<NumberInput value={count} onValueChange={setCount} min={0} max={100} step={1} />`,
  },
  "ring-card": {
    status: "stable",
    description:
      "Stacked glass-ring card composition. Pairs with brand visuals on marketing surfaces.",
    since: "0.10.0",
    importStatement: 'import { RingCard } from "@cogentic-co/ds"',
    dos: ["Use sparingly on hero / feature sections"],
    donts: ["Don't nest interactive content — purely decorative"],
    codeExample: `<RingCard><RingCardInner>…</RingCardInner></RingCard>`,
  },
  "sidebar-card": {
    status: "stable",
    description:
      "Generic compact list-row with leading status dot, mono reference, title, and meta line. Also exported as `ListCard` since it's not sidebar-specific.",
    since: "0.25.0",
    importStatement: 'import { SidebarCard, ListCard } from "@cogentic-co/ds"',
    dos: [
      "Use inside SidebarMenu for cases / investigations rails",
      "Use as ListCard outside the sidebar wherever a 3-line entity row fits",
      "Pass `status` for a leading StatusIndicator dot",
    ],
    donts: ["Don't use for primary action rows — use Item or SidebarMenuButton"],
    codeExample: `<SidebarCard reference="CASE-72" title="Sanctions hit — Helix Labs" meta="P2 · 2d ago" status="busy" />`,
  },
  sparkline: {
    status: "stable",
    description: "Tiny inline trend line — used inside KpiCard or any compact metrics surface.",
    since: "0.13.0",
    importStatement: 'import { Sparkline } from "@cogentic-co/ds"',
    dos: ["Pass 5–30 points for a readable shape", "Match `color` to the metric's tone"],
    donts: ["Don't use for full charts — use AreaChart"],
    codeExample: `<Sparkline points={[1,2,3,4,5,4,6]} color="var(--success)" fill />`,
  },
  stat: {
    status: "stable",
    description:
      "Unstyled label + value primitive. Composes inside cards or use directly when KpiCard is too heavy.",
    since: "0.10.0",
    importStatement: 'import { Stat } from "@cogentic-co/ds"',
    dos: ["Use inside cards / headers when you only need label + value"],
    donts: ["Don't use when you need delta + sparkline — that's KpiCard"],
    codeExample: `<Stat label="Open cases" value={42} />`,
  },
  "visually-hidden": {
    status: "stable",
    description:
      "Hides content visually but keeps it available to screen readers. Use for labels on icon-only buttons, skip links, and live-region announcements.",
    since: "0.10.0",
    importStatement: 'import { VisuallyHidden } from "@cogentic-co/ds"',
    dos: ["Always pair an icon-only button with a VisuallyHidden label"],
    donts: ["Don't use to hide important information from sighted users"],
    codeExample: `<button><Icon /><VisuallyHidden>Open menu</VisuallyHidden></button>`,
  },
}
