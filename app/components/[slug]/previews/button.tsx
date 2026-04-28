"use client"

import { ArrowRightIcon, DownloadIcon, MailIcon, PlusIcon, Trash2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const buttonControlDefs = {
  variant: {
    type: "select" as const,
    options: ["default", "secondary", "destructive", "outline", "ghost", "link"],
    defaultValue: "default",
    label: "Variant",
  },
  size: {
    type: "select" as const,
    options: ["xs", "sm", "default", "lg", "xl", "xxl", "icon", "icon-sm", "icon-xs", "icon-lg"],
    defaultValue: "default",
    label: "Size",
  },
  disabled: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Disabled",
  },
  label: {
    type: "text" as const,
    defaultValue: "Button",
    label: "Label",
  },
} satisfies ControlDefs

export default function ButtonPreview() {
  const controls = useControls(buttonControlDefs)
  const { variant, size, disabled, label } = controls.values
  const isIcon = size.startsWith("icon")

  return (
    <div className="space-y-8">
      {/* Interactive playground */}
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <Button variant={variant as "default"} size={size as "default"} disabled={disabled}>
            {isIcon ? <MailIcon /> : label}
          </Button>
        </div>
      </Playground>

      {/* Static examples */}
      <Section title="Variants">
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </Section>
      <Section title="Sizes">
        <Button size="xs">Extra Small</Button>
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">Extra Large</Button>
        <Button size="xxl">XX-Large</Button>
      </Section>
      <Section title="Icon sizes">
        <Button size="icon-xs">
          <MailIcon />
        </Button>
        <Button size="icon-sm">
          <MailIcon />
        </Button>
        <Button size="icon">
          <MailIcon />
        </Button>
        <Button size="icon-lg">
          <MailIcon />
        </Button>
      </Section>
      <Section title="With icons">
        <Button>
          <PlusIcon />
          Create new
        </Button>
        <Button variant="outline">
          <DownloadIcon />
          Download
        </Button>
        <Button variant="secondary">
          Continue
          <ArrowRightIcon />
        </Button>
        <Button variant="destructive">
          <Trash2Icon />
          Delete
        </Button>
        <Button variant="ghost">
          <MailIcon />
          Inbox
        </Button>
      </Section>
      <Section title="Icon + label sizes">
        <Button size="sm">
          <PlusIcon />
          Small
        </Button>
        <Button size="default">
          <PlusIcon />
          Default
        </Button>
        <Button size="lg">
          <PlusIcon />
          Large
        </Button>
      </Section>
      <Section title="States">
        <Button disabled>Disabled</Button>
        <Button variant="outline" disabled>
          Disabled Outline
        </Button>
      </Section>
    </div>
  )
}
