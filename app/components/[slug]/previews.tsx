"use client"

import { addEdge, type Connection, type Edge } from "@xyflow/react"
import { addDays } from "date-fns"
import {
  AlertCircleIcon,
  AlertTriangleIcon,
  BoldIcon,
  CalendarIcon,
  CheckCircle,
  ChevronsUpDownIcon,
  ClipboardIcon,
  Clock,
  CopyIcon,
  DownloadIcon,
  EditIcon,
  GitBranch,
  GitMerge,
  InboxIcon,
  ItalicIcon,
  MailIcon,
  MessageCircleIcon,
  Package,
  PlusIcon,
  Route,
  ScissorsIcon,
  SearchIcon,
  SettingsIcon,
  ShieldCheckIcon,
  StopCircle,
  TerminalIcon,
  Timer,
  Trash2Icon,
  UnderlineIcon,
  UserIcon,
} from "lucide-react"
import { useCallback, useState } from "react"
import type { DateRange } from "react-day-picker"
import { Bar, BarChart, XAxis } from "recharts"
import { toast } from "sonner"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { ApprovalActions } from "@/components/ui/approval-actions"
import { AsciiShader } from "@/components/ui/ascii-shader"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  AuditLog,
  AuditLogContent,
  AuditLogDetail,
  AuditLogEntry,
  AuditLogIcon,
  AuditLogMessage,
  AuditLogMeta,
  AuditLogTime,
} from "@/components/ui/audit-log"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BgShader } from "@/components/ui/bg-shader"
import { BlockyShader } from "@/components/ui/blocky-shader"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Calendar } from "@/components/ui/calendar"
import { Callout } from "@/components/ui/callout"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { CaseCard } from "@/components/ui/case-card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Checkbox } from "@/components/ui/checkbox"
import { CodeBlock } from "@/components/ui/code-block"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Comment,
  CommentActions,
  CommentAuthor,
  CommentAvatar,
  CommentBody,
  CommentContent,
  CommentHeader,
  CommentThread,
  CommentTime,
} from "@/components/ui/comment-thread"
import { ComplianceScore } from "@/components/ui/compliance-score"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { CopyButton } from "@/components/ui/copy-button"
import {
  type ColumnDef,
  DataTable,
  DataTableColumnHeader,
  DataTableFacetedFilter,
  DataTablePagination,
  DataTableToolbar,
  useDataTable,
} from "@/components/ui/data-table"
import { DatePicker, DateRangePicker } from "@/components/ui/date-picker"
import { DeadlineCountdown } from "@/components/ui/deadline-countdown"
import {
  DescriptionList,
  DescriptionListDetail,
  DescriptionListItem,
  DescriptionListTerm,
} from "@/components/ui/description-list"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { EntityHeader } from "@/components/ui/entity-header"
import { FadeIn } from "@/components/ui/fade-in"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { FileUpload } from "@/components/ui/file-upload"
import { FilterBar, FilterChip, FilterClear } from "@/components/ui/filter-bar"
import { useForm } from "@/components/ui/form"
import { Col, Grid } from "@/components/ui/grid"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { InlineEdit } from "@/components/ui/inline-edit"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"
import { Kbd } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import { LoadingOverlay } from "@/components/ui/loading-overlay"
import { LogoVasp } from "@/components/ui/logo-vasp"
import { Marquee } from "@/components/ui/marquee"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { NumberInput } from "@/components/ui/number-input"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { PolicyBanner } from "@/components/ui/policy-banner"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { RiskGauge } from "@/components/ui/risk-gauge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SearchInput } from "@/components/ui/search-input"
import { SegmentedControl } from "@/components/ui/segmented-control"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Spinner } from "@/components/ui/spinner"
import { SplitPane, SplitPaneDivider, SplitPanePanel } from "@/components/ui/split-pane"
import { Stat, StatLabel, StatTrend, StatValue } from "@/components/ui/stat"
import { StatusIndicator } from "@/components/ui/status-indicator"
import {
  StepProgress,
  StepProgressConnector,
  StepProgressContent,
  StepProgressDescription,
  StepProgressIndicator,
  StepProgressItem,
  StepProgressTitle,
} from "@/components/ui/step-progress"
import { StreamingCards } from "@/components/ui/streaming-cards"
import { StripedBar } from "@/components/ui/striped-bar"
import { SubtleShader } from "@/components/ui/subtle-shader"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tag } from "@/components/ui/tag"
import { Textarea } from "@/components/ui/textarea"
import {
  Timeline,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Typewriter } from "@/components/ui/typewriter"
import {
  Blockquote,
  H1,
  H2,
  H3,
  H4,
  InlineCode,
  Large,
  Lead,
  List,
  Muted,
  P,
  Prose,
  Small,
} from "@/components/ui/typography"
import { VisuallyHidden } from "@/components/ui/visually-hidden"
import { WaffleChart } from "@/components/ui/waffle-chart"
import { AreaChart as AreaChartComponent } from "@/src/charts/area-chart"
import { BarChart as BarChartComponent } from "@/src/charts/bar-chart"
import { LineChart as LineChartComponent } from "@/src/charts/line-chart"
import { PieChart as PieChartComponent } from "@/src/charts/pie-chart"
import { RadialChart as RadialChartComponent } from "@/src/charts/radial-chart"
import {
  Attachment,
  Attachments,
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtStep,
  Checkpoint,
  CheckpointIcon,
  CheckpointTrigger,
  Confirmation,
  ConfirmationAccepted,
  ConfirmationAction,
  ConfirmationActions,
  ConfirmationRequest,
  Context,
  ContextBody,
  ContextHeader,
  ContextUsage,
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  InlineCitation,
  Message,
  MessageActions,
  MessageAvatar,
  MessageContent,
  MessageCopyAction,
  MessageFeedbackActions,
  MessageRegenerateAction,
  MessageResponse,
  ModelSelector,
  ModelSelectorContent,
  ModelSelectorGroup,
  ModelSelectorInput,
  ModelSelectorItem,
  ModelSelectorList,
  ModelSelectorTrigger,
  Plan,
  PlanAction,
  PlanContent,
  PlanFooter,
  PlanTrigger,
  PromptInput,
  PromptInputAttachButton,
  PromptInputBody,
  PromptInputFiles,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  QueueItem,
  QueueItemContent,
  QueueItemDescription,
  QueueItemIndicator,
  QueueList,
  QueueSection,
  QueueSectionTrigger,
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
  Shimmer,
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
  Suggestion,
  Suggestions,
  Task,
  TaskContent,
  TaskItem,
  TaskTrigger,
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from "@/src/chatbot"
import { cn } from "@/src/lib/utils"
import {
  AnimatedEdge,
  Canvas,
  DashedEdge,
  DottedEdge,
  SolidEdge,
  TemporaryEdge,
  WorkflowConnection,
  WorkflowConnectionAnimated,
  WorkflowConnectionDashed,
  WorkflowConnectionDotted,
  WorkflowControls,
  WorkflowGate,
  WorkflowGroup,
  WorkflowHandle,
  WorkflowLabel,
  WorkflowMinimap,
  WorkflowNode,
  WorkflowNodeRow,
  WorkflowPanel,
  WorkflowToolbar,
} from "@/src/workflow"
import { type ControlDefs, ControlsPanel, Playground, useControls } from "../../controls"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="font-medium text-muted-foreground text-sm">{title}</h3>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

// ── ApprovalActions ──

const approvalActionsControlDefs = {
  requireReason: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Require Reason",
  },
  disabled: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Disabled",
  },
} satisfies ControlDefs

function ApprovalActionsPreview() {
  const controls = useControls(approvalActionsControlDefs)
  const { requireReason, disabled } = controls.values

  return (
    <div className="space-y-6">
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <ApprovalActions
            onApprove={(reason) => toast.success(`Approved${reason ? `: ${reason}` : ""}`)}
            onReject={(reason) => toast.error(`Rejected${reason ? `: ${reason}` : ""}`)}
            onEscalate={(reason) => toast.warning(`Escalated${reason ? `: ${reason}` : ""}`)}
            requireReason={requireReason}
            disabled={disabled}
          />
        </div>
      </Playground>

      <Section title="With Required Reason">
        <ApprovalActions
          onApprove={(reason) => toast.success(`Approved: ${reason}`)}
          onReject={(reason) => toast.error(`Rejected: ${reason}`)}
          onEscalate={(reason) => toast.warning(`Escalated: ${reason}`)}
          requireReason
        />
      </Section>

      <Section title="Disabled">
        <ApprovalActions onApprove={() => {}} onReject={() => {}} onEscalate={() => {}} disabled />
      </Section>
    </div>
  )
}

const buttonControlDefs = {
  variant: {
    type: "select" as const,
    options: ["default", "secondary", "destructive", "outline", "ghost", "link"],
    defaultValue: "default",
    label: "Variant",
  },
  size: {
    type: "select" as const,
    options: ["xs", "sm", "default", "lg", "icon", "icon-sm", "icon-xs", "icon-lg"],
    defaultValue: "default",
    label: "Size",
  },
  disabled: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Disabled",
  },
  label: {
    type: "text" as const,
    defaultValue: "Button",
    label: "Label",
  },
} satisfies ControlDefs

function ButtonPreview() {
  const controls = useControls(buttonControlDefs)
  const { variant, size, disabled, label } = controls.values
  const isIcon = size.startsWith("icon")

  return (
    <div className="space-y-8">
      {/* Interactive playground */}
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <Button variant={variant as "default"} size={size as "default"} disabled={disabled}>
            {isIcon ? <MailIcon /> : label}
          </Button>
        </div>
      </Playground>

      {/* Static examples */}
      <Section title="Variants">
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </Section>
      <Section title="Sizes">
        <Button size="xs">Extra Small</Button>
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
      </Section>
      <Section title="Icon sizes">
        <Button size="icon-xs">
          <MailIcon />
        </Button>
        <Button size="icon-sm">
          <MailIcon />
        </Button>
        <Button size="icon">
          <MailIcon />
        </Button>
        <Button size="icon-lg">
          <MailIcon />
        </Button>
      </Section>
      <Section title="States">
        <Button disabled>Disabled</Button>
        <Button variant="outline" disabled>
          Disabled Outline
        </Button>
      </Section>
    </div>
  )
}

const cardControlDefs = {
  padding: {
    type: "select" as const,
    options: ["default", "compact", "spacious"],
    defaultValue: "default",
    label: "Padding",
  },
  title: {
    type: "text" as const,
    defaultValue: "Card Title",
    label: "Title",
  },
  description: {
    type: "text" as const,
    defaultValue: "Card description with supporting text.",
    label: "Description",
  },
  showFooter: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Show Footer",
  },
} satisfies ControlDefs

function CardPreview() {
  const controls = useControls(cardControlDefs)
  const { padding, title, description, showFooter } = controls.values
  const paddingClass = padding === "compact" ? "p-3" : padding === "spacious" ? "p-8" : ""

  return (
    <div className="max-w-md space-y-6">
      {/* Interactive playground */}
      <Playground controls={controls}>
        <Card className={paddingClass}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">This is the card content area. You can put any content here.</p>
          </CardContent>
          {showFooter && (
            <CardFooter className="gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </CardFooter>
          )}
        </Card>
      </Playground>
    </div>
  )
}

const itemControlDefs = {
  variant: {
    type: "select" as const,
    options: ["default", "outline", "muted"],
    defaultValue: "default",
    label: "Variant",
  },
  size: {
    type: "select" as const,
    options: ["default", "sm", "xs"],
    defaultValue: "default",
    label: "Size",
  },
  showMedia: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Show Media",
  },
  showDescription: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Show Description",
  },
  showActions: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Show Actions",
  },
} satisfies ControlDefs

function ItemPreview() {
  const controls = useControls(itemControlDefs)
  const { variant, size, showMedia, showDescription, showActions } = controls.values

  return (
    <div className="max-w-lg space-y-8">
      <Playground controls={controls}>
        <Item
          variant={variant as "default" | "outline" | "muted"}
          size={size as "default" | "sm" | "xs"}
        >
          {showMedia && (
            <ItemMedia variant="icon">
              <Package />
            </ItemMedia>
          )}
          <ItemContent>
            <ItemTitle>Provider Name</ItemTitle>
            {showDescription && (
              <ItemDescription>Real-time transaction monitoring and risk scoring.</ItemDescription>
            )}
          </ItemContent>
          {showActions && (
            <ItemActions>
              <Button size="sm" variant="outline">
                Configure
              </Button>
            </ItemActions>
          )}
        </Item>
      </Playground>

      <Section title="Variants">
        <ItemGroup>
          <Item variant="default">
            <ItemMedia variant="icon">
              <SettingsIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Default</ItemTitle>
              <ItemDescription>No border, transparent background.</ItemDescription>
            </ItemContent>
          </Item>
          <Item variant="outline">
            <ItemMedia variant="icon">
              <SettingsIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Outline</ItemTitle>
              <ItemDescription>Bordered with rounded corners.</ItemDescription>
            </ItemContent>
          </Item>
          <Item variant="muted">
            <ItemMedia variant="icon">
              <SettingsIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Muted</ItemTitle>
              <ItemDescription>Subtle background fill.</ItemDescription>
            </ItemContent>
          </Item>
        </ItemGroup>
      </Section>

      <Section title="Sizes">
        <ItemGroup>
          <Item variant="outline" size="default">
            <ItemContent>
              <ItemTitle>Default size</ItemTitle>
              <ItemDescription>Standard spacing and text.</ItemDescription>
            </ItemContent>
          </Item>
          <Item variant="outline" size="sm">
            <ItemContent>
              <ItemTitle>Small size</ItemTitle>
              <ItemDescription>Compact for dense layouts.</ItemDescription>
            </ItemContent>
          </Item>
          <Item variant="outline" size="xs">
            <ItemContent>
              <ItemTitle>Extra small size</ItemTitle>
              <ItemDescription>Most compact option.</ItemDescription>
            </ItemContent>
          </Item>
        </ItemGroup>
      </Section>

      <Section title="With Header and Footer">
        <Item variant="outline">
          <ItemHeader>
            <Badge>New</Badge>
            <Muted>v2.1.0</Muted>
          </ItemHeader>
          <ItemMedia variant="icon">
            <Package />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Chainalysis KYT</ItemTitle>
            <ItemDescription>
              On-chain transaction monitoring with real-time risk scoring.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="sm" variant="outline">
              Configure
            </Button>
          </ItemActions>
          <ItemFooter>
            <Muted>Last sync 2 hours ago</Muted>
            <Muted>Healthy</Muted>
          </ItemFooter>
        </Item>
      </Section>

      <Section title="Group with Separators">
        <ItemGroup>
          <Item>
            <ItemMedia variant="icon">
              <UserIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>James Cooke</ItemTitle>
              <ItemDescription>Engineering Lead</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Badge variant="outline">Admin</Badge>
            </ItemActions>
          </Item>
          <ItemSeparator />
          <Item>
            <ItemMedia variant="icon">
              <UserIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Sarah Chen</ItemTitle>
              <ItemDescription>Compliance Analyst</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Badge variant="outline">Analyst</Badge>
            </ItemActions>
          </Item>
          <ItemSeparator />
          <Item>
            <ItemMedia variant="icon">
              <UserIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Marcus Johnson</ItemTitle>
              <ItemDescription>Risk Officer</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Badge variant="outline">Viewer</Badge>
            </ItemActions>
          </Item>
        </ItemGroup>
      </Section>

      <Section title="As Link (render prop)">
        <Item variant="outline" render={<a href="#" />}>
          <ItemMedia variant="icon">
            <Route />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Clickable Item</ItemTitle>
            <ItemDescription>
              This item renders as an anchor tag via the render prop.
            </ItemDescription>
          </ItemContent>
        </Item>
      </Section>
    </div>
  )
}

const inputControlDefs = {
  type: {
    type: "select" as const,
    options: ["text", "email", "password", "number"],
    defaultValue: "text",
    label: "Type",
  },
  placeholder: {
    type: "text" as const,
    defaultValue: "Enter value...",
    label: "Placeholder",
  },
  disabled: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Disabled",
  },
  value: {
    type: "text" as const,
    defaultValue: "",
    label: "Value",
  },
} satisfies ControlDefs

function InputPreview() {
  const controls = useControls(inputControlDefs)

  return (
    <div className="max-w-sm space-y-6">
      {/* Interactive playground */}
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <Input
            type={controls.values.type}
            placeholder={controls.values.placeholder}
            disabled={controls.values.disabled}
            value={controls.values.value}
            onChange={() => {}}
          />
        </div>
      </Playground>

      {/* Static examples */}
      <Section title="Types">
        <Input type="text" placeholder="Text input" />
        <Input type="email" placeholder="Email input" />
        <Input type="password" placeholder="Password" />
        <Input type="number" placeholder="Number" />
      </Section>
      <Section title="States">
        <Input placeholder="Disabled" disabled />
        <Input placeholder="With value" defaultValue="Hello world" />
      </Section>
      <Section title="With label">
        <div className="grid w-full gap-1.5">
          <Label htmlFor="email-demo">Email</Label>
          <Input type="email" id="email-demo" placeholder="you@example.com" />
        </div>
      </Section>
    </div>
  )
}

const badgeControlDefs = {
  variant: {
    type: "radio" as const,
    options: ["default", "secondary", "destructive", "outline"],
    defaultValue: "default",
    label: "Variant",
  },
  label: {
    type: "text" as const,
    defaultValue: "Badge",
    label: "Label",
  },
} satisfies ControlDefs

function BadgePreview() {
  const controls = useControls(badgeControlDefs)

  return (
    <div className="space-y-6">
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <Badge variant={controls.values.variant as "default"}>{controls.values.label}</Badge>
        </div>
      </Playground>

      <Section title="All Variants">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </Section>
    </div>
  )
}

const alertControlDefs = {
  variant: {
    type: "radio" as const,
    options: ["default", "warning", "destructive"],
    defaultValue: "default",
    label: "Variant",
  },
  title: {
    type: "text" as const,
    defaultValue: "Alert Title",
    label: "Title",
  },
  description: {
    type: "text" as const,
    defaultValue: "This is an alert with some information.",
    label: "Description",
  },
} satisfies ControlDefs

function AlertPreview() {
  const controls = useControls(alertControlDefs)
  const { variant, title, description } = controls.values
  const Icon =
    variant === "destructive"
      ? AlertCircleIcon
      : variant === "warning"
        ? AlertTriangleIcon
        : TerminalIcon

  return (
    <div className="max-w-lg space-y-6">
      {/* Interactive playground */}
      <Playground controls={controls}>
        <Alert variant={variant as "default"}>
          <Icon className="size-4" />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
        </Alert>
      </Playground>

      {/* Static examples */}
      <Alert>
        <TerminalIcon className="size-4" />
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>This is a default alert with some information.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTriangleIcon className="size-4" />
        <AlertTitle>Warning Alert</AlertTitle>
        <AlertDescription>This action may have unintended consequences.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircleIcon className="size-4" />
        <AlertTitle>Destructive Alert</AlertTitle>
        <AlertDescription>Something went wrong. Please try again.</AlertDescription>
      </Alert>
    </div>
  )
}

