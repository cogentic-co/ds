"use client"

import { Conversation, ConversationContent, ConversationEmptyState } from "@/src/chat"

export default function ConversationPreview() {
  return (
    <Conversation className="h-80 rounded-xl border border-border">
      <ConversationContent>
        <ConversationEmptyState
          title="Start a conversation"
          description="Ask me anything about compliance and regulation"
        />
      </ConversationContent>
    </Conversation>
  )
}
