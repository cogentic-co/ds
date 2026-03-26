"use client"

import { Reasoning, ReasoningContent, ReasoningTrigger } from "@/src/chatbot"

export default function ReasoningPreview() {
  return (
    <Reasoning defaultOpen>
      <ReasoningTrigger />
      <ReasoningContent>
        Let me think about this step by step. First, I need to analyze the input data to identify
        the key patterns. Then I'll cross-reference with known compliance frameworks to determine
        the applicable regulations. Finally, I'll formulate a comprehensive response.
      </ReasoningContent>
    </Reasoning>
  )
}
