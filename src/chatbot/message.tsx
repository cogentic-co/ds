"use client"

import { cva } from "class-variance-authority"
import { ChevronLeft, ChevronRight, Copy, RefreshCw, ThumbsDown, ThumbsUp } from "lucide-react"
import { type ComponentProps, createContext, useCallback, useContext, useState } from "react"
import { cn } from "../lib/utils"

// ---------------------------------------------------------------------------
// Message role context
// ---------------------------------------------------------------------------

type MessageRole = "user" | "assistant" | "system"

const MessageContext = createContext<{ role: MessageRole }>({ role: "assistant" })

// ---------------------------------------------------------------------------
// CVA — message alignment and styling per role
// ---------------------------------------------------------------------------

const messageVariants = cva("group/message flex gap-3", {
  variants: {
    from: {
      user: "flex-row-reverse",
      assistant: "flex-row",
      system: "flex-row justify-center",
    },
  },
  defaultVariants: { from: "assistant" },
})

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

function Message({
  from = "assistant",
  className,
  children,
  ...props
}: ComponentProps<"div"> & { from?: MessageRole }) {
  return (
    <MessageContext.Provider value={{ role: from }}>
      <div
        data-slot="message"
        data-role={from}
        className={cn(messageVariants({ from }), className)}
        {...props}
      >
        {children}
      </div>
    </MessageContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// Avatar — rendered before/after content depending on role
// ---------------------------------------------------------------------------

function MessageAvatar({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="message-avatar"
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground",
        className,
      )}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// Content wrapper
// ---------------------------------------------------------------------------

function MessageContent({ className, ...props }: ComponentProps<"div">) {
  const { role } = useContext(MessageContext)

  return (
    <div
      data-slot="message-content"
      className={cn(
        "flex max-w-[80%] flex-col gap-1",
        role === "user" && "items-end",
        role === "system" && "max-w-full items-center",
        className,
      )}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// Response bubble — the actual message body
// ---------------------------------------------------------------------------

const responseBubbleVariants = cva("rounded-2xl px-4 py-3 text-sm leading-relaxed", {
  variants: {
    from: {
      user: "bg-primary text-primary-foreground",
      assistant: "bg-muted text-foreground",
      system: "bg-muted/50 text-center text-muted-foreground italic",
    },
  },
  defaultVariants: { from: "assistant" },
})

function MessageResponse({ className, ...props }: ComponentProps<"div">) {
  const { role } = useContext(MessageContext)

  return (
    <div
      data-slot="message-response"
      className={cn(
        responseBubbleVariants({ from: role }),
        "prose prose-sm dark:prose-invert max-w-none",
        "[&_pre]:rounded-lg [&_pre]:bg-card [&_pre]:p-3 [&_pre]:font-mono [&_pre]:text-xs",
        "[&_code]:rounded [&_code]:bg-card [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs",
        className,
      )}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// Actions toolbar
// ---------------------------------------------------------------------------

function MessageActions({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="message-actions"
      className={cn(
        "flex items-center gap-1 opacity-0 transition-opacity group-hover/message:opacity-100",
        className,
      )}
      {...props}
    />
  )
}

function MessageAction({
  tooltip,
  className,
  ...props
}: ComponentProps<"button"> & { tooltip?: string }) {
  return (
    <button
      data-slot="message-action"
      type="button"
      title={tooltip}
      className={cn(
        "inline-flex items-center justify-center rounded-md p-1.5",
        "text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        className,
      )}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// Convenience action buttons
// ---------------------------------------------------------------------------

function MessageCopyAction({
  content,
  className,
  ...props
}: ComponentProps<"button"> & { content: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [content])

  return (
    <MessageAction
      tooltip={copied ? "Copied!" : "Copy"}
      onClick={handleCopy}
      className={className}
      {...props}
    >
      <Copy className="size-3.5" />
    </MessageAction>
  )
}

function MessageRegenerateAction(props: ComponentProps<"button">) {
  return (
    <MessageAction tooltip="Regenerate" {...props}>
      <RefreshCw className="size-3.5" />
    </MessageAction>
  )
}

function MessageFeedbackActions({
  onThumbsUp,
  onThumbsDown,
}: {
  onThumbsUp?: () => void
  onThumbsDown?: () => void
}) {
  return (
    <>
      <MessageAction tooltip="Good response" onClick={onThumbsUp}>
        <ThumbsUp className="size-3.5" />
      </MessageAction>
      <MessageAction tooltip="Bad response" onClick={onThumbsDown}>
        <ThumbsDown className="size-3.5" />
      </MessageAction>
    </>
  )
}

// ---------------------------------------------------------------------------
// Branch selector (for multiple response variants)
// ---------------------------------------------------------------------------

type BranchContextValue = {
  branch: number
  total: number
  prev: () => void
  next: () => void
}

const BranchContext = createContext<BranchContextValue | null>(null)

function MessageBranch({
  total,
  defaultBranch = 0,
  onBranchChange,
  children,
}: {
  total: number
  defaultBranch?: number
  onBranchChange?: (index: number) => void
  children: React.ReactNode
}) {
  const [branch, setBranch] = useState(defaultBranch)

  const prev = useCallback(() => {
    setBranch((b) => {
      const next = Math.max(0, b - 1)
      onBranchChange?.(next)
      return next
    })
  }, [onBranchChange])

  const next = useCallback(() => {
    setBranch((b) => {
      const next = Math.min(total - 1, b + 1)
      onBranchChange?.(next)
      return next
    })
  }, [total, onBranchChange])

  return (
    <BranchContext.Provider value={{ branch, total, prev, next }}>
      {children}
    </BranchContext.Provider>
  )
}

function MessageBranchSelector({ className, ...props }: ComponentProps<"div">) {
  const ctx = useContext(BranchContext)
  if (!ctx || ctx.total <= 1) return null

  return (
    <div
      data-slot="message-branch-selector"
      className={cn("inline-flex items-center gap-1 text-muted-foreground text-xs", className)}
      {...props}
    >
      <button
        type="button"
        onClick={ctx.prev}
        disabled={ctx.branch === 0}
        aria-label="Previous response"
        className="rounded p-0.5 transition-colors hover:bg-muted disabled:opacity-30"
      >
        <ChevronLeft aria-hidden="true" className="size-3.5" />
      </button>
      <span className="tabular-nums" aria-label={`Response ${ctx.branch + 1} of ${ctx.total}`}>
        {ctx.branch + 1} / {ctx.total}
      </span>
      <button
        type="button"
        onClick={ctx.next}
        disabled={ctx.branch === ctx.total - 1}
        aria-label="Next response"
        className="rounded p-0.5 transition-colors hover:bg-muted disabled:opacity-30"
      >
        <ChevronRight aria-hidden="true" className="size-3.5" />
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Attachments within a message
// ---------------------------------------------------------------------------

function MessageAttachments({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="message-attachments"
      className={cn("flex flex-wrap gap-2", className)}
      {...props}
    />
  )
}

export {
  Message,
  MessageAvatar,
  MessageContent,
  MessageResponse,
  MessageActions,
  MessageAction,
  MessageCopyAction,
  MessageRegenerateAction,
  MessageFeedbackActions,
  MessageBranch,
  MessageBranchSelector,
  MessageAttachments,
  messageVariants,
  responseBubbleVariants,
}
export type { MessageRole }
