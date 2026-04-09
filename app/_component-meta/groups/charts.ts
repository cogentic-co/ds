import type { ComponentMeta } from "../index"

// ── Charts ──
export const chartsMeta: Record<string, ComponentMeta> = {
  "area-chart": {
    status: "new",
    description:
      "Filled area chart with gradient support, stacking, and multi-series. Built on Recharts with automatic tooltip and legend integration.",
    since: "0.2.4",
    importStatement: 'import { AreaChart } from "@cogentic-co/ds/charts"',
    dos: [
      "Use gradient fill (default) for a polished look",
      "Enable stacked mode when comparing parts of a whole over time",
      "Show legend when displaying multiple series",
    ],
    donts: [
      "Don't use for categorical data — use BarChart instead",
      "Don't stack more than 3-4 series (becomes unreadable)",
    ],
    codeExample: `import { AreaChart } from "@cogentic-co/ds/charts"

<AreaChart
  data={data}
  config={{ revenue: { label: "Revenue", color: "var(--primary)" } }}
  xKey="month"
  yKeys={["revenue"]}
  gradient
  showLegend
/>`,
  },
  "bar-chart": {
    status: "new",
    description:
      "Vertical or horizontal bar chart with configurable radius, stacking, and multi-series. Built on Recharts.",
    since: "0.2.4",
    importStatement: 'import { BarChart } from "@cogentic-co/ds/charts"',
    dos: [
      "Use horizontal mode for long category labels",
      "Set radius for rounded bar corners (default 4px)",
      "Use stacked mode when comparing compositions",
    ],
    donts: ["Don't use too many series without a legend"],
    codeExample: `import { BarChart } from "@cogentic-co/ds/charts"

<BarChart
  data={data}
  config={config}
  xKey="month"
  yKeys={["desktop", "mobile"]}
  stacked
  radius={6}
/>`,
  },
  "line-chart": {
    status: "new",
    description:
      "Line chart with configurable curve type, dot visibility, and multi-series. Supports natural, linear, step, and monotone interpolation.",
    since: "0.2.4",
    importStatement: 'import { LineChart } from "@cogentic-co/ds/charts"',
    dos: [
      "Use 'natural' curve for smooth data, 'step' for discrete changes",
      "Show dots when there are few data points",
      "Hide dots when there are many data points (>20)",
    ],
    donts: ["Don't plot more than 5 lines on one chart"],
    codeExample: `import { LineChart } from "@cogentic-co/ds/charts"

<LineChart
  data={data}
  config={config}
  xKey="month"
  yKeys={["revenue", "cost"]}
  curveType="natural"
  showDots
/>`,
  },
  "pie-chart": {
    status: "new",
    description:
      "Pie or donut chart with optional center label/value. Supports legend and tooltip. Each slice uses a named colour from the config.",
    since: "0.2.4",
    importStatement: 'import { PieChart } from "@cogentic-co/ds/charts"',
    dos: [
      "Use donut mode with a center label for KPI-style displays",
      "Keep slices to 5-7 max for readability",
      "Use the config to map names to colours",
    ],
    donts: [
      "Don't use for time-series data — use LineChart or AreaChart",
      "Don't use tiny slices — aggregate into 'Other'",
    ],
    codeExample: `import { PieChart } from "@cogentic-co/ds/charts"

<PieChart
  data={[
    { name: "chrome", value: 275 },
    { name: "safari", value: 200 },
  ]}
  config={{
    chrome: { label: "Chrome", color: "oklch(0.7 0.15 145)" },
    safari: { label: "Safari", color: "oklch(0.7 0.15 250)" },
  }}
  donut
  centerValue="475"
  centerLabel="Total"
/>`,
  },
  "radial-chart": {
    status: "new",
    description:
      "Radar/spider chart for comparing multiple dimensions. Built on Recharts RadarChart with polar grid and angle axis.",
    since: "0.2.4",
    importStatement: 'import { RadialChart } from "@cogentic-co/ds/charts"',
    dos: [
      "Use for comparing entities across 5-8 dimensions",
      "Enable legend when comparing multiple data keys",
    ],
    donts: ["Don't use for fewer than 3 dimensions", "Don't use for time-series data"],
    codeExample: `import { RadialChart } from "@cogentic-co/ds/charts"

<RadialChart
  data={data}
  config={config}
  angleKey="subject"
  dataKeys={["current", "previous"]}
  showLegend
/>`,
  },
  "scatter-chart": {
    status: "new",
    description:
      "XY scatter plot with optional bubble sizing for a third dimension. Ideal for risk matrices, correlation plots, and multi-variable distributions.",
    since: "0.10.0",
    importStatement: 'import { ScatterChart } from "@cogentic-co/ds/charts"',
    dos: [
      "Use for risk/impact matrices and correlation analysis",
      "Add a sizeKey to encode a third dimension as bubble size",
      "Split data into multiple series to colour-code categories",
    ],
    donts: [
      "Don't use for time-series data — use LineChart or AreaChart",
      "Don't overcrowd — aim for <100 points per series for legibility",
    ],
    codeExample: `import { ScatterChart } from "@cogentic-co/ds/charts"

<ScatterChart
  series={[
    { key: "high", data: highRiskPoints },
    { key: "low", data: lowRiskPoints },
  ]}
  config={{
    high: { label: "High risk", color: "var(--chart-1)" },
    low: { label: "Low risk", color: "var(--chart-2)" },
  }}
  xKey="probability"
  yKey="impact"
  sizeKey="volume"
  showLegend
/>`,
  },
  "composed-chart": {
    status: "new",
    description:
      "Combine bars, lines, and areas on the same canvas. Perfect for volume + trend dashboards where one series is discrete and another is continuous.",
    since: "0.10.0",
    importStatement: 'import { ComposedChart } from "@cogentic-co/ds/charts"',
    dos: [
      "Use a bar series for primary volume and a line for a rolling average or target",
      "Keep to 2-3 series max — composed charts get messy quickly",
      "Show legend so users can distinguish series types",
    ],
    donts: [
      "Don't mix more than one area — overlapping areas obscure data",
      "Don't use when a single chart type would communicate the same thing",
    ],
    codeExample: `import { ComposedChart } from "@cogentic-co/ds/charts"

<ComposedChart
  data={data}
  config={{
    volume: { label: "Volume", color: "var(--chart-1)" },
    avg: { label: "Average", color: "var(--chart-3)" },
  }}
  xKey="month"
  series={[
    { key: "volume", type: "bar" },
    { key: "avg", type: "line" },
  ]}
  showLegend
/>`,
  },
  "funnel-chart": {
    status: "new",
    description:
      "Conversion funnel showing drop-off through a sequence of stages. Ideal for signup flows, KYC progression, and sales pipelines.",
    since: "0.10.0",
    importStatement: 'import { FunnelChart } from "@cogentic-co/ds/charts"',
    dos: [
      "Order stages top-to-bottom from broad to narrow",
      "Label each stage clearly — users can't interpret funnels without stage names",
      "Provide per-stage fill colors for visual distinction",
    ],
    donts: [
      "Don't use for non-sequential data — categories aren't funnels",
      "Don't show more than 6-7 stages — becomes hard to read",
    ],
    codeExample: `import { FunnelChart } from "@cogentic-co/ds/charts"

<FunnelChart
  data={[
    { name: "signup", value: 1000, fill: "var(--color-signup)" },
    { name: "verified", value: 720, fill: "var(--color-verified)" },
    { name: "approved", value: 360, fill: "var(--color-approved)" },
  ]}
  config={{
    signup: { label: "Signup", color: "oklch(0.72 0.15 250)" },
    verified: { label: "Verified", color: "oklch(0.68 0.14 220)" },
    approved: { label: "Approved", color: "oklch(0.6 0.12 180)" },
  }}
/>`,
  },
}