const dialogControlDefs = {
  title: {
    type: "text" as const,
    defaultValue: "Dialog Title",
    label: "Title",
  },
  description: {
    type: "text" as const,
    defaultValue: "This is a dialog description. You can put any content here.",
    label: "Description",
  },
} satisfies ControlDefs

function DialogPreview() {
  const controls = useControls(dialogControlDefs)
  const { title, description } = controls.values

  return (
    <div className="space-y-6">
      {/* Interactive playground */}
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <Dialog>
            <DialogTrigger render={<Button />}>Open Dialog</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-muted-foreground text-sm">Dialog body content goes here.</p>
              </div>
              <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
                <Button>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </Playground>
    </div>
  )
}

const tabsControlDefs = {
  variant: {
    type: "radio" as const,
    options: ["default", "line"],
    defaultValue: "default",
    label: "Variant",
  },
  defaultValue: {
    type: "select" as const,
    options: ["account", "password", "settings"],
    defaultValue: "account",
    label: "Default Tab",
  },
} satisfies ControlDefs

function TabsPreview() {
  const controls = useControls(tabsControlDefs)
  const { variant, defaultValue } = controls.values

  return (
    <div className="max-w-md space-y-6">
      {/* Interactive playground */}
      <Playground controls={controls}>
        <Tabs key={defaultValue} defaultValue={defaultValue}>
          <TabsList variant={variant as "default"}>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Manage your account settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="name-pg">Name</Label>
                  <Input id="name-pg" defaultValue="James Cooke" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="password" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your password.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="current-pg">Current password</Label>
                  <Input id="current-pg" type="password" />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="new-pg">New password</Label>
                  <Input id="new-pg" type="password" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Configure your preferences.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">Settings content here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Playground>
    </div>
  )
}

function TablePreview() {
  return (
    <div className="max-w-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            { name: "Alice Johnson", status: "Active", role: "Admin", amount: "$2,500" },
            { name: "Bob Smith", status: "Inactive", role: "User", amount: "$1,200" },
            { name: "Carol Williams", status: "Active", role: "Editor", amount: "$3,100" },
            { name: "David Brown", status: "Active", role: "User", amount: "$800" },
          ].map((row) => (
            <TableRow key={row.name}>
              <TableCell className="font-medium">{row.name}</TableCell>
              <TableCell>
                <Badge variant={row.status === "Active" ? "default" : "secondary"}>
                  {row.status}
                </Badge>
              </TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell className="text-right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

const checkboxControlDefs = {
  checked: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Checked",
  },
  disabled: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Disabled",
  },
} satisfies ControlDefs

function CheckboxPreview() {
  const controls = useControls(checkboxControlDefs)

  return (
    <div className="space-y-6">
      <Playground controls={controls}>
        <div className="flex items-center justify-center gap-2 py-4">
          <Checkbox
            id="playground-checkbox"
            checked={controls.values.checked}
            onCheckedChange={(checked) => controls.set("checked", !!checked)}
            disabled={controls.values.disabled}
          />
          <Label htmlFor="playground-checkbox">Accept terms and conditions</Label>
        </div>
      </Playground>

      <Section title="States">
        <div className="flex items-center gap-2">
          <Checkbox id="checked" defaultChecked />
          <Label htmlFor="checked">Checked</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="disabled" disabled />
          <Label htmlFor="disabled" className="text-muted-foreground">
            Disabled
          </Label>
        </div>
      </Section>
    </div>
  )
}

const separatorControlDefs = {
  orientation: {
    type: "radio" as const,
    options: ["horizontal", "vertical"],
    defaultValue: "horizontal",
    label: "Orientation",
  },
} satisfies ControlDefs

function SeparatorPreview() {
  const controls = useControls(separatorControlDefs)
  const isVertical = controls.values.orientation === "vertical"

  return (
    <div className="max-w-md space-y-6">
      <Playground controls={controls}>
        {isVertical ? (
          <div className="flex h-12 items-center gap-4 text-sm">
            <span className="font-medium">Blog</span>
            <Separator orientation="vertical" />
            <span className="font-medium">Docs</span>
            <Separator orientation="vertical" />
            <span className="font-medium">Source</span>
          </div>
        ) : (
          <div className="space-y-0">
            <div className="space-y-1 py-2">
              <p className="font-medium text-sm">Cogentic Design System</p>
              <p className="text-muted-foreground text-sm">An open-source UI component library.</p>
            </div>
            <Separator />
            <div className="flex items-center gap-4 py-2 text-sm">
              <span>Blog</span>
              <span>Docs</span>
              <span>Source</span>
            </div>
          </div>
        )}
      </Playground>
    </div>
  )
}

const textareaControlDefs = {
  placeholder: {
    type: "text" as const,
    defaultValue: "Type your message here.",
    label: "Placeholder",
  },
  disabled: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Disabled",
  },
} satisfies ControlDefs

function TextareaPreview() {
  const controls = useControls(textareaControlDefs)

  return (
    <div className="max-w-sm space-y-6">
      <Playground controls={controls}>
        <div className="grid gap-1.5">
          <Label htmlFor="playground-textarea">Message</Label>
          <Textarea
            id="playground-textarea"
            placeholder={controls.values.placeholder}
            disabled={controls.values.disabled}
          />
        </div>
      </Playground>

      <Section title="Disabled">
        <Textarea placeholder="Disabled textarea" disabled />
      </Section>
    </div>
  )
}

const switchControlDefs = {
  disabled: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Disabled",
  },
  label: {
    type: "text" as const,
    defaultValue: "Airplane mode",
    label: "Label",
  },
} satisfies ControlDefs

function SwitchPreview() {
  const controls = useControls(switchControlDefs)

  return (
    <div className="space-y-6">
      {/* Interactive playground */}
      <Playground controls={controls}>
        <div className="flex items-center justify-center gap-2 py-4">
          <Switch id="playground-switch" disabled={controls.values.disabled} />
          <Label htmlFor="playground-switch">{controls.values.label}</Label>
        </div>
      </Playground>

      {/* Static examples */}
      <div className="flex items-center gap-2">
        <Switch id="airplane" />
        <Label htmlFor="airplane">Airplane mode</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="notifications" defaultChecked />
        <Label htmlFor="notifications">Notifications (on)</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="disabled-switch" disabled />
        <Label htmlFor="disabled-switch" className="text-muted-foreground">
          Disabled
        </Label>
      </div>
    </div>
  )
}

const skeletonControlDefs = {
  shape: {
    type: "radio" as const,
    options: ["rectangle", "circle"],
    defaultValue: "rectangle",
    label: "Shape",
  },
} satisfies ControlDefs

function SkeletonPreview() {
  const controls = useControls(skeletonControlDefs)

  return (
    <div className="max-w-sm space-y-6">
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <Skeleton
            className={controls.values.shape === "circle" ? "size-12 rounded-full" : "h-4 w-48"}
          />
        </div>
      </Playground>

      <Section title="Card skeleton">
        <div className="flex items-center gap-4">
          <Skeleton className="size-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </Section>
    </div>
  )
}

const spinnerControlDefs = {
  size: {
    type: "select" as const,
    options: ["sm", "md", "lg"],
    defaultValue: "md",
    label: "Size",
  },
} satisfies ControlDefs

const spinnerSizeClasses: Record<string, string> = {
  sm: "size-3",
  md: "size-4",
  lg: "size-6",
}

function SpinnerPreview() {
  const controls = useControls(spinnerControlDefs)

  return (
    <div className="space-y-6">
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <Spinner className={spinnerSizeClasses[controls.values.size]} />
        </div>
      </Playground>
    </div>
  )
}

const progressControlDefs = {
  value: {
    type: "number" as const,
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
    label: "Value",
  },
  animate: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Animate",
  },
} satisfies ControlDefs

function ProgressPreview() {
  const controls = useControls(progressControlDefs)
  const { value, animate } = controls.values

  return (
    <div className="max-w-sm space-y-6">
      <Playground controls={controls}>
        <div className="space-y-2">
          <p className="text-muted-foreground text-sm">{value}%</p>
          <Progress key={`${animate}-${value}`} value={value} animate={animate} />
        </div>
      </Playground>

      <Section title="Animated on Mount">
        <div className="w-full space-y-4">
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">75% (animated)</p>
            <Progress value={75} animate />
          </div>
        </div>
      </Section>

      <Section title="Static">
        <div className="w-full space-y-4">
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">25%</p>
            <Progress value={25} />
          </div>
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">100%</p>
            <Progress value={100} />
          </div>
        </div>
      </Section>
    </div>
  )
}

const kbdControlDefs = {
  text: {
    type: "text" as const,
    defaultValue: "⌘K",
    label: "Text",
  },
} satisfies ControlDefs

function KbdPreview() {
  const controls = useControls(kbdControlDefs)

  return (
    <div className="space-y-6">
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <Kbd>{controls.values.text}</Kbd>
        </div>
      </Playground>

      <Section title="Single keys">
        <Kbd>⌘</Kbd>
        <Kbd>Shift</Kbd>
        <Kbd>Enter</Kbd>
        <Kbd>Esc</Kbd>
      </Section>
      <Section title="Combinations">
        <span className="flex items-center gap-1 text-sm">
          <Kbd>⌘</Kbd> + <Kbd>K</Kbd>
        </span>
        <span className="flex items-center gap-1 text-sm">
          <Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>P</Kbd>
        </span>
      </Section>
    </div>
  )
}

const accordionControlDefs = {
  multiple: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Multiple",
  },
} satisfies ControlDefs

function AccordionPreview() {
  const controls = useControls(accordionControlDefs)

  return (
    <div className="max-w-md space-y-6">
      <Playground controls={controls}>
        <Accordion key={String(controls.values.multiple)} multiple={controls.values.multiple}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles using Tailwind CSS.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It uses CSS animations for smooth open/close transitions.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Playground>
    </div>
  )
}

const tooltipControlDefs = {
  content: {
    type: "text" as const,
    defaultValue: "This is a tooltip",
    label: "Content",
  },
  side: {
    type: "select" as const,
    options: ["top", "right", "bottom", "left"],
    defaultValue: "top",
    label: "Side",
  },
} satisfies ControlDefs

function TooltipPreview() {
  const controls = useControls(tooltipControlDefs)

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <Playground controls={controls}>
          <div className="flex items-center justify-center py-8">
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" />}>Hover me</TooltipTrigger>
              <TooltipContent side={controls.values.side as "top"}>
                <p>{controls.values.content}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </Playground>
      </div>
    </TooltipProvider>
  )
}

const avatarControlDefs = {
  size: {
    type: "radio" as const,
    options: ["sm", "default", "lg"],
    defaultValue: "default",
    label: "Size",
  },
  fallback: {
    type: "text" as const,
    defaultValue: "JC",
    label: "Fallback",
  },
} satisfies ControlDefs

function AvatarPreview() {
  const controls = useControls(avatarControlDefs)

  return (
    <div className="space-y-6">
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <Avatar size={controls.values.size as "default"}>
            <AvatarFallback>{controls.values.fallback}</AvatarFallback>
          </Avatar>
        </div>
      </Playground>

      <Section title="With image">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Section>
      <Section title="Fallback">
        <Avatar>
          <AvatarFallback>JC</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>ZK</AvatarFallback>
        </Avatar>
      </Section>
    </div>
  )
}

const selectControlDefs = {
  disabled: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Disabled",
  },
  placeholder: {
    type: "text" as const,
    defaultValue: "Select a fruit",
    label: "Placeholder",
  },
} satisfies ControlDefs

function SelectPreview() {
  const controls = useControls(selectControlDefs)
  const { disabled, placeholder } = controls.values

  return (
    <div className="max-w-sm space-y-6">
      {/* Interactive playground */}
      <Playground controls={controls}>
        <div className="grid gap-1.5">
          <Label>Fruit</Label>
          <Select disabled={disabled}>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="cherry">Cherry</SelectItem>
              <SelectItem value="grape">Grape</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Playground>
    </div>
  )
}

const radioGroupControlDefs = {
  disabled: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Disabled",
  },
} satisfies ControlDefs

function RadioGroupPreview() {
  const controls = useControls(radioGroupControlDefs)

  return (
    <div className="space-y-6">
      <Playground controls={controls}>
        <RadioGroup defaultValue="comfortable" disabled={controls.values.disabled}>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">Default</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">Comfortable</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="compact" id="r3" />
            <Label htmlFor="r3">Compact</Label>
          </div>
        </RadioGroup>
      </Playground>
    </div>
  )
}

const sliderControlDefs = {
  defaultValue: {
    type: "number" as const,
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
    label: "Value",
  },
  disabled: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Disabled",
  },
} satisfies ControlDefs

function SliderPreview() {
  const controls = useControls(sliderControlDefs)

  return (
    <div className="max-w-sm space-y-6">
      <Playground controls={controls}>
        <div className="space-y-2">
          <Label>Volume</Label>
          <Slider
            key={controls.values.defaultValue}
            defaultValue={[controls.values.defaultValue]}
            max={100}
            step={1}
            disabled={controls.values.disabled}
          />
        </div>
      </Playground>

      <Section title="Range">
        <div className="w-full space-y-2">
          <Label>Range</Label>
          <Slider defaultValue={[25, 75]} max={100} step={1} />
        </div>
      </Section>
    </div>
  )
}

const labelControlDefs = {
  text: {
    type: "text" as const,
    defaultValue: "Email address",
    label: "Label Text",
  },
} satisfies ControlDefs

function LabelPreview() {
  const controls = useControls(labelControlDefs)

  return (
    <div className="space-y-6">
      <Playground controls={controls}>
        <div className="grid gap-1.5">
          <Label htmlFor="label-demo">{controls.values.text}</Label>
          <Input id="label-demo" type="email" placeholder="you@example.com" />
        </div>
      </Playground>
    </div>
  )
}

const toggleControlDefs = {
  variant: {
    type: "select" as const,
    options: ["default", "outline"],
    defaultValue: "default",
    label: "Variant",
  },
  size: {
    type: "select" as const,
    options: ["sm", "default", "lg"],
    defaultValue: "default",
    label: "Size",
  },
  disabled: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Disabled",
  },
  pressed: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Pressed",
  },
} satisfies ControlDefs

function TogglePreview() {
  const controls = useControls(toggleControlDefs)
  const { variant, size, disabled, pressed } = controls.values

  return (
    <div className="space-y-6">
      {/* Interactive playground */}
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <Toggle
            variant={variant as "default"}
            size={size as "default"}
            disabled={disabled}
            pressed={pressed}
            aria-label="Toggle bold"
          >
            <BoldIcon className="size-4" />
          </Toggle>
        </div>
      </Playground>

      {/* Static examples */}
      <Section title="Variants">
        <Toggle aria-label="Toggle bold">
          <BoldIcon className="size-4" />
        </Toggle>
        <Toggle variant="outline" aria-label="Toggle italic">
          <ItalicIcon className="size-4" />
        </Toggle>
      </Section>
      <Section title="Sizes">
        <Toggle size="sm" aria-label="Small">
          <BoldIcon className="size-4" />
        </Toggle>
        <Toggle size="default" aria-label="Default">
          <BoldIcon className="size-4" />
        </Toggle>
        <Toggle size="lg" aria-label="Large">
          <BoldIcon className="size-4" />
        </Toggle>
      </Section>
    </div>
  )
}

const toggleGroupControlDefs = {
  variant: {
    type: "radio" as const,
    options: ["default", "outline"],
    defaultValue: "default",
    label: "Variant",
  },
  size: {
    type: "radio" as const,
    options: ["default", "sm", "lg"],
    defaultValue: "default",
    label: "Size",
  },
} satisfies ControlDefs

function ToggleGroupPreview() {
  const controls = useControls(toggleGroupControlDefs)

  return (
    <div className="space-y-6">
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <ToggleGroup
            variant={controls.values.variant as "default"}
            size={controls.values.size as "default"}
          >
            <ToggleGroupItem value="bold" aria-label="Bold">
              <BoldIcon className="size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic">
              <ItalicIcon className="size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Underline">
              <UnderlineIcon className="size-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </Playground>
    </div>
  )
}

function ButtonGroupPreview() {
  return (
    <div className="space-y-8">
      <Section title="Horizontal">
        <ButtonGroup>
          <Button variant="outline">Left</Button>
          <Button variant="outline">Center</Button>
          <Button variant="outline">Right</Button>
        </ButtonGroup>
      </Section>
      <Section title="Vertical">
        <ButtonGroup orientation="vertical">
          <Button variant="outline">Top</Button>
          <Button variant="outline">Middle</Button>
          <Button variant="outline">Bottom</Button>
        </ButtonGroup>
      </Section>
    </div>
  )
}

function DropdownMenuPreview() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>Open Menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserIcon className="size-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon className="size-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Trash2Icon className="size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ContextMenuPreview() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex h-36 w-72 items-center justify-center rounded-md border border-dashed text-muted-foreground text-sm">
          Right click here
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <CopyIcon className="size-4" />
          Copy
        </ContextMenuItem>
        <ContextMenuItem>
          <ScissorsIcon className="size-4" />
          Cut
        </ContextMenuItem>
        <ContextMenuItem>
          <ClipboardIcon className="size-4" />
          Paste
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <Trash2Icon className="size-4" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

const nativeSelectControlDefs = {
  disabled: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Disabled",
  },
} satisfies ControlDefs

function NativeSelectPreview() {
  const controls = useControls(nativeSelectControlDefs)

  return (
    <div className="max-w-sm space-y-6">
      <Playground controls={controls}>
        <NativeSelect defaultValue="banana" disabled={controls.values.disabled}>
          <NativeSelectOption value="apple">Apple</NativeSelectOption>
          <NativeSelectOption value="banana">Banana</NativeSelectOption>
          <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
        </NativeSelect>
      </Playground>

      <Section title="Small">
        <NativeSelect size="sm" defaultValue="cherry">
          <NativeSelectOption value="apple">Apple</NativeSelectOption>
          <NativeSelectOption value="banana">Banana</NativeSelectOption>
          <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
        </NativeSelect>
      </Section>
    </div>
  )
}

function InputGroupPreview() {
  return (
    <div className="max-w-sm space-y-6">
      <Section title="With icon addon">
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon className="size-4" />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search..." />
        </InputGroup>
      </Section>
      <Section title="With text addon">
        <InputGroup>
          <InputGroupAddon>https://</InputGroupAddon>
          <InputGroupInput placeholder="example.com" />
        </InputGroup>
      </Section>
      <Section title="End addon">
        <InputGroup>
          <InputGroupInput placeholder="0.00" />
          <InputGroupAddon align="inline-end">USD</InputGroupAddon>
        </InputGroup>
      </Section>
    </div>
  )
}

const inputOTPControlDefs = {
  maxLength: {
    type: "number" as const,
    defaultValue: 6,
    min: 4,
    max: 8,
    step: 1,
    label: "Max length",
  },
} satisfies ControlDefs

