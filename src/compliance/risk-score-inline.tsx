"use client"

import { AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"
import { cn } from "../lib/utils"

type RiskScoreInlineProps = ComponentProps<"span"> & {
  score: number
  showScore?: boolean
  showLabel?: boolean
}

function riskTier(score: number): { label: string; color: string; icon: ReactNode } {
  if (score >= 70)
    return {
      label: "High",
      color: "text-red-700 dark:text-red-400",
      icon: <ShieldAlert className="size-3" aria-hidden />,
    }
  if (score >= 40)
    return {
      label: "Medium",
      color: "text-amber-700 dark:text-amber-400",
      icon: <AlertTriangle className="size-3" aria-hidden />,
    }
  return {
    label: "Low",
    color: "text-emerald-700 dark:text-emerald-400",
    icon: <CheckCircle2 className="size-3" aria-hidden />,
  }
}

function RiskScoreInline({
  score,
  showScore = true,
  showLabel = false,
  className,
  ...props
}: RiskScoreInlineProps) {
  const tier = riskTier(score)

  return (
    <span
      data-slot="risk-score-inline"
      className={cn("inline-flex items-center gap-1 text-xs", tier.color, className)}
      title={`Risk: ${score}/100 (${tier.label})`}
      {...props}
    >
      {tier.icon}
      {showScore && <span className="font-medium tabular-nums">{score}</span>}
      {showLabel && <span>{tier.label}</span>}
    </span>
  )
}

export { RiskScoreInline }
export type { RiskScoreInlineProps }
