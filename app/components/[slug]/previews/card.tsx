"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { type ControlDefs, Playground, useControls } from "./_shared"

const cardControlDefs = {
  padding: {
    type: "select" as const,
    options: ["default", "compact", "spacious"],
    defaultValue: "default",
    label: "Padding",
  },
  title: {
    type: "text" as const,
    defaultValue: "Card Title",
    label: "Title",
  },
  description: {
    type: "text" as const,
    defaultValue: "Card description with supporting text.",
    label: "Description",
  },
  showFooter: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Show Footer",
  },
} satisfies ControlDefs

export default function CardPreview() {
  const controls = useControls(cardControlDefs)
  const { padding, title, description, showFooter } = controls.values
  const paddingClass = padding === "compact" ? "p-3" : padding === "spacious" ? "p-8" : ""

  return (
    <div className="max-w-md space-y-6">
      {/* Interactive playground */}
      <Playground controls={controls}>
        <Card className={paddingClass}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">This is the card content area. You can put any content here.</p>
          </CardContent>
          {showFooter && (
            <CardFooter className="gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </CardFooter>
          )}
        </Card>
      </Playground>
    </div>
  )
}
