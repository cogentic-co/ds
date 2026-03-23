"use client"

import { ArrowUpIcon, CheckIcon, XIcon } from "lucide-react"
import { useState } from "react"

import { cn } from "../lib/utils"
import { Button } from "./button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"
import { Textarea } from "./textarea"

type ApprovalAction = "approve" | "reject" | "escalate"

type ApprovalActionsProps = {
  onApprove?: (reason?: string) => void
  onReject?: (reason?: string) => void
  onEscalate?: (reason?: string) => void
  requireReason?: boolean
  disabled?: boolean
  className?: string
}

const actionConfig: Record<
  ApprovalAction,
  {
    label: string
    icon: typeof CheckIcon
    dialogTitle: string
    dialogDescription: string
    confirmLabel: string
    triggerClassName: string
    confirmClassName: string
    dialogClassName: string
  }
> = {
  approve: {
    label: "Approve",
    icon: CheckIcon,
    dialogTitle: "Confirm Approval",
    dialogDescription: "Are you sure you want to approve this item?",
    confirmLabel: "Approve",
    triggerClassName:
      "bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500",
    confirmClassName:
      "bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500",
    dialogClassName: "border-emerald-500",
  },
  reject: {
    label: "Reject",
    icon: XIcon,
    dialogTitle: "Confirm Rejection",
    dialogDescription:
      "Are you sure you want to reject this item? This action may require a reason.",
    confirmLabel: "Reject",
    triggerClassName:
      "border border-destructive text-destructive bg-transparent hover:bg-destructive/10 dark:hover:bg-destructive/20",
    confirmClassName: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    dialogClassName: "border-destructive",
  },
  escalate: {
    label: "Escalate",
    icon: ArrowUpIcon,
    dialogTitle: "Confirm Escalation",
    dialogDescription: "This will escalate the item to a senior reviewer.",
    confirmLabel: "Escalate",
    triggerClassName:
      "border border-amber-500 text-amber-600 bg-transparent hover:bg-amber-500/10 dark:text-amber-400 dark:hover:bg-amber-500/20",
    confirmClassName:
      "bg-amber-500 text-white hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-500",
    dialogClassName: "border-amber-500",
  },
}

function ApprovalDialog({
  action,
  requireReason,
  onConfirm,
  disabled,
}: {
  action: ApprovalAction
  requireReason: boolean
  onConfirm: (reason?: string) => void
  disabled?: boolean
}) {
  const [reason, setReason] = useState("")
  const [open, setOpen] = useState(false)
  const config = actionConfig[action]
  const Icon = config.icon

  function handleConfirm() {
    onConfirm(reason || undefined)
    setReason("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger disabled={disabled} render={<Button className={config.triggerClassName} />}>
        <Icon className="size-4" />
        {config.label}
      </DialogTrigger>
      <DialogContent className={config.dialogClassName}>
        <DialogHeader>
          <DialogTitle>{config.dialogTitle}</DialogTitle>
          <DialogDescription>{config.dialogDescription}</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Textarea
            placeholder={requireReason ? "Reason (required)" : "Reason (optional)"}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <Button
            className={config.confirmClassName}
            onClick={handleConfirm}
            disabled={requireReason && !reason.trim()}
          >
            {config.confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function ApprovalButton({
  action,
  requireReason = false,
  onAction,
  disabled,
}: {
  action: ApprovalAction
  requireReason?: boolean
  onAction?: (reason?: string) => void
  disabled?: boolean
}) {
  const config = actionConfig[action]
  const Icon = config.icon

  if (!onAction) {
    return (
      <Button className={config.triggerClassName} disabled>
        <Icon className="size-4" />
        {config.label}
      </Button>
    )
  }

  // No dialog needed when reason isn't required — fire directly
  if (!requireReason) {
    return (
      <Button className={config.triggerClassName} disabled={disabled} onClick={() => onAction()}>
        <Icon className="size-4" />
        {config.label}
      </Button>
    )
  }

  return (
    <ApprovalDialog
      action={action}
      requireReason={requireReason}
      onConfirm={onAction}
      disabled={disabled}
    />
  )
}

function ApprovalActions({
  onApprove,
  onReject,
  onEscalate,
  requireReason = false,
  disabled,
  className,
}: ApprovalActionsProps) {
  return (
    <div data-slot="approval-actions" className={cn("flex items-center gap-2", className)}>
      <ApprovalButton
        action="approve"
        requireReason={requireReason}
        onAction={onApprove}
        disabled={disabled}
      />
      <ApprovalButton
        action="reject"
        requireReason={requireReason}
        onAction={onReject}
        disabled={disabled}
      />
      <ApprovalButton
        action="escalate"
        requireReason={requireReason}
        onAction={onEscalate}
        disabled={disabled}
      />
    </div>
  )
}

export { ApprovalActions, ApprovalButton, ApprovalDialog }
export type { ApprovalAction, ApprovalActionsProps }
