import type { ComponentMeta } from "../index"

// ── New components (v0.5.0) ──
export const newComponentsMeta: Record<string, ComponentMeta> = {
  "audit-log": {
    status: "new",
    description:
      "Chronological feed of system or user actions. Ideal for compliance trails and activity history.",
    since: "0.5.0",
    importStatement: `import {
  AuditLog, AuditLogEntry, AuditLogIcon,
  AuditLogContent, AuditLogMessage, AuditLogMeta,
  AuditLogTime, AuditLogDetail,
} from "@cogentic-co/ds/audit-log"`,
    dos: [
      "Use for compliance audit trails and activity logs",
      "Include timestamps and actor information on every entry",
      "Use the action variant to semantically categorize entries",
      "Add AuditLogDetail for supplementary context when needed",
    ],
    donts: [
      "Don't use for real-time chat — use CommentThread instead",
      "Don't omit timestamps — audit logs require temporal context",
      "Don't nest AuditLog components",
    ],
    codeExample: `import {
  AuditLog, AuditLogEntry, AuditLogIcon,
  AuditLogContent, AuditLogMessage, AuditLogMeta,
  AuditLogTime, AuditLogDetail,
} from "@cogentic-co/ds/audit-log"
import { PlusIcon } from "lucide-react"

<AuditLog>
  <AuditLogEntry action="create">
    <AuditLogIcon>
      <PlusIcon className="size-3.5 text-emerald-600" />
    </AuditLogIcon>
    <AuditLogContent>
      <AuditLogMessage>
        <span className="font-medium">Sarah Chen</span> created case CASE-001
      </AuditLogMessage>
      <AuditLogMeta>
        <span>Compliance Team</span>
        <AuditLogTime>Mar 15, 9:30 AM</AuditLogTime>
      </AuditLogMeta>
      <AuditLogDetail>Flagged for unusual transaction pattern.</AuditLogDetail>
    </AuditLogContent>
  </AuditLogEntry>
</AuditLog>`,
  },
  "comment-thread": {
    status: "new",
    description:
      "Threaded conversation UI with avatars, timestamps, and reply indentation. For case discussions and review comments.",
    since: "0.5.0",
    importStatement: `import {
  CommentThread, Comment, CommentAvatar, CommentBody,
  CommentHeader, CommentAuthor, CommentTime,
  CommentContent, CommentActions,
} from "@cogentic-co/ds/comment-thread"`,
    dos: [
      "Use for case discussions and review comments",
      "Show avatar initials or images for each commenter",
      "Use the reply prop for indented replies",
      "Include timestamps on every comment",
    ],
    donts: [
      "Don't use for audit logs — use AuditLog instead",
      "Don't nest CommentThread components",
      "Don't omit CommentAuthor — comments need attribution",
    ],
    codeExample: `import {
  CommentThread, Comment, CommentAvatar,
  CommentBody, CommentHeader, CommentAuthor,
  CommentTime, CommentContent,
} from "@cogentic-co/ds/comment-thread"

<CommentThread>
  <Comment>
    <CommentAvatar>SC</CommentAvatar>
    <CommentBody>
      <CommentHeader>
        <CommentAuthor>Sarah Chen</CommentAuthor>
        <CommentTime>Mar 15, 9:30 AM</CommentTime>
      </CommentHeader>
      <CommentContent>Recommending escalation.</CommentContent>
    </CommentBody>
  </Comment>
  <Comment reply>
    <CommentAvatar>JL</CommentAvatar>
    <CommentBody>
      <CommentHeader>
        <CommentAuthor>James Lee</CommentAuthor>
        <CommentTime>Mar 15, 10:15 AM</CommentTime>
      </CommentHeader>
      <CommentContent>Agreed, updating risk level.</CommentContent>
    </CommentBody>
  </Comment>
</CommentThread>`,
  },
  "filter-bar": {
    status: "new",
    description:
      "Horizontal bar of removable filter chips with a clear-all action. For data table and list filtering.",
    since: "0.5.0",
    importStatement: `import { FilterBar, FilterChip, FilterClear } from "@cogentic-co/ds/filter-bar"`,
    dos: [
      "Place above the data table or list it filters",
      "Show label:value pairs for clarity",
      "Include a Clear All action when multiple filters are active",
      "Use onRemove to allow individual chip removal",
    ],
    donts: [
      "Don't use for static tags — use Tag or Badge instead",
      "Don't show the filter bar when no filters are active",
      "Don't put form inputs inside FilterBar — use it for applied filter display only",
    ],
    codeExample: `import { FilterBar, FilterChip, FilterClear } from "@cogentic-co/ds/filter-bar"

<FilterBar>
  <FilterChip label="Status" value="Under Review" onRemove={() => {}} />
  <FilterChip label="Risk Level" value="High" onRemove={() => {}} />
  <FilterClear onClick={() => {}} />
</FilterBar>`,
  },
  "split-pane": {
    status: "new",
    description:
      "Resizable split-view layout built on react-resizable-panels. For master-detail and side-by-side views.",
    since: "0.5.0",
    importStatement: `import { SplitPane, SplitPanePanel, SplitPaneDivider } from "@cogentic-co/ds/split-pane"`,
    dos: [
      "Use for master-detail layouts (list + detail view)",
      "Set sensible minSize values to prevent panels from collapsing",
      "Use direction='vertical' for top/bottom splits",
      "Wrap in a container with a fixed height",
    ],
    donts: [
      "Don't nest more than two levels of split panes",
      "Don't use without a fixed-height parent container",
      "Don't use for simple two-column layouts — use Grid instead",
    ],
    codeExample: `import { SplitPane, SplitPanePanel, SplitPaneDivider } from "@cogentic-co/ds/split-pane"

<div className="h-[500px]">
  <SplitPane direction="horizontal">
    <SplitPanePanel defaultSize={35} minSize={20}>
      <div className="p-4">Left panel</div>
    </SplitPanePanel>
    <SplitPaneDivider />
    <SplitPanePanel defaultSize={65} minSize={30}>
      <div className="p-4">Right panel</div>
    </SplitPanePanel>
  </SplitPane>
</div>`,
  },
  "step-progress": {
    status: "new",
    description:
      "Vertical or horizontal step indicator with complete, current, and upcoming states. For multi-step workflows.",
    since: "0.5.0",
    importStatement: `import {
  StepProgress, StepProgressItem, StepProgressIndicator,
  StepProgressConnector, StepProgressContent,
  StepProgressTitle, StepProgressDescription,
} from "@cogentic-co/ds/step-progress"`,
    dos: [
      "Use for multi-step workflows like KYC, onboarding, or review processes",
      "Mark completed steps with status='complete' for the checkmark indicator",
      "Include StepProgressConnector between steps for visual continuity",
      "Use StepProgressDescription for additional context on each step",
    ],
    donts: [
      "Don't use for navigation tabs — use Tabs instead",
      "Don't use more than 7 steps — simplify the workflow or group steps",
      "Don't omit the status prop — every step needs a clear state",
    ],
    codeExample: `import {
  StepProgress, StepProgressItem, StepProgressIndicator,
  StepProgressConnector, StepProgressContent,
  StepProgressTitle, StepProgressDescription,
} from "@cogentic-co/ds/step-progress"

<StepProgress>
  <StepProgressItem status="complete">
    <StepProgressIndicator status="complete" />
    <StepProgressConnector data-complete="true" />
    <StepProgressContent>
      <StepProgressTitle>Identity Verification</StepProgressTitle>
      <StepProgressDescription>ID verified successfully.</StepProgressDescription>
    </StepProgressContent>
  </StepProgressItem>
  <StepProgressItem status="current">
    <StepProgressIndicator status="current" step={2} />
    <StepProgressConnector />
    <StepProgressContent>
      <StepProgressTitle>Document Review</StepProgressTitle>
    </StepProgressContent>
  </StepProgressItem>
  <StepProgressItem status="upcoming">
    <StepProgressIndicator status="upcoming" step={3} />
    <StepProgressContent>
      <StepProgressTitle>Approval</StepProgressTitle>
    </StepProgressContent>
  </StepProgressItem>
</StepProgress>`,
  },
}
