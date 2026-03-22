import type * as React from "react"
import { cn } from "../lib/utils"

type Feature = {
  icon?: React.ReactNode
  title: string
  description: string
}

type FeatureSectionProps = React.ComponentProps<"section"> & {
  title: string
  subtitle?: string
  features: Feature[]
  columns?: 2 | 3 | 4
}

const colsMap = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
}

function FeatureSection({
  title,
  subtitle,
  features,
  columns = 3,
  className,
  ...props
}: FeatureSectionProps) {
  return (
    <section data-slot="feature-section" className={cn("py-16 md:py-24", className)} {...props}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-bold text-3xl tracking-tight sm:text-4xl">{title}</h2>
          {subtitle && <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>}
        </div>
        <div className={cn("mt-12 grid gap-8", colsMap[columns])}>
          {features.map((feature) => (
            <div key={feature.title} className="relative">
              {feature.icon && (
                <div className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary [&>svg]:size-5">
                  {feature.icon}
                </div>
              )}
              <h3 className="font-semibold text-lg">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { FeatureSection }
export type { FeatureSectionProps, Feature }
