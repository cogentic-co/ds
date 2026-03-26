"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function SheetPreview() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Open Sheet</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>This is a sheet that slides in from the side.</SheetDescription>
        </SheetHeader>
        <div className="p-4">
          <p className="text-muted-foreground text-sm">Sheet body content goes here.</p>
        </div>
      </SheetContent>
    </Sheet>
  )
}
