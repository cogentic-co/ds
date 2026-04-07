import type { ComponentMeta } from "../index"

// ── Animation ──
export const animationMeta: Record<string, ComponentMeta> = {
  "bg-shader": {
    status: "stable",
    description: "Canvas-based dithered animated background, theme-aware.",
    since: "0.1.0",
    importStatement: 'import { BgShader } from "@cogentic-co/ds/bg-shader"',
    dos: ["Use as a hero or section background", "Let it respond to theme changes automatically"],
    donts: [
      "Don't use multiple BgShaders on one page — it's GPU intensive",
      "Don't place over text without sufficient contrast",
    ],
  },
  "blocky-shader": {
    status: "new",
    description: "ASCII art canvas shader with monospace character density mapping.",
    since: "0.4.0",
    importStatement: 'import { BlockyShader } from "@cogentic-co/ds/blocky-shader"',
    dos: ["Use as a subtle background texture", "Pair with content that has sufficient contrast"],
    donts: ["Don't use alongside other shaders on the same page"],
    codeExample: `import { BlockyShader } from "@cogentic-co/ds/blocky-shader"

<div className="relative h-64">
  <BlockyShader />
  <div className="relative z-10">Content here</div>
</div>`,
  },
  "ascii-shader": {
    status: "new",
    description:
      "Animated ASCII art shader with opacity-scaled characters and mobile optimization.",
    since: "0.4.0",
    importStatement: 'import { AsciiShader } from "@cogentic-co/ds/ascii-shader"',
    dos: ["Use as an ambient background effect", "Uses larger cells on mobile for performance"],
    donts: ["Don't use alongside other shaders on the same page"],
    codeExample: `import { AsciiShader } from "@cogentic-co/ds/ascii-shader"

<div className="relative h-64">
  <AsciiShader />
  <div className="relative z-10">Content here</div>
</div>`,
  },
  "subtle-shader": {
    status: "new",
    description: "Canvas radial gradient blob animation with palette options.",
    since: "0.4.0",
    importStatement: 'import { SubtleShader } from "@cogentic-co/ds/subtle-shader"',
    dos: [
      "Use as a subtle ambient background effect",
      "Choose a palette that complements the section content",
    ],
    donts: ["Don't layer over low-contrast text", "Don't use alongside BgShader — pick one"],
    codeExample: `import { SubtleShader } from "@cogentic-co/ds/subtle-shader"

<div className="relative h-64">
  <SubtleShader palette="blue" />
  <div className="relative z-10">Content here</div>
</div>`,
  },
  "deadline-countdown": {
    status: "new",
    description:
      "Displays time remaining until a regulatory deadline with auto-detected urgency states.",
    since: "0.5.0",
    importStatement: 'import { DeadlineCountdown } from "@cogentic-co/ds/deadline-countdown"',
    dos: [
      "Use for regulatory deadlines, review due dates, expiration dates",
      "Let urgency auto-detect based on thresholds unless you need to override",
      "Add a label prefix for context (e.g. 'Due in')",
    ],
    donts: [
      "Don't use for general timers — this is purpose-built for deadlines",
      "Don't set warningDays lower than criticalDays",
    ],
    codeExample: `import { DeadlineCountdown } from "@cogentic-co/ds/deadline-countdown"

<DeadlineCountdown deadline={new Date("2026-04-01")} label="Due in" />
<DeadlineCountdown deadline={pastDate} urgency="overdue" />`,
  },
  "policy-banner": {
    status: "new",
    description:
      "Dismissible banner for policy acknowledgments, regulatory alerts, or system-wide notices.",
    since: "0.5.0",
    importStatement: 'import { PolicyBanner } from "@cogentic-co/ds/policy-banner"',
    dos: [
      "Use for regulatory alerts, policy changes, or system-wide notices",
      "Add an icon for quick visual scanning",
      "Include an action button for critical banners that need immediate response",
    ],
    donts: [
      "Don't use for toast notifications — use Sonner instead",
      "Don't use for inline form errors — use Alert instead",
      "Don't stack more than 2 banners on a page",
    ],
    codeExample: `import { PolicyBanner } from "@cogentic-co/ds/policy-banner"

<PolicyBanner variant="warning" icon={<AlertTriangle />}>
  Your AML policy expires in 7 days.
</PolicyBanner>

<PolicyBanner
  variant="critical"
  action={<Button size="sm">Review Now</Button>}
>
  Regulatory deadline missed.
</PolicyBanner>`,
  },
  "status-indicator": {
    status: "new",
    description: "Coloured dot indicating live status — online, offline, busy, away, or pending.",
    since: "0.5.0",
    importStatement: 'import { StatusIndicator } from "@cogentic-co/ds/status-indicator"',
    dos: [
      "Use to show real-time entity status (users, services, agents)",
      "Add pulse for active/processing states",
      "Overlay on avatars with ring-2 ring-background for badge positioning",
    ],
    donts: [
      "Don't use as a generic coloured dot — use Badge for labels",
      "Don't pulse offline or away states",
    ],
    codeExample: `import { StatusIndicator } from "@cogentic-co/ds/status-indicator"

<StatusIndicator variant="online" />
<StatusIndicator variant="busy" pulse />
<StatusIndicator variant="offline" size="lg" />`,
  },
  "striped-bar": {
    status: "deprecated",
    description:
      'Deprecated — use WaffleChart with mode="bar" instead. Alias kept for backwards compatibility.',
    since: "0.3.0",
    importStatement: 'import { StripedBar } from "@cogentic-co/ds/striped-bar"',
    dos: [
      "Use for proportional breakdowns (exposure, allocation, composition)",
      "Pair with a legend below showing segment labels and percentages",
      "Use semantic colors that match your risk/category meanings",
    ],
    donts: [
      "Don't use for progress — use Progress instead",
      "Don't use more than 5-6 segments — it becomes hard to read",
      "Don't use without a legend — colors alone are insufficient",
    ],
    codeExample: `import { StripedBar } from "@cogentic-co/ds/striped-bar"

<StripedBar
  segments={[
    { value: 45, color: "#f87171", label: "Sanctions" },
    { value: 25, color: "#fb923c", label: "Mixer" },
    { value: 15, color: "#facc15", label: "Darknet" },
  ]}
  stripes={60}
  animated
  duration={800}
/>`,
  },
  "waffle-chart": {
    status: "new",
    description:
      "Canvas-based animated proportional chart with two modes: grid (waffle squares) and bar (horizontal stripes).",
    since: "0.5.0",
    importStatement: 'import { WaffleChart } from "@cogentic-co/ds/waffle-chart"',
    dos: [
      "Use grid mode for part-to-whole comparisons where magnitude matters",
      "Use bar mode for compact inline breakdowns",
      "Pair with a legend showing segment labels and percentages",
      "Use the animate prop for entry animations on scroll",
    ],
    donts: [
      "Don't use more than 5-6 segments — too many colors become hard to read",
      "Don't use without a legend — colors alone are insufficient",
      "Don't use for continuous data — use LineChart or AreaChart instead",
    ],
    codeExample: `import { WaffleChart } from "@cogentic-co/ds/waffle-chart"

// Grid mode (default)
<WaffleChart
  segments={[
    { value: 45, color: "#f87171", label: "Sanctions" },
    { value: 25, color: "#fb923c", label: "Mixer" },
  ]}
  animate
/>

// Bar mode
<WaffleChart
  mode="bar"
  segments={[
    { value: 45, color: "#f87171", label: "Sanctions" },
    { value: 25, color: "#fb923c", label: "Mixer" },
  ]}
  stripes={80}
/>`,
  },
  "risk-gauge": {
    status: "new",
    description: "Segmented bar gauge for displaying risk scores or trust levels.",
    since: "0.4.0",
    importStatement: 'import { RiskGauge } from "@cogentic-co/ds/risk-gauge"',
    dos: ["Use tier to communicate severity semantically", "Provide a label for context"],
    donts: [
      "Don't use for progress indicators — use Progress instead",
      "Don't use arbitrary tier names — stick to predefined tiers",
    ],
    codeExample: `import { RiskGauge } from "@cogentic-co/ds/risk-gauge"

<RiskGauge score={75} tier="high" label="Risk Level" />
<RiskGauge score={90} tier="critical" size="lg" label="Trust Score" />`,
  },
  "fade-in": {
    status: "stable",
    description: "CSS scroll-triggered fade-up via IntersectionObserver.",
    since: "0.1.0",
    importStatement: 'import { FadeIn } from "@cogentic-co/ds/fade-in"',
    dos: [
      "Use for content that should animate on scroll",
      "Stagger delays for sequential elements",
    ],
    donts: [
      "Don't animate above-the-fold content — it should be visible immediately",
      "Don't use on critical interactive elements",
    ],
    codeExample: `import { FadeIn } from "@cogentic-co/ds/fade-in"

<FadeIn delay={200}>
  <Card>Fades in on scroll</Card>
</FadeIn>`,
  },
  marquee: {
    status: "stable",
    description: "Infinite horizontal scroll with fade edges.",
    since: "0.1.0",
    importStatement: 'import { Marquee } from "@cogentic-co/ds/marquee"',
    dos: ["Use for logo walls or testimonial tickers", "Set a comfortable speed (30-60s duration)"],
    donts: [
      "Don't use for important content users need to read",
      "Don't use for interactive elements",
    ],
    codeExample: `import { Marquee } from "@cogentic-co/ds/marquee"

<Marquee duration={40}>
  <Logo1 /><Logo2 /><Logo3 />
</Marquee>`,
  },
  typewriter: {
    status: "stable",
    description: "Line-by-line code/text reveal animation.",
    since: "0.1.0",
    importStatement: 'import { Typewriter } from "@cogentic-co/ds/typewriter"',
    dos: [
      "Use for code demos and terminal-style reveals",
      "Keep the content short enough to maintain interest",
    ],
    donts: ["Don't use for body text — it's too slow to read"],
  },
  "animated-counter": {
    status: "stable",
    description: "Animated numeric value with easing.",
    since: "0.1.0",
    importStatement: 'import { AnimatedCounter } from "@cogentic-co/ds/animated-counter"',
    dos: ["Use for KPI displays and stat sections", "Trigger on scroll visibility for best effect"],
    donts: ["Don't use for rapidly updating values — it can't keep up"],
    codeExample: `import { AnimatedCounter } from "@cogentic-co/ds/animated-counter"

<AnimatedCounter value={1234} duration={2000} />`,
  },
  "streaming-cards": {
    status: "stable",
    description: "Sequential card reveal with AnimatePresence.",
    since: "0.1.0",
    importStatement: 'import { StreamingCards } from "@cogentic-co/ds/streaming-cards"',
    dos: [
      "Use for onboarding flows or feature showcases",
      "Keep the number of cards manageable (3-6)",
    ],
    donts: ["Don't use for content that users need to see all at once"],
  },
}
