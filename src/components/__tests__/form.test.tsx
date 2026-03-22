import { describe, expect, it } from "vitest"
import { useField, useForm, useStore } from "../form"

describe("Form", () => {
  it("exports useForm hook", () => {
    expect(useForm).toBeDefined()
    expect(typeof useForm).toBe("function")
  })

  it("exports useField hook", () => {
    expect(useField).toBeDefined()
    expect(typeof useField).toBe("function")
  })

  it("exports useStore hook", () => {
    expect(useStore).toBeDefined()
    expect(typeof useStore).toBe("function")
  })
})
