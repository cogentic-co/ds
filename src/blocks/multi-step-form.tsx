"use client"

import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { type ComponentProps, type ReactNode, useCallback, useState } from "react"
import { Button } from "../components/button"
import {
  StepProgress,
  StepProgressContent,
  StepProgressIndicator,
  StepProgressItem,
  StepProgressTitle,
} from "../components/step-progress"
import { cn } from "../lib/utils"

type MultiStepFormStep = {
  id: string
  title: string
  description?: string
  content: ReactNode
  /** Validate before advancing. Return false / throw to block the next step. */
  validate?: () => boolean | Promise<boolean>
}

type MultiStepFormProps = Omit<ComponentProps<"div">, "onSubmit"> & {
  steps: MultiStepFormStep[]
  /** Called when the user submits the final step */
  onSubmit: () => void | Promise<void>
  /** Controlled current step index */
  stepIndex?: number
  onStepChange?: (index: number) => void
  /** Labels */
  nextLabel?: string
  backLabel?: string
  submitLabel?: string
}

function MultiStepForm({
  steps,
  onSubmit,
  stepIndex: stepIndexProp,
  onStepChange,
  nextLabel = "Next",
  backLabel = "Back",
  submitLabel = "Submit",
  className,
  ...props
}: MultiStepFormProps) {
  const [internalIndex, setInternalIndex] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const index = stepIndexProp ?? internalIndex

  const setIndex = useCallback(
    (value: number) => {
      if (stepIndexProp === undefined) setInternalIndex(value)
      onStepChange?.(value)
    },
    [stepIndexProp, onStepChange],
  )

  const step = steps[index]
  const isFirst = index === 0
  const isLast = index === steps.length - 1

  const handleNext = useCallback(async () => {
    if (step.validate) {
      const valid = await step.validate()
      if (!valid) return
    }
    if (isLast) {
      setSubmitting(true)
      try {
        await onSubmit()
      } finally {
        setSubmitting(false)
      }
      return
    }
    setIndex(index + 1)
  }, [step, isLast, onSubmit, index, setIndex])

  if (!step) return null

  return (
    <div data-slot="multi-step-form" className={cn("flex flex-col gap-6", className)} {...props}>
      <StepProgress>
        {steps.map((s, i) => {
          const status = i < index ? "complete" : i === index ? "current" : "upcoming"
          return (
            <StepProgressItem key={s.id} status={status}>
              <StepProgressIndicator status={status} step={i + 1}>
                {status === "complete" && <Check className="size-3" />}
              </StepProgressIndicator>
              <StepProgressContent>
                <StepProgressTitle>{s.title}</StepProgressTitle>
              </StepProgressContent>
            </StepProgressItem>
          )
        })}
      </StepProgress>

      <div data-slot="multi-step-form-content" className="flex flex-col gap-3">
        <div>
          <h3 className="font-semibold text-lg">{step.title}</h3>
          {step.description && <p className="text-muted-foreground text-sm">{step.description}</p>}
        </div>
        {step.content}
      </div>

      <div className="flex items-center justify-between border-border border-t pt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIndex(index - 1)}
          disabled={isFirst || submitting}
        >
          <ArrowLeft className="mr-1 size-3.5" />
          {backLabel}
        </Button>
        <Button size="sm" onClick={handleNext} disabled={submitting}>
          {isLast ? (submitting ? "Submitting..." : submitLabel) : nextLabel}
          {!isLast && <ArrowRight className="ml-1 size-3.5" />}
        </Button>
      </div>
    </div>
  )
}

export type { MultiStepFormProps, MultiStepFormStep }
export { MultiStepForm }
