"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { AlertTriangle, Check, X } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"
import { cn } from "../lib/utils"

const confirmationVariants = cva("space-y-3 rounded-xl border p-4", {
  variants: {
    status: {
      pending: "border-border bg-card",
      accepted: "border-emerald-500/30 bg-emerald-500/5",
      rejected: "border-red-500/30 bg-red-500/5",
    },
  },
  defaultVariants: { status: "pending" },
})

function Confirmation({
  status = "pending",
  className,
  children,
  ...props
}: ComponentProps<"div"> & VariantProps<typeof confirmationVariants>) {
  return (
    <div
      data-slot="confirmation"
      data-status={status}
      role="alert"
      className={cn(confirmationVariants({ status }), className)}
      {...props}
    >
      {children}
    </div>
  )
}

function ConfirmationRequest({
  icon,
  title,
  description,
  className,
  ...props
}: ComponentProps<"div"> & {
  icon?: ReactNode
  title: string
  description?: string
}) {
  return (
    <div
      data-slot="confirmation-request"
      className={cn("flex items-start gap-3", className)}
      {...props}
    >
      {icon ?? (
        <AlertTriangle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-amber-500" />
      )}
      <div className="min-w-0">
        <p className="font-medium text-foreground text-sm">{title}</p>
        {description && <p className="mt-0.5 text-muted-foreground text-xs">{description}</p>}
      </div>
    </div>
  )
}

function ConfirmationAccepted({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="confirmation-accepted"
      className={cn(
        "flex items-center gap-2 text-emerald-600 text-sm dark:text-emerald-400",
        className,
      )}
      {...props}
    >
      <Check className="size-4 shrink-0" />
      {children ?? "Approved"}
    </div>
  )
}

function ConfirmationRejected({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="confirmation-rejected"
      className={cn("flex items-center gap-2 text-red-600 text-sm dark:text-red-400", className)}
      {...props}
    >
      <X className="size-4 shrink-0" />
      {children ?? "Rejected"}
    </div>
  )
}

function ConfirmationActions({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="confirmation-actions"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

function ConfirmationAction({
  variant = "default",
  className,
  ...props
}: ComponentProps<"button"> & {
  variant?: "default" | "destructive"
}) {
  return (
    <button
      data-slot="confirmation-action"
      type="button"
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-3 py-1.5 font-medium text-sm transition-colors",
        variant === "destructive"
          ? "bg-red-500/10 text-red-600 hover:bg-red-500/20 dark:text-red-400"
          : "bg-primary text-primary-foreground hover:bg-primary/90",
        className,
      )}
      {...props}
    />
  )
}

export {
  Confirmation,
  ConfirmationAccepted,
  ConfirmationAction,
  ConfirmationActions,
  ConfirmationRejected,
  ConfirmationRequest,
  confirmationVariants,
}
