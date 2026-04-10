"use client"

import { ArrowRight, Mail } from "lucide-react"
import type * as React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "../components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/card"
import { Input } from "../components/input"
import { cn } from "../lib/utils"

type MagicLinkMessageProps = Omit<React.ComponentProps<typeof Card>, "title"> & {
  /**
   * Which state to render.
   * - "request": email input + submit button (pre-submission)
   * - "sent": confirmation message (post-submission)
   *
   * Default: "sent" (backward compatible)
   */
  state?: "request" | "sent"
  /** The email address. Required when state="sent"; pre-filled when state="request". */
  email?: string
  /** Called when the user submits their email (state="request"). */
  onSubmit?: (email: string) => void | Promise<void>
  /** Label for the submit button. Default: "Send magic link" */
  submitLabel?: string
  /** Called when the user clicks "Resend email" (state="sent"). */
  onResend?: () => void | Promise<void>
  /** Called when the user clicks "Use a different email". */
  onBack?: () => void
  resendCooldownSeconds?: number
  logo?: React.ReactNode
  title?: string
  description?: React.ReactNode
}

function MagicLinkMessage({
  state = "sent",
  email,
  onSubmit,
  submitLabel = "Send magic link",
  onResend,
  onBack,
  resendCooldownSeconds = 30,
  logo,
  title,
  description,
  className,
  ...props
}: MagicLinkMessageProps) {
  const [cooldown, setCooldown] = useState(0)
  const [resending, setResending] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [inputEmail, setInputEmail] = useState(email ?? "")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (cooldown <= 0) return
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [cooldown])

  const handleResend = useCallback(async () => {
    if (!onResend || cooldown > 0) return
    setResending(true)
    try {
      await onResend()
      setCooldown(resendCooldownSeconds)
    } finally {
      setResending(false)
    }
  }, [onResend, cooldown, resendCooldownSeconds])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!onSubmit || !inputEmail.trim()) return
      setSubmitting(true)
      try {
        await onSubmit(inputEmail.trim())
      } finally {
        setSubmitting(false)
      }
    },
    [onSubmit, inputEmail],
  )

  const resolvedTitle = title ?? (state === "request" ? "Sign in with email" : "Check your email")

  const logoElement = logo ?? (
    <div className="mb-4 flex justify-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Mail className="size-6" aria-hidden />
      </div>
    </div>
  )

  if (state === "request") {
    return (
      <Card
        data-slot="magic-link-message"
        data-state="request"
        className={cn("w-full max-w-md", className)}
        {...props}
      >
        <CardHeader className="text-center">
          {logoElement}
          <CardTitle className="text-xl">{resolvedTitle}</CardTitle>
          <CardDescription>
            {description ?? "Enter your email address and we'll send you a sign-in link."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              ref={inputRef}
              type="email"
              required
              placeholder="you@example.com"
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              autoComplete="email"
              autoFocus
            />
            <Button type="submit" className="w-full" disabled={submitting || !inputEmail.trim()}>
              {submitting ? "Sending..." : submitLabel}
              {!submitting && <ArrowRight />}
            </Button>
          </form>
        </CardContent>
        {onBack && (
          <CardFooter className="justify-center">
            <button
              type="button"
              onClick={onBack}
              className="text-muted-foreground text-sm underline-offset-4 hover:text-foreground hover:underline"
            >
              Back to sign in
            </button>
          </CardFooter>
        )}
      </Card>
    )
  }

  return (
    <Card
      data-slot="magic-link-message"
      data-state="sent"
      className={cn("w-full max-w-md", className)}
      {...props}
    >
      <CardHeader className="text-center">
        {logoElement}
        <CardTitle className="text-xl">{resolvedTitle}</CardTitle>
        <CardDescription>
          {description ?? (
            <>
              We sent a sign-in link to{" "}
              <span className="font-medium text-foreground">{email}</span>. Click the link in the
              email to continue.
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {onResend && (
          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={resending || cooldown > 0}
            onClick={handleResend}
          >
            {resending ? "Resending..." : cooldown > 0 ? `Resend in ${cooldown}s` : "Resend email"}
          </Button>
        )}
      </CardContent>
      {onBack && (
        <CardFooter className="justify-center">
          <button
            type="button"
            onClick={onBack}
            className="text-muted-foreground text-sm underline-offset-4 hover:text-foreground hover:underline"
          >
            Use a different email
          </button>
        </CardFooter>
      )}
    </Card>
  )
}

export { MagicLinkMessage }
export type { MagicLinkMessageProps }
