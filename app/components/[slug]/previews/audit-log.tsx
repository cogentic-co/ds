"use client"

import { DownloadIcon, EditIcon, PlusIcon, ShieldCheckIcon } from "lucide-react"
import {
  AuditLog,
  AuditLogContent,
  AuditLogDetail,
  AuditLogEntry,
  AuditLogIcon,
  AuditLogMessage,
  AuditLogMeta,
  AuditLogTime,
} from "@/components/ui/audit-log"
import { Section } from "./_shared"

export default function AuditLogPreview() {
  return (
    <div className="space-y-8">
      <Section title="Compliance Audit Trail">
        <AuditLog className="w-full max-w-lg rounded-md border">
          <AuditLogEntry action="create">
            <AuditLogIcon>
              <PlusIcon className="size-3.5 text-emerald-600" />
            </AuditLogIcon>
            <AuditLogContent>
              <AuditLogMessage>
                <span className="font-medium">Sarah Chen</span> created case{" "}
                <span className="font-medium">CASE-2024-001</span>
              </AuditLogMessage>
              <AuditLogMeta>
                <span>Compliance Team</span>
                <AuditLogTime dateTime="2024-03-15T09:30:00Z">Mar 15, 9:30 AM</AuditLogTime>
              </AuditLogMeta>
              <AuditLogDetail>
                Flagged for unusual transaction pattern — 3 outbound transfers exceeding $50,000
                within 24 hours.
              </AuditLogDetail>
            </AuditLogContent>
          </AuditLogEntry>

          <AuditLogEntry action="update">
            <AuditLogIcon>
              <EditIcon className="size-3.5 text-blue-600" />
            </AuditLogIcon>
            <AuditLogContent>
              <AuditLogMessage>
                <span className="font-medium">James Lee</span> updated risk level to{" "}
                <span className="font-medium text-amber-600">High</span>
              </AuditLogMessage>
              <AuditLogMeta>
                <span>Risk Assessment</span>
                <AuditLogTime dateTime="2024-03-15T11:15:00Z">Mar 15, 11:15 AM</AuditLogTime>
              </AuditLogMeta>
            </AuditLogContent>
          </AuditLogEntry>

          <AuditLogEntry action="approve">
            <AuditLogIcon>
              <ShieldCheckIcon className="size-3.5 text-emerald-600" />
            </AuditLogIcon>
            <AuditLogContent>
              <AuditLogMessage>
                <span className="font-medium">Maria Gonzalez</span> approved escalation to senior
                review
              </AuditLogMessage>
              <AuditLogMeta>
                <span>Senior Compliance Officer</span>
                <AuditLogTime dateTime="2024-03-15T14:00:00Z">Mar 15, 2:00 PM</AuditLogTime>
              </AuditLogMeta>
            </AuditLogContent>
          </AuditLogEntry>

          <AuditLogEntry action="export">
            <AuditLogIcon>
              <DownloadIcon className="size-3.5 text-muted-foreground" />
            </AuditLogIcon>
            <AuditLogContent>
              <AuditLogMessage>
                <span className="font-medium">Sarah Chen</span> exported STR report
              </AuditLogMessage>
              <AuditLogMeta>
                <span>Compliance Team</span>
                <AuditLogTime dateTime="2024-03-15T16:45:00Z">Mar 15, 4:45 PM</AuditLogTime>
              </AuditLogMeta>
              <AuditLogDetail>
                Report exported as PDF — includes all linked transactions and evidence.
              </AuditLogDetail>
            </AuditLogContent>
          </AuditLogEntry>
        </AuditLog>
      </Section>
    </div>
  )
}
