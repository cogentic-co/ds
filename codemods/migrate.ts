#!/usr/bin/env npx tsx
/**
 * Migrate a Next.js project from shadcn/ui to @cogentic-co/ds
 *
 * Usage:
 *   npx tsx codemods/migrate.ts [src-dir]
 *
 * Runs all codemods in sequence:
 *   1. rewrite-imports   — rewrites @/components/ui/* → @cogentic-co/ds
 *   2. aschild-to-render — transforms asChild prop → render prop
 *   3. strip-classnames  — removes className from DS components (preserved as comments)
 *
 * Then sets up project config (.npmrc, globals.css).
 */
import { execSync } from "node:child_process"
import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { join, resolve } from "node:path"

const DS_PACKAGE = "@cogentic-co/ds"

function run(cmd: string) {
  console.log(`\n$ ${cmd}`)
  try {
    execSync(cmd, { stdio: "inherit" })
  } catch {
    // jscodeshift exits non-zero if no files changed, which is fine
  }
}

function setupProjectConfig(projectDir: string) {
  console.log("\n📦 Setting up project config...\n")

  // globals.css
  const cssGlobs = ["src/app/globals.css", "app/globals.css", "src/styles/globals.css"]
  for (const cssPath of cssGlobs) {
    const fullPath = join(projectDir, cssPath)
    if (existsSync(fullPath)) {
      let css = readFileSync(fullPath, "utf-8")
      let changed = false

      if (!css.includes(`${DS_PACKAGE}/styles.css`)) {
        css = css.replace(
          /(@import\s+["']tailwindcss["'];?)/,
          `$1\n@import "${DS_PACKAGE}/styles.css";`,
        )
        changed = true
      }

      if (!css.includes(`@source`) || !css.includes(DS_PACKAGE)) {
        css = `${css.trimEnd()}\n\n@source "../node_modules/${DS_PACKAGE}/dist";\n`
        changed = true
      }

      if (changed) {
        writeFileSync(fullPath, css)
        console.log(`   ✓ Updated ${cssPath} with DS styles import`)
      } else {
        console.log(`   – ${cssPath} already configured`)
      }
      break
    }
  }
}

// --- Main ---

const targetDir = process.argv[2] || "src"
const projectDir = resolve(".")
const codemodDir = resolve(import.meta.dirname || __dirname)

// Detect the jscodeshift binary
const jscodeshift = join(projectDir, "node_modules", ".bin", "jscodeshift")
const jscsExists = existsSync(jscodeshift)
const jscsCmd = jscsExists ? jscodeshift : "npx jscodeshift"

console.log(`
╔══════════════════════════════════════════════╗
║  Migrate shadcn/ui → @cogentic-co/ds        ║
╚══════════════════════════════════════════════╝
`)

console.log(`Target: ${resolve(targetDir)}`)

// Step 1: Rewrite imports
console.log("\n━━━ Step 1: Rewrite imports ━━━")
run(
  `${jscsCmd} -t ${join(codemodDir, "rewrite-imports.ts")} --extensions=tsx,ts --parser=tsx ${targetDir}`,
)

// Step 2: Transform asChild → render
console.log("\n━━━ Step 2: Transform asChild → render ━━━")
run(
  `${jscsCmd} -t ${join(codemodDir, "aschild-to-render.ts")} --extensions=tsx,ts --parser=tsx ${targetDir}`,
)

// Step 3: Strip classNames from DS components
console.log("\n━━━ Step 3: Strip classNames from DS components ━━━")
run(
  `${jscsCmd} -t ${join(codemodDir, "strip-classnames.ts")} --extensions=tsx,ts --parser=tsx ${targetDir}`,
)

// Step 4: Project config
console.log("\n━━━ Step 4: Project config ━━━")
setupProjectConfig(projectDir)

// Summary
console.log(`
━━━ Done ━━━

Next steps:
  1. pnpm add ${DS_PACKAGE}
  2. pnpm remove @radix-ui/react-slot  (if no longer used)
  3. Delete migrated components/ui/ files
  4. pnpm build  (fix any remaining issues)
  5. Review ⚠️ warnings above for manual fixes

See the README for full setup: https://github.com/cogentic-co/cogentic-ds
`)
