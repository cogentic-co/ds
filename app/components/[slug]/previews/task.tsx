"use client"

import type React from "react"
import { Task, TaskContent, TaskItem, TaskTrigger } from "@/src/chatbot"
import { Section } from "./_shared"

function Code({ children }: { children: React.ReactNode }) {
  return <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">{children}</code>
}

function Row({ name, type, children }: { name: string; type: string; children: React.ReactNode }) {
  return (
    <tr className="border-border border-b last:border-b-0">
      <td className="py-1.5 pr-4 align-top font-mono text-xs">{name}</td>
      <td className="py-1.5 pr-4 align-top font-mono text-muted-foreground text-xs">{type}</td>
      <td className="py-1.5 align-top text-foreground text-sm">{children}</td>
    </tr>
  )
}

function PropTable({ title, rows }: { title: string; rows: React.ReactNode }) {
  return (
    <div className="space-y-2 rounded-lg border border-border p-3">
      <div className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
        {title}
      </div>
      <table className="w-full">
        <tbody>{rows}</tbody>
      </table>
    </div>
  )
}

export default function TaskPreview() {
  return (
    <div className="max-w-2xl space-y-6">
      <PropTable
        title="<Task> props"
        rows={
          <>
            <Row name="collapsible" type="boolean (true)">
              When <Code>false</Code>, no chevron and the trigger does not toggle. Use for
              single-line tasks.
            </Row>
            <Row name="defaultOpen" type="boolean (false)">
              Initial expanded state. Ignored when <Code>collapsible=false</Code> (content always
              shows).
            </Row>
          </>
        }
      />

      <PropTable
        title="<TaskTrigger> props"
        rows={
          <>
            <Row name="status" type='"pending" | "running" | "complete" | "error"'>
              Drives the leading icon + header tone. <Code>complete</Code> paints{" "}
              <Code>bg-mint/40</Code>; <Code>error</Code> paints <Code>bg-blush/40</Code>. Running
              uses the lines spinner.
            </Row>
          </>
        }
      />

      <PropTable
        title="<TaskItem> props"
        rows={
          <>
            <Row name="status" type='"pending" | "running" | "complete" | "error"'>
              Per-item status icon. <Code>complete</Code> dims the text (no strikethrough).
            </Row>
          </>
        }
      />

      <Section title="Multi-step (collapsible)">
        <Task defaultOpen>
          <TaskTrigger status="running">Setting up compliance infrastructure</TaskTrigger>
          <TaskContent>
            <TaskItem status="complete">Created database schema</TaskItem>
            <TaskItem status="complete">Configured API endpoints</TaskItem>
            <TaskItem status="running">Running screening provider integration</TaskItem>
            <TaskItem status="pending">Setting up monitoring alerts</TaskItem>
            <TaskItem status="pending">Deploying to staging</TaskItem>
          </TaskContent>
        </Task>
      </Section>

      <Section title="Single task — non-collapsible, fully rounded, py-2">
        <Task collapsible={false}>
          <TaskTrigger status="running">Indexing transactions</TaskTrigger>
        </Task>
      </Section>

      <Section title="Success header">
        <Task collapsible={false}>
          <TaskTrigger status="complete">Investigation completed</TaskTrigger>
        </Task>
      </Section>

      <Section title="Error header">
        <Task collapsible={false}>
          <TaskTrigger status="error">Sanctions provider unreachable</TaskTrigger>
        </Task>
      </Section>

      <Section title="Pending">
        <Task collapsible={false}>
          <TaskTrigger status="pending">Awaiting analyst review</TaskTrigger>
        </Task>
      </Section>
    </div>
  )
}
