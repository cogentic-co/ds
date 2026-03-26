"use client"

import { toast } from "sonner"
import { ApprovalActions } from "@/components/ui/approval-actions"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const approvalActionsControlDefs = {
  requireReason: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Require Reason",
  },
  disabled: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Disabled",
  },
} satisfies ControlDefs

export default function ApprovalActionsPreview() {
  const controls = useControls(approvalActionsControlDefs)
  const { requireReason, disabled } = controls.values

  return (
    <div className="space-y-6">
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <ApprovalActions
            onApprove={(reason) => toast.success(`Approved${reason ? `: ${reason}` : ""}`)}
            onReject={(reason) => toast.error(`Rejected${reason ? `: ${reason}` : ""}`)}
            onEscalate={(reason) => toast.warning(`Escalated${reason ? `: ${reason}` : ""}`)}
            requireReason={requireReason}
            disabled={disabled}
          />
        </div>
      </Playground>

      <Section title="With Required Reason">
        <ApprovalActions
          onApprove={(reason) => toast.success(`Approved: ${reason}`)}
          onReject={(reason) => toast.error(`Rejected: ${reason}`)}
          onEscalate={(reason) => toast.warning(`Escalated: ${reason}`)}
          requireReason
        />
      </Section>

      <Section title="Disabled">
        <ApprovalActions onApprove={() => {}} onReject={() => {}} onEscalate={() => {}} disabled />
      </Section>
    </div>
  )
}
