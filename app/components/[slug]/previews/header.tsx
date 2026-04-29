"use client"

import { ArrowDownLeft, Check, ExternalLink, Flag, MoreHorizontal } from "lucide-react"
import { Badge } from "@/src/components/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/src/components/breadcrumb"
import { Button } from "@/src/components/button"
import { Header } from "@/src/components/header"

export default function HeaderPreview() {
  return (
    <div className="space-y-8">
      <section>
        <p className="mb-3 font-medium text-muted-foreground text-xs">Entity-style</p>
        <Header
          title="Acme Corporation"
          subtitle="Counterparty · institutional"
          leadingIcon={<span className="font-semibold text-base">AC</span>}
          meta={[
            { text: "Reg. number: 04982734" },
            { text: "Tax ID: GB 982 7345 12" },
            { text: "Onboarded Mar 2024" },
          ]}
          description="Crypto-native asset manager. Verified counterparty since 2024."
          actions={
            <>
              <Button variant="ghost" size="sm">
                <ExternalLink className="size-3.5" /> View
              </Button>
              <Button size="sm">Open case</Button>
            </>
          }
        />
      </section>

      <section>
        <p className="mb-3 font-medium text-muted-foreground text-xs">
          Transaction-style (bordered)
        </p>
        <Header
          bordered
          breadcrumb={
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Transactions</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem className="font-mono text-foreground">tx_8492</BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          }
          leadingIcon={
            <span className="flex size-12 items-center justify-center rounded-md bg-mint text-mint-ink">
              <ArrowDownLeft className="size-5" />
            </span>
          }
          title={
            <span
              className="font-mono font-semibold"
              style={{ fontSize: 30, letterSpacing: "-0.02em" }}
            >
              +1,250.00 <span className="font-medium text-muted-foreground">USDC</span>
            </span>
          }
          badges={<Badge variant="mint">Verified</Badge>}
          subtitle={<span className="font-mono">$1,250.00 · 12 minutes ago</span>}
          actions={
            <>
              <Button variant="ghost">
                <ExternalLink className="size-3.5" /> Explorer
              </Button>
              <Button variant="secondary">
                <Flag className="size-3.5" /> Escalate
              </Button>
              <Button>
                <Check className="size-3.5" /> Approve
              </Button>
              <Button variant="ghost" size="icon" aria-label="More">
                <MoreHorizontal className="size-4" />
              </Button>
            </>
          }
        />
      </section>

      <section>
        <p className="mb-3 font-medium text-muted-foreground text-xs">Compact size</p>
        <Header size="sm" title="Settings" subtitle="Manage your workspace and preferences" />
      </section>
    </div>
  )
}
