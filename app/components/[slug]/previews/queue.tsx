"use client"

import { useState } from "react"
import {
  QueueItem,
  QueueItemActions,
  QueueItemContent,
  QueueItemDescription,
  QueueItemDragHandle,
  QueueItemIndicator,
  QueueList,
  QueueSection,
  QueueSectionTrigger,
} from "@/src/chatbot"
import { Button } from "@/src/components/button"
import { Section } from "./_shared"

type Task = {
  id: string
  status: "pending" | "active" | "complete" | "error"
  title: string
  description?: string
}

const initial: Task[] = [
  {
    id: "1",
    status: "complete",
    title: "Verify customer identity",
    description: "KYC check completed",
  },
  {
    id: "2",
    status: "active",
    title: "Screen against sanctions lists",
    description: "Checking OFAC, EU, UN lists…",
  },
  { id: "3", status: "pending", title: "Calculate risk score" },
  { id: "4", status: "pending", title: "Generate compliance report" },
]

export default function QueuePreview() {
  const [tasks, setTasks] = useState(initial)
  const [dragId, setDragId] = useState<string | null>(null)

  function move(fromId: string, toId: string) {
    if (fromId === toId) return
    setTasks((prev) => {
      const next = [...prev]
      const fromIdx = next.findIndex((t) => t.id === fromId)
      const toIdx = next.findIndex((t) => t.id === toId)
      if (fromIdx < 0 || toIdx < 0) return prev
      const [moved] = next.splice(fromIdx, 1)
      next.splice(toIdx, 0, moved)
      return next
    })
  }

  return (
    <div className="space-y-8">
      <Section title="Aligned with Step styling (border-circle indicators + status icons)">
        <QueueSection>
          <QueueSectionTrigger>Processing Queue (4 items)</QueueSectionTrigger>
          <QueueList>
            {initial.map((t) => (
              <QueueItem key={t.id}>
                <QueueItemIndicator status={t.status} />
                <QueueItemContent>
                  <span className="font-medium text-sm">{t.title}</span>
                  {t.description && <QueueItemDescription>{t.description}</QueueItemDescription>}
                </QueueItemContent>
              </QueueItem>
            ))}
          </QueueList>
        </QueueSection>
      </Section>

      <Section title="With drag handle (consumer wires DnD; shown here with native HTML5 drag)">
        <QueueSection>
          <QueueSectionTrigger>Reorderable backlog</QueueSectionTrigger>
          <QueueList>
            {tasks.map((t) => (
              <QueueItem
                key={t.id}
                draggable
                onDragStart={() => setDragId(t.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (dragId) move(dragId, t.id)
                  setDragId(null)
                }}
                onDragEnd={() => setDragId(null)}
                className={dragId === t.id ? "opacity-40" : undefined}
              >
                <QueueItemDragHandle />
                <QueueItemIndicator status={t.status} />
                <QueueItemContent>
                  <span className="font-medium text-sm">{t.title}</span>
                  {t.description && <QueueItemDescription>{t.description}</QueueItemDescription>}
                </QueueItemContent>
                <QueueItemActions>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </QueueItemActions>
              </QueueItem>
            ))}
          </QueueList>
        </QueueSection>
      </Section>
    </div>
  )
}
