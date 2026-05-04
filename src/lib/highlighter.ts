// Lazy shiki highlighter — single module-scoped instance, dynamic lang loading.
// Designed for client-side use; SSR callers should fall back to plain code.

import type { HighlighterCore } from "shiki/core"

let highlighterPromise: Promise<HighlighterCore> | null = null
const loadedLangs = new Set<string>()

const SUPPORTED_LANGS = new Set([
  "bash",
  "c",
  "cpp",
  "css",
  "diff",
  "dockerfile",
  "go",
  "graphql",
  "html",
  "java",
  "javascript",
  "js",
  "json",
  "jsx",
  "kotlin",
  "lua",
  "markdown",
  "md",
  "objective-c",
  "perl",
  "php",
  "plaintext",
  "powershell",
  "ps",
  "python",
  "py",
  "ruby",
  "rust",
  "scala",
  "scss",
  "sh",
  "shell",
  "sql",
  "swift",
  "toml",
  "ts",
  "tsx",
  "typescript",
  "vue",
  "xml",
  "yaml",
  "yml",
  "zsh",
])

const ALIASES: Record<string, string> = {
  js: "javascript",
  ts: "typescript",
  py: "python",
  sh: "bash",
  shell: "bash",
  zsh: "bash",
  ps: "powershell",
  md: "markdown",
  yml: "yaml",
}

function normalizeLang(lang?: string) {
  if (!lang) return "plaintext"
  const lower = lang.toLowerCase()
  return ALIASES[lower] ?? lower
}

async function getHighlighter(): Promise<HighlighterCore> {
  if (!highlighterPromise) {
    highlighterPromise = (async () => {
      const [{ createHighlighterCore }, { createOnigurumaEngine }] = await Promise.all([
        import("shiki/core"),
        import("shiki/engine/oniguruma"),
      ])
      const [lightTheme, darkTheme] = await Promise.all([
        import("shiki/themes/github-light.mjs"),
        import("shiki/themes/github-dark.mjs"),
      ])
      return createHighlighterCore({
        themes: [lightTheme.default, darkTheme.default],
        langs: [],
        engine: createOnigurumaEngine(import("shiki/wasm")),
      })
    })()
  }
  return highlighterPromise
}

async function ensureLang(highlighter: HighlighterCore, lang: string) {
  if (lang === "plaintext") return
  if (loadedLangs.has(lang)) return
  if (!SUPPORTED_LANGS.has(lang)) return
  try {
    const mod = await import(`shiki/langs/${lang}.mjs`)
    await highlighter.loadLanguage(mod.default ?? mod)
    loadedLangs.add(lang)
  } catch {
    // Silently fall back to plaintext
  }
}

export async function highlightCode(
  code: string,
  language: string | undefined,
  theme: "light" | "dark" = "light",
): Promise<string> {
  const lang = normalizeLang(language)
  const highlighter = await getHighlighter()
  await ensureLang(highlighter, lang)
  const themeName = theme === "dark" ? "github-dark" : "github-light"
  return highlighter.codeToHtml(code, {
    lang: loadedLangs.has(lang) || lang === "plaintext" ? lang : "plaintext",
    theme: themeName,
  })
}
