"use client"

import { motion, useInView } from "motion/react"
import { Check, Lock, User } from "pixelarticons/react"
import { type ComponentProps, useRef } from "react"
import { Badge } from "../components/badge"
import type { DecisionRecordContext } from "./types"

export interface DecisionRecordProps extends ComponentProps<"div"> {
  decision: string
  decidedBy: string
  role?: string
  at: string
  case?: string
  context: DecisionRecordContext[]
}

/**
 * Audit-trail decision record — who decided what, when, with the
 * supporting context captured at decision time as chips and a sealed
 * footer to convey immutability.
 */
export function DecisionRecord({
  decision,
  decidedBy,
  role,
  at,
  case: caseId,
  context,
  className,
  ...props
}: DecisionRecordProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <div ref={ref} data-slot="bento-decision-record" className={className} {...props}>
      <div className="flex h-full flex-col justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.15, duration: 0.3, ease: "easeOut" }}
          className="rounded-lg border border-success/30 bg-success/5 p-3"
        >
          <div className="flex items-center gap-2">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-success/15 text-success">
              <Check width={14} height={14} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-muted-foreground text-xxs uppercase tracking-wider">
                Decision
              </p>
              <p className="truncate font-semibold text-foreground text-sm">{decision}</p>
            </div>
            {caseId && (
              <Badge variant="secondary" className="whitespace-nowrap rounded-sm text-xxs">
                {caseId}
              </Badge>
            )}
          </div>

          <div className="mt-2 flex items-center gap-1.5 text-muted-foreground text-xxs">
            <User width={11} height={11} />
            <span className="font-medium text-foreground/80">{decidedBy}</span>
            {role && <span>· {role}</span>}
            <span>·</span>
            <span className="font-mono tabular-nums">{at}</span>
          </div>
        </motion.div>

        <div className="mt-3">
          <p className="mb-1.5 font-semibold text-muted-foreground text-xxs uppercase tracking-wider">
            Context captured
          </p>
          <ul className="flex flex-wrap gap-1">
            {context.map((ctx, i) => (
              <motion.li
                key={ctx.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : undefined}
                transition={{ delay: 0.35 + i * 0.06, duration: 0.25, ease: "easeOut" }}
              >
                <span className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/40 px-1.5 py-0.5 text-xxs">
                  <span className="text-muted-foreground">{ctx.label}:</span>
                  <span className="font-medium text-foreground/90">{ctx.value}</span>
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ delay: 0.8, duration: 0.3 }}
          className="mt-3 flex items-center gap-1.5 text-muted-foreground text-xxs"
        >
          <Lock width={10} height={10} className="text-success" />
          <span>Sealed · immutable record</span>
        </motion.div>
      </div>
    </div>
  )
}
