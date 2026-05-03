"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { useEffect, useRef, useState } from "react"

import { cn } from "../lib/utils"

const complianceScoreVariants = cva("relative inline-flex items-center justify-center", {
  variants: {
    size: {
      sm: "size-20",
      default: "size-28",
      lg: "size-36",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

/** Map size to SVG stroke width and font sizing */
const sizeConfig = {
  sm: { strokeWidth: 5, viewBox: 80, radius: 34, fontSize: "text-lg", labelSize: "text-3xs" },
  default: {
    strokeWidth: 6,
    viewBox: 80,
    radius: 34,
    fontSize: "text-2xl",
    labelSize: "text-3xs",
  },
  lg: {
    strokeWidth: 7,
    viewBox: 80,
    radius: 34,
    fontSize: "text-3xl",
    labelSize: "text-2xs",
  },
} as const

function getScoreColor(score: number): string {
  if (score <= 40) return "text-destructive"
  if (score <= 70) return "text-highlight-ink"
  return "text-success"
}

function getTrackColor(score: number): string {
  if (score <= 40) return "text-destructive/15"
  if (score <= 70) return "text-highlight/60"
  return "text-mint/70"
}

type ComplianceScoreProps = React.ComponentProps<"div"> &
  VariantProps<typeof complianceScoreVariants> & {
    /** Compliance score from 0–100 */
    score: number
    /** Optional label rendered below the circle */
    label?: string
    /** Show the numeric value in the center. Default: true */
    showValue?: boolean
    /** Override the automatic color (accepts a Tailwind text-color class) */
    color?: string
  }

function ComplianceScore({
  score,
  label,
  size = "default",
  showValue = true,
  color,
  className,
  ...props
}: ComplianceScoreProps) {
  const clampedScore = Math.max(0, Math.min(100, score))
  const cfg = sizeConfig[size ?? "default"]
  const circumference = 2 * Math.PI * cfg.radius
  const [animatedScore, setAnimatedScore] = useState(0)
  const hasAnimated = useRef(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (hasAnimated.current) {
      setAnimatedScore(clampedScore)
      return
    }

    let rafId: number

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return
        hasAnimated.current = true

        const start = performance.now()
        const duration = 800

        function tick(now: number) {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - (1 - progress) ** 3
          setAnimatedScore(Math.round(clampedScore * eased))
          if (progress < 1) rafId = requestAnimationFrame(tick)
        }

        rafId = requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(rafId)
    }
  }, [clampedScore])

  const dashOffset = circumference - (animatedScore / 100) * circumference
  const scoreColor = color ?? getScoreColor(clampedScore)
  const trackColor = color ? `${color}/15` : getTrackColor(clampedScore)

  return (
    <div
      ref={ref}
      data-slot="compliance-score"
      role="meter"
      aria-valuenow={score}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ? `${label}: ${score}%` : `Compliance score: ${score}%`}
      className={cn(complianceScoreVariants({ size }), className)}
      {...props}
    >
      <svg
        viewBox={`0 0 ${cfg.viewBox} ${cfg.viewBox}`}
        className="absolute inset-0 size-full -rotate-90"
        aria-hidden="true"
      >
        {/* Track */}
        <circle
          cx={cfg.viewBox / 2}
          cy={cfg.viewBox / 2}
          r={cfg.radius}
          fill="none"
          strokeWidth={cfg.strokeWidth}
          className={cn("stroke-current", trackColor)}
          strokeLinecap="round"
        />
        {/* Fill */}
        <circle
          cx={cfg.viewBox / 2}
          cy={cfg.viewBox / 2}
          r={cfg.radius}
          fill="none"
          strokeWidth={cfg.strokeWidth}
          className={cn("stroke-current transition-[stroke-dashoffset] duration-300", scoreColor)}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
      </svg>

      {/* Center content */}
      {showValue && (
        <div className="relative z-10 flex flex-col items-center">
          <span
            className={cn("font-mono font-semibold tabular-nums", cfg.fontSize, scoreColor)}
            aria-label={`${animatedScore}%`}
          >
            {animatedScore}
          </span>
        </div>
      )}
      {label && (
        <span
          className={cn(
            "relative z-10 mt-0.5 font-medium text-muted-foreground uppercase tracking-wide",
            cfg.labelSize,
          )}
        >
          {label}
        </span>
      )}
    </div>
  )
}

export type { ComplianceScoreProps }
export { ComplianceScore, complianceScoreVariants }
