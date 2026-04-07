import type { ComponentMeta } from "../index"

// ── Compliance ──
export const complianceMeta: Record<string, ComponentMeta> = {
  "case-card": {
    status: "new",
    description:
      "Compact card for displaying compliance cases on boards and lists. Shows SLA status, priority, assignee, and linked alerts/transactions.",
    since: "0.3.8",
    importStatement: 'import { CaseCard, type CaseCardProps } from "@cogentic-co/ds/case-card"',
    dos: [
      "Use in board (kanban) and list views for case management",
      "Pass linkedAlerts and linkedTransactions for hover-card previews",
      "Omit assignee prop when the card is scoped to the current user (e.g. inbox)",
      "Use onClick to navigate to the case detail page",
    ],
    donts: [
      "Don't override the built-in SLA/priority colour maps — they follow the design system",
      "Don't use for non-case entities — use Card or Item instead",
      "Don't render outside a scrollable container without constraining width",
    ],
    codeExample: `import { CaseCard } from "@cogentic-co/ds/case-card"

<CaseCard
  id="case-12345"
  title="Suspicious Transaction Pattern Detected"
  entities={["ACME Corp", "John Doe"]}
  sla="at_risk"
  priority="p2"
  updatedAt={new Date().toISOString()}
  assignee={{ name: "Sarah Chen" }}
  linkedAlerts={[
    { id: "alert-1", severity: "high", trigger: "Threshold Breach", type: "velocity" },
  ]}
  linkedTransactions={[
    { id: "tx-1", amount: "5,000", asset: "USDT", direction: "outbound" },
  ]}
  onClick={() => router.push("/cases/case-12345")}
/>`,
  },
  "compliance-score": {
    status: "new",
    description:
      "SVG donut gauge showing compliance posture as a percentage. Auto-colors by score range (red/amber/emerald).",
    since: "0.5.0",
    importStatement: 'import { ComplianceScore } from "@cogentic-co/ds/compliance-score"',
    dos: [
      "Use to show compliance posture at a glance",
      "Pair with a Card for dashboard widgets",
      "Use the label prop to provide context",
    ],
    donts: [
      "Don't use for progress — use Progress instead",
      "Don't override color unless the auto-coloring is inappropriate",
      "Don't use at sm size without removing the label — it won't fit",
    ],
    codeExample: `import { ComplianceScore } from "@cogentic-co/ds/compliance-score"

<ComplianceScore score={85} label="Score" />
<ComplianceScore score={45} size="lg" />
<ComplianceScore score={20} color="text-destructive" />`,
  },
  item: {
    status: "new",
    description:
      "Versatile compound component for displaying content with media, title, description, and actions.",
    since: "0.3.7",
    importStatement:
      'import { Item, ItemGroup, ItemSeparator, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions, ItemHeader, ItemFooter } from "@cogentic-co/ds/item"',
    dos: [
      "Use ItemGroup to group related items with consistent spacing",
      "Use ItemMedia with variant='icon' for icon containers",
      "Use ItemContent to wrap title and description for proper layout",
      "Use the render prop to make items clickable links",
      "Use variant='outline' for bordered items in lists",
    ],
    donts: [
      "Don't use Item for form fields — use Field instead",
      "Don't nest Items inside other Items",
      "Don't use without ItemContent — it provides the flex layout",
    ],
    codeExample: `import { Item, ItemGroup, ItemSeparator, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions } from "@cogentic-co/ds/item"
import { Settings } from "lucide-react"

<ItemGroup>
  <Item variant="outline">
    <ItemMedia variant="icon">
      <Settings />
    </ItemMedia>
    <ItemContent>
      <ItemTitle>Provider Name</ItemTitle>
      <ItemDescription>Description of the provider and its role.</ItemDescription>
    </ItemContent>
    <ItemActions>
      <Button size="sm" variant="outline">Configure</Button>
    </ItemActions>
  </Item>
  <Item variant="outline">
    <ItemContent>
      <ItemTitle>Another Item</ItemTitle>
      <ItemDescription>Without media, content fills the space.</ItemDescription>
    </ItemContent>
  </Item>
</ItemGroup>`,
  },
  separator: {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/separator",
    description: "Visual divider between content sections.",
    since: "0.1.0",
    importStatement: 'import { Separator } from "@cogentic-co/ds/separator"',
    dos: [
      "Use to divide related content groups",
      "Use orientation='vertical' for horizontal layouts",
    ],
    donts: ["Don't overuse — whitespace is often sufficient"],
  },
  "aspect-ratio": {
    status: "stable",
    description: "Maintain consistent width-to-height ratio for media.",
    since: "0.1.0",
    importStatement: 'import { AspectRatio } from "@cogentic-co/ds/aspect-ratio"',
    dos: [
      "Use for images and videos to prevent layout shift",
      "Common ratios: 16/9 (video), 1 (square), 4/3 (photo)",
    ],
    donts: ["Don't use for text content — let it flow naturally"],
  },
  resizable: {
    status: "stable",
    description: "Resizable panel layout with draggable handles.",
    since: "0.1.0",
    importStatement:
      'import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@cogentic-co/ds/resizable"',
    dos: [
      "Set sensible minSize values to prevent panels from collapsing",
      "Use direction='horizontal' or 'vertical' to match layout",
    ],
    donts: ["Don't nest too many resizable panels — it becomes hard to use"],
  },
  "scroll-area": {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/scroll-area",
    description: "Custom scrollbar with cross-browser consistency.",
    since: "0.1.0",
    importStatement: 'import { ScrollArea } from "@cogentic-co/ds/scroll-area"',
    dos: [
      "Set a fixed height or max-height on the container",
      "Use for long lists, code blocks, or sidebar content",
    ],
    donts: ["Don't use for the main page scroll — let the browser handle it"],
  },
  collapsible: {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/collapsible",
    description: "Expandable/collapsible content section.",
    since: "0.1.0",
    importStatement:
      'import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@cogentic-co/ds/collapsible"',
    dos: [
      "Use for progressive disclosure of secondary content",
      "Indicate the collapsed/expanded state visually",
    ],
    donts: [
      "Don't hide critical information behind a collapsible",
      "Don't use for lists — use Accordion instead",
    ],
  },
  accordion: {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/accordion",
    description: "Vertically collapsible content panels. Built on Base UI Accordion.",
    since: "0.1.0",
    importStatement:
      'import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@cogentic-co/ds/accordion"',
    dos: [
      "Use type='single' for FAQ-style content",
      "Use type='multiple' when users may need several open",
    ],
    donts: [
      "Don't nest accordions inside accordions",
      "Don't use for navigation — use sidebar or tabs",
    ],
    codeExample: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@cogentic-co/ds/accordion"

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content 1</AccordionContent>
  </AccordionItem>
</Accordion>`,
  },
  tabs: {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/tabs",
    description: "Tabbed content panels with multiple visual variants. Built on Base UI Tabs.",
    since: "0.1.0",
    importStatement:
      'import { Tabs, TabsList, TabsTrigger, TabsContent } from "@cogentic-co/ds/tabs"',
    dos: [
      "Use for switching between related views in the same context",
      "Keep tab labels short (1-2 words)",
    ],
    donts: [
      "Don't use more than 6-7 tabs — use navigation instead",
      "Don't use for sequential steps — use Stepper",
    ],
    codeExample: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@cogentic-co/ds/tabs"

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>`,
  },
  grid: {
    status: "new",
    description: "CSS Grid wrapper with typed props for all Tailwind grid classes.",
    since: "0.2.0",
    importStatement: 'import { Grid, Col } from "@cogentic-co/ds/grid"',
    dos: ["Use Grid + Col for page layouts and card grids", "Use gap prop for consistent spacing"],
    donts: [
      "Don't use Grid for simple flex layouts — use flex utilities instead",
      "Don't set both cols and className grid-cols — pick one",
    ],
    codeExample: `import { Grid, Col } from "@cogentic-co/ds/grid"

<Grid cols={3} gap={4}>
  <Col span={2}>Wide column</Col>
  <Col>Normal column</Col>
</Grid>`,
  },
}
