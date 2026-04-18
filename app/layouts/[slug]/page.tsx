"use client"

import { use } from "react"
import { Separator } from "@/components/ui/separator"
import { PropsTable } from "../../props-table"
import { layoutPreviews } from "./previews"

function toTitle(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

export default function LayoutPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const Preview = layoutPreviews[slug]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-bold text-2xl tracking-tight">{toTitle(slug)}</h1>
      </div>

      {Preview ? (
        <div>
          <h2 className="mb-4 font-medium text-muted-foreground text-sm">Preview</h2>
          <Preview />
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground text-sm">
          No preview available yet for this layout.
        </div>
      )}

      <Separator />

      <div>
        <h2 className="mb-4 font-medium text-muted-foreground text-sm">Props</h2>
        <PropsTable slug={slug} />
      </div>
    </div>
  )
}
