"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const avatarControlDefs = {
  size: {
    type: "radio" as const,
    options: ["sm", "default", "lg"],
    defaultValue: "default",
    label: "Size",
  },
  fallback: {
    type: "text" as const,
    defaultValue: "JC",
    label: "Fallback",
  },
} satisfies ControlDefs

export default function AvatarPreview() {
  const controls = useControls(avatarControlDefs)

  return (
    <div className="space-y-6">
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <Avatar size={controls.values.size as "default"}>
            <AvatarFallback>{controls.values.fallback}</AvatarFallback>
          </Avatar>
        </div>
      </Playground>

      <Section title="With image">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Section>
      <Section title="Fallback">
        <Avatar>
          <AvatarFallback>JC</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>ZK</AvatarFallback>
        </Avatar>
      </Section>
    </div>
  )
}
