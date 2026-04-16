"use client"

import { motion, useInView } from "motion/react"
import { Search } from "pixelarticons/react"
import { type ComponentProps, useRef } from "react"
import { cn } from "../lib/utils"
import type { SearchPanelFilter } from "./types"

export interface SearchPanelProps extends ComponentProps<"div"> {
  query?: string
  filters: SearchPanelFilter[]
  resultCount?: string
}

/**
 * Mock search input with active filter chips. Filters with `active`
 * unset default to active; pass `active: false` for dimmed chips.
 */
export function SearchPanel({ query, filters, resultCount, className, ...props }: SearchPanelProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <div ref={ref} data-slot="bento-search-panel" className={className} {...props}>
      <div className="flex h-full flex-col justify-center gap-3 p-4">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.15, duration: 0.3, ease: "easeOut" }}
          className="flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1.5"
        >
          <Search width={12} height={12} className="text-muted-foreground" />
          <span
            className={cn(
              "flex-1 truncate text-xs",
              query ? "text-foreground" : "text-muted-foreground/60",
            )}
          >
            {query || "Search audit log…"}
          </span>
          {resultCount && (
            <span className="font-mono tabular-nums text-muted-foreground text-xxs">
              {resultCount}
            </span>
          )}
        </motion.div>

        <div>
          <p className="mb-1.5 font-semibold text-muted-foreground text-xxs uppercase tracking-wider">
            Active filters
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {filters.map((f, i) => {
              const active = f.active !== false
              return (
                <motion.li
                  key={f.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : undefined}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.25, ease: "easeOut" }}
                >
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-xxs",
                      active
                        ? "border-primary/30 bg-primary/10 text-primary"
                        : "border-border bg-muted/40 text-muted-foreground",
                    )}
                  >
                    <span className="font-medium">{f.label}:</span>
                    <span>{f.value}</span>
                    {active && (
                      <span aria-hidden className="text-primary/60 leading-none">
                        ×
                      </span>
                    )}
                  </span>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
