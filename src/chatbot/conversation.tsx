"use client"

import { ArrowDown, Download, MessageSquare } from "lucide-react"
import {
  type ComponentProps,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { cn } from "../lib/utils"

// ---------------------------------------------------------------------------
// Root — manages auto-scroll to bottom
// ---------------------------------------------------------------------------

function Conversation({ className, children, ...props }: ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement>(null)
  const [isAtBottom, setIsAtBottom] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function handleScroll() {
      const threshold = 100
      setIsAtBottom(el!.scrollHeight - el!.scrollTop - el!.clientHeight < threshold)
    }

    el.addEventListener("scroll", handleScroll, { passive: true })
    return () => el.removeEventListener("scroll", handleScroll)
  }, [])

  // Auto-scroll when new content arrives and user is at bottom
  useEffect(() => {
    if (isAtBottom && ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  })

  const scrollToBottom = useCallback(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" })
  }, [])

  return (
    <div data-slot="conversation" className={cn("relative flex flex-col", className)} {...props}>
      <div ref={ref} role="log" aria-live="polite" className="flex-1 overflow-y-auto">
        {children}
      </div>
      {!isAtBottom && <ConversationScrollButton onClick={scrollToBottom} />}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Content — message list area with padding
// ---------------------------------------------------------------------------

function ConversationContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="conversation-content"
      className={cn("flex flex-col gap-6 p-4", className)}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

function ConversationEmptyState({
  title = "No messages yet",
  description = "Start a conversation to see messages here",
  icon,
  className,
  children,
  ...props
}: ComponentProps<"div"> & {
  title?: string
  description?: string
  icon?: ReactNode
}) {
  return (
    <div
      data-slot="conversation-empty-state"
      className={cn(
        "flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center",
        className,
      )}
      {...props}
    >
      {icon ?? <MessageSquare aria-hidden="true" className="size-10 text-muted-foreground/40" />}
      <div className="space-y-1">
        <p className="font-medium text-foreground text-sm">{title}</p>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Scroll-to-bottom button
// ---------------------------------------------------------------------------

function ConversationScrollButton({ className, ...props }: ComponentProps<"button">) {
  return (
    <button
      data-slot="conversation-scroll-button"
      type="button"
      className={cn(
        "absolute bottom-4 left-1/2 -translate-x-1/2",
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5",
        "font-medium text-muted-foreground text-xs shadow-sm",
        "transition-colors hover:bg-accent hover:text-foreground",
        className,
      )}
      {...props}
    >
      <ArrowDown className="size-3" />
      Scroll to bottom
    </button>
  )
}

// ---------------------------------------------------------------------------
// Download conversation
// ---------------------------------------------------------------------------

function ConversationDownload({
  messages,
  filename = "conversation.md",
  formatMessage,
  className,
  ...props
}: Omit<ComponentProps<"button">, "onClick"> & {
  messages: Array<{ role: string; content: string }>
  filename?: string
  formatMessage?: (msg: { role: string; content: string }, index: number) => string
}) {
  const handleDownload = useCallback(() => {
    const md = messages
      .map(
        (msg, i) =>
          formatMessage?.(msg, i) ??
          `## ${msg.role === "user" ? "You" : msg.role === "assistant" ? "Assistant" : "System"}\n\n${msg.content}`,
      )
      .join("\n\n---\n\n")

    const blob = new Blob([md], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }, [messages, filename, formatMessage])

  return (
    <button
      data-slot="conversation-download"
      type="button"
      onClick={handleDownload}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs",
        "text-muted-foreground transition-colors hover:text-foreground",
        className,
      )}
      {...props}
    >
      <Download className="size-3.5" />
      Download
    </button>
  )
}

export {
  Conversation,
  ConversationContent,
  ConversationDownload,
  ConversationEmptyState,
  ConversationScrollButton,
}
