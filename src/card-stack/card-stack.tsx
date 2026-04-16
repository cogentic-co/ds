"use client"

import { motion, type Variants } from "motion/react"
import type { ReactNode } from "react"
import { cn } from "../lib/utils"

/**
 * Scattered rotated-card composition for feature-page heroes. The
 * stack owns the fixed-height container, stagger timing, and standard
 * card treatment (border, background, shadow, rounding); children
 * supply their own absolute positioning classes.
 *
 * `GhostCard` is decorative (no motion) and bleeds off the container
 * edge to imply a larger surface. Put the hero inside a section with
 * `overflow-x-clip` so ghost cards don't introduce horizontal scroll.
 */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export interface CardStackProps {
  children: ReactNode
  className?: string
  /** Stagger between each StackCard reveal in seconds. */
  stagger?: number
}

export function CardStack({ children, className, stagger = 0.15 }: CardStackProps) {
  return (
    <motion.div
      data-slot="card-stack"
      className={cn("relative w-full overflow-visible", className)}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: stagger }}
      aria-hidden="true"
    >
      {children}
    </motion.div>
  )
}

export interface StackCardProps {
  children: ReactNode
  /** Positioning + sizing + rotation classes (e.g. `top-48 -left-8 z-10 w-[290px] rotate-[2deg]`). */
  className?: string
  /** Padding inside the card. Default: `px-5 py-4`. */
  padding?: string
  /**
   * Default uses `border-border/60 bg-card shadow-md`. Use `variant="flat"`
   * for a background card with no shadow.
   */
  variant?: "default" | "flat"
  duration?: number
}

export function StackCard({
  children,
  className,
  padding = "px-5 py-4",
  variant = "default",
  duration = 0.5,
}: StackCardProps) {
  return (
    <motion.div
      data-slot="stack-card"
      variants={fadeUp}
      transition={{ duration, ease: "easeOut" }}
      className={cn(
        "absolute rounded-xl border bg-card",
        variant === "default" ? "border-border/60 shadow-md" : "border-border/40",
        padding,
        className,
      )}
    >
      {children}
    </motion.div>
  )
}

export interface GhostCardProps {
  className?: string
  /** Opacity tier — controls how faded the ghost shell looks. */
  depth?: "near" | "mid" | "far"
}

const DEPTH_STYLES: Record<NonNullable<GhostCardProps["depth"]>, string> = {
  near: "border-border/30 bg-card/50 shadow-sm",
  mid: "border-border/20 bg-card/30 shadow-sm",
  far: "border-border/10 bg-card/15",
}

export function GhostCard({ className, depth = "near" }: GhostCardProps) {
  return (
    <div
      data-slot="ghost-card"
      aria-hidden
      className={cn("absolute rounded-xl border", DEPTH_STYLES[depth], className)}
    />
  )
}
