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

export default function CompliancePage({ params }: { params: Promise<{ slug: string }> }) {
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
          <h2 className="font-semibold text-lg">Usage Guidelines</h2>
          <div id="guidelines" className="grid gap-6 sm:grid-cols-2">
            {meta.dos && (
              <div className="rounded-lg border border-emerald-700/30 bg-emerald-700/5 p-5 dark:border-emerald-400/30 dark:bg-emerald-400/5">
                <div className="mb-4 flex items-center gap-2 font-semibold text-emerald-700 text-sm dark:text-emerald-400">
                  <CheckCircle2 className="size-4" />
                  Do
                </div>
                <ul className="space-y-2.5">
                  {meta.dos.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <span className="mt-1 text-emerald-700 dark:text-emerald-400">+</span>
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {meta.donts && (
              <div className="rounded-lg border border-red-700/30 bg-red-700/5 p-5 dark:border-red-400/30 dark:bg-red-400/5">
                <div className="mb-4 flex items-center gap-2 font-semibold text-red-700 text-sm dark:text-red-400">
                  <XCircle className="size-4" />
                  Don&apos;t
                </div>
                <ul className="space-y-2.5">
                  {meta.donts.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <span className="mt-1 text-red-700 dark:text-red-400">&ndash;</span>
                      <span className="text-foreground">{item}</span>
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
            <CodeHighlight code={meta.codeExample} lang="tsx" />
          </div>
        </>
      )}
    </div>
  )
}
