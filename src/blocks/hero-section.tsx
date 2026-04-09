import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"
import { cn } from "../lib/utils"

const heroVariants = cva("relative overflow-hidden", {
  variants: {
    variant: {
      default: "py-16 md:py-24 lg:py-32",
      centered: "py-20 text-center md:py-32 lg:py-40",
      split: "py-16 md:py-24",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
      full: "flex min-h-screen items-center",
    },
  },
  defaultVariants: { variant: "centered", size: "md" },
})

type HeroSectionProps = React.ComponentProps<"section"> &
  VariantProps<typeof heroVariants> & {
    title: React.ReactNode
    subtitle?: React.ReactNode
    actions?: React.ReactNode
    media?: React.ReactNode
    badge?: React.ReactNode
  }

function HeroSection({
  title,
  subtitle,
  actions,
  media,
  badge,
  variant = "centered",
  size,
  className,
  ...props
}: HeroSectionProps) {
  return (
    <section
      data-slot="hero-section"
      className={cn(heroVariants({ variant, size }), className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-4">
        {variant === "split" ? (
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              {badge && <div className="mb-4">{badge}</div>}
              <h1 className="font-bold text-4xl tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
              {subtitle && (
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{subtitle}</p>
              )}
              {actions && <div className="mt-8 flex flex-wrap gap-4">{actions}</div>}
            </div>
            {media && <div>{media}</div>}
          </div>
        ) : (
          <div className={cn("mx-auto", variant === "centered" && "max-w-3xl")}>
            {badge && <div className="mb-4 flex justify-center">{badge}</div>}
            <h1 className="font-bold text-4xl tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
            {subtitle && (
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{subtitle}</p>
            )}
            {actions && (
              <div
                className={cn(
                  "mt-8 flex flex-wrap gap-4",
                  variant === "centered" && "justify-center",
                )}
              >
                {actions}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export { HeroSection, heroVariants }
export type { HeroSectionProps }
