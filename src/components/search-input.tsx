"use client"

import { Search } from "lucide-react"
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react"

import { cn } from "../lib/utils"
import { Input } from "./input"
import { Spinner } from "./spinner"

/* ── Types ── */

type SearchInputProps<T> = Omit<React.ComponentProps<"div">, "onSelect"> & {
  onSearch: (query: string) => Promise<T[]>
  renderItem: (item: T, index: number, highlighted: boolean) => ReactNode
  onSelect?: (item: T) => void
  getItemId?: (item: T, index: number) => string
  placeholder?: string
  minQueryLength?: number
  debounceMs?: number
  emptyState?: ReactNode
  inputClassName?: string
}

/* ── Component ── */

function SearchInput<T>({
  onSearch,
  renderItem,
  onSelect,
  getItemId,
  placeholder = "Search...",
  minQueryLength = 2,
  debounceMs = 300,
  emptyState,
  className,
  inputClassName,
  ...props
}: SearchInputProps<T>) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [searched, setSearched] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const ref = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const loadingTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (query.length < minQueryLength) {
      setResults([])
      setOpen(false)
      setLoading(false)
      setSearched(false)
      return
    }

    setLoading(true)

    const timer = setTimeout(async () => {
      try {
        const data = await onSearch(query)
        setResults(data)
        setSearched(true)
        setOpen(true)
      } finally {
        if (loadingTimer.current) clearTimeout(loadingTimer.current)
        loadingTimer.current = setTimeout(() => setLoading(false), 400)
      }
    }, debounceMs)

    return () => {
      clearTimeout(timer)
    }
  }, [query, minQueryLength, debounceMs, onSearch])

  useEffect(() => {
    setHighlightedIndex(-1)
  }, [])

  // Click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Auto-scroll highlighted item
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll("[data-search-item]")
      const el = items[highlightedIndex] as HTMLElement | undefined
      el?.scrollIntoView?.({ block: "nearest" })
    }
  }, [highlightedIndex])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        setOpen(false)
        setHighlightedIndex(-1)
        return
      }

      if (!open || results.length === 0) return

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setHighlightedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0))
          break
        case "ArrowUp":
          e.preventDefault()
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1))
          break
        case "Enter":
          if (highlightedIndex >= 0 && onSelect) {
            e.preventDefault()
            onSelect(results[highlightedIndex])
            setOpen(false)
          }
          break
      }
    },
    [open, results, highlightedIndex, onSelect],
  )

  const itemId = useCallback(
    (item: T, index: number) => {
      if (getItemId) return getItemId(item, index)
      return `search-result-${index}`
    },
    [getItemId],
  )

  return (
    <div ref={ref} data-slot="search-input" className={cn("relative w-full", className)} {...props}>
      <div
        className={cn(
          "overflow-hidden rounded-xl border border-border bg-card transition-shadow duration-200",
          open ? "ring-2 ring-ring" : "focus-within:ring-2 focus-within:ring-ring",
        )}
      >
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => searched && setOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={cn(
              "h-auto rounded-none border-0 bg-transparent px-12 py-4 text-foreground text-lg shadow-none placeholder:text-muted-foreground focus-visible:border-0 focus-visible:ring-0",
              inputClassName,
            )}
            role="combobox"
            aria-expanded={open}
            aria-activedescendant={
              highlightedIndex >= 0
                ? itemId(results[highlightedIndex], highlightedIndex)
                : undefined
            }
          />
          {loading && (
            <div className="absolute top-1/2 right-4 -translate-y-1/2">
              <Spinner />
            </div>
          )}
        </div>

        {open && (
          <div
            ref={listRef}
            data-slot="search-input-results"
            className="max-h-96 overflow-y-auto border-border border-t"
            role="listbox"
          >
            {results.length === 0 && searched && !loading && (
              <div className="px-4 py-4">
                {emptyState ?? (
                  <p className="text-muted-foreground text-sm">
                    No results found for &ldquo;{query}&rdquo;
                  </p>
                )}
              </div>
            )}
            {results.map((item, i) => (
              <div
                key={itemId(item, i)}
                id={itemId(item, i)}
                data-search-item
                role="option"
                aria-selected={i === highlightedIndex}
                onClick={() => {
                  onSelect?.(item)
                  setOpen(false)
                }}
                onMouseEnter={() => setHighlightedIndex(i)}
                onMouseLeave={() => setHighlightedIndex(-1)}
                className={cn(
                  "flex w-full cursor-pointer items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-accent",
                  i === highlightedIndex && "bg-primary/10 ring-1 ring-primary/20",
                  i !== highlightedIndex && i % 2 === 1 && "bg-muted/30",
                )}
              >
                {renderItem(item, i, i === highlightedIndex)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export { SearchInput }
export type { SearchInputProps }
