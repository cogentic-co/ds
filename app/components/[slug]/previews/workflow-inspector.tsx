"use client"

import { GitBranchIcon, WorkflowIcon } from "lucide-react"
import { useState } from "react"
import { SequenceBuilder, type SequenceStep } from "@/src/blocks/sequence-builder"
import { Button } from "@/src/components/button"
import { Field, FieldLabel } from "@/src/components/field"
import { Input } from "@/src/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/select"
import { WorkflowInspector } from "@/src/workflow/workflow-inspector"

export default function WorkflowInspectorPreview() {
  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-3">
        <p className="text-muted-foreground text-xs uppercase tracking-wide">Condition inspector</p>
        <div className="flex h-[420px] w-full overflow-hidden rounded-lg border border-border">
          <div className="flex flex-1 items-center justify-center bg-background text-muted-foreground text-sm">
            Canvas area
          </div>
          <WorkflowInspector
            title="Configure If/else"
            icon={<GitBranchIcon />}
            onClose={() => console.log("close")}
            footer={
              <>
                <Button variant="ghost" size="sm">
                  Cancel
                </Button>
                <Button size="sm">Save</Button>
              </>
            }
          >
            <div className="text-muted-foreground text-xs uppercase tracking-wide">Condition</div>
            <p className="text-muted-foreground text-xs">
              Conditions are evaluated top to bottom. First match wins.
            </p>
            <Field>
              <FieldLabel>If</FieldLabel>
              <Select defaultValue="label">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="label">Label</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="assignee">Assignee</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel>Is</FieldLabel>
              <Input placeholder="Value" />
            </Field>
            <Button variant="outline" size="sm" className="w-full">
              + Add condition
            </Button>
          </WorkflowInspector>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-muted-foreground text-xs uppercase tracking-wide">Sequence inspector</p>
        <SequenceInspectorExample />
      </section>
    </div>
  )
}

function SequenceInspectorExample() {
  const [steps, setSteps] = useState<SequenceStep[]>([
    {
      id: "step-1",
      title: "Assign to on-call",
      content: (
        <p className="text-muted-foreground text-xs">
          Route new threads to the on-call support engineer
        </p>
      ),
    },
    {
      id: "step-2",
      title: "Wait for response",
      content: <p className="text-muted-foreground text-xs">15 minutes</p>,
    },
    {
      id: "step-3",
      title: "Escalate to team lead",
      content: <p className="text-muted-foreground text-xs">Notify the team lead if no response</p>,
    },
  ])

  function handleAddStep(index: number) {
    setSteps((current) => {
      const next = [...current]
      next.splice(index, 0, {
        id: `step-${Date.now()}`,
        title: "New step",
        content: <p className="text-muted-foreground text-xs">Configure this step</p>,
      })
      return next
    })
  }

  function handleRemoveStep(id: string) {
    setSteps((current) => current.filter((s) => s.id !== id))
  }

  return (
    <div className="flex h-[560px] w-full overflow-hidden rounded-lg border border-border">
      <div className="flex flex-1 items-center justify-center bg-background text-muted-foreground text-sm">
        Canvas area
      </div>
      <WorkflowInspector
        title="Escalation path"
        icon={<WorkflowIcon />}
        className="w-96"
        onClose={() => console.log("close")}
        footer={
          <>
            <Button variant="ghost" size="sm">
              Cancel
            </Button>
            <Button size="sm">Save</Button>
          </>
        }
      >
        <p className="text-muted-foreground text-xs">
          Steps run in order. Drag to reorder, or use the + buttons to insert between steps.
        </p>
        <SequenceBuilder
          steps={steps}
          onStepsChange={setSteps}
          onAddStep={handleAddStep}
          onRemoveStep={handleRemoveStep}
          size="sm"
        />
      </WorkflowInspector>
    </div>
  )
}
