import type { ChartConfig } from "@/components/ui/chart"

export const timeSeriesData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
]

export const timeSeriesConfig = {
  desktop: { label: "Desktop", color: "var(--primary)" },
  mobile: { label: "Mobile", color: "var(--muted-foreground)" },
} satisfies ChartConfig

export const pieData = [
  { name: "chrome", value: 275, fill: "var(--color-chrome)" },
  { name: "safari", value: 200, fill: "var(--color-safari)" },
  { name: "firefox", value: 187, fill: "var(--color-firefox)" },
  { name: "edge", value: 173, fill: "var(--color-edge)" },
  { name: "other", value: 90, fill: "var(--color-other)" },
]

export const pieConfig = {
  chrome: { label: "Chrome", color: "oklch(0.7 0.15 145)" },
  safari: { label: "Safari", color: "oklch(0.7 0.15 250)" },
  firefox: { label: "Firefox", color: "oklch(0.7 0.15 30)" },
  edge: { label: "Edge", color: "oklch(0.7 0.12 200)" },
  other: { label: "Other", color: "oklch(0.65 0.02 250)" },
} satisfies ChartConfig

export const radarData = [
  { subject: "Speed", current: 85, previous: 65 },
  { subject: "Reliability", current: 90, previous: 70 },
  { subject: "Usability", current: 75, previous: 80 },
  { subject: "Security", current: 95, previous: 60 },
  { subject: "Cost", current: 60, previous: 85 },
  { subject: "Support", current: 70, previous: 75 },
]

export const radarConfig = {
  current: { label: "Current", color: "var(--primary)" },
  previous: { label: "Previous", color: "var(--muted-foreground)" },
} satisfies ChartConfig
