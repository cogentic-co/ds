"use client"

import { Bell, Bot, CreditCard, Mail, Monitor, Settings2, Sparkles, Users, Zap } from "lucide-react"
import { useState } from "react"
import { ArticleCard } from "@/blocks/article-card"
import { PageCta } from "@/blocks/page-cta"
import { PricingTable } from "@/blocks/pricing-table"
import { TeamCard } from "@/blocks/team-card"
import { FeatureSection } from "@/src/blocks/feature-section"
import { ForgotPasswordForm } from "@/src/blocks/forgot-password-form"
import { HeroSection } from "@/src/blocks/hero-section"
import { LoginForm } from "@/src/blocks/login-form"
import { MagicLinkMessage } from "@/src/blocks/magic-link-message"
import { ProductTour, type ProductTourStep } from "@/src/blocks/product-tour"
import { RegisterForm } from "@/src/blocks/register-form"
import { RichRadioList } from "@/src/blocks/rich-radio-list"
import { SelectOrgForm } from "@/src/blocks/select-org-form"
import { SequenceBuilder, type SequenceStep } from "@/src/blocks/sequence-builder"
import { SettingRow } from "@/src/blocks/setting-row"
import { SettingsCardGrid } from "@/src/blocks/settings-card-grid"
import { Button } from "@/src/components/button"
import { Card } from "@/src/components/card"
import { Separator } from "@/src/components/separator"
import { Switch } from "@/src/components/switch"
import { type ControlDefs, Playground, useControls } from "../../controls"

// ── Hero Section ───────────────────────────────────────────────────────

const heroControlDefs = {
  variant: {
    type: "radio",
    options: ["centered", "split"],
    defaultValue: "centered",
    label: "Variant",
  },
  title: { type: "text", defaultValue: "Build faster with Cogentic", label: "Title" },
  subtitle: {
    type: "text",
    defaultValue: "The compliance platform that keeps up with you.",
    label: "Subtitle",
  },
  badge: { type: "text", defaultValue: "New Release", label: "Badge" },
} satisfies ControlDefs

function HeroSectionPreview() {
  const controls = useControls(heroControlDefs)
  return (
    <Playground controls={controls}>
      <HeroSection
        variant={controls.values.variant as "centered"}
        badge={controls.values.badge || undefined}
        title={controls.values.title}
        subtitle={controls.values.subtitle}
      />
    </Playground>
  )
}

// ── Auth Form Blocks ───────────────────────────────────────────────────

function LoginFormPreview() {
  return (
    <div className="mx-auto max-w-md">
      <LoginForm forgotPasswordHref="#forgot" onSubmit={(values) => console.log("login", values)} />
    </div>
  )
}

function RegisterFormPreview() {
  return (
    <div className="mx-auto max-w-md">
      <RegisterForm termsHref="#terms" onSubmit={(values) => console.log("register", values)} />
    </div>
  )
}

function ForgotPasswordFormPreview() {
  return (
    <div className="mx-auto max-w-md">
      <ForgotPasswordForm onSubmit={(values) => console.log("forgot", values)} />
    </div>
  )
}

const sampleOrgs = [
  { id: "acme", name: "Acme Inc.", role: "Owner", memberCount: 12 },
  { id: "globex", name: "Globex Corporation", role: "Admin", memberCount: 47 },
  { id: "initech", name: "Initech", role: "Member", memberCount: 8 },
]

function SelectOrgFormPreview() {
  return (
    <div className="mx-auto max-w-md">
      <SelectOrgForm
        organizations={sampleOrgs}
        onSubmit={(values) => console.log("select-org", values)}
      />
    </div>
  )
}

function MagicLinkMessagePreview() {
  const [mlState, setMlState] = useState<"request" | "sent">("request")
  const [mlEmail, setMlEmail] = useState("")

  return (
    <div className="flex flex-col items-center gap-10">
      <MagicLinkMessage
        state={mlState}
        email={mlEmail || undefined}
        onSubmit={(email) => {
          setMlEmail(email)
          setMlState("sent")
        }}
        onResend={() => console.log("resend")}
        onBack={() => setMlState("request")}
      />

      <div className="flex items-center gap-4">
        <p className="text-muted-foreground text-xs">Jump to:</p>
        <Button variant="outline" size="sm" onClick={() => setMlState("request")}>
          Request state
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setMlEmail("you@example.com")
            setMlState("sent")
          }}
        >
          Sent state
        </Button>
      </div>
    </div>
  )
}

// ── Feature Section ────────────────────────────────────────────────────

