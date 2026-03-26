"use client"

import { Checkpoint, CheckpointIcon, CheckpointTrigger } from "@/src/chatbot"

export default function CheckpointPreview() {
  return (
    <div className="space-y-3">
      <Checkpoint>
        <CheckpointIcon />
        <CheckpointTrigger>Initial analysis complete — 12 regulations identified</CheckpointTrigger>
      </Checkpoint>
      <Checkpoint>
        <CheckpointIcon />
        <CheckpointTrigger>Risk assessment finalized — 3 high-risk areas flagged</CheckpointTrigger>
      </Checkpoint>
    </div>
  )
}
