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
import { StatCard } from "@/src/blocks/stat-card"
import { Button } from "@/src/components/button"
import { Card } from "@/src/components/card"
import { Separator } from "@/src/components/separator"
import { Switch } from "@/src/components/switch"
import { type ControlDefs, Playground, useControls } from "../../controls"

// ── Stat Card ──────────────────────────────────────────────────────────

const statCardControlDefs = {
  label: { type: "text", defaultValue: "Revenue", label: "Label" },
  value: { type: "text", defaultValue: "$12,400", label: "Value" },
  trend: { type: "text", defaultValue: "+12%", label: "Trend" },
  trendDirection: {
    type: "select",
    options: ["up", "down", "neutral"],
    defaultValue: "up",
    label: "Direction",
  },
} satisfies ControlDefs

function StatCardPreview() {
  const controls = useControls(statCardControlDefs)
  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <div className="max-w-xs">
          <StatCard
            label={controls.values.label}
            value={controls.values.value}
            description="vs last month"
            trend={controls.values.trend || undefined}
            trendDirection={controls.values.trendDirection as "up"}
          />
        </div>
      </Playground>

      <div className="grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Revenue"
          value="$12,400"
          description="vs last month"
          trend="+12%"
          trendDirection="up"
        />
        <StatCard
          label="Users"
          value="1,234"
          description="active this week"
          trend="-3%"
          trendDirection="down"
        />
        <StatCard label="Orders" value="89" description="today" trend="+5%" trendDirection="up" />
        <StatCard label="Conversion" value="3.2%" description="30-day avg" />
      </div>
    </div>
  )
}

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
        <Button variant="outline" size="sm" onClick={() => { setMlEmail("you@example.com"); setMlState("sent") }}>
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

// ── Static block previews ──────────────────────────────────────────────

export const blockPreviews: Record<string, React.ComponentType> = {
  "stat-card": StatCardPreview,
  "feature-section": FeatureSectionPreview,
  "hero-section": HeroSectionPreview,
  "login-form": LoginFormPreview,
  "register-form": RegisterFormPreview,
  "forgot-password-form": ForgotPasswordFormPreview,
  "select-org-form": SelectOrgFormPreview,
  "magic-link-message": MagicLinkMessagePreview,
  "pricing-table": () => <PricingTable />,
  "product-tour": ProductTourPreview,
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
}
