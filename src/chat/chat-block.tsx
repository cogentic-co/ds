"use client"

import { ArrowUp, Bot, Square, User as UserIcon } from "lucide-react"
import { type ReactNode, useCallback, useState } from "react"
import { Button } from "../components/button"
import { cn } from "../lib/utils"
import { Conversation, ConversationContent, ConversationEmptyState } from "./conversation"
import {
  Message,
  MessageActions,
  MessageAvatar,
  MessageContent,
  MessageCopyAction,
  MessageFeedbackActions,
  MessageRegenerateAction,
  MessageResponse,
} from "./message"
import { PromptInput, PromptInputFooter, PromptInputTextarea } from "./prompt-input"
import { Suggestion, Suggestions } from "./suggestion"

/**
 * Full chat block — `Conversation` + `Message` map + sticky `PromptInput`.
 *
 * Self-managed by default (call `onSubmit` and you're done) or fully
 * controlled by passing `messages` + `onSubmit`. Pass `suggestions` to
 * render a row of clickable starter prompts in the empty state.
 *
 * Streaming: pass `isLoading` + a streaming `lastAssistantMessage` (the
 * partial response). The block renders that partial as the in-progress
 * Message; markdown auto-renders inside `<MessageResponse>`.
 */

type ChatRole = "user" | "assistant" | "system"

type ChatMessage = {
  id: string
  role: ChatRole
  content: string
  /** Optional rich content (overrides `content` rendering when present). */
  children?: ReactNode
}

type ChatBlockProps = {
  /** Controlled messages list. Omit to use internal state. */
  messages?: ChatMessage[]
  /** Set the messages list (controlled mode). */
  onMessagesChange?: (messages: ChatMessage[]) => void
  /** Called with the user's text. Return a promise to keep `isLoading` true. */
  onSubmit?: (message: string) => void | Promise<void>
  /** Streaming flag — disables submit and shows the stop icon. */
  isLoading?: boolean
  /** Empty-state title. */
  title?: ReactNode
  /** Empty-state description. */
  description?: ReactNode
  /** Empty-state suggestions. */
  suggestions?: string[]
  /** Render a custom avatar per role. */
  renderAvatar?: (role: ChatRole) => ReactNode
  placeholder?: string
  className?: string
}

function defaultAvatar(role: ChatRole) {
  if (role === "user") {
    return (
      <MessageAvatar>
        <UserIcon className="size-4" />
      </MessageAvatar>
    )
  }
  if (role === "assistant") {
    return (
      <MessageAvatar className="bg-primary text-primary-foreground">
        <Bot className="size-4" />
      </MessageAvatar>
    )
  }
  return null
}

function ChatBlock({
  messages: controlledMessages,
  onMessagesChange,
  onSubmit,
  isLoading: externalLoading,
  title = "How can I help you today?",
  description,
  suggestions = [],
  renderAvatar = defaultAvatar,
  placeholder = "Send a message…",
  className,
}: ChatBlockProps) {
  const [internalMessages, setInternalMessages] = useState<ChatMessage[]>([])
  const isControlled = controlledMessages !== undefined
  const messages = isControlled ? controlledMessages : internalMessages
  const setMessages = useCallback(
    (next: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])) => {
      if (isControlled) {
        const resolved = typeof next === "function" ? next(controlledMessages) : next
        onMessagesChange?.(resolved)
      } else {
        setInternalMessages(next)
      }
    },
    [isControlled, controlledMessages, onMessagesChange],
  )

  const [internalLoading, setInternalLoading] = useState(false)
  const isLoading = externalLoading ?? internalLoading

  const handleSubmit = useCallback(
    async (message: string) => {
      if (!message.trim()) return
      // Auto-append the user message ONLY in uncontrolled mode. When the
      // consumer owns the messages array (e.g. via AI SDK's useChat), they
      // are responsible for appending — otherwise we'd duplicate.
      if (!isControlled) {
        const userMsg: ChatMessage = {
          id: `u-${Date.now()}`,
          role: "user",
          content: message,
        }
        setMessages((prev) => [...prev, userMsg])
      }
      if (externalLoading === undefined) setInternalLoading(true)
      try {
        await onSubmit?.(message)
      } finally {
        if (externalLoading === undefined) setInternalLoading(false)
      }
    },
    [isControlled, setMessages, onSubmit, externalLoading],
  )

  const isEmpty = messages.length === 0
  const [draft, setDraft] = useState("")

  return (
    <div data-slot="chat-block" className={cn("flex h-full flex-col bg-background", className)}>
      <Conversation className="flex-1">
        <ConversationContent>
          {isEmpty ? (
            <ConversationEmptyState title={title} description={description} className="m-auto">
              {suggestions.length > 0 && (
                <Suggestions className="justify-center">
                  {suggestions.map((s) => (
                    <Suggestion key={s} onClick={() => handleSubmit(s)}>
                      {s}
                    </Suggestion>
                  ))}
                </Suggestions>
              )}
            </ConversationEmptyState>
          ) : (
            messages.map((m, i) => {
              const isLast = i === messages.length - 1
              const isStreamingLast = isLast && m.role === "assistant" && isLoading
              return (
                <Message key={m.id} from={m.role}>
                  {renderAvatar(m.role)}
                  <MessageContent>
                    <MessageResponse>{m.children ?? m.content}</MessageResponse>
                    {m.role === "assistant" && !isStreamingLast && (
                      <MessageActions>
                        <MessageCopyAction content={String(m.content ?? "")} />
                        <MessageRegenerateAction
                          onClick={() => handleSubmit(messages[i - 1]?.content ?? "")}
                        />
                        <MessageFeedbackActions />
                      </MessageActions>
                    )}
                  </MessageContent>
                </Message>
              )
            })
          )}
        </ConversationContent>
      </Conversation>

      <div className="border-border border-t bg-background p-4">
        <PromptInput
          value={draft}
          onValueChange={setDraft}
          isLoading={isLoading}
          onSubmit={(text) => {
            handleSubmit(text)
            setDraft("")
          }}
          className="mx-auto w-full max-w-3xl rounded-3xl border-input bg-popover p-0 shadow-xs"
        >
          <PromptInputTextarea
            placeholder={placeholder}
            className="min-h-[44px] pt-3 pl-4 text-base leading-[1.3]"
          />
          <PromptInputFooter className="mt-2 w-full justify-end px-3 pb-3">
            <Button
              type="submit"
              size="icon"
              className="size-9 rounded-full"
              disabled={!draft.trim() && !isLoading}
              aria-label={isLoading ? "Stop generation" : "Send message"}
            >
              {isLoading ? <Square className="size-3" /> : <ArrowUp className="size-4" />}
            </Button>
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  )
}

export type { ChatBlockProps, ChatMessage, ChatRole }
export { ChatBlock }
