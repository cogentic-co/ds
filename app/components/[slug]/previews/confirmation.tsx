"use client"

import { Database, Send, Trash2 } from "lucide-react"
import {
  Confirmation,
  ConfirmationAccepted,
  ConfirmationAction,
  ConfirmationActions,
  ConfirmationRejected,
  ConfirmationRequest,
} from "@/src/chat"
import { Section } from "./_shared"

export default function ConfirmationPreview() {
  return (
    <div className="space-y-8">
      <Section title="Pending — icon · message · actions row">
        <div className="w-full max-w-2xl space-y-3">
          <Confirmation status="pending">
            <ConfirmationRequest
              icon={<Database />}
              title="Execute database query"
              description="SELECT * FROM transactions WHERE amount > 10000 AND status = 'flagged'"
            />
            <ConfirmationActions>
              <ConfirmationAction variant="outline">Reject</ConfirmationAction>
              <ConfirmationAction>Approve</ConfirmationAction>
            </ConfirmationActions>
          </Confirmation>

          <Confirmation status="pending">
            <ConfirmationRequest
              icon={<Trash2 />}
              title="Delete archived cases"
              description="42 cases will be permanently removed."
            />
            <ConfirmationActions>
              <ConfirmationAction variant="outline">Cancel</ConfirmationAction>
              <ConfirmationAction variant="destructive">Delete</ConfirmationAction>
            </ConfirmationActions>
          </Confirmation>
        </div>
      </Section>

      <Section title="Accepted">
        <div className="w-full max-w-2xl">
          <Confirmation status="accepted">
            <ConfirmationRequest icon={<Send />} title="Send compliance report" />
            <ConfirmationAccepted>Sent</ConfirmationAccepted>
          </Confirmation>
        </div>
      </Section>

      <Section title="Rejected">
        <div className="w-full max-w-2xl">
          <Confirmation status="rejected">
            <ConfirmationRequest title="Override sanctions block" />
            <ConfirmationRejected>Denied</ConfirmationRejected>
          </Confirmation>
        </div>
      </Section>
    </div>
  )
}
