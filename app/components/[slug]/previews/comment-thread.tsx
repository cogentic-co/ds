"use client"

import { MessageCircleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Comment,
  CommentActions,
  CommentAuthor,
  CommentAvatar,
  CommentBody,
  CommentContent,
  CommentHeader,
  CommentThread,
  CommentTime,
} from "@/components/ui/comment-thread"
import { Section } from "./_shared"

export default function CommentThreadPreview() {
  return (
    <div className="space-y-8">
      <Section title="Case Discussion Thread">
        <CommentThread className="w-full max-w-lg">
          <Comment>
            <CommentAvatar>SC</CommentAvatar>
            <CommentBody>
              <CommentHeader>
                <CommentAuthor>Sarah Chen</CommentAuthor>
                <CommentTime dateTime="2024-03-15T09:30:00Z">Mar 15, 9:30 AM</CommentTime>
              </CommentHeader>
              <CommentContent>
                I've reviewed the transaction pattern for CASE-2024-001. The three outbound
                transfers all went to the same beneficiary wallet within a 4-hour window. This looks
                like structured layering — recommending escalation to senior review.
              </CommentContent>
              <CommentActions>
                <Button variant="ghost" size="xs">
                  <MessageCircleIcon className="mr-1 size-3" /> Reply
                </Button>
              </CommentActions>
            </CommentBody>
          </Comment>

          <Comment reply>
            <CommentAvatar>JL</CommentAvatar>
            <CommentBody>
              <CommentHeader>
                <CommentAuthor>James Lee</CommentAuthor>
                <CommentTime dateTime="2024-03-15T10:15:00Z">Mar 15, 10:15 AM</CommentTime>
              </CommentHeader>
              <CommentContent>
                Agreed. I've cross-referenced with the VASP registry and the receiving entity is not
                registered in any jurisdiction we monitor. Updating risk level to High.
              </CommentContent>
            </CommentBody>
          </Comment>

          <Comment>
            <CommentAvatar>MG</CommentAvatar>
            <CommentBody>
              <CommentHeader>
                <CommentAuthor>Maria Gonzalez</CommentAuthor>
                <CommentTime dateTime="2024-03-15T14:00:00Z">Mar 15, 2:00 PM</CommentTime>
              </CommentHeader>
              <CommentContent>
                Good catch, team. I've approved the escalation and assigned this for STR filing.
                Please ensure all supporting documentation is attached before submission.
              </CommentContent>
            </CommentBody>
          </Comment>
        </CommentThread>
      </Section>
    </div>
  )
}
