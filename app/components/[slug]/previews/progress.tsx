"use client"

import { Progress } from "@/src/components/progress"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const progressControlDefs = {
  value: {
    type: "number" as const,
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
    label: "Value",
  },
  size: {
    type: "select" as const,
    options: ["xs", "sm", "default", "lg", "xl"],
    defaultValue: "xl",
    label: "Size",
  },
  variant: {
    type: "select" as const,
    options: ["default", "warning", "destructive", "success"],
    defaultValue: "default",
    label: "Variant",
  },
  hatched: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Hatched track",
  },
  animate: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Animate",
  },
} satisfies ControlDefs

const VARIANTS = ["default", "warning", "destructive", "success"] as const
const SIZES = ["xs", "sm", "default", "lg", "xl"] as const

export default function ProgressPreview() {
  const controls = useControls(progressControlDefs)
  const { value, size, variant, hatched, animate } = controls.values

  return (
    <div className="space-y-10">
      <Playground controls={controls}>
        <div className="space-y-2">
          <p className="text-muted-foreground text-sm">{value}%</p>
          <Progress
            key={`${animate}-${value}-${size}-${hatched}-${variant}`}
            value={value}
            size={size as "default"}
            variant={variant as "default"}
            hatched={hatched}
            animate={animate}
          />
        </div>
      </Playground>

      <Section title="Variants">
        <div className="grid w-full gap-4 md:grid-cols-2">
          {VARIANTS.map((v) => (
            <div key={v} className="space-y-2 rounded-lg border bg-card p-4">
              <p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
                {v}
              </p>
              <Progress value={62} size="xl" variant={v} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Variants × hatched">
        <div className="grid w-full gap-4 md:grid-cols-2">
          {VARIANTS.map((v) => (
            <div key={v} className="space-y-2 rounded-lg border bg-card p-4">
              <p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
                {v} · hatched
              </p>
              <Progress value={62} size="xl" variant={v} hatched />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Sizes">
        <div className="grid w-full gap-4">
          {SIZES.map((s) => (
            <div key={s} className="grid grid-cols-[60px_1fr_60px_1fr] items-center gap-3">
              <p className="font-mono text-muted-foreground text-xs">{s}</p>
              <Progress value={62} size={s} />
              <p className="font-mono text-muted-foreground text-xs">{s} hatch</p>
              <Progress value={62} size={s} hatched />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Value spectrum">
        <div className="grid w-full gap-3">
          {[0, 20, 50, 70, 100].map((v) => (
            <div key={v} className="grid grid-cols-[60px_1fr] items-center gap-3">
              <p className="font-mono text-muted-foreground text-xs">{v}%</p>
              <Progress value={v} size="xl" hatched />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Animated on mount">
        <div className="grid w-full gap-3">
          <Progress value={75} animate />
          <Progress value={75} size="lg" variant="warning" animate />
          <Progress value={75} size="xl" hatched animate />
        </div>
      </Section>
    </div>
  )
}
