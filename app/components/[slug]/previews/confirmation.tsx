"use client"

import {
  Confirmation,
  ConfirmationAccepted,
  ConfirmationAction,
  ConfirmationActions,
  ConfirmationRequest,
} from "@/src/chatbot"

export default function ConfirmationPreview() {
  return (
    <div className="space-y-4">
      <Confirmation status="pending">
        <ConfirmationRequest
          title="Execute database query"
          description="SELECT * FROM transactions WHERE amount > 10000 AND status = 'flagged'"
        />
        <ConfirmationActions>
          <ConfirmationAction>Approve</ConfirmationAction>
          <ConfirmationAction variant="destructive">Reject</ConfirmationAction>
        </ConfirmationActions>
      </Confirmation>

      <Confirmation status="accepted">
        <ConfirmationRequest title="Send compliance report" />
        <ConfirmationAccepted>Report sent successfully</ConfirmationAccepted>
      </Confirmation>
    </div>
  )
}
