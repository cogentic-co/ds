"use client"

import { CheckIcon, ClipboardIcon } from "lucide-react"
import type * as React from "react"
import { useCallback, useEffect, useState } from "react"
import type { BundledLanguage, BundledTheme, HighlighterGeneric } from "shiki"
import { cn } from "../lib/utils"

type CodeBlockProps = React.ComponentProps<"div"> & {
  /** The code content */
  code: string
  /** Language for syntax highlighting (e.g. "tsx", "typescript", "css") */
  language?: string
  /** Show line numbers */
  showLineNumbers?: boolean
  /** Show copy button */
  showCopy?: boolean
}

let highlighterPromise: Promise<HighlighterGeneric<BundledLanguage, BundledTheme>> | null = null

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = import("shiki").then((mod) =>
      mod.createHighlighter({
        themes: ["github-dark-default", "github-light-default"],
        langs: [
          "tsx",
          "typescript",
          "javascript",
          "css",
          "html",
          "json",
          "bash",
          "shell",
          "markdown",
          "python",
          "go",
          "rust",
          "sql",
          "yaml",
        ],
      }),
    )
  }
  return highlighterPromise
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
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [code])

  useEffect(() => {
    if (!language) return
    let cancelled = false
    getHighlighter()
      .then((highlighter) => {
        if (cancelled) return
        const supportedLangs = highlighter.getLoadedLanguages()
        if (!supportedLangs.includes(language as BundledLanguage)) return
        const html = highlighter.codeToHtml(code, {
          lang: language,
          themes: {
            light: "github-light-default",
            dark: "github-dark-default",
          },
        })
        setHighlightedHtml(html)
      })
      .catch(() => {
        // Fallback to plain text on error
      })
    return () => {
      cancelled = true
    }
  }, [code, language])

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
      {highlightedHtml ? (
        <div
          className={cn(
            "[&_.shiki]:bg-transparent! [&_pre]:overflow-x-auto [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed",
            showLineNumbers &&
              "[&_.shiki_.line]:table-row [&_.shiki_.line]:[counter-increment:line] [&_.shiki_.line]:before:table-cell [&_.shiki_.line]:before:select-none [&_.shiki_.line]:before:pr-4 [&_.shiki_.line]:before:text-right [&_.shiki_.line]:before:text-muted-foreground/50 [&_.shiki_.line]:before:content-[counter(line)] [&_.shiki_code]:table [&_.shiki_code]:w-full [&_.shiki_code]:[counter-reset:line]",
          )}
          // biome-ignore lint: html from shiki is safe
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      ) : (
        <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed">
          <code className={cn(showLineNumbers && "table w-full")}>
            {showLineNumbers
              ? lines.map((line, i) => (
                  <span key={i} className="table-row">
                    <span className="table-cell select-none pr-4 text-right align-top text-muted-foreground/50">
                      {i + 1}
                    </span>
                    <span className="table-cell whitespace-pre">{line}</span>
                  </span>
                ))
              : code}
          </code>
        </pre>
      )}
    </div>
  )
}

export { CodeBlock }
export type { CodeBlockProps }
