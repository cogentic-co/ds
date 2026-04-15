"use client"

import type { ComponentProps, ReactNode } from "react"
import { Fragment } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/breadcrumb"
import { Tabs, TabsList, TabsTrigger } from "../components/tabs"
import { cn } from "../lib/utils"

type PageHeaderBreadcrumb = {
  label: string
  href?: string
}

type PageHeaderTab = {
  value: string
  label: ReactNode
  count?: number
}

type PageHeaderProps = ComponentProps<"div"> & {
  title: ReactNode
  description?: ReactNode
  /** Breadcrumb segments. The last one is automatically rendered as the current page. */
  breadcrumbs?: PageHeaderBreadcrumb[]
  /** Pill/badge content rendered after the title */
  titleBadge?: ReactNode
  /** Actions (buttons) rendered on the right side of the header */
  actions?: ReactNode
  /** Tab triggers rendered under the header; pair with your own Tabs/TabsContent */
  tabs?: PageHeaderTab[]
  /** Controlled active tab value */
  activeTab?: string
  /** Called when the user changes tab */
  onTabChange?: (value: string) => void
}

function PageHeader({
  title,
  description,
  breadcrumbs,
  titleBadge,
  actions,
  tabs,
  activeTab,
  onTabChange,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div
      data-slot="page-header"
      className={cn("flex flex-col gap-4 border-border border-b pb-4", className)}
      {...props}
    >
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((segment, i) => {
              const isLast = i === breadcrumbs.length - 1
              return (
                <Fragment key={`${segment.label}-${i}`}>
                  <BreadcrumbItem>
                    {isLast || !segment.href ? (
                      <BreadcrumbPage>{segment.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={segment.href}>{segment.label}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </Fragment>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h1 className="font-semibold text-2xl leading-tight">{title}</h1>
            {titleBadge}
          </div>
          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}
        </div>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>

      {tabs && tabs.length > 0 && (
        <Tabs value={activeTab} onValueChange={onTabChange}>
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
                {tab.count != null && (
                  <span className="ml-1.5 rounded bg-muted px-1 font-medium text-[10px] text-muted-foreground">
                    {tab.count}
                  </span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}
    </div>
  )
}

export { PageHeader }
export type { PageHeaderBreadcrumb, PageHeaderProps, PageHeaderTab }
