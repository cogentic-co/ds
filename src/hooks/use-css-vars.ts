"use client"

import { useEffect, useState } from "react"

/**
 * Resolve a set of CSS custom properties to their computed values so
 * they can be passed into APIs that don't honour `var(--...)` — most
 * notably canvas 2D context's `fillStyle`.
 *
 * Returns an empty object on first render; the resolved map is filled
 * in on mount via `getComputedStyle(document.documentElement)`.
 *
 * Callers typically pass an inline array literal (`["--primary"]`),
 * so we stabilise the dependency with `names.join()` — otherwise the
 * effect would re-run every render and cause an update loop.
 */
export function useResolvedCssVars(names: readonly string[]): Record<string, string> {
  const [resolved, setResolved] = useState<Record<string, string>>({})
  const key = names.join("|")

  useEffect(() => {
    const list = key.split("|")
    const style = getComputedStyle(document.documentElement)
    const out: Record<string, string> = {}
    for (const name of list) {
      out[name] = style.getPropertyValue(name).trim() || ""
    }
    setResolved(out)
  }, [key])

  return resolved
}
