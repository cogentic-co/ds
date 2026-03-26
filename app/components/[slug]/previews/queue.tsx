"use client"

import {
  QueueItem,
  QueueItemContent,
  QueueItemDescription,
  QueueItemIndicator,
  QueueList,
  QueueSection,
  QueueSectionTrigger,
} from "@/src/chatbot"

export default function QueuePreview() {
  return (
    <QueueSection>
      <QueueSectionTrigger>Processing Queue (4 items)</QueueSectionTrigger>
      <QueueList>
        <QueueItem>
          <QueueItemIndicator status="complete" />
          <QueueItemContent>
            <span className="font-medium text-sm">Verify customer identity</span>
            <QueueItemDescription>KYC check completed</QueueItemDescription>
          </QueueItemContent>
        </QueueItem>
        <QueueItem>
          <QueueItemIndicator status="active" />
          <QueueItemContent>
            <span className="font-medium text-sm">Screen against sanctions lists</span>
            <QueueItemDescription>Checking OFAC, EU, UN lists...</QueueItemDescription>
          </QueueItemContent>
        </QueueItem>
        <QueueItem>
          <QueueItemIndicator status="pending" />
          <QueueItemContent>
            <span className="font-medium text-sm">Calculate risk score</span>
          </QueueItemContent>
        </QueueItem>
        <QueueItem>
          <QueueItemIndicator status="pending" />
          <QueueItemContent>
            <span className="font-medium text-sm">Generate compliance report</span>
          </QueueItemContent>
        </QueueItem>
      </QueueList>
    </QueueSection>
  )
}
