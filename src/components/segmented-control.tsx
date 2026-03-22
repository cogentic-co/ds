"use client"

import type * as React from "react"
import { useState } from "react"
import { cn } from "../lib/utils"

type SegmentedControlProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  options: { value: string; label: React.ReactNode }[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
}

function SegmentedControl({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  className,
  ...props
}: SegmentedControlProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? options[0]?.value)
  const value = controlledValue ?? internalValue

  const selectedIndex = options.findIndex((o) => o.value === value)

  return (
    <div
      data-slot="segmented-control"
      role="radiogroup"
      className={cn("relative inline-flex items-center rounded-lg bg-muted p-1", className)}
      {...props}
    >
      <div
        className="absolute inset-y-1 rounded-md bg-background shadow-sm transition-all duration-200"
        style={{
          width: `${100 / options.length}%`,
          left: `${(selectedIndex * 100) / options.length}%`,
        }}
      />
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          onClick={() => {
            if (controlledValue === undefined) setInternalValue(option.value)
            onChange?.(option.value)
          }}
          className={cn(
            "relative z-10 flex-1 rounded-md px-3 py-1.5 font-medium text-sm transition-colors",
            value === option.value
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export { SegmentedControl }
export type { SegmentedControlProps }
