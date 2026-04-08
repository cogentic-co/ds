"use client"

import { CheckCircle2, CheckIcon, ClipboardIcon, XCircle } from "lucide-react"
import { use, useState } from "react"
import { Separator } from "@/components/ui/separator"
import { componentMeta, statusConfig } from "../../_component-meta"
import { CodeHighlight } from "../../code-highlight"
import { PropsTable } from "../../props-table"
import { TableOfContents, type TocSection } from "../../table-of-contents"
import { blockPreviews } from "./previews"

function toTitle(slug: string) {
  return slug
    .replace(/^animation-/, "")
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

function CopyImportButton({ importStatement }: { importStatement: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(importStatement)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-md border border-border/50 bg-muted/50 px-2.5 py-1 text-muted-foreground text-xs transition-colors hover:text-foreground"
    >
      {copied ? <CheckIcon className="size-3.5" /> : <ClipboardIcon className="size-3.5" />}
      {copied ? "Copied!" : "Copy Import"}
    </button>
  )
}

function Guidelines({ dos, donts }: { dos?: string[]; donts?: string[] }) {
  if (!dos?.length && !donts?.length) return null

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {dos && dos.length > 0 && (
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
          <h3 className="mb-3 flex items-center gap-2 font-medium text-emerald-700 text-sm dark:text-emerald-400">
            <CheckCircle2 className="size-4" />
            Do
          </h3>
          <ul className="space-y-2">
            {dos.map((item) => (
              <li key={item} className="flex gap-2 text-muted-foreground text-sm">
                <span className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-500">+</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
      {donts && donts.length > 0 && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
          <h3 className="mb-3 flex items-center gap-2 font-medium text-red-700 text-sm dark:text-red-400">
            <XCircle className="size-4" />
            Don't
          </h3>
          <ul className="space-y-2">
            {donts.map((item) => (
              <li key={item} className="flex gap-2 text-muted-foreground text-sm">
                <span className="mt-0.5 shrink-0 text-red-600 dark:text-red-500">&minus;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default function BlockPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const Preview = blockPreviews[slug]
  const meta = componentMeta[slug]

  const hasGuidelines = meta && (meta.dos || meta.donts)
  const hasCode = !!meta?.codeExample

  const tocSections: TocSection[] = [
    ...(hasGuidelines ? [{ id: "guidelines", label: "Guidelines" }] : []),
    { id: "preview", label: "Preview" },
    ...(hasCode ? [{ id: "code-example", label: "Code Example" }] : []),
    { id: "props", label: "Props" },
  ]

  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_180px]">
      <div className="min-w-0 space-y-8">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-bold text-2xl tracking-tight">{toTitle(slug)}</h1>
            {meta && <StatusBadge status={meta.status} />}
            {meta?.since && <span className="text-muted-foreground text-xs">v{meta.since}</span>}
            {meta?.importStatement && <CopyImportButton importStatement={meta.importStatement} />}
          </div>
          {meta?.description && <p className="mt-2 text-muted-foreground">{meta.description}</p>}
        </div>

        {hasGuidelines && (
          <>
            <Separator />
            <div id="guidelines">
              <h2 className="mb-4 font-medium text-muted-foreground text-sm">Usage Guidelines</h2>
              <Guidelines dos={meta.dos} donts={meta.donts} />
            </div>
          </>
        )}

        <Separator />

        <div id="preview">
          <h2 className="mb-4 font-medium text-muted-foreground text-sm">Preview</h2>
          {Preview ? (
            <div className="rounded-lg border p-6">
              <Preview />
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground text-sm">
              No preview available yet for this block.
            </div>
          )}
        </div>

        {hasCode && (
          <>
            <Separator />
            <div id="code-example">
              <h2 className="mb-4 font-medium text-muted-foreground text-sm">Code Example</h2>
              <CodeHighlight code={meta.codeExample!} />
            </div>
          </>
        )}

        <Separator />

        <div id="props">
          <h2 className="mb-4 font-medium text-muted-foreground text-sm">Props</h2>
          <PropsTable slug={slug} />
        </div>
      </div>

      <TableOfContents sections={tocSections} />
    </div>
  )
}
