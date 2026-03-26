"use client"

import { addDays } from "date-fns"
import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"

export default function CalendarPreview() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-3 font-medium text-muted-foreground text-sm">Single Date</h3>
        <div className="w-fit rounded-md border p-3">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-medium text-muted-foreground text-sm">Date Range (2 months)</h3>
        <div className="w-fit rounded-md border p-3">
          <Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} />
        </div>
      </div>
    </div>
  )
}
