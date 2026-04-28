"use client"

import type { ComponentProps } from "react"
import { Streamdown } from "streamdown"
import { cn } from "../lib/utils"

/**
 * @figma Markdown
 * @figmaPage AI Chatbot
 *
 * Streaming-aware Markdown renderer for AI output. Wraps Vercel's Streamdown
 * with our prose tokens so paragraphs, headings, code blocks, tables, and
 * inline code render in the DS palette in both light and dark mode.
 *
 * Use inside MessageResponse or any AI surface that displays model output.
 * Handles unterminated markdown blocks during streaming without flicker.
 */

type MarkdownProps = Omit<ComponentProps<typeof Streamdown>, "children" | "className"> & {
  children: string
  className?: string
  /** Force a brand-tinted prose variant — defaults to inheriting parent text color. */
  variant?: "default" | "inverted"
}

const proseClass = [
  // Base prose-ish typography that respects our font + leading
  "max-w-none text-sm leading-relaxed",
  // Headings
  "[&_h1]:mt-4 [&_h1]:mb-2 [&_h1]:font-semibold [&_h1]:text-base",
  "[&_h2]:mt-3 [&_h2]:mb-2 [&_h2]:font-semibold [&_h2]:text-sm",
  "[&_h3]:mt-3 [&_h3]:mb-1.5 [&_h3]:font-medium [&_h3]:text-sm",
  // Paragraphs and inline elements
  "[&_p]:my-2 first:[&_p]:mt-0 last:[&_p]:mb-0",
  "[&_strong]:font-semibold",
  "[&_em]:italic",
  "[&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-current/40 hover:[&_a]:decoration-current",
  // Lists
  "[&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul_li]:my-0.5",
  "[&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol_li]:my-0.5",
  // Blockquote
  "[&_blockquote]:my-2 [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-3 [&_blockquote]:text-muted-foreground [&_blockquote]:italic",
  // Inline code
  "[&_:not(pre)>code]:rounded [&_:not(pre)>code]:bg-muted [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-[0.85em]",
  // Code blocks
  "[&_pre]:my-2 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-border [&_pre]:bg-card [&_pre]:p-3 [&_pre]:font-mono [&_pre]:text-xs [&_pre]:leading-relaxed",
  // Tables
  "[&_table]:my-3 [&_table]:w-full [&_table]:border-collapse [&_table]:text-xs",
  "[&_th]:border-b [&_th]:border-border [&_th]:px-2 [&_th]:py-1.5 [&_th]:text-left [&_th]:font-medium",
  "[&_td]:border-b [&_td]:border-border/50 [&_td]:px-2 [&_td]:py-1.5",
  // Horizontal rule
  "[&_hr]:my-4 [&_hr]:border-border",
].join(" ")

function Markdown({ children, className, variant = "default", ...props }: MarkdownProps) {
  return (
    <div
      data-slot="markdown"
      data-variant={variant}
      className={cn(
        proseClass,
        variant === "inverted" && "[&_:not(pre)>code]:bg-background/20 [&_pre]:bg-background/20",
        className,
      )}
    >
      <Streamdown {...props}>{children}</Streamdown>
    </div>
  )
}

export type { MarkdownProps }
export { Markdown }
