"use client"

import { CheckCircle2, MessageSquare, XCircle } from "lucide-react"
import { type ComponentProps, useCallback, useState } from "react"
import { Button } from "../components/button"
import { Textarea } from "../components/textarea"
import { cn } from "../lib/utils"
import { ComplianceStatusBadge } from "./compliance-status-badge"

type ReviewDecision = "accepted" | "rejected" | "escalated"

type ReviewFormProps = Omit<ComponentProps<"div">, "onSubmit"> & {
  /** Called when the reviewer submits their decision */
  onSubmit: (decision: ReviewDecision, rationale: string) => void | Promise<void>
  /** Whether the form is in a submitting state */
  submitting?: boolean
  /** Pre-selected decision */
  defaultDecision?: ReviewDecision
  /** Placeholder text for the rationale field */
  rationalePlaceholder?: string
  /** Optional header content (e.g. transaction summary) */
  header?: React.ReactNode
}

const DECISIONS: { value: ReviewDecision; label: string; icon: React.ReactNode; variant: string }[] = [
  {
    value: "accepted",
    label: "Accept",
    icon: <CheckCircle2 className="size-4" />,
    variant: "border-emerald-700/40 bg-emerald-700/10 text-emerald-700 dark:border-emerald-400/40 dark:text-emerald-400",
  },
  {
    value: "rejected",
    label: "Reject",
    icon: <XCircle className="size-4" />,
    variant: "border-red-700/40 bg-red-700/10 text-red-700 dark:border-red-400/40 dark:text-red-400",
  },
  {
    value: "escalated",
    label: "Escalate",
    icon: <MessageSquare className="size-4" />,
    variant: "border-amber-700/40 bg-amber-700/10 text-amber-700 dark:border-amber-400/40 dark:text-amber-400",
  },
]

function ReviewForm({
  onSubmit,
  submitting = false,
  defaultDecision,
  rationalePlaceholder = "Provide your rationale for this decision...",
  header,
  className,
  ...props
}: ReviewFormProps) {
  const [decision, setDecision] = useState<ReviewDecision | null>(defaultDecision ?? null)
  const [rationale, setRationale] = useState("")

  const handleSubmit = useCallback(async () => {
    if (!decision || !rationale.trim()) return
    await onSubmit(decision, rationale.trim())
  }, [decision, rationale, onSubmit])

  return (
    <div
      data-slot="review-form"
      className={cn("flex flex-col gap-4 rounded-xl border border-border bg-card p-5", className)}
      {...props}
    >
      {header}
      <div>
        <span className="mb-2 block font-medium text-sm">Decision</span>
        <div className="flex gap-2">
          {DECISIONS.map((d) => (
            <button
              key={d.value}
              type="button"
              onClick={() => setDecision(d.value)}
              className={cn(
                "flex items-center gap-1.5 rounded-md border px-3 py-2 font-medium text-xs transition-all",
                decision === d.value
                  ? d.variant
                  : "border-border text-muted-foreground hover:border-foreground/20",
              )}
            >
              {d.icon}
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="mb-2 block font-medium text-sm">Rationale</span>
        <Textarea
          value={rationale}
          onChange={(e) => setRationale(e.target.value)}
          placeholder={rationalePlaceholder}
          rows={4}
          className="text-sm"
        />
      </div>

      <div className="flex items-center justify-between">
        {decision && <ComplianceStatusBadge status={decision} />}
        <Button
          size="sm"
          onClick={handleSubmit}
          disabled={!decision || !rationale.trim() || submitting}
          className="ml-auto"
        >
          {submitting ? "Submitting..." : "Submit review"}
        </Button>
      </div>
    </div>
  )
}

export { ReviewForm }
export type { ReviewDecision, ReviewFormProps }
