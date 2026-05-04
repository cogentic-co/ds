"use client"

import type React from "react"
import { compliancePreviews } from "../../compliance/[slug]/previews"
import { shellPreviews } from "../../shells/[slug]/previews"

export const layoutPreviews: Record<string, React.ComponentType> = {
  "app-shell": shellPreviews["app-shell"],
  "transaction-detail-page": compliancePreviews["transaction-detail-page"],
  "dashboard-page": compliancePreviews["dashboard-page"],
  "settings-page": compliancePreviews["settings-page"],
  "settings-members-page": compliancePreviews["settings-members-page"],
  "settings-integrations-page": compliancePreviews["settings-integrations-page"],
  "settings-billing-page": compliancePreviews["settings-billing-page"],
  "settings-notifications-page": compliancePreviews["settings-notifications-page"],
}
