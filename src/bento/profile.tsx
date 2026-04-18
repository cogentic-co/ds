"use client"

import { motion, useInView } from "motion/react"
import { Building, Check, Shield } from "pixelarticons/react"
import { type ComponentProps, useRef } from "react"
import { Badge } from "../components/badge"
import { Icon } from "../lib/icon-map"
import { cn } from "../lib/utils"
import type { ProfileBadge, ProfileStat } from "./types"

export interface ProfileProps extends ComponentProps<"div"> {
  icon: string
  name: string
  subtitle: string
  badges: ProfileBadge[]
  stats?: ProfileStat[]
  /** `"verified"` renders a directory-style card with a regulator pill. */
  variant?: "default" | "verified"
  /** Regulator / certifier label for the verified variant header. Falls back to the first success badge. */
  certifier?: string
}

/**
 * Entity profile bento — icon, name, subtitle, badges, and optional
 * stats. Two variants: a compact default and a `verified` directory-
 * style card with a regulator pill and structured detail rows.
 */
export function Profile({
  icon,
  name,
  subtitle,
  badges,
  stats,
  variant = "default",
  certifier,
  className,
  ...props
}: ProfileProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  if (variant === "verified") {
    const primaryBadge =
      certifier != null
        ? { label: certifier, success: true }
        : (badges.find((b) => b.success) ?? badges[0])
    const otherBadges = badges.filter((b) => b !== primaryBadge)

    return (
      <div
        ref={ref}
        data-slot="bento-profile"
        data-variant="verified"
        className={className}
        {...props}
      >
        <div className="flex h-full flex-col justify-center p-4">
          <div className="rounded-lg border border-border bg-card shadow-sm">
            <div className="flex items-center justify-between gap-2 border-border border-b bg-muted/30 px-3 py-2">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-md border border-border bg-card text-foreground/70">
                  <Building width={14} height={14} />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-foreground text-xs">{name}</p>
                  <p className="truncate font-mono text-muted-foreground text-xxs">{subtitle}</p>
                </div>
              </div>
              {primaryBadge && (
                <Badge
                  variant="secondary"
                  className="shrink-0 whitespace-nowrap rounded-sm bg-success/10 text-success text-xxs"
                >
                  <Check width={9} height={9} className="mr-0.5" />
                  {primaryBadge.label}
                </Badge>
              )}
            </div>

            {stats && (
              <ul className="divide-y divide-border/60">
                {stats.map((stat, i) => (
                  <motion.li
                    key={stat.label}
                    initial={{ opacity: 0, x: -4 }}
                    animate={inView ? { opacity: 1, x: 0 } : undefined}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.25, ease: "easeOut" }}
                    className="flex items-center justify-between gap-3 px-3 py-1.5 text-xxs"
                  >
                    <span className="text-muted-foreground">{stat.label}</span>
                    <span className="font-mono font-semibold text-foreground/90 tabular-nums">
                      {stat.value}
                    </span>
                  </motion.li>
                ))}
              </ul>
            )}

            {otherBadges.length > 0 && (
              <div className="border-border border-t bg-muted/20 px-3 py-2">
                <p className="mb-1 font-semibold text-muted-foreground text-xxs uppercase tracking-wider">
                  Compliance flags
                </p>
                <ul className="flex flex-wrap gap-1">
                  {otherBadges.map((badge, i) => (
                    <motion.li
                      key={badge.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={inView ? { opacity: 1, scale: 1 } : undefined}
                      transition={{ delay: 0.4 + i * 0.06, duration: 0.25, ease: "easeOut" }}
                    >
                      <Badge
                        variant="secondary"
                        className={cn(
                          "rounded-sm text-xxs",
                          badge.success ? "bg-success/10 text-success" : "",
                        )}
                      >
                        {badge.success && <Check width={9} height={9} className="mr-0.5" />}
                        {badge.label}
                      </Badge>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center justify-between border-border border-t px-3 py-1.5 text-muted-foreground text-xxs">
              <span className="inline-flex items-center gap-1">
                <Shield width={10} height={10} className="text-success" />
                <span>Verified entry</span>
              </span>
              <span className="font-mono">live</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={ref} data-slot="bento-profile" className={className} {...props}>
      <div className="flex h-full flex-col justify-center p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm">
            <Icon name={icon} size={16} />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">{name}</p>
            <p className="text-muted-foreground text-xxs">{subtitle}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : undefined}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.35, ease: "easeOut" }}
            >
              <Badge variant={badge.success ? "tagline" : "secondary"} className="text-xxs">
                {badge.success && <span className="mr-1 text-success">✓</span>}
                {badge.label}
              </Badge>
            </motion.div>
          ))}
        </div>

        {stats && (
          <div className="mt-4 grid grid-cols-3 gap-3 border-border border-t pt-3">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-semibold text-foreground text-xs">{stat.value}</p>
                <p className="text-muted-foreground text-xxs">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
