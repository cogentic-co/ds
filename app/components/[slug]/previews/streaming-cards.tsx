"use client"

import { StreamingCards } from "@/components/ui/streaming-cards"

export default function StreamingCardsPreview() {
  const cards = [
    <div key="1" className="rounded-xl border bg-card p-4 shadow-sm">
      <p className="font-medium text-muted-foreground text-xs">Step 1</p>
      <p className="mt-1 text-sm">Setting up your workspace...</p>
    </div>,
    <div key="2" className="rounded-xl border bg-card p-4 shadow-sm">
      <p className="font-medium text-muted-foreground text-xs">Step 2</p>
      <p className="mt-1 text-sm">Installing dependencies...</p>
    </div>,
    <div key="3" className="rounded-xl border bg-card p-4 shadow-sm">
      <p className="font-medium text-muted-foreground text-xs">Step 3</p>
      <p className="mt-1 text-sm">Configuring your project...</p>
    </div>,
    <div key="4" className="rounded-xl border bg-card p-4 shadow-sm">
      <p className="font-medium text-muted-foreground text-xs">Step 4</p>
      <p className="mt-1 text-sm">Ready to go!</p>
    </div>,
  ]
  return (
    <div className="h-64 max-w-sm">
      <StreamingCards interval={2000}>{cards}</StreamingCards>
    </div>
  )
}
