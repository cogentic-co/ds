"use client"

import { Suggestion, Suggestions } from "@/src/chatbot"

export default function SuggestionPreview() {
  return (
    <Suggestions>
      <Suggestion onClick={() => {}}>Summarize this document</Suggestion>
      <Suggestion onClick={() => {}}>Explain in simpler terms</Suggestion>
      <Suggestion onClick={() => {}}>Generate a report</Suggestion>
      <Suggestion onClick={() => {}}>Find similar cases</Suggestion>
    </Suggestions>
  )
}
