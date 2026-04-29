"use client"

import { motion, useInView } from "motion/react"
import { type ComponentProps, useEffect, useRef, useState } from "react"
import { type StepStatus as DsStepStatus, Step, Stepper } from "../components/step"
import { cn } from "../lib/utils"
import type { StepStatus, StepsStep } from "./types"

const MotionStep = motion.create(Step)

const STATUS_MAP: Record<StepStatus, DsStepStatus> = {
  completed: "done",
  running: "active",
  pending: "pending",
  upcoming: "pending",
}

export interface StepsProps extends ComponentProps<"div"> {
  steps: StepsStep[]
}

/**
 * Vertical step-progress showcase. Each step fades in on its `delay`
 * (ms after the panel enters the viewport), simulating a workflow
 * advancing through stages.
 */
export function Steps({ steps, className, ...props }: StepsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const timers = steps.map((step, i) => setTimeout(() => setVisibleCount(i + 1), step.delay))
    return () => timers.forEach(clearTimeout)
  }, [inView, steps])

  return (
    <div
      ref={ref}
      data-slot="showcase-steps"
      className={cn("flex h-full items-center justify-center p-6", className)}
      {...props}
    >
      <div className="w-full max-w-[300px]">
        <Stepper orientation="vertical">
          {steps.map((step, i) => {
            const isVisible = i < visibleCount
            const mapped = STATUS_MAP[step.status] ?? "pending"
            return (
              <MotionStep
                key={step.label}
                status={mapped}
                title={step.label}
                initial={{ opacity: 0, y: 8 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              />
            )
          })}
        </Stepper>
      </div>
    </div>
  )
}
