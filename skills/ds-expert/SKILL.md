---
name: ds-expert
description: Expert guide for building UIs with the Cogentic Design System (@cogentic/ds). Covers all components, blocks, charts, workflow, hooks, design tokens, and patterns.
---
# Cogentic Design System Expert

You are an expert in building UIs with the Cogentic Design System (`@cogentic/ds`) and Tailwind CSS v4.

## Package

- **Package:** `@cogentic/ds` (GitHub Packages, `@cogentic` scope)
- **Peer deps:** React 18/19, Next.js 15+, Tailwind CSS v4
- **Import styles:** `@import "@cogentic/ds/styles.css"` in your globals.css
- **Tailwind scanning:** `@source "../node_modules/@cogentic/ds/dist"` in globals.css

## Entry Points

| Import path | Contents |
|---|---|
| `@cogentic/ds` | All UI components, hooks, utils, animation constants |
| `@cogentic/ds/styles.css` | Design tokens CSS (must be imported) |
| `@cogentic/ds/animations/*` | Individual product animations (code-split) |
| `@cogentic/ds/blocks/*` | Blocks: pricing-table, stat-card, feature-section, hero-section, auth-form |
| `@cogentic/ds/charts` | Chart variants (AreaChart, BarChart, LineChart, PieChart, RadialChart) |
| `@cogentic/ds/workflow` | React Flow workflow components (requires @xyflow/react) |

## Available Components

