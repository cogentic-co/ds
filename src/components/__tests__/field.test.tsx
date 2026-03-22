import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "../field"

describe("Field", () => {
  it("renders field with label and description", () => {
    render(
      <Field>
        <FieldLabel>Username</FieldLabel>
        <FieldDescription>Choose a unique username</FieldDescription>
      </Field>,
    )
    expect(screen.getByText("Username")).toBeInTheDocument()
    expect(screen.getByText("Choose a unique username")).toBeInTheDocument()
  })

  it("uses data-slot attributes", () => {
    const { container } = render(
      <Field>
        <FieldLabel>Label</FieldLabel>
        <FieldContent>
          <FieldDescription>Description</FieldDescription>
        </FieldContent>
      </Field>,
    )
    expect(container.querySelector("[data-slot='field']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='field-label']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='field-content']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='field-description']")).toBeInTheDocument()
  })

  it("merges custom className on Field", () => {
    const { container } = render(
      <Field className="custom-field">
        <FieldLabel>Label</FieldLabel>
      </Field>,
    )
    expect(container.querySelector("[data-slot='field']")).toHaveClass("custom-field")
  })

  it("has role=group on Field", () => {
    render(
      <Field>
        <FieldLabel>Label</FieldLabel>
      </Field>,
    )
    expect(screen.getByRole("group")).toBeInTheDocument()
  })

  it("supports orientation prop", () => {
    const { container } = render(
      <Field orientation="horizontal">
        <FieldLabel>Label</FieldLabel>
      </Field>,
    )
    expect(container.querySelector("[data-slot='field']")).toHaveAttribute(
      "data-orientation",
      "horizontal",
    )
  })

  it("renders FieldSet and FieldLegend", () => {
    render(
      <FieldSet>
        <FieldLegend>Personal Info</FieldLegend>
      </FieldSet>,
    )
    expect(screen.getByText("Personal Info")).toBeInTheDocument()
  })

  it("renders FieldGroup", () => {
    const { container } = render(
      <FieldGroup>
        <Field>
          <FieldLabel>First</FieldLabel>
        </Field>
        <Field>
          <FieldLabel>Second</FieldLabel>
        </Field>
      </FieldGroup>,
    )
    expect(container.querySelector("[data-slot='field-group']")).toBeInTheDocument()
  })

  it("renders FieldTitle", () => {
    render(<FieldTitle>Section Title</FieldTitle>)
    expect(screen.getByText("Section Title")).toBeInTheDocument()
  })

  it("renders FieldError with string children", () => {
    render(<FieldError>This field is required</FieldError>)
    expect(screen.getByRole("alert")).toBeInTheDocument()
    expect(screen.getByText("This field is required")).toBeInTheDocument()
  })

  it("renders FieldError with errors array", () => {
    render(<FieldError errors={["Error one", "Error two"]} />)
    expect(screen.getByText("Error one")).toBeInTheDocument()
    expect(screen.getByText("Error two")).toBeInTheDocument()
  })

  it("renders FieldError with single error from array", () => {
    render(<FieldError errors={["Only error"]} />)
    expect(screen.getByText("Only error")).toBeInTheDocument()
  })

  it("renders FieldError with object errors", () => {
    render(<FieldError errors={[{ message: "Object error" }]} />)
    expect(screen.getByText("Object error")).toBeInTheDocument()
  })

  it("renders nothing for FieldError with no content", () => {
    const { container } = render(<FieldError />)
    expect(container.querySelector("[data-slot='field-error']")).not.toBeInTheDocument()
  })

  it("deduplicates identical errors", () => {
    render(<FieldError errors={["Same error", "Same error"]} />)
    expect(screen.getByText("Same error")).toBeInTheDocument()
    // Should render as plain text (single error), not a list
    expect(screen.queryByRole("list")).not.toBeInTheDocument()
  })

  it("renders FieldSeparator", () => {
    const { container } = render(
      <FieldGroup>
        <FieldSeparator />
      </FieldGroup>,
    )
    expect(container.querySelector("[data-slot='field-separator']")).toBeInTheDocument()
  })

  it("renders FieldSeparator with content", () => {
    const { container } = render(<FieldSeparator>or</FieldSeparator>)
    expect(screen.getByText("or")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='field-separator']")).toHaveAttribute(
      "data-content",
      "true",
    )
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <FieldSet>
        <FieldLegend>Contact</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email-input">Email</FieldLabel>
            <FieldDescription>Your email address</FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
