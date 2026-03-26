"use client"

import { SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { P } from "@/components/ui/typography"
import { VisuallyHidden } from "@/components/ui/visually-hidden"

export default function VisuallyHiddenPreview() {
  return (
    <div className="space-y-4">
      <P>The text below is visually hidden but readable by screen readers:</P>
      <div className="rounded-md border p-4">
        <Button variant="outline" size="icon">
          <SearchIcon className="size-4" />
          <VisuallyHidden>Search</VisuallyHidden>
        </Button>
        <span className="ml-3 text-muted-foreground text-sm">
          ← Icon button with VisuallyHidden label for accessibility
        </span>
      </div>
    </div>
  )
}
