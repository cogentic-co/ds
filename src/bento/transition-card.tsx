"use client"

import { motion, useInView } from "motion/react"
import { type ComponentProps, useRef } from "react"
import { Badge } from "../components/badge"
import { Item, ItemContent, ItemGroup, ItemMedia, ItemTitle } from "../components/item"
import { StatusIndicator } from "../components/status-indicator"
import type { TransitionCardRequirement } from "./types"

const MotionItem = motion.create(Item)

export interface TransitionCardProps extends ComponentProps<"div"> {
  from: { flag: string; label: string }
  to: { flag: string; label: string }
  threshold: string
  regulator?: string
  requirements?: TransitionCardRequirement[]
}

/**
 * Two-endpoint transition bento — flags + labels for source/destination,
 * a threshold badge, and an optional requirements checklist. Originally
 * designed for cross-border travel-rule corridors, but the shape is
 * generic enough for any "A → B with conditions" composition.
 */
export function TransitionCard({
  from,
  to,
  threshold,
  regulator,
  requirements,
  className,
  ...props
}: TransitionCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <div ref={ref} data-slot="bento-transition-card" className={className} {...props}>
      <div className="flex h-full flex-col justify-center gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-lg leading-none">
              <span aria-hidden>{from.flag}</span>
              <span className="text-muted-foreground text-xs" aria-hidden>
                →
              </span>
              <span aria-hidden>{to.flag}</span>
            </div>
            <p className="mt-1.5 truncate font-semibold text-foreground text-sm">
              {from.label} → {to.label}
            </p>
            {regulator && (
              <p className="mt-0.5 truncate text-muted-foreground text-xxs">{regulator}</p>
            )}
          </div>
          <Badge variant="tagline" className="shrink-0 whitespace-nowrap text-xxs">
            {threshold}
          </Badge>
        </div>

        {requirements && requirements.length > 0 && (
          <div>
            <p className="mb-1.5 font-semibold text-muted-foreground text-xxs uppercase tracking-wider">
              Requirements
            </p>
            <ItemGroup>
              {requirements.map((req, i) => (
                <MotionItem
                  key={req.label}
                  size="sm"
                  variant="muted"
                  initial={{ opacity: 0, x: -6 }}
                  animate={inView ? { opacity: 1, x: 0 } : undefined}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.3, ease: "easeOut" }}
                >
                  <ItemMedia variant="icon" className="bg-transparent">
                    <StatusIndicator
                      variant={req.present ? "online" : "pending"}
                      size="sm"
                      label={req.present ? "Provided" : "Missing"}
                    />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle className="text-muted-foreground text-xs">{req.label}</ItemTitle>
                  </ItemContent>
                </MotionItem>
              ))}
            </ItemGroup>
          </div>
        )}
      </div>
    </div>
  )
}
