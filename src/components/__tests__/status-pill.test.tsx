import { render, screen } from "@testing-library/react"
import { Check } from "lucide-react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { StatusPill } from "../status-pill"

describe("StatusPill", () => {
  it("renders text content", () => {
    render(<StatusPill>Active</StatusPill>)
    expect(screen.getByText("Active")).toBeInTheDocument()
  })

  it.each([
    "neutral",
    "mint",
    "sky",
    "blush",
    "lilac",
    "highlight",
  ] as const)("renders %s variant without error", (variant) => {
    const { container } = render(<StatusPill variant={variant}>x</StatusPill>)
    expect(container.firstChild).toBeTruthy()
  })

  it.each(["sm", "default", "lg"] as const)("renders %s size", (size) => {
    const { container } = render(<StatusPill size={size}>x</StatusPill>)
    expect(container.firstChild).toBeTruthy()
  })

  it("renders an icon in the leading slot", () => {
    render(
      <StatusPill variant="mint">
        <Check data-testid="icon" />
        Approved
      </StatusPill>,
    )
    expect(screen.getByTestId("icon")).toBeInTheDocument()
  })

  it("merges className overrides", () => {
    const { container } = render(<StatusPill className="custom">x</StatusPill>)
    expect((container.firstChild as HTMLElement).className).toContain("custom")
  })

  it("has no a11y violations", async () => {
    const { container } = render(<StatusPill variant="sky">Info</StatusPill>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
