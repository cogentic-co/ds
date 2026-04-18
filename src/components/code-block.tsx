"use client"

import { CheckIcon, ClipboardIcon } from "lucide-react"
import type * as React from "react"
import { useCallback, useState } from "react"
import { cn } from "../lib/utils"

type CodeBlockProps = React.ComponentProps<"div"> & {
  /** The code content */
  code: string
  /** Language label (shown in header) */
  language?: string
  /** Show line numbers */
  showLineNumbers?: boolean
  /** Show copy button */
  showCopy?: boolean
}

function CodeBlock({
  code,
  language,
  showLineNumbers = false,
  showCopy = true,
  className,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [code])

  const lines = code.split("\n")

  return (
    <div
      data-slot="code-block"
      className={cn("relative rounded-lg border bg-muted", className)}
      {...props}
    >
      {(language || showCopy) && (
        <div className="flex items-center justify-between border-b px-4 py-2">
          {language && (
            <span className="font-medium text-muted-foreground text-xs">{language}</span>
          )}
          {showCopy && (
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-muted-foreground text-xs transition-colors hover:text-foreground"
            >
              {copied ? <CheckIcon className="size-3.5" /> : <ClipboardIcon className="size-3.5" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          )}
        </div>
      )}
      <pre className="overflow-x-auto p-4 font-mono text-sm">
        <code>
          {showLineNumbers
            ? lines.map((line, i) => (
                <span key={i} className="table-row">
                  <span className="table-cell select-none pr-4 text-right text-muted-foreground/50">
                    {i + 1}
                  </span>
                  <span className="table-cell">{line}</span>
                  {"\n"}
                </span>
              ))
            : code}
        </code>
      </pre>
    </div>
  )
}

export type { CodeBlockProps }
export { CodeBlock }
