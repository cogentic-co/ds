/**
 * Shared visual-prop shapes for the bento components. The DS exports
 * these as discriminated-union types so feature-page data files can
 * be typed as `BentoVisual[]` and dispatched to the appropriate
 * component at render time.
 *
 * Each component also accepts the visual fields as direct props — so
 * consumers can call `<Profile {...visual} />` or compose without the
 * data-driven pattern.
 */

export type ProfileBadge = { label: string; success?: boolean }

export type ProfileStat = { label: string; value: string }

export type ProfileVisual = {
  type: "profile"
  icon: string
  name: string
  subtitle: string
  badges: ProfileBadge[]
  stats?: ProfileStat[]
  /** `"verified"` renders a richer directory-style card with a regulator pill. */
  variant?: "default" | "verified"
  /** Regulator / certifier label for the verified variant header. */
  certifier?: string
}

export type ScoreDimension = {
  label: string
  value: number
  color: "primary" | "destructive" | "success" | "warning"
}

export type ScoreVisual = {
  type: "score"
  title: string
  score: number
  max: number
  dimensions: ScoreDimension[]
}

export type ChecklistItem = { label: string; checked: boolean; detail?: string }

export type ChecklistVisual = {
  type: "checklist"
  heading?: string
  items: ChecklistItem[]
}

export type RuleChecklistVisual = {
  type: "ruleChecklist"
  heading?: string
  items: ChecklistItem[]
}

export type FeedItem = {
  label: string
  detail: string
  status: "success" | "warning" | "info" | "default"
  /** Optional source / regulator pill rendered on the right of the row. */
  meta?: string
}

export type FeedVisual = {
  type: "feed"
  items: FeedItem[]
}

export type TransitionCardRequirement = { label: string; present: boolean }

export type TransitionCardVisual = {
  type: "transitionCard"
  from: { flag: string; label: string }
  to: { flag: string; label: string }
  threshold: string
  regulator?: string
  requirements?: TransitionCardRequirement[]
}

export type CardGridItem = { icon: string; label: string; value?: string }

export type CardGridVisual = {
  type: "cardGrid"
  items: CardGridItem[]
}

export type SkillMatchRequirement = {
  label: string
  matched: boolean
  detail?: string
}

export type SkillMatchVisual = {
  type: "skillMatch"
  case: { id: string; meta?: string }
  analyst: { name: string; role?: string }
  requirements: SkillMatchRequirement[]
}

export type DecisionRecordContext = { label: string; value: string }

export type DecisionRecordVisual = {
  type: "decisionRecord"
  decision: string
  decidedBy: string
  role?: string
  at: string
  case?: string
  context: DecisionRecordContext[]
}

export type SearchPanelFilter = {
  label: string
  value: string
  active?: boolean
}

export type SearchPanelVisual = {
  type: "searchPanel"
  query?: string
  filters: SearchPanelFilter[]
  resultCount?: string
}

export type RetentionTableRow = {
  jurisdiction: string
  flag?: string
  years: number | string
  status?: "active" | "configurable" | "default"
}

export type RetentionTableVisual = {
  type: "retentionTable"
  rows: RetentionTableRow[]
}

export type MappingMatrixRow = {
  field: string
  mappings: Record<string, string>
}

export type MappingMatrixVisual = {
  type: "mappingMatrix"
  protocols: string[]
  rows: MappingMatrixRow[]
}

export type BentoVisual =
  | ProfileVisual
  | ScoreVisual
  | ChecklistVisual
  | RuleChecklistVisual
  | FeedVisual
  | TransitionCardVisual
  | CardGridVisual
  | SkillMatchVisual
  | DecisionRecordVisual
  | SearchPanelVisual
  | RetentionTableVisual
  | MappingMatrixVisual
