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

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

type LoginFormValues = z.infer<typeof loginSchema>

type LoginFormProps = Omit<React.ComponentProps<typeof Card>, "onSubmit"> & {
  schema?: typeof loginSchema
  defaultValues?: Partial<LoginFormValues>
  onSubmit: (values: LoginFormValues) => void | Promise<void>
  loading?: boolean
  logo?: React.ReactNode
  title?: string
  description?: string
  footer?: React.ReactNode
  socialButtons?: React.ReactNode
  forgotPasswordHref?: string
}

function LoginForm({
  schema = loginSchema,
  defaultValues,
  onSubmit,
  loading = false,
  logo,
  title = "Welcome back",
  description = "Enter your credentials to sign in",
  footer,
  socialButtons,
  forgotPasswordHref,
  className,
  ...props
}: LoginFormProps) {
  const form = useZodForm(schema, { email: "", password: "", ...defaultValues }, onSubmit)

  return (
    <Card data-slot="login-form" className={cn("w-full max-w-md", className)} {...props}>
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
          <TextField
            form={form}
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            required
            rightSlot={
              forgotPasswordHref ? (
                <a
                  href={forgotPasswordHref}
                  className="text-muted-foreground text-sm underline-offset-4 hover:text-foreground hover:underline"
                >
                  Forgot password?
                </a>
              ) : undefined
            }
          />
          <form.Subscribe selector={(s) => s.isSubmitting}>
            {(isSubmitting) => (
              <Button type="submit" className="w-full" disabled={loading || isSubmitting}>
                {loading || isSubmitting ? "Signing in..." : "Sign in"}
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

export type { LoginFormProps, LoginFormValues }
export { LoginForm, loginSchema }