function InputOTPPreview() {
  const controls = useControls(inputOTPControlDefs)
  const half = Math.floor(controls.values.maxLength / 2)

  return (
    <div className="space-y-6">
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <InputOTP key={controls.values.maxLength} maxLength={controls.values.maxLength}>
            <InputOTPGroup>
              {Array.from({ length: half }, (_, i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              {Array.from({ length: controls.values.maxLength - half }, (_, i) => (
                <InputOTPSlot key={half + i} index={half + i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
      </Playground>
    </div>
  )
}

function ComboboxPreview() {
  return (
    <div className="max-w-sm space-y-6">
      <Label>Framework</Label>
      <Combobox>
        <ComboboxInput placeholder="Select a framework..." />
        <ComboboxContent>
          <ComboboxList>
            <ComboboxEmpty>No results found.</ComboboxEmpty>
            <ComboboxItem value="react">React</ComboboxItem>
            <ComboboxItem value="vue">Vue</ComboboxItem>
            <ComboboxItem value="angular">Angular</ComboboxItem>
            <ComboboxItem value="svelte">Svelte</ComboboxItem>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}

function CalendarPreview() {
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

function FieldPreview() {
  return (
    <div className="max-w-sm space-y-6">
      <Field>
        <FieldLabel htmlFor="field-name">Name</FieldLabel>
        <Input id="field-name" placeholder="Enter your name" />
        <FieldDescription>Your full legal name.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="field-email">Email</FieldLabel>
        <Input id="field-email" type="email" placeholder="you@example.com" aria-invalid="true" />
        <FieldError>Please enter a valid email address.</FieldError>
      </Field>
    </div>
  )
}

function FormPreview() {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
    },
    onSubmit: async ({ value }) => {
      alert(JSON.stringify(value, null, 2))
    },
  })

  return (
    <div className="max-w-sm">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FieldGroup>
          <form.Field
            name="username"
            validators={{
              onBlur: ({ value }) =>
                value.length < 3 ? "Username must be at least 3 characters" : undefined,
            }}
            // biome-ignore lint/correctness/noChildrenProp: TanStack Form uses children as render prop
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid || undefined}>
                  <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="johndoe"
                  />
                  <FieldDescription>Your public display name.</FieldDescription>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />
          <form.Field
            name="email"
            validators={{
              onBlur: ({ value }) =>
                value && !value.includes("@") ? "Enter a valid email address" : undefined,
            }}
            // biome-ignore lint/correctness/noChildrenProp: TanStack Form uses children as render prop
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid || undefined}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="john@example.com"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />
          <Button type="submit">Submit</Button>
        </FieldGroup>
      </form>
    </div>
  )
}

const aspectRatioControlDefs = {
  ratio: {
    type: "select" as const,
    options: ["16/9", "4/3", "1/1", "21/9"],
    defaultValue: "16/9",
    label: "Ratio",
  },
} satisfies ControlDefs

const aspectRatioValues: Record<string, number> = {
  "16/9": 16 / 9,
  "4/3": 4 / 3,
  "1/1": 1,
  "21/9": 21 / 9,
}

function AspectRatioPreview() {
  const controls = useControls(aspectRatioControlDefs)
  const ratio = aspectRatioValues[controls.values.ratio] ?? 16 / 9

  return (
    <div className="max-w-sm space-y-6">
      <Playground controls={controls}>
        <div className="w-72">
          <AspectRatio ratio={ratio}>
            <div className="flex size-full items-center justify-center rounded-md bg-muted text-muted-foreground text-sm">
              {controls.values.ratio}
            </div>
          </AspectRatio>
        </div>
      </Playground>
    </div>
  )
}

function ResizablePreview() {
  return (
    <div className="max-w-lg">
      <ResizablePanelGroup orientation="horizontal" className="rounded-lg border">
        <ResizablePanel defaultSize={50}>
          <div className="flex h-32 items-center justify-center p-6">
            <span className="font-medium text-sm">Panel A</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex h-32 items-center justify-center p-6">
            <span className="font-medium text-sm">Panel B</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

function ScrollAreaPreview() {
  return (
    <div className="max-w-sm">
      <ScrollArea className="h-48 w-full rounded-md border p-4">
        <div className="space-y-4">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="text-sm">
              Item {i + 1} - Scroll to see more content below.
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

const collapsibleControlDefs = {
  defaultOpen: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Default open",
  },
} satisfies ControlDefs

function CollapsiblePreview() {
  const controls = useControls(collapsibleControlDefs)

  return (
    <div className="max-w-sm space-y-6">
      <Playground controls={controls}>
        <Collapsible
          key={String(controls.values.defaultOpen)}
          defaultOpen={controls.values.defaultOpen}
        >
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Starred repositories</h4>
            <CollapsibleTrigger render={<Button variant="ghost" size="icon-sm" />}>
              <ChevronsUpDownIcon className="size-4" />
            </CollapsibleTrigger>
          </div>
          <div className="mt-2 rounded-md border px-4 py-2 text-sm">@cogentic/design-system</div>
          <CollapsibleContent className="mt-2 space-y-2">
            <div className="rounded-md border px-4 py-2 text-sm">@cogentic/components</div>
            <div className="rounded-md border px-4 py-2 text-sm">@cogentic/utils</div>
          </CollapsibleContent>
        </Collapsible>
      </Playground>
    </div>
  )
}

function AlertDialogPreview() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive" />}>
        Delete Account
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function DrawerPreview() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>Make changes to your profile here.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="drawer-name">Name</Label>
              <Input id="drawer-name" defaultValue="James Cooke" />
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button>Save changes</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function SheetPreview() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Open Sheet</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>This is a sheet that slides in from the side.</SheetDescription>
        </SheetHeader>
        <div className="p-4">
          <p className="text-muted-foreground text-sm">Sheet body content goes here.</p>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function PopoverPreview() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>Open Popover</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
        </PopoverHeader>
        <div className="grid gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="pop-width">Width</Label>
            <Input id="pop-width" defaultValue="100%" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="pop-height">Height</Label>
            <Input id="pop-height" defaultValue="25px" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function HoverCardPreview() {
  return (
    <HoverCard>
      <HoverCardTrigger
        render={<a href="#" className="font-medium text-sm underline underline-offset-4" />}
      >
        @cogentic
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex gap-4">
          <Avatar>
            <AvatarFallback>CG</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="font-medium text-sm">Cogentic</h4>
            <p className="text-muted-foreground text-sm">Design system and component library.</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

function SonnerPreview() {
  return (
    <div className="space-y-6">
      <Section title="Toast variants">
        <Button variant="outline" onClick={() => toast("Event has been created.")}>
          Default
        </Button>
        <Button variant="outline" onClick={() => toast.success("Successfully saved!")}>
          Success
        </Button>
        <Button variant="outline" onClick={() => toast.error("Something went wrong.")}>
          Error
        </Button>
        <Button variant="outline" onClick={() => toast.info("Here is some info.")}>
          Info
        </Button>
        <Button variant="outline" onClick={() => toast.warning("Be careful!")}>
          Warning
        </Button>
      </Section>
    </div>
  )
}

const emptyControlDefs = {
  showIcon: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Show icon",
  },
  title: {
    type: "text" as const,
    defaultValue: "No results found",
    label: "Title",
  },
} satisfies ControlDefs

const entityHeaderControlDefs = {
  size: {
    type: "radio" as const,
    options: ["sm", "default", "lg"],
    defaultValue: "default",
    label: "Size",
  },
  name: {
    type: "text" as const,
    defaultValue: "Acme Corporation",
    label: "Name",
  },
  subtitle: {
    type: "text" as const,
    defaultValue: "Also known as Acme Inc",
    label: "Subtitle",
  },
  description: {
    type: "text" as const,
    defaultValue: "A leading financial services provider specialising in cross-border payments.",
    label: "Description",
  },
} satisfies ControlDefs

function EntityHeaderPreview() {
  const controls = useControls(entityHeaderControlDefs)
  const { size, name, subtitle, description } = controls.values

  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <EntityHeader
          size={size as "default"}
          name={name as string}
          subtitle={subtitle as string}
          description={description as string}
          meta={[
            { text: "Singapore", icon: "🇸🇬" },
            { text: "example.com", href: "https://example.com", external: true },
          ]}
          rightCol={<Badge variant="secondary">Active</Badge>}
        />
      </Playground>

      {/* With logo */}
      <EntityHeader
        name="Example Bank"
        subtitle="Licensed Virtual Asset Service Provider"
        logoUrl="https://placehold.co/48x48/1a1a2e/ffffff?text=EB"
        meta={[{ text: "Hong Kong", icon: "🇭🇰" }, { text: "Tier 1" }]}
      />

      {/* With emoji */}
      <EntityHeader name="DeFi Protocol" emoji="🔗" size="sm" meta={[{ text: "Decentralised" }]} />
    </div>
  )
}

function LogoVaspPreview() {
  return (
    <div className="flex items-center gap-6">
      <LogoVasp size="sm" />
      <LogoVasp size="default" />
      <LogoVasp size="lg" />
      <LogoVasp size="lg" className="text-muted-foreground" />
    </div>
  )
}

type Fruit = { id: string; name: string; emoji: string; color: string }

const fruits: Fruit[] = [
  { id: "1", name: "Apple", emoji: "🍎", color: "Red" },
  { id: "2", name: "Banana", emoji: "🍌", color: "Yellow" },
  { id: "3", name: "Blueberry", emoji: "🫐", color: "Blue" },
  { id: "4", name: "Cherry", emoji: "🍒", color: "Red" },
  { id: "5", name: "Grape", emoji: "🍇", color: "Purple" },
  { id: "6", name: "Kiwi", emoji: "🥝", color: "Green" },
  { id: "7", name: "Mango", emoji: "🥭", color: "Orange" },
  { id: "8", name: "Orange", emoji: "🍊", color: "Orange" },
  { id: "9", name: "Peach", emoji: "🍑", color: "Pink" },
  { id: "10", name: "Strawberry", emoji: "🍓", color: "Red" },
  { id: "11", name: "Watermelon", emoji: "🍉", color: "Green" },
  { id: "12", name: "Pineapple", emoji: "🍍", color: "Yellow" },
]

function SearchInputPreview() {
  return (
    <div className="max-w-xl space-y-6">
      <SearchInput<Fruit>
        onSearch={async (query) => {
          await new Promise((r) => setTimeout(r, 300))
          return fruits.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()))
        }}
        renderItem={(item) => (
          <>
            <span className="text-2xl">{item.emoji}</span>
            <div className="min-w-0 flex-1">
              <div className="truncate font-medium text-foreground">{item.name}</div>
              <div className="truncate text-muted-foreground text-sm">{item.color}</div>
            </div>
          </>
        )}
        onSelect={(item) => toast(`Selected: ${item.emoji} ${item.name}`)}
        placeholder="Search fruits..."
      />
    </div>
  )
}

function EmptyPreview() {
  const controls = useControls(emptyControlDefs)

  return (
    <div className="max-w-md">
      <Playground controls={controls}>
        <Empty>
          <EmptyHeader>
            {controls.values.showIcon && (
              <EmptyMedia variant="icon">
                <InboxIcon className="size-6" />
              </EmptyMedia>
            )}
            <EmptyTitle>{controls.values.title}</EmptyTitle>
            <EmptyDescription>
              Try adjusting your search or filter to find what you are looking for.
            </EmptyDescription>
          </EmptyHeader>
          <Button>
            <PlusIcon className="size-4" />
            Create new
          </Button>
        </Empty>
      </Playground>
    </div>
  )
}

function BreadcrumbPreview() {
  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

function PaginationPreview() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

function NavigationMenuPreview() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] gap-1 p-2">
              <NavigationMenuLink href="#">
                <div>
                  <div className="font-medium">Introduction</div>
                  <p className="text-muted-foreground text-sm">
                    Learn the basics of the design system.
                  </p>
                </div>
              </NavigationMenuLink>
              <NavigationMenuLink href="#">
                <div>
                  <div className="font-medium">Installation</div>
                  <p className="text-muted-foreground text-sm">
                    How to install and set up the components.
                  </p>
                </div>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Documentation</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function MenubarPreview() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New Window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Print <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Zoom In</MenubarItem>
          <MenubarItem>Zoom Out</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Full Screen</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

function CommandPreview() {
  return (
    <div className="max-w-sm">
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <CalendarIcon className="size-4" />
              Calendar
            </CommandItem>
            <CommandItem>
              <SearchIcon className="size-4" />
              Search
            </CommandItem>
            <CommandItem>
              <SettingsIcon className="size-4" />
              Settings
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <UserIcon className="size-4" />
              Profile
            </CommandItem>
            <CommandItem>
              <MailIcon className="size-4" />
              Mail
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}

const carouselControlDefs = {
  orientation: {
    type: "radio" as const,
    options: ["horizontal", "vertical"],
    defaultValue: "horizontal",
    label: "Orientation",
  },
} satisfies ControlDefs

function CarouselPreview() {
  const controls = useControls(carouselControlDefs)

  return (
    <div className="mx-auto max-w-xs space-y-6">
      <Playground controls={controls}>
        <Carousel orientation={controls.values.orientation as "horizontal"}>
          <CarouselContent>
            {Array.from({ length: 5 }, (_, i) => (
              <CarouselItem key={i}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="font-semibold text-3xl">{i + 1}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Playground>
    </div>
  )
}

const chartData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--muted-foreground)",
  },
} satisfies ChartConfig

function ChartPreview() {
  return (
    <div className="max-w-md">
      <ChartContainer config={chartConfig}>
        <BarChart data={chartData}>
          <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

// ── Chart sample data ──────────────────────────────────────────────────

const timeSeriesData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
]

const timeSeriesConfig = {
  desktop: { label: "Desktop", color: "var(--primary)" },
  mobile: { label: "Mobile", color: "var(--muted-foreground)" },
} satisfies ChartConfig

const pieData = [
  { name: "chrome", value: 275, fill: "var(--color-chrome)" },
  { name: "safari", value: 200, fill: "var(--color-safari)" },
  { name: "firefox", value: 187, fill: "var(--color-firefox)" },
  { name: "edge", value: 173, fill: "var(--color-edge)" },
  { name: "other", value: 90, fill: "var(--color-other)" },
]

const pieConfig = {
  chrome: { label: "Chrome", color: "oklch(0.7 0.15 145)" },
  safari: { label: "Safari", color: "oklch(0.7 0.15 250)" },
  firefox: { label: "Firefox", color: "oklch(0.7 0.15 30)" },
  edge: { label: "Edge", color: "oklch(0.7 0.12 200)" },
  other: { label: "Other", color: "oklch(0.65 0.02 250)" },
} satisfies ChartConfig

const radarData = [
  { subject: "Speed", current: 85, previous: 65 },
  { subject: "Reliability", current: 90, previous: 70 },
  { subject: "Usability", current: 75, previous: 80 },
  { subject: "Security", current: 95, previous: 60 },
  { subject: "Cost", current: 60, previous: 85 },
  { subject: "Support", current: 70, previous: 75 },
]

const radarConfig = {
  current: { label: "Current", color: "var(--primary)" },
  previous: { label: "Previous", color: "var(--muted-foreground)" },
} satisfies ChartConfig

// ── Area Chart Preview ──────────────────────────────────────────────────

const areaChartControlDefs = {
  showGrid: { type: "boolean", defaultValue: true, label: "Grid" },
  showXAxis: { type: "boolean", defaultValue: true, label: "X Axis" },
  showYAxis: { type: "boolean", defaultValue: false, label: "Y Axis" },
  showLegend: { type: "boolean", defaultValue: false, label: "Legend" },
  stacked: { type: "boolean", defaultValue: false, label: "Stacked" },
  gradient: { type: "boolean", defaultValue: true, label: "Gradient fill" },
} satisfies ControlDefs

function AreaChartPreview() {
  const controls = useControls(areaChartControlDefs)
  return (
    <Playground controls={controls}>
      <div className="max-w-lg">
        <AreaChartComponent
          data={timeSeriesData}
          config={timeSeriesConfig}
          xKey="month"
          yKeys={["desktop", "mobile"]}
          showGrid={controls.values.showGrid}
          showXAxis={controls.values.showXAxis}
          showYAxis={controls.values.showYAxis}
          showLegend={controls.values.showLegend}
          stacked={controls.values.stacked}
          gradient={controls.values.gradient}
        />
      </div>
    </Playground>
  )
}

// ── Bar Chart Preview ──────────────────────────────────────────────────

const barChartControlDefs = {
  showGrid: { type: "boolean", defaultValue: true, label: "Grid" },
  showXAxis: { type: "boolean", defaultValue: true, label: "X Axis" },
  showYAxis: { type: "boolean", defaultValue: false, label: "Y Axis" },
  showLegend: { type: "boolean", defaultValue: false, label: "Legend" },
  stacked: { type: "boolean", defaultValue: false, label: "Stacked" },
  horizontal: { type: "boolean", defaultValue: false, label: "Horizontal" },
  radius: { type: "number", defaultValue: 4, min: 0, max: 20, step: 1, label: "Radius" },
} satisfies ControlDefs

function BarChartPreview() {
  const controls = useControls(barChartControlDefs)
  return (
    <Playground controls={controls}>
      <div className="max-w-lg">
        <BarChartComponent
          data={timeSeriesData}
          config={timeSeriesConfig}
          xKey="month"
          yKeys={["desktop", "mobile"]}
          showGrid={controls.values.showGrid}
          showXAxis={controls.values.showXAxis}
          showYAxis={controls.values.showYAxis}
          showLegend={controls.values.showLegend}
          stacked={controls.values.stacked}
          horizontal={controls.values.horizontal}
          radius={controls.values.radius}
        />
      </div>
    </Playground>
  )
}

// ── Line Chart Preview ─────────────────────────────────────────────────

const lineChartControlDefs = {
  showGrid: { type: "boolean", defaultValue: true, label: "Grid" },
  showXAxis: { type: "boolean", defaultValue: true, label: "X Axis" },
  showYAxis: { type: "boolean", defaultValue: false, label: "Y Axis" },
  showLegend: { type: "boolean", defaultValue: false, label: "Legend" },
  showDots: { type: "boolean", defaultValue: true, label: "Dots" },
  curveType: {
    type: "select",
    options: ["natural", "linear", "step", "monotone"],
    defaultValue: "natural",
    label: "Curve",
  },
} satisfies ControlDefs

function LineChartPreview() {
  const controls = useControls(lineChartControlDefs)
  return (
    <Playground controls={controls}>
      <div className="max-w-lg">
        <LineChartComponent
          data={timeSeriesData}
          config={timeSeriesConfig}
          xKey="month"
          yKeys={["desktop", "mobile"]}
          showGrid={controls.values.showGrid}
          showXAxis={controls.values.showXAxis}
          showYAxis={controls.values.showYAxis}
          showLegend={controls.values.showLegend}
          showDots={controls.values.showDots}
          curveType={controls.values.curveType as "natural"}
        />
      </div>
    </Playground>
  )
}

// ── Pie Chart Preview ──────────────────────────────────────────────────

const pieChartControlDefs = {
  donut: { type: "boolean", defaultValue: false, label: "Donut" },
  showLegend: { type: "boolean", defaultValue: false, label: "Legend" },
  centerLabel: {
    type: "text",
    defaultValue: "",
    label: "Center label",
    placeholder: "e.g. Browsers",
  },
  centerValue: { type: "text", defaultValue: "", label: "Center value", placeholder: "e.g. 925" },
} satisfies ControlDefs

function PieChartPreview() {
  const controls = useControls(pieChartControlDefs)
  return (
    <Playground controls={controls}>
      <div className="mx-auto max-w-xs">
        <PieChartComponent
          data={pieData}
          config={pieConfig}
          donut={controls.values.donut}
          showLegend={controls.values.showLegend}
          centerLabel={controls.values.centerLabel || undefined}
          centerValue={controls.values.centerValue || undefined}
        />
      </div>
    </Playground>
  )
}

// ── Radial Chart Preview ───────────────────────────────────────────────

const radialChartControlDefs = {
  showLegend: { type: "boolean", defaultValue: false, label: "Legend" },
} satisfies ControlDefs

function RadialChartPreview() {
  const controls = useControls(radialChartControlDefs)
  return (
    <Playground controls={controls}>
      <div className="mx-auto max-w-sm">
        <RadialChartComponent
          data={radarData}
          config={radarConfig}
          angleKey="subject"
          dataKeys={["current", "previous"]}
          showLegend={controls.values.showLegend}
        />
      </div>
    </Playground>
  )
}

function BgShaderPreview() {
  return (
    <div className="relative h-64 w-full overflow-hidden rounded-lg border">
      <BgShader />
      <div className="relative z-10 flex h-full items-center justify-center">
        <p className="font-semibold text-lg">Content over shader</p>
      </div>
    </div>
  )
}

function BlockyShaderPreview() {
  return (
    <div className="relative h-64 w-full overflow-hidden rounded-lg border">
      <BlockyShader />
      <div className="relative z-10 flex h-full items-center justify-center">
        <p className="font-semibold text-lg">Content over blocky shader</p>
      </div>
    </div>
  )
}

function AsciiShaderPreview() {
  return (
    <div className="relative h-64 w-full overflow-hidden rounded-lg border">
      <AsciiShader />
      <div className="relative z-10 flex h-full items-center justify-center">
        <p className="font-semibold text-lg">Content over ASCII shader</p>
      </div>
    </div>
  )
}

const subtleShaderControlDefs = {
  palette: {
    type: "radio" as const,
    options: ["blue", "green", "amber"],
    defaultValue: "blue",
    label: "Palette",
  },
  paused: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Paused",
  },
} satisfies ControlDefs

function SubtleShaderPreview() {
  const controls = useControls(subtleShaderControlDefs)
  const { palette, paused } = controls.values

  return (
    <div className="space-y-6">
      <Playground controls={controls}>
        <div className="relative h-64 w-full overflow-hidden rounded-lg border">
          <SubtleShader palette={palette as "blue"} paused={paused as boolean} />
          <div className="relative z-10 flex h-full items-center justify-center">
            <p className="font-semibold text-lg">Content over subtle shader</p>
          </div>
        </div>
      </Playground>
    </div>
  )
}

const riskGaugeControlDefs = {
  score: {
    type: "number" as const,
    defaultValue: 65,
    label: "Score",
    min: 0,
    max: 100,
  },
  tier: {
    type: "radio" as const,
    options: ["low", "medium", "high", "severe"],
    defaultValue: "medium",
    label: "Tier",
  },
  size: {
    type: "radio" as const,
    options: ["sm", "lg"],
    defaultValue: "sm",
    label: "Size",
  },
  label: {
    type: "text" as const,
    defaultValue: "Risk Score",
    label: "Label",
  },
} satisfies ControlDefs

function RiskGaugePreview() {
  const controls = useControls(riskGaugeControlDefs)
  const { score, tier, size, label } = controls.values

  return (
    <div className="max-w-sm space-y-6">
      <Playground controls={controls}>
        <RiskGauge
          score={Number(score)}
          tier={tier as string}
          size={size as "sm"}
          label={label as string}
        />
      </Playground>

      {/* Static examples for each tier */}
      <div className="space-y-4">
        <RiskGauge score={25} tier="low" label="Low Risk" />
        <RiskGauge score={50} tier="medium" label="Medium Risk" />
        <RiskGauge score={75} tier="high" label="High Risk" />
        <RiskGauge score={95} tier="severe" label="Severe Risk" />
      </div>

      {/* Large size */}
      <RiskGauge score={65} tier="moderateTrust" size="lg" label="Trust Score (lg)" />
    </div>
  )
}

const complianceScoreControlDefs = {
  score: {
    type: "number" as const,
    defaultValue: 78,
    min: 0,
    max: 100,
    step: 1,
    label: "Score",
  },
  size: {
    type: "radio" as const,
    options: ["sm", "default", "lg"],
    defaultValue: "default",
    label: "Size",
  },
  showValue: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Show Value",
  },
} satisfies ControlDefs

function ComplianceScorePreview() {
  const controls = useControls(complianceScoreControlDefs)
  const { score, size, showValue } = controls.values

  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <ComplianceScore
          score={Number(score)}
          size={size as "default"}
          showValue={showValue as boolean}
          label="Score"
        />
      </Playground>

      <Section title="Score Ranges">
        <ComplianceScore score={25} label="Low" />
        <ComplianceScore score={55} label="Medium" />
        <ComplianceScore score={88} label="High" />
      </Section>

      <Section title="In Context">
        <Card className="w-64">
          <CardHeader>
            <CardTitle>Compliance Posture</CardTitle>
            <CardDescription>Overall score across all frameworks</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ComplianceScore score={82} label="Score" size="lg" />
          </CardContent>
        </Card>
      </Section>
    </div>
  )
}

const fadeInControlDefs = {
  delay: {
    type: "number" as const,
    defaultValue: 0,
    min: 0,
    max: 2000,
    step: 50,
    label: "Delay (ms)",
  },
} satisfies ControlDefs

function FadeInPreview() {
  const controls = useControls(fadeInControlDefs)

  return (
    <div className="space-y-6">
      <Playground controls={controls}>
        <FadeIn delay={controls.values.delay as number}>
          <div className="rounded-lg border bg-card p-4">Item fades in with configurable delay</div>
        </FadeIn>
      </Playground>

      {/* Staggered example */}
      <div className="space-y-4">
        <FadeIn>
          <div className="rounded-lg border bg-card p-4">First item fades in</div>
        </FadeIn>
        <FadeIn delay={200}>
          <div className="rounded-lg border bg-card p-4">Second item with 200ms delay</div>
        </FadeIn>
        <FadeIn delay={400}>
          <div className="rounded-lg border bg-card p-4">Third item with 400ms delay</div>
        </FadeIn>
      </div>
    </div>
  )
}

const marqueeControlDefs = {
  duration: {
    type: "number" as const,
    defaultValue: 20,
    min: 5,
    max: 120,
    step: 5,
    label: "Duration (s)",
  },
  pauseOnHover: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Pause on Hover",
  },
} satisfies ControlDefs

function MarqueePreview() {
  const controls = useControls(marqueeControlDefs)
  const items = ["Design", "System", "Components", "Animations", "Hooks", "Utilities"]

  return (
    <div className="w-full space-y-6">
      <Playground controls={controls}>
        <Marquee
          duration={controls.values.duration as number}
          pauseOnHover={controls.values.pauseOnHover as boolean}
        >
          {items.map((item) => (
            <div
              key={item}
              className="flex shrink-0 items-center rounded-lg border bg-card px-6 py-3"
            >
              <span className="font-medium text-sm">{item}</span>
            </div>
          ))}
        </Marquee>
      </Playground>
    </div>
  )
}

const typewriterControlDefs = {
  speed: {
    type: "number" as const,
    defaultValue: 100,
    min: 20,
    max: 500,
    step: 10,
    label: "Speed (ms)",
  },
  loop: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Loop",
  },
  showLineNumbers: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Line Numbers",
  },
  showCursor: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Cursor",
  },
} satisfies ControlDefs

