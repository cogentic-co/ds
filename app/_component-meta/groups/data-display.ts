import type { ComponentMeta } from "../index"

// ── Data Display ──
export const dataDisplayMeta: Record<string, ComponentMeta> = {
  table: {
    status: "stable",
    description: "Basic HTML table with consistent styling.",
    since: "0.1.0",
    importStatement:
      'import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@cogentic-co/ds/table"',
    dos: ["Use for simple static data display", "Align numbers to the right for easy scanning"],
    donts: [
      "Don't use for large or interactive datasets — use DataTable",
      "Don't use for layout — use Grid",
    ],
  },
  "data-table": {
    status: "new",
    description:
      "Full-featured data table with sorting, filtering, pagination, and virtualization. Built on TanStack Table.",
    since: "0.2.0",
    importStatement:
      'import { DataTable, useDataTable, type ColumnDef } from "@cogentic-co/ds/data-table"',
    dos: [
      "Use useDataTable hook for state management",
      "Enable virtual mode for tables with 100+ rows",
      "Use DataTableFacetedFilter for enum/status columns",
    ],
    donts: [
      "Don't use DataTable for simple static tables — use Table instead",
      "Don't load all data client-side for very large datasets (1000+ rows)",
    ],
    codeExample: `import { DataTable, useDataTable, type ColumnDef } from "@cogentic-co/ds/data-table"

const columns: ColumnDef<Row>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "status", header: "Status" },
]

const { table } = useDataTable({ data, columns })
<DataTable table={table} columns={columns} />`,
  },
  badge: {
    status: "stable",
    description: "Small label for status, categories, or counts.",
    since: "0.1.0",
    importStatement: 'import { Badge } from "@cogentic-co/ds/badge"',
    dos: [
      "Use semantic variants (destructive for errors, secondary for neutral)",
      "Keep badge text short (1-2 words)",
    ],
    donts: [
      "Don't use badges for interactive tags — use Tag component",
      "Don't use for long text — it should be scannable",
    ],
    codeExample: `import { Badge } from "@cogentic-co/ds/badge"

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>`,
  },
  avatar: {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/avatar",
    description: "User or entity avatar with image and fallback.",
    since: "0.1.0",
    importStatement: 'import { Avatar, AvatarImage, AvatarFallback } from "@cogentic-co/ds/avatar"',
    dos: ["Always provide AvatarFallback with initials", "Use consistent sizes across your app"],
    donts: [
      "Don't use decorative images as avatars",
      "Don't show broken image states — always have a fallback",
    ],
    codeExample: `import { Avatar, AvatarImage, AvatarFallback } from "@cogentic-co/ds/avatar"

<Avatar>
  <AvatarImage src="/avatar.jpg" alt="User" />
  <AvatarFallback>JC</AvatarFallback>
</Avatar>`,
  },
  carousel: {
    status: "stable",
    description: "Scrollable content carousel.",
    since: "0.1.0",
    importStatement:
      'import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@cogentic-co/ds/carousel"',
    dos: ["Show navigation arrows and dot indicators", "Use for visual content (images, cards)"],
    donts: [
      "Don't auto-play without a pause control",
      "Don't use for critical content users must see",
    ],
  },
  chart: {
    status: "stable",
    description: "Chart wrapper using Recharts with design system theming.",
    since: "0.1.0",
    importStatement:
      'import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@cogentic-co/ds/chart"',
    dos: [
      "Use ChartConfig for consistent colors across themes",
      "Always include ChartTooltip for interactivity",
    ],
    donts: [
      "Don't use raw Recharts — wrap with ChartContainer for theming",
      "Don't overload charts with too many data series",
    ],
  },
  kbd: {
    status: "stable",
    description: "Keyboard shortcut display element.",
    since: "0.1.0",
    importStatement: 'import { Kbd } from "@cogentic-co/ds/kbd"',
    dos: [
      "Use to display keyboard shortcuts in menus and tooltips",
      "Use platform-appropriate symbols (⌘ on Mac, Ctrl on Windows)",
    ],
    donts: ["Don't use for regular text styling"],
    codeExample: `import { Kbd } from "@cogentic-co/ds/kbd"

<Kbd>⌘K</Kbd>
<Kbd>Ctrl+S</Kbd>`,
  },
  typography: {
    status: "new",
    description: "Semantic text components (H1-H4, P, Lead, Blockquote, etc.) and Prose container.",
    since: "0.2.0",
    importStatement: 'import { H1, H2, H3, P, Lead, Prose } from "@cogentic-co/ds/typography"',
    dos: [
      "Use Prose for markdown/rich content rendering",
      "Use semantic heading levels (H1 → H2 → H3)",
    ],
    donts: [
      "Don't skip heading levels for styling — use className instead",
      "Don't use H1 more than once per page",
    ],
    codeExample: `import { H1, P, Lead, Prose } from "@cogentic-co/ds/typography"

<H1>Page Title</H1>
<Lead>A brief introduction to the page.</Lead>
<P>Regular paragraph text.</P>`,
  },
}
