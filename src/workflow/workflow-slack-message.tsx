"use client"

import type { ComponentProps, ReactNode } from "react"
import { cn } from "../lib/utils"

/**
 * Slack-style message preview card for workflow canvases.
 *
 * Renders a compact card matching Slack's message styling so workflow nodes
 * that "Send a message to Slack" can visualise what the resulting notification
 * will look like directly on the canvas.
 *
 * Composition:
 *
 * ```tsx
 * <WorkflowSlackMessage appName="Attio Automations" timestamp="10:18 AM" appAvatar={...}>
 *   <WorkflowSlackMessageTitle>🎉 New Deal: Linear</WorkflowSlackMessageTitle>
 *   <WorkflowSlackMessageBody>Linear is a B2B SaaS company with 11-50 employees...</WorkflowSlackMessageBody>
 *   <WorkflowSlackMessageActions>
 *     <Button variant="secondary" size="sm">Move to Qualified</Button>
 *   </WorkflowSlackMessageActions>
 * </WorkflowSlackMessage>
 * ```
 */

type WorkflowSlackMessageProps = ComponentProps<"div"> & {
  /** The bot/app name shown in the header */
  appName: ReactNode
  /** Small right-aligned timestamp in the header (e.g. "10:18 AM") */
  timestamp?: ReactNode
  /** Avatar rendered to the left of the header — typically an img or a coloured square with initials */
  appAvatar?: ReactNode
}

function WorkflowSlackMessage({
  appName,
  timestamp,
  appAvatar,
  className,
  children,
  ...props
}: WorkflowSlackMessageProps) {
  return (
    <div
      data-slot="workflow-slack-message"
      className={cn(
        "flex w-[320px] gap-3 rounded-xl border border-border bg-card p-3 text-sm shadow-sm",
        className,
      )}
      {...props}
    >
      {appAvatar && (
        <div
          data-slot="workflow-slack-message-avatar"
          className="size-9 shrink-0 overflow-hidden rounded-md [&>img]:size-full [&>img]:object-cover"
        >
          {appAvatar}
        </div>
      )}
      <div className="min-w-0 flex-1 border-border border-l-2 pl-3">
        <div
          data-slot="workflow-slack-message-header"
          className="flex items-baseline gap-2"
        >
          <span className="truncate font-semibold text-foreground text-sm">{appName}</span>
          {timestamp && (
            <span className="shrink-0 text-muted-foreground text-xs">{timestamp}</span>
          )}
        </div>
        <div className="mt-1 space-y-2">{children}</div>
      </div>
    </div>
  )
}

function WorkflowSlackMessageTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="workflow-slack-message-title"
      className={cn("font-bold text-foreground text-base leading-tight", className)}
      {...props}
    />
  )
}

function WorkflowSlackMessageBody({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="workflow-slack-message-body"
      className={cn("text-muted-foreground text-sm leading-snug", className)}
      {...props}
    />
  )
}

function WorkflowSlackMessageActions({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="workflow-slack-message-actions"
      className={cn("flex flex-wrap items-center gap-2 pt-1", className)}
      {...props}
    />
  )
}

export {
  WorkflowSlackMessage,
  WorkflowSlackMessageActions,
  WorkflowSlackMessageBody,
  WorkflowSlackMessageTitle,
}
export type { WorkflowSlackMessageProps }