function TypewriterPreview() {
  const controls = useControls(typewriterControlDefs)
  const lines = [
    { text: "import { Button } from '@cogentic/ds'", className: "text-emerald-500" },
    { text: "" },
    { text: "export default function App() {", className: "text-blue-500" },
    { text: "return (", indent: 1, className: "text-foreground/60" },
    { text: '<Button variant="default">', indent: 2, className: "text-amber-500" },
    { text: "Click me", indent: 3 },
    { text: "</Button>", indent: 2, className: "text-amber-500" },
    { text: ")", indent: 1, className: "text-foreground/60" },
    { text: "}", className: "text-blue-500" },
  ]

  return (
    <div className="space-y-6">
      <Playground controls={controls}>
        <div className="max-w-md rounded-lg border bg-card p-4">
          <Typewriter
            lines={lines}
            speed={controls.values.speed as number}
            loop={controls.values.loop as boolean}
            showLineNumbers={controls.values.showLineNumbers as boolean}
            showCursor={controls.values.showCursor as boolean}
          />
        </div>
      </Playground>
    </div>
  )
}

const animatedCounterControlDefs = {
  value: {
    type: "number" as const,
    defaultValue: 56,
    min: 0,
    max: 10000,
    step: 1,
    label: "Value",
  },
  duration: {
    type: "number" as const,
    defaultValue: 1500,
    min: 500,
    max: 3000,
    step: 100,
    label: "Duration (ms)",
  },
} satisfies ControlDefs

function AnimatedCounterPreview() {
  const controls = useControls(animatedCounterControlDefs)

  return (
    <div className="space-y-6">
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <div className="text-center">
            <div className="font-bold text-4xl">
              <AnimatedCounter
                key={`${controls.values.value}-${controls.values.duration}`}
                value={controls.values.value}
                duration={controls.values.duration}
              />
            </div>
            <p className="text-muted-foreground text-sm">Counter</p>
          </div>
        </div>
      </Playground>

      <Section title="Examples">
        <div className="flex gap-8">
          <div className="text-center">
            <div className="font-bold text-4xl">
              <AnimatedCounter value={99.9} duration={2000} decimals={1} suffix="%" />
            </div>
            <p className="text-muted-foreground text-sm">Uptime</p>
          </div>
          <div className="text-center">
            <div className="font-bold text-4xl">
              <AnimatedCounter value={4200} duration={2500} prefix="$" />
            </div>
            <p className="text-muted-foreground text-sm">Saved</p>
          </div>
        </div>
      </Section>
    </div>
  )
}

function StreamingCardsPreview() {
  const cards = [
    <div key="1" className="rounded-xl border bg-card p-4 shadow-sm">
      <p className="font-medium text-muted-foreground text-xs">Step 1</p>
      <p className="mt-1 text-sm">Setting up your workspace...</p>
    </div>,
    <div key="2" className="rounded-xl border bg-card p-4 shadow-sm">
      <p className="font-medium text-muted-foreground text-xs">Step 2</p>
      <p className="mt-1 text-sm">Installing dependencies...</p>
    </div>,
    <div key="3" className="rounded-xl border bg-card p-4 shadow-sm">
      <p className="font-medium text-muted-foreground text-xs">Step 3</p>
      <p className="mt-1 text-sm">Configuring your project...</p>
    </div>,
    <div key="4" className="rounded-xl border bg-card p-4 shadow-sm">
      <p className="font-medium text-muted-foreground text-xs">Step 4</p>
      <p className="mt-1 text-sm">Ready to go!</p>
    </div>,
  ]
  return (
    <div className="h-64 max-w-sm">
      <StreamingCards interval={2000}>{cards}</StreamingCards>
    </div>
  )
}

// ── Typography Preview ────────────────────────────────────────────────────

const typographyControlDefs = {
  heading: {
    type: "select" as const,
    options: ["H1", "H2", "H3", "H4"],
    defaultValue: "H1",
    label: "Heading",
  },
  text: {
    type: "text" as const,
    defaultValue: "The quick brown fox",
    label: "Text",
  },
  proseSize: {
    type: "radio" as const,
    options: ["sm", "default", "lg"],
    defaultValue: "default",
    label: "Prose Size",
  },
} satisfies ControlDefs

const headingComponents = { H1, H2, H3, H4 } as const

function TypographyPreview() {
  const controls = useControls(typographyControlDefs)
  const { heading, text, proseSize } = controls.values
  const HeadingComponent = headingComponents[heading as keyof typeof headingComponents]
  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <div className="w-full space-y-4">
          <HeadingComponent>{text}</HeadingComponent>
          <Prose size={proseSize as "default"} className="rounded-lg border p-6">
            <h2>Prose Container</h2>
            <p>
              The Prose component applies consistent typography styles to all child elements —
              headings, paragraphs, lists, links, code, and tables.
            </p>
            <ul>
              <li>Automatic spacing between elements</li>
              <li>
                Styled <a href="#">links</a> and <strong>bold text</strong>
              </li>
              <li>
                Inline <code>code</code> formatting
              </li>
            </ul>
          </Prose>
        </div>
      </Playground>
      <Section title="Headings">
        <div className="w-full space-y-4">
          <H1>Heading One</H1>
          <H2>Heading Two</H2>
          <H3>Heading Three</H3>
          <H4>Heading Four</H4>
        </div>
      </Section>
      <Section title="Text Variants">
        <div className="w-full space-y-4">
          <Lead>This is a lead paragraph with larger, muted text.</Lead>
          <P>This is a regular paragraph with comfortable line height for readability.</P>
          <Large>Large emphasis text</Large>
          <Small>Small label text</Small>
          <Muted>Muted helper text for secondary information.</Muted>
          <P>
            Use <InlineCode>InlineCode</InlineCode> for code references in text.
          </P>
        </div>
      </Section>
      <Section title="Blockquote & List">
        <div className="w-full space-y-4">
          <Blockquote>
            &ldquo;Design is not just what it looks like. Design is how it works.&rdquo;
          </Blockquote>
          <List>
            <li>First unordered item</li>
            <li>Second unordered item</li>
            <li>Third unordered item</li>
          </List>
          <List ordered>
            <li>First ordered item</li>
            <li>Second ordered item</li>
            <li>Third ordered item</li>
          </List>
        </div>
      </Section>
    </div>
  )
}

// ── DataTable Preview ──────────────────────────────────────────────────────

type Order = {
  id: string
  customer: string
  status: string
  amount: string
  items: number
}

const orderStatusOptions = [
  { label: "Fulfilled", value: "Fulfilled", icon: CheckCircle },
  { label: "Ready for pickup", value: "Ready for pickup", icon: Package },
  { label: "Unfulfilled", value: "Unfulfilled", icon: Clock },
]

const orderColumns: ColumnDef<Order, unknown>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Order" />,
    cell: ({ row }) => <div className="font-mono">{row.original.id}</div>,
    enableHiding: false,
    meta: { label: "Order" },
  },
  {
    accessorKey: "customer",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
    cell: ({ row }) => <div className="max-w-[150px] truncate">{row.original.customer}</div>,
    meta: { label: "Customer" },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <Badge
          variant={
            status === "Fulfilled"
              ? "default"
              : status === "Ready for pickup"
                ? "secondary"
                : "outline"
          }
          className="gap-1 whitespace-nowrap"
        >
          {status}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      if (!Array.isArray(value) || value.length === 0) return true
      return value.includes(String(row.getValue(id)))
    },
    enableSorting: false,
    meta: { label: "Status" },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    cell: ({ row }) => <div className="text-right font-mono">{row.original.amount}</div>,
    meta: { label: "Amount" },
  },
]

const orderData: Order[] = [
  { id: "#301456", customer: "Sarah Johnson", status: "Fulfilled", amount: "$2,500", items: 3 },
  { id: "#789123", customer: "Michael Brown", status: "Fulfilled", amount: "$1,200", items: 2 },
  { id: "#654321", customer: "Emily Davis", status: "Unfulfilled", amount: "$3,100", items: 4 },
  { id: "#987654", customer: "David Lee", status: "Ready for pickup", amount: "$800", items: 1 },
  { id: "#432187", customer: "Lisa Wang", status: "Fulfilled", amount: "$950", items: 2 },
  {
    id: "#567890",
    customer: "James Carter",
    status: "Ready for pickup",
    amount: "$1,750",
    items: 1,
  },
  { id: "#234567", customer: "Rachel Kim", status: "Fulfilled", amount: "$4,200", items: 3 },
  { id: "#876543", customer: "Thomas Allen", status: "Unfulfilled", amount: "$620", items: 2 },
  { id: "#345678", customer: "Anna Patel", status: "Ready for pickup", amount: "$1,100", items: 1 },
  { id: "#456789", customer: "Robert Singh", status: "Fulfilled", amount: "$3,400", items: 4 },
  { id: "#678901", customer: "Sophie Turner", status: "Fulfilled", amount: "$2,100", items: 2 },
  { id: "#890123", customer: "Henry Clark", status: "Unfulfilled", amount: "$550", items: 1 },
]

function DataTablePreview() {
  const { table } = useDataTable({
    data: orderData,
    columns: orderColumns,
    getRowId: (row) => row.id,
  })

  return (
    <div className="space-y-8">
      <Section title="Data Table with Toolbar">
        <div className="w-full">
          <DataTableToolbar table={table}>
            <Input
              placeholder="Search..."
              value={(table.getState().globalFilter as string) ?? ""}
              onChange={(e) => table.setGlobalFilter(e.target.value)}
              className="h-8 w-full lg:w-[250px]"
            />
            {table.getColumn("status") && (
              <DataTableFacetedFilter
                column={table.getColumn("status")}
                title="Status"
                options={orderStatusOptions}
              />
            )}
          </DataTableToolbar>
          <DataTable table={table} columns={orderColumns} />
          <DataTablePagination table={table} />
        </div>
      </Section>
    </div>
  )
}

// ── DatePicker Preview ────────────────────────────────────────────────────

function DatePickerPreview() {
  const [date, setDate] = useState<Date>()
  const [rangeDate, setRangeDate] = useState<DateRange | undefined>()

  return (
    <div className="space-y-8">
      <Section title="Single Date">
        <DatePicker value={date} onChange={setDate} />
      </Section>
      <Section title="With Presets">
        <DatePicker
          value={date}
          onChange={setDate}
          presets={[
            { label: "Today", days: 0 },
            { label: "Tomorrow", days: 1 },
            { label: "In 3 days", days: 3 },
            { label: "In a week", days: 7 },
          ]}
        />
      </Section>
      <Section title="Date Range">
        <DateRangePicker value={rangeDate} onChange={setRangeDate} />
      </Section>
      <Section title="Disabled">
        <DatePicker disabled placeholder="Disabled" />
      </Section>
    </div>
  )
}

// ── Grid Preview ──────────────────────────────────────────────────────────

const gridControlDefs = {
  cols: {
    type: "number" as const,
    defaultValue: 3,
    min: 1,
    max: 6,
    label: "Columns",
  },
  gap: {
    type: "number" as const,
    defaultValue: 4,
    min: 0,
    max: 12,
    label: "Gap",
  },
} satisfies ControlDefs

