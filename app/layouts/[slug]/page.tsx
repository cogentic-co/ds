import { readFileSync } from "node:fs"
import { join } from "node:path"
import { CodeBlock } from "@/components/ui/code-block"
import { Separator } from "@/components/ui/separator"
import { layoutPreviews } from "./previews"

function toTitle(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

function readLayoutSource(slug: string): string | null {
  // Layouts are copy-source recipes living at src/layouts/<slug>.tsx.
  // We read them at request time so the dev preview shows the exact file
  // a consumer would copy/paste.
  try {
    return readFileSync(join(process.cwd(), "src", "layouts", `${slug}.tsx`), "utf8")
  } catch {
    return null
  }
}

export default async function LayoutPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const Preview = layoutPreviews[slug]
  const source = readLayoutSource(slug)

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-bold text-2xl tracking-tight">{toTitle(slug)}</h1>
        <p className="mt-1 text-muted-foreground text-sm">
          Copy/paste recipe — fork the source and edit freely. Layouts are not bundled into the
          published package.
        </p>
      </div>

      {Preview ? (
        <div>
          <h2 className="mb-4 font-medium text-muted-foreground text-sm">Live preview</h2>
          <div className="overflow-hidden rounded-lg border border-border bg-background">
            <Preview />
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground text-sm">
          No preview available yet for this layout.
        </div>
      )}

      {source && (
        <>
          <Separator />
          <div>
            <h2 className="mb-3 font-medium text-muted-foreground text-sm">
              Source — <span className="font-mono">src/layouts/{slug}.tsx</span>
            </h2>
            <CodeBlock code={source} language="tsx" showLineNumbers />
          </div>
        </>
      )}
    </div>
  )
}
