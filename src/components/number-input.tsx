"use client"

import { MinusIcon, PlusIcon } from "lucide-react"
import type * as React from "react"
import { useCallback, useState } from "react"
import { cn } from "../lib/utils"
import { Button } from "./button"
import { Input } from "./input"

type NumberInputProps = Omit<React.ComponentProps<"input">, "type" | "value" | "onChange"> & {
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
}

function NumberInput({
  value: controlledValue,
  defaultValue = 0,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  className,
  disabled,
  ...props
}: NumberInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const value = controlledValue ?? internalValue

  const setValue = useCallback(
    (next: number) => {
      const clamped = Math.min(max, Math.max(min, next))
      if (controlledValue === undefined) setInternalValue(clamped)
      onChange?.(clamped)
    },
    [min, max, controlledValue, onChange],
  )

  return (
    <div data-slot="number-input" className={cn("flex items-center gap-1", className)}>
      <Button
        variant="outline"
        size="icon"
        className="size-8 shrink-0"
        onClick={() => setValue(value - step)}
        disabled={disabled || value <= min}
        aria-label="Decrease"
      >
        <MinusIcon className="size-3.5" />
      </Button>
      <Input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className="text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        {...props}
      />
      <Button
        variant="outline"
        size="icon"
        className="size-8 shrink-0"
        onClick={() => setValue(value + step)}
        disabled={disabled || value >= max}
        aria-label="Increase"
      >
        <PlusIcon className="size-3.5" />
      </Button>
    </div>
  )
}

export { NumberInput }
export type { NumberInputProps }
