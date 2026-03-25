"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { useEffect, useRef, useState } from "react"

import { cn } from "../lib/utils"

const TOTAL_BARS = 40

const TIER_COLORS: Record<string, { filled: string; empty: string }> = {
  low: { filled: "bg-success", empty: "bg-success/15" },
  medium: { filled: "bg-warning", empty: "bg-warning/15" },
  high: { filled: "bg-risk-high", empty: "bg-risk-high/15" },
  severe: { filled: "bg-destructive", empty: "bg-destructive/15" },
  highTrust: { filled: "bg-success", empty: "bg-success/15" },
  moderateTrust: { filled: "bg-warning", empty: "bg-warning/15" },
  lowTrust: { filled: "bg-risk-high", empty: "bg-risk-high/15" },
  critical: { filled: "bg-destructive", empty: "bg-destructive/15" },
}

const sizeVariants = cva("flex items-center", {
  variants: {
    size: {
      sm: "gap-[3px]",
      lg: "gap-1",
    },
  },
  defaultVariants: {
    size: "sm",
  },
})

const barVariants = cva("flex-1 rounded-sm transition-all", {
  variants: {
    size: {
      sm: "h-4 w-1.5",
      lg: "h-6 w-2.5",
    },
  },
  defaultVariants: {
    size: "sm",
  },
})

const textVariants = cva("flex items-center justify-between text-muted-foreground", {
  variants: {
    size: {
      sm: "text-xs",
      lg: "text-sm",
    },
  },
  defaultVariants: {
    size: "sm",
  },
})

type RiskGaugeProps = React.ComponentProps<"div"> &
  VariantProps<typeof sizeVariants> & {
    score: number
    tier: string
    label?: string
    animated?: boolean
  }

function RiskGauge({
  score,
  tier,
  label,
  size = "sm",
  animated = true,
  className,
  ...props
}: RiskGaugeProps) {
  const targetCount = Math.round((score / 100) * TOTAL_BARS)
  const [filledCount, setFilledCount] = useState(animated ? 0 : targetCount)
  const [displayScore, setDisplayScore] = useState(animated ? 0 : score)
  const hasAnimated = useRef(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animated || hasAnimated.current) {
      setFilledCount(targetCount)
      setDisplayScore(score)
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return
        hasAnimated.current = true

        let current = 0
        const step = () => {
          current++
          setFilledCount(current)
          setDisplayScore(Math.round((current / TOTAL_BARS) * 100))
          if (current < targetCount) {
            setTimeout(step, 40)
          } else {
            setDisplayScore(score)
          }
        }
        setTimeout(step, 100)
      },
      { threshold: 0.5 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [animated, targetCount, score])

  const colors = TIER_COLORS[tier] ?? TIER_COLORS.medium

  return (
    <div
      ref={ref}
      data-slot="risk-gauge"
      role="meter"
      aria-valuenow={score}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? `Risk score: ${score}/100`}
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    >
      {label && (
        <div className={textVariants({ size })}>
          <span>{label}</span>
          <span className="font-medium font-mono text-foreground">{displayScore}/100</span>
        </div>
      )}
      <div className={sizeVariants({ size })}>
        {Array.from({ length: TOTAL_BARS }, (_, i) => (
          <div
            key={`bar-${i}`}
            className={cn(
              barVariants({ size }),
              i < filledCount ? colors.filled : colors.empty,
              animated && "duration-150",
            )}
          />
        ))}
      </div>
    </div>
  )
}

export { RiskGauge, TIER_COLORS as riskGaugeTierColors }
export type { RiskGaugeProps }
