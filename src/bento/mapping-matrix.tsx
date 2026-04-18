"use client"

import { motion, useInView } from "motion/react"
import { Check } from "pixelarticons/react"
import { type ComponentProps, useRef } from "react"
import type { MappingMatrixRow } from "./types"

export interface MappingMatrixProps extends ComponentProps<"div"> {
  protocols: string[]
  rows: MappingMatrixRow[]
  heading?: string
}

/**
 * Field → per-protocol mapping matrix. Leftmost column is the source
 * field; one cell per protocol on the right. A bare `✓` (or `"yes"`)
 * renders a check; missing mappings render as an em dash; any other
 * string is rendered as a mono note (e.g. `"as memo"`).
 */
export function MappingMatrix({
  protocols,
  rows,
  heading = "Field map across protocols",
  className,
  ...props
}: MappingMatrixProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const gridTemplateColumns = `minmax(0, 1.4fr) repeat(${protocols.length}, minmax(0, 1fr))`

  return (
    <div ref={ref} data-slot="bento-mapping-matrix" className={className} {...props}>
      <div className="flex h-full flex-col justify-center p-3">
        <p className="mb-2 px-1 font-semibold text-muted-foreground text-xxs uppercase tracking-wider">
          {heading}
        </p>

        <div className="overflow-hidden rounded-md border border-border bg-card">
          <div
            className="grid items-center gap-1 border-border border-b bg-muted/30 px-2 py-1.5 font-semibold text-muted-foreground text-xxs"
            style={{ gridTemplateColumns }}
          >
            <span>Field</span>
            {protocols.map((p) => (
              <span key={p} className="truncate text-center font-mono">
                {p}
              </span>
            ))}
          </div>

          <ul className="divide-y divide-border/60">
            {rows.map((row, i) => (
              <motion.li
                key={row.field}
                className="grid items-center gap-1 px-2 py-1.5 text-xxs"
                style={{ gridTemplateColumns }}
                initial={{ opacity: 0, x: -4 }}
                animate={inView ? { opacity: 1, x: 0 } : undefined}
                transition={{ delay: 0.15 + i * 0.05, duration: 0.25, ease: "easeOut" }}
              >
                <span className="truncate font-medium text-foreground">{row.field}</span>
                {protocols.map((p) => {
                  const note = row.mappings[p]
                  if (!note) {
                    return (
                      <span
                        key={p}
                        aria-label="not mapped"
                        className="text-center text-muted-foreground/40"
                      >
                        —
                      </span>
                    )
                  }
                  if (note === "✓" || note.toLowerCase() === "yes") {
                    return (
                      <span
                        key={p}
                        className="flex items-center justify-center text-success"
                        aria-label="mapped"
                      >
                        <Check width={11} height={11} />
                      </span>
                    )
                  }
                  return (
                    <span
                      key={p}
                      title={note}
                      className="truncate rounded-sm bg-muted/50 px-1 py-0.5 text-center font-mono text-foreground/80 text-xxs"
                    >
                      {note}
                    </span>
                  )
                })}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
