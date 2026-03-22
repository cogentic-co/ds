import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { Attachment, Attachments } from "../attachments"

describe("Attachments", () => {
  it("renders attachment with name", () => {
    render(
      <Attachments>
        <Attachment name="document.pdf" />
      </Attachments>,
    )
    expect(screen.getByText("document.pdf")).toBeInTheDocument()
  })

  it("renders remove button with aria-label", () => {
    render(<Attachment name="file.txt" onRemove={() => {}} />)
    expect(screen.getByRole("button", { name: "Remove file.txt" })).toBeInTheDocument()
  })

  it("calls onRemove when remove button clicked", async () => {
    const user = userEvent.setup()
    const onRemove = vi.fn()
    render(<Attachment name="file.txt" onRemove={onRemove} />)
    await user.click(screen.getByRole("button", { name: "Remove file.txt" }))
    expect(onRemove).toHaveBeenCalledOnce()
  })

  it("does not render remove button without onRemove", () => {
    render(<Attachment name="file.txt" />)
    expect(screen.queryByRole("button")).not.toBeInTheDocument()
  })

  it("renders image thumbnail when type=image and url provided", () => {
    render(<Attachment name="photo.jpg" type="image" url="https://example.com/photo.jpg" />)
    const img = screen.getByAltText("photo.jpg")
    expect(img).toHaveAttribute("src", "https://example.com/photo.jpg")
  })

  it("uses data-slot attributes", () => {
    const { container } = render(
      <Attachments>
        <Attachment name="test.pdf" />
      </Attachments>,
    )
    expect(container.querySelector("[data-slot='attachments']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='attachment']")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Attachments>
        <Attachment name="document.pdf" onRemove={() => {}} />
      </Attachments>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