const featureControlDefs = {
  title: { type: "text", defaultValue: "Everything you need", label: "Title" },
  subtitle: { type: "text", defaultValue: "Built for modern compliance teams.", label: "Subtitle" },
  featureCount: { type: "number", defaultValue: 3, min: 1, max: 6, step: 1, label: "Features" },
} satisfies ControlDefs

const allFeatures = [
  { title: "AI Analysis", description: "Automated risk scoring powered by machine learning." },
  { title: "Real-time Alerts", description: "Instant notifications when issues are detected." },
  { title: "Audit Trail", description: "Complete history of every action and decision." },
  { title: "Team Routing", description: "Smart assignment based on expertise and workload." },
  { title: "Secure Messaging", description: "End-to-end encrypted communication channels." },
  { title: "Custom Reports", description: "Generate compliance reports with one click." },
]

function FeatureSectionPreview() {
  const controls = useControls(featureControlDefs)
  return (
    <Playground controls={controls}>
      <FeatureSection
        title={controls.values.title}
        subtitle={controls.values.subtitle}
        features={allFeatures.slice(0, controls.values.featureCount)}
      />
    </Playground>
  )
}

// ── Setting Row ────────────────────────────────────────────────────────

function SettingRowPreview() {
  return (
    <div className="mx-auto max-w-2xl">
      <Card padding="none">
        <SettingRow
          icon={<Bell className="size-4" />}
          title="Email notifications"
          description="Get notified when threads you follow get updates"
          action={<Switch defaultChecked />}
        />
        <Separator />
        <SettingRow
          icon={<Monitor className="size-4" />}
          title="Desktop notifications"
          description="Show notifications on your desktop when new threads arrive"
          action={<Switch />}
        />
        <Separator />
        <SettingRow
          icon={<Mail className="size-4" />}
          title="Weekly digest"
          description="Receive a summary email every Monday"
          action={<Switch defaultChecked />}
        />
        <Separator />
        <SettingRow
          title="Marketing emails"
          description="Occasional product updates and tips"
          action={<Switch />}
        />
      </Card>
    </div>
  )
}

// ── Settings Card Grid ────────────────────────────────────────────────

const sampleSettings = [
  {
    icon: <Settings2 className="size-5" />,
    title: "General",
    description: "Configure workspace name, logo, and domain settings",
    href: "#general",
  },
  {
    icon: <Users className="size-5" />,
    title: "Members",
    description: "Add and manage team members and their permissions",
    href: "#members",
  },
  {
    icon: <Bell className="size-5" />,
    title: "Notifications",
    description: "Control when and how you receive workspace notifications",
    href: "#notifications",
  },
  {
    icon: <CreditCard className="size-5" />,
    title: "Billing",
    description: "Manage your subscription, usage, and billing information",
    href: "#billing",
  },
]

function SettingsCardGridPreview() {
  return (
    <div className="mx-auto max-w-3xl">
      <SettingsCardGrid items={sampleSettings} />
    </div>
  )
}

// ── Rich Radio List ────────────────────────────────────────────────────

const roleOptions = [
  {
    value: "owner",
    title: "Owner",
    description:
      "Has full access to everything. Can manage billing, workspace settings, API keys and workspace deletion.",
  },
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
    description:
      "Can view threads and participate in internal discussions. Cannot message customers.",
  },
]

function RichRadioListPreview() {
  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-2 font-semibold text-sm">Role</div>
      <RichRadioList options={roleOptions} defaultValue="admin" aria-label="Role" />
    </div>
  )
}

// ── Sequence Builder ───────────────────────────────────────────────────

const sequenceBuilderControlDefs = {
  size: {
    type: "select" as const,
    options: ["sm", "md"],
    defaultValue: "md",
    label: "Size",
  },
} satisfies ControlDefs

