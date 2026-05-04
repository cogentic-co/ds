"use client"

import { AlertCircleIcon, AlertTriangleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PolicyBanner } from "@/components/ui/policy-banner"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const policyBannerControlDefs = {
  variant: {
    type: "radio",
    options: ["info", "warning", "critical"],
    defaultValue: "warning",
    label: "Variant",
  },
  message: {
    type: "text",
    defaultValue: "Your AML policy expires in 7 days. Please renew to maintain compliance.",
    label: "Message",
  },
  dismissible: { type: "boolean", defaultValue: true, label: "Dismissible" },
  withAction: { type: "boolean", defaultValue: false, label: "Action button" },
} satisfies ControlDefs

export default function PolicyBannerPreview() {
  const controls = useControls(policyBannerControlDefs)
  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <PolicyBanner
          variant={controls.values.variant as "info" | "warning" | "critical"}
          dismissible={controls.values.dismissible}
          action={
            controls.values.withAction ? (
              <Button
                variant={controls.values.variant === "critical" ? "destructive" : "default"}
                size="sm"
              >
                Review Now
              </Button>
            ) : undefined
          }
        >
          {controls.values.message}
        </PolicyBanner>
      </Playground>

      <Section title="Info">
        <PolicyBanner variant="info">
          New FATF guidelines take effect on April 1, 2026. Review the updated compliance
          procedures.
        </PolicyBanner>
      </Section>
      <Section title="Warning">
        <PolicyBanner variant="warning" icon={<AlertTriangleIcon className="size-4" />}>
          Your AML policy expires in 7 days. Please renew to maintain compliance status.
        </PolicyBanner>
      </Section>
      <Section title="Critical">
        <PolicyBanner
          variant="critical"
          icon={<AlertCircleIcon className="size-4" />}
          action={
            <Button variant="destructive" size="sm">
              Review Now
            </Button>
          }
        >
          Regulatory deadline missed. Immediate action required to avoid penalties.
        </PolicyBanner>
      </Section>
      <Section title="Non-Dismissible">
        <PolicyBanner variant="info" dismissible={false}>
          This banner cannot be dismissed. It persists until the condition is resolved.
        </PolicyBanner>
      </Section>
    </div>
  )
}
