"use client"

import { ArrowUp, Globe, Mic, MoreHorizontal, Plus, Square } from "lucide-react"
import type { ReactNode } from "react"
import { useState } from "react"

import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from "../chatbot/prompt-input"
import { Button } from "../components/button"
import { cn } from "../lib/utils"

/**
 * Polished prompt input with a row of action buttons (left = Plus / Search /
 * More, right = Voice / Submit). Mirrors the prompt-kit "PromptInputWithActions"
 * block but built entirely from `@cogentic-co/ds` primitives.
 *
 * Self-managed by default; pass `value` + `onValueChange` to control externally.
 * `onSubmit(text, files)` is fired when the user hits enter or clicks submit.
 */

type PromptInputActionsBlockProps = {
  /** Controlled value (uncontrolled if omitted). */
  value?: string
  onValueChange?: (value: string) => void
  /** Submit handler. Return a promise to keep `isLoading` true while the call runs. */
  onSubmit?: (message: string, files: File[]) => void | Promise<void>
  isLoading?: boolean
  placeholder?: string
  /** Override the left-side actions (defaults to Plus / Search / More). */
  leftActions?: ReactNode
  /** Override the right-side actions (Voice button by default). */
  rightActions?: ReactNode
  className?: string
}

function DefaultLeftActions() {
  return (
    <>
      <PromptInputAction tooltip="Add a new action">
        <Button variant="outline" size="icon" className="size-9 rounded-full">
          <Plus className="size-4" />
        </Button>
      </PromptInputAction>
      <PromptInputAction tooltip="Search">
        <Button variant="outline" className="rounded-full">
          <Globe className="size-4" />
          Search
        </Button>
      </PromptInputAction>
      <PromptInputAction tooltip="More actions">
        <Button variant="outline" size="icon" className="size-9 rounded-full">
          <MoreHorizontal className="size-4" />
        </Button>
      </PromptInputAction>
    </>
  )
}

function DefaultRightActions() {
  return (
    <PromptInputAction tooltip="Voice input">
      <Button variant="outline" size="icon" className="size-9 rounded-full">
        <Mic className="size-4" />
      </Button>
    </PromptInputAction>
  )
}

function PromptInputActionsBlock({
  value: controlledValue,
  onValueChange,
  onSubmit,
  isLoading: externalLoading,
  placeholder = "Ask anything",
  leftActions,
  rightActions,
  className,
}: PromptInputActionsBlockProps) {
  const [internalLoading, setInternalLoading] = useState(false)
  const isLoading = externalLoading ?? internalLoading

  const handleSubmit = async (message: string, files: File[]) => {
    if (!onSubmit) return
    if (externalLoading === undefined) setInternalLoading(true)
    try {
      await onSubmit(message, files)
    } finally {
      if (externalLoading === undefined) setInternalLoading(false)
    }
  }

  return (
    <PromptInput
      value={controlledValue}
      onValueChange={onValueChange}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      className={cn(
        "relative w-full rounded-3xl border-input bg-popover p-0 pt-1 shadow-xs",
        className,
      )}
    >
      <div className="flex flex-col">
        <PromptInputTextarea
          placeholder={placeholder}
          className="min-h-[44px] pt-3 pl-4 text-base leading-[1.3]"
        />
        <div className="mt-5 flex w-full items-center justify-between gap-2 px-3 pb-3">
          <PromptInputActions>{leftActions ?? <DefaultLeftActions />}</PromptInputActions>
          <PromptInputActions>
            {rightActions ?? <DefaultRightActions />}
            <SubmitButton isLoading={isLoading} />
          </PromptInputActions>
        </div>
      </div>
    </PromptInput>
  )
}

function SubmitButton({ isLoading }: { isLoading: boolean }) {
  return (
    <Button
      type="submit"
      size="icon"
      className="size-9 rounded-full"
      aria-label={isLoading ? "Stop generation" : "Send message"}
    >
      {isLoading ? <Square className="size-3" /> : <ArrowUp className="size-4" />}
    </Button>
  )
}

export type { PromptInputActionsBlockProps }
export { PromptInputActionsBlock }