function SequenceBuilderPreview() {
  const controls = useControls(sequenceBuilderControlDefs)
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
      title: "Wait 15 minutes",
      content: (
        <div className="text-muted-foreground text-sm">
          Give the assigned engineer time to respond before escalating
        </div>
      ),
    },
    {
      id: "step-3",
      title: "Escalate to team lead",
      content: (
        <div className="text-muted-foreground text-sm">
          If no response, notify the team lead via Slack
        </div>
      ),
    },
  ])

  function handleAddStep(index: number) {
    const newId = `step-${Date.now()}`
    setSteps((current) => {
      const next = [...current]
      next.splice(index, 0, {
        id: newId,
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
    <Playground controls={controls}>
      <div className="mx-auto max-w-2xl">
        <SequenceBuilder
          steps={steps}
          onStepsChange={setSteps}
          onAddStep={handleAddStep}
          onRemoveStep={handleRemoveStep}
          size={controls.values.size as "sm" | "md"}
        />
      </div>
    </Playground>
  )
}

// ── Product Tour ───────────────────────────────────────────────────────

const productTourSteps: ProductTourStep[] = [
  {
    id: "meet",
    icon: <Bot className="size-8 text-foreground" />,
    title: "Meet Ari",
    description:
      "Ari responds to routine requests automatically so your team can focus on complex, high-value conversations.",
    visual: (
      <div className="flex size-full items-center justify-center">
        <div className="flex size-20 items-center justify-center rounded-2xl bg-foreground text-background">
          <Bot className="size-10" />
        </div>
      </div>
    ),
  },
  {
    id: "flows",
    icon: <Sparkles className="size-8 text-foreground" />,
    title: "Build custom flows",
    description:
      "Drag blocks onto the canvas to automate any workflow — from simple notifications to multi-step escalation paths.",
    visual: (
      <div className="flex size-full items-center justify-center">
        <div className="grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-12 w-24 rounded-lg border border-border bg-card shadow-sm" />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "ready",
    icon: <Zap className="size-8 text-foreground" />,
    title: "You're all set",
    description: "Jump in and start building. You can always replay this tour from the help menu.",
    visual: (
      <div className="flex size-full items-center justify-center">
        <Zap className="size-20 text-foreground" />
      </div>
    ),
  },
]

function ProductTourPreview() {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col items-center gap-3">
        <p className="text-muted-foreground text-xs uppercase tracking-wide">Modal</p>
        <Button onClick={() => setOpen(true)}>Launch tour</Button>
        <p className="text-muted-foreground text-xs">Use ← / → arrows to navigate between steps</p>
        <ProductTour
          open={open}
          onOpenChange={setOpen}
          steps={productTourSteps}
          onComplete={() => console.log("tour complete")}
        />
      </section>

      <section className="flex flex-col items-center gap-3">
        <p className="text-muted-foreground text-xs uppercase tracking-wide">Inline</p>
        <ProductTour
          mode="inline"
          steps={productTourSteps}
          onComplete={() => console.log("inline complete")}
          onSkip={() => console.log("inline skipped")}
        />
      </section>
    </div>
  )
}

// ── New blocks (page-header, command-palette, notification-center, kanban, etc.) ──

import {
  CompassIcon,
  FilePlus,
  HomeIcon,
  Inbox,
  PlusIcon,
  SearchIcon,
  Settings,
} from "lucide-react"
import { ApiKeyManager } from "@/src/blocks/api-key-manager"
import { Changelog } from "@/src/blocks/changelog"
import { ChatBlock, type ChatMessage } from "@/src/blocks/chat"
import { CommandPalette } from "@/src/blocks/command-palette"
import { Invoice } from "@/src/blocks/invoice"
import { Kanban, type KanbanCard } from "@/src/blocks/kanban"
import { MultiStepForm } from "@/src/blocks/multi-step-form"
import { NotificationCenter, type NotificationItem } from "@/src/blocks/notification-center"
import { PromptInputActionsBlock } from "@/src/blocks/prompt-input-actions"
import { PromptInputSuggestionsBlock } from "@/src/blocks/prompt-input-suggestions"
import { type TeamMember, TeamTable } from "@/src/blocks/team-table"
import { UsageMeter } from "@/src/blocks/usage-meter"
import { Tool, ToolContent, ToolHeader, ToolInput, ToolOutput } from "@/src/chatbot/tool"
import { CodeBlock } from "@/src/components/code-block"
import { Input } from "@/src/components/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/tabs"

function CommandPalettePreview() {
  const [open, setOpen] = useState(false)
  return (
    <div className="space-y-4">
      <Button onClick={() => setOpen(true)}>Open command palette (⌘K)</Button>
      <p className="text-muted-foreground text-xs">Press ⌘K / Ctrl+K to toggle.</p>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        groups={[
          {
            heading: "Navigation",
            actions: [
              {
                id: "home",
                label: "Go to dashboard",
                icon: <HomeIcon />,
                shortcut: "G H",
                onSelect: () => console.log("home"),
              },
              {
                id: "cases",
                label: "Open cases",
                icon: <Inbox />,
                shortcut: "G C",
                onSelect: () => console.log("cases"),
              },
              {
                id: "settings",
                label: "Settings",
                icon: <Settings />,
                shortcut: "G S",
                onSelect: () => console.log("settings"),
              },
            ],
          },
          {
            heading: "Actions",
            actions: [
              {
                id: "new-case",
                label: "Create new case",
                icon: <FilePlus />,
                shortcut: "C",
                onSelect: () => console.log("new case"),
              },
              {
                id: "search",
                label: "Search transactions",
                icon: <SearchIcon />,
                shortcut: "/",
                onSelect: () => console.log("search"),
              },
            ],
          },
        ]}
      />
    </div>
  )
}

function NotificationCenterPreview() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "1",
      title: "3 transactions flagged",
      description: "High-risk transfers detected from sanctioned jurisdictions",
      timestamp: new Date(Date.now() - 5 * 60_000).toISOString(),
      severity: "critical",
      read: false,
    },
    {
      id: "2",
      title: "Travel Rule data received",
      description: "Counterparty VASP responded to your IVMS101 request",
      timestamp: new Date(Date.now() - 30 * 60_000).toISOString(),
      severity: "info",
      read: false,
    },
    {
      id: "3",
      title: "Weekly report ready",
      description: "Your scheduled compliance report is available to download",
      timestamp: new Date(Date.now() - 2 * 3600_000).toISOString(),
      severity: "info",
      read: true,
    },
    {
      id: "4",
      title: "Sanctions list updated",
      description: "OFAC SDN list refreshed",
      timestamp: new Date(Date.now() - 8 * 3600_000).toISOString(),
      severity: "warning",
      read: true,
    },
  ])
  return (
    <div className="flex justify-center py-8">
      <NotificationCenter
        notifications={notifications}
        onMarkAllRead={() => setNotifications((all) => all.map((n) => ({ ...n, read: true })))}
        onNotificationClick={(id) =>
          setNotifications((all) => all.map((n) => (n.id === id ? { ...n, read: true } : n)))
        }
      />
    </div>
  )
}

