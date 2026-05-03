#!/usr/bin/env node
// Fail if `src/` introduces new arbitrary Tailwind values like `text-[11px]` or `bg-[#fff]`.
// Allowlist: legitimate uses (CSS functions, calc/min/inherit, complex inset shadows).
// Run via `pnpm lint:tw`.

import { readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative } from "node:path"

const ROOT = new URL("..", import.meta.url).pathname
const TARGETS = ["src"]
const EXTS = new Set([".tsx", ".ts"])

// Patterns that are NOT allowed — values that should live in @theme tokens.
// Focus on the high-leverage cases that were the bulk of the audit findings.
// Allow: layout dimensions (w/h/size), positioning, padding/gap (often pixel-precise tweaks),
// and relative text sizes (em/rem) used in inherit-driven contexts like markdown.
const BAD_PATTERNS = [
  // Typography pixel sizes (text-[11px]) — we have text-3xs/text-2xs/text-xxs/text-sm-plus tokens.
  /\btext-\[\d+(?:\.\d+)?px\]/g,
  // Hex colors anywhere — use @theme color tokens.
  /\b(?:bg|text|border|fill|stroke|outline|ring|divide|placeholder|caret|accent|decoration)-\[#[0-9A-Fa-f]+/g,
  // Tracking pixel/em literals — use tracking-uppercase or Tailwind defaults.
  /\btracking-\[\d/g,
  // Radii pixel literals — map to rounded-3xs/2xs/xs/sm/md/lg/xl.
  /\brounded(?:-[trbl][lr]?)?-\[\d+(?:\.\d+)?px\]/g,
]

// Patterns that ARE allowed (legit — won't be flagged):
//   var(--…)    → token reference
//   calc(…)     → computed dimension
//   min(…)/max(…)→ capped dimension
//   inherit     → CSS keyword
//   color-mix() → CSS function
//   radial-gradient/length → CSS functions
const ALLOWED_INSIDE_BRACKETS =
  /^(?:var\(|calc\(|min\(|max\(|inherit|color-mix\(|radial-gradient\(|linear-gradient\(|length:|size:|inset_)/

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === "dist" || entry.name.startsWith("."))
        continue
      yield* walk(full)
    } else if (entry.isFile()) {
      const ext = entry.name.slice(entry.name.lastIndexOf("."))
      if (EXTS.has(ext)) yield full
    }
  }
}

const violations = []

for (const target of TARGETS) {
  for (const file of walk(join(ROOT, target))) {
    const text = readFileSync(file, "utf8")
    const lines = text.split("\n")
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      for (const pattern of BAD_PATTERNS) {
        for (const match of line.matchAll(pattern)) {
          const bracketStart = line.indexOf("[", match.index)
          const bracketEnd = line.indexOf("]", bracketStart)
          if (bracketStart === -1 || bracketEnd === -1) continue
          const inside = line.slice(bracketStart + 1, bracketEnd)
          if (ALLOWED_INSIDE_BRACKETS.test(inside)) continue
          violations.push({
            file: relative(ROOT, file),
            line: i + 1,
            value: `${match[0]}[${inside}]`,
          })
        }
      }
    }
  }
}

if (violations.length > 0) {
  console.error("\n❌ Arbitrary Tailwind values found in src/:\n")
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line}  ${v.value}`)
  }
  console.error(
    `\n${violations.length} violation(s). Replace with a design token from src/styles/globals.css ` +
      "(@theme inline) or extend it with a new token. Allowed inside brackets: var(), calc(), min(), max(), color-mix(), inherit.\n",
  )
  process.exit(1)
}

console.log("✓ No arbitrary Tailwind values in src/")
