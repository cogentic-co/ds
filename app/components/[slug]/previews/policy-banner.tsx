"use client"

import { AlertCircleIcon, AlertTriangleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PolicyBanner } from "@/components/ui/policy-banner"
import { Section } from "./_shared"

export default function PolicyBannerPreview() {
  return (
    <div className="space-y-8">
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