### Layout & Structure
- `AppShell` — Full app shell with sidebar nav, breadcrumbs, user menu, header actions. Props: `logo`, `nav`, `footerNav`, `user`, `breadcrumbs`, `headerActions`, `linkComponent`, `children`
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` — Composable card
- `Grid`, `Col` — Responsive grid (1-12 columns), Col with `span` prop
- `Separator` — Horizontal/vertical divider
- `AspectRatio` — Constrain child to aspect ratio
- `ScrollArea` — Custom scrollbar area
- `Resizable`, `ResizablePanel`, `ResizableHandle` — Resizable panels
- `Direction` — RTL/LTR context provider
- `VisuallyHidden` — Screen-reader-only content

### Data Display
- `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell` — HTML table primitives
- `DataTable` — Full-featured data table with TanStack Table (sorting, filtering, pagination, selection, virtualization)
- `Badge` — Status/category label with variants: default, secondary, destructive, outline
- `Tag` — Interactive badge with variants (default/primary/secondary/destructive/success), optional `onRemove`
- `Stat`, `StatLabel`, `StatValue`, `StatTrend` — Composable KPI display
- `DescriptionList`, `DescriptionTerm`, `DescriptionDetails` — Key-value pairs
- `Avatar`, `AvatarImage`, `AvatarFallback` — User avatar
- `Skeleton` — Loading placeholder
- `Empty` — Empty state with icon, title, description, action
- `Kbd` — Keyboard shortcut display
- `CodeBlock` — Code display with language header, line numbers, copy button

### Forms & Input
- `Button` — Variants: default, destructive, outline, secondary, ghost, link. Sizes: default, sm, lg, icon
- `ButtonGroup` — Group buttons together
- `Input` — Text input with variants
- `InputGroup`, `InputGroupText`, `InputGroupAddon` — Input with addons
- `Textarea` — Multi-line text input
- `Label` — Form label
- `Field`, `FieldLabel`, `FieldDescription`, `FieldMessage` — Form field wrapper with label, description, error
- `Form` — TanStack Form integration
- `Checkbox` — Checkbox with indeterminate support
- `RadioGroup`, `RadioGroupItem` — Radio button group
- `Switch` — Toggle switch
- `Select`, `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectValue` — Dropdown select
- `NativeSelect` — Native HTML select
- `Combobox` — Searchable select with keyboard nav
- `Slider` — Range slider
- `NumberInput` — Increment/decrement number input
- `Calendar` — Date picker calendar
- `DatePicker` — Date picker with popover
- `InputOTP`, `InputOTPGroup`, `InputOTPSlot`, `InputOTPSeparator` — OTP code input
- `FileUpload` — Drag-and-drop file upload with accept/multiple/maxSize
- `InlineEdit` — Click-to-edit text field
- `SegmentedControl` — iOS-style pill selector

### Feedback & Overlay
- `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter` — Modal dialog
- `AlertDialog` — Confirmation dialog
- `Sheet`, `SheetTrigger`, `SheetContent` — Slide-out panel
- `Drawer` — Bottom sheet (mobile-friendly)
- `Popover`, `PopoverTrigger`, `PopoverContent` — Floating popover
- `HoverCard` — Hover-triggered card
- `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider` — Tooltip
- `DropdownMenu` — Context/dropdown menu
- `ContextMenu` — Right-click menu
- `Menubar` — Menu bar
- `Alert` — Inline alert with variants: default, destructive
- `Callout` — Info/warning/danger/tip boxes with auto icon
- `Sonner` — Toast notifications (wraps sonner)
- `Progress` — Progress bar
- `Spinner` — Loading spinner
- `LoadingOverlay` — Overlay children during loading
- `CopyButton` — Copy-to-clipboard button

### Navigation
- `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` — Tab navigation
- `NavigationMenu` — Top-level navigation
- `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator` — Breadcrumb trail
- `Pagination` — Page navigation
- `Command`, `CommandInput`, `CommandList`, `CommandItem`, `CommandGroup` — Command palette (cmdk)
- `Sidebar` + sub-components — Full sidebar system
- `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` — Expandable sections
- `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent` — Single collapsible
- `Stepper`, `Step`, `StepSeparator` — Multi-step indicator
- `Timeline`, `TimelineItem`, `TimelineDot`, `TimelineContent`, `TimelineTitle`, `TimelineTime` — Vertical timeline

### Animation
- `FadeIn` — CSS scroll-triggered fade-up
- `Marquee` — Infinite horizontal scroll with fade edges
- `Typewriter` — Line-by-line text reveal
- `AnimatedCounter` — Animated number with easing
- `StreamingCards` — Sequential card reveal with AnimatePresence
- `BgShader` — Canvas dithered animated background
- `Item` — Staggered list item (wraps motion.div)

### Toggle
- `Toggle` — Single toggle button
- `ToggleGroup`, `ToggleGroupItem` — Group of toggles

### Typography
- `H1`, `H2`, `H3`, `H4`, `P`, `Lead`, `Large`, `Small`, `Muted`, `InlineCode`, `Blockquote`, `Ul`, `Li` — Typography primitives

## Blocks (code-split)

- `PricingTable` — Pricing comparison with plan cards, feature lists, billing toggle
- `StatCard` — Dashboard KPI card with trend indicator
- `FeatureSection` — Marketing feature grid (2/3/4 columns) with icons
- `HeroSection` — Hero with variants: default, centered, split. Sizes: sm, default, lg
- `AuthForm` — Login/register/forgot-password with social buttons support

## Chart Variants (from `@cogentic/ds/charts`)

All chart components accept `data`, `config` (ChartConfig), and customize via props:
- `AreaChart` — Gradient area with optional stacking
- `BarChart` — Vertical/horizontal bars with optional stacking
- `LineChart` — Multi-line with curve types (monotone, linear, step, natural)
- `PieChart` — Pie/donut with optional center label
- `RadialChart` — Radar/spider chart

Base primitives: `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`, `ChartLegend`, `ChartLegendContent`

## Workflow Components (from `@cogentic/ds/workflow`)

Requires `@xyflow/react` as peer dependency:
- `WorkflowCanvas` — ReactFlow wrapper with defaults (panOnScroll, fitView, selectionOnDrag)
- `WorkflowNode` + sub-components (Header, Title, Description, Action, Content, Footer) — Card-based node
- `WorkflowEdge`, `TemporaryEdge`, `AnimatedEdge` — Edge variants
- `WorkflowConnection` — Connection line component
- `WorkflowControls` — Zoom/fit controls
- `WorkflowPanel` — Positioned panel overlay
- `WorkflowToolbar` — Node toolbar

## Hooks

| Hook | Signature | Description |
|---|---|---|
| `useMediaQuery` | `(query: string) => boolean` | SSR-safe media query |
| `useMobile` | `() => boolean` | Is viewport < 768px |
| `useClipboard` | `(timeout?: number) => { copied, copy }` | Copy to clipboard |
| `useDebounce` | `(value: T, delay: number) => T` | Debounce a value |
| `useLocalStorage` | `(key, initial) => [value, setValue]` | Persist to localStorage |
| `useDisclosure` | `() => { isOpen, onOpen, onClose, onToggle }` | Modal/drawer state |
| `useIntersectionObserver` | `(options) => { ref, entry, isIntersecting }` | IntersectionObserver |
| `useAnimationTimer` | `(ms) => elapsed` | Visibility-gated timer |
| `useCycleIndex` | `(length, ms) => index` | Cycling index |
| `useCarousel` | `(count, opts) => state` | Carousel state |

## Design Tokens

Semantic color tokens (use these, never hardcode):
- `bg-background`, `text-foreground` — Page background/text
- `bg-card`, `text-card-foreground` — Card surfaces
- `bg-primary`, `text-primary-foreground` — Primary actions
- `bg-secondary`, `text-secondary-foreground` — Secondary actions
- `bg-muted`, `text-muted-foreground` — Subdued elements
- `bg-accent`, `text-accent-foreground` — Highlights
- `bg-destructive`, `text-destructive-foreground` — Errors/danger
- `border-border` — Default borders
- `bg-cogentic-green` — Brand green accent
- `text-success` — Success states
- Colors use OKLch color space
- Dark mode via `.dark` class (not @media)

### Shadows
- `shadow-soft` — Standard elevation
- `shadow-light` — Subtle elevation

### Radii
- `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl` — Based on `--radius: 0.625rem`

### Fonts
- `font-sans` — Geist (body text)
- `font-mono` — JetBrains Mono (code)

## Patterns & Best Practices

### className overrides
All components accept `className`. Use it for one-off overrides:
```tsx
<Button className="rounded-full px-8">Custom</Button>
<Card className="border-primary">Highlighted</Card>
```

### Composition
Prefer composing small components over monolithic ones:
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Subtitle</CardDescription>
  </CardHeader>
  <CardContent>
    <Field>
      <FieldLabel>Email</FieldLabel>
      <Input type="email" />
      <FieldMessage>Required</FieldMessage>
    </Field>
  </CardContent>
  <CardFooter>
    <Button>Submit</Button>
  </CardFooter>
</Card>
```

