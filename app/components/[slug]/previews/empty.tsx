"use client"

import { InboxIcon, PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { type ControlDefs, Playground, useControls } from "./_shared"

const emptyControlDefs = {
  showIcon: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Show icon",
  },
  title: {
    type: "text" as const,
    defaultValue: "No results found",
    label: "Title",
  },
} satisfies ControlDefs

export default function EmptyPreview() {
  const controls = useControls(emptyControlDefs)

  return (
    <div className="max-w-md">
      <Playground controls={controls}>
        <Empty>
          <EmptyHeader>
            {controls.values.showIcon && (
              <EmptyMedia variant="icon">
                <InboxIcon className="size-6" />
              </EmptyMedia>
            )}
            <EmptyTitle>{controls.values.title}</EmptyTitle>
            <EmptyDescription>
              Try adjusting your search or filter to find what you are looking for.
            </EmptyDescription>
          </EmptyHeader>
          <Button>
            <PlusIcon className="size-4" />
            Create new
          </Button>
        </Empty>
      </Playground>
    </div>
  )
}
