"use client"

import { CheckIcon, ClipboardIcon } from "lucide-react"
import { useEffect, useState } from "react"
import type { BundledLanguage, BundledTheme, HighlighterGeneric } from "shiki"
import { cn } from "@/src/lib/utils"

/**
 * Syntax-highlighted code block using shiki.
 * Loads the highlighter lazily on first render to keep bundle size small.
 * Falls back to plain <pre> while loading.
 */

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
        ],
      }),
    )
  }
  return highlighterPromise
}

function CodeHighlight({
  code,
  lang = "tsx",
  className,
}: {
  code: string
  lang?: string
  className?: string
}) {
  const [html, setHtml] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let cancelled = false
    getHighlighter().then((highlighter) => {
      if (cancelled) return
      const result = highlighter.codeToHtml(code.trim(), {
        lang,
        themes: {
          light: "github-light-default",
          dark: "github-dark-default",
        },
      })
      setHtml(result)
    })
    return () => {
      cancelled = true
    }
  }, [code, lang])

  function handleCopy() {
    navigator.clipboard.writeText(code.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("group relative", className)}>
      {html ? (
        <div
          className="[&_.shiki]:bg-muted! [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed"
          // biome-ignore lint: html from shiki is safe
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="overflow-x-auto whitespace-pre rounded-lg bg-muted p-4 font-mono text-sm leading-relaxed">
          {code.trim()}
        </pre>
      )}
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-md border border-border/50 bg-background/80 px-2 py-1.5 text-muted-foreground text-xs opacity-0 backdrop-blur-sm transition-colors hover:text-foreground focus:opacity-100 group-hover:opacity-100"
      >
        {copied ? (
          <>
            <CheckIcon className="size-3.5" />
            Copied!
          </>
        ) : (
          <>
            <ClipboardIcon className="size-3.5" />
            Copy
          </>
        )}
      </button>
    </div>
  )
}

export { CodeHighlight }
