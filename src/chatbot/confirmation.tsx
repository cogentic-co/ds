"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { AlertTriangle, Check, X } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"
import { Alert, AlertDescription, AlertTitle } from "../components/alert"
import { Button } from "../components/button"
import { cn } from "../lib/utils"

const confirmationStatusVariant = {
  pending: "default",
  accepted: "success",
  rejected: "destructive",
} as const

const confirmationVariants = cva("space-y-3", {
  variants: {
    status: {
      pending: "",
      accepted: "",
      rejected: "",
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
  const variant = confirmationStatusVariant[status ?? "pending"]
  return (
    <Alert
      data-slot="confirmation"
      data-status={status}
      variant={variant}
      className={cn(confirmationVariants({ status }), className)}
      {...props}
    >
      {children}
    </Alert>
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
    <div data-slot="confirmation-request" className={cn("contents", className)} {...props}>
      {icon ?? <AlertTriangle aria-hidden="true" />}
      <AlertTitle>{title}</AlertTitle>
      {description && <AlertDescription>{description}</AlertDescription>}
    </div>
  )
}

function ConfirmationAccepted({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="confirmation-accepted"
      className={cn("flex items-center gap-2 text-sm", className)}
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
      className={cn("flex items-center gap-2 text-sm", className)}
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
      className={cn("flex items-center gap-2 pt-1", className)}
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
    <Button
      data-slot="confirmation-action"
      type="button"
      size="sm"
      variant={variant === "destructive" ? "destructive" : "default"}
      className={className}
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
