"use client"

import { ArrowUp, Brain } from "lucide-react"
import type { ReactNode } from "react"
import { useState } from "react"

import { PromptInput, PromptInputFooter, PromptInputTextarea } from "../chatbot/prompt-input"
import { Suggestion, Suggestions } from "../chatbot/suggestion"
import { Button } from "../components/button"
import { cn } from "../lib/utils"

/**
 * Prompt input + a two-level suggestion picker. First click reveals a
 * group's items, then clicking an item pre-fills the input. Mirrors
 * prompt-kit's "PromptInputWithSuggestions" block but uses our primitives.
 */

type SuggestionGroup = {
  /** Group label shown on the chip. */
  label: string
  /** Highlighted prefix in each item (e.g. "Help me"). */
  highlight: string
  /** The expanded items shown after the group is clicked. */
  items: string[]
  /** Override the chip icon (defaults to Brain). */
  icon?: ReactNode
}

type PromptInputSuggestionsBlockProps = {
  groups: SuggestionGroup[]
  /** Submit handler. */
  onSubmit?: (message: string) => void | Promise<void>
  /** Default value (uncontrolled). */
  defaultValue?: string
  isLoading?: boolean
  placeholder?: string
  className?: string
}

function PromptInputSuggestionsBlock({
  groups,
  onSubmit,
  defaultValue = "",
  isLoading: externalLoading,
  placeholder = "Ask anything…",
  className,
}: PromptInputSuggestionsBlockProps) {
  const [value, setValue] = useState(defaultValue)
  const [activeGroup, setActiveGroup] = useState<string>("")
  const [internalLoading, setInternalLoading] = useState(false)
  const isLoading = externalLoading ?? internalLoading

  const handleValueChange = (next: string) => {
    setValue(next)
    if (next.trim() === "") setActiveGroup("")
  }

  const handleSubmit = async (message: string) => {
    if (!message.trim() || !onSubmit) return
    if (externalLoading === undefined) setInternalLoading(true)
    try {
      await onSubmit(message)
      setValue("")
      setActiveGroup("")
    } finally {
      if (externalLoading === undefined) setInternalLoading(false)
    }
  }

  const active = groups.find((g) => g.label === activeGroup)

  return (
    <div className={cn("mx-auto flex w-full max-w-3xl flex-col gap-3", className)}>
      <PromptInput
        value={value}
        onValueChange={handleValueChange}
        isLoading={isLoading}
        onSubmit={(text) => handleSubmit(text)}
        className="relative w-full rounded-3xl border-input bg-popover p-0 pt-1 shadow-xs"
      >
        <PromptInputTextarea
          placeholder={placeholder}
          className="min-h-[44px] pt-3 pl-4 text-base leading-[1.3]"
        />
        <PromptInputFooter className="mt-5 w-full justify-end px-3 pb-3">
          <Button
            type="submit"
            size="icon"
            className="size-9 rounded-full"
            disabled={!value.trim() || isLoading}
            aria-label="Send message"
          >
            <ArrowUp className="size-4" />
          </Button>
        </PromptInputFooter>
      </PromptInput>

      {active ? (
        <Suggestions className="flex-col items-stretch gap-1">
          {active.items.map((item) => (
            <Suggestion
              key={item}
              highlight={active.highlight}
              className="justify-start text-left"
              onClick={() => setValue(item)}
            >
              {item}
            </Suggestion>
          ))}
        </Suggestions>
      ) : (
        <Suggestions>
          {groups.map((group) => (
            <Suggestion
              key={group.label}
              className="capitalize"
              onClick={() => {
                setActiveGroup(group.label)
                setValue("")
              }}
            >
              {group.icon ?? <Brain className="size-4" />}
              {group.label}
            </Suggestion>
          ))}
        </Suggestions>
      )}
    </div>
  )
}

export type { PromptInputSuggestionsBlockProps, SuggestionGroup }
export { PromptInputSuggestionsBlock }
