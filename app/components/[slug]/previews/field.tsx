"use client"

import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function FieldPreview() {
  return (
    <div className="max-w-sm space-y-8">
      {/* Description below input (helper text) */}
      <Field>
        <FieldLabel htmlFor="field-name">Name</FieldLabel>
        <Input id="field-name" placeholder="Enter your name" />
        <FieldDescription>Your full legal name.</FieldDescription>
      </Field>

      {/* Description above input (Plain-style — for context the user needs BEFORE typing) */}
      <Field>
        <FieldLabel htmlFor="field-public-name">Public name</FieldLabel>
        <FieldDescription>
          Used in customer-facing communications, and visible to your customers. Usually your
          company name.
        </FieldDescription>
        <Input id="field-public-name" placeholder="Cogentic" />
      </Field>

      {/* Error state */}
      <Field>
        <FieldLabel htmlFor="field-email">Email</FieldLabel>
        <Input id="field-email" type="email" placeholder="you@example.com" aria-invalid="true" />
        <FieldError>Please enter a valid email address.</FieldError>
      </Field>
    </div>
  )
}
