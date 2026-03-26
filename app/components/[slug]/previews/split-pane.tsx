"use client"

import { cn } from "@/src/lib/utils"
import { SplitPane, SplitPaneDivider, SplitPanePanel } from "@/components/ui/split-pane"
import { Section } from "./_shared"

export default function SplitPanePreview() {
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