function KanbanPreview() {
  const [cards, setCards] = useState<KanbanCard[]>([
    { id: "1", columnId: "new", content: <KanbanItem title="VASP transfer flagged" tag="P1" /> },
    { id: "2", columnId: "new", content: <KanbanItem title="KYC verification pending" tag="P3" /> },
    { id: "3", columnId: "review", content: <KanbanItem title="Travel Rule expired" tag="P2" /> },
    {
      id: "4",
      columnId: "review",
      content: <KanbanItem title="Sanctions match — Alpha LLC" tag="P1" />,
    },
    {
      id: "5",
      columnId: "resolved",
      content: <KanbanItem title="Weekly screening complete" tag="—" />,
    },
  ])
  return (
    <Kanban
      cards={cards}
      onCardsChange={setCards}
      columns={[
        { id: "new", title: "New", accent: "text-focal" },
        {
          id: "review",
          title: "In review",
          accent: "text-amber-700 dark:text-amber-400",
          limit: 5,
        },
        { id: "resolved", title: "Resolved", accent: "text-emerald-700 dark:text-emerald-400" },
      ]}
    />
  )
}

function KanbanItem({ title, tag }: { title: string; tag: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3 text-sm shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <span className="font-medium">{title}</span>
        <span className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-3xs uppercase">
          {tag}
        </span>
      </div>
    </div>
  )
}

function TeamTablePreview() {
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Sarah Chen",
      email: "sarah@cogentic.co",
      role: "admin",
      status: "active",
      lastActive: new Date(Date.now() - 15 * 60_000).toISOString(),
    },
    {
      id: "2",
      name: "James Cooke",
      email: "james@cogentic.co",
      role: "analyst",
      status: "active",
      lastActive: new Date(Date.now() - 3 * 3600_000).toISOString(),
    },
    {
      id: "3",
      name: "Anna Peterson",
      email: "anna@cogentic.co",
      role: "viewer",
      status: "invited",
    },
    {
      id: "4",
      name: "Bob Chen",
      email: "bob@cogentic.co",
      role: "analyst",
      status: "suspended",
      lastActive: new Date(Date.now() - 30 * 86400_000).toISOString(),
    },
  ])
  return (
    <TeamTable
      members={members}
      roles={[
        { value: "admin", label: "Admin" },
        { value: "analyst", label: "Analyst" },
        { value: "viewer", label: "Viewer" },
      ]}
      onRoleChange={(id, role) =>
        setMembers((all) => all.map((m) => (m.id === id ? { ...m, role } : m)))
      }
      onRemove={(id) => setMembers((all) => all.filter((m) => m.id !== id))}
      onResendInvite={(id) => console.log("resend", id)}
    />
  )
}

