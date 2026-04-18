import { AlertTriangle } from "lucide-react"
import type { ComponentProps } from "react"

import { cn } from "../lib/utils"

type FlagCalloutProps = ComponentProps<"div"> & {
  flags: string[]
  tone?: "highlight" | "blush"
}

function FlagCallout({ flags, tone = "highlight", className, ...props }: FlagCalloutProps) {
  if (!flags.length) return null

  const background = `color-mix(in oklab, var(--${tone}) 35%, transparent)`
  const borderColor = `color-mix(in oklab, var(--${tone}-ink) 25%, transparent)`
  const ink = `var(--${tone}-ink)`

  return (
    <div
      data-slot="flag-callout"
      data-tone={tone}
      className={cn(
        "flex flex-wrap items-center gap-2.5 rounded-[var(--radius-md)] border px-4 py-3",
        className,
      )}
      style={{ background, borderColor }}
      {...props}
    >
      <AlertTriangle className="size-[15px]" style={{ color: ink }} />
      <span className="font-semibold text-[13px]" style={{ color: ink }}>
        {flags.length} compliance flag{flags.length > 1 ? "s" : ""}
      </span>
      <div className="ml-auto flex flex-wrap gap-1">
        {flags.map((f) => (
          <span
            key={f}
            className="rounded-full bg-card px-2 py-[3px] font-mono font-semibold text-[10px] uppercase tracking-wider"
            style={{ color: ink }}
          >
            {f.replace(/_/g, " ")}
          </span>
        ))}
      </div>
    </div>
  )
}

export type { FlagCalloutProps }
export { FlagCallout }
