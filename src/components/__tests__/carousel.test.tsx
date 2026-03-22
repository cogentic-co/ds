import { render, screen } from "@testing-library/react"
import { beforeAll, describe, expect, it } from "vitest"
import { axe } from "vitest-axe"

beforeAll(() => {
  window.matchMedia =
    window.matchMedia ||
    ((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }))

  global.IntersectionObserver = class {
    readonly root = null
    readonly rootMargin = "0px"
    readonly thresholds: readonly number[] = [0]
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return []
    }
  }

  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../carousel"

function renderCarousel({ className }: { className?: string } = {}) {
  return render(
    <Carousel className={className}>
      <CarouselContent>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
        <CarouselItem>Slide 3</CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>,
  )
}

describe("Carousel", () => {
  it("renders without crashing", () => {
    renderCarousel()
    expect(screen.getByRole("region")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = renderCarousel()
    expect(container.querySelector("[data-slot='carousel']")).toBeInTheDocument()
  })

  it("has aria-roledescription carousel", () => {
    renderCarousel()
    expect(screen.getByRole("region")).toHaveAttribute("aria-roledescription", "carousel")
  })

  it("merges custom className", () => {
    const { container } = renderCarousel({ className: "custom-carousel" })
    expect(container.querySelector("[data-slot='carousel']")).toHaveClass("custom-carousel")
  })

  it("renders slides with correct role", () => {
    renderCarousel()
    const slides = screen.getAllByRole("group")
    expect(slides).toHaveLength(3)
    expect(slides[0]).toHaveAttribute("aria-roledescription", "slide")
  })

  it("renders previous and next buttons", () => {
    renderCarousel()
    expect(screen.getByRole("button", { name: "Previous slide" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Next slide" })).toBeInTheDocument()
  })

  it("has data-slot on sub-components", () => {
    const { container } = renderCarousel()
    expect(container.querySelector("[data-slot='carousel-content']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='carousel-item']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='carousel-previous']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='carousel-next']")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = renderCarousel()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
