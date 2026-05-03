"use client"

import { FadeIn } from "@/components/ui/fade-in"
import { Separator } from "@/components/ui/separator"

const easingCurves = [
  {
    name: "EASE_OUT",
    value: "[0.22, 0.61, 0.36, 1]",
    css: "cubic-bezier(0.22, 0.61, 0.36, 1)",
    usage: "Default easing for all transitions. Starts fast, decelerates smoothly.",
  },
]

const durations = [
  {
    name: "TRANSITION_FAST",
    value: "350ms",
    usage: "Micro-interactions — hover, focus, toggle, checkbox, switch",
    examples: "Button hover, toggle state, icon transitions",
  },
  {
    name: "TRANSITION_DEFAULT",
    value: "500ms",
    usage: "Standard transitions — enter/exit, expand/collapse, page elements",
    examples: "Dialog open, accordion expand, scroll reveal",
  },
  {
    name: "Stagger delay",
    value: "100ms per item",
    usage: "Sequential reveals — card grids, list items, table rows",
    examples: "StreamingCards, stagger containers",
  },
]

const motionConstants = [
  {
    name: "FADE_UP",
    code: `{
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: EASE_OUT },
}`,
    usage: "Scroll-triggered fade-up reveal. The standard entrance animation.",
  },
  {
    name: "VIEWPORT_ONCE",
    code: `{ once: true, margin: "-80px" }`,
    usage: "Default viewport config — triggers once when 80px into view. Prevents re-triggering.",
  },
  {
    name: "STAGGER_CHILDREN",
    code: `{
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}`,
    usage: "Container variant for staggering child animations with 100ms delay between items.",
  },
  {
    name: "SLIDE_UP_VARIANT",
    code: `{
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
}`,
    usage: "Individual item variant for use inside STAGGER_CHILDREN containers.",
  },
]

const principles = [
  {
    title: "Purposeful",
    description:
      "Every animation should serve a purpose — guide attention, show relationships, or confirm actions. Never animate just for decoration.",
  },
  {
    title: "Consistent",
    description:
      "Use the shared constants (EASE_OUT, TRANSITION_DEFAULT, FADE_UP) for all animations. This creates a unified motion language across the system.",
  },
  {
    title: "Subtle",
    description:
      "Animations should feel natural and unobtrusive. The default y-offset of 24px and 500ms duration are tuned to feel smooth without being slow.",
  },
  {
    title: "Accessible",
    description:
      "Respect prefers-reduced-motion. Use CSS animations where possible (they honor the system preference automatically). For Framer Motion, check the media query.",
  },
  {
    title: "Viewport-aware",
    description:
      "Use once: true to prevent re-triggering on scroll. Use visibility-gated timers (useAnimationTimer) to pause animations when off-screen.",
  },
]

const components = [
  {
    name: "FadeIn",
    type: "CSS / IntersectionObserver",
    description:
      "Scroll-triggered fade-up. Uses CSS keyframes — automatically respects prefers-reduced-motion.",
    usage: "Page sections, cards, content blocks that enter the viewport.",
    code: `<FadeIn delay={200}>\n  <Card>Content</Card>\n</FadeIn>`,
  },
  {
    name: "Marquee",
    type: "CSS animation",
    description: "Infinite horizontal scroll with fade edges. Pauses on hover.",
    usage: "Logo rows, social proof, continuous content display.",
    code: `<Marquee duration={30}>\n  {logos}\n</Marquee>`,
  },
  {
    name: "Typewriter",
    type: "Framer Motion",
    description: "Line-by-line code/text reveal with cursor animation.",
    usage: "Code snippets, terminal output, step-by-step reveals.",
    code: `<Typewriter lines={codeLines} />`,
  },
  {
    name: "AnimatedCounter",
    type: "Framer Motion",
    description: "Animated numeric value that counts up with easing.",
    usage: "Statistics, metrics, dashboard numbers.",
    code: `<AnimatedCounter value={1234} />`,
  },
  {
    name: "StreamingCards",
    type: "Framer Motion",
    description: "Sequential card reveal with AnimatePresence.",
    usage: "Feature lists, step sequences, progressive disclosure.",
    code: `<StreamingCards items={cards} />`,
  },
  {
    name: "BgShader",
    type: "Canvas",
    description: "Dithered animated background with theme awareness. Uses requestAnimationFrame.",
    usage: "Hero sections, landing page backgrounds.",
    code: `<BgShader />`,
  },
]

