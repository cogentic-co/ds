"use client"

import { FileUpload } from "@/components/ui/file-upload"
import { type ControlDefs, Playground, useControls } from "./_shared"

const fileUploadControlDefs = {
  multiple: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Multiple",
  },
  disabled: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Disabled",
  },
  accept: {
    type: "text" as const,
    defaultValue: "image/png,image/jpeg",
    label: "Accept",
    placeholder: "e.g. image/*,.pdf",
  },
} satisfies ControlDefs

export default function FileUploadPreview() {
  const controls = useControls(fileUploadControlDefs)
  const { multiple, disabled, accept } = controls.values
  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <div className="max-w-md">
          <FileUpload
            accept={accept || undefined}
            multiple={multiple}
            disabled={disabled}
            maxSize={5 * 1024 * 1024}
            onChange={(files) => console.log("Files:", files)}
          />
        </div>
      </Playground>
    </div>
  )
}
