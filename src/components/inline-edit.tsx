"use client"

import { CheckIcon, PencilIcon, XIcon } from "lucide-react"
import type * as React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "../lib/utils"

type InlineEditProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  /** Current value */
  value: string
  /** Called when edit is confirmed */
  onChange: (value: string) => void
  /** Render the display value (defaults to plain text) */
  renderDisplay?: (value: string) => React.ReactNode
  /** Placeholder when value is empty */
  placeholder?: string
}

function InlineEdit({
  value,
  onChange,
  renderDisplay,
  placeholder = "Click to edit",
  className,
  ...props
}: InlineEditProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setDraft(value)
  }, [value])

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  const confirm = useCallback(() => {
    onChange(draft)
    setEditing(false)
  }, [draft, onChange])

  const cancel = useCallback(() => {
    setDraft(value)
    setEditing(false)
  }, [value])

  if (editing) {
    return (
      <div data-slot="inline-edit" className={cn("flex items-center gap-1", className)} {...props}>
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") confirm()
            if (e.key === "Escape") cancel()
          }}
          className="flex-1 rounded-md border bg-card px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="button"
          onClick={confirm}
          className="rounded-md p-1 text-muted-foreground hover:text-foreground"
          aria-label="Confirm"
        >
          <CheckIcon className="size-3.5" />
        </button>
        <button
          type="button"
          onClick={cancel}
          className="rounded-md p-1 text-muted-foreground hover:text-foreground"
          aria-label="Cancel"
        >
          <XIcon className="size-3.5" />
        </button>
      </div>
    )
  }

  return (
    <div
      data-slot="inline-edit"
      className={cn("group inline-flex cursor-pointer items-center gap-1", className)}
      onClick={() => setEditing(true)}
      onKeyDown={(e) => {
        if (e.key === "Enter") setEditing(true)
      }}
      role="button"
      tabIndex={0}
      {...props}
    >
      <span className={cn(!value && "text-muted-foreground")}>
        {renderDisplay ? renderDisplay(value) : value || placeholder}
      </span>
      <PencilIcon className="size-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  )
}

export { InlineEdit }
export type { InlineEditProps }
