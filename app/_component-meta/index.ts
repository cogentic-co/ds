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
import { actionsMeta } from "./groups/actions"
import { aiChatbotMeta } from "./groups/ai-chatbot"
import { animationMeta } from "./groups/animation"
import { authBlocksMeta } from "./groups/auth-blocks"
import { chartsMeta } from "./groups/charts"
import { complianceMeta } from "./groups/compliance"
import { dataDisplayMeta } from "./groups/data-display"
import { feedbackMeta } from "./groups/feedback"
import { formsMeta } from "./groups/forms"
import { layoutMeta } from "./groups/layout"
import { navigationMeta } from "./groups/navigation"
import { newComponentsMeta } from "./groups/new-components"
import { workflowMeta } from "./groups/workflow"

/**
 * Component metadata — status, description, and guidelines.
 * Composed from per-group files in ./groups for easier maintenance.
 */
export const componentMeta: Record<string, ComponentMeta> = {
  ...actionsMeta,
  ...formsMeta,
  ...layoutMeta,
  ...complianceMeta,
  ...feedbackMeta,
  ...navigationMeta,
  ...dataDisplayMeta,
  ...animationMeta,
  ...chartsMeta,
  ...workflowMeta,
  ...aiChatbotMeta,
  ...newComponentsMeta,
  ...authBlocksMeta,
}

export const statusConfig: Record<ComponentStatus, { label: string; color: string }> = {
  stable: { label: "Stable", color: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" },
  beta: { label: "Beta", color: "bg-amber-500/15 text-amber-700 dark:text-amber-400" },
  new: { label: "New", color: "bg-blue-500/15 text-blue-700 dark:text-blue-400" },
  deprecated: { label: "Deprecated", color: "bg-red-500/15 text-red-700 dark:text-red-400" },
}
