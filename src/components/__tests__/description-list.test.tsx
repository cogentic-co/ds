import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import {
  DescriptionList,
  DescriptionListDetail,
  DescriptionListItem,
  DescriptionListTerm,
} from "../description-list"

describe("DescriptionList", () => {
  it("renders with all sections", () => {
    render(
      <DescriptionList>
        <DescriptionListItem>
          <DescriptionListTerm>Name</DescriptionListTerm>
          <DescriptionListDetail>John Doe</DescriptionListDetail>
        </DescriptionListItem>
      </DescriptionList>,
    )
    expect(screen.getByText("Name")).toBeInTheDocument()
    expect(screen.getByText("John Doe")).toBeInTheDocument()
  })

  it("has data-slot attributes", () => {
    const { container } = render(
      <DescriptionList>
        <DescriptionListItem>
          <DescriptionListTerm>Key</DescriptionListTerm>
          <DescriptionListDetail>Value</DescriptionListDetail>
        </DescriptionListItem>
      </DescriptionList>,
    )
    expect(container.querySelector("[data-slot='description-list']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='description-list-item']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='description-list-term']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='description-list-detail']")).toBeInTheDocument()
  })

  it("merges custom className on DescriptionList", () => {
    const { container } = render(
      <DescriptionList className="custom-dl">
        <DescriptionListItem>
          <DescriptionListTerm>A</DescriptionListTerm>
        </DescriptionListItem>
      </DescriptionList>,
    )
    expect(container.querySelector("[data-slot='description-list']")).toHaveClass("custom-dl")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <DescriptionList>
        <DescriptionListItem>
          <DescriptionListTerm>Status</DescriptionListTerm>
          <DescriptionListDetail>Active</DescriptionListDetail>
        </DescriptionListItem>
      </DescriptionList>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
