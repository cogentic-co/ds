"use client"

import { ArticleCard } from "@/blocks/article-card"
import { PageCta } from "@/blocks/page-cta"
import { PricingTable } from "@/blocks/pricing-table"
import { TeamCard } from "@/blocks/team-card"
import { FeatureSection } from "@/src/blocks/feature-section"
import { ForgotPasswordForm } from "@/src/blocks/forgot-password-form"
import { HeroSection } from "@/src/blocks/hero-section"
import { LoginForm } from "@/src/blocks/login-form"
import { MagicLinkMessage } from "@/src/blocks/magic-link-message"
import { RegisterForm } from "@/src/blocks/register-form"
import { SelectOrgForm } from "@/src/blocks/select-org-form"
import { StatCard } from "@/src/blocks/stat-card"
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
  return (
    <div className="mx-auto max-w-md">
      <MagicLinkMessage
        email="you@example.com"
        onResend={() => console.log("resend")}
        onBack={() => console.log("back")}
      />
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
  "team-card": () => (
    <div className="grid max-w-3xl gap-6 sm:grid-cols-3">
      <TeamCard name="Alice Smith" role="Engineering Lead" />
      <TeamCard name="Bob Chen" role="Product Designer" />
      <TeamCard name="Carol Davis" role="Staff Engineer" />
    </div>
  ),
}