function ApiKeyManagerPreview() {
  return (
    <ApiKeyManager
      keys={[
        {
          id: "1",
          name: "Production API",
          preview: "sk_live_...ab42",
          scope: "Full access",
          createdAt: new Date(Date.now() - 30 * 86400_000).toISOString(),
          lastUsed: new Date(Date.now() - 5 * 60_000).toISOString(),
          active: true,
        },
        {
          id: "2",
          name: "Read-only dashboards",
          preview: "sk_read_...9e1f",
          scope: "Read only",
          createdAt: new Date(Date.now() - 90 * 86400_000).toISOString(),
          lastUsed: new Date(Date.now() - 6 * 3600_000).toISOString(),
          active: true,
        },
        {
          id: "3",
          name: "Old integration",
          preview: "sk_live_...c0a1",
          scope: "Full access",
          createdAt: new Date(Date.now() - 365 * 86400_000).toISOString(),
          active: false,
        },
      ]}
      onCreate={() => console.log("create")}
      onRotate={(id) => console.log("rotate", id)}
      onRevoke={(id) => console.log("revoke", id)}
    />
  )
}

function UsageMeterPreview() {
  return (
    <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
      <UsageMeter
        label="API requests"
        used={2_400_000}
        limit={5_000_000}
        unit=""
        description="Resets in 12 days"
      />
      <UsageMeter
        label="Storage"
        used={780}
        limit={1000}
        unit=" GB"
        cta={
          <Button size="xs" variant="outline">
            Upgrade
          </Button>
        }
      />
      <UsageMeter
        label="Team seats"
        used={9}
        limit={10}
        cta={<Button size="xs">Add seats</Button>}
      />
      <UsageMeter
        label="Active rules"
        used={48}
        limit={50}
        description="Approaching plan limit"
        cta={
          <Button size="xs" variant="outline">
            Upgrade
          </Button>
        }
      />
    </div>
  )
}

function ChangelogPreview() {
  return (
    <div className="max-w-2xl">
      <Changelog
        entries={[
          {
            version: "v0.12.0",
            date: "2026-04-10",
            title: "Compliance module",
            tags: ["feature"],
            children: (
              <ul>
                <li>
                  New compliance module: TransactionCard, TransactionRow, TransactionDetail with
                  status borders
                </li>
                <li>NetworkBadge with inline SVG chain icons (ETH, BTC, TRX, MATIC, SOL, BNB)</li>
                <li>CounterpartyCard</li>
              </ul>
            ),
          },
          {
            version: "v0.11.0",
            date: "2026-04-09",
            title: "Workflow nodes",
            tags: ["feature", "improvement"],
            children: (
              <ul>
                <li>Animated border on running nodes</li>
                <li>WorkflowNodeIcon with tone variants (ai/slack/email/etc.)</li>
                <li>WorkflowSlackMessage notification preview card</li>
              </ul>
            ),
          },
          {
            version: "v0.10.0",
            date: "2026-04-08",
            tags: ["fix", "security"],
            children: <p>Patched a token leakage path in audit-log; updated all dependencies.</p>,
          },
        ]}
      />
    </div>
  )
}

function MultiStepFormPreview() {
  return (
    <div className="max-w-2xl">
      <MultiStepForm
        steps={[
          {
            id: "1",
            title: "Account",
            description: "Tell us about your organisation",
            content: <Input placeholder="Organisation name" />,
          },
          {
            id: "2",
            title: "Verification",
            description: "Provide compliance details",
            content: <Input placeholder="VASP registration number" />,
          },
          {
            id: "3",
            title: "Review",
            description: "Confirm and submit",
            content: (
              <p className="text-muted-foreground text-sm">
                Final review of your details before submission.
              </p>
            ),
          },
        ]}
        onSubmit={() => console.log("submitted")}
      />
    </div>
  )
}

