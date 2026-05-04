"use client"

import {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtStep,
} from "@/src/chat"

export default function ChainOfThoughtPreview() {
  return (
    <ChainOfThought defaultOpen>
      <ChainOfThoughtHeader>Analyzing compliance requirements...</ChainOfThoughtHeader>
      <ChainOfThoughtContent>
        <ChainOfThoughtStep step={1} status="complete">
          Identified jurisdiction: EU
        </ChainOfThoughtStep>
        <ChainOfThoughtStep step={2} status="complete">
          Checked applicable frameworks: MiCA, 6AMLD
        </ChainOfThoughtStep>
        <ChainOfThoughtStep step={3} status="active">
          Cross-referencing with local regulations
        </ChainOfThoughtStep>
        <ChainOfThoughtStep step={4} status="pending">
          Formulating response
        </ChainOfThoughtStep>
      </ChainOfThoughtContent>
    </ChainOfThought>
  )
}
