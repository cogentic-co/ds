// Components
// Animations are NOT re-exported from main barrel to avoid bundling motion/react.
// Import from "@cogentic-co/ds/animations/*" instead.
export type { ArticleCardProps } from "./blocks/article-card"
export { ArticleCard } from "./blocks/article-card"
export type { Feature, FeatureSectionProps } from "./blocks/feature-section"
export { FeatureSection } from "./blocks/feature-section"
export type {
  ForgotPasswordFormProps,
  ForgotPasswordFormValues,
} from "./blocks/forgot-password-form"
export { ForgotPasswordForm, forgotPasswordSchema } from "./blocks/forgot-password-form"
export type { HeroSectionProps } from "./blocks/hero-section"
export { HeroSection, heroVariants } from "./blocks/hero-section"
export type { LoginFormProps, LoginFormValues } from "./blocks/login-form"
export { LoginForm, loginSchema } from "./blocks/login-form"
export type { MagicLinkMessageProps } from "./blocks/magic-link-message"
export { MagicLinkMessage } from "./blocks/magic-link-message"
export type { CtaLink, PageCtaProps } from "./blocks/page-cta"
export { PageCta } from "./blocks/page-cta"
export type { Plan, PricingTableProps } from "./blocks/pricing-table"
// Blocks
export { PricingTable } from "./blocks/pricing-table"
// ProductTour is NOT re-exported from main barrel to avoid bundling motion/react.
// Import from "@cogentic-co/ds/blocks/product-tour" instead.
export type { RegisterFormProps, RegisterFormValues } from "./blocks/register-form"
export { RegisterForm, registerSchema } from "./blocks/register-form"
export type { RichRadioListProps, RichRadioOption } from "./blocks/rich-radio-list"
export { RichRadioList } from "./blocks/rich-radio-list"
export type {
  Organization,
  SelectOrgFormProps,
  SelectOrgFormValues,
} from "./blocks/select-org-form"
export { SelectOrgForm, selectOrgSchema } from "./blocks/select-org-form"
export type { SequenceBuilderProps, SequenceStep } from "./blocks/sequence-builder"
export { SequenceBuilder } from "./blocks/sequence-builder"
export type { SettingRowProps } from "./blocks/setting-row"
export { SettingRow } from "./blocks/setting-row"
export type {
  SettingsCardGridItem,
  SettingsCardGridProps,
} from "./blocks/settings-card-grid"
export { SettingsCardGrid } from "./blocks/settings-card-grid"
export type { StatCardProps } from "./blocks/stat-card"
// New blocks
export { StatCard } from "./blocks/stat-card"
export type { TeamCardProps } from "./blocks/team-card"
export { TeamCard } from "./blocks/team-card"
export type {
  Workspace,
  WorkspaceSwitcherProps,
} from "./blocks/workspace-switcher"
export { WorkspaceSwitcher } from "./blocks/workspace-switcher"
// Charts are NOT re-exported from main barrel to avoid bundling recharts.
// Import from "@cogentic-co/ds/charts" instead.
export * from "./components/accordion"
export * from "./components/alert"
export * from "./components/alert-dialog"
export * from "./components/animated-counter"
export * from "./components/approval-actions"
export * from "./components/ascii-shader"
export * from "./components/aspect-ratio"
export * from "./components/audit-log"
export * from "./components/avatar"
export * from "./components/badge"
// Animation components
export * from "./components/bg-shader"
export * from "./components/blocky-shader"
export * from "./components/breadcrumb"
export * from "./components/breathing-bar"
export * from "./components/button"
export * from "./components/button-group"
export * from "./components/calendar"
export * from "./components/callout"
export * from "./components/card"
export * from "./components/carousel"
export * from "./components/case-card"
export * from "./components/chart"
export * from "./components/checkbox"
export * from "./components/code-block"
export * from "./components/collapsible"
export * from "./components/combobox"
export * from "./components/command"
export * from "./components/compliance-score"
export * from "./components/context-menu"
export * from "./components/copy-button"
export * from "./components/data-table"
export * from "./components/date-picker"
export * from "./components/deadline-countdown"
export * from "./components/dialog"
export * from "./components/direction"
export * from "./components/drawer"
export * from "./components/dropdown-menu"
export * from "./components/empty"
export * from "./components/entity-header"
export * from "./components/fade-in"
export * from "./components/field"
export * from "./components/file-upload"
export * from "./components/filter-bar"
export * from "./components/form"
export * from "./components/grid"
export * from "./components/hover-card"
export * from "./components/inline-edit"
export * from "./components/input"
export * from "./components/input-group"
export * from "./components/input-otp"
export * from "./components/item"
export * from "./components/kbd"
export * from "./components/key-value-list"
export * from "./components/kpi-card"
export * from "./components/label"
export * from "./components/loading-overlay"
export * from "./components/logo-vasp"
export * from "./components/marquee"
export * from "./components/menubar"
export * from "./components/native-select"
export * from "./components/navigation-menu"
export * from "./components/number-input"
export * from "./components/pagination"
export * from "./components/policy-banner"
export * from "./components/popover"
export * from "./components/progress"
export * from "./components/radio-group"
export * from "./components/resizable"
export * from "./components/ring-card"
export * from "./components/risk-gauge"
export * from "./components/scroll-area"
export * from "./components/search-input"
export * from "./components/segmented-control"
export * from "./components/select"
export * from "./components/separator"
export * from "./components/sheet"
export * from "./components/sidebar"
export * from "./components/skeleton"
export * from "./components/slider"
export * from "./components/sonner"
export * from "./components/sparkline"
export * from "./components/spinner"
export * from "./components/split-pane"
export * from "./components/stat"
export * from "./components/status-indicator"
export * from "./components/status-pill"
export * from "./components/step-progress"
// StreamingCards uses motion/react — import directly if needed:
// import { StreamingCards } from "@cogentic-co/ds/components/streaming-cards"
export * from "./components/striped-bar"
export * from "./components/subtle-shader"
export * from "./components/switch"
export * from "./components/table"
export * from "./components/tabs"
export * from "./components/tag"
export * from "./components/textarea"
export * from "./components/theme-script"
export * from "./components/timeline"
export * from "./components/toggle"
export * from "./components/toggle-group"
export * from "./components/tooltip"
export * from "./components/typewriter"
export * from "./components/typography"
export * from "./components/virtualized-grid"
// New components
export * from "./components/visually-hidden"
export * from "./components/waffle-chart"
export * from "./hooks/use-animation-timer"
export * from "./hooks/use-carousel"
export * from "./hooks/use-clipboard"
export * from "./hooks/use-cycle-index"
export * from "./hooks/use-debounce"
export * from "./hooks/use-disclosure"
export * from "./hooks/use-intersection-observer"
export * from "./hooks/use-local-storage"
// Hooks
export * from "./hooks/use-media-query"
export * from "./hooks/use-mobile"
// Animation constants
export {
  EASE_OUT,
  FADE_UP,
  SLIDE_UP_VARIANT,
  STAGGER_CHILDREN,
  TRANSITION_DEFAULT,
  TRANSITION_FAST,
  VIEWPORT_ONCE,
} from "./lib/animation"
// Utilities
export { cn, timeAgo } from "./lib/utils"
// Shells
export * from "./shells/app-shell"
export * from "./shells/app-shell-2"
// Workflow is NOT re-exported from main entry to avoid requiring @xyflow/react.
// Import from "@cogentic-co/ds/workflow" instead.
