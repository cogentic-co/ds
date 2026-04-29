import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircle, Check, Circle, Loader2, MinusCircle } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"

import { cn } from "../lib/utils"

/**
 * @figma Step
 * @figmaNode 456:63
 * @figmaUrl https://figma.com/design/1FH1KCGLeK5GR222JUS2Iu?node-id=456-63
 *
 * A single step indicator. Use inside `Stepper` (or directly in lists like
 * `AgentProgress` / `Plan`) to render a status + label/description.
 *
 * Status: done | active | pending | failed | skipped
 * Size:   compact (single-line, indicator + title) | detailed (indicator
 *         + title + optional description on its own line, larger spacing)
 *
 * Replaces the older `StepProgress*` component family — Step is the single
 * step primitive; `Stepper` is the container.
 */

type StepStatus = "done" | "active" | "pending" | "failed" | "skipped"

const stepVariants = cva("group/step flex", {
  variants: {
    size: {
      compact: "items-center gap-2",
      detailed: "items-start gap-3",
    },
  },
  defaultVariants: { size: "compact" },
})

const stepIndicatorVariants = cva(
  "relative z-10 flex shrink-0 items-center justify-center rounded-full border-2 font-semibold text-xs",
  {
    variants: {
      size: { compact: "size-5", detailed: "size-7" },
      status: {
        done: "border-[var(--mint-ink)] bg-[var(--mint-ink)] text-[var(--mint)]",
        active: "border-primary bg-primary text-primary-foreground",
        pending: "border-border bg-card text-muted-foreground",
        failed: "border-destructive bg-destructive text-destructive-foreground",
        skipped: "border-border bg-muted text-muted-foreground",
      },
    },
    defaultVariants: { size: "compact", status: "pending" },
  },
)

type StepProps = Omit<ComponentProps<"div">, "title"> &
  VariantProps<typeof stepVariants> & {
    status?: StepStatus
    title: ReactNode
    description?: ReactNode
    /** Override the indicator icon (otherwise inferred from status). */
    icon?: ReactNode
    /** Trailing slot — typically a Badge with the status text or progress count. */
    trailing?: ReactNode
  }

const indicatorIcon: Record<StepStatus, ReactNode> = {
  done: <Check className="size-3.5" />,
  active: <Loader2 className="size-3.5 animate-spin" />,
  pending: <Circle className="size-2 fill-current" />,
  failed: <AlertCircle className="size-3.5" />,
  skipped: <MinusCircle className="size-3.5" />,
}

function Step({
  status = "pending",
  size = "compact",
  title,
  description,
  icon,
  trailing,
  className,
  children,
  ...props
}: StepProps) {
  return (
    <div
      data-slot="step"
      data-status={status}
      data-size={size}
      role="listitem"
      aria-current={status === "active" ? "step" : undefined}
      className={cn(stepVariants({ size }), className)}
      {...props}
    >
      <div data-slot="step-indicator" className={stepIndicatorVariants({ size, status })}>
        {icon ?? indicatorIcon[status]}
      </div>

      <div className={cn("min-w-0 flex-1", size === "detailed" && "pt-0.5")}>
        <div className="flex items-center justify-between gap-3">
          <p
            data-slot="step-title"
            className={cn("font-medium text-sm", size === "compact" && "leading-5")}
          >
            {title}
          </p>
          {trailing && (
            <div data-slot="step-trailing" className="shrink-0">
              {trailing}
            </div>
          )}
        </div>
        {description && size === "detailed" && (
          <p data-slot="step-description" className="mt-1 text-muted-foreground text-xs">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  )
}

const stepperVariants = cva("", {
  variants: {
    orientation: {
      vertical: "flex flex-col gap-3",
      horizontal: "flex w-full items-start gap-2",
    },
  },
  defaultVariants: { orientation: "vertical" },
})

type StepperProps = ComponentProps<"div"> & VariantProps<typeof stepperVariants>

function Stepper({ orientation, className, ...props }: StepperProps) {
  return (
    <div
      data-slot="stepper"
      data-orientation={orientation ?? "vertical"}
      role="list"
      className={cn(stepperVariants({ orientation }), className)}
      {...props}
    />
  )
}

export type { StepProps, StepperProps, StepStatus }
export { Step, Stepper, stepIndicatorVariants, stepperVariants, stepVariants }
