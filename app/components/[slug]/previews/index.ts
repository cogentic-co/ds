import type React from "react"
import AccordionPreview from "./accordion"
import AlertPreview from "./alert"
import AlertDialogPreview from "./alert-dialog"
import AnimatedCounterPreview from "./animated-counter"
import ApprovalActionsPreview from "./approval-actions"
import AreaChartPreview from "./area-chart"
import AsciiShaderPreview from "./ascii-shader"
import AspectRatioPreview from "./aspect-ratio"
import AttachmentsPreview from "./attachments"
import AuditLogPreview from "./audit-log"
import AvatarPreview from "./avatar"
import BadgePreview from "./badge"
import BarChartPreview from "./bar-chart"
import BgShaderPreview from "./bg-shader"
import BlockyShaderPreview from "./blocky-shader"
import BreadcrumbPreview from "./breadcrumb"
import ButtonPreview from "./button"
import ButtonGroupPreview from "./button-group"
import CalendarPreview from "./calendar"
import CalloutPreview from "./callout"
import CardPreview from "./card"
import CarouselPreview from "./carousel"
import CaseCardPreview from "./case-card"
import ChainOfThoughtPreview from "./chain-of-thought"
import ChartPreview from "./chart"
import CheckboxPreview from "./checkbox"
import CheckpointPreview from "./checkpoint"
import CodeBlockPreview from "./code-block"
import CollapsiblePreview from "./collapsible"
import ComboboxPreview from "./combobox"
import CommandPreview from "./command"
import CommentThreadPreview from "./comment-thread"
import ComplianceScorePreview from "./compliance-score"
import ComposedChartPreview from "./composed-chart"
import ConfirmationPreview from "./confirmation"
import ContextPreview from "./context"
import ContextMenuPreview from "./context-menu"
import ConversationPreview from "./conversation"
import CopyButtonPreview from "./copy-button"
import DataTablePreview from "./data-table"
import DatePickerPreview from "./date-picker"
import DeadlineCountdownPreview from "./deadline-countdown"
import DescriptionListPreview from "./description-list"
import DialogPreview from "./dialog"
import DirectionPreview from "./direction"
import DrawerPreview from "./drawer"
import DropdownMenuPreview from "./dropdown-menu"
import EmptyPreview from "./empty"
import EntityGraphPreview from "./entity-graph"
import EntityHeaderPreview from "./entity-header"
import FadeInPreview from "./fade-in"
import FieldPreview from "./field"
import FileUploadPreview from "./file-upload"
import FilterBarPreview from "./filter-bar"
import FormPreview from "./form"
import FunnelChartPreview from "./funnel-chart"
import GridPreview from "./grid"
import HeatmapChartPreview from "./heatmap-chart"
import HoverCardPreview from "./hover-card"
import InlineCitationPreview from "./inline-citation"
import InlineEditPreview from "./inline-edit"
import InputPreview from "./input"
import InputGroupPreview from "./input-group"
import InputOTPPreview from "./input-otp"
import ItemPreview from "./item"
import KbdPreview from "./kbd"
import LabelPreview from "./label"
import LineChartPreview from "./line-chart"
import LoadingOverlayPreview from "./loading-overlay"
import LogoVaspPreview from "./logo-vasp"
import MarqueePreview from "./marquee"
import MenubarPreview from "./menubar"
import MessagePreview from "./message"
import ModelSelectorPreview from "./model-selector"
import NativeSelectPreview from "./native-select"
import NavigationMenuPreview from "./navigation-menu"
import NumberInputPreview from "./number-input"
import PaginationPreview from "./pagination"
import PieChartPreview from "./pie-chart"
import PlanPreview from "./plan"
import PolicyBannerPreview from "./policy-banner"
import PopoverPreview from "./popover"
import ProgressPreview from "./progress"
import PromptInputPreview from "./prompt-input"
import QueuePreview from "./queue"
import RadialChartPreview from "./radial-chart"
import RadioGroupPreview from "./radio-group"
import ReasoningPreview from "./reasoning"
import ResizablePreview from "./resizable"
import RiskGaugePreview from "./risk-gauge"
import ScatterChartPreview from "./scatter-chart"
import ScrollAreaPreview from "./scroll-area"
import SearchInputPreview from "./search-input"
import SegmentedControlPreview from "./segmented-control"
import SelectPreview from "./select"
import SeparatorPreview from "./separator"
import SheetPreview from "./sheet"
import ShimmerPreview from "./shimmer"
import SkeletonPreview from "./skeleton"
import SliderPreview from "./slider"
import SonnerPreview from "./sonner"
import SourcesPreview from "./sources"
import SpinnerPreview from "./spinner"
import SplitPanePreview from "./split-pane"
import StatPreview from "./stat"
import StatusIndicatorPreview from "./status-indicator"
import StepProgressPreview from "./step-progress"
import StreamingCardsPreview from "./streaming-cards"
import StripedBarPreview from "./striped-bar"
import SubtleShaderPreview from "./subtle-shader"
import SuggestionPreview from "./suggestion"
import SwitchPreview from "./switch"
import TablePreview from "./table"
import TabsPreview from "./tabs"
import TagPreview from "./tag"
import TaskPreview from "./task"
import TextareaPreview from "./textarea"
import TimelinePreview from "./timeline"
import TogglePreview from "./toggle"
import ToggleGroupPreview from "./toggle-group"
import ToolPreview from "./tool"
import TooltipPreview from "./tooltip"
import TypewriterPreview from "./typewriter"
import TypographyPreview from "./typography"
import VisuallyHiddenPreview from "./visually-hidden"
import WaffleChartPreview from "./waffle-chart"
import WorkflowBlockPalettePreview from "./workflow-block-palette"
import WorkflowCanvasPreview from "./workflow-canvas"
import WorkflowConnectionPreview from "./workflow-connection"
import WorkflowControlsPreview from "./workflow-controls"
import WorkflowEdgePreview from "./workflow-edge"
import WorkflowGatePreview from "./workflow-gate"
import WorkflowGroupPreview from "./workflow-group"
import WorkflowHandlePreview from "./workflow-handle"
import WorkflowInspectorPreview from "./workflow-inspector"
import WorkflowLabelPreview from "./workflow-label"
import WorkflowMinimapPreview from "./workflow-minimap"
import WorkflowNodePreview from "./workflow-node"
import WorkflowNodeCardPreview from "./workflow-node-card"
import WorkflowPanelPreview from "./workflow-panel"
import WorkflowSlackMessagePreview from "./workflow-slack-message"
import WorkflowToolbarPreview from "./workflow-toolbar"

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
  "scatter-chart": ScatterChartPreview,
  "composed-chart": ComposedChartPreview,
  "funnel-chart": FunnelChartPreview,
  "heatmap-chart": HeatmapChartPreview,
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
  "workflow-node-card": WorkflowNodeCardPreview,
  "workflow-gate": WorkflowGatePreview,
  "workflow-edge": WorkflowEdgePreview,
  "workflow-connection": WorkflowConnectionPreview,
  "workflow-controls": WorkflowControlsPreview,
  "workflow-label": WorkflowLabelPreview,
  "workflow-panel": WorkflowPanelPreview,
  "workflow-block-palette": WorkflowBlockPalettePreview,
  "entity-graph": EntityGraphPreview,
  "workflow-inspector": WorkflowInspectorPreview,
  "workflow-slack-message": WorkflowSlackMessagePreview,
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
