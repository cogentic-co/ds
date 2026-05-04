"use client"

import { Badge } from "@/src/components/badge"
import { Step, Stepper } from "@/src/components/step"
import { type ControlDefs, Playground, useControls } from "./_shared"

const stepControlDefs = {
  status: {
    type: "select",
    options: ["done", "active", "pending", "failed", "skipped"],
    defaultValue: "active",
    label: "Status",
  },
  size: {
    type: "radio",
    options: ["compact", "detailed"],
    defaultValue: "compact",
    label: "Size",
  },
  title: { type: "text", defaultValue: "Run sanctions screening", label: "Title" },
  description: { type: "text", defaultValue: "60/100 records checked", label: "Description" },
} satisfies ControlDefs

export default function StepPreview() {
  const controls = useControls(stepControlDefs)
  const size = controls.values.size as "compact" | "detailed"
  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <div className="w-full max-w-md">
          <Stepper>
            <Step
              status={
                controls.values.status as "done" | "active" | "pending" | "failed" | "skipped"
              }
              size={size}
              title={controls.values.title}
              description={size === "detailed" ? controls.values.description : undefined}
            />
          </Stepper>
        </div>
      </Playground>

      <section>
        <p className="mb-3 font-medium text-muted-foreground text-xs">Compact (single-line)</p>
        <Stepper>
          <Step
            status="done"
            title="Validate inputs"
            trailing={<Badge variant="mint">Done</Badge>}
          />
          <Step
            status="active"
            title="Run sanctions screening"
            trailing={<Badge variant="ghost">60/100</Badge>}
          />
          <Step
            status="pending"
            title="Generate report"
            trailing={<Badge variant="ghost">Queued</Badge>}
          />
          <Step
            status="failed"
            title="Notify reviewer"
            trailing={<Badge variant="destructive">Error</Badge>}
          />
          <Step status="skipped" title="Optional travel rule check" />
        </Stepper>
      </section>

      <section>
        <p className="mb-3 font-medium text-muted-foreground text-xs">
          Detailed (with description)
        </p>
        <Stepper>
          <Step
            size="detailed"
            status="done"
            title="Identity verification"
            description="Counterparty KYC complete. Risk score: 32"
            trailing={<Badge variant="mint">Done</Badge>}
          />
          <Step
            size="detailed"
            status="active"
            title="Transaction review"
            description="Inbound $1,250.00 USDC from 0x82c…f491"
            trailing={<Badge variant="highlight">In progress</Badge>}
          />
          <Step
            size="detailed"
            status="pending"
            title="Approval"
            description="Awaiting compliance officer sign-off"
          />
        </Stepper>
      </section>

      <section>
        <p className="mb-3 font-medium text-muted-foreground text-xs">Horizontal stepper</p>
        <Stepper orientation="horizontal">
          <Step status="done" title="Account" />
          <Step status="done" title="Identity" />
          <Step status="active" title="Review" />
          <Step status="pending" title="Approve" />
        </Stepper>
      </section>
    </div>
  )
}
