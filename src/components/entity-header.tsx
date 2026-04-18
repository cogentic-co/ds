import { cva, type VariantProps } from "class-variance-authority"
import type { ReactNode } from "react"

import { cn } from "../lib/utils"

/* ── Meta item type ── */

interface EntityHeaderMeta {
  icon?: ReactNode
  text: string
  href?: string
  external?: boolean
}

/* ── Variants ── */

const headerVariants = cva("flex flex-col gap-4", {
  variants: {
    size: {
      sm: "",
      default: "",
      lg: "",
    },
  },
  defaultVariants: { size: "default" },
})

const avatarVariants = cva("shrink-0 rounded-lg object-contain", {
  variants: {
    size: {
      sm: "size-8",
      default: "size-12",
      lg: "size-16",
    },
  },
  defaultVariants: { size: "default" },
})

const fallbackVariants = cva(
  "flex shrink-0 items-center justify-center rounded-lg bg-muted font-medium text-muted-foreground",
  {
    variants: {
      size: {
        sm: "size-8 text-sm",
        default: "size-12 text-lg",
        lg: "size-16 text-2xl",
      },
    },
    defaultVariants: { size: "default" },
  },
)

const nameVariants = cva("font-medium leading-none tracking-tight", {
  variants: {
    size: {
      sm: "text-xl",
      default: "text-2xl md:text-3xl",
      lg: "text-3xl md:text-4xl",
    },
  },
  defaultVariants: { size: "default" },
})

/* ── Props ── */

type EntityHeaderProps = React.ComponentProps<"div"> &
  VariantProps<typeof headerVariants> & {
    name: string
    subtitle?: string
    logoUrl?: string | null
    emoji?: ReactNode
    description?: string
    meta?: EntityHeaderMeta[]
    rightCol?: ReactNode
  }

/* ── Component ── */

function EntityHeader({
  name,
  subtitle,
  logoUrl,
  emoji,
  description,
  meta,
  rightCol,
  children,
  size,
  className,
  ...props
}: EntityHeaderProps) {
  return (
    <div data-slot="entity-header" className={cn(headerVariants({ size }), className)} {...props}>
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        {/* Left: avatar + name + meta */}
        <div className="flex min-w-0 flex-1 items-start gap-4">
          {/* Avatar */}
          {emoji ? (
            <div
              data-slot="entity-header-avatar"
              className={cn(fallbackVariants({ size }), "border border-border bg-transparent")}
            >
              {emoji}
            </div>
          ) : logoUrl ? (
            <img
              src={logoUrl}
              alt={`${name} logo`}
              data-slot="entity-header-avatar"
              className={avatarVariants({ size })}
            />
          ) : (
            <div data-slot="entity-header-avatar" className={fallbackVariants({ size })}>
              {name.charAt(0)}
            </div>
          )}

          <div className="flex min-w-0 flex-col gap-y-1.5 pt-1">
            <h1 data-slot="entity-header-name" className={nameVariants({ size })}>
              {name}
            </h1>

            {subtitle && (
              <p data-slot="entity-header-subtitle" className="text-muted-foreground text-sm">
                {subtitle}
              </p>
            )}

            {meta && meta.length > 0 && (
              <div
                data-slot="entity-header-meta"
                className="mt-0.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground text-xs"
              >
                {meta.map((item) => {
                  if (item.href) {
                    return (
                      <a
                        key={item.text}
                        href={item.href}
                        className="flex items-center gap-1.5 transition-colors hover:text-foreground"
                        {...(item.external && {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        })}
                      >
                        {item.icon && <span className="text-base leading-none">{item.icon}</span>}
                        {item.text}
                      </a>
                    )
                  }

                  return (
                    <span key={item.text} className="flex items-center gap-1.5">
                      {item.icon && <span className="text-base leading-none">{item.icon}</span>}
                      {item.text}
                    </span>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
        {rightCol && <div className="w-full shrink-0 md:w-auto">{rightCol}</div>}
      </div>

      {/* Description */}
      {description && (
        <p
          data-slot="entity-header-description"
          className="max-w-3xl text-base text-muted-foreground md:text-lg"
        >
          {description}
        </p>
      )}

      {/* Children */}
      {children}
    </div>
  )
}

export type { EntityHeaderMeta, EntityHeaderProps }
export { EntityHeader, headerVariants as entityHeaderVariants }
