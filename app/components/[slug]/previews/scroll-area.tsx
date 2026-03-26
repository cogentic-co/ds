"use client"

import { ScrollArea } from "@/components/ui/scroll-area"

export default function ScrollAreaPreview() {
  return (
    <div className="max-w-sm">
      <ScrollArea className="h-48 w-full rounded-md border p-4">
        <div className="space-y-4">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="text-sm">
              Item {i + 1} - Scroll to see more content below.
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