function GridPreview() {
  const controls = useControls(gridControlDefs)
  const { cols, gap } = controls.values
  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <Grid cols={cols} gap={gap} className="w-full">
          {Array.from({ length: 6 }, (_, i) => (
            <Col key={i} className="rounded-md border bg-muted/50 p-4 text-center text-sm">
              Col {i + 1}
            </Col>
          ))}
        </Grid>
      </Playground>
      <Section title="Spanning Columns">
        <Grid cols={4} gap={4} className="w-full">
          <Col span={2} className="rounded-md border bg-primary/10 p-4 text-center text-sm">
            Span 2
          </Col>
          <Col className="rounded-md border bg-muted/50 p-4 text-center text-sm">Col 3</Col>
          <Col className="rounded-md border bg-muted/50 p-4 text-center text-sm">Col 4</Col>
          <Col span="full" className="rounded-md border bg-primary/10 p-4 text-center text-sm">
            Span Full
          </Col>
        </Grid>
      </Section>
      <Section title="Row Spanning">
        <Grid cols={3} rows={2} gap={4} className="w-full">
          <Col rowSpan={2} className="rounded-md border bg-primary/10 p-4 text-center text-sm">
            Row Span 2
          </Col>
          <Col className="rounded-md border bg-muted/50 p-4 text-center text-sm">Cell</Col>
          <Col className="rounded-md border bg-muted/50 p-4 text-center text-sm">Cell</Col>
          <Col className="rounded-md border bg-muted/50 p-4 text-center text-sm">Cell</Col>
          <Col className="rounded-md border bg-muted/50 p-4 text-center text-sm">Cell</Col>
        </Grid>
      </Section>
    </div>
  )
}

// ---------------------------------------------------------------------------
// New component previews
// ---------------------------------------------------------------------------

const tagControlDefs = {
  variant: {
    type: "select" as const,
    options: ["default", "primary", "secondary", "destructive", "success"],
    defaultValue: "default",
    label: "Variant",
  },
  label: {
    type: "text" as const,
    defaultValue: "Tag label",
    label: "Label",
  },
  removable: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Removable",
  },
} satisfies ControlDefs

function TagPreview() {
  const controls = useControls(tagControlDefs)
  const { variant, label, removable } = controls.values
  const [tags, setTags] = useState(["React", "TypeScript", "Tailwind"])
  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <Tag variant={variant as "default"} onRemove={removable ? () => {} : undefined}>
            {label}
          </Tag>
        </div>
      </Playground>
      <Section title="Variants">
        <Tag>Default</Tag>
        <Tag variant="primary">Primary</Tag>
        <Tag variant="secondary">Secondary</Tag>
        <Tag variant="destructive">Destructive</Tag>
        <Tag variant="success">Success</Tag>
      </Section>
      <Section title="Removable">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag
              key={tag}
              variant="secondary"
              onRemove={() => setTags((t) => t.filter((x) => x !== tag))}
            >
              {tag}
            </Tag>
          ))}
        </div>
      </Section>
    </div>
  )
}

const statControlDefs = {
  label: {
    type: "text" as const,
    defaultValue: "Total Revenue",
    label: "Label",
  },
  value: {
    type: "text" as const,
    defaultValue: "$45,231.89",
    label: "Value",
  },
  trendDirection: {
    type: "select" as const,
    options: ["up", "down", "neutral"],
    defaultValue: "up",
    label: "Trend Direction",
  },
  trendText: {
    type: "text" as const,
    defaultValue: "+20.1% from last month",
    label: "Trend Text",
  },
} satisfies ControlDefs

function StatPreview() {
  const controls = useControls(statControlDefs)
  const { label, value, trendDirection, trendText } = controls.values
  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <Stat>
            <StatLabel>{label}</StatLabel>
            <StatValue>{value}</StatValue>
            <StatTrend direction={trendDirection as "up"}>{trendText}</StatTrend>
          </Stat>
        </div>
      </Playground>
      <Section title="Multiple Stats">
        <div className="grid grid-cols-3 gap-6">
          <Stat>
            <StatLabel>Users</StatLabel>
            <StatValue>2,350</StatValue>
            <StatTrend direction="up">+180 this week</StatTrend>
          </Stat>
          <Stat>
            <StatLabel>Bounce Rate</StatLabel>
            <StatValue>12.5%</StatValue>
            <StatTrend direction="down">-2.3% from last month</StatTrend>
          </Stat>
          <Stat>
            <StatLabel>Sessions</StatLabel>
            <StatValue>14,208</StatValue>
            <StatTrend direction="neutral">No change</StatTrend>
          </Stat>
        </div>
      </Section>
    </div>
  )
}

function DescriptionListPreview() {
  return (
    <DescriptionList>
      <DescriptionListItem>
        <DescriptionListTerm>Full Name</DescriptionListTerm>
        <DescriptionListDetail>James Cooke</DescriptionListDetail>
      </DescriptionListItem>
      <DescriptionListItem>
        <DescriptionListTerm>Email</DescriptionListTerm>
        <DescriptionListDetail>user@example.com</DescriptionListDetail>
      </DescriptionListItem>
      <DescriptionListItem>
        <DescriptionListTerm>Role</DescriptionListTerm>
        <DescriptionListDetail>Engineering Lead</DescriptionListDetail>
      </DescriptionListItem>
      <DescriptionListItem>
        <DescriptionListTerm>Status</DescriptionListTerm>
        <DescriptionListDetail>
          <Badge variant="default">Active</Badge>
        </DescriptionListDetail>
      </DescriptionListItem>
    </DescriptionList>
  )
}

const numberInputControlDefs = {
  min: {
    type: "number" as const,
    defaultValue: 0,
    min: -100,
    max: 100,
    label: "Min",
  },
  max: {
    type: "number" as const,
    defaultValue: 100,
    min: 0,
    max: 1000,
    label: "Max",
  },
  step: {
    type: "number" as const,
    defaultValue: 1,
    min: 1,
    max: 50,
    label: "Step",
  },
  disabled: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Disabled",
  },
} satisfies ControlDefs

function NumberInputPreview() {
  const controls = useControls(numberInputControlDefs)
  const { min, max, step, disabled } = controls.values
  const [value, setValue] = useState(5)
  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <NumberInput
            value={value}
            onChange={setValue}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
          />
        </div>
      </Playground>
      <Section title="With Step = 5">
        <NumberInput defaultValue={10} min={0} max={100} step={5} />
      </Section>
    </div>
  )
}

function DeadlineCountdownPreview() {
  const now = new Date()
  const inDays = (d: number) => {
    const date = new Date(now)
    date.setDate(date.getDate() + d)
    return date
  }
  const ago = (d: number) => {
    const date = new Date(now)
    date.setDate(date.getDate() - d)
    return date
  }
  return (
    <div className="space-y-8">
      <Section title="Normal (30 days out)">
        <DeadlineCountdown deadline={inDays(30)} label="Due in" />
      </Section>
      <Section title="Warning (5 days out)">
        <DeadlineCountdown deadline={inDays(5)} label="Due in" />
      </Section>
      <Section title="Critical (1 day out)">
        <DeadlineCountdown deadline={inDays(1)} label="Due in" />
      </Section>
      <Section title="Overdue (3 days ago)">
        <DeadlineCountdown deadline={ago(3)} label="Due in" />
      </Section>
      <Section title="Without Label or Dot">
        <DeadlineCountdown deadline={inDays(14)} showDot={false} />
      </Section>
      <Section title="In Context">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <p className="font-medium text-sm">AML Policy Review</p>
            <p className="text-muted-foreground text-xs">Annual compliance requirement</p>
          </div>
          <DeadlineCountdown deadline={inDays(3)} label="Due" />
        </div>
      </Section>
    </div>
  )
}

function PolicyBannerPreview() {
  return (
    <div className="space-y-8">
      <Section title="Info">
        <PolicyBanner variant="info">
          New FATF guidelines take effect on April 1, 2026. Review the updated compliance
          procedures.
        </PolicyBanner>
      </Section>
      <Section title="Warning">
        <PolicyBanner variant="warning" icon={<AlertTriangleIcon className="size-4" />}>
          Your AML policy expires in 7 days. Please renew to maintain compliance status.
        </PolicyBanner>
      </Section>
      <Section title="Critical">
        <PolicyBanner
          variant="critical"
          icon={<AlertCircleIcon className="size-4" />}
          action={
            <Button variant="destructive" size="sm">
              Review Now
            </Button>
          }
        >
          Regulatory deadline missed. Immediate action required to avoid penalties.
        </PolicyBanner>
      </Section>
      <Section title="Non-Dismissible">
        <PolicyBanner variant="info" dismissible={false}>
          This banner cannot be dismissed. It persists until the condition is resolved.
        </PolicyBanner>
      </Section>
    </div>
  )
}

const statusIndicatorControlDefs = {
  variant: {
    type: "select" as const,
    options: ["online", "offline", "busy", "away", "pending"],
    defaultValue: "online",
    label: "Variant",
  },
  size: {
    type: "select" as const,
    options: ["sm", "default", "lg"],
    defaultValue: "default",
    label: "Size",
  },
  pulse: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Pulse",
  },
} satisfies ControlDefs

function StatusIndicatorPreview() {
  const controls = useControls(statusIndicatorControlDefs)
  const { variant, size, pulse } = controls.values
  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <div className="flex items-center justify-center gap-3 py-4">
          <StatusIndicator variant={variant as "online"} size={size as "default"} pulse={pulse} />
          <span className="text-sm capitalize">{variant}</span>
        </div>
      </Playground>
      <Section title="All Variants">
        <div className="flex items-center gap-6">
          {(["online", "offline", "busy", "away", "pending"] as const).map((v) => (
            <div key={v} className="flex items-center gap-2">
              <StatusIndicator variant={v} />
              <span className="text-sm capitalize">{v}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Sizes">
        <div className="flex items-center gap-6">
          {(["sm", "default", "lg"] as const).map((s) => (
            <div key={s} className="flex items-center gap-2">
              <StatusIndicator variant="online" size={s} />
              <span className="text-sm">{s}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="With Pulse">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <StatusIndicator variant="online" pulse />
            <span className="text-sm">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusIndicator variant="busy" pulse />
            <span className="text-sm">Processing</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusIndicator variant="pending" pulse />
            <span className="text-sm">Syncing</span>
          </div>
        </div>
      </Section>
      <Section title="In Context (with Avatar)">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar>
              <AvatarFallback>JC</AvatarFallback>
            </Avatar>
            <StatusIndicator
              variant="online"
              size="sm"
              pulse
              className="absolute right-0 bottom-0 ring-2 ring-background"
            />
          </div>
          <div>
            <p className="font-medium text-sm">James Cooke</p>
            <p className="text-muted-foreground text-xs">Online</p>
          </div>
        </div>
      </Section>
    </div>
  )
}

const stripedBarControlDefs = {
  animated: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Animated",
  },
  stripes: {
    type: "number" as const,
    defaultValue: 60,
    min: 10,
    max: 120,
    label: "Stripes",
  },
  duration: {
    type: "number" as const,
    defaultValue: 800,
    min: 200,
    max: 3000,
    label: "Duration (ms)",
  },
} satisfies ControlDefs

function StripedBarPreview() {
  const controls = useControls(stripedBarControlDefs)
  const { animated, stripes, duration } = controls.values
  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <div className="w-full py-4">
          <StripedBar
            key={`${animated}-${stripes}-${duration}`}
            segments={[
              { value: 45, color: "#f87171", label: "Sanctions" },
              { value: 25, color: "#fb923c", label: "Mixer" },
              { value: 15, color: "#facc15", label: "Darknet" },
            ]}
            stripes={stripes}
            animated={animated}
            duration={duration}
          />
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="size-2.5 rounded-full" style={{ backgroundColor: "#f87171" }} />
              <span className="text-muted-foreground">Sanctions 45%</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="size-2.5 rounded-full" style={{ backgroundColor: "#fb923c" }} />
              <span className="text-muted-foreground">Mixer 25%</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="size-2.5 rounded-full" style={{ backgroundColor: "#facc15" }} />
              <span className="text-muted-foreground">Darknet 15%</span>
            </div>
          </div>
        </div>
      </Playground>
      <Section title="Single Segment">
        <StripedBar segments={[{ value: 100, color: "#f87171" }]} />
      </Section>
      <Section title="No Color (uses primary)">
        <StripedBar segments={[{ value: 70 }]} />
      </Section>
      <Section title="Multiple Segments with Dividers">
        <StripedBar
          segments={[
            { value: 30, color: "#22c55e" },
            { value: 20, color: "#3b82f6" },
            { value: 25, color: "#f97316" },
            { value: 15, color: "#ef4444" },
          ]}
        />
      </Section>
      <Section title="Taller Height">
        <StripedBar
          className="h-16"
          segments={[
            { value: 60, color: "#8b5cf6" },
            { value: 30, color: "#06b6d4" },
          ]}
        />
      </Section>
    </div>
  )
}

const waffleChartControlDefs = {
  mode: {
    type: "select" as const,
    options: ["grid", "bar"],
    defaultValue: "grid",
    label: "Mode",
  },
  size: {
    type: "select" as const,
    options: ["xs", "sm", "default", "lg"],
    defaultValue: "default",
    label: "Size",
  },
  animate: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Animate",
  },
  duration: {
    type: "number" as const,
    defaultValue: 800,
    min: 200,
    max: 3000,
    label: "Duration (ms)",
  },
} satisfies ControlDefs

const exampleSegments = [
  { value: 45, color: "#f87171", label: "Sanctions" },
  { value: 25, color: "#fb923c", label: "Mixer" },
  { value: 15, color: "#facc15", label: "Darknet" },
]

function WaffleChartPreview() {
  const controls = useControls(waffleChartControlDefs)
  const { mode, size, animate, duration } = controls.values
  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <div className="w-full py-4">
          <WaffleChart
            key={`${mode}-${size}-${animate}-${duration}`}
            segments={exampleSegments}
            mode={mode as "grid"}
            size={size as "default"}
            animate={animate}
            duration={duration}
          />
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            {exampleSegments.map((seg) => (
              <div key={seg.label} className="flex items-center gap-1.5 text-xs">
                <span className="size-2.5 rounded-full" style={{ backgroundColor: seg.color }} />
                <span className="text-muted-foreground">
                  {seg.label} {seg.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </Playground>
      <Section title="Grid Mode (default)">
        <div className="max-w-sm">
          <WaffleChart segments={exampleSegments} animate={false} />
        </div>
      </Section>
      <Section title="Bar Mode">
        <WaffleChart segments={exampleSegments} mode="bar" animate={false} />
      </Section>
      <Section title="Bar Mode — No Dividers">
        <WaffleChart segments={exampleSegments} mode="bar" dividers={false} animate={false} />
      </Section>
      <Section title="Custom Grid (5x20)">
        <div className="max-w-xl">
          <WaffleChart
            segments={[
              { value: 60, color: "#8b5cf6", label: "Compliant" },
              { value: 25, color: "#f97316", label: "Pending" },
              { value: 10, color: "#ef4444", label: "Failed" },
            ]}
            rows={5}
            cols={20}
            className="aspect-[4/1]"
            animate={false}
          />
        </div>
      </Section>
      <Section title="Single Segment">
        <div className="max-w-sm">
          <WaffleChart segments={[{ value: 100, color: "#f87171" }]} animate={false} />
        </div>
      </Section>
      <Section title="Bar Sizes">
        <div className="space-y-4">
          {(["xs", "sm", "default", "lg"] as const).map((s) => (
            <div key={s}>
              <p className="mb-1 text-muted-foreground text-xs">{s}</p>
              <WaffleChart mode="bar" size={s} segments={exampleSegments} animate={false} />
            </div>
          ))}
        </div>
      </Section>
      <Section title="Grid Sizes">
        <div className="flex items-start gap-6">
          {(["xs", "sm", "default", "lg"] as const).map((s) => (
            <div key={s}>
              <p className="mb-1 text-muted-foreground text-xs">{s}</p>
              <WaffleChart mode="grid" size={s} segments={exampleSegments} animate={false} />
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

function TimelinePreview() {
  return (
    <div className="space-y-8">
      <Section title="Default">
        <Timeline>
          <TimelineItem>
            <TimelineDot />
            <TimelineContent>
              <TimelineTitle>Application submitted</TimelineTitle>
              <TimelineTime>2 hours ago</TimelineTime>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineDot />
            <TimelineContent>
              <TimelineTitle>Review in progress</TimelineTitle>
              <TimelineTime>1 hour ago</TimelineTime>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineDot />
            <TimelineContent>
              <TimelineTitle>Approved</TimelineTitle>
              <TimelineTime>Just now</TimelineTime>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Section>
      <Section title="With Icons">
        <Timeline>
          <TimelineItem>
            <TimelineDot className="border-emerald-500 bg-emerald-50 dark:bg-emerald-950">
              <CheckCircle className="size-3 text-emerald-600" />
            </TimelineDot>
            <TimelineContent>
              <TimelineTitle>KYC verification passed</TimelineTitle>
              <TimelineTime>Mar 15, 2026 at 10:32 AM</TimelineTime>
              <p className="mt-1 text-muted-foreground text-xs">
                Identity documents verified. Risk score: Low.
              </p>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineDot className="border-amber-500 bg-amber-50 dark:bg-amber-950">
              <AlertTriangleIcon className="size-3 text-amber-600" />
            </TimelineDot>
            <TimelineContent>
              <TimelineTitle>Sanctions screening flagged</TimelineTitle>
              <TimelineTime>Mar 15, 2026 at 11:15 AM</TimelineTime>
              <p className="mt-1 text-muted-foreground text-xs">
                Potential match found. Escalated to compliance officer.
              </p>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineDot className="border-blue-500 bg-blue-50 dark:bg-blue-950">
              <UserIcon className="size-3 text-blue-600" />
            </TimelineDot>
            <TimelineContent>
              <TimelineTitle>Manual review assigned</TimelineTitle>
              <TimelineTime>Mar 15, 2026 at 11:45 AM</TimelineTime>
              <p className="mt-1 text-muted-foreground text-xs">
                Assigned to Sarah Chen for secondary review.
              </p>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineDot className="border-emerald-500 bg-emerald-50 dark:bg-emerald-950">
              <CheckCircle className="size-3 text-emerald-600" />
            </TimelineDot>
            <TimelineContent>
              <TimelineTitle>Case cleared</TimelineTitle>
              <TimelineTime>Mar 16, 2026 at 9:20 AM</TimelineTime>
              <p className="mt-1 text-muted-foreground text-xs">
                False positive confirmed. No sanctions match.
              </p>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Section>
      <Section title="Compact (Audit Trail)">
        <Timeline className="space-y-0">
          <TimelineItem className="pb-4">
            <TimelineDot className="size-2.5 border-0 bg-muted-foreground/40" />
            <TimelineContent>
              <div className="flex items-baseline gap-2">
                <TimelineTitle className="text-xs">Policy updated</TimelineTitle>
                <TimelineTime className="text-[10px]">2 min ago</TimelineTime>
              </div>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem className="pb-4">
            <TimelineDot className="size-2.5 border-0 bg-muted-foreground/40" />
            <TimelineContent>
              <div className="flex items-baseline gap-2">
                <TimelineTitle className="text-xs">Report exported</TimelineTitle>
                <TimelineTime className="text-[10px]">15 min ago</TimelineTime>
              </div>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem className="pb-4">
            <TimelineDot className="size-2.5 border-0 bg-muted-foreground/40" />
            <TimelineContent>
              <div className="flex items-baseline gap-2">
                <TimelineTitle className="text-xs">User role changed</TimelineTitle>
                <TimelineTime className="text-[10px]">1 hour ago</TimelineTime>
              </div>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Section>
    </div>
  )
}

function SegmentedControlPreview() {
  return (
    <div className="space-y-6">
      <Section title="Default">
        <SegmentedControl
          options={[
            { label: "Daily", value: "daily" },
            { label: "Weekly", value: "weekly" },
            { label: "Monthly", value: "monthly" },
          ]}
          defaultValue="weekly"
        />
      </Section>
    </div>
  )
}

const calloutControlDefs = {
  variant: {
    type: "select" as const,
    options: ["info", "warning", "danger", "tip"],
    defaultValue: "info",
    label: "Variant",
  },
  message: {
    type: "text" as const,
    defaultValue: "This is an informational callout with helpful context.",
    label: "Message",
  },
} satisfies ControlDefs

function CalloutPreview() {
  const controls = useControls(calloutControlDefs)
  const { variant, message } = controls.values
  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <div className="max-w-lg">
          <Callout variant={variant as "info"}>{message}</Callout>
        </div>
      </Playground>
      <Section title="All Variants">
        <div className="w-full max-w-lg space-y-4">
          <Callout variant="info">This is an informational callout with helpful context.</Callout>
          <Callout variant="warning">Please review the changes before proceeding.</Callout>
          <Callout variant="danger">Something went wrong. Please try again.</Callout>
          <Callout variant="tip">You can use keyboard shortcuts for faster navigation.</Callout>
        </div>
      </Section>
    </div>
  )
}

const fileUploadControlDefs = {
  multiple: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Multiple",
  },
  disabled: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Disabled",
  },
  accept: {
    type: "text" as const,
    defaultValue: "image/png,image/jpeg",
    label: "Accept",
    placeholder: "e.g. image/*,.pdf",
  },
} satisfies ControlDefs

function FileUploadPreview() {
  const controls = useControls(fileUploadControlDefs)
  const { multiple, disabled, accept } = controls.values
  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <div className="max-w-md">
          <FileUpload
            accept={accept || undefined}
            multiple={multiple}
            disabled={disabled}
            maxSize={5 * 1024 * 1024}
            onChange={(files) => console.log("Files:", files)}
          />
        </div>
      </Playground>
    </div>
  )
}

const codeBlockControlDefs = {
  language: {
    type: "select" as const,
    options: ["tsx", "typescript", "javascript", "css", "html", "json", "bash"],
    defaultValue: "tsx",
    label: "Language",
  },
  showLineNumbers: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Line Numbers",
  },
  showCopy: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Copy Button",
  },
} satisfies ControlDefs

const codeBlockSampleCode = `import { Button } from "@cogentic/ds"

export function MyComponent() {
  return (
    <Button variant="default">
      Click me
    </Button>
  )
}`

function CodeBlockPreview() {
  const controls = useControls(codeBlockControlDefs)
  const { language, showLineNumbers, showCopy } = controls.values
  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <div className="max-w-lg">
          <CodeBlock
            language={language}
            code={codeBlockSampleCode}
            showLineNumbers={showLineNumbers}
            showCopy={showCopy}
          />
        </div>
      </Playground>
    </div>
  )
}

const loadingOverlayControlDefs = {
  loading: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Loading",
  },
  label: {
    type: "text" as const,
    defaultValue: "",
    label: "Label",
    placeholder: "Optional loading text...",
  },
} satisfies ControlDefs

function LoadingOverlayPreview() {
  const controls = useControls(loadingOverlayControlDefs)
  const { loading, label } = controls.values
  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <LoadingOverlay loading={loading} label={label || undefined}>
          <Card>
            <CardHeader>
              <CardTitle>Content Card</CardTitle>
              <CardDescription>This content is behind the overlay.</CardDescription>
            </CardHeader>
            <CardContent>
              <P>Some content that gets overlaid while loading.</P>
            </CardContent>
          </Card>
        </LoadingOverlay>
      </Playground>
    </div>
  )
}

const inlineEditControlDefs = {
  placeholder: {
    type: "text" as const,
    defaultValue: "Click to edit",
    label: "Placeholder",
  },
} satisfies ControlDefs

function InlineEditPreview() {
  const controls = useControls(inlineEditControlDefs)
  const { placeholder } = controls.values
  const [value, setValue] = useState("Click to edit this text")
  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <InlineEdit value={value} onChange={setValue} placeholder={placeholder} />
        </div>
      </Playground>
    </div>
  )
}

