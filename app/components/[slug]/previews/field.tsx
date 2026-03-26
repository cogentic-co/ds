"use client"

import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function FieldPreview() {
  return (
    <div className="max-w-sm space-y-6">
      <Field>
        <FieldLabel htmlFor="field-name">Name</FieldLabel>
        <Input id="field-name" placeholder="Enter your name" />
        <FieldDescription>Your full legal name.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="field-email">Email</FieldLabel>
        <Input id="field-email" type="email" placeholder="you@example.com" aria-invalid="true" />
        <FieldError>Please enter a valid email address.</FieldError>
      </Field>
    </div>
  )
}
