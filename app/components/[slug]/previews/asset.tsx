"use client"

import { Download, X } from "lucide-react"
import { Asset, AssetGroup } from "@/src/chat/asset"
import { Button } from "@/src/components/button"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const assetControlDefs = {
  kind: {
    type: "radio",
    options: ["image", "document", "audio"],
    defaultValue: "document",
    label: "Kind",
  },
  name: { type: "text", defaultValue: "Q4-compliance-report.pdf", label: "Name" },
  mediaType: { type: "text", defaultValue: "application/pdf", label: "Media type" },
  size: {
    type: "number",
    defaultValue: 2_457_600,
    min: 0,
    max: 100_000_000,
    step: 1024,
    label: "Size (bytes)",
  },
} satisfies ControlDefs

export default function AssetPreview() {
  const controls = useControls(assetControlDefs)
  const kind = controls.values.kind as "image" | "document" | "audio"

  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <div className="w-full max-w-md">
          {kind === "image" ? (
            <Asset
              kind="image"
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop"
              alt={controls.values.name}
              name={controls.values.name}
              className="max-w-xs"
            />
          ) : kind === "audio" ? (
            <Asset
              kind="audio"
              name={controls.values.name}
              mediaType={controls.values.mediaType}
              size={controls.values.size}
              src="https://upload.wikimedia.org/wikipedia/commons/3/32/Sound_synthesizer.ogg"
            />
          ) : (
            <Asset
              kind="document"
              name={controls.values.name}
              mediaType={controls.values.mediaType}
              size={controls.values.size}
              actions={
                <Button variant="ghost" size="icon" className="size-7" aria-label="Download">
                  <Download className="size-3.5" />
                </Button>
              }
            />
          )}
        </div>
      </Playground>

      <Section title="Document variants — auto icon by mime type">
        <div className="flex w-full max-w-md flex-col gap-2">
          <Asset kind="document" name="contract.pdf" mediaType="application/pdf" size={812_000} />
          <Asset kind="document" name="transactions.csv" mediaType="text/csv" size={48_120} />
          <Asset kind="document" name="archive.zip" mediaType="application/zip" size={15_770_000} />
          <Asset kind="document" name="case-notes.md" mediaType="text/markdown" size={3_240} />
          <Asset kind="document" name="config.json" mediaType="application/json" size={2_048} />
        </div>
      </Section>

      <Section title="Group">
        <AssetGroup>
          <Asset kind="document" name="contract.pdf" mediaType="application/pdf" size={812_000} />
          <Asset
            kind="document"
            name="schedule-a.docx"
            mediaType="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            size={45_312}
          />
          <Asset
            kind="document"
            name="appendix.json"
            mediaType="application/json"
            size={2_048}
            actions={
              <Button variant="ghost" size="icon" className="size-7" aria-label="Remove">
                <X className="size-3.5" />
              </Button>
            }
          />
        </AssetGroup>
      </Section>

      <Section title="Image — placeholder when no src">
        <Asset kind="image" alt="Generating chart…" className="h-32 w-48" />
      </Section>
    </div>
  )
}
