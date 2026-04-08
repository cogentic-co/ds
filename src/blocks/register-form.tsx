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
import { Checkbox } from "../components/checkbox"
import { Field, FieldError, FieldLabel } from "../components/field"
import { cn } from "../lib/utils"
import { handleFormSubmit, TextField, useZodForm } from "./_form"

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

const registerSchemaWithTerms = registerSchema.extend({
  acceptTerms: z.literal(true, { message: "You must accept the terms" }),
})

type RegisterFormValues = z.infer<typeof registerSchema>

type RegisterFormProps = Omit<React.ComponentProps<typeof Card>, "onSubmit"> & {
  schema?: typeof registerSchema
  defaultValues?: Partial<RegisterFormValues>
  onSubmit: (values: RegisterFormValues) => void | Promise<void>
  loading?: boolean
  logo?: React.ReactNode
  title?: string
  description?: string
  footer?: React.ReactNode
  socialButtons?: React.ReactNode
  termsHref?: string
}

function RegisterForm({
  schema,
  defaultValues,
  onSubmit,
  loading = false,
  logo,
  title = "Create an account",
  description = "Enter your details to get started",
  footer,
  socialButtons,
  termsHref,
  className,
  ...props
}: RegisterFormProps) {
  const effectiveSchema = (schema ??
    (termsHref ? registerSchemaWithTerms : registerSchema)) as typeof registerSchema
  const form = useZodForm(
    effectiveSchema,
    {
      name: "",
      email: "",
      password: "",
      ...(termsHref ? { acceptTerms: false as unknown as true } : {}),
      ...defaultValues,
    } as RegisterFormValues,
    onSubmit,
  )

  return (
    <Card data-slot="register-form" className={cn("w-full max-w-md", className)} {...props}>
      <CardHeader className="text-center">
        {logo && <div className="mb-4 flex justify-center">{logo}</div>}
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleFormSubmit(form)} className="space-y-4">
          <TextField
            form={form}
            name="name"
            label="Name"
            placeholder="Full name"
            autoComplete="name"
            required
          />
          <TextField
            form={form}
            name="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
          <TextField
            form={form}
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            required
          />
          {termsHref && (
            <form.Field name={"acceptTerms" as any}>
              {(field: {
                state: { value: unknown; meta: { errors: Array<string | undefined> } }
                handleChange: (value: boolean) => void
              }) => {
                const errors = field.state.meta.errors.filter(Boolean) as string[]
                return (
                  <Field>
                    <FieldLabel className="flex flex-row items-center gap-2">
                      <Checkbox
                        checked={Boolean(field.state.value)}
                        onCheckedChange={(checked) => field.handleChange(Boolean(checked))}
                      />
                      <span className="text-sm">
                        I agree to the{" "}
                        <a
                          href={termsHref}
                          className="underline underline-offset-4 hover:text-foreground"
                        >
                          terms and conditions
                        </a>
                      </span>
                    </FieldLabel>
                    <FieldError errors={errors} />
                  </Field>
                )
              }}
            </form.Field>
          )}
          <form.Subscribe selector={(s) => s.isSubmitting}>
            {(isSubmitting) => (
              <Button type="submit" className="w-full" disabled={loading || isSubmitting}>
                {loading || isSubmitting ? "Creating account..." : "Create account"}
              </Button>
            )}
          </form.Subscribe>
        </form>
        {socialButtons && (
          <>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <div className="grid gap-2">{socialButtons}</div>
          </>
        )}
      </CardContent>
      {footer && (
        <CardFooter className="justify-center text-muted-foreground text-sm">{footer}</CardFooter>
      )}
    </Card>
  )
}

export { RegisterForm, registerSchema }
export type { RegisterFormProps, RegisterFormValues }
