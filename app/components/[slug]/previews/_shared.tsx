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

export function Code({ children }: { children: React.ReactNode }) {
  return <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">{children}</code>
}

export function Row({
  name,
  type,
  children,
}: {
  name: string
  type: string
  children: React.ReactNode
}) {
  return (
    <tr className="border-border border-b last:border-b-0">
      <td className="py-1.5 pr-4 align-top font-mono text-xs">{name}</td>
      <td className="py-1.5 pr-4 align-top font-mono text-muted-foreground text-xs">{type}</td>
      <td className="py-1.5 align-top text-foreground text-sm">{children}</td>
    </tr>
  )
}

export function PropTable({ title, rows }: { title: string; rows: React.ReactNode }) {
  return (
    <div className="space-y-2 rounded-lg border border-border p-3">
      <div className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
        {title}
      </div>
      <table className="w-full">
        <tbody>{rows}</tbody>
      </table>
    </div>
  )
}
