"use client"

import { motion, useInView } from "motion/react"
import { type ComponentProps, useRef } from "react"
import { Icon } from "../lib/icon-map"
import { cn } from "../lib/utils"
import type { CardGridItem } from "./types"

export interface CardGridProps extends ComponentProps<"div"> {
  items: CardGridItem[]
}

/**
 * Grid of small icon-labelled tiles. Column count adapts to item
 * count: ≥8 → up to 4-wide, ≥6 → 3-wide, otherwise 2-wide.
 */
export function CardGrid({ items, className, ...props }: CardGridProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const count = items.length
  const colsClass =
    count >= 8
      ? "grid-cols-2 md:grid-cols-4"
      : count >= 6
        ? "grid-cols-2 md:grid-cols-3"
        : "grid-cols-2"

  return (
    <div ref={ref} data-slot="bento-card-grid" className={className} {...props}>
      <div className="flex h-full flex-col justify-center p-4">
        <div className={cn("grid gap-2", colsClass)}>
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              className="group relative flex flex-col items-start gap-1.5 overflow-hidden rounded-lg border border-border bg-card px-3 py-2.5 transition-colors duration-200 hover:border-foreground/20 hover:bg-muted/30"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : undefined}
              transition={{ delay: 0.15 + i * 0.06, duration: 0.3, ease: "easeOut" }}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-md border border-border/60 bg-muted/40 text-muted-foreground transition-colors group-hover:bg-foreground/5 group-hover:text-foreground">
                <Icon name={item.icon} size={14} />
              </span>
              <div className="min-w-0">
                <p className="truncate font-semibold text-foreground text-xxs">{item.label}</p>
                {item.value && (
                  <p className="truncate text-muted-foreground text-xxs">{item.value}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
