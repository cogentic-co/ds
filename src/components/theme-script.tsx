/**
 * Inline script that syncs the `.dark` class on `<html>` with the OS
 * color-scheme preference. Drop this into `<head>` to avoid FOUC.
 *
 * Works with the DS's `@custom-variant dark (&:is(.dark *))` directive.
 *
 * @example
 * // app/layout.tsx
 * import { ThemeScript } from "@cogentic/ds"
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html lang="en" suppressHydrationWarning>
 *       <head>
 *         <ThemeScript />
 *       </head>
 *       <body>{children}</body>
 *     </html>
 *   )
 * }
 */
export function ThemeScript() {
  const script = `(function(){var d=document.documentElement;var m=window.matchMedia("(prefers-color-scheme:dark)");function s(e){e.matches?d.classList.add("dark"):d.classList.remove("dark")}s(m);m.addEventListener("change",s)})();`

  // biome-ignore lint/security/noDangerouslySetInnerHtml: inline script for theme flash prevention
  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
