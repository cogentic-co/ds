"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { AlertTriangle, Check, X } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"

import { Button } from "../components/button"
import { cn } from "../lib/utils"

const confirmationVariants = cva(
  "flex w-full items-start gap-3 rounded-lg border bg-card px-3.5 py-3 text-sm",
  {
    variants: {
      status: {
        pending: "border-border",
        accepted: "border-mint-ink/40 bg-mint/40 text-mint-ink",
        rejected: "border-blush-ink/40 bg-blush/40 text-blush-ink",
      },
    },
    defaultVariants: { status: "pending" },
  },
)

type ConfirmationProps = ComponentProps<"div"> & VariantProps<typeof confirmationVariants>

function Confirmation({ status = "pending", className, children, ...props }: ConfirmationProps) {
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

type ConfirmationRequestProps = ComponentProps<"div"> & {
  icon?: ReactNode
  title: ReactNode
  description?: ReactNode
}

function ConfirmationRequest({
  icon,
  title,
  description,
  className,
  ...props
}: ConfirmationRequestProps) {
  return (
    <>
      <span
        data-slot="confirmation-icon"
        aria-hidden="true"
        className="mt-0.5 flex size-4 shrink-0 items-center justify-center text-muted-foreground [&>svg]:size-4"
      >
        {icon ?? <AlertTriangle />}
      </span>
      <div data-slot="confirmation-request" className={cn("min-w-0 flex-1", className)} {...props}>
        <div className="font-medium">{title}</div>
        {description && (
          <div className="mt-0.5 text-muted-foreground text-xs leading-relaxed">{description}</div>
        )}
      </div>
    </>
  )
}

function ConfirmationActions({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="confirmation-actions"
      className={cn("flex shrink-0 items-center gap-2", className)}
      {...props}
    />
  )
}

function ConfirmationAction({
  variant = "default",
  className,
  ...props
}: ComponentProps<"button"> & {
  variant?: "default" | "destructive" | "outline"
}) {
  return (
    <Button
      data-slot="confirmation-action"
      type="button"
      size="sm"
      variant={variant}
      className={className}
      {...props}
    />
  )
}

function ConfirmationAccepted({ className, children, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="confirmation-accepted"
      className={cn("inline-flex shrink-0 items-center gap-1.5 font-medium text-xs", className)}
      {...props}
    >
      <Check className="size-3.5" />
      {children ?? "Approved"}
    </span>
  )
}

function ConfirmationRejected({ className, children, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="confirmation-rejected"
      className={cn("inline-flex shrink-0 items-center gap-1.5 font-medium text-xs", className)}
      {...props}
    >
      <X className="size-3.5" />
      {children ?? "Rejected"}
    </span>
  )
}

export type { ConfirmationProps, ConfirmationRequestProps }
export {
  Confirmation,
  ConfirmationAccepted,
  ConfirmationAction,
  ConfirmationActions,
  ConfirmationRejected,
  ConfirmationRequest,
  confirmationVariants,
}
