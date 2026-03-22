"use client"

import { RotateCcw } from "lucide-react"
import { useCallback, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NativeSelect } from "@/components/ui/native-select"
import { Separator } from "@/components/ui/separator"

/* ──────────────────────────────────────────────────────────────────────────
 * Control type definitions
 * ──────────────────────────────────────────────────────────────────────── */

type SelectControl = {
  type: "select"
  options: string[]
  defaultValue: string
}

type BooleanControl = {
  type: "boolean"
  defaultValue: boolean
}

type TextControl = {
  type: "text"
  defaultValue: string
  placeholder?: string
}

type NumberControl = {
  type: "number"
  defaultValue: number
  min?: number
  max?: number
  step?: number
}

type RadioControl = {
  type: "radio"
  options: string[]
  defaultValue: string
}

export type ControlDef = (
  | SelectControl
  | BooleanControl
  | TextControl
  | NumberControl
  | RadioControl
) & {
  label?: string
}

export type ControlDefs = Record<string, ControlDef>

type ControlValues<T extends ControlDefs> = {
  [K in keyof T]: T[K] extends BooleanControl
    ? boolean
    : T[K] extends NumberControl
      ? number
      : string
}

/* ──────────────────────────────────────────────────────────────────────────
 * useControls hook
 * ──────────────────────────────────────────────────────────────────────── */

function getDefaultValues<T extends ControlDefs>(defs: T): ControlValues<T> {
  const values: Record<string, unknown> = {}
  for (const [key, def] of Object.entries(defs)) {
    values[key] = def.defaultValue
  }
  return values as ControlValues<T>
}

export function useControls<T extends ControlDefs>(defs: T) {
  const defaults = useMemo(() => getDefaultValues(defs), [defs])
  const [values, setValues] = useState<ControlValues<T>>(defaults)

  const set = useCallback(<K extends keyof T>(key: K, value: ControlValues<T>[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }, [])

  const reset = useCallback(() => {
    setValues(defaults)
  }, [defaults])

  return { values, set, reset, defs }
}

/* ──────────────────────────────────────────────────────────────────────────
 * ControlsPanel — renders the control inputs
 * ──────────────────────────────────────────────────────────────────────── */

type ControlsPanelProps<T extends ControlDefs> = {
  controls: ReturnType<typeof useControls<T>>
}

export function ControlsPanel<T extends ControlDefs>({ controls }: ControlsPanelProps<T>) {
  const { values, set, reset, defs } = controls
  const entries = Object.entries(defs) as [string, ControlDef][]

  const hasChanges = useMemo(() => {
    for (const [key, def] of entries) {
      if (values[key] !== def.defaultValue) return true
    }
    return false
  }, [values, entries])

  return (
    <div data-slot="controls-panel" className="rounded-lg border bg-card">
      <div className="flex items-center justify-between px-4 py-2.5">
        <span className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
          Controls
        </span>
        {hasChanges && (
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={reset}>
            <RotateCcw className="mr-1 size-3" />
            Reset
          </Button>
        )}
      </div>
      <Separator />
      <div className="divide-y">
        {entries.map(([key, def]) => (
          <div key={key} className="flex items-center gap-3 px-4 py-3">
            <Label className="w-28 shrink-0 font-medium text-xs">{def.label || key}</Label>
            <div className="flex-1">
              <ControlInput
                def={def}
                value={values[key]}
                onChange={(v) => set(key as keyof T, v as ControlValues<T>[keyof T])}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────────
 * Individual control inputs
 * ──────────────────────────────────────────────────────────────────────── */

function ControlInput({
  def,
  value,
  onChange,
}: {
  def: ControlDef
  value: unknown
  onChange: (v: unknown) => void
}) {
  switch (def.type) {
    case "select":
      return (
        <NativeSelect
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          className="h-7 text-xs"
        >
          {def.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </NativeSelect>
      )

    case "boolean":
      return (
        <Checkbox checked={value as boolean} onCheckedChange={(checked) => onChange(!!checked)} />
      )

    case "text":
      return (
        <Input
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          placeholder={def.placeholder}
          className="h-7 text-xs"
        />
      )

    case "number":
      return (
        <Input
          type="number"
          value={value as number}
          onChange={(e) => onChange(Number(e.target.value))}
          min={def.min}
          max={def.max}
          step={def.step}
          className="h-7 w-24 text-xs"
        />
      )

    case "radio":
      return (
        <div className="flex flex-wrap gap-1">
          {def.options.map((opt) => (
            <Button
              key={opt}
              variant={value === opt ? "default" : "outline"}
              size="sm"
              className="h-6 px-2 text-xs"
              onClick={() => onChange(opt)}
            >
              {opt}
            </Button>
          ))}
        </div>
      )

    default:
      return null
  }
}

/* ──────────────────────────────────────────────────────────────────────────
 * Playground — combines preview + controls
 * ──────────────────────────────────────────────────────────────────────── */

type PlaygroundProps<T extends ControlDefs> = {
  controls: ReturnType<typeof useControls<T>>
  children: React.ReactNode
}

export function Playground<T extends ControlDefs>({ controls, children }: PlaygroundProps<T>) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-6">{children}</div>
      <ControlsPanel controls={controls} />
    </div>
  )
}
