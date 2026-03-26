"use client"

import { Context, ContextBody, ContextHeader, ContextUsage } from "@/src/chatbot"

export default function ContextPreview() {
  return (
    <Context>
      <ContextHeader>Context Usage</ContextHeader>
      <ContextBody>
        <ContextUsage label="Tokens used" used={45200} total={128000} />
        <ContextUsage label="Messages" used={24} total={50} />
        <ContextUsage label="Attachments" used={3} total={10} />
      </ContextBody>
    </Context>
  )
}
