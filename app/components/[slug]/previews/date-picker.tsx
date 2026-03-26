"use client"

import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { DatePicker, DateRangePicker } from "@/components/ui/date-picker"
import { Section } from "./_shared"

export default function DatePickerPreview() {
  const [date, setDate] = useState<Date>()
  const [rangeDate, setRangeDate] = useState<DateRange | undefined>()

  return (
    <div className="space-y-8">
      <Section title="Single Date">
        <DatePicker value={date} onChange={setDate} />
      </Section>
      <Section title="With Presets">
        <DatePicker
          value={date}
          onChange={setDate}
          presets={[
            { label: "Today", days: 0 },
            { label: "Tomorrow", days: 1 },
            { label: "In 3 days", days: 3 },
            { label: "In a week", days: 7 },
          ]}
        />
      </Section>
      <Section title="Date Range">
        <DateRangePicker value={rangeDate} onChange={setRangeDate} />
      </Section>
      <Section title="Disabled">
        <DatePicker disabled placeholder="Disabled" />
      </Section>
    </div>
  )
}
