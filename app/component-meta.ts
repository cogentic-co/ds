export type ComponentStatus = "stable" | "beta" | "deprecated" | "new"

export type ComponentMeta = {
  status: ComponentStatus
  description: string
  /** Version the component was added or last had a breaking change */
  since?: string
  /** Usage guidelines — do's */
  dos?: string[]
  /** Usage guidelines — don'ts */
  donts?: string[]
  /** Copyable code example shown on the component page */
  codeExample?: string
  /** Import statement for copying */
  importStatement?: string
  /** URL to the Base UI primitive docs (if this component wraps one) */
  baseUiDoc?: string
}

/**
 * Component metadata — status, description, and guidelines.
 * Key = slug (same as preview-shell and previews.tsx).
 */
export const componentMeta: Record<string, ComponentMeta> = {
  // ── Actions ──
  button: {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/button",
    description: "Trigger actions or navigation. Supports multiple variants and sizes.",
    since: "0.1.0",
    importStatement: 'import { Button } from "@cogentic/ds"',
    dos: [
      "Use primary variant for the main action on a page",
      "Use destructive variant for irreversible actions",
      "Include an icon for quick visual scanning",
      "Use loading state to indicate async operations",
    ],
    donts: [
      "Don't use more than one primary button in a section",
      "Don't use a button where a link (<a>) is more appropriate",
      "Don't disable buttons without explaining why",
    ],
    codeExample: `import { Button } from "@cogentic/ds"

<Button variant="default">Click me</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline" size="sm">Small</Button>`,
  },
  "button-group": {
    status: "stable",
    description: "Group related buttons with consistent spacing.",
    since: "0.1.0",
    importStatement: 'import { ButtonGroup } from "@cogentic/ds"',
    dos: [
      "Group related actions together (e.g. Save / Cancel)",
      "Use consistent button variants within a group",
    ],
    donts: ["Don't mix too many variants in one group", "Don't use for unrelated actions"],
    codeExample: `import { Button, ButtonGroup } from "@cogentic/ds"

<ButtonGroup>
  <Button variant="outline">Cancel</Button>
  <Button>Save</Button>
</ButtonGroup>`,
  },
  toggle: {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/toggle",
    description: "Two-state button that can be on or off.",
    since: "0.1.0",
    importStatement: 'import { Toggle } from "@cogentic/ds"',
    dos: [
      "Use for binary on/off actions (bold, italic, mute)",
      "Use clear icons that indicate the toggled state",
    ],
    donts: [
      "Don't use for navigation — use Button or Link",
      "Don't use when Switch is more appropriate (settings)",
    ],
    codeExample: `import { Toggle } from "@cogentic/ds"

<Toggle aria-label="Toggle bold">
  <Bold className="size-4" />
</Toggle>`,
  },
  "toggle-group": {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/toggle-group",
    description: "Group of toggles for selecting one or multiple options.",
    since: "0.1.0",
    importStatement: 'import { ToggleGroup, ToggleGroupItem } from "@cogentic/ds"',
    dos: [
      "Use type='single' for mutually exclusive options",
      "Use type='multiple' for independent toggles",
    ],
    donts: [
      "Don't use for more than 5-6 options — use Select instead",
      "Don't mix icons and text labels in the same group",
    ],
    codeExample: `import { ToggleGroup, ToggleGroupItem } from "@cogentic/ds"

<ToggleGroup type="single">
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>`,
  },
  "dropdown-menu": {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/menu",
    description:
      "Contextual menu triggered by a button. Supports items, checkboxes, radios, and sub-menus.",
    since: "0.1.0",
    importStatement:
      'import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@cogentic/ds"',
    dos: [
      "Group related actions with separators",
      "Include keyboard shortcuts in menu items",
      "Use descriptive labels for actions",
    ],
    donts: [
      "Don't nest menus more than one level deep",
      "Don't put too many items in a single menu (>10)",
    ],
  },
  "context-menu": {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/context-menu",
    description: "Right-click context menu with the same structure as DropdownMenu.",
    since: "0.1.0",
    importStatement:
      'import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "@cogentic/ds"',
    dos: [
      "Use for secondary actions on interactive elements",
      "Mirror common OS context menu patterns",
    ],
    donts: [
      "Don't use as the only way to access important actions",
      "Don't use on touch-only interfaces without an alternative",
    ],
  },

  // ── Forms ──
  "approval-actions": {
    status: "new",
    description:
      "Compound component for compliance review workflows: approve, reject, or escalate with confirmation dialog and optional reason.",
    since: "0.5.0",
    importStatement: 'import { ApprovalActions } from "@cogentic/ds"',
    dos: [
      "Use in compliance and review workflows requiring explicit approve/reject/escalate",
      "Enable requireReason for auditable decisions",
      "Provide all three callbacks for full functionality",
    ],
    donts: [
      "Don't use for simple yes/no confirmations — use AlertDialog instead",
      "Don't omit all callbacks — at least one action should be wired up",
    ],
    codeExample: `import { ApprovalActions } from "@cogentic/ds"

<ApprovalActions
  onApprove={(reason) => console.log("Approved", reason)}
  onReject={(reason) => console.log("Rejected", reason)}
  onEscalate={(reason) => console.log("Escalated", reason)}
  requireReason
/>`,
  },
  input: {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/input",
    description: "Text input field with support for different types and states.",
    since: "0.1.0",
    importStatement: 'import { Input } from "@cogentic/ds"',
    dos: [
      "Always pair with a label (use Field component)",
      "Use placeholder text as a hint, not a label",
      "Show validation errors clearly with FieldError",
    ],
    donts: [
      "Don't use placeholder as a replacement for labels",
      "Don't disable inputs without clear context",
    ],
    codeExample: `import { Input } from "@cogentic/ds"

<Input type="email" placeholder="you@example.com" />
<Input disabled placeholder="Disabled" />`,
  },
  textarea: {
    status: "stable",
    description: "Multi-line text input.",
    since: "0.1.0",
    importStatement: 'import { Textarea } from "@cogentic/ds"',
    dos: [
      "Set a reasonable min-height for the expected content",
      "Use with Field for labels and validation",
    ],
    donts: [
      "Don't use for single-line input — use Input instead",
      "Don't disable resize unless you have a good reason",
    ],
    codeExample: `import { Textarea } from "@cogentic/ds"

<Textarea placeholder="Write a message..." />`,
  },
  select: {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/select",
    description: "Dropdown selection from a list of options. Built on Base UI Select.",
    since: "0.1.0",
    importStatement:
      'import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@cogentic/ds"',
    dos: [
      "Use placeholder text to describe the expected selection",
      "Group options with SelectGroup for long lists",
    ],
    donts: [
      "Don't use for fewer than 3 options — use RadioGroup instead",
      "Don't use for searchable lists — use Combobox",
    ],
    codeExample: `import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@cogentic/ds"

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Pick one" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="a">Option A</SelectItem>
    <SelectItem value="b">Option B</SelectItem>
  </SelectContent>
</Select>`,
  },
  "native-select": {
    status: "stable",
    description: "Native HTML select element with consistent styling.",
    since: "0.1.0",
    importStatement: 'import { NativeSelect } from "@cogentic/ds"',
    dos: [
      "Use when you need native mobile picker behavior",
      "Use for simple forms that don't need custom styling",
    ],
    donts: [
      "Don't use when you need search/filter — use Combobox",
      "Don't use when you need multi-select",
    ],
  },
  checkbox: {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/checkbox",
    description: "Binary choice control. Built on Base UI Checkbox.",
    since: "0.1.0",
    importStatement: 'import { Checkbox } from "@cogentic/ds"',
    dos: [
      "Always provide a visible label",
      "Use for independent boolean choices",
      "Group related checkboxes with Field",
    ],
    donts: [
      "Don't use for mutually exclusive options — use RadioGroup",
      "Don't use without a label — screen readers need it",
    ],
    codeExample: `import { Checkbox } from "@cogentic/ds"

<Checkbox />
<Checkbox defaultChecked />
<Checkbox disabled />`,
  },
  "radio-group": {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/radio",
    description: "Single selection from a group of options. Built on Base UI RadioGroup.",
    since: "0.1.0",
    importStatement: 'import { RadioGroup, RadioGroupItem } from "@cogentic/ds"',
    dos: [
      "Use for 2-5 mutually exclusive options",
      "Always show all options — don't hide behind a dropdown",
    ],
    donts: [
      "Don't use for more than 5 options — use Select instead",
      "Don't use for independent choices — use Checkbox",
    ],
    codeExample: `import { RadioGroup, RadioGroupItem } from "@cogentic/ds"

<RadioGroup defaultValue="a">
  <RadioGroupItem value="a" label="Option A" />
  <RadioGroupItem value="b" label="Option B" />
</RadioGroup>`,
  },
  switch: {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/switch",
    description: "Toggle for enabling/disabling settings. Built on Base UI Switch.",
    since: "0.1.0",
    importStatement: 'import { Switch } from "@cogentic/ds"',
    dos: [
      "Use for settings that take effect immediately",
      "Place the label on the left, switch on the right",
    ],
    donts: [
      "Don't use for actions that require a submit — use Checkbox",
      "Don't use without a label",
    ],
    codeExample: `import { Switch } from "@cogentic/ds"

<Switch />
<Switch defaultChecked />`,
  },
  slider: {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/slider",
    description: "Range input for selecting numeric values. Built on Base UI Slider.",
    since: "0.1.0",
    importStatement: 'import { Slider } from "@cogentic/ds"',
    dos: ["Show the current value near the slider", "Use sensible min/max/step values"],
    donts: [
      "Don't use for precise numeric input — use NumberInput",
      "Don't use without showing the value somewhere",
    ],
    codeExample: `import { Slider } from "@cogentic/ds"

<Slider defaultValue={[50]} max={100} step={1} />`,
  },
  "input-group": {
    status: "stable",
    description: "Compose inputs with addons, buttons, and icons.",
    since: "0.1.0",
    importStatement: 'import { InputGroup, InputGroupAddon } from "@cogentic/ds"',
    dos: [
      "Use addons for prefixes/suffixes (icons, labels, buttons)",
      "Keep addons small and non-interactive when possible",
    ],
    donts: ["Don't nest InputGroups", "Don't use addons that are wider than the input itself"],
    codeExample: `import { Input, InputGroup, InputGroupAddon } from "@cogentic/ds"
import { SearchIcon } from "lucide-react"

<InputGroup>
  <InputGroupAddon><SearchIcon className="size-4" /></InputGroupAddon>
  <Input placeholder="Search..." />
</InputGroup>`,
  },
  "input-otp": {
    status: "stable",
    description: "One-time password input with individual digit fields.",
    since: "0.1.0",
    importStatement: 'import { InputOTP, InputOTPGroup, InputOTPSlot } from "@cogentic/ds"',
    dos: ["Set maxLength to match the expected code length", "Auto-focus the first slot on mount"],
    donts: [
      "Don't use for regular text input",
      "Don't use without clear instructions about the code",
    ],
    codeExample: `import { InputOTP, InputOTPGroup, InputOTPSlot } from "@cogentic/ds"

<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
  },
  combobox: {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/combobox",
    description: "Searchable select with autocomplete. Built on Base UI Combobox.",
    since: "0.1.0",
    importStatement: 'import { Combobox } from "@cogentic/ds"',
    dos: ["Use for lists with more than 10 options", "Provide helpful placeholder text"],
    donts: [
      "Don't use for short lists — use Select or RadioGroup",
      "Don't clear the search on blur if user might return",
    ],
  },
  calendar: {
    status: "stable",
    description: "Date selection calendar. Uses react-day-picker with custom styling.",
    since: "0.1.0",
    importStatement: 'import { Calendar } from "@cogentic/ds"',
    dos: ["Use inside a Popover for inline date picking", "Disable dates outside valid ranges"],
    donts: [
      "Don't use standalone — wrap in DatePicker for a full experience",
      "Don't use for date ranges — use DateRangePicker",
    ],
  },
  "date-picker": {
    status: "new",
    description: "Date and date range picker with popover and optional presets.",
    since: "0.2.0",
    importStatement: 'import { DatePicker, DateRangePicker } from "@cogentic/ds"',
    dos: [
      "Use DatePicker for single date, DateRangePicker for ranges",
      "Provide presets for common selections (today, last 7 days)",
    ],
    donts: ["Don't use for time-only selection"],
  },
  label: {
    status: "stable",
    description: "Form label element with consistent styling.",
    since: "0.1.0",
    importStatement: 'import { Label } from "@cogentic/ds"',
    dos: ["Always associate with an input via htmlFor", "Keep labels concise and descriptive"],
    donts: [
      "Don't use Label alone — use Field for full form structure",
      "Don't hide labels unless using VisuallyHidden for a11y",
    ],
  },
  field: {
    status: "stable",
    description: "Form field wrapper with label, description, error, and layout variants.",
    since: "0.1.0",
    importStatement:
      'import { Field, FieldLabel, FieldDescription, FieldError } from "@cogentic/ds"',
    dos: [
      "Use Field to wrap every form input for consistent structure",
      "Use FieldDescription for helper text below inputs",
      "Use FieldError to display validation messages",
    ],
    donts: ["Don't use Field without a label — use sr-only if needed"],
    codeExample: `import { Field, FieldLabel, FieldDescription, FieldError } from "@cogentic/ds"
import { Input } from "@cogentic/ds"

<Field>
  <FieldLabel>Email</FieldLabel>
  <Input type="email" placeholder="you@example.com" />
  <FieldDescription>We'll never share your email.</FieldDescription>
</Field>`,
  },
  form: {
    status: "stable",
    description: "Re-exports TanStack Form hooks for form state management and validation.",
    since: "0.2.0",
    dos: [
      "Use for forms that need validation and state management",
      "Combine with Field for consistent layout",
    ],
    donts: ["Don't use for simple one-field forms — a plain form element is fine"],
  },

  // ── Layout ──
  card: {
    status: "stable",
    description: "Contained surface for grouping related content.",
    since: "0.1.0",
    importStatement:
      'import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@cogentic/ds"',
    dos: [
      "Use CardHeader + CardContent for consistent structure",
      "Use CardAction for top-right actions (settings, close)",
    ],
    donts: ["Don't nest cards inside cards", "Don't overload a single card with too many actions"],
    codeExample: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@cogentic/ds"

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>
    <Button>Save</Button>
  </CardFooter>
</Card>`,
  },
  // ── Compliance ──
  "case-card": {
    status: "new",
    description:
      "Compact card for displaying compliance cases on boards and lists. Shows SLA status, priority, assignee, and linked alerts/transactions.",
    since: "0.3.8",
    importStatement: 'import { CaseCard, type CaseCardProps } from "@cogentic/ds"',
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
    codeExample: `import { CaseCard } from "@cogentic/ds"

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
    importStatement: 'import { ComplianceScore } from "@cogentic/ds"',
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
    codeExample: `import { ComplianceScore } from "@cogentic/ds"

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
      'import { Item, ItemGroup, ItemSeparator, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions, ItemHeader, ItemFooter } from "@cogentic/ds"',
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
    codeExample: `import { Item, ItemGroup, ItemSeparator, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions } from "@cogentic/ds"
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
    importStatement: 'import { Separator } from "@cogentic/ds"',
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
    importStatement: 'import { AspectRatio } from "@cogentic/ds"',
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
      'import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@cogentic/ds"',
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
    importStatement: 'import { ScrollArea } from "@cogentic/ds"',
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
      'import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@cogentic/ds"',
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
      'import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@cogentic/ds"',
    dos: [
      "Use type='single' for FAQ-style content",
      "Use type='multiple' when users may need several open",
    ],
    donts: [
      "Don't nest accordions inside accordions",
      "Don't use for navigation — use sidebar or tabs",
    ],
    codeExample: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@cogentic/ds"

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
    importStatement: 'import { Tabs, TabsList, TabsTrigger, TabsContent } from "@cogentic/ds"',
    dos: [
      "Use for switching between related views in the same context",
      "Keep tab labels short (1-2 words)",
    ],
    donts: [
      "Don't use more than 6-7 tabs — use navigation instead",
      "Don't use for sequential steps — use Stepper",
    ],
    codeExample: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@cogentic/ds"

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
    importStatement: 'import { Grid, Col } from "@cogentic/ds"',
    dos: ["Use Grid + Col for page layouts and card grids", "Use gap prop for consistent spacing"],
    donts: [
      "Don't use Grid for simple flex layouts — use flex utilities instead",
      "Don't set both cols and className grid-cols — pick one",
    ],
    codeExample: `import { Grid, Col } from "@cogentic/ds"

<Grid cols={3} gap={4}>
  <Col span={2}>Wide column</Col>
  <Col>Normal column</Col>
</Grid>`,
  },

  // ── Feedback ──
  alert: {
    status: "stable",
    description: "Inline notification for important messages.",
    since: "0.1.0",
    importStatement: 'import { Alert, AlertTitle, AlertDescription } from "@cogentic/ds"',
    dos: [
      "Use variant to communicate severity (default, warning, destructive)",
      "Keep alert messages concise and actionable",
    ],
    donts: [
      "Don't use for transient messages — use toast (Sonner)",
      "Don't stack multiple alerts — consolidate the message",
    ],
    codeExample: `import { Alert, AlertTitle, AlertDescription } from "@cogentic/ds"

<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>This is an informational alert.</AlertDescription>
</Alert>`,
  },
  "alert-dialog": {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/alert-dialog",
    description: "Modal confirmation dialog for destructive or irreversible actions.",
    since: "0.1.0",
    importStatement:
      'import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogAction, AlertDialogCancel } from "@cogentic/ds"',
    dos: [
      "Use for destructive actions (delete, discard)",
      "Include a clear cancel option",
      'Make the action button label specific ("Delete project" not "OK")',
    ],
    donts: [
      "Don't use for informational messages — use Alert instead",
      "Don't use for complex forms — use Dialog",
    ],
  },
  dialog: {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/dialog",
    description: "Modal overlay for focused tasks. Built on Base UI Dialog.",
    since: "0.1.0",
    importStatement:
      'import { Dialog, DialogTrigger, DialogPopup, DialogTitle, DialogDescription, DialogClose } from "@cogentic/ds"',
    dos: [
      "Always include DialogTitle for accessibility",
      "Use for focused tasks that need user attention",
    ],
    donts: [
      "Don't use for simple confirmations — use AlertDialog",
      "Don't put long forms in dialogs — use a full page instead",
    ],
    codeExample: `import { Dialog, DialogTrigger, DialogPopup, DialogTitle, DialogDescription, DialogClose } from "@cogentic/ds"

<Dialog>
  <DialogTrigger render={<Button />}>Open</DialogTrigger>
  <DialogPopup>
    <DialogTitle>Title</DialogTitle>
    <DialogDescription>Description</DialogDescription>
    <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
  </DialogPopup>
</Dialog>`,
  },
  drawer: {
    status: "stable",
    description: "Swipe-to-dismiss bottom sheet for mobile. Built on vaul.",
    since: "0.1.0",
    importStatement: 'import { Drawer, DrawerTrigger, DrawerContent } from "@cogentic/ds"',
    dos: ["Use on mobile as an alternative to Dialog", "Include a drag handle for dismissal"],
    donts: [
      "Don't use on desktop — use Dialog or Sheet instead",
      "Don't put critical content in a drawer",
    ],
  },
  sheet: {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/dialog",
    description:
      "Slide-in side panel for forms, settings, and detail views. No swipe gestures — use Drawer for mobile-first bottom sheets.",
    since: "0.1.0",
    importStatement:
      'import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@cogentic-co/ds"',
    dos: [
      "Use for secondary content that needs more space than a popover",
      "Use side='right' for detail panels, side='left' for navigation",
      "Use Sheet for desktop side panels, Drawer for mobile bottom sheets",
    ],
    donts: [
      "Don't use for quick actions — use DropdownMenu or Popover",
      "Don't use for mobile bottom sheets — use Drawer with swipe gestures",
    ],
  },
  popover: {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/popover",
    description: "Floating content panel anchored to a trigger. Built on Base UI Popover.",
    since: "0.1.0",
    importStatement: 'import { Popover, PopoverTrigger, PopoverContent } from "@cogentic/ds"',
    dos: ["Use for contextual actions or settings", "Keep popover content focused and concise"],
    donts: [
      "Don't use for long forms — use Dialog or Sheet",
      "Don't use for tooltips — use Tooltip component",
    ],
  },
  tooltip: {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/tooltip",
    description: "Brief contextual information on hover/focus. Built on Base UI Tooltip.",
    since: "0.1.0",
    importStatement: 'import { Tooltip, TooltipTrigger, TooltipContent } from "@cogentic/ds"',
    dos: [
      "Use for supplementary info that doesn't fit in the UI",
      "Keep tooltip content brief (1-2 lines)",
    ],
    donts: [
      "Don't use for critical information the user must see",
      "Don't put interactive elements inside tooltips",
    ],
  },
  "hover-card": {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/preview-card",
    description: "Rich preview card shown on hover.",
    since: "0.1.0",
    importStatement: 'import { HoverCard, HoverCardTrigger, HoverCardContent } from "@cogentic/ds"',
    dos: [
      "Use for previewing linked content (user profiles, pages)",
      "Include relevant details without overwhelming",
    ],
    donts: [
      "Don't use for actions — use Popover or DropdownMenu",
      "Don't rely on hover for touch devices",
    ],
  },
  sonner: {
    status: "stable",
    description: "Toast notifications via the Sonner library.",
    since: "0.1.0",
    importStatement: 'import { toast } from "@cogentic/ds"',
    dos: [
      "Use for transient success/error messages",
      "Include an action button for undo-able operations",
    ],
    donts: [
      "Don't use for persistent messages — use Alert",
      "Don't show more than one toast at a time",
    ],
    codeExample: `import { toast } from "sonner"

toast.success("Changes saved")
toast.error("Something went wrong")`,
  },
  progress: {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/progress",
    description: "Progress bar for loading or completion states.",
    since: "0.1.0",
    importStatement: 'import { Progress } from "@cogentic/ds"',
    dos: [
      "Show a numeric percentage alongside the bar when possible",
      "Use for determinate progress (uploads, multi-step flows)",
    ],
    donts: ["Don't use for indeterminate loading — use Spinner"],
    codeExample: `import { Progress } from "@cogentic/ds"

<Progress value={66} />`,
  },
  skeleton: {
    status: "stable",
    description: "Placeholder loading animation for content.",
    since: "0.1.0",
    importStatement: 'import { Skeleton } from "@cogentic/ds"',
    dos: [
      "Match the skeleton shape to the expected content",
      "Use multiple skeletons to represent a full layout",
    ],
    donts: [
      "Don't use for interactive loading — use Spinner or Progress",
      "Don't show skeletons longer than 3 seconds without feedback",
    ],
    codeExample: `import { Skeleton } from "@cogentic/ds"

<Skeleton className="h-4 w-[200px]" />
<Skeleton className="h-4 w-[150px]" />`,
  },
  spinner: {
    status: "stable",
    description: "Animated loading indicator.",
    since: "0.1.0",
    importStatement: 'import { Spinner } from "@cogentic/ds"',
    dos: [
      "Use for indeterminate loading states",
      "Size appropriately — small for buttons, larger for page loading",
    ],
    donts: [
      "Don't use when you know the progress — use Progress instead",
      "Don't use without context — add a label or use LoadingOverlay",
    ],
  },
  "entity-header": {
    status: "new",
    description:
      "Header block for entity pages with avatar, name, metadata, and right column slot.",
    since: "0.4.0",
    importStatement: 'import { EntityHeader } from "@cogentic/ds"',
    dos: [
      "Use for entity detail pages (companies, users, organisations)",
      "Provide meta items for key attributes",
    ],
    donts: [
      "Don't nest EntityHeader inside Card — it's designed to be standalone",
      "Don't use for page headers without an entity context",
    ],
    codeExample: `import { EntityHeader } from "@cogentic/ds"

<EntityHeader
  name="Acme Corp"
  subtitle="Licensed VASP"
  meta={[{ text: "Singapore", icon: "🇸🇬" }]}
  rightCol={<Badge>Active</Badge>}
/>`,
  },
  "logo-vasp": {
    status: "new",
    description: "VASP Track product logo as an SVG component with size variants.",
    since: "0.4.0",
    importStatement: 'import { LogoVasp } from "@cogentic/ds"',
    dos: ["Use currentColor for theming — wrap in a coloured container if needed"],
    donts: ["Don't stretch or distort — use the size prop"],
    codeExample: `import { LogoVasp } from "@cogentic/ds"

<LogoVasp size="lg" />`,
  },
  "search-input": {
    status: "new",
    description: "Generic search combobox with async results, keyboard nav, and custom rendering.",
    since: "0.4.0",
    importStatement: 'import { SearchInput } from "@cogentic/ds"',
    dos: [
      "Provide an async onSearch callback",
      "Use renderItem for custom result rendering",
      "Handle onSelect for navigation or actions",
    ],
    donts: [
      "Don't use for static/predefined options — use Combobox instead",
      "Don't forget to handle the loading state in your search function",
    ],
    codeExample: `import { SearchInput } from "@cogentic/ds"

<SearchInput
  onSearch={async (q) => fetchResults(q)}
  renderItem={(item) => <span>{item.name}</span>}
  onSelect={(item) => router.push(item.href)}
  placeholder="Search..."
/>`,
  },
  "segmented-control": {
    status: "stable",
    description:
      "iOS-style pill selector for switching between a small set of options. Not a tab — use Tabs for content switching.",
    since: "0.3.0",
    importStatement: 'import { SegmentedControl } from "@cogentic-co/ds"',
    dos: [
      "Use for 2-4 mutually exclusive options",
      "Keep labels short — single words work best",
      "Use for view toggles (grid/list), time ranges (day/week/month), modes",
    ],
    donts: [
      "Don't use for more than 4-5 options — use Select or Tabs instead",
      "Don't use for navigation — use Tabs for content panels",
      "Don't use long labels — they compress the pill indicator",
    ],
    codeExample: `import { SegmentedControl } from "@cogentic-co/ds"

<SegmentedControl
  options={[
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
  ]}
  defaultValue="weekly"
  onChange={(value) => console.log(value)}
/>`,
  },
  empty: {
    status: "stable",
    description: "Empty state placeholder with icon, title, and action.",
    since: "0.1.0",
    importStatement: 'import { Empty } from "@cogentic/ds"',
    dos: [
      "Include a clear CTA to help users take the next step",
      "Use a relevant icon to communicate the empty state",
    ],
    donts: [
      "Don't leave empty states without guidance",
      "Don't use generic messages like 'Nothing here'",
    ],
  },

  // ── Navigation ──
  breadcrumb: {
    status: "stable",
    description: "Hierarchical page location indicator.",
    since: "0.1.0",
    importStatement:
      'import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@cogentic/ds"',
    dos: [
      "Show the full path from root to current page",
      "Make all breadcrumb items except the last one clickable",
    ],
    donts: [
      "Don't use for less than 2 levels of depth",
      "Don't duplicate breadcrumbs with other navigation",
    ],
  },
  pagination: {
    status: "stable",
    description: "Page navigation for large data sets.",
    since: "0.1.0",
    importStatement:
      'import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@cogentic/ds"',
    dos: [
      "Show current page and total pages",
      "Include previous/next buttons for keyboard navigation",
    ],
    donts: [
      "Don't show pagination for fewer than 2 pages",
      "Don't use for infinite scroll — load more inline",
    ],
  },
  "navigation-menu": {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/navigation-menu",
    description: "Top-level navigation with dropdown panels.",
    since: "0.1.0",
    importStatement:
      'import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from "@cogentic/ds"',
    dos: [
      "Use for marketing/landing page top navigation",
      "Group related links in dropdown panels",
    ],
    donts: [
      "Don't use for app navigation — use Sidebar or Tabs",
      "Don't put too many items in the top level (>6)",
    ],
  },
  menubar: {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/menubar",
    description: "Application menu bar (File, Edit, View pattern).",
    since: "0.1.0",
    importStatement:
      'import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "@cogentic/ds"',
    dos: [
      "Use for desktop-style application menus",
      "Include keyboard shortcuts for common actions",
    ],
    donts: [
      "Don't use for web navigation — use NavigationMenu",
      "Don't use on mobile — the pattern doesn't translate",
    ],
  },
  command: {
    status: "stable",
    description: "Command palette / searchable command list.",
    since: "0.1.0",
    importStatement:
      'import { Command, CommandDialog, CommandInput, CommandList, CommandGroup, CommandItem } from "@cogentic/ds"',
    dos: [
      "Use CommandDialog for Cmd+K search patterns",
      "Group commands by category with CommandGroup",
    ],
    donts: ["Don't use as a regular dropdown — use Select or Combobox"],
  },
  sidebar: {
    status: "stable",
    description: "Application sidebar navigation.",
    since: "0.1.0",
    importStatement:
      'import { Sidebar, SidebarProvider, SidebarContent, SidebarMenu } from "@cogentic/ds"',
    dos: ["Use with AppShell for full application layouts", "Group navigation items by section"],
    donts: ["Don't use for marketing pages — use NavigationMenu"],
  },

  // ── Data Display ──
  table: {
    status: "stable",
    description: "Basic HTML table with consistent styling.",
    since: "0.1.0",
    importStatement:
      'import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@cogentic/ds"',
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
    importStatement: 'import { DataTable, useDataTable, type ColumnDef } from "@cogentic/ds"',
    dos: [
      "Use useDataTable hook for state management",
      "Enable virtual mode for tables with 100+ rows",
      "Use DataTableFacetedFilter for enum/status columns",
    ],
    donts: [
      "Don't use DataTable for simple static tables — use Table instead",
      "Don't load all data client-side for very large datasets (1000+ rows)",
    ],
    codeExample: `import { DataTable, useDataTable, type ColumnDef } from "@cogentic/ds"

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
    importStatement: 'import { Badge } from "@cogentic/ds"',
    dos: [
      "Use semantic variants (destructive for errors, secondary for neutral)",
      "Keep badge text short (1-2 words)",
    ],
    donts: [
      "Don't use badges for interactive tags — use Tag component",
      "Don't use for long text — it should be scannable",
    ],
    codeExample: `import { Badge } from "@cogentic/ds"

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>`,
  },
  avatar: {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/avatar",
    description: "User or entity avatar with image and fallback.",
    since: "0.1.0",
    importStatement: 'import { Avatar, AvatarImage, AvatarFallback } from "@cogentic/ds"',
    dos: ["Always provide AvatarFallback with initials", "Use consistent sizes across your app"],
    donts: [
      "Don't use decorative images as avatars",
      "Don't show broken image states — always have a fallback",
    ],
    codeExample: `import { Avatar, AvatarImage, AvatarFallback } from "@cogentic/ds"

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
      'import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@cogentic/ds"',
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
      'import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@cogentic/ds"',
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
    importStatement: 'import { Kbd } from "@cogentic/ds"',
    dos: [
      "Use to display keyboard shortcuts in menus and tooltips",
      "Use platform-appropriate symbols (⌘ on Mac, Ctrl on Windows)",
    ],
    donts: ["Don't use for regular text styling"],
    codeExample: `import { Kbd } from "@cogentic/ds"

<Kbd>⌘K</Kbd>
<Kbd>Ctrl+S</Kbd>`,
  },
  typography: {
    status: "new",
    description: "Semantic text components (H1-H4, P, Lead, Blockquote, etc.) and Prose container.",
    since: "0.2.0",
    importStatement: 'import { H1, H2, H3, P, Lead, Prose } from "@cogentic/ds"',
    dos: [
      "Use Prose for markdown/rich content rendering",
      "Use semantic heading levels (H1 → H2 → H3)",
    ],
    donts: [
      "Don't skip heading levels for styling — use className instead",
      "Don't use H1 more than once per page",
    ],
    codeExample: `import { H1, P, Lead, Prose } from "@cogentic/ds"

<H1>Page Title</H1>
<Lead>A brief introduction to the page.</Lead>
<P>Regular paragraph text.</P>`,
  },

  // ── Animation ──
  "bg-shader": {
    status: "stable",
    description: "Canvas-based dithered animated background, theme-aware.",
    since: "0.1.0",
    importStatement: 'import { BgShader } from "@cogentic/ds"',
    dos: ["Use as a hero or section background", "Let it respond to theme changes automatically"],
    donts: [
      "Don't use multiple BgShaders on one page — it's GPU intensive",
      "Don't place over text without sufficient contrast",
    ],
  },
  "blocky-shader": {
    status: "new",
    description: "ASCII art canvas shader with monospace character density mapping.",
    since: "0.4.0",
    importStatement: 'import { BlockyShader } from "@cogentic/ds"',
    dos: ["Use as a subtle background texture", "Pair with content that has sufficient contrast"],
    donts: ["Don't use alongside other shaders on the same page"],
    codeExample: `import { BlockyShader } from "@cogentic/ds"

<div className="relative h-64">
  <BlockyShader />
  <div className="relative z-10">Content here</div>
</div>`,
  },
  "ascii-shader": {
    status: "new",
    description:
      "Animated ASCII art shader with opacity-scaled characters and mobile optimization.",
    since: "0.4.0",
    importStatement: 'import { AsciiShader } from "@cogentic/ds"',
    dos: ["Use as an ambient background effect", "Uses larger cells on mobile for performance"],
    donts: ["Don't use alongside other shaders on the same page"],
    codeExample: `import { AsciiShader } from "@cogentic/ds"

<div className="relative h-64">
  <AsciiShader />
  <div className="relative z-10">Content here</div>
</div>`,
  },
  "subtle-shader": {
    status: "new",
    description: "Canvas radial gradient blob animation with palette options.",
    since: "0.4.0",
    importStatement: 'import { SubtleShader } from "@cogentic/ds"',
    dos: [
      "Use as a subtle ambient background effect",
      "Choose a palette that complements the section content",
    ],
    donts: ["Don't layer over low-contrast text", "Don't use alongside BgShader — pick one"],
    codeExample: `import { SubtleShader } from "@cogentic/ds"

<div className="relative h-64">
  <SubtleShader palette="blue" />
  <div className="relative z-10">Content here</div>
</div>`,
  },
  "deadline-countdown": {
    status: "new",
    description:
      "Displays time remaining until a regulatory deadline with auto-detected urgency states.",
    since: "0.5.0",
    importStatement: 'import { DeadlineCountdown } from "@cogentic/ds"',
    dos: [
      "Use for regulatory deadlines, review due dates, expiration dates",
      "Let urgency auto-detect based on thresholds unless you need to override",
      "Add a label prefix for context (e.g. 'Due in')",
    ],
    donts: [
      "Don't use for general timers — this is purpose-built for deadlines",
      "Don't set warningDays lower than criticalDays",
    ],
    codeExample: `import { DeadlineCountdown } from "@cogentic/ds"

<DeadlineCountdown deadline={new Date("2026-04-01")} label="Due in" />
<DeadlineCountdown deadline={pastDate} urgency="overdue" />`,
  },
  "policy-banner": {
    status: "new",
    description:
      "Dismissible banner for policy acknowledgments, regulatory alerts, or system-wide notices.",
    since: "0.5.0",
    importStatement: 'import { PolicyBanner } from "@cogentic/ds"',
    dos: [
      "Use for regulatory alerts, policy changes, or system-wide notices",
      "Add an icon for quick visual scanning",
      "Include an action button for critical banners that need immediate response",
    ],
    donts: [
      "Don't use for toast notifications — use Sonner instead",
      "Don't use for inline form errors — use Alert instead",
      "Don't stack more than 2 banners on a page",
    ],
    codeExample: `import { PolicyBanner } from "@cogentic/ds"

<PolicyBanner variant="warning" icon={<AlertTriangle />}>
  Your AML policy expires in 7 days.
</PolicyBanner>

<PolicyBanner
  variant="critical"
  action={<Button size="sm">Review Now</Button>}
>
  Regulatory deadline missed.
</PolicyBanner>`,
  },
  "status-indicator": {
    status: "new",
    description: "Coloured dot indicating live status — online, offline, busy, away, or pending.",
    since: "0.5.0",
    importStatement: 'import { StatusIndicator } from "@cogentic/ds"',
    dos: [
      "Use to show real-time entity status (users, services, agents)",
      "Add pulse for active/processing states",
      "Overlay on avatars with ring-2 ring-background for badge positioning",
    ],
    donts: [
      "Don't use as a generic coloured dot — use Badge for labels",
      "Don't pulse offline or away states",
    ],
    codeExample: `import { StatusIndicator } from "@cogentic/ds"

<StatusIndicator variant="online" />
<StatusIndicator variant="busy" pulse />
<StatusIndicator variant="offline" size="lg" />`,
  },
  "striped-bar": {
    status: "deprecated",
    description:
      'Deprecated — use WaffleChart with mode="bar" instead. Alias kept for backwards compatibility.',
    since: "0.3.0",
    importStatement: 'import { StripedBar } from "@cogentic/ds"',
    dos: [
      "Use for proportional breakdowns (exposure, allocation, composition)",
      "Pair with a legend below showing segment labels and percentages",
      "Use semantic colors that match your risk/category meanings",
    ],
    donts: [
      "Don't use for progress — use Progress instead",
      "Don't use more than 5-6 segments — it becomes hard to read",
      "Don't use without a legend — colors alone are insufficient",
    ],
    codeExample: `import { StripedBar } from "@cogentic/ds"

<StripedBar
  segments={[
    { value: 45, color: "#f87171", label: "Sanctions" },
    { value: 25, color: "#fb923c", label: "Mixer" },
    { value: 15, color: "#facc15", label: "Darknet" },
  ]}
  stripes={60}
  animated
  duration={800}
/>`,
  },
  "waffle-chart": {
    status: "new",
    description:
      "Canvas-based animated proportional chart with two modes: grid (waffle squares) and bar (horizontal stripes).",
    since: "0.5.0",
    importStatement: 'import { WaffleChart } from "@cogentic/ds"',
    dos: [
      "Use grid mode for part-to-whole comparisons where magnitude matters",
      "Use bar mode for compact inline breakdowns",
      "Pair with a legend showing segment labels and percentages",
      "Use the animate prop for entry animations on scroll",
    ],
    donts: [
      "Don't use more than 5-6 segments — too many colors become hard to read",
      "Don't use without a legend — colors alone are insufficient",
      "Don't use for continuous data — use LineChart or AreaChart instead",
    ],
    codeExample: `import { WaffleChart } from "@cogentic/ds"

// Grid mode (default)
<WaffleChart
  segments={[
    { value: 45, color: "#f87171", label: "Sanctions" },
    { value: 25, color: "#fb923c", label: "Mixer" },
  ]}
  animate
/>

// Bar mode
<WaffleChart
  mode="bar"
  segments={[
    { value: 45, color: "#f87171", label: "Sanctions" },
    { value: 25, color: "#fb923c", label: "Mixer" },
  ]}
  stripes={80}
/>`,
  },
  "risk-gauge": {
    status: "new",
    description: "Segmented bar gauge for displaying risk scores or trust levels.",
    since: "0.4.0",
    importStatement: 'import { RiskGauge } from "@cogentic/ds"',
    dos: ["Use tier to communicate severity semantically", "Provide a label for context"],
    donts: [
      "Don't use for progress indicators — use Progress instead",
      "Don't use arbitrary tier names — stick to predefined tiers",
    ],
    codeExample: `import { RiskGauge } from "@cogentic/ds"

<RiskGauge score={75} tier="high" label="Risk Level" />
<RiskGauge score={90} tier="critical" size="lg" label="Trust Score" />`,
  },
  "fade-in": {
    status: "stable",
    description: "CSS scroll-triggered fade-up via IntersectionObserver.",
    since: "0.1.0",
    importStatement: 'import { FadeIn } from "@cogentic/ds"',
    dos: [
      "Use for content that should animate on scroll",
      "Stagger delays for sequential elements",
    ],
    donts: [
      "Don't animate above-the-fold content — it should be visible immediately",
      "Don't use on critical interactive elements",
    ],
    codeExample: `import { FadeIn } from "@cogentic/ds"

<FadeIn delay={200}>
  <Card>Fades in on scroll</Card>
</FadeIn>`,
  },
  marquee: {
    status: "stable",
    description: "Infinite horizontal scroll with fade edges.",
    since: "0.1.0",
    importStatement: 'import { Marquee } from "@cogentic/ds"',
    dos: ["Use for logo walls or testimonial tickers", "Set a comfortable speed (30-60s duration)"],
    donts: [
      "Don't use for important content users need to read",
      "Don't use for interactive elements",
    ],
    codeExample: `import { Marquee } from "@cogentic/ds"

<Marquee duration={40}>
  <Logo1 /><Logo2 /><Logo3 />
</Marquee>`,
  },
  typewriter: {
    status: "stable",
    description: "Line-by-line code/text reveal animation.",
    since: "0.1.0",
    importStatement: 'import { Typewriter } from "@cogentic/ds"',
    dos: [
      "Use for code demos and terminal-style reveals",
      "Keep the content short enough to maintain interest",
    ],
    donts: ["Don't use for body text — it's too slow to read"],
  },
  "animated-counter": {
    status: "stable",
    description: "Animated numeric value with easing.",
    since: "0.1.0",
    importStatement: 'import { AnimatedCounter } from "@cogentic/ds"',
    dos: ["Use for KPI displays and stat sections", "Trigger on scroll visibility for best effect"],
    donts: ["Don't use for rapidly updating values — it can't keep up"],
    codeExample: `import { AnimatedCounter } from "@cogentic/ds"

<AnimatedCounter value={1234} duration={2000} />`,
  },
  "streaming-cards": {
    status: "stable",
    description: "Sequential card reveal with AnimatePresence.",
    since: "0.1.0",
    importStatement: 'import { StreamingCards } from "@cogentic/ds"',
    dos: [
      "Use for onboarding flows or feature showcases",
      "Keep the number of cards manageable (3-6)",
    ],
    donts: ["Don't use for content that users need to see all at once"],
  },

  // ── Charts ──
  "area-chart": {
    status: "new",
    description:
      "Filled area chart with gradient support, stacking, and multi-series. Built on Recharts with automatic tooltip and legend integration.",
    since: "0.2.4",
    importStatement: 'import { AreaChart } from "@cogentic/ds/charts"',
    dos: [
      "Use gradient fill (default) for a polished look",
      "Enable stacked mode when comparing parts of a whole over time",
      "Show legend when displaying multiple series",
    ],
    donts: [
      "Don't use for categorical data — use BarChart instead",
      "Don't stack more than 3-4 series (becomes unreadable)",
    ],
    codeExample: `import { AreaChart } from "@cogentic/ds/charts"

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
    importStatement: 'import { BarChart } from "@cogentic/ds/charts"',
    dos: [
      "Use horizontal mode for long category labels",
      "Set radius for rounded bar corners (default 4px)",
      "Use stacked mode when comparing compositions",
    ],
    donts: ["Don't use too many series without a legend"],
    codeExample: `import { BarChart } from "@cogentic/ds/charts"

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
    importStatement: 'import { LineChart } from "@cogentic/ds/charts"',
    dos: [
      "Use 'natural' curve for smooth data, 'step' for discrete changes",
      "Show dots when there are few data points",
      "Hide dots when there are many data points (>20)",
    ],
    donts: ["Don't plot more than 5 lines on one chart"],
    codeExample: `import { LineChart } from "@cogentic/ds/charts"

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
    importStatement: 'import { PieChart } from "@cogentic/ds/charts"',
    dos: [
      "Use donut mode with a center label for KPI-style displays",
      "Keep slices to 5-7 max for readability",
      "Use the config to map names to colours",
    ],
    donts: [
      "Don't use for time-series data — use LineChart or AreaChart",
      "Don't use tiny slices — aggregate into 'Other'",
    ],
    codeExample: `import { PieChart } from "@cogentic/ds/charts"

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
    importStatement: 'import { RadialChart } from "@cogentic/ds/charts"',
    dos: [
      "Use for comparing entities across 5-8 dimensions",
      "Enable legend when comparing multiple data keys",
    ],
    donts: ["Don't use for fewer than 3 dimensions", "Don't use for time-series data"],
    codeExample: `import { RadialChart } from "@cogentic/ds/charts"

<RadialChart
  data={data}
  config={config}
  angleKey="subject"
  dataKeys={["current", "previous"]}
  showLegend
/>`,
  },

  // ── Workflow ──
  "workflow-canvas": {
    status: "new",
    description:
      "Interactive canvas powered by React Flow for building visual workflows. Wraps ReactFlow with sensible defaults (pan-on-scroll, fit-view, delete keys) and a dotted background.",
    since: "0.2.4",
    importStatement: 'import { Canvas } from "@cogentic/ds"',
    dos: [
      "Set layout='vertical' for top-to-bottom flows (default) or 'horizontal' for left-to-right",
      "Provide nodeTypes and edgeTypes maps for custom node/edge rendering",
      "Use fitView with padding for initial viewport",
      "Wrap in a fixed-height container — Canvas fills its parent",
    ],
    donts: [
      "Don't nest a Canvas inside another Canvas",
      "Don't forget to import '@xyflow/react/dist/style.css' (Canvas does this internally)",
      "Don't use raw ReactFlow when Canvas provides the themed wrapper",
    ],
    codeExample: `import { Canvas, WorkflowNode, SolidEdge } from "@cogentic/ds"

const nodes = [
  { id: "1", type: "custom", position: { x: 0, y: 0 }, data: { label: "Start" } },
  { id: "2", type: "custom", position: { x: 0, y: 200 }, data: { label: "End" } },
]
const edges = [{ id: "e1-2", source: "1", target: "2", type: "solid" }]

<Canvas
  nodes={nodes}
  edges={edges}
  nodeTypes={{ custom: MyNode }}
  edgeTypes={{ solid: SolidEdge }}
  layout="vertical"
  fitView
/>`,
  },
  "workflow-node": {
    status: "new",
    description:
      "Card-style workflow node with header (icon, title, status pill), collapsible body, label-value rows, dotted separators, and configurable handles. Supports default, selected, and dotted states via CVA.",
    since: "0.2.4",
    importStatement: `import {
  WorkflowNode,
  WorkflowNodeContent,
  WorkflowNodeRow,
  WorkflowNodeSeparator,
} from "@cogentic/ds"`,
    dos: [
      "Use the state prop ('default' | 'selected' | 'dotted') for visual states",
      "Use handles={{ target: true, source: true }} to show connection handles",
      "Use WorkflowNodeRow for structured label/value pairs inside the body",
      "Use collapsible prop for nodes with lots of detail",
      "Use the icon prop with a coloured square for the best visual effect",
    ],
    donts: [
      "Don't render handles outside a Canvas — use HandleBoundary or omit the handles prop",
      "Don't put too many rows in a single node — consider splitting into multiple nodes",
      "Don't use the dotted state for active nodes — it's for placeholders",
    ],
    codeExample: `import { WorkflowNode, WorkflowNodeRow } from "@cogentic/ds"
import { Mail } from "lucide-react"

<WorkflowNode
  state="default"
  icon={<Mail />}
  title="Send Email"
  status="TRIGGER"
  handles={{ target: true, source: true }}
  collapsible
>
  <WorkflowNodeRow label="To" value="user@example.com" />
  <WorkflowNodeRow label="Subject" value="Welcome!" />
</WorkflowNode>`,
  },
  "workflow-edge": {
    status: "new",
    description:
      "Themed edge components for connecting workflow nodes. Includes Solid, Dotted, Dashed, Animated (travelling dot), and Temporary (drag preview) variants.",
    since: "0.2.4",
    importStatement: `import {
  SolidEdge,
  DottedEdge,
  DashedEdge,
  AnimatedEdge,
  TemporaryEdge,
} from "@cogentic/ds"`,
    dos: [
      "Register edge types in the edgeTypes prop of Canvas",
      "Use Solid for standard connections, Dotted for optional paths",
      "Use Animated for active/in-progress connections",
      "Use Temporary as the edge type during drag operations",
      "Pass data.label to show a label pill on the edge midpoint",
      "Pass data.color to override the edge stroke colour",
    ],
    donts: [
      "Don't use WorkflowEdge namespace directly as an edge type — use individual exports (SolidEdge, etc.)",
      "Don't mix too many edge types in a single workflow — keep it visually consistent",
    ],
    codeExample: `import { SolidEdge, AnimatedEdge, TemporaryEdge } from "@cogentic/ds"

const edgeTypes = {
  solid: SolidEdge,
  animated: AnimatedEdge,
  temporary: TemporaryEdge,
}

// Edge with a label
const edges = [{
  id: "e1",
  source: "1",
  target: "2",
  type: "solid",
  data: { label: "Success" },
}]`,
  },
  "workflow-connection": {
    status: "new",
    description:
      "Connection line shown while dragging a new edge between nodes. Supports default, dotted, dashed, and animated variants with auto-detected vertical/horizontal flow.",
    since: "0.2.4",
    importStatement: `import {
  WorkflowConnection,
  WorkflowConnectionDotted,
  WorkflowConnectionAnimated,
} from "@cogentic/ds"`,
    dos: [
      "Pass as connectionLineComponent prop to Canvas",
      "Match the connection style to your edge style for visual consistency",
      "Provide an onConnect handler to persist new connections",
    ],
    donts: [
      "Don't forget onConnect — without it, connections won't be saved",
      "Don't use connection lines outside a Canvas context",
    ],
    codeExample: `import { Canvas, WorkflowConnectionAnimated } from "@cogentic/ds"
import { addEdge } from "@xyflow/react"

const [edges, setEdges] = useState([])
const onConnect = (conn) => setEdges(prev => addEdge(conn, prev))

<Canvas
  connectionLineComponent={WorkflowConnectionAnimated}
  onConnect={onConnect}
  ...
/>`,
  },
  "workflow-controls": {
    status: "new",
    description:
      "Zoom and fit-view controls overlay for the workflow canvas. Renders in the bottom-left corner by default.",
    since: "0.2.4",
    importStatement: 'import { WorkflowControls } from "@cogentic/ds"',
    dos: [
      "Place as a child of Canvas",
      "Use when the workflow may be zoomed or panned extensively",
    ],
    donts: ["Don't render outside a Canvas — it depends on ReactFlow context"],
    codeExample: `import { Canvas, WorkflowControls } from "@cogentic/ds"

<Canvas nodes={nodes} edges={edges} ...>
  <WorkflowControls />
</Canvas>`,
  },
  "workflow-panel": {
    status: "new",
    description:
      "Positioned overlay panel for workflow metadata, actions, or status. Renders as a card anchored to a corner of the canvas.",
    since: "0.2.4",
    importStatement: 'import { WorkflowPanel } from "@cogentic/ds"',
    dos: [
      "Place as a child of Canvas",
      "Use position prop ('top-left', 'top-right', 'bottom-left', 'bottom-right')",
      "Use for workflow info, toolbox, or action buttons",
      "Keep panel content compact — it overlays the canvas",
    ],
    donts: [
      "Don't put large forms or modals inside a panel — use a dialog instead",
      "Don't render outside a Canvas",
    ],
    codeExample: `import { Canvas, WorkflowPanel } from "@cogentic/ds"

<Canvas ...>
  <WorkflowPanel position="top-left">
    <div className="p-2 text-xs">
      <p className="font-semibold">Workflow Info</p>
      <p>Nodes: 5 · Edges: 4</p>
    </div>
  </WorkflowPanel>
</Canvas>`,
  },
  "workflow-toolbar": {
    status: "new",
    description:
      "Floating toolbar that appears when a workflow node is selected. Positioned below the node by default. Use for quick actions like edit, delete, or duplicate.",
    since: "0.2.4",
    importStatement: 'import { WorkflowToolbar } from "@cogentic/ds"',
    dos: [
      "Render inside a custom node component (as a child of WorkflowNode)",
      "Add icon buttons for common actions (edit, delete, copy)",
      "Keep the toolbar compact — 2-4 actions max",
    ],
    donts: [
      "Don't render outside a ReactFlow node — it uses NodeToolbar internally",
      "Don't put text-heavy content in the toolbar — use a panel or dialog",
    ],
    codeExample: `import { WorkflowNode, WorkflowToolbar } from "@cogentic/ds"
import { CopyIcon, Trash2Icon, SettingsIcon } from "lucide-react"

function MyNode({ data }) {
  return (
    <WorkflowNode title={data.title} handles={{ target: true, source: true }}>
      <WorkflowToolbar>
        <button><CopyIcon className="size-3.5" /></button>
        <button><SettingsIcon className="size-3.5" /></button>
        <button><Trash2Icon className="size-3.5" /></button>
      </WorkflowToolbar>
    </WorkflowNode>
  )
}`,
  },
  "workflow-gate": {
    status: "new",
    description:
      "Decision gate for conditional branching in workflows. Diamond shape for logic gates (IF/ELSE, Switch, Merge), circle for Delay and End. Supports branch labels that appear as pills beside the gate.",
    since: "0.2.4",
    importStatement: 'import { WorkflowGate } from "@cogentic/ds"',
    dos: [
      "Use type='if-else' for conditional branching with left/right outputs",
      "Use the branches prop to show labelled pills (e.g. 'Is True' / 'If False')",
      "Pass an icon for visual clarity — GitBranch for if-else, Route for switch, etc.",
      "Use handles for connection points (top/bottom/left/right)",
      "Use selected state to highlight the active gate",
    ],
    donts: [
      "Don't use gates for regular processing steps — use WorkflowNode instead",
      "Don't put long text in branch labels — keep them to 2-3 words",
      "Don't render handles outside a Canvas context",
    ],
    codeExample: `import { WorkflowGate } from "@cogentic/ds"
import { GitBranch } from "lucide-react"

<WorkflowGate
  type="if-else"
  icon={<GitBranch />}
  branches={{ left: "Is True", right: "If False" }}
  handles={{ top: true, left: true, right: true }}
/>`,
  },
  "workflow-label": {
    status: "new",
    description:
      "Floating annotation pill for labelling edges, nodes, or workflow states. Colour-coded variants for different statuses.",
    since: "0.2.4",
    importStatement: 'import { WorkflowLabel } from "@cogentic/ds"',
    dos: [
      "Use on edges via data.label for inline annotations",
      "Use variant to communicate status (success, warning, error, muted)",
      "Keep labels short — 1-2 words",
    ],
    donts: [
      "Don't use as a general-purpose badge — use Badge component instead",
      "Don't put long descriptions in labels",
    ],
    codeExample: `import { WorkflowLabel } from "@cogentic/ds"

<WorkflowLabel variant="success">Approved</WorkflowLabel>
<WorkflowLabel variant="error">Failed</WorkflowLabel>
<WorkflowLabel variant="muted">Skipped</WorkflowLabel>`,
  },
  "workflow-minimap": {
    status: "new",
    description:
      "A themed minimap overlay for the workflow canvas. Wraps React Flow's MiniMap with Cogentic design tokens.",
    since: "0.2.4",
    importStatement: 'import { WorkflowMinimap } from "@cogentic/ds"',
    dos: [
      "Place inside a WorkflowCanvas for a birds-eye navigation overview",
      "Use for large workflows where users might lose orientation",
    ],
    donts: [
      "Don't render outside a ReactFlow provider",
      "Don't use on small/simple workflows where it adds clutter",
    ],
    codeExample: `import { WorkflowCanvas, WorkflowMinimap } from "@cogentic/ds"

<WorkflowCanvas nodes={nodes} edges={edges}>
  <WorkflowMinimap />
</WorkflowCanvas>`,
  },
  "workflow-group": {
    status: "new",
    description:
      "A dashed container for visually grouping related workflow nodes. Supports colour variants and a floating label badge.",
    since: "0.2.4",
    importStatement: 'import { WorkflowGroup } from "@cogentic/ds"',
    dos: [
      "Use to visually group related nodes (e.g. a retry loop, parallel branch)",
      "Provide a short label to describe the group's purpose",
      "Use colour variants to differentiate group types",
    ],
    donts: [
      "Don't nest groups deeply — keep hierarchy flat",
      "Don't use as a generic container outside workflow context",
    ],
    codeExample: `import { WorkflowGroup } from "@cogentic/ds"
import { Layers } from "lucide-react"

<WorkflowGroup
  variant="primary"
  label="Retry Loop"
  icon={<Layers />}
>
  {children}
</WorkflowGroup>`,
  },
  "workflow-handle": {
    status: "new",
    description:
      "A standalone styled connection handle for workflow nodes. Auto-detects position from layout context and includes an error boundary for safe rendering outside ReactFlow.",
    since: "0.2.4",
    importStatement: 'import { WorkflowHandle } from "@cogentic/ds"',
    dos: [
      "Use inside custom node components for connection points",
      "Let position auto-detect from WorkflowContext layout direction",
      "Override position prop when you need non-standard handle placement",
    ],
    donts: [
      "Don't use HandleBoundary directly unless building a custom handle",
      "Don't set both auto-detect and explicit position — pick one",
    ],
    codeExample: `import { WorkflowHandle } from "@cogentic/ds"

function CustomNode() {
  return (
    <div className="rounded-lg border bg-card p-4">
      <WorkflowHandle type="target" />
      <span>My Node</span>
      <WorkflowHandle type="source" />
    </div>
  )
}`,
  },
  // ── AI / Chatbot ──
  shimmer: {
    status: "new",
    description:
      "Animated shimmer text effect for loading states. Renders a gradient animation across text content.",
    importStatement: 'import { Shimmer } from "@cogentic/ds/chatbot"',
    dos: [
      "Use for AI-generated text that's still loading or streaming",
      "Keep shimmer text short — a few words that hint at what's coming",
      "Use the `as` prop to match the expected final element (h2, span, etc.)",
    ],
    donts: [
      "Don't use on non-text elements — it relies on bg-clip-text",
      "Don't show shimmer for more than a few seconds — switch to a skeleton or spinner",
      "Don't use alongside a separate loading spinner on the same content",
    ],
    codeExample: `import { Shimmer } from "@cogentic/ds/chatbot"

<Shimmer duration={2}>Generating response...</Shimmer>
<Shimmer as="span" duration={3}>Loading</Shimmer>`,
  },
  suggestion: {
    status: "new",
    description: "Clickable suggestion pills for prompting user actions in a chat interface.",
    importStatement: 'import { Suggestions, Suggestion } from "@cogentic/ds/chatbot"',
    dos: [
      "Show 2–5 relevant suggestions based on conversation context",
      "Keep suggestion text concise — under 40 characters",
      "Update suggestions dynamically as the conversation progresses",
      "Place below the latest assistant message or in the empty state",
    ],
    donts: [
      "Don't show suggestions while the AI is still responding",
      "Don't use generic suggestions that don't relate to the current context",
      "Don't show more than 6 suggestions — it overwhelms the user",
    ],
    codeExample: `import { Suggestions, Suggestion } from "@cogentic/ds/chatbot"

<Suggestions>
  <Suggestion onClick={() => send("Summarize this")}>Summarize this</Suggestion>
  <Suggestion onClick={() => send("Explain more")}>Explain more</Suggestion>
</Suggestions>`,
  },
  reasoning: {
    status: "new",
    description:
      "Collapsible reasoning/thinking panel. Shows AI chain-of-thought or reasoning steps.",
    importStatement:
      'import { Reasoning, ReasoningTrigger, ReasoningContent } from "@cogentic/ds/chatbot"',
    dos: [
      "Use to show AI thinking process for transparency",
      "Start collapsed by default — most users don't need to see reasoning",
      "Use font-mono for the reasoning text to distinguish from the response",
      "Show duration or a streaming indicator when reasoning is in progress",
    ],
    donts: [
      "Don't show reasoning for simple, obvious responses",
      "Don't put the final answer inside the reasoning panel",
      "Don't use for error messages — use Callout or Alert instead",
    ],
    codeExample: `import { Reasoning, ReasoningTrigger, ReasoningContent } from "@cogentic/ds/chatbot"

<Reasoning>
  <ReasoningTrigger />
  <ReasoningContent>
    Let me think about this step by step...
  </ReasoningContent>
</Reasoning>`,
  },
  sources: {
    status: "new",
    description:
      "Collapsible citation sources panel. Display references and links used to generate a response.",
    importStatement:
      'import { Sources, SourcesTrigger, SourcesContent, Source } from "@cogentic/ds/chatbot"',
    dos: [
      "Show source count in the trigger text (e.g. '3 sources')",
      "Include title and description for each source for scannability",
      "Use favicon images when available for visual recognition",
      "Place directly after the response that cites these sources",
    ],
    donts: [
      "Don't show sources if the response is purely generative with no references",
      "Don't link to sources the user can't access (paywalled, internal)",
      "Don't duplicate sources — deduplicate before rendering",
    ],
    codeExample: `import { Sources, SourcesTrigger, SourcesContent, Source } from "@cogentic/ds/chatbot"

<Sources>
  <SourcesTrigger>3 sources</SourcesTrigger>
  <SourcesContent>
    <Source href="https://example.com" title="Example" description="A description" />
  </SourcesContent>
</Sources>`,
  },
  attachments: {
    status: "new",
    description:
      "File attachment display for chat messages. Supports image, video, audio, and generic file types.",
    importStatement: 'import { Attachments, Attachment } from "@cogentic/ds/chatbot"',
    dos: [
      "Set the correct `type` prop for proper icon and preview rendering",
      "Provide `url` for image attachments to show thumbnails",
      "Include `onRemove` for user-uploaded attachments that haven't been sent yet",
      "Truncate long filenames — the component handles this via CSS",
    ],
    donts: [
      "Don't allow attachments without file type validation",
      "Don't show remove buttons on attachments in sent messages",
      "Don't render image previews for files larger than 5MB without lazy loading",
    ],
    codeExample: `import { Attachments, Attachment } from "@cogentic/ds/chatbot"

<Attachments>
  <Attachment name="report.pdf" type="file" />
  <Attachment name="photo.jpg" type="image" url="/photo.jpg" onRemove={() => {}} />
</Attachments>`,
  },
  "inline-citation": {
    status: "new",
    description:
      "Inline citation with hover card. Shows a numbered superscript that reveals source details on hover.",
    importStatement: 'import { InlineCitation } from "@cogentic/ds/chatbot"',
    dos: [
      "Number citations sequentially within a single response",
      "Wrap only the relevant phrase, not the entire sentence",
      "Always provide both title and href for the hover card",
      "Use for factual claims that benefit from source attribution",
    ],
    donts: [
      "Don't cite every sentence — only key claims and data points",
      "Don't use sequential numbers that skip (e.g. 1, 3, 5)",
      "Don't nest citations inside other interactive elements",
    ],
    codeExample: `import { InlineCitation } from "@cogentic/ds/chatbot"

<p>
  This is a fact
  <InlineCitation index={1} href="https://example.com" title="Source" description="A reliable source">
    supported by research
  </InlineCitation>.
</p>`,
  },
  message: {
    status: "new",
    description:
      "Chat message bubble with role-based styling. Compound component with avatar, content, actions, and branching.",
    importStatement:
      'import { Message, MessageContent, MessageResponse, MessageActions } from "@cogentic/ds/chatbot"',
    dos: [
      "Always set the `from` prop to get correct alignment and bubble styling",
      "Use MessageAvatar for visual identity — initials, icon, or image",
      "Show MessageActions on hover for a clean default view",
      "Use MessageCopyAction for all assistant responses",
      "Support markdown in MessageResponse for rich formatting",
    ],
    donts: [
      "Don't show feedback actions (thumbs up/down) on user messages",
      "Don't render empty MessageActions — hide when no actions are needed",
      "Don't put interactive form elements inside MessageResponse",
      "Don't use system role for error messages — use Callout instead",
    ],
    codeExample: `import {
  Message, MessageAvatar, MessageContent,
  MessageResponse, MessageActions, MessageCopyAction
} from "@cogentic/ds/chatbot"

<Message from="assistant">
  <MessageAvatar>AI</MessageAvatar>
  <MessageContent>
    <MessageResponse>Hello! How can I help you today?</MessageResponse>
    <MessageActions>
      <MessageCopyAction content="Hello! How can I help you today?" />
    </MessageActions>
  </MessageContent>
</Message>`,
  },
  conversation: {
    status: "new",
    description:
      "Auto-scrolling conversation container with empty state and scroll-to-bottom button.",
    importStatement:
      'import { Conversation, ConversationContent, ConversationEmptyState } from "@cogentic/ds/chatbot"',
    dos: [
      "Set an explicit height on the Conversation container (h-[500px], h-screen, etc.)",
      "Use ConversationEmptyState when there are no messages",
      "Include suggestions in the empty state to help users get started",
      "Add ConversationDownload for long conversations users may want to save",
    ],
    donts: [
      "Don't nest Conversation inside another scroll container",
      "Don't render the scroll-to-bottom button when already at bottom (handled automatically)",
      "Don't put the PromptInput inside Conversation — place it as a sibling below",
    ],
    codeExample: `import { Conversation, ConversationContent, ConversationEmptyState } from "@cogentic/ds/chatbot"

<Conversation className="h-[500px]">
  <ConversationContent>
    {messages.length === 0 ? (
      <ConversationEmptyState />
    ) : (
      messages.map(msg => <Message key={msg.id} ... />)
    )}
  </ConversationContent>
</Conversation>`,
  },
  "prompt-input": {
    status: "new",
    description:
      "Composable chat input with auto-resizing textarea, file attachments, and submit button.",
    importStatement:
      'import { PromptInput, PromptInputTextarea, PromptInputFooter, PromptInputSubmit } from "@cogentic/ds/chatbot"',
    dos: [
      "Always include PromptInputSubmit for clear submit affordance",
      "Use Enter to submit, Shift+Enter for newline (built-in behaviour)",
      "Show PromptInputFiles above the textarea when files are attached",
      "Disable the input during loading with the isLoading prop",
      "Place the input at the bottom of the page, sticky if needed",
    ],
    donts: [
      "Don't omit the submit button and rely solely on keyboard shortcuts",
      "Don't allow unlimited file uploads — set reasonable limits",
      "Don't hide the attach button if file uploads are supported",
    ],
    codeExample: `import {
  PromptInput, PromptInputBody, PromptInputTextarea,
  PromptInputFooter, PromptInputTools, PromptInputAttachButton,
  PromptInputSubmit, PromptInputFiles
} from "@cogentic/ds/chatbot"

<PromptInput onSubmit={(msg, files) => send(msg)}>
  <PromptInputFiles />
  <PromptInputBody>
    <PromptInputTextarea />
  </PromptInputBody>
  <PromptInputFooter>
    <PromptInputTools>
      <PromptInputAttachButton />
    </PromptInputTools>
    <PromptInputSubmit />
  </PromptInputFooter>
</PromptInput>`,
  },
  "chain-of-thought": {
    status: "new",
    description:
      "Step-by-step reasoning visualization. Collapsible panel showing sequential thinking steps with search results.",
    importStatement:
      'import { ChainOfThought, ChainOfThoughtHeader, ChainOfThoughtContent, ChainOfThoughtStep } from "@cogentic/ds/chatbot"',
    dos: [
      "Number steps sequentially and update status as each completes",
      "Use descriptive step labels that explain what's happening",
      "Include search results within steps when the AI searches for information",
      "Start collapsed by default for non-technical users",
    ],
    donts: [
      "Don't show more than 8-10 steps — group related operations",
      "Don't update step statuses out of order",
      "Don't use for simple responses that don't involve multi-step reasoning",
    ],
    codeExample: `import {
  ChainOfThought, ChainOfThoughtHeader,
  ChainOfThoughtContent, ChainOfThoughtStep
} from "@cogentic/ds/chatbot"

<ChainOfThought defaultOpen>
  <ChainOfThoughtHeader>Thinking...</ChainOfThoughtHeader>
  <ChainOfThoughtContent>
    <ChainOfThoughtStep step={1} status="complete">Analyzing the question</ChainOfThoughtStep>
    <ChainOfThoughtStep step={2} status="active">Searching for relevant info</ChainOfThoughtStep>
    <ChainOfThoughtStep step={3} status="pending">Formulating response</ChainOfThoughtStep>
  </ChainOfThoughtContent>
</ChainOfThought>`,
  },
  confirmation: {
    status: "new",
    description:
      "Tool approval request UI. Shows a confirmation card when AI wants to execute a tool or action.",
    importStatement:
      'import { Confirmation, ConfirmationRequest, ConfirmationActions, ConfirmationAction } from "@cogentic/ds/chatbot"',
    dos: [
      "Clearly describe the action being requested in the title",
      "Show the exact input/parameters in the description for transparency",
      "Update status to 'accepted' or 'rejected' after the user decides",
      "Use destructive variant for the reject action button",
    ],
    donts: [
      "Don't auto-approve actions without user consent for sensitive operations",
      "Don't show confirmation for read-only operations that have no side effects",
      "Don't allow re-approving an already rejected action without a new request",
    ],
    codeExample: `import {
  Confirmation, ConfirmationRequest,
  ConfirmationActions, ConfirmationAction
} from "@cogentic/ds/chatbot"

<Confirmation status="pending">
  <ConfirmationRequest
    title="Run database query"
    description="SELECT * FROM users WHERE active = true"
  />
  <ConfirmationActions>
    <ConfirmationAction onClick={approve}>Approve</ConfirmationAction>
    <ConfirmationAction variant="destructive" onClick={reject}>Reject</ConfirmationAction>
  </ConfirmationActions>
</Confirmation>`,
  },
  context: {
    status: "new",
    description:
      "Token and context window usage display. Shows progress bars for token consumption.",
    importStatement:
      'import { Context, ContextHeader, ContextBody, ContextUsage } from "@cogentic/ds/chatbot"',
    dos: [
      "Show context usage proactively when approaching limits (>70%)",
      "Use human-readable numbers (e.g. 45K / 128K) for large token counts",
      "Warn users with colour changes when usage is high (handled automatically at 80%)",
    ],
    donts: [
      "Don't show context usage by default in simple chat UIs — only for power users",
      "Don't update the display more than once per message to avoid flicker",
      "Don't show raw byte counts — convert to tokens or messages",
    ],
    codeExample: `import { Context, ContextHeader, ContextBody, ContextUsage } from "@cogentic/ds/chatbot"

<Context>
  <ContextHeader>Context Usage</ContextHeader>
  <ContextBody>
    <ContextUsage label="Tokens" used={45000} total={128000} />
    <ContextUsage label="Messages" used={12} total={50} />
  </ContextBody>
</Context>`,
  },
  checkpoint: {
    status: "new",
    description:
      "Conversation bookmark marker. Visual indicator for saved points in a conversation.",
    importStatement:
      'import { Checkpoint, CheckpointIcon, CheckpointTrigger } from "@cogentic/ds/chatbot"',
    dos: [
      "Use meaningful labels that describe what was accomplished at this point",
      "Insert between messages at natural breakpoints in the conversation",
      "Make the trigger clickable to scroll to or restore that point",
    ],
    donts: [
      "Don't create checkpoints more often than every 5-10 messages",
      "Don't use vague labels like 'Checkpoint 1' — describe the milestone",
      "Don't checkpoint trivial exchanges",
    ],
    codeExample: `import { Checkpoint, CheckpointIcon, CheckpointTrigger } from "@cogentic/ds/chatbot"

<Checkpoint>
  <CheckpointIcon />
  <CheckpointTrigger>Checkpoint: Initial analysis complete</CheckpointTrigger>
</Checkpoint>`,
  },
  plan: {
    status: "new",
    description:
      "Collapsible execution plan display. Shows AI-generated plans with steps and actions.",
    importStatement:
      'import { Plan, PlanTrigger, PlanContent, PlanFooter, PlanAction } from "@cogentic/ds/chatbot"',
    dos: [
      "Show the plan before execution so users can review and approve",
      "Use PlanFooter with an action button for explicit user confirmation",
      "Keep plan steps concise and scannable",
      "Start expanded so users see the plan immediately",
    ],
    donts: [
      "Don't execute the plan automatically without user approval",
      "Don't show more than 10 steps — break into phases if needed",
      "Don't mix plan display with task progress — use Task component for execution tracking",
    ],
    codeExample: `import { Plan, PlanTrigger, PlanContent, PlanFooter, PlanAction } from "@cogentic/ds/chatbot"

<Plan>
  <PlanTrigger>Implementation Plan</PlanTrigger>
  <PlanContent>
    <p>1. Create the database schema</p>
    <p>2. Build the API endpoints</p>
    <p>3. Write tests</p>
  </PlanContent>
  <PlanFooter>
    <PlanAction>Execute Plan</PlanAction>
  </PlanFooter>
</Plan>`,
  },
  task: {
    status: "new",
    description:
      "Collapsible task progress display. Shows task items with status indicators (pending, running, complete, error).",
    importStatement:
      'import { Task, TaskTrigger, TaskContent, TaskItem } from "@cogentic/ds/chatbot"',
    dos: [
      "Update task item statuses in real-time as work progresses",
      "Use the running status with spinner for the currently active item",
      "Show the overall task status in the trigger (running, complete, error)",
      "Expand by default when a task is actively running",
    ],
    donts: [
      "Don't show completed tasks as running",
      "Don't have more than one item with 'running' status simultaneously",
      "Don't remove failed items — show them with error status for debugging",
    ],
    codeExample: `import { Task, TaskTrigger, TaskContent, TaskItem } from "@cogentic/ds/chatbot"

<Task>
  <TaskTrigger status="running">Installing dependencies</TaskTrigger>
  <TaskContent>
    <TaskItem status="complete">Downloaded packages</TaskItem>
    <TaskItem status="running">Linking dependencies</TaskItem>
    <TaskItem status="pending">Running post-install scripts</TaskItem>
  </TaskContent>
</Task>`,
  },
  tool: {
    status: "new",
    description: "Collapsible tool invocation display. Shows tool name, status, input, and output.",
    importStatement:
      'import { Tool, ToolHeader, ToolContent, ToolInput, ToolOutput } from "@cogentic/ds/chatbot"',
    dos: [
      "Show the tool name in monospace font for technical clarity",
      "Display the status badge (pending, running, success, error) in the header",
      "Format input and output as JSON or code for readability",
      "Start collapsed — expand only when the user wants details",
    ],
    donts: [
      "Don't show raw, unformatted input/output — pretty-print JSON",
      "Don't truncate output without a 'show more' option",
      "Don't show tool invocations for internal/hidden tools the user doesn't need to see",
    ],
    codeExample: `import { Tool, ToolHeader, ToolContent, ToolInput, ToolOutput } from "@cogentic/ds/chatbot"

<Tool>
  <ToolHeader name="search_documents" status="success" />
  <ToolContent>
    <ToolInput>{"query": "compliance regulations"}</ToolInput>
    <ToolOutput>Found 3 matching documents...</ToolOutput>
  </ToolContent>
</Tool>`,
  },
  queue: {
    status: "new",
    description: "Structured task/message queue list. Collapsible sections with status indicators.",
    importStatement:
      'import { QueueSection, QueueSectionTrigger, QueueList, QueueItem, QueueItemIndicator, QueueItemContent } from "@cogentic/ds/chatbot"',
    dos: [
      "Group related items into QueueSections with descriptive labels",
      "Show the item count in the section trigger",
      "Use status indicators consistently (pending, active, complete, error)",
      "Add descriptions to items that need more context",
    ],
    donts: [
      "Don't put more than 20 items in a single section — paginate or group",
      "Don't mix item types (tasks, messages, files) in the same section",
      "Don't use the queue for real-time data — it's for discrete items",
    ],
    codeExample: `import {
  QueueSection, QueueSectionTrigger, QueueList,
  QueueItem, QueueItemIndicator, QueueItemContent
} from "@cogentic/ds/chatbot"

<QueueSection>
  <QueueSectionTrigger>Pending Tasks (3)</QueueSectionTrigger>
  <QueueList>
    <QueueItem>
      <QueueItemIndicator status="active" />
      <QueueItemContent>Process uploaded files</QueueItemContent>
    </QueueItem>
  </QueueList>
</QueueSection>`,
  },
  "model-selector": {
    status: "new",
    description:
      "Searchable model picker dropdown. Select AI models with logos, descriptions, and grouping.",
    importStatement:
      'import { ModelSelector, ModelSelectorTrigger, ModelSelectorContent, ModelSelectorItem } from "@cogentic/ds/chatbot"',
    dos: [
      "Group models by provider for easy scanning",
      "Include a short description of each model's strengths",
      "Show the currently selected model name in the trigger",
      "Include a search input when offering more than 5 models",
    ],
    donts: [
      "Don't show deprecated or unavailable models",
      "Don't allow selecting a model mid-conversation without warning",
      "Don't use technical model IDs as display names — use human-friendly names",
    ],
    codeExample: `import {
  ModelSelector, ModelSelectorTrigger, ModelSelectorContent,
  ModelSelectorInput, ModelSelectorList, ModelSelectorGroup,
  ModelSelectorItem
} from "@cogentic/ds/chatbot"

<ModelSelector value="claude-opus-4" onValueChange={setModel}>
  <ModelSelectorTrigger>Claude Opus 4</ModelSelectorTrigger>
  <ModelSelectorContent>
    <ModelSelectorInput />
    <ModelSelectorList>
      <ModelSelectorGroup label="Anthropic">
        <ModelSelectorItem value="claude-opus-4" name="Claude Opus 4" description="Most capable" />
        <ModelSelectorItem value="claude-sonnet-4" name="Claude Sonnet 4" description="Best balance" />
      </ModelSelectorGroup>
    </ModelSelectorList>
  </ModelSelectorContent>
</ModelSelector>`,
  },
  timeline: {
    status: "stable",
    description:
      "Vertical timeline for displaying chronological events like audit trails, case history, or activity logs.",
    since: "0.3.0",
    importStatement:
      'import { Timeline, TimelineItem, TimelineDot, TimelineContent, TimelineTitle, TimelineTime } from "@cogentic/ds"',
    dos: [
      "Use for chronological event sequences (audit trails, case history)",
      "Add icons to TimelineDot for visual categorisation",
      "Include descriptions for important events",
      "Use colour-coded dots to indicate event severity or type",
    ],
    donts: [
      "Don't use for step-by-step processes — use Stepper instead",
      "Don't overload with too many events — paginate or virtualise long lists",
      "Don't omit timestamps — they're essential for audit context",
    ],
    codeExample: `import {
  Timeline, TimelineItem, TimelineDot,
  TimelineContent, TimelineTitle, TimelineTime,
} from "@cogentic/ds"

<Timeline>
  <TimelineItem>
    <TimelineDot />
    <TimelineContent>
      <TimelineTitle>KYC verification passed</TimelineTitle>
      <TimelineTime>2 hours ago</TimelineTime>
    </TimelineContent>
  </TimelineItem>
  <TimelineItem>
    <TimelineDot>
      <CheckCircle className="size-3 text-emerald-600" />
    </TimelineDot>
    <TimelineContent>
      <TimelineTitle>Case approved</TimelineTitle>
      <TimelineTime>Just now</TimelineTime>
    </TimelineContent>
  </TimelineItem>
</Timeline>`,
  },
  // ── New components (v0.5.0) ──
  "audit-log": {
    status: "new",
    description:
      "Chronological feed of system or user actions. Ideal for compliance trails and activity history.",
    since: "0.5.0",
    importStatement: `import {
  AuditLog, AuditLogEntry, AuditLogIcon,
  AuditLogContent, AuditLogMessage, AuditLogMeta,
  AuditLogTime, AuditLogDetail,
} from "@cogentic/ds"`,
    dos: [
      "Use for compliance audit trails and activity logs",
      "Include timestamps and actor information on every entry",
      "Use the action variant to semantically categorize entries",
      "Add AuditLogDetail for supplementary context when needed",
    ],
    donts: [
      "Don't use for real-time chat — use CommentThread instead",
      "Don't omit timestamps — audit logs require temporal context",
      "Don't nest AuditLog components",
    ],
    codeExample: `import {
  AuditLog, AuditLogEntry, AuditLogIcon,
  AuditLogContent, AuditLogMessage, AuditLogMeta,
  AuditLogTime, AuditLogDetail,
} from "@cogentic/ds"
import { PlusIcon } from "lucide-react"

<AuditLog>
  <AuditLogEntry action="create">
    <AuditLogIcon>
      <PlusIcon className="size-3.5 text-emerald-600" />
    </AuditLogIcon>
    <AuditLogContent>
      <AuditLogMessage>
        <span className="font-medium">Sarah Chen</span> created case CASE-001
      </AuditLogMessage>
      <AuditLogMeta>
        <span>Compliance Team</span>
        <AuditLogTime>Mar 15, 9:30 AM</AuditLogTime>
      </AuditLogMeta>
      <AuditLogDetail>Flagged for unusual transaction pattern.</AuditLogDetail>
    </AuditLogContent>
  </AuditLogEntry>
</AuditLog>`,
  },
  "comment-thread": {
    status: "new",
    description:
      "Threaded conversation UI with avatars, timestamps, and reply indentation. For case discussions and review comments.",
    since: "0.5.0",
    importStatement: `import {
  CommentThread, Comment, CommentAvatar, CommentBody,
  CommentHeader, CommentAuthor, CommentTime,
  CommentContent, CommentActions,
} from "@cogentic/ds"`,
    dos: [
      "Use for case discussions and review comments",
      "Show avatar initials or images for each commenter",
      "Use the reply prop for indented replies",
      "Include timestamps on every comment",
    ],
    donts: [
      "Don't use for audit logs — use AuditLog instead",
      "Don't nest CommentThread components",
      "Don't omit CommentAuthor — comments need attribution",
    ],
    codeExample: `import {
  CommentThread, Comment, CommentAvatar,
  CommentBody, CommentHeader, CommentAuthor,
  CommentTime, CommentContent,
} from "@cogentic/ds"

<CommentThread>
  <Comment>
    <CommentAvatar>SC</CommentAvatar>
    <CommentBody>
      <CommentHeader>
        <CommentAuthor>Sarah Chen</CommentAuthor>
        <CommentTime>Mar 15, 9:30 AM</CommentTime>
      </CommentHeader>
      <CommentContent>Recommending escalation.</CommentContent>
    </CommentBody>
  </Comment>
  <Comment reply>
    <CommentAvatar>JL</CommentAvatar>
    <CommentBody>
      <CommentHeader>
        <CommentAuthor>James Lee</CommentAuthor>
        <CommentTime>Mar 15, 10:15 AM</CommentTime>
      </CommentHeader>
      <CommentContent>Agreed, updating risk level.</CommentContent>
    </CommentBody>
  </Comment>
</CommentThread>`,
  },
  "filter-bar": {
    status: "new",
    description:
      "Horizontal bar of removable filter chips with a clear-all action. For data table and list filtering.",
    since: "0.5.0",
    importStatement: `import { FilterBar, FilterChip, FilterClear } from "@cogentic/ds"`,
    dos: [
      "Place above the data table or list it filters",
      "Show label:value pairs for clarity",
      "Include a Clear All action when multiple filters are active",
      "Use onRemove to allow individual chip removal",
    ],
    donts: [
      "Don't use for static tags — use Tag or Badge instead",
      "Don't show the filter bar when no filters are active",
      "Don't put form inputs inside FilterBar — use it for applied filter display only",
    ],
    codeExample: `import { FilterBar, FilterChip, FilterClear } from "@cogentic/ds"

<FilterBar>
  <FilterChip label="Status" value="Under Review" onRemove={() => {}} />
  <FilterChip label="Risk Level" value="High" onRemove={() => {}} />
  <FilterClear onClick={() => {}} />
</FilterBar>`,
  },
  "split-pane": {
    status: "new",
    description:
      "Resizable split-view layout built on react-resizable-panels. For master-detail and side-by-side views.",
    since: "0.5.0",
    importStatement: `import { SplitPane, SplitPanePanel, SplitPaneDivider } from "@cogentic/ds"`,
    dos: [
      "Use for master-detail layouts (list + detail view)",
      "Set sensible minSize values to prevent panels from collapsing",
      "Use direction='vertical' for top/bottom splits",
      "Wrap in a container with a fixed height",
    ],
    donts: [
      "Don't nest more than two levels of split panes",
      "Don't use without a fixed-height parent container",
      "Don't use for simple two-column layouts — use Grid instead",
    ],
    codeExample: `import { SplitPane, SplitPanePanel, SplitPaneDivider } from "@cogentic/ds"

<div className="h-[500px]">
  <SplitPane direction="horizontal">
    <SplitPanePanel defaultSize={35} minSize={20}>
      <div className="p-4">Left panel</div>
    </SplitPanePanel>
    <SplitPaneDivider />
    <SplitPanePanel defaultSize={65} minSize={30}>
      <div className="p-4">Right panel</div>
    </SplitPanePanel>
  </SplitPane>
</div>`,
  },
  "step-progress": {
    status: "new",
    description:
      "Vertical or horizontal step indicator with complete, current, and upcoming states. For multi-step workflows.",
    since: "0.5.0",
    importStatement: `import {
  StepProgress, StepProgressItem, StepProgressIndicator,
  StepProgressConnector, StepProgressContent,
  StepProgressTitle, StepProgressDescription,
} from "@cogentic/ds"`,
    dos: [
      "Use for multi-step workflows like KYC, onboarding, or review processes",
      "Mark completed steps with status='complete' for the checkmark indicator",
      "Include StepProgressConnector between steps for visual continuity",
      "Use StepProgressDescription for additional context on each step",
    ],
    donts: [
      "Don't use for navigation tabs — use Tabs instead",
      "Don't use more than 7 steps — simplify the workflow or group steps",
      "Don't omit the status prop — every step needs a clear state",
    ],
    codeExample: `import {
  StepProgress, StepProgressItem, StepProgressIndicator,
  StepProgressConnector, StepProgressContent,
  StepProgressTitle, StepProgressDescription,
} from "@cogentic/ds"

<StepProgress>
  <StepProgressItem status="complete">
    <StepProgressIndicator status="complete" />
    <StepProgressConnector data-complete="true" />
    <StepProgressContent>
      <StepProgressTitle>Identity Verification</StepProgressTitle>
      <StepProgressDescription>ID verified successfully.</StepProgressDescription>
    </StepProgressContent>
  </StepProgressItem>
  <StepProgressItem status="current">
    <StepProgressIndicator status="current" step={2} />
    <StepProgressConnector />
    <StepProgressContent>
      <StepProgressTitle>Document Review</StepProgressTitle>
    </StepProgressContent>
  </StepProgressItem>
  <StepProgressItem status="upcoming">
    <StepProgressIndicator status="upcoming" step={3} />
    <StepProgressContent>
      <StepProgressTitle>Approval</StepProgressTitle>
    </StepProgressContent>
  </StepProgressItem>
</StepProgress>`,
  },
}

export const statusConfig: Record<ComponentStatus, { label: string; color: string }> = {
  stable: { label: "Stable", color: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" },
  beta: { label: "Beta", color: "bg-amber-500/15 text-amber-700 dark:text-amber-400" },
  new: { label: "New", color: "bg-blue-500/15 text-blue-700 dark:text-blue-400" },
  deprecated: { label: "Deprecated", color: "bg-red-500/15 text-red-700 dark:text-red-400" },
}
