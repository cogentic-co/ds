"use client"

import { ChevronsUpDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { type ControlDefs, Playground, useControls } from "./_shared"

const collapsibleControlDefs = {
  defaultOpen: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Default open",
  },
} satisfies ControlDefs

export default function CollapsiblePreview() {
  const controls = useControls(collapsibleControlDefs)

  return (
    <div className="max-w-sm space-y-6">
      <Playground controls={controls}>
        <Collapsible
          key={String(controls.values.defaultOpen)}
          defaultOpen={controls.values.defaultOpen}
        >
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Starred repositories</h4>
            <CollapsibleTrigger render={<Button variant="ghost" size="icon-sm" />}>
              <ChevronsUpDownIcon className="size-4" />
            </CollapsibleTrigger>
          </div>
          <div className="mt-2 rounded-md border px-4 py-2 text-sm">@cogentic/design-system</div>
          <CollapsibleContent className="mt-2 space-y-2">
            <div className="rounded-md border px-4 py-2 text-sm">@cogentic/components</div>
            <div className="rounded-md border px-4 py-2 text-sm">@cogentic/utils</div>
          </CollapsibleContent>
        </Collapsible>
      </Playground>
    </div>
  )
}
