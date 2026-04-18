"use client"

import Link from "next/link"
import { Button } from "../components/button"
import { cn } from "../lib/utils"

type CtaLink = {
  label: string
  href: string
}

interface PageCtaProps {
  headline?: string
  subheadline?: string
  primaryCta?: CtaLink
  secondaryCta?: CtaLink
  children?: React.ReactNode
  className?: string
}

function PageCta({
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  children,
  className,
}: PageCtaProps) {
  return (
    <section
      data-slot="page-cta"
      className={cn("relative overflow-hidden bg-primary px-6", className)}
    >
      {/* Dotted pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] bg-[size:16px_16px] text-primary-foreground opacity-30" />

      {/* Centered gradient behind text */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-full w-[500px] -translate-x-1/2 bg-radial from-primary to-primary/10" />

      <div className="container relative px-0 py-16 text-center sm:py-20 md:px-6 md:py-28">
        {headline && (
          <h2 className="mx-auto max-w-5xl text-balance font-medium text-4xl text-primary-foreground leading-tight sm:text-5xl md:text-6xl">
            {headline}
          </h2>
        )}

        {subheadline && (
          <p className="mx-auto mt-4 max-w-2xl font-normal text-base text-primary-foreground/80 sm:text-lg">
            {subheadline}
          </p>
        )}

        {children}

        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row">
            {primaryCta && (
              <Button
                className="bg-background text-foreground hover:bg-foreground hover:text-background"
                render={<Link href={primaryCta.href} />}
              >
                {primaryCta.label}
              </Button>
            )}

            {secondaryCta && (
              <Button
                variant="ghost"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground"
                render={<Link href={secondaryCta.href} />}
              >
                {secondaryCta.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export type { CtaLink, PageCtaProps }
export { PageCta }
