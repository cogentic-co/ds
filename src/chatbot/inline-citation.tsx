"use client"

import { ExternalLink } from "lucide-react"
import { type ComponentProps, useState } from "react"
import { cn } from "../lib/utils"

function InlineCitation({
  index,
  href,
  title,
  description,
  children,
  className,
  ...props
}: ComponentProps<"span"> & {
  index: number
  href: string
  title: string
  description?: string
}) {
  const [showCard, setShowCard] = useState(false)

  return (
    <span
      data-slot="inline-citation"
      className={cn("relative inline-flex items-baseline", className)}
      onMouseEnter={() => setShowCard(true)}
      onMouseLeave={() => setShowCard(false)}
      onFocus={() => setShowCard(true)}
      onBlur={() => setShowCard(false)}
      {...props}
    >
      {children}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Citation ${index}: ${title}`}
        className="ml-0.5 inline-flex size-4 items-center justify-center rounded-full bg-primary/10 align-super font-bold text-[10px] text-primary transition-colors hover:bg-primary/20"
      >
        {index}
      </a>

      {showCard && (
        <span role="tooltip" className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2">
          <InlineCitationCard href={href} title={title} description={description} />
        </span>
      )}
    </span>
  )
}

function InlineCitationCard({
  href,
  title,
  description,
  className,
  ...props
}: ComponentProps<"a"> & {
  title: string
  description?: string
}) {
  return (
    <a
      data-slot="inline-citation-card"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "block w-64 rounded-lg border border-border bg-popover p-3 shadow-md",
        "transition-colors hover:bg-muted/50",
        className,
      )}
      {...props}
    >
      <p className="truncate font-medium text-popover-foreground text-sm">{title}</p>
      {description && (
        <p className="mt-1 line-clamp-2 text-muted-foreground text-xs">{description}</p>
      )}
      <span className="mt-2 inline-flex items-center gap-1 text-primary text-xs">
        Open <ExternalLink className="size-3" />
      </span>
    </a>
  )
}

export { InlineCitation, InlineCitationCard }
