/**
 * Shared visual-prop shapes for the showcase components. Each component
 * also accepts the visual fields as direct props — so consumers can
 * `<Steps {...visual} />` or compose without the data-driven pattern.
 */

export type StepStatus = "completed" | "running" | "pending" | "upcoming"

export type StepsStep = {
  label: string
  status: StepStatus
  /** Delay in ms after viewport entry before this step becomes visible. */
  delay: number
}

export type StepsVisual = {
  type: "steps"
  steps: StepsStep[]
}

export type SourcesSource = {
  icon: string
  label: string
}

export type SourcesVisual = {
  type: "sources"
  sources: SourcesSource[]
  output: { label: string; detail: string }
}

export type ActionSummaryLine = { label: string; value: string }

export type ActionVisual = {
  type: "action"
  summary: ActionSummaryLine[]
  recommendation: string
  actions: string[]
  selectedAction: string
  auditLine?: string
}

export type DetailLine = {
  label: string
  value: string
  source: string
}

export type DetailVisual = {
  type: "detail"
  title: string
  badge?: string
  lines: DetailLine[]
}

export type VersionStatus = "current" | "previous" | "draft"

export type VersionStat = { label: string; value: string }

export type VersionHistoryVersion = {
  version: string
  summary?: string
  author?: string
  role?: string
  date?: string
  range?: string
  status?: VersionStatus
  stats?: VersionStat[]
}

export type VersionHistoryVisual = {
  type: "versionHistory"
  title: string
  versions: VersionHistoryVersion[]
}

export type ShowcaseVisual =
  | StepsVisual
  | SourcesVisual
  | ActionVisual
  | DetailVisual
  | VersionHistoryVisual
