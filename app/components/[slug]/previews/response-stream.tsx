"use client"

import { useState } from "react"
import { ResponseStream } from "@/src/chat/response-stream"
import { Button } from "@/src/components/button"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const SAMPLE = `### Risk summary

The transaction shows **moderate risk** indicators:

1. Counterparty has a known sanctions-adjacent address.
2. Transfer of $125,000 exceeds reporting threshold.
3. Routing through OFAC-sanctioned jurisdiction.

A Travel Rule notice has been generated for review.`

const responseStreamControlDefs = {
  mode: {
    type: "radio",
    options: ["typewriter", "fade"],
    defaultValue: "typewriter",
    label: "Mode",
  },
  speed: { type: "number", defaultValue: 30, min: 1, max: 100, step: 1, label: "Speed (1–100)" },
  text: {
    type: "text",
    defaultValue: SAMPLE,
    label: "Text",
  },
} satisfies ControlDefs

export default function ResponseStreamPreview() {
  const controls = useControls(responseStreamControlDefs)
  const [seed, setSeed] = useState(0)

  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <div className="flex w-full flex-col gap-3">
          <Button
            variant="outline"
            size="sm"
            className="self-start"
            onClick={() => setSeed((s) => s + 1)}
          >
            Replay
          </Button>
          <div className="rounded-lg border border-border bg-card p-4 text-sm">
            <ResponseStream
              key={`${controls.values.mode}-${controls.values.speed}-${seed}`}
              textStream={controls.values.text}
              mode={controls.values.mode as "typewriter" | "fade"}
              speed={controls.values.speed}
            />
          </div>
        </div>
      </Playground>

      <Section title="Typewriter — slow (speed=10)">
        <div className="w-full rounded-lg border border-border bg-card p-4 text-sm">
          <ResponseStream
            key={`slow-${seed}`}
            textStream="Reviewing transaction trail and counterparty history…"
            speed={10}
          />
        </div>
      </Section>

      <Section title="Fade — fast (speed=80)">
        <div className="w-full rounded-lg border border-border bg-card p-4 text-sm">
          <ResponseStream
            key={`fast-${seed}`}
            textStream="Compiling regulator-ready summary now."
            mode="fade"
            speed={80}
          />
        </div>
      </Section>
    </div>
  )
}
