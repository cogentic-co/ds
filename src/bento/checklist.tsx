"use client"

import { motion, useInView } from "motion/react"
import { Check } from "pixelarticons/react"
import { type ComponentProps, useRef } from "react"
import { Badge } from "../components/badge"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "../components/item"
import { cn } from "../lib/utils"
import type { ChecklistItem } from "./types"

export interface ChecklistProps extends ComponentProps<"div"> {
  heading?: string
  items: ChecklistItem[]
}

/**
 * Checklist bento — pass/fail list with optional trailing detail badge.
 * For rule-builder style (operator chips, AND connectors, outcome
 * badge) use `RuleChecklist` instead.
 */
export function Checklist({ heading, items, className, ...props }: ChecklistProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <div ref={ref} data-slot="bento-checklist" className={className} {...props}>
      <div className="flex h-full flex-col justify-center p-5">
        {heading && (
          <p className="mb-3 font-semibold text-muted-foreground text-xxs uppercase tracking-wider">
            {heading}
          </p>
        )}

        <ItemGroup>
          {items.map((item, i) => (
            <motion.div
              key={item.label}
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
                  <ItemTitle className="text-xs">{item.label}</ItemTitle>
                  {item.detail && !item.detail.includes(" — ") && (
                    <ItemDescription className="text-xxs">{item.detail}</ItemDescription>
                  )}
                </ItemContent>

                {item.detail?.includes(" — ") && (
                  <ItemActions>
                    <Badge variant="secondary" className="whitespace-nowrap text-xxs">
                      {item.detail}
                    </Badge>
                  </ItemActions>
                )}
              </Item>
            </motion.div>
          ))}
        </ItemGroup>
      </div>
    </div>
  )
}
