"use client"

import type { ComponentProps } from "react"
import { useState } from "react"

import { Button } from "../components/button"
import { cn } from "../lib/utils"
import type { ReviewerNote } from "./types"

type ReviewerNotesProps = Omit<ComponentProps<"div">, "onSubmit"> & {
  notes: ReviewerNote[]
  onSubmit?: (body: string) => void
}

const toneBg: Record<NonNullable<ReviewerNote["avatarTone"]>, string> = {
  sky: "var(--sky)",
  mint: "var(--mint)",
  lilac: "var(--lilac)",
  blush: "var(--blush)",
}
const toneFg: Record<NonNullable<ReviewerNote["avatarTone"]>, string> = {
  sky: "var(--sky-ink)",
  mint: "var(--mint-ink)",
  lilac: "var(--lilac-ink)",
  blush: "var(--blush-ink)",
}

function ReviewerNotes({ notes, onSubmit, className, ...props }: ReviewerNotesProps) {
  const [draft, setDraft] = useState("")
  const submit = () => {
    if (!draft.trim()) return
    onSubmit?.(draft.trim())
    setDraft("")
  }

  return (
    <div
      data-slot="reviewer-notes"
      className={cn(
        "rounded-lg border border-border bg-card px-[18px] pb-1 shadow-card",
        className,
      )}
      {...props}
    >
      {notes.map((n, i) => (
        <div
          key={`${n.who}-${n.at}`}
          className={cn("py-3.5", i < notes.length - 1 && "border-border-light border-b")}
        >
          <div className="mb-1.5 flex items-center gap-2">
            <div
              className="flex size-6 shrink-0 items-center justify-center rounded-full font-bold text-xxs"
              style={{
                background: toneBg[n.avatarTone ?? "sky"],
                color: toneFg[n.avatarTone ?? "sky"],
              }}
            >
              {n.who[0]}
            </div>
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <span className="truncate font-semibold text-sm-plus">{n.who}</span>
              <span className="hidden truncate text-muted-foreground text-xs sm:inline">
                · {n.role}
              </span>
            </div>
            <span className="shrink-0 whitespace-nowrap text-muted-foreground text-xs">{n.at}</span>
          </div>
          <div className="text-sm-plus leading-relaxed">{n.body}</div>
        </div>
      ))}

      <div className="my-3.5 rounded-md border border-border bg-card p-2.5">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") submit()
          }}
          placeholder="Add a reviewer note…"
          aria-label="Reviewer note"
          className="min-h-[54px] w-full resize-y rounded-sm border-none bg-transparent text-sm-plus leading-relaxed outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <div className="mt-1.5 flex items-center justify-between">
          <span className="text-muted-foreground text-xxs">⌘ + Enter to submit</span>
          <Button size="sm" onClick={submit}>
            Add note
          </Button>
        </div>
      </div>
    </div>
  )
}

export type { ReviewerNotesProps }
export { ReviewerNotes }
