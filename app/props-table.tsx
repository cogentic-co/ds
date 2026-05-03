import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import propsData from "./_generated/props.json"

type PropDoc = {
  name: string
  type: string
  required: boolean
  defaultValue: string | null
  description: string
}

type ComponentDoc = {
  displayName: string
  description: string
  props: PropDoc[]
}

const manifest = propsData as Record<string, ComponentDoc[]>

function toComponentName(slug: string): string {
  return slug
    .replace(/^animation-/, "Animation")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("")
}

export function PropsTable({ slug }: { slug: string }) {
  const docs = manifest[slug]

  // If no docgen data, show a minimal usage hint
  if (!docs || docs.length === 0) {
    const name = toComponentName(slug)
    return (
      <div className="space-y-3">
        <h3 className="font-mono font-semibold text-sm">
          {"<"}
          {name}
          {" />"}
        </h3>
        <p className="text-muted-foreground text-sm">
          Accepts{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">className</code> for
          styling.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {docs.map((doc) => (
        <div key={doc.displayName} className="space-y-3">
          <div>
            <h3 className="font-mono font-semibold text-sm">
              {"<"}
              {doc.displayName}
              {" />"}
            </h3>
            {doc.description && (
              <p className="mt-1 text-muted-foreground text-sm">{doc.description}</p>
            )}
          </div>
          {doc.props.length > 0 ? (
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">Prop</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="w-[100px]">Default</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {doc.props.map((prop) => (
                    <TableRow key={prop.name}>
                      <TableCell className="font-mono text-xs">
                        {prop.name}
                        {prop.required && (
                          <Badge variant="outline" className="ml-2 text-2xs">
                            required
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                          {prop.type}
                        </code>
                      </TableCell>
                      <TableCell className="font-mono text-muted-foreground text-xs">
                        {prop.defaultValue ?? "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {prop.description || "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No custom props.</p>
          )}
        </div>
      ))}
    </div>
  )
}
