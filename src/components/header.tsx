import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps, ReactNode } from "react"
import { Fragment } from "react"

import { cn } from "../lib/utils"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb"
import { Tabs, TabsList, TabsTrigger } from "./tabs"

/**
 * @figma Header
 * @figmaNode 450:2
 * @figmaUrl https://figma.com/design/1FH1KCGLeK5GR222JUS2Iu?node-id=450-2
 *
 * Unified page/section header. Replaces the old `EntityHeader` (compliance
 * entities, settings) and `TransactionHeader` (transaction detail) — both
 * of which are now thin wrappers that compose `Header`.
 *
 * Slots: breadcrumb, leadingIcon, title (any ReactNode — string or rich JSX
 * like a mono amount), subtitle, badges (cluster of <Badge>s), description,
 * meta (dotted item row), author (assignee/owner avatar), actions, children.
 */

interface HeaderMeta {
  icon?: ReactNode
  text: string
  href?: string
  external?: boolean
}

interface HeaderAuthor {
  name: string
  role?: string
  avatarSrc?: string
}

interface HeaderBreadcrumb {
  label: string
  href?: string
}

interface HeaderTab {
  value: string
  label: ReactNode
  count?: number
}

const headerVariants = cva("flex flex-col", {
  variants: {
    size: {
      sm: "gap-3",
      default: "gap-4",
      lg: "gap-5",
    },
    bordered: {
      true: "border-border border-b bg-card px-6 pt-5 pb-4",
      false: "",
    },
  },
  defaultVariants: { size: "default", bordered: false },
})

const titleVariants = cva("font-semibold leading-tight tracking-tight", {
  variants: {
    size: {
      sm: "text-xl",
      default: "text-2xl md:text-3xl",
      lg: "text-3xl md:text-4xl",
    },
  },
  defaultVariants: { size: "default" },
})

const leadingIconVariants = cva(
  "flex shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground",
  {
    variants: {
      size: {
        sm: "size-8 text-base",
        default: "size-12 text-lg",
        lg: "size-16 text-2xl",
      },
    },
    defaultVariants: { size: "default" },
  },
)

type HeaderProps = Omit<ComponentProps<"div">, "title"> &
  VariantProps<typeof headerVariants> & {
    /** Custom breadcrumb slot. Takes precedence over `breadcrumbs`. */
    breadcrumb?: ReactNode
    /** Typed breadcrumb segments — last segment is rendered as the current page. */
    breadcrumbs?: HeaderBreadcrumb[]
    leadingIcon?: ReactNode
    title: ReactNode
    subtitle?: ReactNode
    badges?: ReactNode
    description?: ReactNode
    meta?: HeaderMeta[]
    author?: HeaderAuthor
    actions?: ReactNode
    /** Tab triggers rendered under the header. Pair with your own TabsContent. */
    tabs?: HeaderTab[]
    activeTab?: string
    onTabChange?: (value: string) => void
  }

function Header({
  breadcrumb,
  breadcrumbs,
  leadingIcon,
  title,
  subtitle,
  badges,
  description,
  meta,
  author,
  actions,
  tabs,
  activeTab,
  onTabChange,
  size,
  bordered,
  className,
  children,
  ...props
}: HeaderProps) {
  const renderedBreadcrumb =
    breadcrumb ??
    (breadcrumbs && breadcrumbs.length > 0 ? (
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
    ) : null)

  return (
    <div
      data-slot="header"
      className={cn(headerVariants({ size, bordered }), className)}
      {...props}
    >
      {renderedBreadcrumb && <div data-slot="header-breadcrumb">{renderedBreadcrumb}</div>}

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex min-w-0 flex-1 items-start gap-4">
          {leadingIcon && (
            <div data-slot="header-leading-icon" className={leadingIconVariants({ size })}>
              {leadingIcon}
            </div>
          )}

          <div className="flex min-w-0 flex-col gap-y-1.5 pt-0.5">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h1 data-slot="header-title" className={titleVariants({ size })}>
                {title}
              </h1>
              {badges && (
                <div data-slot="header-badges" className="flex flex-wrap items-center gap-1.5">
                  {badges}
                </div>
              )}
            </div>

            {subtitle && (
              <p data-slot="header-subtitle" className="text-muted-foreground text-sm">
                {subtitle}
              </p>
            )}

            {meta && meta.length > 0 && (
              <div
                data-slot="header-meta"
                className="mt-0.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground text-xs"
              >
                {meta.map((item) =>
                  item.href ? (
                    <a
                      key={item.text}
                      href={item.href}
                      className="flex items-center gap-1.5 transition-colors hover:text-foreground"
                      {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                    >
                      {item.icon && <span className="text-base leading-none">{item.icon}</span>}
                      {item.text}
                    </a>
                  ) : (
                    <span key={item.text} className="flex items-center gap-1.5">
                      {item.icon && <span className="text-base leading-none">{item.icon}</span>}
                      {item.text}
                    </span>
                  ),
                )}
              </div>
            )}
          </div>
        </div>

        {(actions || author) && (
          <div data-slot="header-aside" className="flex shrink-0 items-center gap-3">
            {author && (
              <div data-slot="header-author" className="flex items-center gap-2">
                {author.avatarSrc ? (
                  <img
                    src={author.avatarSrc}
                    alt={author.name}
                    className="size-8 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary text-xs">
                    {author.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="font-medium text-sm leading-tight">{author.name}</p>
                  {author.role && (
                    <p className="text-muted-foreground text-xs leading-tight">{author.role}</p>
                  )}
                </div>
              </div>
            )}
            {actions && (
              <div data-slot="header-actions" className="flex items-center gap-2">
                {actions}
              </div>
            )}
          </div>
        )}
      </div>

      {description && (
        <p
          data-slot="header-description"
          className="max-w-3xl text-base text-muted-foreground md:text-lg"
        >
          {description}
        </p>
      )}

      {tabs && tabs.length > 0 && (
        <Tabs value={activeTab} onValueChange={onTabChange}>
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
                {tab.count != null && (
                  <span className="ml-1.5 rounded bg-muted px-1 font-medium text-2xs text-muted-foreground">
                    {tab.count}
                  </span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      {children}
    </div>
  )
}

export type { HeaderAuthor, HeaderBreadcrumb, HeaderMeta, HeaderProps, HeaderTab }
export { Header, headerVariants }