function InvoicePreview() {
  return (
    <div className="max-w-3xl">
      <Invoice
        number="INV-2026-0042"
        issuedAt="9 April 2026"
        dueAt="9 May 2026"
        status={
          <span className="inline-flex items-center rounded-md border border-amber-700/40 bg-amber-700/10 px-2 py-0.5 font-medium text-amber-700 text-xxs dark:border-amber-400/40 dark:bg-amber-400/10 dark:text-amber-400">
            Due
          </span>
        }
        from={{
          name: "Cogentic",
          lines: ["1 Compliance Way", "Singapore 049145", "VAT GB123456789"],
        }}
        to={{
          name: "Acme Corp",
          lines: ["Attn: Finance Team", "100 Main Street", "London W1A 1AA"],
        }}
        items={[
          {
            id: "1",
            description: "Compliance Platform — Pro plan",
            quantity: 1,
            unitPrice: "$2,400.00",
            total: "$2,400.00",
          },
          {
            id: "2",
            description: "Additional analyst seats (3)",
            quantity: 3,
            unitPrice: "$120.00",
            total: "$360.00",
          },
          {
            id: "3",
            description: "Travel Rule API — overage",
            quantity: 12_500,
            unitPrice: "$0.002",
            total: "$25.00",
          },
        ]}
        subtotal="$2,785.00"
        tax={{ label: "VAT (20%)", amount: "$557.00" }}
        total="$3,342.00"
        currency="USD"
        notes="Payment due within 30 days. Bank transfer or card. Reference INV-2026-0042 on payment."
      />
    </div>
  )
}

// ── ChatBlock — three patterns: uncontrolled, manual history, AI SDK ──

const initialHistory: ChatMessage[] = [
  { id: "h1", role: "user", content: "What's the risk score on case CASE-104?" },
  {
    id: "h2",
    role: "assistant",
    content:
      "Case **CASE-104** is currently scored **78** (high). The score is driven by:\n\n" +
      "1. Counterparty matched a sanctioned bridge\n" +
      "2. Three transactions above the $50k threshold\n" +
      "3. Mixer-adjacent flow at hop 3\n\n" +
      "Want me to draft an SAR?",
  },
]

function ChatBlockUncontrolledPreview() {
  return (
    <div className="h-[520px] overflow-hidden rounded-lg border bg-background">
      <ChatBlock
        title="How can I help you today?"
        description="Ask me anything about your compliance workflow."
        suggestions={[
          "Summarise this case",
          "Find similar transactions",
          "Generate SAR draft",
          "Explain the risk score",
        ]}
        onSubmit={async (m) => {
          await new Promise((r) => setTimeout(r, 600))
          console.log("submit:", m)
        }}
      />
    </div>
  )
}

function ChatBlockControlledPreview() {
  // Fully controlled — you own the messages array. ChatBlock will NOT
  // auto-append the user message; your onSubmit must do it (and the
  // assistant response).
  const [messages, setMessages] = useState<ChatMessage[]>(initialHistory)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (text: string) => {
    setMessages((m) => [...m, { id: `u-${Date.now()}`, role: "user", content: text }])
    setIsLoading(true)
    // Pretend to call your API
    await new Promise((r) => setTimeout(r, 800))
    setMessages((m) => [
      ...m,
      {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: `Got it — looking into "${text}" now. (mock response)`,
      },
    ])
    setIsLoading(false)
  }

  return (
    <div className="h-[520px] overflow-hidden rounded-lg border bg-background">
      <ChatBlock
        messages={messages}
        onMessagesChange={setMessages}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        placeholder="Ask a follow-up…"
      />
    </div>
  )
}

const aiSdkBasicCode = `"use client"
import { useChat } from "@ai-sdk/react"
import { ChatBlock, type ChatMessage } from "@cogentic-co/ds/blocks/chat"

export function AIChat() {
  const { messages, sendMessage, status } = useChat({ api: "/api/chat" })

  // AI SDK messages → ChatBlock messages
  const mapped: ChatMessage[] = messages.map((m) => ({
    id: m.id,
    role: m.role,
    content: m.parts
      .filter((p) => p.type === "text")
      .map((p) => p.text)
      .join(""),
  }))

  return (
    <ChatBlock
      messages={mapped}
      isLoading={status === "streaming"}
      onSubmit={(text) => sendMessage({ text })}
    />
  )
}`

