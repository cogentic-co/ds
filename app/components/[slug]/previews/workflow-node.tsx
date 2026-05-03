"use client"

import {
  AlertTriangle,
  MailIcon,
  Package,
  PlusIcon,
  SettingsIcon,
  Slack,
  Sparkles,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { P } from "@/components/ui/typography"
import {
  WorkflowNode,
  WorkflowNodeDescription,
  WorkflowNodeIcon,
  WorkflowNodeRow,
  type WorkflowNodeStatus,
} from "@/src/workflow"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const workflowNodeControlDefs = {
  state: {
    type: "radio",
    options: ["default", "selected", "dotted"],
    defaultValue: "default",
    label: "Selection state",
  },
  status: {
    type: "select",
    options: ["idle", "running", "completed", "failed", "queued"],
    defaultValue: "idle",
    label: "Execution status",
  },
  title: { type: "text", defaultValue: "Send Email", label: "Title" },
  category: { type: "text", defaultValue: "Trigger", label: "Category chip" },
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
          status={controls.values.status as WorkflowNodeStatus}
          title={controls.values.title}
          category={controls.values.category || undefined}
          icon={
            <span className="relative inline-flex size-8 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground text-sm">
              <MailIcon className="size-4" />
            </span>
          }
          draggable={controls.values.draggable}
          collapsible={controls.values.collapsible}
        >
          <WorkflowNodeRow label="To" value="user@example.com" />
          <WorkflowNodeRow label="Subject" value="Welcome aboard!" />
          <WorkflowNodeRow label="Template" value="onboarding-v2" />
        </WorkflowNode>
      </Playground>

      <Section title="Icon tones">
        <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
          <WorkflowNode
            title="Prompt completion"
            category="AI"
            className="border-violet-200 bg-gradient-to-br from-violet-100/70 via-card to-card dark:border-violet-900/60 dark:from-violet-900/20"
            icon={
              <WorkflowNodeIcon tone="ai">
                <Sparkles />
              </WorkflowNodeIcon>
            }
          >
            <WorkflowNodeDescription>
              Pull out key information from the deal.
            </WorkflowNodeDescription>
          </WorkflowNode>
          <WorkflowNode
            title="Send action buttons"
            category="Slack"
            icon={
              <WorkflowNodeIcon tone="slack">
                <Slack />
              </WorkflowNodeIcon>
            }
          >
            <WorkflowNodeDescription>
              Send a summary and action buttons to Slack.
            </WorkflowNodeDescription>
          </WorkflowNode>
          <WorkflowNode
            title="Send welcome email"
            category="Email"
            icon={
              <WorkflowNodeIcon tone="email">
                <MailIcon />
              </WorkflowNodeIcon>
            }
          >
            <WorkflowNodeDescription>Notify the new user via email.</WorkflowNodeDescription>
          </WorkflowNode>
          <WorkflowNode
            title="Raise alert"
            category="Notification"
            icon={
              <WorkflowNodeIcon tone="warning">
                <AlertTriangle />
              </WorkflowNodeIcon>
            }
          >
            <WorkflowNodeDescription>
              Notify the compliance team of a high-risk event.
            </WorkflowNodeDescription>
          </WorkflowNode>
        </div>
      </Section>

      <Section title="Execution status">
        <div className="grid max-w-3xl gap-x-6 gap-y-10 sm:grid-cols-2">
          {(["running", "completed", "failed", "queued"] as const).map((status) => (
            <WorkflowNode
              key={status}
              status={status}
              title="Send action buttons to Slack"
              category="Slack"
              icon={
                <WorkflowNodeIcon tone="slack">
                  <Slack />
                </WorkflowNodeIcon>
              }
            >
              <WorkflowNodeDescription>
                Send a summary and action buttons to Slack.
              </WorkflowNodeDescription>
            </WorkflowNode>
          ))}
        </div>
      </Section>

      <Section title="With icon badge & rich rows">
        <WorkflowNode
          state="selected"
          title="Form Submission in Webflow"
          category="Trigger"
          icon={
            <span className="relative inline-flex size-8 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground text-sm">
              W
            </span>
          }
          badge={1}
          draggable
          collapsible
        >
          <p className="mb-1 font-semibold text-sm">App & event</p>
          <WorkflowNodeRow
            label="Application"
            value="Webflow"
            icon={
              <span className="inline-flex size-5 items-center justify-center rounded bg-primary font-bold text-2xs text-primary-foreground">
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
              <span className="inline-flex size-6 items-center justify-center rounded-full bg-accent font-semibold text-2xs">
                AP
              </span>
            }
          />
        </WorkflowNode>
      </Section>

      <Section title="Default">
        <WorkflowNode
          title="Process Data"
          category="Action"
          icon={
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/40">
              <SettingsIcon className="size-4 text-emerald-600 dark:text-emerald-400" />
            </span>
          }
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
          category="AI"
          status="running"
          icon={
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/40">
              <Package className="size-4 text-violet-600 dark:text-violet-400" />
            </span>
          }
          footer={<Badge variant="secondary">3 tasks queued</Badge>}
        >
          <P className="text-muted-foreground text-xs">Processes incoming requests using GPT-4</P>
        </WorkflowNode>
      </Section>
    </div>
  )
}
