"use client"

import { useState } from "react"
import { Tag } from "@/components/ui/tag"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const tagControlDefs = {
  variant: {
    type: "select" as const,
    options: ["default", "primary", "secondary", "destructive", "success"],
    defaultValue: "default",
    label: "Variant",
  },
  label: {
    type: "text" as const,
    defaultValue: "Tag label",
    label: "Label",
  },
  removable: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Removable",
  },
} satisfies ControlDefs

export default function TagPreview() {
  const controls = useControls(tagControlDefs)
  const { variant, label, removable } = controls.values
  const [tags, setTags] = useState(["React", "TypeScript", "Tailwind"])
  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <Tag variant={variant as "default"} onRemove={removable ? () => {} : undefined}>
            {label}
          </Tag>
        </div>
      </Playground>
      <Section title="Variants">
        <Tag>Default</Tag>
        <Tag variant="primary">Primary</Tag>
        <Tag variant="secondary">Secondary</Tag>
        <Tag variant="destructive">Destructive</Tag>
        <Tag variant="success">Success</Tag>
      </Section>
      <Section title="Removable">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag
              key={tag}
              variant="secondary"
              onRemove={() => setTags((t) => t.filter((x) => x !== tag))}
            >
              {tag}
            </Tag>
          ))}
        </div>
      </Section>
    </div>
  )
}
