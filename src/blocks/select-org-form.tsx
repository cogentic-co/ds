"use client"

import type * as React from "react"
import { useState } from "react"
import { z } from "zod"
import { Avatar, AvatarFallback } from "../components/avatar"
import { Button } from "../components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../components/command"
import { Field, FieldError } from "../components/field"
import { RadioGroup, RadioGroupItem } from "../components/radio-group"
import { cn } from "../lib/utils"

const selectOrgSchema = z.object({
  organizationId: z.string().min(1, "Choose an organization to continue"),
})

type SelectOrgFormValues = z.infer<typeof selectOrgSchema>

type Organization = {
  id: string
  name: string
  logo?: React.ReactNode
  role?: string
  memberCount?: number
}

type SelectOrgFormProps = Omit<React.ComponentProps<typeof Card>, "onSubmit"> & {
  organizations: Organization[]
  variant?: "list" | "search"
  schema?: typeof selectOrgSchema
  defaultValue?: string
  onSubmit: (values: SelectOrgFormValues) => void | Promise<void>
  loading?: boolean
  logo?: React.ReactNode
  title?: string
  description?: string
  footer?: React.ReactNode
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

function OrgRowContent({ org }: { org: Organization }) {
  return (
    <>
      {org.logo ?? (
        <Avatar className="size-8">
          <AvatarFallback>{initials(org.name)}</AvatarFallback>
        </Avatar>
      )}
      <div className="flex min-w-0 flex-1 flex-col text-left">
        <span className="truncate font-medium text-sm">{org.name}</span>
        {(org.role || org.memberCount !== undefined) && (
          <span className="truncate text-muted-foreground text-xs">
            {org.role}
            {org.role && org.memberCount !== undefined ? " · " : ""}
            {org.memberCount !== undefined
              ? `${org.memberCount} member${org.memberCount === 1 ? "" : "s"}`
              : ""}
          </span>
        )}
      </div>
    </>
  )
}

function SelectOrgForm({
  organizations,
  variant,
  schema = selectOrgSchema,
  defaultValue,
  onSubmit,
  loading = false,
  logo,
  title = "Select an organization",
  description = "Choose which workspace to use",
  footer,
  className,
  ...props
}: SelectOrgFormProps) {
  const resolvedVariant: "list" | "search" =
    variant ?? (organizations.length > 10 ? "search" : "list")
  const [selectedId, setSelectedId] = useState<string>(defaultValue ?? "")
  const [error, setError] = useState<string | undefined>()
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const result = schema.safeParse({ organizationId: selectedId })
    if (!result.success) {
      setError(result.error.issues[0]?.message)
      return
    }
    setError(undefined)
    setSubmitting(true)
    try {
      await onSubmit(result.data)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card data-slot="select-org-form" className={cn("w-full max-w-md", className)} {...props}>
      <CardHeader className="text-center">
        {logo && <div className="mb-4 flex justify-center">{logo}</div>}
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field data-invalid={error ? true : undefined}>
            {resolvedVariant === "list" ? (
              <RadioGroup
                className="gap-y-3"
                value={selectedId}
                onValueChange={(v) => {
                  setSelectedId(typeof v === "string" ? v : "")
                  setError(undefined)
                }}
                aria-label="Organizations"
              >
                {organizations.map((org) => {
                  const id = `org-${org.id}`
                  return (
                    <label
                      key={org.id}
                      htmlFor={id}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-md border border-input p-3 transition-colors hover:bg-accent",
                        selectedId === org.id && "border-primary/50 bg-primary/5",
                      )}
                    >
                      <RadioGroupItem id={id} value={org.id} aria-label={org.name} />
                      <OrgRowContent org={org} />
                    </label>
                  )
                })}
              </RadioGroup>
            ) : (
              <Command className="rounded-md border">
                <CommandInput placeholder="Search organizations..." />
                <CommandList>
                  <CommandEmpty>No organizations found.</CommandEmpty>
                  <CommandGroup>
                    {organizations.map((org) => (
                      <CommandItem
                        key={org.id}
                        value={`${org.name} ${org.id}`}
                        onSelect={() => {
                          setSelectedId(org.id)
                          setError(undefined)
                        }}
                        className={cn(
                          "flex items-center gap-3",
                          selectedId === org.id && "bg-primary/5",
                        )}
                      >
                        <OrgRowContent org={org} />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            )}
            <FieldError errors={error ? [error] : []} />
          </Field>
          <Button type="submit" className="w-full" disabled={loading || submitting}>
            {loading || submitting ? "Continuing..." : "Continue"}
          </Button>
        </form>
      </CardContent>
      {footer && (
        <CardFooter className="justify-center text-muted-foreground text-sm">{footer}</CardFooter>
      )}
    </Card>
  )
}

export type { Organization, SelectOrgFormProps, SelectOrgFormValues }
export { SelectOrgForm, selectOrgSchema }
