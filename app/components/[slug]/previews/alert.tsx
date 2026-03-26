"use client"

import { AlertCircleIcon, AlertTriangleIcon, TerminalIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { type ControlDefs, Playground, useControls } from "./_shared"

const alertControlDefs = {
  variant: {
    type: "radio" as const,
    options: ["default", "warning", "destructive"],
    defaultValue: "default",
    label: "Variant",
  },
  title: {
    type: "text" as const,
    defaultValue: "Alert Title",
    label: "Title",
  },
  description: {
    type: "text" as const,
    defaultValue: "This is an alert with some information.",
    label: "Description",
  },
} satisfies ControlDefs

export default function AlertPreview() {
  const controls = useControls(alertControlDefs)
  const { variant, title, description } = controls.values
  const Icon =
    variant === "destructive"
      ? AlertCircleIcon
      : variant === "warning"
        ? AlertTriangleIcon
        : TerminalIcon

  return (
    <div className="max-w-lg space-y-6">
      {/* Interactive playground */}
      <Playground controls={controls}>
        <Alert variant={variant as "default"}>
          <Icon className="size-4" />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
        </Alert>
      </Playground>

      {/* Static examples */}
      <Alert>
        <TerminalIcon className="size-4" />
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>This is a default alert with some information.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTriangleIcon className="size-4" />
        <AlertTitle>Warning Alert</AlertTitle>
        <AlertDescription>This action may have unintended consequences.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircleIcon className="size-4" />
        <AlertTitle>Destructive Alert</AlertTitle>
        <AlertDescription>Something went wrong. Please try again.</AlertDescription>
      </Alert>
    </div>
  )
}
