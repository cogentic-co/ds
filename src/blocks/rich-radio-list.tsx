"use client"

import type * as React from "react"
import { Card } from "../components/card"
import { RadioGroup, RadioGroupItem } from "../components/radio-group"
import { cn } from "../lib/utils"

type RichRadioOption = {
  value: string
  title: string
  description?: string
  disabled?: boolean
}

type RichRadioListProps = {
  options: RichRadioOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  name?: string
  className?: string
  "aria-label"?: string
  "aria-labelledby"?: string
}

function RichRadioList({
  options,
  value,
  defaultValue,
  onValueChange,
  name,
  className,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: RichRadioListProps) {
  return (
    <Card padding="none" className={cn("overflow-hidden", className)}>
      <RadioGroup
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        name={name}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className="divide-y divide-border"
      >
        {options.map((option) => {
          const id = `rich-radio-${name ?? "list"}-${option.value}`
          return (
            // biome-ignore lint/a11y/noLabelWithoutControl: the radio is rendered inside via htmlFor
            <label
              key={option.value}
              htmlFor={id}
              data-slot="rich-radio-list-item"
              className={cn(
                "flex cursor-pointer items-start gap-3 p-5",
                "transition-colors hover:bg-muted/30",
                option.disabled && "cursor-not-allowed opacity-50 hover:bg-transparent",
              )}
            >
              <RadioGroupItem
                id={id}
                value={option.value}
                disabled={option.disabled}
                className="mt-0.5"
                aria-label={option.title}
              />
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-sm">{option.title}</div>
                {option.description && (
                  <div className="mt-0.5 text-muted-foreground text-sm">{option.description}</div>
                )}
              </div>
            </label>
          )
        })}
      </RadioGroup>
    </Card>
  )
}

export { RichRadioList }
export type { RichRadioListProps, RichRadioOption }
