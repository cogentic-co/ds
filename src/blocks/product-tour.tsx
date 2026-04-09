"use client"

import { AnimatePresence, motion } from "motion/react"
import * as React from "react"
import { Button } from "../components/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../components/dialog"
import { EASE_OUT } from "../lib/animation"
import { cn } from "../lib/utils"

type ProductTourStep = {
  id: string
  icon?: React.ReactNode
  title: string
  description: React.ReactNode
  /** Right-column visual — any ReactNode (image, component, animation, etc). */
  visual?: React.ReactNode
}

type ProductTourProps = {
  steps: ProductTourStep[]
  /**
   * Display mode. "modal" (default) wraps in a Dialog and requires open/onOpenChange.
   * "inline" renders the tour card directly so it can be embedded in a page.
   */
  mode?: "modal" | "inline"
  /** Required when mode="modal". */
  open?: boolean
  /** Required when mode="modal". */
  onOpenChange?: (open: boolean) => void
  /** Controlled step index. */
  stepIndex?: number
  onStepChange?: (index: number) => void
  /** Called when the final step's primary action is clicked. */
  onComplete?: () => void
  /** Called when the skip button is clicked (inline mode only — modal uses onOpenChange). */
  onSkip?: () => void
  completeLabel?: string
  nextLabel?: string
  backLabel?: string
  skippable?: boolean
  skipLabel?: string
  className?: string
}

function ProductTour({
  steps,
  mode = "modal",
  open,
  onOpenChange,
  stepIndex: stepIndexProp,
  onStepChange,
  onComplete,
  onSkip,
  completeLabel = "Get started",
  nextLabel = "Next",
  backLabel = "Back",
  skippable = true,
  skipLabel = "Skip",
  className,
}: ProductTourProps) {
  const [internalIndex, setInternalIndex] = React.useState(0)
  const index = stepIndexProp ?? internalIndex
  const setIndex = React.useCallback(
    (value: number) => {
      if (stepIndexProp === undefined) setInternalIndex(value)
      onStepChange?.(value)
    },
    [stepIndexProp, onStepChange],
  )

  React.useEffect(() => {
    if (mode === "modal" && !open && stepIndexProp === undefined) setInternalIndex(0)
  }, [mode, open, stepIndexProp])

  const step = steps[index]
  const isFirst = index === 0
  const isLast = index === steps.length - 1

  const handleNext = React.useCallback(() => {
    if (isLast) {
      onComplete?.()
      if (mode === "modal") onOpenChange?.(false)
      return
    }
    setIndex(index + 1)
  }, [isLast, index, onComplete, mode, onOpenChange, setIndex])

  const handleBack = React.useCallback(() => {
    if (isFirst) return
    setIndex(index - 1)
  }, [isFirst, index, setIndex])

  const handleSkip = React.useCallback(() => {
    onSkip?.()
    if (mode === "modal") onOpenChange?.(false)
  }, [onSkip, mode, onOpenChange])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault()
        handleNext()
      } else if (event.key === "ArrowLeft") {
        event.preventDefault()
        handleBack()
      }
    },
    [handleNext, handleBack],
  )

  if (!step) return null

  const body = (
    <>
      <div className="grid min-h-[320px] md:grid-cols-2">
        <div className="flex flex-col justify-center gap-3 p-8">
          {step.icon && (
            <div data-slot="product-tour-icon" className="flex size-10 items-center justify-center">
              {step.icon}
            </div>
          )}
          <TourTitle mode={mode}>{step.title}</TourTitle>
          <TourDescription mode={mode}>{step.description}</TourDescription>
        </div>

        <div
          data-slot="product-tour-visual"
          className="relative hidden overflow-hidden bg-muted/30 md:block"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              className="absolute inset-0 flex items-center justify-center p-8"
            >
              {step.visual}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center justify-between border-border border-t bg-card px-6 py-4">
        <div
          data-slot="product-tour-dots"
          className="flex items-center gap-1.5"
          aria-label={`Step ${index + 1} of ${steps.length}`}
        >
          {steps.map((s, i) => (
            <span
              key={s.id}
              aria-current={i === index || undefined}
              className={cn(
                "size-1.5 rounded-full transition-colors",
                i === index ? "bg-foreground" : "bg-muted-foreground/30",
              )}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          {skippable && !isLast && (
            <Button variant="ghost" size="sm" onClick={handleSkip}>
              {skipLabel}
            </Button>
          )}
          {!isFirst && (
            <Button variant="outline" size="sm" onClick={handleBack}>
              {backLabel}
            </Button>
          )}
          <Button size="sm" onClick={handleNext}>
            {isLast ? completeLabel : nextLabel}
          </Button>
        </div>
      </div>
    </>
  )

  if (mode === "inline") {
    return (
      <div
        data-slot="product-tour"
        onKeyDown={handleKeyDown}
        className={cn(
          "grid w-full max-w-3xl overflow-hidden rounded-xl border border-border-light bg-card shadow-sm outline-none",
          className,
        )}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: keyboard nav for inline mode
        tabIndex={0}
      >
        {body}
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        onKeyDown={handleKeyDown}
        className={cn("grid w-full max-w-3xl gap-0 overflow-hidden p-0 sm:max-w-3xl", className)}
        data-slot="product-tour"
      >
        {body}
      </DialogContent>
    </Dialog>
  )
}

type TourMode = NonNullable<ProductTourProps["mode"]>

function TourTitle({ mode, children }: { mode: TourMode; children: React.ReactNode }) {
  const className = "font-semibold text-lg"
  return mode === "modal" ? (
    <DialogTitle className={className}>{children}</DialogTitle>
  ) : (
    <h2 className={className}>{children}</h2>
  )
}

function TourDescription({ mode, children }: { mode: TourMode; children: React.ReactNode }) {
  const className = "text-muted-foreground text-sm"
  return mode === "modal" ? (
    <DialogDescription className={className}>{children}</DialogDescription>
  ) : (
    <p className={className}>{children}</p>
  )
}

export { ProductTour }
export type { ProductTourProps, ProductTourStep }
