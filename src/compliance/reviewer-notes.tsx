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
        "rounded-[var(--radius-lg)] border border-border bg-card px-[18px] pb-1 shadow-[var(--shadow-card)]",
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
              className="flex size-6 items-center justify-center rounded-full font-bold text-[11px]"
              style={{
                background: toneBg[n.avatarTone ?? "sky"],
                color: toneFg[n.avatarTone ?? "sky"],
              }}
            >
              {n.who[0]}
            </div>
            <span className="font-semibold text-[13px]">{n.who}</span>
            <span className="text-muted-foreground text-xs">· {n.role}</span>
            <span className="ml-auto text-muted-foreground text-xs">{n.at}</span>
          </div>
          <div className="text-[13px] leading-relaxed">{n.body}</div>
        </div>
      ))}

      <div className="my-3.5 rounded-[var(--radius-md)] border border-border bg-card p-2.5">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") submit()
          }}
          placeholder="Add a reviewer note…"
          aria-label="Reviewer note"
          className="min-h-[54px] w-full resize-y rounded-[var(--radius-sm)] border-none bg-transparent text-[13px] leading-relaxed outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <div className="mt-1.5 flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground">⌘ + Enter to submit</span>
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
