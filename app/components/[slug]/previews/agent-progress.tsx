"use client"

import { TextSearch } from "lucide-react"
import { useState } from "react"
import {
  AgentProgress,
  type AgentProgressDensity,
  type AgentProgressState,
  type AgentProgressStep,
} from "@/src/chatbot"

const baseSteps: AgentProgressStep[] = [
  {
    id: "parse",
    title: "Parse transaction",
    description: "Hash, asset, direction",
    status: "done",
  },
  {
    id: "resolve",
    title: "Resolve counterparties",
    description: "From / to labels",
    status: "done",
  },
  {
    id: "risk",
    title: "Chainalysis risk score",
    description: "Risk score + entity clustering",
    status: "active",
  },
  {
    id: "typology",
    title: "Typology match",
    description: "Pattern match against AUSTRAC typologies",
    status: "skipped",
  },
  {
    id: "recommendation",
    title: "Recommendation",
    description: "Synthesise findings into action",
    status: "skipped",
  },
]

const completedSteps: AgentProgressStep[] = baseSteps.map((s) => ({
  ...s,
  status: "done",
}))

const failedSteps: AgentProgressStep[] = [
  ...baseSteps.slice(0, 2),
  { ...baseSteps[2], status: "failed" },
  ...baseSteps.slice(3),
]

export default function AgentProgressPreview() {
  const [state, setState] = useState<AgentProgressState>("running")
  const [density, setDensity] = useState<AgentProgressDensity>("compact")

  const stepsByState: Record<AgentProgressState, AgentProgressStep[]> = {
    running: baseSteps,
    completed: completedSteps,
    failed: failedSteps,
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4">
        <fieldset className="flex items-center gap-2 text-xs">
          <legend className="font-medium text-muted-foreground">State</legend>
          {(["running", "completed", "failed"] as const).map((s) => (
            <label key={s} className="inline-flex items-center gap-1">
              <input
                type="radio"
                name="state"
                value={s}
                checked={state === s}
                onChange={() => setState(s)}
              />
              {s}
            </label>
          ))}
        </fieldset>
        <fieldset className="flex items-center gap-2 text-xs">
          <legend className="font-medium text-muted-foreground">Density</legend>
          {(["compact", "detailed"] as const).map((d) => (
            <label key={d} className="inline-flex items-center gap-1">
              <input
                type="radio"
                name="density"
                value={d}
                checked={density === d}
                onChange={() => setDensity(d)}
              />
              {d}
            </label>
          ))}
        </fieldset>
      </div>

      <AgentProgress
        state={state}
        density={density}
        title="Investigation created"
        reference="INV-104"
        description="Wallet risk investigation for tx 0x768uy…bla on Ethereum"
        icon={<TextSearch className="size-4" />}
        steps={stepsByState[state]}
        progress={{ value: 48, summary: "Resets Apr 30 · 48% used" }}
        meta="Started 4 min ago · ETA 2 min"
        onCancel={() => console.log("cancel")}
        onOpen={() => console.log("open")}
      />

      <div>
        <p className="mb-3 font-medium text-muted-foreground text-xs">No progress bar</p>
        <AgentProgress
          state="running"
          title="Compliance check"
          reference="CC-21"
          steps={baseSteps.slice(0, 3)}
          meta="Started just now"
          onCancel={() => {}}
        />
      </div>
    </div>
  )
}