const copyButtonControlDefs = {
  value: {
    type: "text" as const,
    defaultValue: "pnpm add @cogentic/ds",
    label: "Value",
  },
} satisfies ControlDefs

function CopyButtonPreview() {
  const controls = useControls(copyButtonControlDefs)
  const { value } = controls.values
  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <div className="flex items-center justify-center gap-2 py-4">
          <div className="flex items-center gap-2 rounded-md border px-3 py-2">
            <code className="text-sm">{value}</code>
            <CopyButton value={value} />
          </div>
        </div>
      </Playground>
      <Section title="Icon only">
        <CopyButton value="npm install @cogentic/ds" />
      </Section>
    </div>
  )
}

function VisuallyHiddenPreview() {
  return (
    <div className="space-y-4">
      <P>The text below is visually hidden but readable by screen readers:</P>
      <div className="rounded-md border p-4">
        <Button variant="outline" size="icon">
          <SearchIcon className="size-4" />
          <VisuallyHidden>Search</VisuallyHidden>
        </Button>
        <span className="ml-3 text-muted-foreground text-sm">
          ← Icon button with VisuallyHidden label for accessibility
        </span>
      </div>
    </div>
  )
}

function DirectionPreview() {
  return (
    <div className="space-y-4">
      <P className="text-muted-foreground text-sm">
        DirectionProvider wraps your app to set RTL/LTR direction. Components like Select and Dialog
        respond automatically.
      </P>
      <div className="rounded-md border border-dashed p-6 text-center text-muted-foreground text-sm">
        Wrap your app with {'<DirectionProvider dir="rtl">'} for RTL support.
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Workflow previews
// ---------------------------------------------------------------------------

// Shared workflow canvas data — vertical flow layout (source=bottom, target=top)
const workflowCanvasNodes = [
  {
    id: "1",
    type: "workflowNode",
    position: { x: 100, y: 30 },
    data: { title: "Input", description: "User message" },
  },
  {
    id: "2",
    type: "workflowNode",
    position: { x: 100, y: 230 },
    data: { title: "Process", description: "AI analysis" },
  },
  {
    id: "3",
    type: "workflowNode",
    position: { x: 100, y: 430 },
    data: { title: "Output", description: "Response" },
  },
]

const workflowCanvasEdges = [
  { id: "e1-2", source: "1", target: "2", type: "solid" },
  { id: "e2-3", source: "2", target: "3", type: "animated" },
]

function WorkflowNodeRenderer({ data }: { data: { title: string; description: string } }) {
  return (
    <WorkflowNode title={data.title} handles={{ target: true, source: true }}>
      <p className="text-muted-foreground text-xs">{data.description}</p>
    </WorkflowNode>
  )
}

const nodeTypes = { workflowNode: WorkflowNodeRenderer }
const allEdgeTypes = {
  solid: SolidEdge,
  dotted: DottedEdge,
  dashed: DashedEdge,
  animated: AnimatedEdge,
  temporary: TemporaryEdge,
}

const canvasControlDefs = {
  layout: { type: "radio", options: ["vertical", "horizontal"], defaultValue: "vertical" },
  panOnDrag: { type: "boolean", defaultValue: false, label: "panOnDrag" },
  zoomOnDoubleClick: { type: "boolean", defaultValue: false, label: "zoomOnDoubleClick" },
} satisfies ControlDefs

function WorkflowCanvasPreview() {
  const controls = useControls(canvasControlDefs)
  const isHoriz = controls.values.layout === "horizontal"
  const nodes = isHoriz
    ? [
        {
          id: "1",
          type: "workflowNode",
          position: { x: 0, y: 100 },
          data: { title: "Input", description: "Source data" },
        },
        {
          id: "2",
          type: "workflowNode",
          position: { x: 350, y: 100 },
          data: { title: "Process", description: "AI analysis" },
        },
        {
          id: "3",
          type: "workflowNode",
          position: { x: 700, y: 100 },
          data: { title: "Output", description: "Response" },
        },
      ]
    : workflowCanvasNodes
  return (
    <div className="space-y-4">
      <ControlsPanel controls={controls} />
      <div className="h-[600px] w-full rounded-lg border">
        <Canvas
          nodes={nodes}
          edges={workflowCanvasEdges}
          nodeTypes={nodeTypes}
          edgeTypes={allEdgeTypes}
          layout={controls.values.layout as "vertical" | "horizontal"}
          panOnDrag={controls.values.panOnDrag}
          zoomOnDoubleClick={controls.values.zoomOnDoubleClick}
          fitView
        />
      </div>
    </div>
  )
}

const workflowNodeControlDefs = {
  state: {
    type: "radio",
    options: ["default", "selected", "dotted"],
    defaultValue: "default",
    label: "State",
  },
  title: { type: "text", defaultValue: "Send Email", label: "Title" },
  status: { type: "text", defaultValue: "TRIGGER", label: "Status pill" },
  draggable: { type: "boolean", defaultValue: true, label: "Draggable" },
  collapsible: { type: "boolean", defaultValue: true, label: "Collapsible" },
} satisfies ControlDefs

function WorkflowNodePreview() {
  const controls = useControls(workflowNodeControlDefs)
  return (
    <div className="space-y-10">
      <Playground controls={controls}>
        <WorkflowNode
          state={controls.values.state as "default"}
          title={controls.values.title}
          icon={
            <span className="relative inline-flex size-8 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground text-sm">
              <MailIcon className="size-4" />
            </span>
          }
          status={controls.values.status || undefined}
          draggable={controls.values.draggable}
          collapsible={controls.values.collapsible}
        >
          <WorkflowNodeRow label="To" value="user@example.com" />
          <WorkflowNodeRow label="Subject" value="Welcome aboard!" />
          <WorkflowNodeRow label="Template" value="onboarding-v2" />
        </WorkflowNode>
      </Playground>

      <Section title="With icon badge & rich rows">
        <WorkflowNode
          state="selected"
          title="Form Submission in Webflow"
          icon={
            <span className="relative inline-flex size-8 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground text-sm">
              W
              <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-primary font-bold text-[9px] text-primary-foreground ring-2 ring-card">
                1
              </span>
            </span>
          }
          status="Trigger"
          draggable
          collapsible
        >
          <p className="mb-1 font-semibold text-sm">App & event</p>
          <WorkflowNodeRow
            label="Application"
            value="Webflow"
            icon={
              <span className="inline-flex size-5 items-center justify-center rounded bg-primary font-bold text-[10px] text-primary-foreground">
                W
              </span>
            }
          />
          <WorkflowNodeRow
            label="Event"
            value="Form Submission"
            icon={<Package className="size-4 text-muted-foreground" />}
          />
          <WorkflowNodeRow
            label="Account source"
            value="Anna Peterson"
            icon={
              <span className="inline-flex size-6 items-center justify-center rounded-full bg-accent font-semibold text-[10px]">
                AP
              </span>
            }
          />
        </WorkflowNode>
      </Section>

      <Section title="Default">
        <WorkflowNode
          title="Process Data"
          icon={
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/40">
              <SettingsIcon className="size-4 text-emerald-600 dark:text-emerald-400" />
            </span>
          }
          status="Action"
          draggable
        >
          <WorkflowNodeRow label="Input" value="API Response" />
          <WorkflowNodeRow label="Output" value="Parsed JSON" />
        </WorkflowNode>
      </Section>

      <Section title="Dotted (placeholder)">
        <WorkflowNode
          state="dotted"
          title="Add a step..."
          icon={<PlusIcon className="size-5 text-muted-foreground" />}
        />
      </Section>

      <Section title="With custom footer">
        <WorkflowNode
          title="AI Agent"
          icon={
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/40">
              <Package className="size-4 text-violet-600 dark:text-violet-400" />
            </span>
          }
          status="Running"
          footer={<Badge variant="secondary">3 tasks queued</Badge>}
        >
          <P className="text-muted-foreground text-xs">Processes incoming requests using GPT-4</P>
        </WorkflowNode>
      </Section>
    </div>
  )
}

function WorkflowEdgePreview() {
  // 4 columns, each with a top→bottom pair showing one edge variant
  const colSpacing = 380
  const edgeNodes = [
    {
      id: "a",
      type: "workflowNode",
      position: { x: 0, y: 0 },
      data: { title: "Start", description: "Trigger" },
    },
    {
      id: "b",
      type: "workflowNode",
      position: { x: 0, y: 250 },
      data: { title: "Solid", description: "Default edge" },
    },
    {
      id: "c",
      type: "workflowNode",
      position: { x: colSpacing, y: 0 },
      data: { title: "Source", description: "Data" },
    },
    {
      id: "d",
      type: "workflowNode",
      position: { x: colSpacing, y: 250 },
      data: { title: "Dotted", description: "Pending" },
    },
    {
      id: "e",
      type: "workflowNode",
      position: { x: colSpacing * 2, y: 0 },
      data: { title: "Input", description: "Queue" },
    },
    {
      id: "f",
      type: "workflowNode",
      position: { x: colSpacing * 2, y: 250 },
      data: { title: "Dashed", description: "Optional" },
    },
    {
      id: "g",
      type: "workflowNode",
      position: { x: colSpacing * 3, y: 0 },
      data: { title: "Agent", description: "AI" },
    },
    {
      id: "h",
      type: "workflowNode",
      position: { x: colSpacing * 3, y: 250 },
      data: { title: "Animated", description: "Active" },
    },
  ]
  const edgeEdges = [
    { id: "e-ab", source: "a", target: "b", type: "solid" },
    { id: "e-cd", source: "c", target: "d", type: "dotted" },
    { id: "e-ef", source: "e", target: "f", type: "dashed" },
    { id: "e-gh", source: "g", target: "h", type: "animated" },
  ]
  return (
    <div className="space-y-4">
      <div className="flex gap-6 text-muted-foreground text-xs">
        <span>
          <strong>Solid</strong> — default connection
        </span>
        <span>
          <strong>Dotted</strong> — pending/optional
        </span>
        <span>
          <strong>Dashed</strong> — conditional
        </span>
        <span>
          <strong>Animated</strong> — active data flow
        </span>
      </div>
      <div className="h-[500px] w-full rounded-lg border">
        <Canvas
          nodes={edgeNodes}
          edges={edgeEdges}
          nodeTypes={nodeTypes}
          edgeTypes={allEdgeTypes}
          fitView
          fitViewOptions={{ padding: 0.3 }}
        />
      </div>
    </div>
  )
}

const connectionVariants = {
  default: WorkflowConnection,
  dotted: WorkflowConnectionDotted,
  dashed: WorkflowConnectionDashed,
  animated: WorkflowConnectionAnimated,
} as const

// Maps connection variant name → edge type name used in allEdgeTypes
const variantToEdgeType: Record<keyof typeof connectionVariants, string> = {
  default: "solid",
  dotted: "dotted",
  dashed: "dashed",
  animated: "animated",
}

function WorkflowConnectionPreview() {
  const [variant, setVariant] = useState<keyof typeof connectionVariants>("default")
  const [edges, setEdges] = useState<Edge[]>([])

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((prev) => addEdge({ ...connection, type: variantToEdgeType[variant] }, prev))
    },
    [variant],
  )

  const connNodes = [
    {
      id: "c1",
      type: "workflowNode",
      position: { x: 100, y: 30 },
      data: { title: "Source Node", description: "Drag from the bottom handle ↓" },
    },
    {
      id: "c2",
      type: "workflowNode",
      position: { x: 100, y: 300 },
      data: { title: "Target Node", description: "Drop on the top handle ↑" },
    },
  ]

  return (
    <div className="space-y-3">
      <p className="text-muted-foreground text-sm">
        Select a variant, then drag from the bottom handle to the top handle. Both the drag line and
        the resulting edge use the selected style.
      </p>
      <div className="flex gap-2">
        {(Object.keys(connectionVariants) as (keyof typeof connectionVariants)[]).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setVariant(v)}
            className={cn(
              "rounded-md border px-3 py-1.5 font-medium text-xs transition-colors",
              variant === v
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:bg-muted",
            )}
          >
            {v}
          </button>
        ))}
        {edges.length > 0 && (
          <button
            type="button"
            onClick={() => setEdges([])}
            className="rounded-md border border-border px-3 py-1.5 font-medium text-muted-foreground text-xs transition-colors hover:bg-muted"
          >
            Clear edges
          </button>
        )}
      </div>
      <div className="h-[500px] w-full rounded-lg border">
        <Canvas
          key={variant}
          nodes={connNodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={allEdgeTypes}
          onConnect={onConnect}
          connectionLineComponent={connectionVariants[variant]}
          fitView
          fitViewOptions={{ padding: 0.3 }}
        />
      </div>
    </div>
  )
}

function WorkflowControlsPreview() {
  return (
    <div className="h-[600px] w-full rounded-lg border">
      <Canvas
        nodes={workflowCanvasNodes}
        edges={workflowCanvasEdges}
        nodeTypes={nodeTypes}
        edgeTypes={allEdgeTypes}
        fitView
      >
        <WorkflowControls />
      </Canvas>
    </div>
  )
}

function WorkflowPanelPreview() {
  return (
    <div className="h-[600px] w-full rounded-lg border">
      <Canvas
        nodes={workflowCanvasNodes}
        edges={workflowCanvasEdges}
        nodeTypes={nodeTypes}
        edgeTypes={allEdgeTypes}
        fitView
      >
        <WorkflowPanel position="top-left">
          <div className="w-48 space-y-2 p-2">
            <p className="font-semibold text-foreground text-xs">Workflow Info</p>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Nodes</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Edges</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Status</span>
                <span className="inline-flex items-center gap-1 font-medium text-emerald-600">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Active
                </span>
              </div>
            </div>
          </div>
        </WorkflowPanel>
        <WorkflowPanel position="top-right">
          <div className="flex items-center gap-1 p-1">
            <button
              type="button"
              className="rounded px-2 py-1 text-muted-foreground text-xs transition-colors hover:bg-muted"
            >
              <PlusIcon className="size-3.5" />
            </button>
            <button
              type="button"
              className="rounded px-2 py-1 text-muted-foreground text-xs transition-colors hover:bg-muted"
            >
              <SettingsIcon className="size-3.5" />
            </button>
          </div>
        </WorkflowPanel>
      </Canvas>
    </div>
  )
}

const gateIconMap: Record<string, React.ReactNode> = {
  "if-else": <GitBranch />,
  switch: <Route />,
  merge: <GitMerge />,
  delay: <Timer />,
  end: <StopCircle />,
}

const workflowGateControlDefs = {
  type: {
    type: "select",
    options: ["if-else", "switch", "merge", "delay", "end"],
    defaultValue: "if-else",
    label: "Type",
  },
  selected: { type: "boolean", defaultValue: false, label: "Selected" },
  showBranches: { type: "boolean", defaultValue: true, label: "Show branches" },
  useIcon: { type: "boolean", defaultValue: true, label: "Icon (vs text)" },
} satisfies ControlDefs

