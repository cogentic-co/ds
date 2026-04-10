"use client"

import { HeatmapChart, type HeatmapCell } from "@/src/charts/heatmap-chart"

export default function HeatmapChartPreview() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const hours = Array.from({ length: 12 }, (_, i) => `${String(i * 2).padStart(2, "0")}:00`)
  const data: HeatmapCell[] = days.flatMap((day) =>
    hours.map((hour) => ({
      x: hour,
      y: day,
      value: Math.floor(Math.random() * 50),
    })),
  )
  return (
    <div className="max-w-2xl">
      <HeatmapChart data={data} xLabels={hours} yLabels={days} />
    </div>
  )
}
