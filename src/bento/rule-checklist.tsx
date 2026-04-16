"use client"

import { motion, useInView } from "motion/react"
import { Check } from "pixelarticons/react"
import { type ComponentProps, useRef } from "react"
import { Badge } from "../components/badge"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "../components/item"
import { cn } from "../lib/utils"
import type { ChecklistItem } from "./types"

export interface RuleChecklistProps extends ComponentProps<"div"> {
  heading?: string
  items: ChecklistItem[]
}

/**
 * Rule-builder bento — renders each item as a condition. Labels that
 * match `<operand> <operator> <value>` (operators: >=, <=, >, <, =, is,
 * in, matches, exceeds, equals) are split into parts with an operator
 * chip. Rows are joined with `AND` connectors and a final outcome
 * badge summarises whether all conditions pass.
 */

const OPERATOR_RE = /\s(>=|<=|>|<|=|is|in|matches|exceeds|equals)\s/i

function parseCondition(label: string): { operand: string; operator: string; value: string } | null {
  const match = label.match(OPERATOR_RE)
  if (!match || match.index == null) return null
  return {
    operand: label.slice(0, match.index).trim(),
    operator: match[1].toUpperCase(),
    value: label.slice(match.index + match[0].length).trim(),
  }
}

export function RuleChecklist({ heading, items, className, ...props }: RuleChecklistProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const allChecked = items.every((it) => it.checked)

  return (
    <div ref={ref} data-slot="bento-rule-checklist" className={className} {...props}>
      <div className="flex h-full flex-col justify-center p-5">
        {heading && (
          <p className="mb-3 font-semibold text-muted-foreground text-xxs uppercase tracking-wider">
            {heading}
          </p>
        )}

        <ItemGroup>
          {items.map((item, i) => {
            const condition = parseCondition(item.label)
            const isLast = i === items.length - 1
            return (
              <div key={item.label}>
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : undefined}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.3, ease: "easeOut" }}
                >
                  <Item size="sm" variant="muted">
                    <ItemMedia
                      variant="icon"
                      className={cn(
                        item.checked ? "bg-success/15 text-success" : "bg-warning/15 text-warning",
                      )}
                    >
                      {item.checked ? (
                        <Check width={12} height={12} />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      )}
                    </ItemMedia>

                    <ItemContent>
                      {condition ? (
                        <>
                          <ItemTitle className="flex flex-wrap items-baseline gap-1.5 text-xs">
                            <span className="text-foreground">{condition.operand}</span>
                            <span className="rounded-sm bg-primary/10 px-1 font-mono font-semibold tabular-nums text-primary text-xxs">
                              {condition.operator}
                            </span>
                            <span className="font-mono text-foreground/90">{condition.value}</span>
                          </ItemTitle>
                          {item.detail && (
                            <ItemDescription className="text-xxs">{item.detail}</ItemDescription>
                          )}
                        </>
                      ) : (
                        <>
                          <ItemTitle className="text-xs">{item.label}</ItemTitle>
                          {item.detail && (
                            <ItemDescription className="text-xxs">{item.detail}</ItemDescription>
                          )}
                        </>
                      )}
                    </ItemContent>
                  </Item>
                </motion.div>

                {!isLast && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : undefined}
                    transition={{ delay: 0.25 + i * 0.1, duration: 0.2 }}
                    className="ml-4 flex items-center gap-2 py-0.5"
                  >
                    <span className="font-mono font-semibold text-muted-foreground/70 text-xxs">AND</span>
                    <span className="h-px flex-1 bg-border/60" aria-hidden />
                  </motion.div>
                )}
              </div>
            )
          })}
        </ItemGroup>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ delay: 0.7, duration: 0.3 }}
          className="mt-3 flex items-center justify-end"
        >
          {allChecked ? (
            <Badge variant="secondary" className="rounded-sm bg-success/10 text-success text-xxs">
              Rule matches
            </Badge>
          ) : (
            <Badge variant="secondary" className="rounded-sm bg-muted text-muted-foreground text-xxs">
              Conditions not met
            </Badge>
          )}
        </motion.div>
      </div>
    </div>
  )
}
