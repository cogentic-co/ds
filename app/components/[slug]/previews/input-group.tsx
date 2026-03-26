"use client"

import { SearchIcon } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Section } from "./_shared"

export default function InputGroupPreview() {
  return (
    <div className="max-w-sm space-y-6">
      <Section title="With icon addon">
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon className="size-4" />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search..." />
        </InputGroup>
      </Section>
      <Section title="With text addon">
        <InputGroup>
          <InputGroupAddon>https://</InputGroupAddon>
          <InputGroupInput placeholder="example.com" />
        </InputGroup>
      </Section>
      <Section title="End addon">
        <InputGroup>
          <InputGroupInput placeholder="0.00" />
          <InputGroupAddon align="inline-end">USD</InputGroupAddon>
        </InputGroup>
      </Section>
    </div>
  )
}
