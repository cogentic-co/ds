"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { StatusIndicator } from "@/components/ui/status-indicator"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const statusIndicatorControlDefs = {
  variant: {
    type: "select" as const,
    options: ["online", "offline", "busy", "away", "pending"],
    defaultValue: "online",
    label: "Variant",
  },
  size: {
    type: "select" as const,
    options: ["sm", "default", "lg"],
    defaultValue: "default",
    label: "Size",
  },
  pulse: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Pulse",
  },
} satisfies ControlDefs

export default function StatusIndicatorPreview() {
  const controls = useControls(statusIndicatorControlDefs)
  const { variant, size, pulse } = controls.values
  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <div className="flex items-center justify-center gap-3 py-4">
          <StatusIndicator variant={variant as "online"} size={size as "default"} pulse={pulse} />
          <span className="text-sm capitalize">{variant}</span>
        </div>
      </Playground>
      <Section title="All Variants">
        <div className="flex items-center gap-6">
          {(["online", "offline", "busy", "away", "pending"] as const).map((v) => (
            <div key={v} className="flex items-center gap-2">
              <StatusIndicator variant={v} />
              <span className="text-sm capitalize">{v}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Sizes">
        <div className="flex items-center gap-6">
          {(["sm", "default", "lg"] as const).map((s) => (
            <div key={s} className="flex items-center gap-2">
              <StatusIndicator variant="online" size={s} />
              <span className="text-sm">{s}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="With Pulse">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <StatusIndicator variant="online" pulse />
            <span className="text-sm">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusIndicator variant="busy" pulse />
            <span className="text-sm">Processing</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusIndicator variant="pending" pulse />
            <span className="text-sm">Syncing</span>
          </div>
        </div>
      </Section>
      <Section title="In Context (with Avatar)">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar>
              <AvatarFallback>JC</AvatarFallback>
            </Avatar>
            <StatusIndicator
              variant="online"
              size="sm"
              pulse
              className="absolute right-0 bottom-0 ring-2 ring-background"
            />
          </div>
          <div>
            <p className="font-medium text-sm">James Cooke</p>
            <p className="text-muted-foreground text-xs">Online</p>
          </div>
        </div>
      </Section>
    </div>
  )
}
