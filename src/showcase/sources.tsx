"use client"

import { motion, useInView } from "motion/react"
import { type ComponentProps, useRef } from "react"
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "../components/item"
import { Icon } from "../lib/icon-map"
import { cn } from "../lib/utils"
import type { SourcesSource } from "./types"

export interface SourcesProps extends ComponentProps<"div"> {
  sources: SourcesSource[]
  output: { label: string; detail: string }
}

/**
 * "Many sources → one output" showcase. Lists input sources as
 * icon rows, then a separator and a highlighted output row.
 */
export function Sources({ sources, output, className, ...props }: SourcesProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <div
      ref={ref}
      data-slot="showcase-sources"
      className={cn("flex h-full items-center justify-center p-6", className)}
      {...props}
    >
      <div className="w-full max-w-[360px]">
        <ItemGroup className="rounded-xl border border-border bg-card p-2">
          {sources.map((source, i) => (
            <motion.div
              key={source.label}
              initial={{ opacity: 0, y: 6 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.3, ease: "easeOut" }}
            >
              <Item size="sm" variant="muted" className="bg-transparent">
                <ItemMedia variant="icon">
                  <Icon name={source.icon} size={12} className="text-sm leading-none" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle className="text-xs">{source.label}</ItemTitle>
                </ItemContent>
              </Item>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ delay: 0.9, duration: 0.3 }}
          >
            <ItemSeparator className="my-1" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 1.05, duration: 0.35, ease: "easeOut" }}
          >
            <Item size="sm" variant="outline" className="border-primary/30 bg-primary/5">
              <ItemMedia variant="icon" className="bg-primary/15 text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="text-xs">{output.label}</ItemTitle>
                <p className="mt-0.5 text-muted-foreground text-xxs leading-snug">
                  {output.detail}
                </p>
              </ItemContent>
            </Item>
          </motion.div>
        </ItemGroup>
      </div>
    </div>
  )
}
