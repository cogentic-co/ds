"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingOverlay } from "@/components/ui/loading-overlay"
import { P } from "@/components/ui/typography"
import { type ControlDefs, Playground, useControls } from "./_shared"

const loadingOverlayControlDefs = {
  loading: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Loading",
  },
  label: {
    type: "text" as const,
    defaultValue: "",
    label: "Label",
    placeholder: "Optional loading text...",
  },
} satisfies ControlDefs

export default function LoadingOverlayPreview() {
  const controls = useControls(loadingOverlayControlDefs)
  const { loading, label } = controls.values
  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <LoadingOverlay loading={loading} label={label || undefined}>
          <Card>
            <CardHeader>
              <CardTitle>Content Card</CardTitle>
              <CardDescription>This content is behind the overlay.</CardDescription>
            </CardHeader>
            <CardContent>
              <P>Some content that gets overlaid while loading.</P>
            </CardContent>
          </Card>
        </LoadingOverlay>
      </Playground>
    </div>
  )
}
