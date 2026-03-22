"use client"

import { CheckIcon, ClipboardIcon } from "lucide-react"
import type * as React from "react"
import { useCallback, useState } from "react"
import { cn } from "../lib/utils"
import { Button } from "./button"

type CopyButtonProps = Omit<React.ComponentProps<typeof Button>, "onClick"> & {
  /** Text to copy to clipboard */
  value: string
  /** How long "Copied!" stays visible (ms). Default 2000 */
  timeout?: number
}

function CopyButton({ value, timeout = 2000, className, children, ...props }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), timeout)
  }, [value, timeout])

  return (
    <Button
      data-slot="copy-button"
      variant="ghost"
      size="icon"
      className={cn("size-8", className)}
      onClick={handleCopy}
      {...props}
    >
      {copied ? <CheckIcon className="size-3.5" /> : <ClipboardIcon className="size-3.5" />}
      {children}
    </Button>
  )
}

export { CopyButton }
export type { CopyButtonProps }