function WorkflowGatePreview() {
  const controls = useControls(workflowGateControlDefs)
  const gateType = controls.values.type as "if-else"
  return (
    <div className="space-y-10">
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-8">
          <WorkflowGate
            type={gateType}
            selected={controls.values.selected}
            icon={controls.values.useIcon ? gateIconMap[gateType] : undefined}
            label={!controls.values.useIcon ? gateType.toUpperCase().slice(0, 3) : undefined}
            branches={
              controls.values.showBranches ? { left: "Is True", right: "If False" } : undefined
            }
          />
        </div>
      </Playground>

      <Section title="All gate types">
        <div className="flex flex-wrap items-center gap-10 py-4">
          <div className="flex flex-col items-center gap-3">
            <WorkflowGate type="if-else" icon={<GitBranch />} />
            <span className="font-medium text-muted-foreground text-xs">IF / ELSE</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <WorkflowGate type="switch" icon={<Route />} />
            <span className="font-medium text-muted-foreground text-xs">Switch</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <WorkflowGate type="merge" icon={<GitMerge />} />
            <span className="font-medium text-muted-foreground text-xs">Merge</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <WorkflowGate type="delay" icon={<Timer />} />
            <span className="font-medium text-muted-foreground text-xs">Delay</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <WorkflowGate type="end" icon={<StopCircle />} />
            <span className="font-medium text-muted-foreground text-xs">End</span>
          </div>
        </div>
      </Section>
    </div>
  )
}

const workflowLabelControlDefs = {
  variant: {
    type: "select",
    options: ["default", "success", "warning", "error", "muted"],
    defaultValue: "default",
    label: "Variant",
  },
  text: { type: "text", defaultValue: "Approved", label: "Text" },
} satisfies ControlDefs

function WorkflowLabelPreview() {
  const controls = useControls(workflowLabelControlDefs)
  return (
    <div className="space-y-6">
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <WorkflowLabel variant={controls.values.variant as "default"}>
            {controls.values.text}
          </WorkflowLabel>
        </div>
      </Playground>

      <Section title="All variants">
        <div className="flex flex-wrap gap-2">
          <WorkflowLabel>Default</WorkflowLabel>
          <WorkflowLabel variant="success">Success</WorkflowLabel>
          <WorkflowLabel variant="warning">Condition met</WorkflowLabel>
          <WorkflowLabel variant="error">Failed</WorkflowLabel>
          <WorkflowLabel variant="muted">Skipped</WorkflowLabel>
        </div>
      </Section>
      <Section title="On an edge (use as edge data.label)">
        <div className="flex items-center gap-4 text-muted-foreground text-sm">
          <span>Node A</span>
          <div className="relative flex flex-1 items-center justify-center border-muted-foreground/30 border-t border-dashed">
            <WorkflowLabel variant="success" className="absolute">
              Yes
            </WorkflowLabel>
          </div>
          <span>Node B</span>
        </div>
      </Section>
    </div>
  )
}

function ToolbarNodeRenderer({ data }: { data: { title: string; description: string } }) {
  return (
    <WorkflowNode title={data.title} handles={{ target: true, source: true }}>
      <p className="text-muted-foreground text-xs">{data.description}</p>
      <WorkflowToolbar>
        <button
          type="button"
          className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <CopyIcon className="size-3.5" />
        </button>
        <button
          type="button"
          className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <SettingsIcon className="size-3.5" />
        </button>
        <button
          type="button"
          className="rounded p-1 text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
        >
          <Trash2Icon className="size-3.5" />
        </button>
      </WorkflowToolbar>
    </WorkflowNode>
  )
}

const toolbarNodeTypes = { workflowNode: ToolbarNodeRenderer }

