"use client"

import { Hammer, Rocket, Undo2, UserRound } from "lucide-react"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  TextCommand,
  type TextCommandValue,
  textCommandToPayload,
} from "@/components/ui/text-command"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const commands = [
  { value: "deploy", label: "deploy", description: "Ship to production", icon: <Rocket /> },
  { value: "rollback", label: "rollback", description: "Undo last release", icon: <Undo2 /> },
  { value: "build", label: "build", description: "Run a fresh build", icon: <Hammer /> },
]

const mentions = [
  { value: "alice", label: "Alice Chen", description: "Eng lead", icon: <UserRound /> },
  { value: "bob", label: "Bob Carter", description: "PM", icon: <UserRound /> },
  { value: "casey", label: "Casey Lee", description: "Design", icon: <UserRound /> },
]

const controlDefs = {
  placeholder: {
    type: "text" as const,
    defaultValue: "Type / for commands or @ to mention",
    label: "Placeholder",
  },
  rows: {
    type: "number" as const,
    defaultValue: 3,
    label: "Rows",
    min: 1,
    max: 8,
  },
  disabled: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Disabled",
  },
} satisfies ControlDefs

export default function TextCommandPreview() {
  const controls = useControls(controlDefs)
  const [value, setValue] = useState<TextCommandValue>([
    { type: "text", value: "Run " },
    { type: "command", value: "deploy", label: "deploy" },
    { type: "text", value: " then ping " },
    { type: "mention", value: "alice", label: "Alice Chen" },
  ])
  const payload = useMemo(() => textCommandToPayload(value), [value])

  return (
    <div className="max-w-xl space-y-6">
      <Playground controls={controls}>
        <div className="space-y-3">
          <TextCommand
            value={value}
            onValueChange={setValue}
            commands={commands}
            mentions={mentions}
            placeholder={controls.values.placeholder}
            rows={controls.values.rows}
            disabled={controls.values.disabled}
          />
          <div className="space-y-2 rounded-lg border border-border bg-muted/30 p-3 font-mono text-xs">
            <div className="text-muted-foreground">payload sent to API →</div>
            <pre className="whitespace-pre-wrap break-words text-foreground">
              {JSON.stringify(payload, null, 2)}
            </pre>
          </div>
          <div className="flex justify-end">
            <Button size="sm" disabled={!payload.text.trim()}>
              Send to agent
            </Button>
          </div>
        </div>
      </Playground>

      <Section title="Slash commands only">
        <TextCommand commands={commands} placeholder="Type / to run a command" />
      </Section>

      <Section title="Mentions only">
        <TextCommand mentions={mentions} placeholder="Type @ to mention a teammate" />
      </Section>

      <Section title="Server-driven mentions (onTriggerQueryChange)">
        <ServerDrivenMentions />
      </Section>

      <Section title="Empty state">
        <TextCommand commands={commands} mentions={mentions} placeholder="Ask the agent…" />
      </Section>
    </div>
  )
}

// Simulates an API-driven mention list: parent listens for the trigger query
// changes and supplies a filtered list. `filterItems={false}` because the
// "API" already filtered for us.
function ServerDrivenMentions() {
  const allPeople = [
    { value: "alice", label: "Alice Chen", description: "Eng lead" },
    { value: "bob", label: "Bob Carter", description: "PM" },
    { value: "casey", label: "Casey Lee", description: "Design" },
    { value: "dani", label: "Dani Park", description: "Ops" },
    { value: "ezra", label: "Ezra Singh", description: "Data" },
  ]
  const [results, setResults] = useState(allPeople)
  return (
    <TextCommand
      mentions={results}
      filterItems={false}
      onTriggerQueryChange={(state) => {
        if (!state || state.trigger !== "@") {
          setResults(allPeople)
          return
        }
        // Pretend to fetch — replace with `fetch("/api/people?q=…")`
        const q = state.query.toLowerCase()
        setResults(allPeople.filter((p) => p.label.toLowerCase().includes(q)))
      }}
      placeholder="Type @ — mentions are fetched per keystroke"
    />
  )
}