const aiSdkToolsCode = `"use client"
import { useChat } from "@ai-sdk/react"
import { ChatBlock, type ChatMessage } from "@cogentic-co/ds/blocks/chat"
import { Tool, ToolHeader, ToolContent, ToolInput, ToolOutput } from "@cogentic-co/ds/chatbot"

export function AIChatWithTools() {
  const { messages, sendMessage, status } = useChat({ api: "/api/chat" })

  // Render tool-invocation parts inside Message via the children slot
  const mapped: ChatMessage[] = messages.map((m) => {
    const text = m.parts
      .filter((p) => p.type === "text")
      .map((p) => p.text)
      .join("")
    const tools = m.parts
      .filter((p) => p.type.startsWith("tool-"))
      .map((p, i) => (
        <Tool key={i}>
          <ToolHeader name={p.toolName} status={p.state} />
          <ToolContent>
            <ToolInput>{JSON.stringify(p.input, null, 2)}</ToolInput>
            {p.output && <ToolOutput>{JSON.stringify(p.output, null, 2)}</ToolOutput>}
          </ToolContent>
        </Tool>
      ))
    return {
      id: m.id,
      role: m.role,
      content: text,
      children: tools.length ? (
        <>
          {tools}
          {text}
        </>
      ) : undefined,
    }
  })

  return (
    <ChatBlock
      messages={mapped}
      isLoading={status === "streaming"}
      onSubmit={(text) => sendMessage({ text })}
    />
  )
}

// app/api/chat/route.ts ───────────────────────────────────────────────
import { streamText, tool } from "ai"
import { z } from "zod"

export async function POST(req: Request) {
  const { messages } = await req.json()
  const result = streamText({
    model: "anthropic/claude-sonnet-4-7",
    messages,
    tools: {
      searchCases: tool({
        description: "Search cases by criteria",
        inputSchema: z.object({ query: z.string(), limit: z.number().optional() }),
        execute: async ({ query, limit }) => {
          // your implementation
          return { results: [] }
        },
      }),
    },
  })
  return result.toTextStreamResponse()
}`

function ChatBlockToolDemoPreview() {
  // Mock AI SDK shape — tool call + text output rendered via children slot
  const messages: ChatMessage[] = [
    { id: "1", role: "user", content: "Search for cases with risk > 80 in the last 30 days" },
    {
      id: "2",
      role: "assistant",
      content:
        "Found **3 high-risk cases** matching your criteria. The highest is **CASE-104** at risk 95.",
      children: (
        <>
          <Tool>
            <ToolHeader name="searchCases" status="success" />
            <ToolContent>
              <ToolInput>{`{\n  "query": "risk > 80",\n  "since": "30d"\n}`}</ToolInput>
              <ToolOutput>
                {`{\n  "results": [\n    { "id": "CASE-104", "risk": 95, "status": "blocked" },\n    { "id": "CASE-091", "risk": 88, "status": "escalated" },\n    { "id": "CASE-082", "risk": 81, "status": "review" }\n  ]\n}`}
              </ToolOutput>
            </ToolContent>
          </Tool>
          Found **3 high-risk cases** matching your criteria. The highest is **CASE-104** at risk
          95.
        </>
      ),
    },
  ]

  return (
    <div className="h-[520px] overflow-hidden rounded-lg border bg-background">
      <ChatBlock
        messages={messages}
        onSubmit={(t) => console.log("submit:", t)}
        placeholder="Ask another question…"
      />
    </div>
  )
}

