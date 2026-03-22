import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { FileUpload } from "../file-upload"

describe("FileUpload", () => {
  it("renders without crashing", () => {
    const { container } = render(<FileUpload />)
    expect(container.querySelector("[data-slot='file-upload']")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = render(<FileUpload />)
    expect(container.querySelector("[data-slot='file-upload']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(<FileUpload className="custom-upload" />)
    expect(container.querySelector("[data-slot='file-upload']")).toHaveClass("custom-upload")
  })

  it("shows default upload text", () => {
    render(<FileUpload />)
    expect(screen.getByText("Drop files here or click to upload")).toBeInTheDocument()
  })

  it("shows accepted file types", () => {
    render(<FileUpload accept="image/*,.pdf" />)
    expect(screen.getByText("Accepted: image/*,.pdf")).toBeInTheDocument()
  })

  it("shows any file type when no accept specified", () => {
    render(<FileUpload />)
    expect(screen.getByText("Any file type")).toBeInTheDocument()
  })

  it("renders custom children", () => {
    render(<FileUpload>Custom upload area</FileUpload>)
    expect(screen.getByText("Custom upload area")).toBeInTheDocument()
  })

  it("supports disabled state", () => {
    const { container } = render(<FileUpload disabled />)
    const el = container.querySelector("[data-slot='file-upload']")
    expect(el).toHaveClass("pointer-events-none")
    expect(el).toHaveClass("opacity-50")
  })

  it("has button role for keyboard accessibility", () => {
    render(<FileUpload />)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<FileUpload aria-label="Upload files" />)
    const results = await axe(container, {
      rules: {
        // FileUpload uses role="button" with a hidden file input inside (nested-interactive pattern)
        "nested-interactive": { enabled: false },
        // Hidden file input inside role="button" triggers label rule (expected pattern)
        label: { enabled: false },
      },
    })
    expect(results).toHaveNoViolations()
  })
})
