"use client"

import { CheckIcon, ClipboardIcon } from "lucide-react"
import { useCallback, useState } from "react"
import { cn } from "@/src/lib/utils"

// Pre-highlighted code viewer for layout source files. Receives the shiki
// HTML for both themes from the server component (page.tsx) so there's no
// client-side highlighter cost and no hydration flash.

type Props = {
  code: string
  filename: string
  highlightedLight: string
  highlightedDark: string
}

export function LayoutSource({ code, filename, highlightedLight, highlightedDark }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [code])

  return (
    <div
      data-slot="layout-source"
      className={cn(
        "relative overflow-hidden rounded-lg border border-border bg-card",
        "[&_pre]:!bg-transparent [&_pre]:overflow-x-auto [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-xs [&_pre]:leading-relaxed",
      )}
    >
      <div className="flex items-center justify-between border-border border-b bg-muted/40 px-3 py-1.5">
        <span className="font-medium font-mono text-muted-foreground text-xxs uppercase tracking-wider">
          {filename}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="ml-auto inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-muted-foreground text-xs transition-colors hover:bg-muted hover:text-foreground"
          aria-label={copied ? "Copied" : "Copy source"}
        >
          {copied ? <CheckIcon className="size-3.5" /> : <ClipboardIcon className="size-3.5" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="block dark:hidden" dangerouslySetInnerHTML={{ __html: highlightedLight }} />
      <div className="hidden dark:block" dangerouslySetInnerHTML={{ __html: highlightedDark }} />
    </div>
  )
}
