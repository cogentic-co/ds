/**
 * Shared pastel tone helpers for the DS refresh.
 *
 * Tones map 1:1 to the `--{tone}` / `--{tone}-ink` CSS variables defined in
 * styles/globals.css. Components should use these constants instead of
 * re-declaring their own tone → class records.
 */

export type Tone = "neutral" | "mint" | "sky" | "blush" | "lilac" | "highlight"

/** Background + ink (foreground) pair — the common pattern for pills, dots, and coloured chips. */
export const TONE_CLASSES: Record<Tone, string> = {
  neutral: "bg-muted text-muted-foreground",
  mint: "bg-mint text-mint-ink",
  sky: "bg-sky text-sky-ink",
  blush: "bg-blush text-blush-ink",
  lilac: "bg-lilac text-lilac-ink",
  highlight: "bg-highlight text-highlight-ink",
}

/**
 * Transaction direction → tone, matching the claude-design DirIcon scheme.
 * Inbound is mint (incoming money is "good"), outbound is blush (spending is
 * warm-alert), internal is lilac (self-transfer, neutral).
 */
export type TransactionDirection = "inbound" | "outbound" | "internal"

export const DIRECTION_TONE: Record<TransactionDirection, Tone> = {
  inbound: "mint",
  outbound: "blush",
  internal: "lilac",
}

/** Convenience: direction → ready-to-use tailwind classes. */
export const DIRECTION_TONE_CLASSES: Record<TransactionDirection, string> = {
  inbound: TONE_CLASSES.mint,
  outbound: TONE_CLASSES.blush,
  internal: TONE_CLASSES.lilac,
}
