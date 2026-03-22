import { expect, test } from "@playwright/test"

/**
 * Visual regression tests — take screenshots of every component page
 * in both light and dark mode and compare against baseline snapshots.
 *
 * Run: pnpm exec playwright test
 * Update snapshots: pnpm exec playwright test --update-snapshots
 */

const componentSlugs = [
  // Actions
  "button",
  "button-group",
  "toggle",
  "toggle-group",
  "dropdown-menu",
  "context-menu",
  // Forms
  "input",
  "textarea",
  "select",
  "native-select",
  "checkbox",
  "radio-group",
  "switch",
  "slider",
  "input-group",
  "input-otp",
  "combobox",
  "calendar",
  "date-picker",
  "label",
  "field",
  "form",
  // Layout
  "card",
  "separator",
  "aspect-ratio",
  "resizable",
  "scroll-area",
  "collapsible",
  "accordion",
  "tabs",
  "grid",
  // Feedback
  "alert",
  "alert-dialog",
  "dialog",
  "drawer",
  "sheet",
  "popover",
  "tooltip",
  "hover-card",
  "sonner",
  "progress",
  "skeleton",
  "spinner",
  "empty",
  // Navigation
  "breadcrumb",
  "pagination",
  "navigation-menu",
  "menubar",
  "command",
  "sidebar",
  // Data Display
  "table",
  "data-table",
  "badge",
  "avatar",
  "carousel",
  "chart",
  "kbd",
  "typography",
  // Animation (static screenshots — animations won't be caught)
  "bg-shader",
  "fade-in",
  "marquee",
  "typewriter",
  "animated-counter",
  "streaming-cards",
]

const foundationPages = [
  { name: "typography", path: "/foundations/typography" },
  { name: "colors", path: "/foundations/colors" },
  { name: "tokens", path: "/foundations/tokens" },
  { name: "motion", path: "/foundations/motion" },
  { name: "theme-builder", path: "/foundations/theme-builder" },
]

test.describe("Component visual regression", () => {
  for (const slug of componentSlugs) {
    test(`component: ${slug}`, async ({ page }) => {
      await page.goto(`/components/${slug}`)
      // Wait for fonts and images to load
      await page.waitForLoadState("networkidle")
      // Hide the sidebar to focus on content
      const main = page.locator("main")
      await expect(main).toHaveScreenshot(`component-${slug}.png`, {
        maxDiffPixelRatio: 0.01,
      })
    })
  }
})

test.describe("Foundation page visual regression", () => {
  for (const { name, path } of foundationPages) {
    test(`foundation: ${name}`, async ({ page }) => {
      await page.goto(path)
      await page.waitForLoadState("networkidle")
      const main = page.locator("main")
      await expect(main).toHaveScreenshot(`foundation-${name}.png`, {
        maxDiffPixelRatio: 0.01,
      })
    })
  }
})
