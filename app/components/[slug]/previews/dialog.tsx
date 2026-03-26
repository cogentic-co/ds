"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { type ControlDefs, Playground, useControls } from "./_shared"

const dialogControlDefs = {
  title: {
    type: "text" as const,
    defaultValue: "Dialog Title",
    label: "Title",
  },
  description: {
    type: "text" as const,
    defaultValue: "This is a dialog description. You can put any content here.",
    label: "Description",
  },
} satisfies ControlDefs

export default function DialogPreview() {
  const controls = useControls(dialogControlDefs)
  const { title, description } = controls.values

  return (
    <div className="space-y-6">
      {/* Interactive playground */}
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <Dialog>
            <DialogTrigger render={<Button />}>Open Dialog</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-muted-foreground text-sm">Dialog body content goes here.</p>
              </div>
              <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
                <Button>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </Playground>
    </div>
  )
}
