"use client"

import { MailIcon, Package, PlusIcon, SettingsIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { P } from "@/components/ui/typography"
import { WorkflowNode, WorkflowNodeRow } from "@/src/workflow"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const workflowNodeControlDefs = {
  state: {
    type: "radio",
    options: ["default", "selected", "dotted"],
    defaultValue: "default",
    label: "State",
  },
  title: { type: "text", defaultValue: "Send Email", label: "Title" },
  status: { type: "text", defaultValue: "TRIGGER", label: "Status pill" },
  draggable: { type: "boolean", defaultValue: true, label: "Draggable" },
  collapsible: { type: "boolean", defaultValue: true, label: "Collapsible" },
} satisfies ControlDefs

export default function WorkflowNodePreview() {
  const controls = useControls(workflowNodeControlDefs)
  return (
    <div className="space-y-10">
      <Playground controls={controls}>
        <WorkflowNode
          state={controls.values.state as "default"}
          title={controls.values.title}
          icon={
            <span className="relative inline-flex size-8 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground text-sm">
              <MailIcon className="size-4" />
            </span>
          }
          status={controls.values.status || undefined}
          draggable={controls.values.draggable}
          collapsible={controls.values.collapsible}
        >
          <WorkflowNodeRow label="To" value="user@example.com" />
          <WorkflowNodeRow label="Subject" value="Welcome aboard!" />
          <WorkflowNodeRow label="Template" value="onboarding-v2" />
        </WorkflowNode>
      </Playground>

      <Section title="With icon badge & rich rows">
        <WorkflowNode
          state="selected"
          title="Form Submission in Webflow"
          icon={
            <span className="relative inline-flex size-8 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground text-sm">
              W
              <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-primary font-bold text-[9px] text-primary-foreground ring-2 ring-card">
                1
              </span>
            </span>
          }
          status="Trigger"
          draggable
          collapsible
        >
          <p className="mb-1 font-semibold text-sm">App & event</p>
          <WorkflowNodeRow
            label="Application"
            value="Webflow"
            icon={
              <span className="inline-flex size-5 items-center justify-center rounded bg-primary font-bold text-[10px] text-primary-foreground">
                W
              </span>
            }
          />
          <WorkflowNodeRow
            label="Event"
            value="Form Submission"
            icon={<Package className="size-4 text-muted-foreground" />}
          />
          <WorkflowNodeRow
            label="Account source"
            value="Anna Peterson"
            icon={
              <span className="inline-flex size-6 items-center justify-center rounded-full bg-accent font-semibold text-[10px]">
                AP
              </span>
            }
          />
        </WorkflowNode>
      </Section>

      <Section title="Default">
        <WorkflowNode
          title="Process Data"
          icon={
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/40">
              <SettingsIcon className="size-4 text-emerald-600 dark:text-emerald-400" />
            </span>
          }
          status="Action"
          draggable
        >
          <WorkflowNodeRow label="Input" value="API Response" />
          <WorkflowNodeRow label="Output" value="Parsed JSON" />
        </WorkflowNode>
      </Section>

      <Section title="Dotted (placeholder)">
        <WorkflowNode
          state="dotted"
          title="Add a step..."
          icon={<PlusIcon className="size-5 text-muted-foreground" />}
        />
      </Section>

      <Section title="With custom footer">
        <WorkflowNode
          title="AI Agent"
          icon={
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/40">
              <Package className="size-4 text-violet-600 dark:text-violet-400" />
            </span>
          }
          status="Running"
          footer={<Badge variant="secondary">3 tasks queued</Badge>}
        >
          <P className="text-muted-foreground text-xs">Processes incoming requests using GPT-4</P>
        </WorkflowNode>
      </Section>
    </div>
  )
}
