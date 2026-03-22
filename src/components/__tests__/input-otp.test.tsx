import { render, screen } from "@testing-library/react"
import { beforeAll, describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../input-otp"

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

describe("InputOTP", () => {
  it("renders OTP input", () => {
    render(
      <InputOTP maxLength={4} aria-label="OTP">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>,
    )
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })

  it("uses data-slot attributes on group and slots", () => {
    const { container } = render(
      <InputOTP maxLength={2}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
      </InputOTP>,
    )
    expect(container.querySelector("[data-slot='input-otp-group']")).toBeInTheDocument()
    expect(container.querySelectorAll("[data-slot='input-otp-slot']")).toHaveLength(2)
  })

  it("merges custom className on group", () => {
    const { container } = render(
      <InputOTP maxLength={2}>
        <InputOTPGroup className="custom-group">
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
      </InputOTP>,
    )
    expect(container.querySelector("[data-slot='input-otp-group']")).toHaveClass("custom-group")
  })

  it("renders separator", () => {
    const { container } = render(
      <InputOTP maxLength={4}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>,
    )
    expect(container.querySelector("[data-slot='input-otp-separator']")).toBeInTheDocument()
    expect(screen.getByRole("separator")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <InputOTP maxLength={4} aria-label="Verification code">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
