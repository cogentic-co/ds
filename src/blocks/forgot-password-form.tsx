"use client"

import type * as React from "react"
import { z } from "zod"
import { Button } from "../components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/card"
import { cn } from "../lib/utils"
import { handleFormSubmit, TextField, useZodForm } from "./_form"

const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address"),
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

type ForgotPasswordFormProps = Omit<React.ComponentProps<typeof Card>, "onSubmit"> & {
  schema?: typeof forgotPasswordSchema
  defaultValues?: Partial<ForgotPasswordFormValues>
  onSubmit: (values: ForgotPasswordFormValues) => void | Promise<void>
  loading?: boolean
  logo?: React.ReactNode
  title?: string
  description?: string
  footer?: React.ReactNode
}

function ForgotPasswordForm({
  schema = forgotPasswordSchema,
  defaultValues,
  onSubmit,
  loading = false,
  logo,
  title = "Forgot password",
  description = "Enter your email to receive a reset link",
  footer,
  className,
  ...props
}: ForgotPasswordFormProps) {
  const form = useZodForm(schema, { email: "", ...defaultValues }, onSubmit)

  return (
    <Card data-slot="forgot-password-form" className={cn("w-full max-w-md", className)} {...props}>
      <CardHeader className="text-center">
        {logo && <div className="mb-4 flex justify-center">{logo}</div>}
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleFormSubmit(form)} className="space-y-4">
          <TextField
            form={form}
            name="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
          <form.Subscribe selector={(s) => s.isSubmitting}>
            {(isSubmitting) => (
              <Button type="submit" className="w-full" disabled={loading || isSubmitting}>
                {loading || isSubmitting ? "Sending..." : "Send reset link"}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
      {footer && (
        <CardFooter className="justify-center text-muted-foreground text-sm">{footer}</CardFooter>
      )}
    </Card>
  )
}

export type { ForgotPasswordFormProps, ForgotPasswordFormValues }
export { ForgotPasswordForm, forgotPasswordSchema }
