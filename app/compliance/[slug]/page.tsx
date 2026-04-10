"use client"

import { CheckCircle2, XCircle } from "lucide-react"
import { use } from "react"
import { Separator } from "@/components/ui/separator"
import { componentMeta, statusConfig } from "../../_component-meta"
import { CodeHighlight } from "../../code-highlight"
import { compliancePreviews } from "./previews"

function toTitle(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

function StatusBadge({ status }: { status: keyof typeof statusConfig }) {
  const config = statusConfig[status]
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium text-xs ${config.color}`}
    >
      {config.label}
    </span>
  )
}

export default function CompliancePage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const Preview = compliancePreviews[slug]
  const meta = componentMeta[slug]

  if (!Preview) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        No preview found for &quot;{slug}&quot;
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="font-semibold text-2xl">{toTitle(slug)}</h1>
          {meta?.status && <StatusBadge status={meta.status} />}
        </div>
        {meta?.description && (
          <p className="mt-2 max-w-2xl text-muted-foreground text-sm">{meta.description}</p>
        )}
        <p className="mt-2">
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
            {meta?.importStatement ?? `@cogentic-co/ds/compliance/${slug}`}
          </code>
        </p>
      </div>

      {meta && (meta.dos || meta.donts) && (
        <>
          <Separator />
          <div id="guidelines" className="grid gap-6 sm:grid-cols-2">
            {meta.dos && (
              <div>
                <h3 className="mb-3 font-semibold text-sm">Do</h3>
                <ul className="space-y-2">
                  {meta.dos.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {meta.donts && (
              <div>
                <h3 className="mb-3 font-semibold text-sm">Don&apos;t</h3>
                <ul className="space-y-2">
                  {meta.donts.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <XCircle className="mt-0.5 size-4 shrink-0 text-red-500" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )}

      <Separator />
      <div>
        <h2 className="mb-4 font-semibold text-lg">Preview</h2>
        <div className="rounded-lg border p-6">
          <Preview />
        </div>
      </div>

      {meta?.codeExample && (
        <>
          <Separator />
          <div id="code-example">
            <h2 className="mb-4 font-semibold text-lg">Code Example</h2>
            <CodeHighlight code={meta.codeExample} language="tsx" />
          </div>
        </>
      )}
    </div>
  )
}