const hooks = [
  {
    name: "useAnimationTimer(ms)",
    description:
      "Visibility-gated interval timer. Pauses when the component is off-screen, resumes when visible. Prevents wasted CPU cycles.",
    usage: "Cycling through states at a set interval (rotating testimonials, status indicators).",
  },
  {
    name: "useCycleIndex(length, ms)",
    description:
      "Cycling index with viewport awareness. Returns a number that increments through 0..length-1 on an interval.",
    usage: "Rotating through a fixed set of items (tabs, features, carousel).",
  },
  {
    name: "useCarouselState(count, opts)",
    description:
      "Full carousel/slider state management with auto-play, direction, and loop control.",
    usage: "Building custom carousels or sliders with consistent behavior.",
  },
]

function EasingVisual({ points }: { points: [number, number, number, number] }) {
  const [x1, y1, x2, y2] = points
  const w = 200
  const h = 120
  const pad = 16

  // Generate curve points
  const curvePoints: string[] = []
  for (let t = 0; t <= 1; t += 0.02) {
    const mt = 1 - t
    const x = 3 * mt * mt * t * x1 + 3 * mt * t * t * x2 + t * t * t
    const y = 3 * mt * mt * t * y1 + 3 * mt * t * t * y2 + t * t * t
    curvePoints.push(`${pad + x * (w - 2 * pad)},${pad + (1 - y) * (h - 2 * pad)}`)
  }

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-[120px] w-[200px]">
      {/* Grid */}
      <line
        x1={pad}
        y1={h - pad}
        x2={w - pad}
        y2={h - pad}
        className="stroke-border"
        strokeWidth="1"
      />
      <line x1={pad} y1={pad} x2={pad} y2={h - pad} className="stroke-border" strokeWidth="1" />
      {/* Diagonal reference */}
      <line
        x1={pad}
        y1={h - pad}
        x2={w - pad}
        y2={pad}
        className="stroke-muted-foreground/20"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      {/* Curve */}
      <polyline
        points={curvePoints.join(" ")}
        fill="none"
        className="stroke-primary"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Labels */}
      <text x={pad} y={h - 2} className="fill-muted-foreground text-3xs">
        0
      </text>
      <text x={w - pad - 4} y={h - 2} className="fill-muted-foreground text-3xs">
        1
      </text>
    </svg>
  )
}

