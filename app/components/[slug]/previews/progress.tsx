"use client"

import { Progress } from "@/components/ui/progress"
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
  animate: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Animate",
  },
} satisfies ControlDefs

export default function ProgressPreview() {
  const controls = useControls(progressControlDefs)
  const { value, animate } = controls.values

  return (
    <div className="max-w-sm space-y-6">
      <Playground controls={controls}>
        <div className="space-y-2">
          <p className="text-muted-foreground text-sm">{value}%</p>
          <Progress key={`${animate}-${value}`} value={value} animate={animate} />
        </div>
      </Playground>

      <Section title="Animated on Mount">
        <div className="w-full space-y-4">
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">75% (animated)</p>
            <Progress value={75} animate />
          </div>
        </div>
      </Section>

      <Section title="Static">
        <div className="w-full space-y-4">
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">25%</p>
            <Progress value={25} />
          </div>
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">100%</p>
            <Progress value={100} />
          </div>
        </div>
      </Section>
    </div>
  )
}
