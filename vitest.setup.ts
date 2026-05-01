import "@testing-library/jest-dom/vitest"
import { expect } from "vitest"
import * as matchers from "vitest-axe/matchers"

expect.extend(matchers)

// JSDom polyfills used by cmdk and Base UI primitives.
if (typeof globalThis.ResizeObserver === "undefined") {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver
}