export default function MotionPage() {
  return (
    <div className="max-w-4xl space-y-12">
      <div>
        <h1 className="font-bold text-3xl tracking-tight">Motion</h1>
        <p className="mt-2 text-muted-foreground">
          Animation guidelines, constants, and components for consistent motion across the design
          system.
        </p>
      </div>

      {/* Principles */}
      <section className="space-y-4">
        <h2 className="font-semibold text-xl">Principles</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p) => (
            <div key={p.title} className="rounded-lg border p-4">
              <h3 className="font-semibold text-sm">{p.title}</h3>
              <p className="mt-1.5 text-muted-foreground text-sm leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Easing */}
      <section className="space-y-4">
        <h2 className="font-semibold text-xl">Easing</h2>
        <p className="text-muted-foreground text-sm">
          A single easing curve is used across the entire system for consistency.
        </p>
        {easingCurves.map((curve) => (
          <div
            key={curve.name}
            className="flex flex-col gap-4 rounded-lg border p-6 sm:flex-row sm:items-start"
          >
            <EasingVisual points={[0.22, 0.61, 0.36, 1]} />
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <code className="rounded bg-muted px-2 py-0.5 font-mono font-semibold text-sm">
                  {curve.name}
                </code>
              </div>
              <p className="text-muted-foreground text-sm">{curve.usage}</p>
              <code className="block rounded bg-muted px-3 py-2 font-mono text-muted-foreground text-xs">
                {curve.css}
              </code>
            </div>
          </div>
        ))}
      </section>

      <Separator />

      {/* Duration */}
      <section className="space-y-4">
        <h2 className="font-semibold text-xl">Duration</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-2.5 text-left font-medium">Constant</th>
                <th className="px-4 py-2.5 text-left font-medium">Duration</th>
                <th className="px-4 py-2.5 text-left font-medium">Usage</th>
                <th className="px-4 py-2.5 text-left font-medium">Examples</th>
              </tr>
            </thead>
            <tbody>
              {durations.map((d) => (
                <tr key={d.name} className="border-b last:border-0">
                  <td className="px-4 py-2.5 font-medium font-mono text-xs">{d.name}</td>
                  <td className="px-4 py-2.5 font-mono text-muted-foreground text-xs">{d.value}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{d.usage}</td>
                  <td className="px-4 py-2.5 text-muted-foreground text-xs">{d.examples}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Separator />

      {/* Motion Constants */}
      <section className="space-y-4">
        <h2 className="font-semibold text-xl">Motion Constants</h2>
        <p className="text-muted-foreground text-sm">
          Pre-defined motion presets exported from{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">@cogentic/ds</code>.
          Use these instead of hand-rolling animation configs.
        </p>
        <div className="space-y-3">
          {motionConstants.map((c) => (
            <div key={c.name} className="rounded-lg border p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <code className="rounded bg-muted px-2 py-0.5 font-mono font-semibold text-sm">
                    {c.name}
                  </code>
                  <p className="mt-2 text-muted-foreground text-sm">{c.usage}</p>
                </div>
              </div>
              <pre className="mt-3 overflow-x-auto rounded bg-muted p-3 font-mono text-muted-foreground text-xs">
                {c.code}
              </pre>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Live Demo */}
      <section className="space-y-4">
        <h2 className="font-semibold text-xl">Live Demo — FadeIn</h2>
        <p className="text-muted-foreground text-sm">
          Scroll down to see FadeIn in action with staggered delays.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {[0, 100, 200].map((delay) => (
            <FadeIn key={delay} delay={delay}>
              <div className="rounded-lg border p-6 text-center">
                <p className="font-medium text-sm">delay={delay}ms</p>
                <p className="mt-1 text-muted-foreground text-xs">Fades in on scroll</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <Separator />

      {/* Animation Components */}
      <section className="space-y-4">
        <h2 className="font-semibold text-xl">Animation Components</h2>
        <div className="space-y-3">
          {components.map((c) => (
            <div key={c.name} className="rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <code className="rounded bg-muted px-2 py-0.5 font-mono font-semibold text-sm">
                  {c.name}
                </code>
                <span className="rounded-full bg-muted px-2 py-0.5 font-medium text-2xs text-muted-foreground uppercase tracking-wider">
                  {c.type}
                </span>
              </div>
              <p className="mt-2 text-muted-foreground text-sm">{c.description}</p>
              <p className="mt-1 text-muted-foreground text-xs">
                <span className="font-medium text-foreground">When to use:</span> {c.usage}
              </p>
              <pre className="mt-3 overflow-x-auto rounded bg-muted p-3 font-mono text-muted-foreground text-xs">
                {c.code}
              </pre>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Hooks */}
      <section className="space-y-4">
        <h2 className="font-semibold text-xl">Animation Hooks</h2>
        <div className="space-y-3">
          {hooks.map((h) => (
            <div key={h.name} className="rounded-lg border p-4">
              <code className="rounded bg-muted px-2 py-0.5 font-mono font-semibold text-sm">
                {h.name}
              </code>
              <p className="mt-2 text-muted-foreground text-sm">{h.description}</p>
              <p className="mt-1 text-muted-foreground text-xs">
                <span className="font-medium text-foreground">When to use:</span> {h.usage}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Reduced Motion */}
      <section className="space-y-4">
        <h2 className="font-semibold text-xl">Reduced Motion</h2>
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
          <h3 className="font-semibold text-amber-700 text-sm dark:text-amber-400">
            Accessibility Requirement
          </h3>
          <div className="mt-2 space-y-2 text-muted-foreground text-sm">
            <p>
              Always respect the{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                prefers-reduced-motion
              </code>{" "}
              media query.
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li>
                <strong>CSS animations</strong> (FadeIn, Marquee) — automatically disabled via the
                global{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                  @media (prefers-reduced-motion: reduce)
                </code>{" "}
                rule.
              </li>
              <li>
                <strong>Framer Motion</strong> — use the{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                  useReducedMotion()
                </code>{" "}
                hook and conditionally skip animations.
              </li>
              <li>
                <strong>Canvas/rAF</strong> (BgShader) — reduce or stop animation when reduced
                motion is preferred.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