function WorkflowToolbarPreview() {
  const toolbarNodes = [
    {
      id: "t1",
      type: "workflowNode",
      position: { x: 100, y: 60 },
      data: { title: "Selected Node", description: "Click this node to see the toolbar" },
      selected: true,
    },
  ]
  return (
    <div className="space-y-3">
      <p className="text-muted-foreground text-sm">
        The toolbar appears below a selected node. Click a node to see it.
      </p>
      <div className="h-[300px] w-full rounded-lg border">
        <Canvas
          nodes={toolbarNodes}
          edges={[]}
          nodeTypes={toolbarNodeTypes}
          edgeTypes={allEdgeTypes}
          fitView
          fitViewOptions={{ padding: 0.5 }}
        />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// WorkflowMinimap preview
// ---------------------------------------------------------------------------

function WorkflowMinimapPreview() {
  const minimapNodes = [
    { id: "m1", type: "workflowNode", position: { x: 0, y: 0 }, data: { title: "Start" } },
    { id: "m2", type: "workflowNode", position: { x: 250, y: 0 }, data: { title: "Process" } },
    { id: "m3", type: "workflowNode", position: { x: 500, y: 0 }, data: { title: "End" } },
    { id: "m4", type: "workflowNode", position: { x: 250, y: 200 }, data: { title: "Branch" } },
  ]
  const minimapEdges = [
    { id: "me1", source: "m1", target: "m2", type: "solid" },
    { id: "me2", source: "m2", target: "m3", type: "solid" },
    { id: "me3", source: "m2", target: "m4", type: "dotted" },
  ]
  return (
    <div className="space-y-3">
      <p className="text-muted-foreground text-sm">
        A themed minimap overlay — drag the viewport indicator or click to navigate.
      </p>
      <div className="h-[400px] w-full rounded-lg border">
        <Canvas
          nodes={minimapNodes}
          edges={minimapEdges}
          nodeTypes={toolbarNodeTypes}
          edgeTypes={allEdgeTypes}
          fitView
          fitViewOptions={{ padding: 0.3 }}
        >
          <WorkflowMinimap />
        </Canvas>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// WorkflowGroup preview
// ---------------------------------------------------------------------------

function WorkflowGroupPreview() {
  const controls = useControls({
    variant: {
      type: "select" as const,
      options: ["default", "primary", "success", "warning"],
      defaultValue: "default",
      label: "Variant",
    },
    selected: { type: "boolean" as const, defaultValue: false, label: "Selected" },
    label: { type: "text" as const, defaultValue: "Retry Loop", label: "Label" },
    showIcon: { type: "boolean" as const, defaultValue: true, label: "Show Icon" },
  })
  const { values } = controls

  return (
    <Playground controls={controls}>
      <div className="flex items-center justify-center p-8">
        <WorkflowGroup
          variant={values.variant as "default" | "primary" | "success" | "warning"}
          selected={values.selected as boolean}
          label={values.label as string}
          icon={values.showIcon ? <Package /> : undefined}
          className="w-72"
        >
          <div className="flex flex-col gap-3 p-2">
            <div className="rounded-xl border bg-card p-3 text-sm">Node A</div>
            <div className="rounded-xl border bg-card p-3 text-sm">Node B</div>
          </div>
        </WorkflowGroup>
      </div>
    </Playground>
  )
}

// ---------------------------------------------------------------------------
// WorkflowHandle preview
// ---------------------------------------------------------------------------

function WorkflowHandlePreview() {
  return (
    <div className="space-y-3">
      <p className="text-muted-foreground text-sm">
        Standalone styled handles that auto-detect position from layout context. Includes an error
        boundary for safe rendering outside ReactFlow.
      </p>
      <div className="h-[300px] w-full rounded-lg border">
        <Canvas
          nodes={[
            {
              id: "h1",
              type: "handleDemo",
              position: { x: 50, y: 80 },
              data: { label: "Source" },
            },
            {
              id: "h2",
              type: "handleDemo",
              position: { x: 350, y: 80 },
              data: { label: "Target" },
            },
          ]}
          edges={[{ id: "he1", source: "h1", target: "h2", type: "solid" }]}
          nodeTypes={{
            ...toolbarNodeTypes,
            handleDemo: HandleDemoNode,
          }}
          edgeTypes={allEdgeTypes}
          fitView
          fitViewOptions={{ padding: 0.5 }}
        />
      </div>
    </div>
  )
}

function HandleDemoNode({ data }: { data: { label: string } }) {
  return (
    <div className="relative rounded-xl border-2 border-border bg-card px-6 py-4 font-medium text-sm">
      <WorkflowHandle type="target" />
      {data.label}
      <WorkflowHandle type="source" />
    </div>
  )
}

// ── AI / Chatbot Previews ──

function ShimmerPreview() {
  return (
    <div className="space-y-4">
      <Shimmer>Generating response...</Shimmer>
      <Shimmer as="h3" className="font-bold text-lg" duration={3}>
        Loading analysis
      </Shimmer>
      <Shimmer as="span" className="text-sm">
        Please wait while we process your request
      </Shimmer>
    </div>
  )
}

function SuggestionPreview() {
  return (
    <Suggestions>
      <Suggestion onClick={() => {}}>Summarize this document</Suggestion>
      <Suggestion onClick={() => {}}>Explain in simpler terms</Suggestion>
      <Suggestion onClick={() => {}}>Generate a report</Suggestion>
      <Suggestion onClick={() => {}}>Find similar cases</Suggestion>
    </Suggestions>
  )
}

function ReasoningPreview() {
  return (
    <Reasoning defaultOpen>
      <ReasoningTrigger />
      <ReasoningContent>
        Let me think about this step by step. First, I need to analyze the input data to identify
        the key patterns. Then I'll cross-reference with known compliance frameworks to determine
        the applicable regulations. Finally, I'll formulate a comprehensive response.
      </ReasoningContent>
    </Reasoning>
  )
}

function SourcesPreview() {
  return (
    <Sources defaultOpen>
      <SourcesTrigger>3 sources</SourcesTrigger>
      <SourcesContent>
        <Source
          href="https://example.com/fatf"
          title="FATF Recommendations"
          description="Financial Action Task Force guidelines on AML/CFT"
        />
        <Source
          href="https://example.com/eu-regulation"
          title="EU 6th Anti-Money Laundering Directive"
          description="Directive (EU) 2018/1673 on combating money laundering"
        />
        <Source
          href="https://example.com/fincen"
          title="FinCEN Guidance"
          description="US Financial Crimes Enforcement Network advisory"
        />
      </SourcesContent>
    </Sources>
  )
}

function AttachmentsPreview() {
  return (
    <Attachments>
      <Attachment name="compliance-report.pdf" type="file" />
      <Attachment name="screenshot.png" type="image" onRemove={() => {}} />
      <Attachment name="meeting-recording.mp4" type="video" />
      <Attachment name="interview.mp3" type="audio" />
    </Attachments>
  )
}

function InlineCitationPreview() {
  return (
    <p className="text-sm leading-relaxed">
      According to the latest regulatory framework,{" "}
      <InlineCitation
        index={1}
        href="https://example.com"
        title="FATF Recommendations 2023"
        description="Updated guidance on virtual asset service providers"
      >
        virtual asset service providers must implement robust KYC procedures
      </InlineCitation>{" "}
      and maintain ongoing monitoring of{" "}
      <InlineCitation
        index={2}
        href="https://example.com/travel-rule"
        title="Travel Rule Implementation"
        description="FATF guidance on the implementation of the Travel Rule"
      >
        cross-border transactions
      </InlineCitation>
      .
    </p>
  )
}

function MessagePreview() {
  return (
    <div className="space-y-4">
      <Message from="user">
        <MessageAvatar>
          <UserIcon className="size-4" />
        </MessageAvatar>
        <MessageContent>
          <MessageResponse>
            What are the key compliance requirements for crypto exchanges?
          </MessageResponse>
        </MessageContent>
      </Message>

      <Message from="assistant">
        <MessageAvatar className="bg-primary text-primary-foreground">AI</MessageAvatar>
        <MessageContent>
          <MessageResponse>
            <p>The key compliance requirements for crypto exchanges include:</p>
            <ol>
              <li>
                <strong>KYC/AML</strong> — Identity verification and anti-money laundering controls
              </li>
              <li>
                <strong>Travel Rule</strong> — Transaction data sharing between VASPs
              </li>
              <li>
                <strong>Licensing</strong> — Regulatory registration in each operating jurisdiction
              </li>
            </ol>
          </MessageResponse>
          <MessageActions>
            <MessageCopyAction content="The key compliance requirements..." />
            <MessageRegenerateAction onClick={() => {}} />
            <MessageFeedbackActions onThumbsUp={() => {}} onThumbsDown={() => {}} />
          </MessageActions>
        </MessageContent>
      </Message>
    </div>
  )
}

function ConversationPreview() {
  return (
    <Conversation className="h-80 rounded-xl border border-border">
      <ConversationContent>
        <ConversationEmptyState
          title="Start a conversation"
          description="Ask me anything about compliance and regulation"
        />
      </ConversationContent>
    </Conversation>
  )
}

function PromptInputPreview() {
  return (
    <PromptInput onSubmit={(msg) => alert(`Sent: ${msg}`)}>
      <PromptInputFiles />
      <PromptInputBody>
        <PromptInputTextarea placeholder="Ask about compliance..." />
      </PromptInputBody>
      <PromptInputFooter>
        <PromptInputTools>
          <PromptInputAttachButton />
        </PromptInputTools>
        <PromptInputSubmit />
      </PromptInputFooter>
    </PromptInput>
  )
}

function ChainOfThoughtPreview() {
  return (
    <ChainOfThought defaultOpen>
      <ChainOfThoughtHeader>Analyzing compliance requirements...</ChainOfThoughtHeader>
      <ChainOfThoughtContent>
        <ChainOfThoughtStep step={1} status="complete">
          Identified jurisdiction: EU
        </ChainOfThoughtStep>
        <ChainOfThoughtStep step={2} status="complete">
          Checked applicable frameworks: MiCA, 6AMLD
        </ChainOfThoughtStep>
        <ChainOfThoughtStep step={3} status="active">
          Cross-referencing with local regulations
        </ChainOfThoughtStep>
        <ChainOfThoughtStep step={4} status="pending">
          Formulating response
        </ChainOfThoughtStep>
      </ChainOfThoughtContent>
    </ChainOfThought>
  )
}

function ConfirmationPreview() {
  return (
    <div className="space-y-4">
      <Confirmation status="pending">
        <ConfirmationRequest
          title="Execute database query"
          description="SELECT * FROM transactions WHERE amount > 10000 AND status = 'flagged'"
        />
        <ConfirmationActions>
          <ConfirmationAction>Approve</ConfirmationAction>
          <ConfirmationAction variant="destructive">Reject</ConfirmationAction>
        </ConfirmationActions>
      </Confirmation>

      <Confirmation status="accepted">
        <ConfirmationRequest title="Send compliance report" />
        <ConfirmationAccepted>Report sent successfully</ConfirmationAccepted>
      </Confirmation>
    </div>
  )
}

function ContextPreview() {
  return (
    <Context>
      <ContextHeader>Context Usage</ContextHeader>
      <ContextBody>
        <ContextUsage label="Tokens used" used={45200} total={128000} />
        <ContextUsage label="Messages" used={24} total={50} />
        <ContextUsage label="Attachments" used={3} total={10} />
      </ContextBody>
    </Context>
  )
}

function CheckpointPreview() {
  return (
    <div className="space-y-3">
      <Checkpoint>
        <CheckpointIcon />
        <CheckpointTrigger>Initial analysis complete — 12 regulations identified</CheckpointTrigger>
      </Checkpoint>
      <Checkpoint>
        <CheckpointIcon />
        <CheckpointTrigger>Risk assessment finalized — 3 high-risk areas flagged</CheckpointTrigger>
      </Checkpoint>
    </div>
  )
}

function PlanPreview() {
  return (
    <Plan defaultOpen>
      <PlanTrigger>Implementation Plan</PlanTrigger>
      <PlanContent>
        <div className="space-y-2 text-sm">
          <p>1. Set up KYC verification endpoints</p>
          <p>2. Integrate with screening providers</p>
          <p>3. Configure risk scoring rules</p>
          <p>4. Build transaction monitoring dashboard</p>
          <p>5. Deploy and run integration tests</p>
        </div>
      </PlanContent>
      <PlanFooter>
        <PlanAction>Execute Plan</PlanAction>
      </PlanFooter>
    </Plan>
  )
}

function TaskPreview() {
  return (
    <Task defaultOpen>
      <TaskTrigger status="running">Setting up compliance infrastructure</TaskTrigger>
      <TaskContent>
        <TaskItem status="complete">Created database schema</TaskItem>
        <TaskItem status="complete">Configured API endpoints</TaskItem>
        <TaskItem status="running">Running screening provider integration</TaskItem>
        <TaskItem status="pending">Setting up monitoring alerts</TaskItem>
        <TaskItem status="pending">Deploying to staging</TaskItem>
      </TaskContent>
    </Task>
  )
}

function ToolPreview() {
  return (
    <Tool defaultOpen>
      <ToolHeader name="search_regulations" status="success" />
      <ToolContent>
        <ToolInput>{`{ "query": "MiCA requirements", "jurisdiction": "EU" }`}</ToolInput>
        <ToolOutput>{`Found 7 matching regulations. Top result: Markets in Crypto-Assets Regulation (MiCA)...`}</ToolOutput>
      </ToolContent>
    </Tool>
  )
}

function QueuePreview() {
  return (
    <QueueSection>
      <QueueSectionTrigger>Processing Queue (4 items)</QueueSectionTrigger>
      <QueueList>
        <QueueItem>
          <QueueItemIndicator status="complete" />
          <QueueItemContent>
            <span className="font-medium text-sm">Verify customer identity</span>
            <QueueItemDescription>KYC check completed</QueueItemDescription>
          </QueueItemContent>
        </QueueItem>
        <QueueItem>
          <QueueItemIndicator status="active" />
          <QueueItemContent>
            <span className="font-medium text-sm">Screen against sanctions lists</span>
            <QueueItemDescription>Checking OFAC, EU, UN lists...</QueueItemDescription>
          </QueueItemContent>
        </QueueItem>
        <QueueItem>
          <QueueItemIndicator status="pending" />
          <QueueItemContent>
            <span className="font-medium text-sm">Calculate risk score</span>
          </QueueItemContent>
        </QueueItem>
        <QueueItem>
          <QueueItemIndicator status="pending" />
          <QueueItemContent>
            <span className="font-medium text-sm">Generate compliance report</span>
          </QueueItemContent>
        </QueueItem>
      </QueueList>
    </QueueSection>
  )
}

function ModelSelectorPreview() {
  return (
    <ModelSelector value="claude-opus-4" onValueChange={() => {}}>
      <ModelSelectorTrigger>Claude Opus 4</ModelSelectorTrigger>
      <ModelSelectorContent>
        <ModelSelectorInput />
        <ModelSelectorList>
          <ModelSelectorGroup label="Anthropic">
            <ModelSelectorItem
              value="claude-opus-4"
              name="Claude Opus 4"
              description="Most capable model"
            />
            <ModelSelectorItem
              value="claude-sonnet-4"
              name="Claude Sonnet 4"
              description="Best balance of speed and quality"
            />
            <ModelSelectorItem
              value="claude-haiku-4"
              name="Claude Haiku 4"
              description="Fastest responses"
            />
          </ModelSelectorGroup>
          <ModelSelectorGroup label="OpenAI">
            <ModelSelectorItem value="gpt-4o" name="GPT-4o" description="Multimodal flagship" />
            <ModelSelectorItem
              value="gpt-4o-mini"
              name="GPT-4o Mini"
              description="Cost-effective"
            />
          </ModelSelectorGroup>
        </ModelSelectorList>
      </ModelSelectorContent>
    </ModelSelector>
  )
}

/* ─── Case Card ─── */

const caseCardControlDefs = {
  sla: {
    type: "radio" as const,
    options: ["on_track", "at_risk", "overdue"],
    defaultValue: "on_track",
    label: "SLA",
  },
  priority: {
    type: "radio" as const,
    options: ["p1", "p2", "p3"],
    defaultValue: "p2",
    label: "Priority",
  },
  showAssignee: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Show Assignee",
  },
  showAlerts: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Show Linked Alerts",
  },
  showTransactions: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Show Linked Transactions",
  },
} satisfies ControlDefs

const sampleAlerts = [
  { id: "alert-001", severity: "high", trigger: "Threshold Breach", type: "velocity" },
  { id: "alert-002", severity: "medium", trigger: "Pattern Match", type: "behavioral" },
]

const sampleTransactions = [
  { id: "tx-001", amount: "5,000", asset: "USDT", direction: "outbound" },
  { id: "tx-002", amount: "12,500", asset: "BTC", direction: "inbound" },
]

function CaseCardPreview() {
  const controls = useControls(caseCardControlDefs)
  const { sla, priority, showAssignee, showAlerts, showTransactions } = controls.values

  return (
    <div className="max-w-sm space-y-8">
      <Playground controls={controls}>
        <CaseCard
          id="case-12345"
          title="Suspicious Transaction Pattern Detected"
          entities={["ACME Corp", "John Doe"]}
          sla={sla}
          priority={priority}
          updatedAt={new Date(Date.now() - 3600000).toISOString()}
          assignee={showAssignee ? { name: "Sarah Chen" } : undefined}
          linkedAlerts={showAlerts ? sampleAlerts : []}
          linkedTransactions={showTransactions ? sampleTransactions : []}
        />
      </Playground>

      <Section title="SLA Variants">
        <div className="flex w-full flex-col gap-3">
          <CaseCard
            id="case-001"
            title="On Track — Routine Review"
            entities={["Binance", "Wallet 0x1a2b"]}
            sla="on_track"
            priority="p3"
            updatedAt={new Date(Date.now() - 7200000).toISOString()}
            assignee={{ name: "Sarah Chen" }}
          />
          <CaseCard
            id="case-002"
            title="At Risk — Requires Attention"
            entities={["Coinbase", "Wallet 0x3c4d"]}
            sla="at_risk"
            priority="p2"
            updatedAt={new Date(Date.now() - 86400000).toISOString()}
            assignee={{ name: "James Lee" }}
            linkedAlerts={[sampleAlerts[0]]}
          />
          <CaseCard
            id="case-003"
            title="Overdue — Immediate Action Required"
            entities={["Kraken", "Wallet 0x5e6f"]}
            sla="overdue"
            priority="p1"
            updatedAt={new Date(Date.now() - 172800000).toISOString()}
            assignee={{ name: "Maria Gonzalez" }}
            linkedAlerts={sampleAlerts}
            linkedTransactions={sampleTransactions}
          />
        </div>
      </Section>

      <Section title="Without Assignee (Inbox)">
        <CaseCard
          id="case-004"
          title="My Inbox Card — No Assignee Avatar"
          entities={["FTX", "Wallet 0x7g8h"]}
          sla="on_track"
          priority="p2"
          updatedAt={new Date().toISOString()}
          linkedAlerts={[sampleAlerts[0]]}
        />
      </Section>
    </div>
  )
}

// ── Audit Log ──

function AuditLogPreview() {
  return (
    <div className="space-y-8">
      <Section title="Compliance Audit Trail">
        <AuditLog className="w-full max-w-lg rounded-md border">
          <AuditLogEntry action="create">
            <AuditLogIcon>
              <PlusIcon className="size-3.5 text-emerald-600" />
            </AuditLogIcon>
            <AuditLogContent>
              <AuditLogMessage>
                <span className="font-medium">Sarah Chen</span> created case{" "}
                <span className="font-medium">CASE-2024-001</span>
              </AuditLogMessage>
              <AuditLogMeta>
                <span>Compliance Team</span>
                <AuditLogTime dateTime="2024-03-15T09:30:00Z">Mar 15, 9:30 AM</AuditLogTime>
              </AuditLogMeta>
              <AuditLogDetail>
                Flagged for unusual transaction pattern — 3 outbound transfers exceeding $50,000
                within 24 hours.
              </AuditLogDetail>
            </AuditLogContent>
          </AuditLogEntry>

          <AuditLogEntry action="update">
            <AuditLogIcon>
              <EditIcon className="size-3.5 text-blue-600" />
            </AuditLogIcon>
            <AuditLogContent>
              <AuditLogMessage>
                <span className="font-medium">James Lee</span> updated risk level to{" "}
                <span className="font-medium text-amber-600">High</span>
              </AuditLogMessage>
              <AuditLogMeta>
                <span>Risk Assessment</span>
                <AuditLogTime dateTime="2024-03-15T11:15:00Z">Mar 15, 11:15 AM</AuditLogTime>
              </AuditLogMeta>
            </AuditLogContent>
          </AuditLogEntry>

          <AuditLogEntry action="approve">
            <AuditLogIcon>
              <ShieldCheckIcon className="size-3.5 text-emerald-600" />
            </AuditLogIcon>
            <AuditLogContent>
              <AuditLogMessage>
                <span className="font-medium">Maria Gonzalez</span> approved escalation to senior
                review
              </AuditLogMessage>
              <AuditLogMeta>
                <span>Senior Compliance Officer</span>
                <AuditLogTime dateTime="2024-03-15T14:00:00Z">Mar 15, 2:00 PM</AuditLogTime>
              </AuditLogMeta>
            </AuditLogContent>
          </AuditLogEntry>

          <AuditLogEntry action="export">
            <AuditLogIcon>
              <DownloadIcon className="size-3.5 text-muted-foreground" />
            </AuditLogIcon>
            <AuditLogContent>
              <AuditLogMessage>
                <span className="font-medium">Sarah Chen</span> exported STR report
              </AuditLogMessage>
              <AuditLogMeta>
                <span>Compliance Team</span>
                <AuditLogTime dateTime="2024-03-15T16:45:00Z">Mar 15, 4:45 PM</AuditLogTime>
              </AuditLogMeta>
              <AuditLogDetail>
                Report exported as PDF — includes all linked transactions and evidence.
              </AuditLogDetail>
            </AuditLogContent>
          </AuditLogEntry>
        </AuditLog>
      </Section>
    </div>
  )
}

// ── Comment Thread ──

function CommentThreadPreview() {
  return (
    <div className="space-y-8">
      <Section title="Case Discussion Thread">
        <CommentThread className="w-full max-w-lg">
          <Comment>
            <CommentAvatar>SC</CommentAvatar>
            <CommentBody>
              <CommentHeader>
                <CommentAuthor>Sarah Chen</CommentAuthor>
                <CommentTime dateTime="2024-03-15T09:30:00Z">Mar 15, 9:30 AM</CommentTime>
              </CommentHeader>
              <CommentContent>
                I've reviewed the transaction pattern for CASE-2024-001. The three outbound
                transfers all went to the same beneficiary wallet within a 4-hour window. This looks
                like structured layering — recommending escalation to senior review.
              </CommentContent>
              <CommentActions>
                <Button variant="ghost" size="xs">
                  <MessageCircleIcon className="mr-1 size-3" /> Reply
                </Button>
              </CommentActions>
            </CommentBody>
          </Comment>

          <Comment reply>
            <CommentAvatar>JL</CommentAvatar>
            <CommentBody>
              <CommentHeader>
                <CommentAuthor>James Lee</CommentAuthor>
                <CommentTime dateTime="2024-03-15T10:15:00Z">Mar 15, 10:15 AM</CommentTime>
              </CommentHeader>
              <CommentContent>
                Agreed. I've cross-referenced with the VASP registry and the receiving entity is not
                registered in any jurisdiction we monitor. Updating risk level to High.
              </CommentContent>
            </CommentBody>
          </Comment>

          <Comment>
            <CommentAvatar>MG</CommentAvatar>
            <CommentBody>
              <CommentHeader>
                <CommentAuthor>Maria Gonzalez</CommentAuthor>
                <CommentTime dateTime="2024-03-15T14:00:00Z">Mar 15, 2:00 PM</CommentTime>
              </CommentHeader>
              <CommentContent>
                Good catch, team. I've approved the escalation and assigned this for STR filing.
                Please ensure all supporting documentation is attached before submission.
              </CommentContent>
            </CommentBody>
          </Comment>
        </CommentThread>
      </Section>
    </div>
  )
}

// ── Filter Bar ──

function FilterBarPreview() {
  return (
    <div className="space-y-8">
      <Section title="With Active Filters">
        <FilterBar>
          <FilterChip label="Status" value="Under Review" onRemove={() => {}} />
          <FilterChip label="Risk Level" value="High" onRemove={() => {}} />
          <FilterChip label="Date Range" value="Mar 1 – Mar 15" onRemove={() => {}} />
          <FilterClear onClick={() => {}} />
        </FilterBar>
      </Section>
      <Section title="No Selection (placeholder)">
        <FilterBar>
          <FilterChip label="Status" />
          <FilterChip label="Risk Level" />
          <FilterChip label="Assignee" />
        </FilterBar>
      </Section>
      <Section title="Mixed States">
        <FilterBar>
          <FilterChip label="Status" value="Flagged" onRemove={() => {}} />
          <FilterChip label="Jurisdiction" />
          <FilterChip label="Entity Type" value="VASP" onRemove={() => {}} />
          <FilterClear onClick={() => {}} />
        </FilterBar>
      </Section>
    </div>
  )
}

// ── Split Pane ──

function SplitPanePreview() {
  return (
    <div className="space-y-8">
      <Section title="Master-Detail Layout">
        <div className="h-80 w-full max-w-2xl rounded-md border">
          <SplitPane direction="horizontal">
            <SplitPanePanel defaultSize={35} minSize={20}>
              <div className="h-full overflow-auto p-3">
                <p className="mb-2 font-medium text-muted-foreground text-xs">Cases</p>
                {[
                  "CASE-001 — Suspicious Pattern",
                  "CASE-002 — Threshold Breach",
                  "CASE-003 — Sanctions Match",
                ].map((item, i) => (
                  <div
                    key={i}
                    className={cn(
                      "cursor-pointer rounded-md px-3 py-2 text-sm hover:bg-muted/50",
                      i === 0 && "bg-muted",
                    )}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </SplitPanePanel>
            <SplitPaneDivider />
            <SplitPanePanel defaultSize={65} minSize={30}>
              <div className="h-full overflow-auto p-4">
                <h3 className="font-semibold text-sm">CASE-001 — Suspicious Pattern</h3>
                <p className="mt-1 text-muted-foreground text-xs">
                  Opened Mar 15, 2024 &middot; Assigned to Sarah Chen
                </p>
                <div className="mt-3 rounded-md border bg-muted/30 p-3 text-muted-foreground text-xs">
                  Three outbound transfers exceeding $50,000 within 24 hours to an unregistered
                  VASP. Risk level: High. Status: Under Review.
                </div>
              </div>
            </SplitPanePanel>
          </SplitPane>
        </div>
      </Section>
    </div>
  )
}

// ── Step Progress ──

const stepProgressControlDefs = {
  orientation: {
    type: "select" as const,
    options: ["vertical", "horizontal"],
    defaultValue: "vertical",
    label: "Orientation",
  },
} satisfies ControlDefs

function StepProgressPreview() {
  const controls = useControls(stepProgressControlDefs)
  const { orientation } = controls.values
  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <div className="w-full py-4">
          <StepProgress orientation={orientation as "vertical"}>
            <StepProgressItem status="complete">
              <StepProgressIndicator status="complete" step={1} />
              <StepProgressConnector data-complete="true" />
              <StepProgressContent>
                <StepProgressTitle>Identity Verification</StepProgressTitle>
                <StepProgressDescription>
                  Government ID and selfie verified.
                </StepProgressDescription>
              </StepProgressContent>
            </StepProgressItem>
            <StepProgressItem status="current">
              <StepProgressIndicator status="current" step={2} />
              <StepProgressConnector />
              <StepProgressContent>
                <StepProgressTitle>Document Review</StepProgressTitle>
                <StepProgressDescription>Proof of address under review.</StepProgressDescription>
              </StepProgressContent>
            </StepProgressItem>
            <StepProgressItem status="upcoming">
              <StepProgressIndicator status="upcoming" step={3} />
              <StepProgressContent>
                <StepProgressTitle>Compliance Approval</StepProgressTitle>
                <StepProgressDescription>
                  Final sign-off from compliance officer.
                </StepProgressDescription>
              </StepProgressContent>
            </StepProgressItem>
          </StepProgress>
        </div>
      </Playground>

      <Section title="Horizontal">
        <StepProgress orientation="horizontal">
          <StepProgressItem status="complete">
            <StepProgressIndicator status="complete" step={1} />
            <StepProgressConnector data-complete="true" />
            <StepProgressContent>
              <StepProgressTitle>Submitted</StepProgressTitle>
            </StepProgressContent>
          </StepProgressItem>
          <StepProgressItem status="current">
            <StepProgressIndicator status="current" step={2} />
            <StepProgressConnector />
            <StepProgressContent>
              <StepProgressTitle>In Review</StepProgressTitle>
            </StepProgressContent>
          </StepProgressItem>
          <StepProgressItem status="upcoming">
            <StepProgressIndicator status="upcoming" step={3} />
            <StepProgressContent>
              <StepProgressTitle>Approved</StepProgressTitle>
            </StepProgressContent>
          </StepProgressItem>
        </StepProgress>
      </Section>
    </div>
  )
}

export const previews: Record<string, React.ComponentType> = {
  "approval-actions": ApprovalActionsPreview,
  button: ButtonPreview,
  card: CardPreview,
  "case-card": CaseCardPreview,
  item: ItemPreview,
  input: InputPreview,
  badge: BadgePreview,
  alert: AlertPreview,
  dialog: DialogPreview,
  tabs: TabsPreview,
  table: TablePreview,
  "data-table": DataTablePreview,
  typography: TypographyPreview,
  "date-picker": DatePickerPreview,
  grid: GridPreview,
  checkbox: CheckboxPreview,
  separator: SeparatorPreview,
  textarea: TextareaPreview,
  switch: SwitchPreview,
  skeleton: SkeletonPreview,
  spinner: SpinnerPreview,
  progress: ProgressPreview,
  kbd: KbdPreview,
  accordion: AccordionPreview,
  tooltip: TooltipPreview,
  avatar: AvatarPreview,
  select: SelectPreview,
  "radio-group": RadioGroupPreview,
  slider: SliderPreview,
  label: LabelPreview,
  toggle: TogglePreview,
  "toggle-group": ToggleGroupPreview,
  "button-group": ButtonGroupPreview,
  "dropdown-menu": DropdownMenuPreview,
  "context-menu": ContextMenuPreview,
  "native-select": NativeSelectPreview,
  "input-group": InputGroupPreview,
  "input-otp": InputOTPPreview,
  combobox: ComboboxPreview,
  calendar: CalendarPreview,
  field: FieldPreview,
  form: FormPreview,
  "aspect-ratio": AspectRatioPreview,
  resizable: ResizablePreview,
  "scroll-area": ScrollAreaPreview,
  collapsible: CollapsiblePreview,
  "alert-dialog": AlertDialogPreview,
  drawer: DrawerPreview,
  sheet: SheetPreview,
  popover: PopoverPreview,
  "hover-card": HoverCardPreview,
  sonner: SonnerPreview,
  empty: EmptyPreview,
  "entity-header": EntityHeaderPreview,
  "logo-vasp": LogoVaspPreview,
  "search-input": SearchInputPreview,
  breadcrumb: BreadcrumbPreview,
  pagination: PaginationPreview,
  "navigation-menu": NavigationMenuPreview,
  menubar: MenubarPreview,
  command: CommandPreview,
  carousel: CarouselPreview,
  chart: ChartPreview,
  "compliance-score": ComplianceScorePreview,
  "area-chart": AreaChartPreview,
  "bar-chart": BarChartPreview,
  "line-chart": LineChartPreview,
  "pie-chart": PieChartPreview,
  "radial-chart": RadialChartPreview,
  "bg-shader": BgShaderPreview,
  "blocky-shader": BlockyShaderPreview,
  "ascii-shader": AsciiShaderPreview,
  "subtle-shader": SubtleShaderPreview,
  "risk-gauge": RiskGaugePreview,
  "fade-in": FadeInPreview,
  marquee: MarqueePreview,
  typewriter: TypewriterPreview,
  "animated-counter": AnimatedCounterPreview,
  "streaming-cards": StreamingCardsPreview,
  "deadline-countdown": DeadlineCountdownPreview,
  "policy-banner": PolicyBannerPreview,
  "status-indicator": StatusIndicatorPreview,
  "striped-bar": StripedBarPreview,
  // New components
  tag: TagPreview,
  stat: StatPreview,
  "description-list": DescriptionListPreview,
  "number-input": NumberInputPreview,
  timeline: TimelinePreview,
  "segmented-control": SegmentedControlPreview,
  callout: CalloutPreview,
  "file-upload": FileUploadPreview,
  "code-block": CodeBlockPreview,
  "loading-overlay": LoadingOverlayPreview,
  "inline-edit": InlineEditPreview,
  "copy-button": CopyButtonPreview,
  "visually-hidden": VisuallyHiddenPreview,
  direction: DirectionPreview,
  "waffle-chart": WaffleChartPreview,
  // Workflow
  "workflow-canvas": WorkflowCanvasPreview,
  "workflow-node": WorkflowNodePreview,
  "workflow-gate": WorkflowGatePreview,
  "workflow-edge": WorkflowEdgePreview,
  "workflow-connection": WorkflowConnectionPreview,
  "workflow-controls": WorkflowControlsPreview,
  "workflow-label": WorkflowLabelPreview,
  "workflow-panel": WorkflowPanelPreview,
  "workflow-toolbar": WorkflowToolbarPreview,
  "workflow-minimap": WorkflowMinimapPreview,
  "workflow-group": WorkflowGroupPreview,
  "workflow-handle": WorkflowHandlePreview,
  // AI / Chatbot
  shimmer: ShimmerPreview,
  suggestion: SuggestionPreview,
  reasoning: ReasoningPreview,
  sources: SourcesPreview,
  attachments: AttachmentsPreview,
  "inline-citation": InlineCitationPreview,
  message: MessagePreview,
  conversation: ConversationPreview,
  "prompt-input": PromptInputPreview,
  "chain-of-thought": ChainOfThoughtPreview,
  confirmation: ConfirmationPreview,
  context: ContextPreview,
  checkpoint: CheckpointPreview,
  plan: PlanPreview,
  task: TaskPreview,
  tool: ToolPreview,
  queue: QueuePreview,
  "model-selector": ModelSelectorPreview,
  // New components (v0.5.0)
  "audit-log": AuditLogPreview,
  "comment-thread": CommentThreadPreview,
  "filter-bar": FilterBarPreview,
  "split-pane": SplitPanePreview,
  "step-progress": StepProgressPreview,
}
