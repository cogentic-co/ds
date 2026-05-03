"use client"

import { AlertTriangleIcon, CheckCircle, UserIcon } from "lucide-react"
import {
  Timeline,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline"
import { Section } from "./_shared"

export default function TimelinePreview() {
  return (
    <div className="space-y-8">
      <Section title="Default">
        <Timeline>
          <TimelineItem>
            <TimelineDot />
            <TimelineContent>
              <TimelineTitle>Application submitted</TimelineTitle>
              <TimelineTime>2 hours ago</TimelineTime>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineDot />
            <TimelineContent>
              <TimelineTitle>Review in progress</TimelineTitle>
              <TimelineTime>1 hour ago</TimelineTime>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineDot />
            <TimelineContent>
              <TimelineTitle>Approved</TimelineTitle>
              <TimelineTime>Just now</TimelineTime>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Section>
      <Section title="With Icons">
        <Timeline>
          <TimelineItem>
            <TimelineDot className="border-emerald-500 bg-emerald-50 dark:bg-emerald-950">
              <CheckCircle className="size-3 text-emerald-600" />
            </TimelineDot>
            <TimelineContent>
              <TimelineTitle>KYC verification passed</TimelineTitle>
              <TimelineTime>Mar 15, 2026 at 10:32 AM</TimelineTime>
              <p className="mt-1 text-muted-foreground text-xs">
                Identity documents verified. Risk score: Low.
              </p>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineDot className="border-amber-500 bg-amber-50 dark:bg-amber-950">
              <AlertTriangleIcon className="size-3 text-amber-600" />
            </TimelineDot>
            <TimelineContent>
              <TimelineTitle>Sanctions screening flagged</TimelineTitle>
              <TimelineTime>Mar 15, 2026 at 11:15 AM</TimelineTime>
              <p className="mt-1 text-muted-foreground text-xs">
                Potential match found. Escalated to compliance officer.
              </p>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineDot className="border-blue-500 bg-blue-50 dark:bg-blue-950">
              <UserIcon className="size-3 text-blue-600" />
            </TimelineDot>
            <TimelineContent>
              <TimelineTitle>Manual review assigned</TimelineTitle>
              <TimelineTime>Mar 15, 2026 at 11:45 AM</TimelineTime>
              <p className="mt-1 text-muted-foreground text-xs">
                Assigned to Sarah Chen for secondary review.
              </p>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineDot className="border-emerald-500 bg-emerald-50 dark:bg-emerald-950">
              <CheckCircle className="size-3 text-emerald-600" />
            </TimelineDot>
            <TimelineContent>
              <TimelineTitle>Case cleared</TimelineTitle>
              <TimelineTime>Mar 16, 2026 at 9:20 AM</TimelineTime>
              <p className="mt-1 text-muted-foreground text-xs">
                False positive confirmed. No sanctions match.
              </p>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Section>
      <Section title="Compact (Audit Trail)">
        <Timeline className="space-y-0">
          <TimelineItem className="pb-4">
            <TimelineDot className="size-2.5 border-0 bg-muted-foreground/40" />
            <TimelineContent>
              <div className="flex items-baseline gap-2">
                <TimelineTitle className="text-xs">Policy updated</TimelineTitle>
                <TimelineTime className="text-2xs">2 min ago</TimelineTime>
              </div>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem className="pb-4">
            <TimelineDot className="size-2.5 border-0 bg-muted-foreground/40" />
            <TimelineContent>
              <div className="flex items-baseline gap-2">
                <TimelineTitle className="text-xs">Report exported</TimelineTitle>
                <TimelineTime className="text-2xs">15 min ago</TimelineTime>
              </div>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem className="pb-4">
            <TimelineDot className="size-2.5 border-0 bg-muted-foreground/40" />
            <TimelineContent>
              <div className="flex items-baseline gap-2">
                <TimelineTitle className="text-xs">User role changed</TimelineTitle>
                <TimelineTime className="text-2xs">1 hour ago</TimelineTime>
              </div>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Section>
    </div>
  )
}
