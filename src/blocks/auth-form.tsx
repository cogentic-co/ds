"use client"

import type * as React from "react"
import { Button } from "../components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/card"
import { Input } from "../components/input"
import { Label } from "../components/label"
import { cn } from "../lib/utils"

type AuthFormVariant = "login" | "register" | "forgot-password"

type AuthFormProps = React.ComponentProps<typeof Card> & {
  variant?: AuthFormVariant
  onSubmit?: (data: FormData) => void
  logo?: React.ReactNode
  title?: string
  description?: string
  footer?: React.ReactNode
  socialButtons?: React.ReactNode
  loading?: boolean
}

const defaultContent: Record<
  AuthFormVariant,
  { title: string; description: string; submit: string }
> = {
  login: {
    title: "Welcome back",
    description: "Enter your credentials to sign in",
    submit: "Sign in",
  },
  register: {
    title: "Create an account",
    description: "Enter your details to get started",
    submit: "Create account",
  },
  "forgot-password": {
    title: "Forgot password",
    description: "Enter your email to receive a reset link",
    submit: "Send reset link",
  },
}

function AuthForm({
  variant = "login",
  onSubmit,
  logo,
  title,
  description,
  footer,
  socialButtons,
  loading = false,
  className,
  ...props
}: AuthFormProps) {
  const content = defaultContent[variant]

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit?.(new FormData(e.currentTarget))
  }

  return (
    <Card data-slot="auth-form" className={cn("w-full max-w-md", className)} {...props}>
      <CardHeader className="text-center">
        {logo && <div className="mb-4 flex justify-center">{logo}</div>}
        <CardTitle className="text-xl">{title ?? content.title}</CardTitle>
        <CardDescription>{description ?? content.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {(variant === "login" || variant === "register") && (
            <>
              {variant === "register" && (
                <div className="space-y-2">
                  <Label htmlFor="auth-name">Name</Label>
                  <Input id="auth-name" name="name" placeholder="Full name" required />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="auth-email">Email</Label>
                <Input
                  id="auth-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="auth-password">Password</Label>
                <Input
                  id="auth-password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>
            </>
          )}
          {variant === "forgot-password" && (
            <div className="space-y-2">
              <Label htmlFor="auth-email">Email</Label>
              <Input
                id="auth-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : content.submit}
          </Button>
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

export { AuthForm }
export type { AuthFormProps, AuthFormVariant }
