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

// Scatter — risk exposure matrix (impact vs probability, bubble = volume)
export const scatterHighRisk = [
  { impact: 85, probability: 70, volume: 240 },
  { impact: 92, probability: 55, volume: 180 },
  { impact: 78, probability: 82, volume: 300 },
  { impact: 88, probability: 68, volume: 150 },
]

export const scatterLowRisk = [
  { impact: 25, probability: 30, volume: 60 },
  { impact: 18, probability: 45, volume: 90 },
  { impact: 35, probability: 22, volume: 120 },
  { impact: 42, probability: 38, volume: 80 },
  { impact: 20, probability: 20, volume: 40 },
]

export const scatterConfig = {
  high: { label: "High risk", color: "var(--chart-1)" },
  low: { label: "Low risk", color: "var(--chart-2)" },
} satisfies ChartConfig

// Composed — volume bars + trend line
export const composedData = [
  { month: "Jan", volume: 4200, avg: 3800 },
  { month: "Feb", volume: 5100, avg: 4100 },
  { month: "Mar", volume: 4800, avg: 4300 },
  { month: "Apr", volume: 6200, avg: 4700 },
  { month: "May", volume: 5700, avg: 4900 },
  { month: "Jun", volume: 7100, avg: 5300 },
]

export const composedConfig = {
  volume: { label: "Volume", color: "var(--chart-1)" },
  avg: { label: "6-mo avg", color: "var(--chart-3)" },
} satisfies ChartConfig

// Funnel — onboarding conversion funnel
export const funnelData = [
  { name: "signup", value: 1000, fill: "var(--color-signup)" },
  { name: "verified", value: 720, fill: "var(--color-verified)" },
  { name: "kyc", value: 480, fill: "var(--color-kyc)" },
  { name: "approved", value: 360, fill: "var(--color-approved)" },
  { name: "funded", value: 210, fill: "var(--color-funded)" },
]

export const funnelConfig = {
  signup: { label: "Signup", color: "oklch(0.72 0.15 250)" },
  verified: { label: "Email verified", color: "oklch(0.68 0.14 220)" },
  kyc: { label: "KYC complete", color: "oklch(0.64 0.13 200)" },
  approved: { label: "Approved", color: "oklch(0.6 0.12 180)" },
  funded: { label: "Funded", color: "oklch(0.55 0.11 160)" },
} satisfies ChartConfig
