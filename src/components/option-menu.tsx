"use client"

import type { ComponentProps, ReactNode } from "react"
import { cn } from "../lib/utils"

type OptionMenuItem = {
  value: string
  label: string
  description?: string
  icon?: ReactNode
  /** Optional short prefix rendered in muted color before the label (e.g. "/" or "@"). */
  prefix?: string
}

type OptionMenuProps = Omit<ComponentProps<"div">, "onSelect"> & {
  /** Visibility — when false, nothing is rendered. */
  open: boolean
  /** Optional uppercase section heading. */
  heading?: string
  items: OptionMenuItem[]
  /** Currently highlighted value. */
  selectedValue?: string
  /** Fires when hover or external nav changes the highlight. */
  onSelectionChange?: (value: string) => void
  /** Fires when an item is committed (click or external Enter). */
  onSelect: (item: OptionMenuItem) => void
  /** Position above (`top`, default) or below (`bottom`) the anchor. */
  position?: "top" | "bottom"
}

/**
 * Listbox popover driven by external state. Use when a separate input
 * (textarea, contentEditable, etc.) owns focus and keyboard, but you
 * need to surface a list of options with a visible highlight.
 *
 * The parent is responsible for arrow-key navigation — call
 * `onSelectionChange(item.value)` to move the highlight, then call
 * `onSelect(item)` to commit. Hover within the menu updates the
 * highlight automatically.
 */
function OptionMenu({
  open,
  heading,
  items,
  selectedValue,
  onSelectionChange,
  onSelect,
  position = "top",
  className,
  ...props
}: OptionMenuProps) {
  if (!open || items.length === 0) return null

  const positionClass = position === "bottom" ? "top-full mt-1.5" : "bottom-full mb-1.5"

  return (
    <div
      data-slot="option-menu"
      role="listbox"
      aria-label={heading ?? "Options"}
      className={cn(
        "absolute left-0 z-50 w-full max-w-sm overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md",
        positionClass,
        className,
      )}
      {...props}
    >
      {heading && (
        <div className="px-2 py-1 font-medium text-[10px] text-muted-foreground uppercase tracking-wide">
          {heading}
        </div>
      )}
      {items.map((item) => {
        const isActive = item.value === selectedValue
        return (
          <button
            key={item.value}
            type="button"
            role="option"
            aria-selected={isActive}
            data-selected={isActive || undefined}
            onMouseEnter={() => onSelectionChange?.(item.value)}
            onMouseDown={(event) => {
              event.preventDefault()
              onSelect(item)
            }}
            className={cn(
              "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm outline-none transition-colors",
              isActive ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-accent/40",
            )}
          >
            {item.icon && (
              <span className="flex size-4 items-center justify-center text-muted-foreground">
                {item.icon}
              </span>
            )}
            <span className="font-mono text-xs">
              {item.prefix && <span className="text-muted-foreground">{item.prefix}</span>}
              {item.label}
            </span>
            {item.description && (
              <span className="ml-auto truncate text-muted-foreground text-xs">
                {item.description}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export type { OptionMenuItem, OptionMenuProps }
export { OptionMenu }
