"use client"

import { Mail } from "lucide-react"
import type * as React from "react"
import { useCallback, useEffect, useState } from "react"
import { Button } from "../components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/card"
import { cn } from "../lib/utils"

type MagicLinkMessageProps = Omit<React.ComponentProps<typeof Card>, "title"> & {
  email: string
  onResend?: () => void | Promise<void>
  onBack?: () => void
  resendCooldownSeconds?: number
  logo?: React.ReactNode
  title?: string
  description?: React.ReactNode
}

function MagicLinkMessage({
  email,
  onResend,
  onBack,
  resendCooldownSeconds = 30,
  logo,
  title = "Check your email",
  description,
  className,
  ...props
}: MagicLinkMessageProps) {
  const [cooldown, setCooldown] = useState(0)
  const [resending, setResending] = useState(false)

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

  return (
    <Card data-slot="magic-link-message" className={cn("w-full max-w-md", className)} {...props}>
      <CardHeader className="text-center">
        {logo ? (
          <div className="mb-4 flex justify-center">{logo}</div>
        ) : (
          <div className="mb-4 flex justify-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Mail className="size-6" aria-hidden />
            </div>
          </div>
        )}
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>
          {description ?? (
            <>
              We sent a sign-in link to <span className="font-medium text-foreground">{email}</span>
              . Click the link in the email to continue.
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
