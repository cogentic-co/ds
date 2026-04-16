"use client"

import { motion, useInView } from "motion/react"
import { type ComponentProps, useRef } from "react"
import { AnimatedCounter } from "../components/animated-counter"
import { WaffleChart } from "../components/waffle-chart"
import { useResolvedCssVars } from "../hooks/use-css-vars"
import type { ScoreDimension } from "./types"

const COLOR_VAR: Record<ScoreDimension["color"], string> = {
  primary: "--primary",
  destructive: "--destructive",
  success: "--success",
  warning: "--warning",
}

const VAR_NAMES = Object.values(COLOR_VAR)

export interface ScoreProps extends ComponentProps<"div"> {
  title: string
  score: number
  max: number
  dimensions: ScoreDimension[]
}

/**
 * Composite-score bento — headline numeric score with a waffle-chart
 * breakdown by dimension. Dimension values are normalised so the total
 * filled cell count approximates `score`.
 */
export function Score({ title, score, max, dimensions, className, ...props }: ScoreProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const colors = useResolvedCssVars(VAR_NAMES)
  const ready = Object.keys(colors).length > 0 && inView

  const sum = dimensions.reduce((acc, d) => acc + d.value, 0) || 1
  const segments = dimensions.map((d) => ({
    value: Math.round((d.value / sum) * score),
    color: colors[COLOR_VAR[d.color]] || undefined,
    label: d.label,
  }))

  return (
    <div ref={ref} data-slot="bento-score" className={className} {...props}>
      <div className="flex h-full flex-col justify-center gap-3 p-5">
        <div>
          <p className="font-semibold text-muted-foreground text-xxs">{title}</p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-bold text-3xl text-foreground">
              {inView ? <AnimatedCounter value={score} /> : "0"}
            </span>
            <span className="text-muted-foreground text-sm">/ {max}</span>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_1.1fr] items-center gap-3">
          <div className="flex items-center justify-center">
            {ready && (
              <WaffleChart segments={segments} rows={10} cols={10} size="sm" animate duration={1000} />
            )}
          </div>

          <ul className="space-y-1.5">
            {dimensions.map((d, i) => (
              <motion.li
                key={d.label}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: 4 }}
                animate={inView ? { opacity: 1, x: 0 } : undefined}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.3, ease: "easeOut" }}
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-sm"
                  style={{ backgroundColor: colors[COLOR_VAR[d.color]] || undefined }}
                />
                <span className="flex-1 truncate text-muted-foreground text-xxs">{d.label}</span>
                <span className="font-mono font-semibold tabular-nums text-foreground text-xxs">
                  {d.value}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
