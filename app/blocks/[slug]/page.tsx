"use client"

import { use } from "react"
import { Separator } from "@/components/ui/separator"
import { PropsTable } from "../../props-table"
import { blockPreviews } from "./previews"

function toTitle(slug: string) {
  return slug
    .replace(/^animation-/, "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

export default function BlockPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const Preview = blockPreviews[slug]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-bold text-2xl tracking-tight">{toTitle(slug)}</h1>
      </div>

      {Preview ? (
        <div>
          <h2 className="mb-4 font-medium text-muted-foreground text-sm">Preview</h2>
          <div className="rounded-lg border p-6">
            <Preview />
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground text-sm">
          No preview available yet for this block.
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
