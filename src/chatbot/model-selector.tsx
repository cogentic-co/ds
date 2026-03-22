"use client"

import { Check, ChevronDown, Search } from "lucide-react"
import {
  type ComponentProps,
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { cn } from "../lib/utils"

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

type ModelSelectorContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  search: string
  setSearch: (search: string) => void
  selected: string | null
  onSelect: (modelId: string) => void
}

const ModelSelectorContext = createContext<ModelSelectorContextValue | null>(null)

function useModelSelector() {
  const ctx = useContext(ModelSelectorContext)
  if (!ctx) throw new Error("useModelSelector must be used within <ModelSelector>")
  return ctx
}

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

function ModelSelector({
  value,
  onValueChange,
  children,
}: {
  value?: string
  onValueChange?: (modelId: string) => void
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState(value ?? null)

  useEffect(() => {
    if (value !== undefined) setSelected(value)
  }, [value])

  const onSelect = useCallback(
    (modelId: string) => {
      setSelected(modelId)
      onValueChange?.(modelId)
      setOpen(false)
      setSearch("")
    },
    [onValueChange],
  )

  return (
    <ModelSelectorContext.Provider value={{ open, setOpen, search, setSearch, selected, onSelect }}>
      <div data-slot="model-selector" className="relative">
        {children}
      </div>
    </ModelSelectorContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// Trigger
// ---------------------------------------------------------------------------

function ModelSelectorTrigger({ className, children, ...props }: ComponentProps<"button">) {
  const { open, setOpen, selected } = useModelSelector()

  return (
    <button
      data-slot="model-selector-trigger"
      type="button"
      onClick={() => setOpen(!open)}
      aria-haspopup="listbox"
      aria-expanded={open}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm",
        "transition-colors hover:bg-accent",
        className,
      )}
      {...props}
    >
      {children ?? selected ?? "Select model"}
      <ChevronDown
        aria-hidden="true"
        className={cn("size-3.5 text-muted-foreground transition-transform", open && "rotate-180")}
      />
    </button>
  )
}

// ---------------------------------------------------------------------------
// Content (dropdown)
// ---------------------------------------------------------------------------

function ModelSelectorContent({ className, children, ...props }: ComponentProps<"div">) {
  const { open, setOpen } = useModelSelector()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [open, setOpen])

  if (!open) return null

  return (
    <div
      ref={ref}
      data-slot="model-selector-content"
      className={cn(
        "absolute top-full left-0 z-50 mt-1 w-72",
        "rounded-xl border border-border bg-popover p-1 shadow-lg",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Search input
// ---------------------------------------------------------------------------

function ModelSelectorInput({ className, ...props }: ComponentProps<"input">) {
  const { search, setSearch } = useModelSelector()

  return (
    <div className="relative px-1 pb-1">
      <Search
        aria-hidden="true"
        className="absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-foreground"
      />
      <input
        data-slot="model-selector-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search models..."
        aria-label="Search models"
        className={cn(
          "w-full rounded-lg bg-muted/50 py-2 pr-3 pl-8 text-sm",
          "placeholder:text-muted-foreground focus:outline-none",
          className,
        )}
        {...props}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// List / Group / Item
// ---------------------------------------------------------------------------

function ModelSelectorList({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="model-selector-list"
      role="listbox"
      aria-label="Models"
      className={cn("max-h-64 overflow-y-auto", className)}
      {...props}
    />
  )
}

function ModelSelectorGroup({
  label,
  className,
  children,
  ...props
}: ComponentProps<"div"> & { label?: string }) {
  return (
    <div data-slot="model-selector-group" className={cn("py-1", className)} {...props}>
      {label && (
        <p className="px-2 py-1.5 font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
          {label}
        </p>
      )}
      {children}
    </div>
  )
}

function ModelSelectorItem({
  value,
  logo,
  name,
  description,
  className,
  ...props
}: ComponentProps<"button"> & {
  value: string
  logo?: ReactNode
  name: string
  description?: string
}) {
  const { selected, onSelect, search } = useModelSelector()
  const isSelected = selected === value

  // Filter by search
  const visible = useMemo(() => {
    if (!search) return true
    const q = search.toLowerCase()
    return name.toLowerCase().includes(q) || value.toLowerCase().includes(q)
  }, [search, name, value])

  if (!visible) return null

  return (
    <button
      data-slot="model-selector-item"
      type="button"
      role="option"
      aria-selected={isSelected}
      onClick={() => onSelect(value)}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm",
        "transition-colors hover:bg-muted/50",
        isSelected && "bg-muted",
        className,
      )}
      {...props}
    >
      {logo && (
        <span className="shrink-0 [&>img]:size-5 [&>img]:rounded [&>svg]:size-4">{logo}</span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate font-medium text-foreground">{name}</span>
        {description && (
          <span className="block truncate text-muted-foreground text-xs">{description}</span>
        )}
      </span>
      {isSelected && <Check aria-hidden="true" className="size-4 shrink-0 text-primary" />}
    </button>
  )
}

function ModelSelectorEmpty({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="model-selector-empty"
      className={cn("py-6 text-center text-muted-foreground text-sm", className)}
      {...props}
    >
      {props.children ?? "No models found."}
    </div>
  )
}

function ModelSelectorSeparator({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="model-selector-separator"
      role="separator"
      className={cn("mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

export {
  ModelSelector,
  ModelSelectorTrigger,
  ModelSelectorContent,
  ModelSelectorInput,
  ModelSelectorList,
  ModelSelectorGroup,
  ModelSelectorItem,
  ModelSelectorEmpty,
  ModelSelectorSeparator,
  useModelSelector,
}
