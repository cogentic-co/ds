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
    defaultValue: "sm",
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
    defaultValue: false,
    label: "Hatched track",
  },
  animate: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Animate",
  },
} satisfies ControlDefs

export default function ProgressPreview() {
  const controls = useControls(progressControlDefs)
  const { value, size, variant, hatched, animate } = controls.values

  return (
    <div className="max-w-md space-y-8">
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
        <div className="w-full space-y-4">
          {(["default", "warning", "destructive", "success"] as const).map((v) => (
            <div key={v} className="space-y-1.5">
              <p className="text-muted-foreground text-xs">variant="{v}"</p>
              <Progress value={62} size="lg" variant={v} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Sizes">
        <div className="w-full space-y-4">
          {(["xs", "sm", "default", "lg", "xl"] as const).map((s) => (
            <div key={s} className="space-y-1.5">
              <p className="text-muted-foreground text-xs">size="{s}"</p>
              <Progress value={62} size={s} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Hatched track (remaining portion)">
        <div className="w-full space-y-4">
          <div className="space-y-1.5">
            <p className="text-muted-foreground text-xs">size="xl" + hatched</p>
            <Progress value={62} size="xl" hatched />
          </div>
          <div className="space-y-1.5">
            <p className="text-muted-foreground text-xs">size="lg" + hatched</p>
            <Progress value={45} size="lg" hatched />
          </div>
          <div className="space-y-1.5">
            <p className="text-muted-foreground text-xs">size="default" + hatched</p>
            <Progress value={80} size="default" hatched />
          </div>
        </div>
      </Section>

      <Section title="Animated">
        <div className="w-full space-y-4">
          <Progress value={75} animate />
          <Progress value={75} size="xl" hatched animate />
        </div>
      </Section>
    </div>
  )
}
