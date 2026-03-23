import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"
import { cn } from "../lib/utils"

function AuditLog({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="audit-log"
      role="log"
      className={cn("space-y-0 divide-y divide-border", className)}
      {...props}
    />
  )
}

const auditLogEntryVariants = cva(
  "flex items-start gap-3 px-4 py-3 text-sm transition-colors hover:bg-muted/50",
  {
    variants: {
      action: {
        create: "",
        update: "",
        delete: "",
        approve: "",
        reject: "",
        login: "",
        export: "",
        default: "",
      },
    },
    defaultVariants: {
      action: "default",
    },
  },
)

type AuditLogEntryProps = React.ComponentProps<"div"> & VariantProps<typeof auditLogEntryVariants>

function AuditLogEntry({ action, className, ...props }: AuditLogEntryProps) {
  return (
    <div
      data-slot="audit-log-entry"
      data-action={action ?? "default"}
      className={cn(auditLogEntryVariants({ action }), className)}
      {...props}
    />
  )
}

function AuditLogIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="audit-log-icon"
      className={cn(
        "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted",
        className,
      )}
      {...props}
    />
  )
}

function AuditLogContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="audit-log-content" className={cn("min-w-0 flex-1", className)} {...props} />
  )
}

function AuditLogMessage({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="audit-log-message" className={cn("text-sm", className)} {...props} />
}

function AuditLogMeta({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="audit-log-meta"
      className={cn("flex items-center gap-2 text-muted-foreground text-xs", className)}
      {...props}
    />
  )
}

function AuditLogTime({ className, ...props }: React.ComponentProps<"time">) {
  return (
    <time
      data-slot="audit-log-time"
      className={cn("shrink-0 text-muted-foreground text-xs", className)}
      {...props}
    />
  )
}

function AuditLogDetail({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="audit-log-detail"
      className={cn(
        "mt-1.5 rounded-md border bg-muted/30 px-3 py-2 text-muted-foreground text-xs",
        className,
      )}
      {...props}
    />
  )
}

export {
  AuditLog,
  AuditLogEntry,
  AuditLogIcon,
  AuditLogContent,
  AuditLogMessage,
  AuditLogMeta,
  AuditLogTime,
  AuditLogDetail,
  auditLogEntryVariants,
}
export type { AuditLogEntryProps }
