"use client"

import { useForm } from "@tanstack/react-form"
import type * as React from "react"
import type { z } from "zod"
import { Field, FieldError, FieldLabel } from "../components/field"
import { Input } from "../components/input"

/**
 * Internal helper for the auth blocks.
 * Wraps `@tanstack/react-form` with a zod schema and exposes a `<TextField>`
 * helper bound to a form instance.
 *
 * Not exported from the package.
 */

type ZodAuthSchema = z.ZodObject<z.ZodRawShape>

export function useZodForm<TSchema extends ZodAuthSchema>(
  schema: TSchema,
  defaultValues: z.infer<TSchema>,
  onSubmit: (values: z.infer<TSchema>) => void | Promise<void>,
) {
  return useForm({
    defaultValues,
    validators: {
      onSubmit: ({ value }) => {
        const result = schema.safeParse(value)
        if (result.success) return undefined
        const fieldErrors: Record<string, string> = {}
        for (const issue of result.error.issues) {
          const path = issue.path.join(".")
          if (path && !fieldErrors[path]) fieldErrors[path] = issue.message
        }
        return { fields: fieldErrors }
      },
    },
    onSubmit: async ({ value }) => {
      const parsed = schema.parse(value)
      await onSubmit(parsed)
    },
  })
}

// biome-ignore lint/suspicious/noExplicitAny: TanStack Form's deeply-generic API is impractical to surface here; auth blocks treat form as opaque.
type AnyForm = any

type TextFieldProps = {
  form: AnyForm
  name: string
  label: string
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
  autoComplete?: string
  required?: boolean
  rightSlot?: React.ReactNode
}

export function TextField({
  form,
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  required,
  rightSlot,
}: TextFieldProps) {
  return (
    // biome-ignore lint/suspicious/noExplicitAny: TanStack Form generics
    <form.Field name={name as any}>
      {(field: {
        name: string
        state: { value: unknown; meta: { errors: Array<string | undefined> } }
        handleChange: (value: string) => void
        handleBlur: () => void
      }) => {
        const errors = field.state.meta.errors.filter(Boolean) as string[]
        const hasError = errors.length > 0
        const inputId = `${field.name}-input`
        return (
          <Field data-invalid={hasError || undefined}>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor={inputId}>{label}</FieldLabel>
              {rightSlot}
            </div>
            <Input
              id={inputId}
              name={field.name}
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              required={required}
              aria-invalid={hasError || undefined}
              value={(field.state.value as string) ?? ""}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
            <FieldError errors={errors} />
          </Field>
        )
      }}
    </form.Field>
  )
}

export function handleFormSubmit(form: AnyForm) {
  return (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    void form.handleSubmit()
  }
}
