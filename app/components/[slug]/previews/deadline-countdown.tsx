"use client"

import { DeadlineCountdown } from "@/components/ui/deadline-countdown"
import { Section } from "./_shared"

export default function DeadlineCountdownPreview() {
  const now = new Date()
  const inDays = (d: number) => {
    const date = new Date(now)
    date.setDate(date.getDate() + d)
    return date
  }
  const ago = (d: number) => {
    const date = new Date(now)
    date.setDate(date.getDate() - d)
    return date
  }
  return (
    <div className="space-y-8">
      <Section title="Normal (30 days out)">
        <DeadlineCountdown deadline={inDays(30)} label="Due in" />
      </Section>
      <Section title="Warning (5 days out)">
        <DeadlineCountdown deadline={inDays(5)} label="Due in" />
      </Section>
      <Section title="Critical (1 day out)">
        <DeadlineCountdown deadline={inDays(1)} label="Due in" />
      </Section>
      <Section title="Overdue (3 days ago)">
        <DeadlineCountdown deadline={ago(3)} label="Due in" />
      </Section>
      <Section title="Without Label or Dot">
        <DeadlineCountdown deadline={inDays(14)} showDot={false} />
      </Section>
      <Section title="In Context">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <p className="font-medium text-sm">AML Policy Review</p>
            <p className="text-muted-foreground text-xs">Annual compliance requirement</p>
          </div>
          <DeadlineCountdown deadline={inDays(3)} label="Due" />
        </div>
      </Section>
    </div>
  )
}
