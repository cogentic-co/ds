"use client"

import { use } from "react"
import { compliancePreviews } from "./previews"

function toTitle(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

export default function CompliancePage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const Preview = compliancePreviews[slug]

  if (!Preview) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        No preview found for "{slug}"
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-semibold text-2xl">{toTitle(slug)}</h1>
        <p className="mt-1 text-muted-foreground text-sm">
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
            @cogentic-co/ds/compliance/{slug}
          </code>
        </p>
      </div>
      <div className="rounded-lg border p-6">
        <Preview />
      </div>
    </div>
  )
}
