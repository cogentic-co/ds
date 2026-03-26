"use client"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

export default function ResizablePreview() {
  return (
    <div className="max-w-lg">
      <ResizablePanelGroup orientation="horizontal" className="rounded-lg border">
        <ResizablePanel defaultSize={50}>
          <div className="flex h-32 items-center justify-center p-6">
            <span className="font-medium text-sm">Panel A</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex h-32 items-center justify-center p-6">
            <span className="font-medium text-sm">Panel B</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
