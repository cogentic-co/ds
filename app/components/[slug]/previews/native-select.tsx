"use client"

import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const nativeSelectControlDefs = {
  disabled: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Disabled",
  },
} satisfies ControlDefs

export default function NativeSelectPreview() {
  const controls = useControls(nativeSelectControlDefs)

  return (
    <div className="max-w-sm space-y-6">
      <Playground controls={controls}>
        <NativeSelect defaultValue="banana" disabled={controls.values.disabled}>
          <NativeSelectOption value="apple">Apple</NativeSelectOption>
          <NativeSelectOption value="banana">Banana</NativeSelectOption>
          <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
        </NativeSelect>
      </Playground>

      <Section title="Small">
        <NativeSelect size="sm" defaultValue="cherry">
          <NativeSelectOption value="apple">Apple</NativeSelectOption>
          <NativeSelectOption value="banana">Banana</NativeSelectOption>
          <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
        </NativeSelect>
      </Section>
    </div>
  )
}
