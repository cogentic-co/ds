import type { ComponentMeta } from "../index"

// ── Feedback ──
export const feedbackMeta: Record<string, ComponentMeta> = {
  alert: {
    status: "stable",
    description: "Inline notification for important messages.",
    since: "0.1.0",
    importStatement: 'import { Alert, AlertTitle, AlertDescription } from "@cogentic-co/ds/alert"',
    dos: [
      "Use variant to communicate severity (default, warning, destructive)",
      "Keep alert messages concise and actionable",
    ],
    donts: [
      "Don't use for transient messages — use toast (Sonner)",
      "Don't stack multiple alerts — consolidate the message",
    ],
    codeExample: `import { Alert, AlertTitle, AlertDescription } from "@cogentic-co/ds/alert"

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
      'import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogAction, AlertDialogCancel } from "@cogentic-co/ds/alert-dialog"',
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
      'import { Dialog, DialogTrigger, DialogPopup, DialogTitle, DialogDescription, DialogClose } from "@cogentic-co/ds/dialog"',
    dos: [
      "Always include DialogTitle for accessibility",
      "Use for focused tasks that need user attention",
    ],
    donts: [
      "Don't use for simple confirmations — use AlertDialog",
      "Don't put long forms in dialogs — use a full page instead",
    ],
    codeExample: `import { Dialog, DialogTrigger, DialogPopup, DialogTitle, DialogDescription, DialogClose } from "@cogentic-co/ds/dialog"

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
    importStatement:
      'import { Drawer, DrawerTrigger, DrawerContent } from "@cogentic-co/ds/drawer"',
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
      'import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@cogentic-co/ds/sheet"',
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
    importStatement:
      'import { Popover, PopoverTrigger, PopoverContent } from "@cogentic-co/ds/popover"',
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
    importStatement:
      'import { Tooltip, TooltipTrigger, TooltipContent } from "@cogentic-co/ds/tooltip"',
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
    importStatement:
      'import { HoverCard, HoverCardTrigger, HoverCardContent } from "@cogentic-co/ds/hover-card"',
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
    importStatement: 'import { toast } from "@cogentic-co/ds/sonner"',
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
    importStatement: 'import { Progress } from "@cogentic-co/ds/progress"',
    dos: [
      "Show a numeric percentage alongside the bar when possible",
      "Use for determinate progress (uploads, multi-step flows)",
    ],
    donts: ["Don't use for indeterminate loading — use Spinner"],
    codeExample: `import { Progress } from "@cogentic-co/ds/progress"

<Progress value={66} />`,
  },
  skeleton: {
    status: "stable",
    description: "Placeholder loading animation for content.",
    since: "0.1.0",
    importStatement: 'import { Skeleton } from "@cogentic-co/ds/skeleton"',
    dos: [
      "Match the skeleton shape to the expected content",
      "Use multiple skeletons to represent a full layout",
    ],
    donts: [
      "Don't use for interactive loading — use Spinner or Progress",
      "Don't show skeletons longer than 3 seconds without feedback",
    ],
    codeExample: `import { Skeleton } from "@cogentic-co/ds/skeleton"

<Skeleton className="h-4 w-[200px]" />
<Skeleton className="h-4 w-[150px]" />`,
  },
  spinner: {
    status: "stable",
    description: "Animated loading indicator.",
    since: "0.1.0",
    importStatement: 'import { Spinner } from "@cogentic-co/ds/spinner"',
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
    importStatement: 'import { EntityHeader } from "@cogentic-co/ds/entity-header"',
    dos: [
      "Use for entity detail pages (companies, users, organisations)",
      "Provide meta items for key attributes",
    ],
    donts: [
      "Don't nest EntityHeader inside Card — it's designed to be standalone",
      "Don't use for page headers without an entity context",
    ],
    codeExample: `import { EntityHeader } from "@cogentic-co/ds/entity-header"

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
    importStatement: 'import { LogoVasp } from "@cogentic-co/ds/logo-vasp"',
    dos: ["Use currentColor for theming — wrap in a coloured container if needed"],
    donts: ["Don't stretch or distort — use the size prop"],
    codeExample: `import { LogoVasp } from "@cogentic-co/ds/logo-vasp"

<LogoVasp size="lg" />`,
  },
  "search-input": {
    status: "new",
    description: "Generic search combobox with async results, keyboard nav, and custom rendering.",
    since: "0.4.0",
    importStatement: 'import { SearchInput } from "@cogentic-co/ds/search-input"',
    dos: [
      "Provide an async onSearch callback",
      "Use renderItem for custom result rendering",
      "Handle onSelect for navigation or actions",
    ],
    donts: [
      "Don't use for static/predefined options — use Combobox instead",
      "Don't forget to handle the loading state in your search function",
    ],
    codeExample: `import { SearchInput } from "@cogentic-co/ds/search-input"

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
    importStatement: 'import { SegmentedControl } from "@cogentic-co/ds/segmented-control"',
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
    codeExample: `import { SegmentedControl } from "@cogentic-co/ds/segmented-control"

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
    importStatement: 'import { Empty } from "@cogentic-co/ds/empty"',
    dos: [
      "Include a clear CTA to help users take the next step",
      "Use a relevant icon to communicate the empty state",
    ],
    donts: [
      "Don't leave empty states without guidance",
      "Don't use generic messages like 'Nothing here'",
    ],
  },
}