function ChatBlockPreview() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="uncontrolled">
        <TabsList>
          <TabsTrigger value="uncontrolled">Uncontrolled (simple)</TabsTrigger>
          <TabsTrigger value="controlled">Controlled (with history)</TabsTrigger>
          <TabsTrigger value="ai-sdk">AI SDK + tools (live)</TabsTrigger>
          <TabsTrigger value="ai-sdk-code">AI SDK code</TabsTrigger>
        </TabsList>

        <TabsContent value="uncontrolled" className="mt-4 space-y-3">
          <p className="text-muted-foreground text-sm">
            Pass <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">onSubmit</code>{" "}
            and let ChatBlock manage the messages internally. ChatBlock auto-appends the user
            message; your handler returns the assistant response by calling{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              onMessagesChange
            </code>{" "}
            (or use controlled mode).
          </p>
          <ChatBlockUncontrolledPreview />
        </TabsContent>

        <TabsContent value="controlled" className="mt-4 space-y-3">
          <p className="text-muted-foreground text-sm">
            Pass <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">messages</code>{" "}
            to fully control the array (e.g. hydrate from a database). In controlled mode ChatBlock
            does not auto-append — your{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">onSubmit</code> must
            push both user and assistant messages.
          </p>
          <ChatBlockControlledPreview />
        </TabsContent>

        <TabsContent value="ai-sdk" className="mt-4 space-y-3">
          <p className="text-muted-foreground text-sm">
            Demo of how a tool invocation renders inside a Message — uses our{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">{"<Tool>"}</code>{" "}
            primitive in the{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">children</code> slot
            of <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ChatMessage</code>
            . Wire your real AI SDK route handler to the code on the next tab.
          </p>
          <ChatBlockToolDemoPreview />
        </TabsContent>

        <TabsContent value="ai-sdk-code" className="mt-4 space-y-4">
          <div>
            <p className="mb-2 font-medium text-sm">Basic AI SDK integration</p>
            <p className="mb-3 text-muted-foreground text-xs">
              Map AI SDK's <code className="font-mono">messages.parts</code> array to ChatBlock's
              flat <code className="font-mono">content</code> string.
            </p>
            <CodeBlock language="tsx" code={aiSdkBasicCode} />
          </div>
          <div>
            <p className="mb-2 font-medium text-sm">With tool calls</p>
            <p className="mb-3 text-muted-foreground text-xs">
              Use <code className="font-mono">{"<Tool>"}</code> + the message's{" "}
              <code className="font-mono">children</code> slot to render tool invocations alongside
              text.
            </p>
            <CodeBlock language="tsx" code={aiSdkToolsCode} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// ── Static block previews ──────────────────────────────────────────────

export const blockPreviews: Record<string, React.ComponentType> = {
  "feature-section": FeatureSectionPreview,
  "hero-section": HeroSectionPreview,
  "login-form": LoginFormPreview,
  "register-form": RegisterFormPreview,
  "forgot-password-form": ForgotPasswordFormPreview,
  "select-org-form": SelectOrgFormPreview,
  "magic-link-message": MagicLinkMessagePreview,
  "pricing-table": () => <PricingTable />,
  "product-tour": ProductTourPreview,
  "command-palette": CommandPalettePreview,
  "notification-center": NotificationCenterPreview,
  kanban: KanbanPreview,
  "team-table": TeamTablePreview,
  "api-key-manager": ApiKeyManagerPreview,
  "usage-meter": UsageMeterPreview,
  changelog: ChangelogPreview,
  "multi-step-form": MultiStepFormPreview,
  invoice: InvoicePreview,
  "page-cta": () => (
    <PageCta
      headline="Ready to simplify your compliance?"
      subheadline="Get started with Signal in minutes. No credit card required."
      primaryCta={{ label: "Get started", href: "#" }}
      secondaryCta={{ label: "Talk to sales", href: "#" }}
    />
  ),
  "article-card": () => (
    <div className="grid max-w-3xl gap-6 sm:grid-cols-2">
      <ArticleCard
        title="Understanding Travel Rule compliance in APAC"
        excerpt="A comprehensive guide to navigating the evolving regulatory landscape across Asia-Pacific jurisdictions."
        date="15 February 2026"
        category="Compliance"
        author="James Cooke"
      />
      <ArticleCard
        title="How AI is transforming VASP investigations"
        excerpt="Exploring the latest advances in AI-powered compliance tooling for virtual asset service providers."
        date="10 February 2026"
        category="Technology"
      />
    </div>
  ),
  "rich-radio-list": RichRadioListPreview,
  "sequence-builder": SequenceBuilderPreview,
  "setting-row": SettingRowPreview,
  "settings-card-grid": SettingsCardGridPreview,
  "team-card": () => (
    <div className="grid max-w-3xl gap-6 sm:grid-cols-3">
      <TeamCard name="Alice Smith" role="Engineering Lead" />
      <TeamCard name="Bob Chen" role="Product Designer" />
      <TeamCard name="Carol Davis" role="Staff Engineer" />
    </div>
  ),
  chat: ChatBlockPreview,
  "prompt-input-actions": function PromptInputActionsPreview() {
    return (
      <div className="relative h-[200px] rounded-lg border bg-background">
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl px-3 pb-3 md:px-5 md:pb-5">
          <PromptInputActionsBlock
            onSubmit={async (m) => {
              await new Promise((r) => setTimeout(r, 800))
              console.log("submit:", m)
            }}
          />
        </div>
      </div>
    )
  },
  "prompt-input-suggestions": function PromptInputSuggestionsPreview() {
    return (
      <div className="rounded-lg border bg-background p-6">
        <PromptInputSuggestionsBlock
          groups={[
            {
              label: "Summary",
              highlight: "Summarize",
              items: [
                "Summarize a document",
                "Summarize a video",
                "Summarize a podcast",
                "Summarize a book",
              ],
            },
            {
              label: "Code",
              highlight: "Help me",
              items: [
                "Help me write React components",
                "Help me debug code",
                "Help me learn Python",
                "Help me learn SQL",
              ],
            },
            {
              label: "Design",
              highlight: "Design",
              items: [
                "Design a small logo",
                "Design a hero section",
                "Design a landing page",
                "Design a social media post",
              ],
            },
            {
              label: "Research",
              highlight: "Research",
              items: [
                "Research the best practices for SEO",
                "Research the best running shoes",
                "Research the best restaurants in Paris",
                "Research the best AI tools",
              ],
            },
          ]}
          onSubmit={(m) => console.log("submit:", m)}
        />
      </div>
    )
  },
}
