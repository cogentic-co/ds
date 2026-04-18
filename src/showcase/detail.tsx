"use client"

import { motion, useInView } from "motion/react"
import { type ComponentProps, useRef } from "react"
import { Badge } from "../components/badge"
import { cn } from "../lib/utils"
import type { DetailLine } from "./types"

type Parsed =
  | { kind: "weight"; from: number; to: number; changed: boolean }
  | { kind: "text"; from: string; to: string; changed: boolean }

function parseValue(value: string): Parsed {
  const rawParts = value.split("→").map((s) => s.trim())
  const fromRaw = rawParts[0] ?? ""
  const toRaw = rawParts.length > 1 ? (rawParts[1] ?? "") : fromRaw
  const changed = rawParts.length > 1 && fromRaw !== toRaw

  const weightRe = /^0?\.\d+$|^[01](?:\.0+)?$/
  if (weightRe.test(fromRaw) && weightRe.test(toRaw)) {
    return {
      kind: "weight",
      from: Number.parseFloat(fromRaw),
      to: Number.parseFloat(toRaw),
      changed,
    }
  }

  return { kind: "text", from: fromRaw, to: toRaw, changed }
}

export interface DetailProps extends ComponentProps<"div"> {
  title: string
  badge?: string
  lines: DetailLine[]
}

/**
 * Before/after detail card. Values with two sides separated by `→`
 * render as a diff. Values that look like bare decimals in [0, 1] get a
 * weight-bar treatment; otherwise they render as text with strike-through
 * on the "from" side.
 */
export function Detail({ title, badge, lines, className, ...props }: DetailProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  const firstParsed = lines.length > 0 ? parseValue(lines[0].value) : null
  const isWeightConfig = firstParsed?.kind === "weight"

  return (
    <div
      ref={ref}
      data-slot="showcase-detail"
      className={cn("flex h-full items-center justify-center p-6", className)}
      {...props}
    >
      <div className="w-full max-w-[380px]">
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-foreground text-xs">{title}</p>
              {isWeightConfig && (
                <p className="text-muted-foreground text-xxs">Weights sum to 1.00</p>
              )}
            </div>
            {badge && (
              <Badge variant="tagline" className="shrink-0 rounded-sm text-xxs">
                {badge}
              </Badge>
            )}
          </div>

          <ul className="space-y-3.5">
            {lines.map((line, i) => {
              const parsed = parseValue(line.value)
              return (
                <motion.li
                  key={line.label}
                  initial={{ opacity: 0, x: -6 }}
                  animate={inView ? { opacity: 1, x: 0 } : undefined}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.3, ease: "easeOut" }}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="truncate font-semibold text-muted-foreground text-xxs uppercase tracking-wider">
                      {line.label}
                    </span>
                    <span className="shrink-0 text-right font-mono text-xs tabular-nums">
                      {renderValue(parsed)}
                    </span>
                  </div>

                  {parsed.kind === "weight" && (
                    <WeightBar parsed={parsed} delay={0.3 + i * 0.08} inView={inView} />
                  )}

                  <div
                    className={cn(
                      "flex items-center justify-end gap-1.5",
                      parsed.kind === "weight" ? "mt-1.5" : "mt-1",
                    )}
                  >
                    <span className="text-muted-foreground text-xxs">Source:</span>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "rounded-sm text-xxs",
                        parsed.changed && parsed.kind === "weight"
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground",
                      )}
                    >
                      {line.source}
                    </Badge>
                  </div>
                </motion.li>
              )
            })}
          </ul>

          {isWeightConfig && (
            <p className="mt-4 text-muted-foreground text-xxs">
              Every change logs a reason and shows impact analysis before taking effect.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function renderValue(parsed: Parsed) {
  const ARROW = "\u2192"
  if (parsed.kind === "weight") {
    if (parsed.changed) {
      return (
        <>
          <span className="text-muted-foreground line-through">{parsed.from.toFixed(2)}</span>
          <span className="mx-1 text-muted-foreground" aria-hidden>
            {ARROW}
          </span>
          <span className="font-semibold text-primary">{parsed.to.toFixed(2)}</span>
        </>
      )
    }
    return <span className="font-semibold text-foreground">{parsed.to.toFixed(2)}</span>
  }

  if (parsed.changed) {
    return (
      <>
        <span className="text-muted-foreground line-through">{parsed.from}</span>
        <span className="mx-1 text-muted-foreground" aria-hidden>
          {ARROW}
        </span>
        <span className="font-semibold text-foreground">{parsed.to}</span>
      </>
    )
  }
  return <span className="font-semibold text-foreground">{parsed.to}</span>
}

function WeightBar({
  parsed,
  delay,
  inView,
}: {
  parsed: Extract<Parsed, { kind: "weight" }>
  delay: number
  inView: boolean
}) {
  const pct = Math.min(100, Math.max(0, parsed.to * 100))
  const fromPct = Math.min(100, Math.max(0, parsed.from * 100))

  return (
    <div className="relative mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
      {parsed.changed && (
        <span
          className="absolute top-0 left-0 h-full rounded-full bg-muted-foreground/25"
          style={{ width: `${fromPct}%` }}
          aria-hidden
        />
      )}
      <motion.span
        className={cn(
          "absolute top-0 left-0 h-full rounded-full",
          parsed.changed ? "bg-primary" : "bg-foreground/60",
        )}
        initial={{ width: 0 }}
        animate={inView ? { width: `${pct}%` } : undefined}
        transition={{ delay, duration: 0.7, ease: "easeOut" }}
      />
    </div>
  )
}