### AppShell for app pages
Every app page should use AppShell:
```tsx
import { AppShell } from "@cogentic/ds"
import Link from "next/link"

<AppShell
  logo={{ icon: <Logo />, title: "My App" }}
  nav={[{ title: "Main", items: [{ label: "Dashboard", href: "/", icon: Home }] }]}
  user={{ name: "James", email: "user@example.com" }}
  breadcrumbs={[{ label: "Dashboard" }]}
  linkComponent={Link}
  onLogout={() => signOut()}
>
  {children}
</AppShell>
```

### Forms
Use Field components for consistent form layouts:
```tsx
<Field>
  <FieldLabel>Name</FieldLabel>
  <FieldDescription>Your full name</FieldDescription>
  <Input placeholder="Jane Doe" />
  <FieldMessage variant="error">Name is required</FieldMessage>
</Field>
```

### Data Tables
```tsx
import { DataTable } from "@cogentic/ds"

const columns = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
]

<DataTable columns={columns} data={users} />
```

### Empty States
```tsx
<Empty
  icon={<Inbox className="size-12" />}
  title="No items yet"
  description="Get started by creating your first item."
  action={<Button>Create item</Button>}
/>
```

### Dark Mode
Components automatically support dark mode. The consuming app controls the theme via `.dark` class on a parent element. Use semantic tokens (not hardcoded colors) so everything adapts.

### Icons
Use Lucide React icons:
```tsx
import { Home, Settings, ChevronRight } from "lucide-react"
```

### Animation
```tsx
<FadeIn delay={200}>
  <Card>Fades in on scroll</Card>
</FadeIn>

<Marquee duration={30}>
  {logos.map(logo => <img key={logo.name} src={logo.src} />)}
</Marquee>
```

### Code-Splitting
For heavy components, import from specific entry points:
```tsx
import dynamic from "next/dynamic"
const PricingTable = dynamic(() => import("@cogentic/ds/blocks/pricing-table").then(m => m.PricingTable))
const { WorkflowCanvas } = await import("@cogentic/ds/workflow")
```

## Common Patterns

### Dashboard page
```tsx
<AppShell ...>
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <H2>Dashboard</H2>
      <Button>New Report</Button>
    </div>
    <Grid columns={4}>
      <Col><StatCard title="Revenue" value="$12,400" trend={12} /></Col>
      <Col><StatCard title="Users" value="1,234" trend={-3} /></Col>
      <Col><StatCard title="Orders" value="89" trend={5} /></Col>
      <Col><StatCard title="Conversion" value="3.2%" trend={0.5} /></Col>
    </Grid>
    <Card>
      <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
      <CardContent><DataTable columns={columns} data={data} /></CardContent>
    </Card>
  </div>
</AppShell>
```

### Settings page
```tsx
<AppShell ...>
  <div className="max-w-2xl space-y-8">
    <H2>Settings</H2>
    <Card>
      <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <Field>
          <FieldLabel>Name</FieldLabel>
          <Input defaultValue="James" />
        </Field>
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input type="email" defaultValue="user@example.com" />
        </Field>
      </CardContent>
      <CardFooter><Button>Save changes</Button></CardFooter>
    </Card>
  </div>
</AppShell>
```

### Landing page hero
```tsx
import { HeroSection } from "@cogentic/ds/blocks/hero-section"

<HeroSection
  variant="centered"
  size="lg"
  badge="New Release"
  title="Build faster with Cogentic"
  description="The compliance platform that keeps up with you."
  primaryAction={{ label: "Get Started", href: "/signup" }}
  secondaryAction={{ label: "Learn More", href: "/docs" }}
/>
```
