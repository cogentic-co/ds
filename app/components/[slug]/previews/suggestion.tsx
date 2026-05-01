"use client"

import { FileText, Lightbulb, Search, Sparkles } from "lucide-react"
import { Suggestion, Suggestions } from "@/src/chatbot"
import { Section } from "./_shared"

export default function SuggestionPreview() {
  return (
    <div className="max-w-2xl space-y-6">
      <Section title="Default">
        <Suggestions>
          <Suggestion onClick={() => {}}>Summarize this document</Suggestion>
          <Suggestion onClick={() => {}}>Explain in simpler terms</Suggestion>
          <Suggestion onClick={() => {}}>Generate a report</Suggestion>
          <Suggestion onClick={() => {}}>Find similar cases</Suggestion>
        </Suggestions>
      </Section>

      <Section title="With leading icons">
        <Suggestions>
          <Suggestion icon={<FileText />} onClick={() => {}}>
            Summarize this document
          </Suggestion>
          <Suggestion icon={<Lightbulb />} onClick={() => {}}>
            Explain in simpler terms
          </Suggestion>
          <Suggestion icon={<Sparkles />} onClick={() => {}}>
            Generate a report
          </Suggestion>
          <Suggestion icon={<Search />} onClick={() => {}}>
            Find similar cases
          </Suggestion>
        </Suggestions>
      </Section>

      <Section title="With highlight">
        <Suggestions>
          <Suggestion icon={<FileText />} highlight="Summarize" onClick={() => {}}>
            Summarize the latest investigation
          </Suggestion>
          <Suggestion icon={<Search />} highlight="Find" onClick={() => {}}>
            Find sanction matches in this transaction
          </Suggestion>
        </Suggestions>
      </Section>
    </div>
  )
}
