"use client"

import { Tool, ToolContent, ToolHeader, ToolInput, ToolOutput } from "@/src/chatbot"

export default function ToolPreview() {
  return (
    <Tool defaultOpen>
      <ToolHeader name="search_regulations" status="success" />
      <ToolContent>
        <ToolInput>{`{ "query": "MiCA requirements", "jurisdiction": "EU" }`}</ToolInput>
        <ToolOutput>{`Found 7 matching regulations. Top result: Markets in Crypto-Assets Regulation (MiCA)...`}</ToolOutput>
      </ToolContent>
    </Tool>
  )
}
