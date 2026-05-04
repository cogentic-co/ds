"use client"

import { CheckIcon, ClipboardIcon } from "lucide-react"
import type * as React from "react"
import { useCallback, useEffect, useState } from "react"
import { highlightCode } from "../lib/highlighter"
import { cn } from "../lib/utils"

type CodeBlockProps = React.ComponentProps<"div"> & {
  /** The code content */
  code: string
  /** Language identifier (ts, tsx, js, jsx, json, py, sh, sql, etc.) */
  language?: string
  /** Show line numbers */
  showLineNumbers?: boolean
  /** Show copy button */
  showCopy?: boolean
  /** Force a theme. Defaults to following the document's `dark` class. */
  theme?: "light" | "dark"
}

function useTheme(forced?: "light" | "dark"): "light" | "dark" {
  const [theme, setTheme] = useState<"light" | "dark">(forced ?? "light")

  useEffect(() => {
    if (forced) {
      setTheme(forced)
      return
    }
    const update = () =>
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light")
    update()
    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [forced])

  return theme
}

function CodeBlock({
  code,
  language,
  showLineNumbers = false,
  showCopy = true,
  theme: forcedTheme,
  className,
  ...props
}: CodeBlockProps) {
  const theme = useTheme(forcedTheme)
  const [copied, setCopied] = useState(false)
  const [highlighted, setHighlighted] = useState<string | null>(null)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [code])

  useEffect(() => {
    let cancelled = false
    highlightCode(code, language, theme).then((html) => {
      if (!cancelled) setHighlighted(html)
    })
    return () => {
      cancelled = true
    }
  }, [code, language, theme])

  const lines = code.split("\n")

  return (
    <div
      data-slot="code-block"
      data-language={language}
      data-theme={theme}
      className={cn(
        "relative overflow-hidden rounded-lg border border-border bg-card",
        "[&_pre]:!bg-transparent [&_pre]:overflow-x-auto [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-xs [&_pre]:leading-relaxed",
        className,
      )}
      {...props}
    >
      {(language || showCopy) && (
        <div className="flex items-center justify-between border-border border-b bg-muted/40 px-3 py-1.5">
          {language && (
            <span className="font-medium font-mono text-muted-foreground text-xxs uppercase tracking-wider">
              {language}
            </span>
          )}
          {showCopy && (
            <button
              type="button"
              onClick={handleCopy}
              className="ml-auto inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-muted-foreground text-xs transition-colors hover:bg-muted hover:text-foreground"
              aria-label={copied ? "Copied" : "Copy code"}
            >
              {copied ? <CheckIcon className="size-3.5" /> : <ClipboardIcon className="size-3.5" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          )}
        </div>
      )}
      {highlighted && !showLineNumbers ? (
        // biome-ignore lint/security/noDangerouslySetInnerHtml: shiki output is plain HTML with token spans
        <div data-slot="code-block-highlighted" dangerouslySetInnerHTML={{ __html: highlighted }} />
      ) : (
        <pre>
          <code>
            {showLineNumbers
              ? lines.map((line, i) => (
                  <span key={`${i}-${line}`} className="table-row">
                    <span className="table-cell select-none pr-4 text-right text-muted-foreground/50">
                      {i + 1}
                    </span>
                    <span className="table-cell">{line || " "}</span>
                    {"\n"}
                  </span>
                ))
              : code}
          </code>
        </pre>
      )}
    </div>
  )
}

export type { CodeBlockProps }
export { CodeBlock }
