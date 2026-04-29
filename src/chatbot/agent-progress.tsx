import { TextSearch } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"

import { Badge } from "../components/badge"
import { Button } from "../components/button"
import { Progress, ProgressIndicator, ProgressTrack } from "../components/progress"
import { Separator } from "../components/separator"
import { Step, Stepper, type StepStatus } from "../components/step"
import { cn } from "../lib/utils"

/**
 * @figma Agent Progress
 * @figmaNode 388:184
 * @figmaUrl https://figma.com/design/1FH1KCGLeK5GR222JUS2Iu?node-id=388-184
 *
 * Live status card for an agent or workflow run. Shows a header
 * (icon + title + reference + status badge), an optional progress bar,
 * a list of steps (uses `Step`/`Stepper` from the DS), and a footer
 * with meta text + action buttons.
 *
 * Variants (from Figma):
 *  - State: running | completed | failed
 *  - Density: compact | detailed (detailed shows step descriptions)
 */

type AgentProgressState = "running" | "completed" | "failed"
type AgentProgressDensity = "compact" | "detailed"

type AgentProgressStep = {
  id: string
  title: ReactNode
  /** Shown when density="detailed". */
  description?: ReactNode
  status: StepStatus
  /** Override the trailing badge label. Defaults to a label derived from `status`. */
  trailingLabel?: string
}

type AgentProgressProgress = {
  /** Label shown above the bar. Defaults to "Progress". */
  label?: ReactNode
  /** Current value (0..max). */
  value: number
  /** Max value. Defaults to 100. */
  max?: number
  /** Footer line below the bar (e.g. "Resets Apr 30 · 48% used"). */
  summary?: ReactNode
  /** Override the value badge text. Defaults to "X%" or "X / Y". */
  badgeLabel?: string
}

type AgentProgressProps = Omit<ComponentProps<"div">, "title"> & {
  state?: AgentProgressState
  density?: AgentProgressDensity
  title: ReactNode
  reference?: ReactNode
  description?: ReactNode
  /** Header icon. Defaults to a search/text icon. */
  icon?: ReactNode
  steps: AgentProgressStep[]
  progress?: AgentProgressProgress
  /** Footer meta — e.g. "Started 4 min ago · ETA 2 min". */
  meta?: ReactNode
  onCancel?: () => void
  onOpen?: () => void
  /** Custom action slot replacing the default Cancel/Open buttons. */
  actions?: ReactNode
}

const STATE_BADGE: Record<
  AgentProgressState,
  { label: string; variant: "highlight" | "mint" | "destructive" }
> = {
  running: { label: "Running", variant: "highlight" },
  completed: { label: "Completed", variant: "mint" },
  failed: { label: "Failed", variant: "destructive" },
}

const STATUS_TRAILING_LABEL: Record<StepStatus, string> = {
  done: "Done",
  active: "Running",
  pending: "Queued",
  failed: "Error",
  skipped: "Skipped",
}

const STATUS_BADGE_VARIANT: Record<StepStatus, "ghost" | "destructive" | "highlight" | "mint"> = {
  done: "ghost",
  active: "highlight",
  pending: "ghost",
  failed: "destructive",
  skipped: "ghost",
}

function AgentProgress({
  state = "running",
  density = "compact",
  title,
  reference,
  description,
  icon,
  steps,
  progress,
  meta,
  onCancel,
  onOpen,
  actions,
  className,
  children,
  ...props
}: AgentProgressProps) {
  const stateBadge = STATE_BADGE[state]
  const showFooter = !!(meta || onCancel || onOpen || actions)

  return (
    <div
      data-slot="agent-progress"
      data-state={state}
      data-density={density}
      className={cn(
        "overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card",
        className,
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex items-start gap-3 px-4 py-3.5">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          {icon ?? <TextSearch className="size-4" />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 font-medium text-sm">
            <span>{title}</span>
            {reference && (
              <>
                <span className="text-muted-foreground">·</span>
                <span className="font-mono text-muted-foreground text-xs">{reference}</span>
              </>
            )}
          </div>
          {description && (
            <p className="mt-1 line-clamp-1 text-muted-foreground text-xs">{description}</p>
          )}
        </div>
        <Badge variant={stateBadge.variant} className="shrink-0">
          {state === "running" && (
            <span className="inline-block size-1.5 animate-pulse rounded-full bg-current" />
          )}
          {stateBadge.label}
        </Badge>
      </div>

      {/* Progress section */}
      {progress && (
        <div className="px-4 pb-4">
          <Progress
            value={progress.value}
            max={progress.max ?? 100}
            aria-label={typeof progress.label === "string" ? progress.label : "Progress"}
            className="flex-col gap-2"
          >
            <div className="flex w-full items-center justify-between gap-2 text-xs">
              <span className="font-medium text-foreground">{progress.label ?? "Progress"}</span>
              <div className="flex items-center gap-1.5 font-mono text-muted-foreground">
                <span>
                  {progress.value.toLocaleString()} / {(progress.max ?? 100).toLocaleString()}
                </span>
                <Badge variant="highlight" square>
                  {progress.badgeLabel ??
                    `${Math.round((progress.value / (progress.max ?? 100)) * 100)}%`}
                </Badge>
              </div>
            </div>
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
            {progress.summary && (
              <p className="text-muted-foreground text-xs">{progress.summary}</p>
            )}
          </Progress>
        </div>
      )}

      <Separator />

      {/* Steps */}
      <Stepper className="px-5 py-2">
        {steps.map((s) => {
          const trailing =
            s.trailingLabel === undefined && s.status === "active" && progress?.badgeLabel
              ? progress.badgeLabel
              : (s.trailingLabel ?? STATUS_TRAILING_LABEL[s.status])
          return (
            <Step
              key={s.id}
              status={s.status}
              size={density === "detailed" ? "detailed" : "compact"}
              title={s.title}
              description={density === "detailed" ? s.description : undefined}
              trailing={
                <Badge variant={STATUS_BADGE_VARIANT[s.status]}>
                  {s.status === "active" && (
                    <span className="inline-block size-1.5 animate-pulse rounded-full bg-current" />
                  )}
                  {trailing}
                </Badge>
              }
            />
          )
        })}
      </Stepper>

      {showFooter && (
        <>
          <Separator />
          <div className="flex items-center gap-3 px-4 py-2.5">
            {meta && <p className="text-muted-foreground text-xs">{meta}</p>}
            <div className="ml-auto flex items-center gap-1.5">
              {actions ?? (
                <>
                  {onCancel && (
                    <Button variant="ghost" size="sm" onClick={onCancel}>
                      Cancel
                    </Button>
                  )}
                  {onOpen && (
                    <Button variant="outline" size="sm" onClick={onOpen}>
                      Open
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}

      {children}
    </div>
  )
}

export type {
  AgentProgressDensity,
  AgentProgressProgress,
  AgentProgressProps,
  AgentProgressState,
  AgentProgressStep,
}
export { AgentProgress }
