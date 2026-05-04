"use client"

import { UserIcon } from "lucide-react"
import {
  Message,
  MessageActions,
  MessageAvatar,
  MessageContent,
  MessageCopyAction,
  MessageFeedbackActions,
  MessageRegenerateAction,
  MessageResponse,
} from "@/src/chat"

export default function MessagePreview() {
  return (
    <div className="space-y-4">
      <Message from="user">
        <MessageAvatar>
          <UserIcon className="size-4" />
        </MessageAvatar>
        <MessageContent>
          <MessageResponse>
            What are the key compliance requirements for crypto exchanges?
          </MessageResponse>
        </MessageContent>
      </Message>

      <Message from="assistant">
        <MessageAvatar className="bg-primary text-primary-foreground">AI</MessageAvatar>
        <MessageContent>
          <MessageResponse>
            <p>The key compliance requirements for crypto exchanges include:</p>
            <ol>
              <li>
                <strong>KYC/AML</strong> — Identity verification and anti-money laundering controls
              </li>
              <li>
                <strong>Travel Rule</strong> — Transaction data sharing between VASPs
              </li>
              <li>
                <strong>Licensing</strong> — Regulatory registration in each operating jurisdiction
              </li>
            </ol>
          </MessageResponse>
          <MessageActions>
            <MessageCopyAction content="The key compliance requirements..." />
            <MessageRegenerateAction onClick={() => {}} />
            <MessageFeedbackActions onThumbsUp={() => {}} onThumbsDown={() => {}} />
          </MessageActions>
        </MessageContent>
      </Message>
    </div>
  )
}
