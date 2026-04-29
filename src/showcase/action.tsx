"use client"

import { motion, useInView } from "motion/react"
import { type ComponentProps, useEffect, useRef, useState } from "react"
import { Button } from "../components/button"
import { Header } from "../components/header"
import { cn } from "../lib/utils"
import type { ActionSummaryLine } from "./types"

export interface ActionProps extends ComponentProps<"div"> {
  summary: ActionSummaryLine[]
  recommendation: string
  actions: string[]
  selectedAction: string
  auditLine?: string
}

/**
 * Decision-capture showcase. Renders an entity header summary, a
 * recommendation pill, a row of action buttons (one selected, others
 * outlined) and a trailing audit line that locks in after ~1.8s.
 */
export function Action({
  summary,
  recommendation,
  actions,
  selectedAction,
  auditLine,
  className,
  ...props
}: ActionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const [decided, setDecided] = useState(false)

  useEffect(() => {
    if (!inView) return
    const timer = setTimeout(() => setDecided(true), 1800)
    return () => clearTimeout(timer)
  }, [inView])

  const [primary, ...secondary] = summary
  const entityName = primary?.value ?? "Summary"
  const entitySubtitle = primary?.label

  return (
    <div
      ref={ref}
      data-slot="showcase-action"
      className={cn("flex h-full items-center justify-center p-6", className)}
      {...props}
    >
      <div className="w-full max-w-[320px] space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.2, duration: 0.35, ease: "easeOut" }}
          className="rounded-xl border border-border bg-card p-3"
        >
          <Header
            size="sm"
            title={entityName}
            subtitle={entitySubtitle}
            meta={secondary.map((line) => ({ text: `${line.label}: ${line.value}` }))}
          />
        </motion.div>

        <motion.div
          className="rounded-lg border border-warning/30 bg-warning/5 px-3 py-2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ delay: 0.9, duration: 0.3 }}
        >
          <p className="font-medium text-warning text-xxs">▲ {recommendation}</p>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center gap-1.5"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ delay: 1.2, duration: 0.3 }}
        >
          {actions.map((action) => {
            const isSelected = action === selectedAction
            const locked = decided && isSelected
            return (
              <Button
                key={action}
                size="sm"
                variant={locked ? "outline" : isSelected ? "default" : "outline"}
                tabIndex={-1}
                aria-hidden
                className={cn(
                  "whitespace-nowrap",
                  locked && "border-success/50 bg-success/10 text-success hover:bg-success/15",
                )}
              >
                {locked ? `✓ ${action}` : action}
              </Button>
            )
          })}
        </motion.div>

        {decided && auditLine && (
          <motion.p
            className="text-muted-foreground text-xxs"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            🔒 {auditLine}
          </motion.p>
        )}
      </div>
    </div>
  )
}
