"use client"

import {
  PromptInput,
  PromptInputAttachButton,
  PromptInputBody,
  PromptInputFiles,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/src/chatbot"

export default function PromptInputPreview() {
  return (
    <PromptInput onSubmit={(msg) => alert(`Sent: ${msg}`)}>
      <PromptInputFiles />
      <PromptInputBody>
        <PromptInputTextarea placeholder="Ask about compliance..." />
      </PromptInputBody>
      <PromptInputFooter>
        <PromptInputTools>
          <PromptInputAttachButton />
        </PromptInputTools>
        <PromptInputSubmit />
      </PromptInputFooter>
    </PromptInput>
  )
}
