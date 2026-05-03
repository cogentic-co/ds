"use client"

import type { ComponentProps, ReactNode } from "react"
import { cn } from "../lib/utils"

type SettingsLayoutItem = {
  label: string
  href: string
  icon?: ReactNode
  isActive?: boolean
}

type SettingsLayoutGroup = {
  title?: string
  items: SettingsLayoutItem[]
}

type SettingsLayoutProps = ComponentProps<"div"> & {
  /** Navigation groups rendered in the left rail */
  nav: SettingsLayoutGroup[]
  /** Page content (the settings form / sections) */
  children: ReactNode
  /** Component to use for links (e.g. Next.js Link). Default: `"a"`. */
  linkComponent?: React.ElementType
  /** Max width of the content column. Default: "max-w-3xl" */
  contentMaxWidth?: string
}

function SettingsLayout({
  nav,
  children,
  linkComponent: Link = "a",
  contentMaxWidth = "max-w-3xl",
  className,
  ...props
}: SettingsLayoutProps) {
  return (
    <div
      data-slot="settings-layout"
      className={cn("flex flex-col gap-8 md:flex-row md:gap-10", className)}
      {...props}
    >
      <aside className="shrink-0 md:w-56">
        <nav className="flex flex-col gap-6 md:sticky md:top-6">
          {nav.map((group, gi) => (
            <div key={group.title ?? `group-${gi}`} className="flex flex-col gap-1">
              {group.title && (
                <span className="px-2 font-medium text-muted-foreground text-xxs uppercase tracking-wide">
                  {group.title}
                </span>
              )}
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={item.isActive || undefined}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                    "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                    "data-active:bg-muted data-active:font-medium data-active:text-foreground",
                  )}
                >
                  {item.icon && (
                    <span className="inline-flex size-4 items-center justify-center [&>svg]:size-4">
                      {item.icon}
                    </span>
                  )}
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </aside>
      <main className={cn("flex min-w-0 flex-1 flex-col gap-8", contentMaxWidth)}>{children}</main>
    </div>
  )
}

export type { SettingsLayoutGroup, SettingsLayoutItem, SettingsLayoutProps }
export { SettingsLayout }
