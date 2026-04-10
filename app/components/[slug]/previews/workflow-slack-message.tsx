"use client"

import { Sparkles } from "lucide-react"
import { Button } from "@/src/components/button"
import {
  WorkflowNode,
  WorkflowNodeDescription,
  WorkflowNodeIcon,
  WorkflowSlackMessage,
  WorkflowSlackMessageActions,
  WorkflowSlackMessageBody,
  WorkflowSlackMessageTitle,
} from "@/src/workflow"

export default function WorkflowSlackMessagePreview() {
  return (
    <div className="flex flex-col gap-12">
      <section className="flex items-center justify-center gap-16 py-8">
        <WorkflowNode
          status="running"
          title="Summarize to Slack"
          category="AI"
          className="border-violet-200 bg-gradient-to-br from-violet-100/70 via-card to-card dark:border-violet-900/60 dark:from-violet-900/20"
          icon={
            <WorkflowNodeIcon tone="ai">
              <Sparkles />
            </WorkflowNodeIcon>
          }
        >
          <WorkflowNodeDescription>Send key information to Slack</WorkflowNodeDescription>
        </WorkflowNode>

        <WorkflowSlackMessage
          appName="Compliance Bot"
          timestamp="10:18 AM"
          appAvatar={
            <div className="flex size-full items-center justify-center bg-foreground font-bold text-background text-sm">
              C
            </div>
          }
        >
          <WorkflowSlackMessageTitle>⚠️ High-risk VASP detected</WorkflowSlackMessageTitle>
          <WorkflowSlackMessageBody>
            A counterparty transfer to an unhosted wallet has triggered the Travel Rule
            threshold. Jurisdiction: Singapore. Risk score: 82/100.
          </WorkflowSlackMessageBody>
          <WorkflowSlackMessageActions>
            <Button variant="secondary" size="sm">
              Open case
            </Button>
          </WorkflowSlackMessageActions>
        </WorkflowSlackMessage>
      </section>

      <section className="max-w-md">
        <p className="mb-3 text-muted-foreground text-xs uppercase tracking-wide">
          Without actions
        </p>
        <WorkflowSlackMessage
          appName="Compliance Bot"
          timestamp="2:47 PM"
          appAvatar={
            <div className="flex size-full items-center justify-center bg-success/20 font-bold text-sm text-success">
              C
            </div>
          }
        >
          <WorkflowSlackMessageTitle>✅ KYC review complete</WorkflowSlackMessageTitle>
          <WorkflowSlackMessageBody>
            All 12 flagged transactions for the past 24 hours have been reviewed and cleared
            by the compliance team. No escalations required.
          </WorkflowSlackMessageBody>
        </WorkflowSlackMessage>
      </section>
    </div>
  )
}
