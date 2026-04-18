"use client"

import { RingCard } from "@/components/ui/ring-card"
import { Section } from "./_shared"

export default function RingCardPreview() {
  return (
    <div className="space-y-10">
      <Section title="Default — hover any card to see the stack lift">
        <div className="grid max-w-4xl grid-cols-1 gap-6 pt-4 md:grid-cols-3">
          <RingCard>
            <div className="font-mono font-semibold text-[11px] text-muted-foreground uppercase tracking-wider">
              Flagged
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span
                className="font-mono font-semibold leading-none"
                style={{ fontSize: 42, letterSpacing: "-0.03em" }}
              >
                12
              </span>
              <span className="font-mono text-muted-foreground text-xs">/ 1,482</span>
            </div>
            <div className="mt-2 text-muted-foreground text-xs">+2 since yesterday</div>
          </RingCard>

          <RingCard>
            <div className="font-mono font-semibold text-[11px] text-muted-foreground uppercase tracking-wider">
              Risk score
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span
                className="font-mono font-semibold leading-none"
                style={{
                  fontSize: 42,
                  letterSpacing: "-0.03em",
                  color: "var(--blush-ink)",
                }}
              >
                78
              </span>
              <span className="font-mono text-muted-foreground text-xs">/ 100</span>
            </div>
            <div
              className="mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold text-[11px]"
              style={{
                background: "color-mix(in oklab, var(--blush) 70%, transparent)",
                color: "var(--blush-ink)",
              }}
            >
              Needs review
            </div>
          </RingCard>

          <RingCard>
            <div className="font-mono font-semibold text-[11px] text-muted-foreground uppercase tracking-wider">
              Volume (24h)
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span
                className="font-mono font-semibold leading-none"
                style={{ fontSize: 42, letterSpacing: "-0.03em" }}
              >
                $1.24M
              </span>
            </div>
            <div
              className="mt-2 font-mono font-semibold text-[11px]"
              style={{ color: "var(--success)" }}
            >
              +12% vs 7d
            </div>
          </RingCard>
        </div>
      </Section>

      <Section title="Solid (no fade mask) — for full-content cards">
        <div className="max-w-xl pt-4">
          <RingCard solid>
            <h3 className="font-semibold">Solid body</h3>
            <p className="mt-2 text-muted-foreground text-sm">
              Use <code className="font-mono text-xs">solid</code> when the card's content needs to
              read edge-to-edge without the bottom fade. Rings still lift on hover.
            </p>
          </RingCard>
        </div>
      </Section>
    </div>
  )
}
