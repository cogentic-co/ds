"use client"

import { SegmentedControl } from "@/components/ui/segmented-control"
import { Section } from "./_shared"

export default function SegmentedControlPreview() {
  return (
    <div className="space-y-6">
      <Section title="Default">
        <SegmentedControl
          options={[
            { label: "Daily", value: "daily" },
            { label: "Weekly", value: "weekly" },
            { label: "Monthly", value: "monthly" },
          ]}
          defaultValue="weekly"
        />
      </Section>
    </div>
  )
}
