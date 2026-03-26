"use client"

import {
  StepProgress,
  StepProgressConnector,
  StepProgressContent,
  StepProgressDescription,
  StepProgressIndicator,
  StepProgressItem,
  StepProgressTitle,
} from "@/components/ui/step-progress"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const stepProgressControlDefs = {
  orientation: {
    type: "select" as const,
    options: ["vertical", "horizontal"],
    defaultValue: "vertical",
    label: "Orientation",
  },
} satisfies ControlDefs

export default function StepProgressPreview() {
  const controls = useControls(stepProgressControlDefs)
  const { orientation } = controls.values
  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <div className="w-full py-4">
          <StepProgress orientation={orientation as "vertical"}>
            <StepProgressItem status="complete">
              <StepProgressIndicator status="complete" step={1} />
              <StepProgressConnector data-complete="true" />
              <StepProgressContent>
                <StepProgressTitle>Identity Verification</StepProgressTitle>
                <StepProgressDescription>
                  Government ID and selfie verified.
                </StepProgressDescription>
              </StepProgressContent>
            </StepProgressItem>
            <StepProgressItem status="current">
              <StepProgressIndicator status="current" step={2} />
              <StepProgressConnector />
              <StepProgressContent>
                <StepProgressTitle>Document Review</StepProgressTitle>
                <StepProgressDescription>Proof of address under review.</StepProgressDescription>
              </StepProgressContent>
            </StepProgressItem>
            <StepProgressItem status="upcoming">
              <StepProgressIndicator status="upcoming" step={3} />
              <StepProgressContent>
                <StepProgressTitle>Compliance Approval</StepProgressTitle>
                <StepProgressDescription>
                  Final sign-off from compliance officer.
                </StepProgressDescription>
              </StepProgressContent>
            </StepProgressItem>
          </StepProgress>
        </div>
      </Playground>

      <Section title="Horizontal">
        <StepProgress orientation="horizontal">
          <StepProgressItem status="complete">
            <StepProgressIndicator status="complete" step={1} />
            <StepProgressConnector data-complete="true" />
            <StepProgressContent>
              <StepProgressTitle>Submitted</StepProgressTitle>
            </StepProgressContent>
          </StepProgressItem>
          <StepProgressItem status="current">
            <StepProgressIndicator status="current" step={2} />
            <StepProgressConnector />
            <StepProgressContent>
              <StepProgressTitle>In Review</StepProgressTitle>
            </StepProgressContent>
          </StepProgressItem>
          <StepProgressItem status="upcoming">
            <StepProgressIndicator status="upcoming" step={3} />
            <StepProgressContent>
              <StepProgressTitle>Approved</StepProgressTitle>
            </StepProgressContent>
          </StepProgressItem>
        </StepProgress>
      </Section>
    </div>
  )
}
