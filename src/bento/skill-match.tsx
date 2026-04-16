"use client"

import { motion, useInView } from "motion/react"
import { Check } from "pixelarticons/react"
import { type ComponentProps, useRef } from "react"
import { Badge } from "../components/badge"
import { cn } from "../lib/utils"
import type { SkillMatchRequirement } from "./types"

export interface SkillMatchProps extends ComponentProps<"div"> {
  case: { id: string; meta?: string }
  analyst: { name: string; role?: string }
  requirements: SkillMatchRequirement[]
}

/**
 * Two-column skill matcher: case requirements ↔ analyst skills with a
 * check (or ×) between matched pairs. Footer summarises `matched/total`.
 */
export function SkillMatch({
  case: caseInfo,
  analyst,
  requirements,
  className,
  ...props
}: SkillMatchProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const matchedCount = requirements.filter((r) => r.matched).length
  const total = requirements.length

  return (
    <div ref={ref} data-slot="bento-skill-match" className={className} {...props}>
      <div className="flex h-full flex-col justify-center p-4">
        <div className="mb-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <div className="min-w-0">
            <p className="font-semibold text-muted-foreground text-xxs uppercase tracking-wider">Case</p>
            <p className="truncate font-semibold text-foreground text-xs">{caseInfo.id}</p>
            {caseInfo.meta && (
              <p className="truncate text-muted-foreground text-xxs">{caseInfo.meta}</p>
            )}
          </div>
          <span aria-hidden className="text-muted-foreground/60">
            ↔
          </span>
          <div className="min-w-0 text-right">
            <p className="font-semibold text-muted-foreground text-xxs uppercase tracking-wider">
              Analyst
            </p>
            <p className="truncate font-semibold text-foreground text-xs">{analyst.name}</p>
            {analyst.role && (
              <p className="truncate text-muted-foreground text-xxs">{analyst.role}</p>
            )}
          </div>
        </div>

        <ul className="space-y-1.5">
          {requirements.map((r, i) => (
            <motion.li
              key={r.label}
              className="grid grid-cols-[1fr_auto_1fr] items-center gap-2"
              initial={{ opacity: 0, y: 4 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.3, ease: "easeOut" }}
            >
              <span className="truncate text-right text-muted-foreground text-xxs">{r.label}</span>
              <span
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  r.matched
                    ? "border-success bg-success/15 text-success"
                    : "border-muted bg-card text-muted-foreground",
                )}
                aria-label={r.matched ? "Matched" : "Not matched"}
              >
                {r.matched ? (
                  <Check width={10} height={10} />
                ) : (
                  <span aria-hidden className="text-xs leading-none">
                    ×
                  </span>
                )}
              </span>
              <span
                className={cn(
                  "truncate text-xxs",
                  r.matched ? "font-medium text-foreground" : "text-muted-foreground line-through",
                )}
              >
                {r.detail || r.label}
              </span>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ delay: 0.7, duration: 0.3 }}
          className="mt-3 flex items-center justify-end"
        >
          <Badge
            variant="secondary"
            className={cn(
              "rounded-sm text-xxs",
              matchedCount === total ? "bg-success/10 text-success" : "bg-warning/10 text-warning",
            )}
          >
            {matchedCount} / {total} matched
          </Badge>
        </motion.div>
      </div>
    </div>
  )
}
