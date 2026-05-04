import { readFileSync } from "node:fs"
import { join } from "node:path"
import type { ComponentType } from "react"
import { Separator } from "@/components/ui/separator"
// Layout examples — server-rendered "View source" preview pages.
// Each layout file at src/layouts/<slug>.tsx is read at request time and
// shown alongside the live render. Layouts are NOT bundled into the
// published package — they are copy/paste recipes.
//
// We import the layouts statically so the server→client boundary is a
// single hop (one client component per slug) rather than going through
// the giant compliance previews map.
import DashboardPage from "@/src/layouts/dashboard-page"
import SettingsBillingPage from "@/src/layouts/settings-billing-page"
import SettingsIntegrationsPage from "@/src/layouts/settings-integrations-page"
import SettingsMembersPage from "@/src/layouts/settings-members-page"
import SettingsNotificationsPage from "@/src/layouts/settings-notifications-page"
import SettingsPage from "@/src/layouts/settings-page"
import TransactionDetailPage from "@/src/layouts/transaction-detail-page"
import { highlightCode } from "@/src/lib/highlighter"
import { shellPreviews } from "../../shells/[slug]/previews"
import { LayoutSource } from "./layout-source"

const layoutPreviews: Record<string, ComponentType> = {
  "app-shell": shellPreviews["app-shell"],
  "dashboard-page": DashboardPage,
  "transaction-detail-page": TransactionDetailPage,
  "settings-page": SettingsPage,
  "settings-members-page": SettingsMembersPage,
  "settings-integrations-page": SettingsIntegrationsPage,
  "settings-billing-page": SettingsBillingPage,
  "settings-notifications-page": SettingsNotificationsPage,
}

function toTitle(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

function readLayoutSource(slug: string): string | null {
  try {
    return readFileSync(join(process.cwd(), "src", "layouts", `${slug}.tsx`), "utf8")
  } catch {
    return null
  }
}

export default async function LayoutPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const Preview = layoutPreviews[slug]
  const source = readLayoutSource(slug)

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-bold text-2xl tracking-tight">{toTitle(slug)}</h1>
        <p className="mt-1 text-muted-foreground text-sm">
          Copy/paste recipe — fork the source and edit freely. Layouts are not bundled into the
          published package.
        </p>
      </div>

      {Preview ? (
        <div>
          <h2 className="mb-4 font-medium text-muted-foreground text-sm">Live preview</h2>
          <div className="overflow-hidden rounded-lg border border-border bg-background">
            <Preview />
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground text-sm">
          No preview available yet for this layout.
        </div>
      )}

      {source && (
        <>
          <Separator />
          <div>
            <h2 className="mb-3 font-medium text-muted-foreground text-sm">
              Source — <span className="font-mono">src/layouts/{slug}.tsx</span>
            </h2>
            <LayoutSource
              code={source}
              filename={`src/layouts/${slug}.tsx`}
              highlightedLight={await highlightCode(source, "tsx", "light")}
              highlightedDark={await highlightCode(source, "tsx", "dark")}
            />
          </div>
        </>
      )}
    </div>
  )
}
