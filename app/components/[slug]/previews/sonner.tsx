"use client"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Section } from "./_shared"

export default function SonnerPreview() {
  return (
    <div className="space-y-6">
      <Section title="Toast variants">
        <Button variant="outline" onClick={() => toast("Event has been created.")}>
          Default
        </Button>
        <Button variant="outline" onClick={() => toast.success("Successfully saved!")}>
          Success
        </Button>
        <Button variant="outline" onClick={() => toast.error("Something went wrong.")}>
          Error
        </Button>
        <Button variant="outline" onClick={() => toast.info("Here is some info.")}>
          Info
        </Button>
        <Button variant="outline" onClick={() => toast.warning("Be careful!")}>
          Warning
        </Button>
      </Section>
    </div>
  )
}
