"use client"

import { Package, Route, SettingsIcon, UserIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"
import { Muted } from "@/components/ui/typography"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const itemControlDefs = {
  variant: {
    type: "select" as const,
    options: ["default", "outline", "muted"],
    defaultValue: "default",
    label: "Variant",
  },
  size: {
    type: "select" as const,
    options: ["default", "sm", "xs"],
    defaultValue: "default",
    label: "Size",
  },
  showMedia: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Show Media",
  },
  showDescription: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Show Description",
  },
  showActions: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Show Actions",
  },
} satisfies ControlDefs

export default function ItemPreview() {
  const controls = useControls(itemControlDefs)
  const { variant, size, showMedia, showDescription, showActions } = controls.values

  return (
    <div className="max-w-lg space-y-8">
      <Playground controls={controls}>
        <Item
          variant={variant as "default" | "outline" | "muted"}
          size={size as "default" | "sm" | "xs"}
        >
          {showMedia && (
            <ItemMedia variant="icon">
              <Package />
            </ItemMedia>
          )}
          <ItemContent>
            <ItemTitle>Provider Name</ItemTitle>
            {showDescription && (
              <ItemDescription>Real-time transaction monitoring and risk scoring.</ItemDescription>
            )}
          </ItemContent>
          {showActions && (
            <ItemActions>
              <Button size="sm" variant="outline">
                Configure
              </Button>
            </ItemActions>
          )}
        </Item>
      </Playground>

      <Section title="Variants">
        <ItemGroup>
          <Item variant="default">
            <ItemMedia variant="icon">
              <SettingsIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Default</ItemTitle>
              <ItemDescription>No border, transparent background.</ItemDescription>
            </ItemContent>
          </Item>
          <Item variant="outline">
            <ItemMedia variant="icon">
              <SettingsIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Outline</ItemTitle>
              <ItemDescription>Bordered with rounded corners.</ItemDescription>
            </ItemContent>
          </Item>
          <Item variant="muted">
            <ItemMedia variant="icon">
              <SettingsIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Muted</ItemTitle>
              <ItemDescription>Subtle background fill.</ItemDescription>
            </ItemContent>
          </Item>
        </ItemGroup>
      </Section>

      <Section title="Sizes">
        <ItemGroup>
          <Item variant="outline" size="default">
            <ItemContent>
              <ItemTitle>Default size</ItemTitle>
              <ItemDescription>Standard spacing and text.</ItemDescription>
            </ItemContent>
          </Item>
          <Item variant="outline" size="sm">
            <ItemContent>
              <ItemTitle>Small size</ItemTitle>
              <ItemDescription>Compact for dense layouts.</ItemDescription>
            </ItemContent>
          </Item>
          <Item variant="outline" size="xs">
            <ItemContent>
              <ItemTitle>Extra small size</ItemTitle>
              <ItemDescription>Most compact option.</ItemDescription>
            </ItemContent>
          </Item>
        </ItemGroup>
      </Section>

      <Section title="With Header and Footer">
        <Item variant="outline">
          <ItemHeader>
            <Badge>New</Badge>
            <Muted>v2.1.0</Muted>
          </ItemHeader>
          <ItemMedia variant="icon">
            <Package />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Chainalysis KYT</ItemTitle>
            <ItemDescription>
              On-chain transaction monitoring with real-time risk scoring.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="sm" variant="outline">
              Configure
            </Button>
          </ItemActions>
          <ItemFooter>
            <Muted>Last sync 2 hours ago</Muted>
            <Muted>Healthy</Muted>
          </ItemFooter>
        </Item>
      </Section>

      <Section title="Group with Separators">
        <ItemGroup>
          <Item>
            <ItemMedia variant="icon">
              <UserIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>James Cooke</ItemTitle>
              <ItemDescription>Engineering Lead</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Badge variant="outline">Admin</Badge>
            </ItemActions>
          </Item>
          <ItemSeparator />
          <Item>
            <ItemMedia variant="icon">
              <UserIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Sarah Chen</ItemTitle>
              <ItemDescription>Compliance Analyst</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Badge variant="outline">Analyst</Badge>
            </ItemActions>
          </Item>
          <ItemSeparator />
          <Item>
            <ItemMedia variant="icon">
              <UserIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Marcus Johnson</ItemTitle>
              <ItemDescription>Risk Officer</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Badge variant="outline">Viewer</Badge>
            </ItemActions>
          </Item>
        </ItemGroup>
      </Section>

      <Section title="As Link (render prop)">
        <Item variant="outline" render={<a href="#" />}>
          <ItemMedia variant="icon">
            <Route />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Clickable Item</ItemTitle>
            <ItemDescription>
              This item renders as an anchor tag via the render prop.
            </ItemDescription>
          </ItemContent>
        </Item>
      </Section>
    </div>
  )
}
