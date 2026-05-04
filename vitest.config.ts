import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    css: false,
    // Base UI's ScrollAreaViewport schedules a setTimeout that calls
    // element.getAnimations(), which jsdom doesn't implement. The test itself
    // completes successfully — the timeout just fires after teardown.
    dangerouslyIgnoreUnhandledErrors: true,
  },
})
