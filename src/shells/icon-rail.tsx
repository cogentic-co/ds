"use client"

import type * as React from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "../components/tooltip"
import { cn } from "../lib/utils"

type IconRailItem = {
  id: string
  icon: React.ReactNode
  label: string
  href?: string
}

type IconRailProps = {
  items: IconRailItem[]
  activeId?: string
  onSelect?: (id: string) => void
  header?: React.ReactNode
  footer?: React.ReactNode
  linkComponent?: React.ElementType
  className?: string
}

function IconRail({
  items,
  activeId,
  onSelect,
  header,
  footer,
  linkComponent: LinkComp = "a",
  className,
}: IconRailProps) {
  return (
    <aside
      data-slot="icon-rail"
      className={cn(
        "z-20 my-2 ml-2 flex h-[calc(100svh-1rem)] w-14 shrink-0 flex-col items-center rounded-l-xl border-border border-y border-l bg-card py-3 shadow-sm transition-[border-radius,border,margin] duration-200",
        "group-has-[[data-state=collapsed]]/shell:mr-2 group-has-[[data-state=collapsed]]/shell:rounded-xl group-has-[[data-state=collapsed]]/shell:border-r",
        className,
      )}
    >
      {header && <div className="mb-3 flex flex-col items-center">{header}</div>}
      <nav className="flex flex-1 flex-col items-center gap-1">
        {items.map((item) => {
          const isActive = activeId === item.id
          const content = (
            <>
              <span className="sr-only">{item.label}</span>
              <span aria-hidden className="flex size-5 items-center justify-center">
                {item.icon}
              </span>
            </>
          )
          const baseClasses = cn(
            "flex size-9 items-center justify-center rounded-md transition-colors outline-none",
            "focus-visible:ring-2 focus-visible:ring-focal/30",
            isActive
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
          )

          const inner = item.href ? (
            <LinkComp
              href={item.href}
              className={baseClasses}
              aria-label={item.label}
              data-active={isActive || undefined}
              onClick={() => onSelect?.(item.id)}
            >
              {content}
            </LinkComp>
          ) : (
            <button
              type="button"
              className={baseClasses}
              aria-label={item.label}
              data-active={isActive || undefined}
              onClick={() => onSelect?.(item.id)}
            >
              {content}
            </button>
          )

          return (
            <Tooltip key={item.id}>
              <TooltipTrigger render={inner} />
              <TooltipContent side="right" sideOffset={8}>
                {item.label}
              </TooltipContent>
            </Tooltip>
          )
        })}
      </nav>
      {footer && <div className="mt-3 flex flex-col items-center gap-1">{footer}</div>}
    </aside>
  )
}

export { IconRail }
export type { IconRailItem, IconRailProps }
