"use client"

import {
  ArrowUpRight,
  Building2,
  Calendar,
  CheckCircle2,
  CreditCard,
  DollarSign,
  FileText,
  Mail,
  MapPin,
  Phone,
  Slack,
  Sparkles,
  Webhook,
  Workflow,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/avatar"
import { Badge } from "@/src/components/badge"
import { Button } from "@/src/components/button"
import {
  WorkflowNodeCard,
  WorkflowNodeDescription,
  WorkflowNodeIcon,
  WorkflowNodeRow,
} from "@/src/workflow/workflow-node-card"
import { Section } from "./_shared"

export default function WorkflowNodeCardPreview() {
  return (
    <div className="space-y-12">
      <Section title="Person card">
        <WorkflowNodeCard
          title="Sarah Chen"
          category="Compliance Lead"
          icon={
            <Avatar className="size-8">
              <AvatarImage src="https://i.pravatar.cc/64?u=sarah" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          }
        >
          <div className="flex flex-col gap-1.5 text-muted-foreground text-xs">
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3" /> Singapore
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="size-3" /> sarah@cogentic.co
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="size-3" /> +65 8123 4567
            </span>
          </div>
        </WorkflowNodeCard>
      </Section>

      <Section title="Company / VASP">
        <WorkflowNodeCard
          title="Binance Singapore"
          category="VASP"
          icon={
            <WorkflowNodeIcon tone="primary">
              <Building2 />
            </WorkflowNodeIcon>
          }
        >
          <WorkflowNodeRow label="Jurisdiction" value="🇸🇬 Singapore" />
          <WorkflowNodeRow label="Registration" value="MAS Licensed" />
          <WorkflowNodeRow label="Risk score" value="32" />
        </WorkflowNodeCard>
      </Section>

      <Section title="Deal / opportunity">
        <WorkflowNodeCard
          title="Acme Corp — Annual contract"
          category="Deal"
          status="running"
          icon={
            <WorkflowNodeIcon tone="success">
              <DollarSign />
            </WorkflowNodeIcon>
          }
          footer={
            <div className="flex w-full items-center justify-between text-xs">
              <span className="font-mono font-semibold">$48,000</span>
              <Badge variant="secondary" className="text-[10px]">
                Stage 3 of 5
              </Badge>
            </div>
          }
        >
          <WorkflowNodeRow label="Owner" value="James Cooke" />
          <WorkflowNodeRow label="Closes" value="Apr 25, 2026" />
        </WorkflowNodeCard>
      </Section>

      <Section title="Integration / connector">
        <WorkflowNodeCard
          title="Send to Slack"
          category="Integration"
          kind={
            <>
              <Webhook className="size-3" /> Connector
            </>
          }
          icon={
            <WorkflowNodeIcon tone="slack">
              <Slack />
            </WorkflowNodeIcon>
          }
        >
          <WorkflowNodeDescription>
            Posts a summary message to <code>#compliance-alerts</code> when triggered.
          </WorkflowNodeDescription>
        </WorkflowNodeCard>
      </Section>

      <Section title="AI step">
        <WorkflowNodeCard
          title="Summarise transaction"
          category="AI"
          status="running"
          className="border-violet-200 bg-gradient-to-br from-violet-100/70 via-card to-card dark:border-violet-900/60 dark:from-violet-900/20"
          icon={
            <WorkflowNodeIcon tone="ai">
              <Sparkles />
            </WorkflowNodeIcon>
          }
        >
          <WorkflowNodeDescription>
            Pull out key parties, amount, and risk factors from the transaction.
          </WorkflowNodeDescription>
        </WorkflowNodeCard>
      </Section>

      <Section title="Document / artifact">
        <WorkflowNodeCard
          title="Q1 2026 SAR.pdf"
          category="Report"
          status="completed"
          icon={
            <WorkflowNodeIcon tone="primary">
              <FileText />
            </WorkflowNodeIcon>
          }
          footer={
            <Button variant="outline" size="sm" className="w-full">
              <ArrowUpRight className="mr-1 size-3" />
              Download
            </Button>
          }
        >
          <WorkflowNodeDescription>
            Filed Apr 4, 2026. Signed by S. Chen, A. Peterson.
          </WorkflowNodeDescription>
        </WorkflowNodeCard>
      </Section>

      <Section title="Calendar event">
        <WorkflowNodeCard
          title="Travel Rule renewal"
          category="Deadline"
          status="failed"
          icon={
            <WorkflowNodeIcon tone="destructive">
              <Calendar />
            </WorkflowNodeIcon>
          }
        >
          <div className="flex items-center gap-2 font-mono text-muted-foreground text-xs">
            <span>Due in 3 days</span>
            <span className="text-destructive">Overdue items: 2</span>
          </div>
        </WorkflowNodeCard>
      </Section>

      <Section title="Payment / transaction">
        <WorkflowNodeCard
          title="2.5 ETH transfer"
          category="Tx"
          icon={
            <WorkflowNodeIcon tone="warning">
              <CreditCard />
            </WorkflowNodeIcon>
          }
        >
          <WorkflowNodeRow label="From" value="Binance" />
          <WorkflowNodeRow label="To" value="Coinbase" />
          <WorkflowNodeRow label="Value" value="$7,825.00" />
        </WorkflowNodeCard>
      </Section>

      <Section title="Workflow trigger">
        <WorkflowNodeCard
          title="When deal status updated"
          category="Trigger"
          kind={
            <>
              <Workflow className="size-3" /> Trigger
            </>
          }
          icon={
            <WorkflowNodeIcon tone="ai">
              <CheckCircle2 />
            </WorkflowNodeIcon>
          }
        >
          <WorkflowNodeDescription>
            Fires whenever a deal's compliance status changes.
          </WorkflowNodeDescription>
        </WorkflowNodeCard>
      </Section>

      <Section title="States — without xyflow handles">
        <div className="grid max-w-4xl gap-x-6 gap-y-10 sm:grid-cols-2">
          {(["running", "completed", "failed", "queued"] as const).map((status) => (
            <WorkflowNodeCard
              key={status}
              status={status}
              title="Send notification"
              category="Action"
              icon={
                <WorkflowNodeIcon tone="slack">
                  <Slack />
                </WorkflowNodeIcon>
              }
            >
              <WorkflowNodeDescription>
                Pure visual — no xyflow dependency required.
              </WorkflowNodeDescription>
            </WorkflowNodeCard>
          ))}
        </div>
      </Section>
    </div>
  )
}
