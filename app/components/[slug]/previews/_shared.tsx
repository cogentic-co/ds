"use client"

import type React from "react"

export { type ControlDefs, ControlsPanel, Playground, useControls } from "../../../controls"

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="font-medium text-muted-foreground text-sm">{title}</h3>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}
