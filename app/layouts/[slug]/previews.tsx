"use client"

import type React from "react"
import { shellPreviews } from "../../shells/[slug]/previews"
import { compliancePreviews } from "../../compliance/[slug]/previews"

export const layoutPreviews: Record<string, React.ComponentType> = {
  "app-shell": shellPreviews["app-shell"],
  "app-shell-2": shellPreviews["app-shell-2"],
  "settings-layout": shellPreviews["settings-layout"],
  "transaction-detail-page": compliancePreviews["transaction-detail-page"],
  "dashboard-page": compliancePreviews["dashboard-page"],
}
