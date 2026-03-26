"use client"

import { P } from "@/components/ui/typography"

export default function DirectionPreview() {
  return (
    <div className="space-y-4">
      <P className="text-muted-foreground text-sm">
        DirectionProvider wraps your app to set RTL/LTR direction. Components like Select and Dialog
        respond automatically.
      </P>
      <div className="rounded-md border border-dashed p-6 text-center text-muted-foreground text-sm">
        Wrap your app with {'<DirectionProvider dir="rtl">'} for RTL support.
      </div>
    </div>
  )
}
