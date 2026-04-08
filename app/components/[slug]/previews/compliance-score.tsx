"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ComplianceScore } from "@/components/ui/compliance-score"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const complianceScoreControlDefs = {
  score: {
    type: "number" as const,
    defaultValue: 78,
    min: 0,
    max: 100,
    step: 1,
    label: "Score",
  },
  size: {
    type: "radio" as const,
    options: ["sm", "default", "lg"],
    defaultValue: "default",
    label: "Size",
  },
  showValue: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Show Value",
  },
} satisfies ControlDefs

export default function ComplianceScorePreview() {
  const controls = useControls(complianceScoreControlDefs)
  const { score, size, showValue } = controls.values

  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <ComplianceScore
          score={Number(score)}
          size={size as "default"}
          showValue={showValue as boolean}
          label="Score"
        />
      </Playground>

      <Section title="Score Ranges">
        <ComplianceScore score={25} label="Low" />
        <ComplianceScore score={55} label="Medium" />
        <ComplianceScore score={88} label="High" />
      </Section>

      <Section title="In Context">
        <Card className="w-64">
          <CardHeader>
            <CardTitle>Compliance Posture</CardTitle>
            <CardDescription>Overall score across all frameworks</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ComplianceScore score={82} label="Score" size="lg" />
          </CardContent>
        </Card>
      </Section>
    </div>
  )
}
