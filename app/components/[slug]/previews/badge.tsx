"use client"

import { Badge } from "@/src/components/badge"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const TONES = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "mint",
  "sky",
  "blush",
  "lilac",
  "highlight",
] as const

const badgeControlDefs = {
  variant: {
    type: "select" as const,
    options: [...TONES],
    defaultValue: "default",
    label: "Tone",
  },
  size: {
    type: "select" as const,
    options: ["sm", "default", "lg"],
    defaultValue: "default",
    label: "Size",
  },
  shape: {
    type: "radio" as const,
    options: ["pill", "square"],
    defaultValue: "pill",
    label: "Shape",
  },
  dot: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Dot",
  },
  closable: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Closable (×)",
  },
  label: {
    type: "text" as const,
    defaultValue: "Badge",
    label: "Label",
  },
} satisfies ControlDefs

export default function BadgePreview() {
  const controls = useControls(badgeControlDefs)
  const { variant, size, shape, dot, closable, label } = controls.values

  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <Badge
            variant={variant as "default"}
            size={size as "default"}
            shape={shape as "pill"}
            dot={dot}
            closable={closable}
          >
            {label}
          </Badge>
        </div>
      </Playground>

      <Section title="Tones">
        <div className="flex flex-wrap gap-2">
          {TONES.map((t) => (
            <Badge key={t} variant={t}>
              {t}
            </Badge>
          ))}
        </div>
      </Section>

      <Section title="Sizes">
        <div className="flex items-center gap-2">
          <Badge size="sm">sm</Badge>
          <Badge>default</Badge>
          <Badge size="lg">lg</Badge>
        </div>
      </Section>

      <Section title="Shapes">
        <div className="flex items-center gap-2">
          <Badge shape="pill">Pill</Badge>
          <Badge shape="square">Square</Badge>
        </div>
      </Section>

      <Section title="With dot">
        <div className="flex flex-wrap items-center gap-2">
          <Badge dot variant="mint">
            Online
          </Badge>
          <Badge dot variant="highlight">
            Pending
          </Badge>
          <Badge dot variant="destructive">
            Error
          </Badge>
          <Badge dot size="lg" variant="sky">
            New
          </Badge>
        </div>
      </Section>

      <Section title="Closable (× button)">
        <div className="flex flex-wrap gap-2">
          <Badge closable onClose={() => console.log("close 1")}>
            Tag
          </Badge>
          <Badge variant="mint" closable onClose={() => console.log("close 2")}>
            Filter
          </Badge>
          <Badge variant="outline" shape="square" closable onClose={() => console.log("close 3")}>
            Chip
          </Badge>
        </div>
      </Section>

      <Section title="Tone × shape × size matrix">
        <div className="grid grid-cols-[60px_1fr_1fr] items-center gap-3">
          <span />
          <span className="text-muted-foreground text-xs">pill</span>
          <span className="text-muted-foreground text-xs">square</span>
          {(["sm", "default", "lg"] as const).map((s) => (
            <>
              <span key={`${s}-label`} className="font-mono text-muted-foreground text-xs">
                {s}
              </span>
              <Badge key={`${s}-pill`} size={s} variant="mint">
                {s} pill
              </Badge>
              <Badge key={`${s}-sq`} size={s} shape="square" variant="mint">
                {s} square
              </Badge>
            </>
          ))}
        </div>
      </Section>
    </div>
  )
}
